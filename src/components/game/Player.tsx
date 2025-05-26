import { useTick } from "@pixi/react";
import { useState, useCallback, useEffect, useMemo } from "react";
import type { JSX } from "react";
import { PlayerVisuals } from "./PlayerVisuals";

// Removed imports of missing modules
// import type { Graphics as PixiGraphics } from "pixi.js";

export type TrigramStance =
  | "geon"
  | "tae"
  | "li"
  | "jin"
  | "son"
  | "gam"
  | "gan"
  | "gon";

export interface PlayerState {
  readonly x: number;
  readonly y: number;
  readonly health: number;
  readonly stance: TrigramStance;
  readonly isAttacking: boolean;
  readonly isBlocking: boolean;
  readonly isMoving: boolean;
  readonly facing: "left" | "right";
  readonly stamina: number;
  readonly combo: number;
  readonly lastAttackTime: number;
}

export interface PlayerProps {
  readonly x: number;
  readonly y: number;
  readonly isPlayerOne: boolean;
  readonly onAttack: (
    attackType: string,
    damage: number,
    position: { x: number; y: number }
  ) => void;
  readonly onMove: (position: { x: number; y: number }) => void;
  readonly opponentPosition?: { readonly x: number; readonly y: number };
  readonly gameStarted?: boolean;
}

interface TrigramTechnique {
  readonly name: string;
  readonly damage: number;
  readonly stamina: number;
  readonly speed: number;
  readonly range: number;
  readonly vitalPoints: readonly string[];
}

// Movement constraints
const MOVEMENT_BOUNDS = {
  MIN_X: 80,
  MAX_X: 720,
  MIN_Y: 220,
  MAX_Y: 420,
} as const;

// Game balance constants
const GAME_BALANCE = {
  BASE_MOVE_SPEED: 3.5,
  BLOCKING_SPEED_MULTIPLIER: 0.43, // ~1.5 / 3.5
  VERTICAL_SPEED_MULTIPLIER: 0.7,
  STAMINA_REGEN_NORMAL: 0.6,
  STAMINA_REGEN_BLOCKING: 0.3,
  MIN_ATTACK_STAMINA: 10,
  QUICK_ATTACK_STAMINA: 15,
  ATTACK_COOLDOWN_BASE: 30,
} as const;

// Immutable trigram techniques data
const TRIGRAM_TECHNIQUES: Readonly<Record<TrigramStance, TrigramTechnique>> = {
  geon: {
    name: "천둥벽력",
    damage: 28,
    stamina: 25,
    speed: 0.8,
    range: 80,
    vitalPoints: ["sternum", "solar_plexus"],
  },
  tae: {
    name: "유수연타",
    damage: 18,
    stamina: 15,
    speed: 1.4,
    range: 70,
    vitalPoints: ["joints", "pressure_points"],
  },
  li: {
    name: "화염지창",
    damage: 35,
    stamina: 30,
    speed: 1.0,
    range: 90,
    vitalPoints: ["throat", "temples", "eyes"],
  },
  jin: {
    name: "벽력일섬",
    damage: 40,
    stamina: 35,
    speed: 1.6,
    range: 85,
    vitalPoints: ["nervous_system"],
  },
  son: {
    name: "선풍연격",
    damage: 15,
    stamina: 10,
    speed: 2.0,
    range: 60,
    vitalPoints: ["breathing_points"],
  },
  gam: {
    name: "수류반격",
    damage: 25,
    stamina: 20,
    speed: 1.1,
    range: 75,
    vitalPoints: ["circulation_points"],
  },
  gan: {
    name: "반석방어",
    damage: 12,
    stamina: 8,
    speed: 0.6,
    range: 50,
    vitalPoints: ["structural_points"],
  },
  gon: {
    name: "대지포옹",
    damage: 30,
    stamina: 22,
    speed: 0.9,
    range: 65,
    vitalPoints: ["balance_points"],
  },
} as const;

