import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Container, Stage, useTick } from "@pixi/react";
import type {
  PlayerState,
  TrigramStance,
  GamePhase,
  HitEffect,
  AttackResult,
} from "../../types";
import { TRIGRAM_DATA } from "../../types";
import { Player } from "./Player";
import { DojangBackground } from "./DojangBackground";
import { HitEffectsLayer } from "./HitEffectsLayer";
import { CombatSystem } from "../../systems/CombatSystem";
import { TrigramSystem } from "../../systems/TrigramSystem";
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
  onGamePhaseChange,
  onPlayerUpdate,
  onStanceChange,
  width = 800,
  height = 600,
  isPaused = false,
}: GameEngineProps): React.ReactElement {
  const audio = useAudio();
  const [hitEffects, setHitEffects] = useState<HitEffect[]>([]);

  // Korean martial arts key mappings for trigram stances - fix type safety
  const koreanKeyMappings = useMemo(
    () =>
      ({
        "1": "geon",
        "2": "tae",
        "3": "li",
        "4": "jin",
        "5": "son",
        "6": "gam",
        "7": "gan",
        "8": "gon",
      } as const satisfies Record<string, TrigramStance>),
    []
  );

  // Game loop - Korean martial arts physics and combat
  useTick(
    useCallback(
      (delta: number) => {
        if (isPaused || gamePhase !== "combat") return;

        // Update players with Korean martial arts physics
        players.forEach((player, index) => {
          if (!player) return;

          const updates: Partial<PlayerState> = {};

          // Korean martial arts Ki regeneration based on stance
          const kiRegenRate = TrigramSystem.getKiRegenRate(player.stance);
          if (player.ki < player.maxKi) {
            updates.ki = Math.min(
              player.maxKi,
              player.ki + kiRegenRate * delta * 0.01
            );
          }

          // Stamina regeneration
          if (player.stamina < player.maxStamina && !player.isAttacking) {
            updates.stamina = Math.min(
              player.maxStamina,
              player.stamina + delta * 0.02
            );
          }

          // Position updates for movement
          if (player.isMoving && player.velocity) {
            const newX = player.position.x + player.velocity.x * delta * 0.1;
            const newY = player.position.y + player.velocity.y * delta * 0.1;

            // Boundary checking for dojang (training hall)
            updates.position = {
              x: Math.max(50, Math.min(width - 50, newX)),
              y: Math.max(100, Math.min(height - 100, newY)),
            };
          }

          // Apply updates if any
          if (Object.keys(updates).length > 0) {
            onPlayerUpdate(index, updates);
          }
        });

        // Remove expired hit effects
        setHitEffects((prev) =>
          prev.filter(
            (effect) => Date.now() - effect.startTime < effect.duration
          )
        );
      },
      [isPaused, gamePhase, players, width, height, onPlayerUpdate]
    )
  );

  // Korean martial arts keyboard input handling
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gamePhase !== "combat") return;

      const key = event.key;

      // Fix type safety for stance lookup
      if (key in koreanKeyMappings) {
        const stance = koreanKeyMappings[key as keyof typeof koreanKeyMappings];

        // Player 1 controls (trigram stance changes)
        const player1 = players[0];
        if (player1 && player1.ki >= 10) {
          // Require Ki for stance change
          onStanceChange(0, stance);
          onPlayerUpdate(0, {
            ki: Math.max(0, player1.ki - 10),
            lastStanceChangeTime: Date.now(),
          });

          // Play Korean martial arts audio feedback
          if (audio.playStanceChangeSound) {
            audio.playStanceChangeSound();
          }

          // Add combat log entry - fix type safety
          const techniqueData = TRIGRAM_DATA[stance];
          console.log(
            `Player 1: ${techniqueData.koreanName} (${techniqueData.english})`
          );
        }
      }

      // Attack controls (Space for Player 1)
      if (event.code === "Space") {
        event.preventDefault();
        executeAttack(0);
      }

      // Player 2 AI or second player controls could be added here
      // For now, focusing on Player 1 training mode
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    gamePhase,
    players,
    koreanKeyMappings,
    onStanceChange,
    onPlayerUpdate,
    audio,
  ]);

  // Execute Korean martial arts attack
  const executeAttack = useCallback(
    (playerIndex: number) => {
      const attacker = players[playerIndex];
      const defender = players[1 - playerIndex]; // Get opponent

      if (!attacker || !defender) return;

      // Get Korean technique for current stance
      const technique = TrigramSystem.getTechniqueForStance(attacker.stance);
      if (!technique) return;

      // Check if player has enough resources
      if (
        attacker.ki < technique.kiCost ||
        attacker.stamina < technique.staminaCost
      ) {
        return; // Not enough resources
      }

      // Execute attack using Korean martial arts combat system
      const attackResult: AttackResult = CombatSystem.resolveAttack(
        attacker,
        defender,
        technique
      );

      // Create hit effect for visual feedback
      const hitEffect: HitEffect = {
        id: `hit-${Date.now()}`,
        position: { x: defender.position.x, y: defender.position.y - 30 },
        type: attackResult.critical
          ? "critical"
          : attackResult.damage > 20
          ? "heavy"
          : attackResult.damage > 10
          ? "medium"
          : "light",
        damage: attackResult.damage,
        startTime: Date.now(),
        duration: 1500,
        korean: attackResult.critical ? "치명타!" : "타격",
        color: attackResult.critical ? 0xff0000 : 0xffd700,
        createdAt: Date.now(),
      };

      setHitEffects((prev) => [...prev, hitEffect]);

      // Update game state
      onPlayerUpdate(playerIndex, {
        ...attackResult.attackerState,
        isAttacking: true,
      });

      onPlayerUpdate(1 - playerIndex, attackResult.defenderState);

      // Log attack with Korean names
      console.log(
        `${technique.koreanName}: ${attackResult.damage} 피해 (${attackResult.description})`
      );

      // Reset attacking state after animation
      setTimeout(() => {
        onPlayerUpdate(playerIndex, { isAttacking: false });
      }, 500);

      // Check for victory condition
      if (attackResult.defenderState.health <= 0) {
        setTimeout(() => {
          onGamePhaseChange("victory");
        }, 1000);
      }
    },
    [players, onPlayerUpdate, onGamePhaseChange]
  );

  // Handle hit effect completion
  const handleEffectComplete = useCallback((effectId: string) => {
    setHitEffects((prev) => prev.filter((effect) => effect.id !== effectId));
  }, []);

  return (
    <Stage
      width={width}
      height={height}
      options={{
        backgroundColor: 0x1a1a2e,
        antialias: true,
        autoDensity: true,
        resolution: window.devicePixelRatio || 1,
      }}
    >
      <Container>
        {/* Korean dojang (training hall) background */}
        <DojangBackground width={width} height={height} />

        {/* Players with Korean martial arts visualization */}
        {players.map((player, index) =>
          player ? (
            <Player
              key={player.playerId}
              player={player}
              onStanceChange={(stance: string) => {
                // Convert string stance back to TrigramStance and use playerIndex
                const trigramStance = stance as TrigramStance;
                onStanceChange(index, trigramStance);
              }}
            />
          ) : null
        )}

        {/* Korean martial arts hit effects */}
        <HitEffectsLayer
          effects={hitEffects}
          onEffectComplete={handleEffectComplete}
        />

        {/* Combat log overlay (could be moved to UI layer) */}
        {gamePhase === "combat" && (
          <Container x={10} y={10}>
            {/* Combat log rendering would go here */}
          </Container>
        )}
      </Container>
    </Stage>
  );
}
