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
  lastAttackTime: number;
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
  gameStarted?: boolean;
}

interface TrigramTechnique {
  name: string;
  damage: number;
  stamina: number;
  speed: number;
  range: number;
  vitalPoints: string[];
}

export function Player({
  x: initialX,
  y: initialY,
  isPlayerOne,
  onAttack,
  onMove,
  opponentPosition,
  gameStarted = false,
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
    lastAttackTime: 0,
  });

  const [keys, setKeys] = useState<Set<string>>(new Set());
  const [attackCooldown, setAttackCooldown] = useState<number>(0);
  const [animationTime, setAnimationTime] = useState<number>(0);

  // Korean martial arts techniques by trigram with enhanced properties
  const trigramTechniques: Record<TrigramStance, TrigramTechnique> = {
    geon: {
      // Heaven - Power strikes
      name: "천둥벽력",
      damage: 28,
      stamina: 25,
      speed: 0.8,
      range: 80,
      vitalPoints: ["sternum", "solar_plexus"],
    },
    tae: {
      // Lake - Flowing combinations
      name: "유수연타",
      damage: 18,
      stamina: 15,
      speed: 1.4,
      range: 70,
      vitalPoints: ["joints", "pressure_points"],
    },
    li: {
      // Fire - Precise strikes
      name: "화염지창",
      damage: 35,
      stamina: 30,
      speed: 1.0,
      range: 90,
      vitalPoints: ["throat", "temples", "eyes"],
    },
    jin: {
      // Thunder - Explosive bursts
      name: "벽력일섬",
      damage: 40,
      stamina: 35,
      speed: 1.6,
      range: 85,
      vitalPoints: ["nervous_system"],
    },
    son: {
      // Wind - Light continuous pressure
      name: "선풍연격",
      damage: 15,
      stamina: 10,
      speed: 2.0,
      range: 60,
      vitalPoints: ["breathing_points"],
    },
    gam: {
      // Water - Counter attacks
      name: "수류반격",
      damage: 25,
      stamina: 20,
      speed: 1.1,
      range: 75,
      vitalPoints: ["circulation_points"],
    },
    gan: {
      // Mountain - Defensive
      name: "반석방어",
      damage: 12,
      stamina: 8,
      speed: 0.6,
      range: 50,
      vitalPoints: ["structural_points"],
    },
    gon: {
      // Earth - Grappling
      name: "대지포옹",
      damage: 30,
      stamina: 22,
      speed: 0.9,
      range: 65,
      vitalPoints: ["balance_points"],
    },
  };

  // Execute attack function - defined first to avoid dependency issues
  const executeAttack = useCallback(
    (stance: TrigramStance) => {
      if (!gameStarted) return;

      const technique = trigramTechniques[stance];
      const currentTime = Date.now();

      if (playerState.stamina < technique.stamina || attackCooldown > 0) return;

      setPlayerState((prev) => ({
        ...prev,
        stance,
        isAttacking: true,
        stamina: prev.stamina - technique.stamina,
        combo: prev.combo + 1,
        lastAttackTime: currentTime,
      }));

      // Calculate attack position based on facing direction and technique range
      const attackX =
        playerState.facing === "right"
          ? playerState.x + technique.range
          : playerState.x - technique.range;

      onAttack(technique.name, technique.damage, {
        x: attackX,
        y: playerState.y,
      });

      setAttackCooldown(Math.max(30, 60 / technique.speed)); // Minimum 30 frame cooldown

      // Reset attack state after animation
      setTimeout(() => {
        setPlayerState((prev) => ({ ...prev, isAttacking: false }));
      }, Math.max(200, 400 / technique.speed));
    },
    [playerState, onAttack, trigramTechniques, gameStarted, attackCooldown]
  );

  // Keyboard input handling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (!isPlayerOne || !gameStarted) return;

      // Prevent default browser behavior for game keys
      if (
        [
          "KeyW",
          "KeyA",
          "KeyS",
          "KeyD",
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "Space",
          "Digit1",
          "Digit2",
          "Digit3",
          "Digit4",
          "Digit5",
          "Digit6",
          "Digit7",
          "Digit8",
        ].includes(event.code)
      ) {
        event.preventDefault();
      }

      setKeys((prev) => new Set(prev).add(event.code));
    };

    const handleKeyUp = (event: KeyboardEvent): void => {
      if (!isPlayerOne || !gameStarted) return;

      // Prevent default browser behavior for game keys
      if (
        [
          "KeyW",
          "KeyA",
          "KeyS",
          "KeyD",
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "Space",
          "Digit1",
          "Digit2",
          "Digit3",
          "Digit4",
          "Digit5",
          "Digit6",
          "Digit7",
          "Digit8",
        ].includes(event.code)
      ) {
        event.preventDefault();
      }

      setKeys((prev) => {
        const newKeys = new Set(prev);
        newKeys.delete(event.code);
        return newKeys;
      });
    };

    // Add event listeners to document to ensure they work globally
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isPlayerOne, gameStarted]);

  // AI behavior for opponent
  const handleAI = useCallback(
    (delta: number) => {
      if (!opponentPosition || !gameStarted) return;

      const distanceToPlayer = Math.sqrt(
        Math.pow(playerState.x - opponentPosition.x, 2) +
          Math.pow(playerState.y - opponentPosition.y, 2)
      );

      // AI strategy based on distance and stamina
      if (distanceToPlayer > 120 && attackCooldown === 0) {
        // Move towards player with varying patterns
        const moveDirection = opponentPosition.x > playerState.x ? 1 : -1;
        const moveSpeed = 2.5 + Math.sin(animationTime * 0.05) * 0.5;
        const newX = Math.max(
          80,
          Math.min(720, playerState.x + moveDirection * moveSpeed * delta)
        );
        const newFacing = moveDirection > 0 ? "right" : "left";

        setPlayerState((prev) => ({
          ...prev,
          x: newX,
          facing: newFacing,
          isMoving: true,
        }));

        onMove({ x: newX, y: playerState.y });
      } else if (
        distanceToPlayer <= 120 &&
        attackCooldown === 0 &&
        playerState.stamina > 20
      ) {
        // Attack with intelligent trigram selection
        const stanceOptions: TrigramStance[] =
          playerState.stamina > 30
            ? ["li", "jin", "geon", "gon"] // High damage techniques when stamina is good
            : ["tae", "son", "gam"]; // Low stamina techniques

        // Safe array access with proper bounds checking and fallback
        if (stanceOptions.length > 0) {
          const randomIndex = Math.floor(Math.random() * stanceOptions.length);
          const randomStance = stanceOptions[randomIndex] || "tae"; // Fallback to "tae" if undefined
          executeAttack(randomStance);
        }
      } else {
        // Rest and recover stamina
        setPlayerState((prev) => ({ ...prev, isMoving: false }));
      }
    },
    [
      playerState,
      opponentPosition,
      attackCooldown,
      onMove,
      executeAttack,
      animationTime,
      gameStarted,
    ]
  );

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

      const moveSpeed = playerState.isBlocking ? 1.5 : 3.5;

      // Movement controls with boundaries
      if (keys.has("KeyA") || keys.has("ArrowLeft")) {
        newX = Math.max(80, newX - moveSpeed * delta);
        newFacing = "left";
        isMoving = true;
      }
      if (keys.has("KeyD") || keys.has("ArrowRight")) {
        newX = Math.min(720, newX + moveSpeed * delta);
        newFacing = "right";
        isMoving = true;
      }
      if (keys.has("KeyW") || keys.has("ArrowUp")) {
        newY = Math.max(220, newY - moveSpeed * delta * 0.7);
        isMoving = true;
      }
      if (keys.has("KeyS") || keys.has("ArrowDown")) {
        newY = Math.min(420, newY + moveSpeed * delta * 0.7);
        isMoving = true;
      }

      // Attack controls (number keys for different trigrams)
      if (attackCooldown === 0 && playerState.stamina >= 10) {
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
      executeAttack,
      handleAI,
      isPlayerOne,
      gameStarted,
    ]
  );

  // Game loop with enhanced mechanics
  useTick((ticker) => {
    const delta = ticker.deltaTime;
    setAnimationTime((prev) => prev + delta);

    if (!gameStarted) return;

    // Update cooldowns
    if (attackCooldown > 0) {
      setAttackCooldown((prev) => Math.max(0, prev - delta));
    }

    // Handle movement and actions
    handlePlayerInput(delta);

    // Regenerate stamina with breathing mechanics
    const staminaRegenRate = playerState.isBlocking ? 0.3 : 0.6;
    setPlayerState((prev) => ({
      ...prev,
      stamina: Math.min(100, prev.stamina + delta * staminaRegenRate),
    }));
  });

  const handlePointerDown = useCallback(() => {
    if (
      !isPlayerOne ||
      attackCooldown > 0 ||
      !gameStarted ||
      playerState.stamina < 15
    )
      return;

    // Quick attack on click/tap - use Lake stance for speed
    executeAttack("tae");
  }, [
    isPlayerOne,
    attackCooldown,
    executeAttack,
    gameStarted,
    playerState.stamina,
  ]);

  return (
    <pixiContainer
      x={playerState.x}
      y={playerState.y}
      interactive={true}
      onPointerDown={handlePointerDown}
    >
      {/* Player body with enhanced styling */}
      <pixiGraphics
        draw={(g) => {
          g.clear();

          // Main body
          const bodyColor = isPlayerOne ? 0x4a90e2 : 0xe24a4a;
          const alpha = playerState.isBlocking ? 0.7 : 1.0;
          g.setFillStyle({ color: bodyColor, alpha });
          g.rect(-20, -80, 40, 80);
          g.fill();

          // Attack animation effect
          if (playerState.isAttacking) {
            const attackPulse = Math.sin(animationTime * 0.5) * 0.3 + 0.7;
            g.setStrokeStyle({
              color: getStanceColor(playerState.stance),
              width: 4,
              alpha: attackPulse,
            });
            g.rect(-22, -82, 44, 84);
            g.stroke();
          }

          // Blocking stance indicator
          if (playerState.isBlocking) {
            g.setStrokeStyle({ color: 0xffffff, width: 3, alpha: 0.8 });
            g.rect(-25, -85, 50, 90);
            g.stroke();
          }
        }}
      />

      {/* Enhanced stance indicator with trigram symbol */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.setFillStyle({
            color: getStanceColor(playerState.stance),
            alpha: 0.9,
          });
          g.rect(-35, -105, 70, 12);
          g.fill();
          g.setStrokeStyle({ color: 0xffffff, width: 1 });
          g.rect(-35, -105, 70, 12);
          g.stroke();
        }}
      />

      {/* Trigram symbol display */}
      <pixiText
        text={getTrigramSymbol(playerState.stance)}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-99}
        style={{
          fontFamily: "serif",
          fontSize: 10,
          fill: 0x000000,
          fontWeight: "bold",
        }}
      />

      {/* Health bar */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          // Background
          g.setFillStyle({ color: 0x333333 });
          g.rect(-35, -125, 70, 8);
          g.fill();
          // Health
          g.setFillStyle({
            color: playerState.health > 30 ? 0x4caf50 : 0xff4444,
          });
          g.rect(-35, -125, playerState.health * 0.7, 8);
          g.fill();
          // Border
          g.setStrokeStyle({ color: 0xffffff, width: 1 });
          g.rect(-35, -125, 70, 8);
          g.stroke();
        }}
      />

      {/* Stamina bar */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          // Background
          g.setFillStyle({ color: 0x333333 });
          g.rect(-35, -115, 70, 6);
          g.fill();
          // Stamina
          g.setFillStyle({ color: 0xffc107 });
          g.rect(-35, -115, playerState.stamina * 0.7, 6);
          g.fill();
          // Border
          g.setStrokeStyle({ color: 0xffffff, width: 1 });
          g.rect(-35, -115, 70, 6);
          g.stroke();
        }}
      />

      {/* Attack effect with Korean aesthetic */}
      {playerState.isAttacking && (
        <pixiGraphics
          draw={(g) => {
            g.clear();
            const technique = trigramTechniques[playerState.stance];
            const attackAlpha = Math.sin(animationTime * 0.3) * 0.4 + 0.6;
            const attackWidth = technique.range;
            const attackHeight = 25 + technique.damage * 0.5;

            g.setFillStyle({
              color: getStanceColor(playerState.stance),
              alpha: attackAlpha,
            });

            if (playerState.facing === "right") {
              g.rect(30, -attackHeight / 2, attackWidth, attackHeight);
            } else {
              g.rect(
                -30 - attackWidth,
                -attackHeight / 2,
                attackWidth,
                attackHeight
              );
            }
            g.fill();

            // Attack spark effects
            for (let i = 0; i < 3; i++) {
              const sparkX =
                (playerState.facing === "right" ? 30 : -30) +
                Math.random() * 20;
              const sparkY = -10 + Math.random() * 20;
              g.setFillStyle({ color: 0xffffff, alpha: attackAlpha * 0.8 });
              g.circle(sparkX, sparkY, 2 + Math.random() * 2);
              g.fill();
            }
          }}
        />
      )}

      {/* Movement trail effect */}
      {playerState.isMoving && (
        <pixiGraphics
          draw={(g) => {
            g.clear();
            const trailAlpha = 0.3;
            g.setFillStyle({
              color: isPlayerOne ? 0x4a90e2 : 0xe24a4a,
              alpha: trailAlpha,
            });
            g.rect(-22, -78, 44, 76);
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

function getTrigramSymbol(stance: TrigramStance): string {
  const symbols: Record<TrigramStance, string> = {
    geon: "☰", // Heaven
    tae: "☱", // Lake
    li: "☲", // Fire
    jin: "☳", // Thunder
    son: "☴", // Wind
    gam: "☵", // Water
    gan: "☶", // Mountain
    gon: "☷", // Earth
  };
  return symbols[stance];
}
