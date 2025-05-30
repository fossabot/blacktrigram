import React, { useState, useCallback, useEffect } from "react";
import { Stage, Container, useTick } from "@pixi/react";
import {
  type PlayerState,
  type GamePhase,
  type TrigramStance,
  type HitEffect,
  KOREAN_COLORS,
} from "../../types";
import { DojangBackground } from "./DojangBackground";
import { Player } from "./Player";
import { HitEffectsLayer } from "./HitEffectsLayer";
import { useAudio } from "../../audio/AudioManager";

export interface GameEngineProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly gamePhase: GamePhase;
  readonly onGamePhaseChange: (phase: GamePhase) => void;
  readonly onPlayerUpdate: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
  readonly onStanceChange: (playerIndex: number, stance: TrigramStance) => void;
  readonly width?: number;
  readonly height?: number;
  readonly isPaused?: boolean;
}

export function GameEngine({
  players,
  gamePhase,
  onPlayerUpdate,
  onStanceChange,
  width = 800,
  height = 600,
  isPaused = false,
}: GameEngineProps): React.ReactElement {
  const audio = useAudio();
  const [hitEffects, setHitEffects] = useState<HitEffect[]>([]);

  // Game loop - Korean martial arts physics and combat
  useTick(
    useCallback(
      (delta: number) => {
        if (isPaused) return;

        const now = Date.now();

        // Update game physics and logic
        if (gamePhase === "combat") {
          // Update player positions based on velocity
          players.forEach((player, index) => {
            if (player.isMoving) {
              const newX = player.position.x + player.velocity.x * delta;
              const newY = player.position.y + player.velocity.y * delta;

              // Keep players within bounds
              const boundedX = Math.max(50, Math.min(width - 50, newX));
              const boundedY = Math.max(50, Math.min(height - 50, newY));

              onPlayerUpdate(index, {
                position: { x: boundedX, y: boundedY },
              });
            }
          });

          // Check for collisions and attacks
          if (players[0] && players[1]) {
            const distance = Math.abs(
              players[0].position.x - players[1].position.x
            );

            // Simple attack resolution
            if (distance < 80) {
              players.forEach((player, attackerIndex) => {
                if (player.isAttacking) {
                  const defenderIndex = attackerIndex === 0 ? 1 : 0;
                  const defender = players[defenderIndex];

                  if (!defender.isBlocking && Math.random() > 0.5) {
                    // Hit successful
                    const damage = 10 + Math.random() * 15;

                    // Create hit effect with proper color type (number)
                    const hitEffect: HitEffect = {
                      id: `hit-${now}-${attackerIndex}`,
                      position: { ...defender.position },
                      type: damage > 20 ? "heavy" : "medium",
                      damage: Math.round(damage),
                      startTime: now,
                      duration: 1000,
                      korean: damage > 20 ? "강타!" : "타격",
                      color: damage > 20 ? 0xff0000 : 0xffff00,
                      createdAt: now,
                    };

                    setHitEffects((prev) => [...prev, hitEffect]);

                    // Apply damage
                    onPlayerUpdate(defenderIndex, {
                      health: Math.max(0, defender.health - damage),
                      isAttacking: false, // Reset attack state
                    });

                    // Play hit sound
                    if (audio.playHitSound) {
                      audio.playHitSound(damage, damage > 20);
                    }
                  }

                  // Reset attacker state
                  onPlayerUpdate(attackerIndex, {
                    isAttacking: false,
                  });
                }
              });
            }
          }
        }
      },
      [isPaused, gamePhase, players, width, height, onPlayerUpdate, audio]
    )
  );

  // Korean martial arts keyboard input handling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (gamePhase !== "combat") return;

      const key = event.key.toLowerCase();

      // Player 1 controls (WASD + trigram stances 1-8)
      switch (key) {
        case "w":
          onPlayerUpdate(0, {
            velocity: { x: 0, y: -2 },
            isMoving: true,
            facing: players[0]?.facing || "right",
          });
          break;
        case "s":
          onPlayerUpdate(0, {
            velocity: { x: 0, y: 2 },
            isMoving: true,
            facing: players[0]?.facing || "right",
          });
          break;
        case "a":
          onPlayerUpdate(0, {
            velocity: { x: -2, y: 0 },
            isMoving: true,
            facing: "left",
          });
          break;
        case "d":
          onPlayerUpdate(0, {
            velocity: { x: 2, y: 0 },
            isMoving: true,
            facing: "right",
          });
          break;
        case " ":
          onPlayerUpdate(0, { isAttacking: true });
          if (audio.playAttackSound) {
            audio.playAttackSound(15);
          }
          break;
        case "shift":
          onPlayerUpdate(0, { isBlocking: true });
          break;

        // Trigram stance changes for Player 1 - Korean martial arts
        case "1":
          onStanceChange(0, "geon");
          break; // Heaven
        case "2":
          onStanceChange(0, "tae");
          break; // Lake
        case "3":
          onStanceChange(0, "li");
          break; // Fire
        case "4":
          onStanceChange(0, "jin");
          break; // Thunder
        case "5":
          onStanceChange(0, "son");
          break; // Wind
        case "6":
          onStanceChange(0, "gam");
          break; // Water
        case "7":
          onStanceChange(0, "gan");
          break; // Mountain
        case "8":
          onStanceChange(0, "gon");
          break; // Earth
      }

      // Player 2 controls (Arrow keys + NumPad)
      switch (event.code) {
        case "ArrowUp":
          onPlayerUpdate(1, {
            velocity: { x: 0, y: -2 },
            isMoving: true,
            facing: players[1]?.facing || "left",
          });
          break;
        case "ArrowDown":
          onPlayerUpdate(1, {
            velocity: { x: 0, y: 2 },
            isMoving: true,
            facing: players[1]?.facing || "left",
          });
          break;
        case "ArrowLeft":
          onPlayerUpdate(1, {
            velocity: { x: -2, y: 0 },
            isMoving: true,
            facing: "left",
          });
          break;
        case "ArrowRight":
          onPlayerUpdate(1, {
            velocity: { x: 2, y: 0 },
            isMoving: true,
            facing: "right",
          });
          break;
        case "Numpad0":
          onPlayerUpdate(1, { isAttacking: true });
          break;
        case "NumpadEnter":
          onPlayerUpdate(1, { isBlocking: true });
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent): void => {
      if (gamePhase !== "combat") return;

      const key = event.key.toLowerCase();

      // Stop movement for Player 1
      if (["w", "a", "s", "d"].includes(key)) {
        onPlayerUpdate(0, {
          velocity: { x: 0, y: 0 },
          isMoving: false,
        });
      }

      // Stop blocking for Player 1
      if (key === "shift") {
        onPlayerUpdate(0, { isBlocking: false });
      }

      // Stop movement for Player 2
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)
      ) {
        onPlayerUpdate(1, {
          velocity: { x: 0, y: 0 },
          isMoving: false,
        });
      }

      // Stop blocking for Player 2
      if (event.code === "NumpadEnter") {
        onPlayerUpdate(1, { isBlocking: false });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gamePhase, players, onPlayerUpdate, onStanceChange, audio]);

  // Handle hit effect completion
  const handleEffectComplete = useCallback((effectId: string) => {
    setHitEffects((prev) => prev.filter((effect) => effect.id !== effectId));
  }, []);

  return (
    <div style={{ width, height, position: "relative" }}>
      <Stage
        width={width}
        height={height}
        options={{
          backgroundColor: KOREAN_COLORS.BLACK,
          antialias: true,
        }}
      >
        <Container>
          {/* Korean dojang (training hall) background */}
          <DojangBackground width={width} height={height} />

          {/* Players with Korean martial arts visualization - Fix props */}
          {players[0] && (
            <Player
              player={players[0]}
              x={players[0].position.x}
              y={players[0].position.y}
            />
          )}

          {players[1] && (
            <Player
              player={players[1]}
              x={players[1].position.x}
              y={players[1].position.y}
            />
          )}

          {/* Korean martial arts hit effects */}
          <HitEffectsLayer
            effects={hitEffects}
            onEffectComplete={handleEffectComplete}
          />
        </Container>
      </Stage>
    </div>
  );
}