// Input system with better organization
class InputSystem {
  private static readonly MOVEMENT_KEYS = [
    "KeyW",
    "KeyA",
    "KeyS",
    "KeyD",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
  ] as const;

  private static readonly ATTACK_KEYS = [
    "Digit1",
    "Digit2",
    "Digit3",
    "Digit4",
    "Digit5",
    "Digit6",
    "Digit7",
    "Digit8",
  ] as const;

  private static readonly GAME_KEYS = [
    ...this.MOVEMENT_KEYS,
    ...this.ATTACK_KEYS,
    "Space",
  ] as const;

  static isGameKey(code: string): boolean {
    return this.GAME_KEYS.includes(code as any);
  }

  static getStanceFromKey(code: string): TrigramStance | null {
    const stanceMap: Record<string, TrigramStance> = {
      Digit1: "geon",
      Digit2: "tae",
      Digit3: "li",
      Digit4: "jin",
      Digit5: "son",
      Digit6: "gam",
      Digit7: "gan",
      Digit8: "gon",
    };
    return stanceMap[code] ?? null;
  }
}

// AI behavior system
class AISystem {
  private static readonly AGGRESSION_DISTANCE = 120;
  private static readonly MOVE_SPEED_BASE = 2.5;
  private static readonly MOVE_SPEED_VARIANCE = 0.5;

  static calculateDistance(
    pos1: { x: number; y: number },
    pos2: { x: number; y: number }
  ): number {
    return Math.sqrt(
      Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2)
    );
  }

  static shouldAttack(
    distance: number,
    stamina: number,
    cooldown: number
  ): boolean {
    return (
      distance <= this.AGGRESSION_DISTANCE && cooldown === 0 && stamina > 20
    );
  }

  static shouldApproach(distance: number, cooldown: number): boolean {
    return distance > this.AGGRESSION_DISTANCE && cooldown === 0;
  }

  static selectAttackStance(stamina: number): TrigramStance {
    const highStaminaOptions: TrigramStance[] = ["li", "jin", "geon", "gon"];
    const lowStaminaOptions: TrigramStance[] = ["tae", "son", "gam"];

    const options = stamina > 30 ? highStaminaOptions : lowStaminaOptions;
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex] ?? "tae";
  }

  static calculateMoveSpeed(animationTime: number): number {
    return (
      this.MOVE_SPEED_BASE +
      Math.sin(animationTime * 0.05) * this.MOVE_SPEED_VARIANCE
    );
  }
}

// Player state management
class PlayerStateManager {
  static createInitialState(
    x: number,
    y: number,
    isPlayerOne: boolean
  ): PlayerState {
    return {
      x,
      y,
      health: 100,
      stance: "geon",
      isAttacking: false,
      isBlocking: false,
      isMoving: false,
      facing: isPlayerOne ? "right" : "left",
      stamina: 100,
      combo: 0,
      lastAttackTime: 0,
    };
  }

  static updatePosition(
    state: PlayerState,
    newX: number,
    newY: number,
    isMoving: boolean,
    facing?: "left" | "right"
  ): PlayerState {
    return {
      ...state,
      x: Math.max(MOVEMENT_BOUNDS.MIN_X, Math.min(MOVEMENT_BOUNDS.MAX_X, newX)),
      y: Math.max(MOVEMENT_BOUNDS.MIN_Y, Math.min(MOVEMENT_BOUNDS.MAX_Y, newY)),
      isMoving,
      ...(facing && { facing }),
    };
  }

  static updateStamina(state: PlayerState, delta: number): PlayerState {
    const regenRate = state.isBlocking
      ? GAME_BALANCE.STAMINA_REGEN_BLOCKING
      : GAME_BALANCE.STAMINA_REGEN_NORMAL;

    return {
      ...state,
      stamina: Math.min(100, state.stamina + delta * regenRate),
    };
  }

