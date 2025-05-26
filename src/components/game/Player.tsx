import { useTick } from "@pixi/react";
import { useState, useCallback, useEffect } from "react";
import type { JSX } from "react";

export interface PlayerState {
  x: number;
  y: number;
  health: number;
  stance: TrigramStance;
  isAttacking: boolean;
  isBlocking: boolean;
  isMoving: boolean;
  facing: "left" | "right";
  stamina: number;
  combo: number;
}

export type TrigramStance =
  | "geon"
  | "tae"
  | "li"
  | "jin"
  | "son"
  | "gam"
  | "gan"
  | "gon";

export interface PlayerProps {
  x: number;
  y: number;
  isPlayerOne: boolean;
  onAttack: (
    attackType: string,
    damage: number,
    position: { x: number; y: number }
  ) => void;
  onMove: (position: { x: number; y: number }) => void;
  opponentPosition?: { x: number; y: number };
}

interface TrigramTechnique {
  name: string;
  damage: number;
  stamina: number;
  speed: number;
  vitalPoints: string[];
}

export function Player({
  x: initialX,
  y: initialY,
  isPlayerOne,
  onAttack,
  onMove,
  opponentPosition,
}: PlayerProps): JSX.Element {
  const [playerState, setPlayerState] = useState<PlayerState>({
    x: initialX,
    y: initialY,
    health: 100,
    stance: "geon", // Default to Heaven stance
    isAttacking: false,
    isBlocking: false,
    isMoving: false,
    facing: isPlayerOne ? "right" : "left",
    stamina: 100,
    combo: 0,
  });

  const [keys, setKeys] = useState<Set<string>>(new Set());
  const [attackCooldown, setAttackCooldown] = useState<number>(0);

  // Korean martial arts techniques by trigram
  const trigramTechniques: Record<TrigramStance, TrigramTechnique> = {
    geon: {
      // Heaven - Power strikes
      name: "천둥벽력",
      damage: 25,
      stamina: 20,
      speed: 0.8,
      vitalPoints: ["sternum", "solar_plexus"],
    },
    tae: {
      // Lake - Flowing combinations
      name: "유수연타",
      damage: 15,
      stamina: 10,
      speed: 1.2,
      vitalPoints: ["joints", "pressure_points"],
    },
    li: {
      // Fire - Precise strikes
      name: "화염지창",
      damage: 30,
      stamina: 25,
      speed: 1.0,
      vitalPoints: ["throat", "temples", "eyes"],
    },
    jin: {
      // Thunder - Explosive bursts
      name: "벽력일섬",
      damage: 35,
      stamina: 30,
      speed: 1.5,
      vitalPoints: ["nervous_system"],
    },
    son: {
      // Wind - Light continuous pressure
      name: "선풍연격",
      damage: 12,
      stamina: 8,
      speed: 1.8,
      vitalPoints: ["breathing_points"],
    },
    gam: {
      // Water - Counter attacks
      name: "수류반격",
      damage: 20,
      stamina: 15,
      speed: 0.9,
      vitalPoints: ["circulation_points"],
    },
    gan: {
      // Mountain - Defensive
      name: "반석방어",
      damage: 10,
      stamina: 5,
      speed: 0.5,
      vitalPoints: ["structural_points"],
    },
    gon: {
      // Earth - Grappling
      name: "대지포옹",
      damage: 22,
      stamina: 18,
      speed: 0.7,
      vitalPoints: ["balance_points"],
    },
  };

  // Execute attack function - defined before it's used in dependencies
  const executeAttack = useCallback(
    (stance: TrigramStance) => {
      const technique = trigramTechniques[stance];

      if (playerState.stamina < technique.stamina) return; // Not enough stamina

      setPlayerState((prev) => ({
        ...prev,
        stance,
        isAttacking: true,
        stamina: prev.stamina - technique.stamina,
        combo: prev.combo + 1,
      }));

      // Calculate attack position based on facing direction
      const attackX =
        playerState.facing === "right"
          ? playerState.x + 60
          : playerState.x - 60;

      onAttack(technique.name, technique.damage, {
        x: attackX,
        y: playerState.y,
      });

      setAttackCooldown(60 / technique.speed); // Cooldown based on technique speed

      // Reset attack state after animation
      setTimeout(() => {
        setPlayerState((prev) => ({ ...prev, isAttacking: false }));
      }, 300);
    },
    [playerState, onAttack, trigramTechniques]
  );

  // Keyboard input handling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (!isPlayerOne) return; // Only player 1 uses keyboard

      setKeys((prev) => new Set(prev).add(event.code));
    };

    const handleKeyUp = (event: KeyboardEvent): void => {
      if (!isPlayerOne) return;

      setKeys((prev) => {
        const newKeys = new Set(prev);
        newKeys.delete(event.code);
        return newKeys;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isPlayerOne]);

  // Handle AI behavior
  const handleAI = useCallback(
    (delta: number) => {
      if (!opponentPosition) return;

      // Simple AI: Move towards player and attack when in range
      const distanceToPlayer = Math.abs(playerState.x - opponentPosition.x);

      if (distanceToPlayer > 100 && attackCooldown === 0) {
        // Move towards player
        const moveDirection = opponentPosition.x > playerState.x ? 1 : -1;
        const newX = playerState.x + moveDirection * 2 * delta;
        const newFacing = moveDirection > 0 ? "right" : "left";

        setPlayerState((prev) => ({
          ...prev,
          x: newX,
          facing: newFacing,
          isMoving: true,
        }));

        onMove({ x: newX, y: playerState.y });
      } else if (distanceToPlayer <= 100 && attackCooldown === 0) {
        // Attack with random trigram technique
        const stances: TrigramStance[] = ["geon", "tae", "li", "jin"];
        const randomStance =
          stances[Math.floor(Math.random() * stances.length)];
        if (randomStance) {
          executeAttack(randomStance);
        }
      }
    },
    [playerState, opponentPosition, attackCooldown, onMove, executeAttack]
  );

  const handlePlayerInput = useCallback(
    (delta: number) => {
      if (!isPlayerOne) {
        // Simple AI for opponent
        handleAI(delta);
        return;
      }

      let newX = playerState.x;
      let newY = playerState.y;
      let isMoving = false;
      let newFacing = playerState.facing;

      // Movement controls
      if (keys.has("KeyA") || keys.has("ArrowLeft")) {
        newX = Math.max(50, newX - 3 * delta);
        newFacing = "left";
        isMoving = true;
      }
      if (keys.has("KeyD") || keys.has("ArrowRight")) {
        newX = Math.min(750, newX + 3 * delta);
        newFacing = "right";
        isMoving = true;
      }
      if (keys.has("KeyW") || keys.has("ArrowUp")) {
        newY = Math.max(200, newY - 2 * delta);
        isMoving = true;
      }
      if (keys.has("KeyS") || keys.has("ArrowDown")) {
        newY = Math.min(400, newY + 2 * delta);
        isMoving = true;
      }

      // Attack controls (number keys for different trigrams)
      if (attackCooldown === 0) {
        if (keys.has("Digit1")) executeAttack("geon");
        if (keys.has("Digit2")) executeAttack("tae");
        if (keys.has("Digit3")) executeAttack("li");
        if (keys.has("Digit4")) executeAttack("jin");
        if (keys.has("Digit5")) executeAttack("son");
        if (keys.has("Digit6")) executeAttack("gam");
        if (keys.has("Digit7")) executeAttack("gan");
        if (keys.has("Digit8")) executeAttack("gon");
      }

      // Blocking
      const isBlocking = keys.has("Space");

      setPlayerState((prev) => ({
        ...prev,
        x: newX,
        y: newY,
        facing: newFacing,
        isMoving,
        isBlocking,
      }));

      if (newX !== playerState.x || newY !== playerState.y) {
        onMove({ x: newX, y: newY });
      }
    },
    [
      keys,
      playerState,
      attackCooldown,
      onMove,
      executeAttack,
      handleAI,
      isPlayerOne,
    ]
  );

  // Game loop with Korean martial arts mechanics
  useTick((ticker) => {
    const delta = ticker.deltaTime;

    // Update cooldowns
    if (attackCooldown > 0) {
      setAttackCooldown((prev) => Math.max(0, prev - delta));
    }

    // Handle movement and actions
    handlePlayerInput(delta);

    // Regenerate stamina
    setPlayerState((prev) => ({
      ...prev,
      stamina: Math.min(100, prev.stamina + delta * 0.5),
    }));
  });

  const handlePointerDown = useCallback(() => {
    if (!isPlayerOne || attackCooldown > 0) return;

    // Quick attack on click/tap
    executeAttack("tae"); // Lake stance for quick strikes
  }, [isPlayerOne, attackCooldown, executeAttack]);

  return (
    <pixiContainer
      x={playerState.x}
      y={playerState.y}
      interactive={true}
      onPointerDown={handlePointerDown}
    >
      {/* Player sprite - simplified rectangle for now */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.setFillStyle({
            color: isPlayerOne ? 0x4a90e2 : 0xe24a4a,
            alpha: playerState.isBlocking ? 0.7 : 1.0,
          });
          g.rect(-20, -80, 40, 80);
          g.fill();
        }}
      />

      {/* Stance indicator */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.setFillStyle({
            color: getStanceColor(playerState.stance),
            alpha: 0.8,
          });
          g.rect(-30, -100, 60, 8);
          g.fill();
        }}
      />

      {/* Health bar */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.setFillStyle({ color: 0x4caf50 });
          g.rect(-30, -120, playerState.health * 0.6, 6);
          g.fill();
          g.setStrokeStyle({ color: 0xffffff, width: 1 });
          g.rect(-30, -120, 60, 6);
          g.stroke();
        }}
      />

      {/* Stamina bar */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.setFillStyle({ color: 0xffc107 });
          g.rect(-30, -110, playerState.stamina * 0.6, 4);
          g.fill();
          g.setStrokeStyle({ color: 0xffffff, width: 1 });
          g.rect(-30, -110, 60, 4);
          g.stroke();
        }}
      />

      {/* Attack effect */}
      {playerState.isAttacking && (
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.setFillStyle({
              color: getStanceColor(playerState.stance),
              alpha: 0.6,
            });
            g.rect(playerState.facing === "right" ? 30 : -110, -50, 80, 20);
            g.fill();
          }}
        />
      )}
    </pixiContainer>
  );
}

function getStanceColor(stance: TrigramStance): number {
  const colors: Record<TrigramStance, number> = {
    geon: 0xffd700, // Gold - Heaven
    tae: 0x87ceeb, // Sky Blue - Lake
    li: 0xff4500, // Red Orange - Fire
    jin: 0x9370db, // Purple - Thunder
    son: 0x98fb98, // Pale Green - Wind
    gam: 0x4169e1, // Royal Blue - Water
    gan: 0x8b4513, // Saddle Brown - Mountain
    gon: 0x654321, // Dark Brown - Earth
  };
  return colors[stance];
}