  static executeAttack(state: PlayerState, stance: TrigramStance): PlayerState {
    const technique = TRIGRAM_TECHNIQUES[stance];

    return {
      ...state,
      stance,
      isAttacking: true,
      stamina: state.stamina - technique.stamina,
      combo: state.combo + 1,
      lastAttackTime: Date.now(),
    };
  }

  static endAttack(state: PlayerState): PlayerState {
    return {
      ...state,
      isAttacking: false,
    };
  }

  static updateBlocking(state: PlayerState, isBlocking: boolean): PlayerState {
    return {
      ...state,
      isBlocking,
    };
  }
}

export function PlayerContainer({
  x: initialX,
  y: initialY,
  isPlayerOne,
  onAttack,
  onMove,
  opponentPosition,
  gameStarted = false,
}: PlayerProps): JSX.Element {
  const [playerState, setPlayerState] = useState<PlayerState>(() =>
    PlayerStateManager.createInitialState(initialX, initialY, isPlayerOne)
  );
  const [animationTime, setAnimationTime] = useState<number>(0);
  const [attackCooldown, setAttackCooldown] = useState<number>(0);
  const [keys, setKeys] = useState<Set<string>>(new Set());

  const currentTechnique = useMemo(
    () => TRIGRAM_TECHNIQUES[playerState.stance],
    [playerState.stance]
  );

  // Enhanced attack execution with better error handling
  const executeAttack = useCallback(
    (stance: TrigramStance) => {
      if (!gameStarted || attackCooldown > 0) return;

      const technique = TRIGRAM_TECHNIQUES[stance];
      if (playerState.stamina < technique.stamina) return;

      setPlayerState((prev) => PlayerStateManager.executeAttack(prev, stance));

      const attackX =
        playerState.facing === "right"
          ? playerState.x + technique.range
          : playerState.x - technique.range;

      onAttack(technique.name, technique.damage, {
        x: attackX,
        y: playerState.y,
      });

      setAttackCooldown(
        Math.max(GAME_BALANCE.ATTACK_COOLDOWN_BASE, 60 / technique.speed)
      );

      // Reset attack state after animation
      const animationDuration = Math.max(200, 400 / technique.speed);
      setTimeout(() => {
        setPlayerState((prev) => PlayerStateManager.endAttack(prev));
      }, animationDuration);
    },
    [
      gameStarted,
      attackCooldown,
      playerState.stamina,
      playerState.facing,
      playerState.x,
      playerState.y,
      onAttack,
    ]
  );

  // Enhanced keyboard input handling
  useEffect(() => {
    if (!isPlayerOne) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (InputSystem.isGameKey(event.code)) {
        event.preventDefault();
        setKeys((prev) => new Set(prev).add(event.code));
      }
    };

    const handleKeyUp = (event: KeyboardEvent): void => {
      if (InputSystem.isGameKey(event.code)) {
        event.preventDefault();
        setKeys((prev) => {
          const newKeys = new Set(prev);
          newKeys.delete(event.code);
          return newKeys;
        });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isPlayerOne]);

  // Enhanced AI behavior with better decision making
  const handleAI = useCallback(
    (delta: number) => {
      if (!opponentPosition || !gameStarted || isPlayerOne) return;

      const distance = AISystem.calculateDistance(
        playerState,
        opponentPosition
      );

      if (AISystem.shouldApproach(distance, attackCooldown)) {
        const moveDirection = opponentPosition.x > playerState.x ? 1 : -1;
        const moveSpeed = AISystem.calculateMoveSpeed(animationTime);
        const newX = playerState.x + moveDirection * moveSpeed * delta;
        const newFacing: "left" | "right" =
          moveDirection > 0 ? "right" : "left";

        setPlayerState((prev) =>
          PlayerStateManager.updatePosition(prev, newX, prev.y, true, newFacing)
        );

        onMove({ x: newX, y: playerState.y });
      } else if (
        AISystem.shouldAttack(distance, playerState.stamina, attackCooldown)
      ) {
        const stance = AISystem.selectAttackStance(playerState.stamina);
        executeAttack(stance);
      } else {
        setPlayerState((prev) => ({ ...prev, isMoving: false }));
      }
    },
    [
      opponentPosition,
      gameStarted,
      isPlayerOne,
      playerState,
      animationTime,
      attackCooldown,
      onMove,
      executeAttack,
    ]
  );

  // Enhanced player input handling
  const handlePlayerInput = useCallback(
    (delta: number) => {
      if (!isPlayerOne) {
        handleAI(delta);
        return;
      }

      if (!gameStarted) return;

      let newX = playerState.x;
      let newY = playerState.y;
      let isMoving = false;
      let newFacing = playerState.facing;

      const moveSpeed = playerState.isBlocking
        ? GAME_BALANCE.BASE_MOVE_SPEED * GAME_BALANCE.BLOCKING_SPEED_MULTIPLIER
        : GAME_BALANCE.BASE_MOVE_SPEED;

      // Movement controls
      if (keys.has("KeyA") || keys.has("ArrowLeft")) {
        newX -= moveSpeed * delta;
        newFacing = "left";
        isMoving = true;
      }
      if (keys.has("KeyD") || keys.has("ArrowRight")) {
        newX += moveSpeed * delta;
        newFacing = "right";
        isMoving = true;
      }
      if (keys.has("KeyW") || keys.has("ArrowUp")) {
        newY -= moveSpeed * delta * GAME_BALANCE.VERTICAL_SPEED_MULTIPLIER;
        isMoving = true;
      }
      if (keys.has("KeyS") || keys.has("ArrowDown")) {
        newY += moveSpeed * delta * GAME_BALANCE.VERTICAL_SPEED_MULTIPLIER;
        isMoving = true;
      }

      // Attack controls
      if (
        attackCooldown === 0 &&
        playerState.stamina >= GAME_BALANCE.MIN_ATTACK_STAMINA
      ) {
        for (const key of keys) {
          const stance = InputSystem.getStanceFromKey(key);
          if (stance) {
            executeAttack(stance);
            break; // Only execute one attack per frame
          }
        }
      }

      const isBlocking = keys.has("Space");

      setPlayerState((prev) => {
        const updated = PlayerStateManager.updatePosition(
          prev,
          newX,
          newY,
          isMoving,
          newFacing
        );
        return PlayerStateManager.updateBlocking(updated, isBlocking);
      });

      if (newX !== playerState.x || newY !== playerState.y) {
        onMove({ x: newX, y: newY });
      }
    },
    [
      isPlayerOne,
      gameStarted,
      keys,
      playerState,
      attackCooldown,
      handleAI,
      executeAttack,
      onMove,
    ]
  );

  // Enhanced game loop with better performance
  useTick(
    useCallback(
      (ticker: { deltaTime: number }) => {
        const delta = ticker.deltaTime;
        setAnimationTime((prev) => prev + delta);

        if (!gameStarted) return;

        // Update cooldowns
        setAttackCooldown((prev) => Math.max(0, prev - delta));

        // Handle input
        handlePlayerInput(delta);

        // Update stamina
        setPlayerState((prev) => PlayerStateManager.updateStamina(prev, delta));
      },
      [gameStarted, handlePlayerInput]
    )
  );

  const handlePointerDown = useCallback(() => {
    if (
      !isPlayerOne ||
      attackCooldown > 0 ||
      !gameStarted ||
      playerState.stamina < GAME_BALANCE.QUICK_ATTACK_STAMINA
    )
      return;

    executeAttack("tae");
  }, [
    isPlayerOne,
    attackCooldown,
    gameStarted,
    playerState.stamina,
    executeAttack,
  ]);

  return (
    <pixiContainer
      x={playerState.x}
      y={playerState.y}
      interactive={true}
      onPointerDown={handlePointerDown}
    >
      <PlayerVisuals
        playerState={playerState}
        currentTechnique={currentTechnique}
        isPlayerOne={isPlayerOne}
        animationTime={animationTime}
      />
    </pixiContainer>
  );
}
