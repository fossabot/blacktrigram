// Complete game engine for Black Trigram Korean martial arts

import React, { useState, useCallback, useEffect } from "react";
import { Container, Graphics, Text, useTick } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { GameEngineProps } from "../../types/components";
import type { PlayerState, CombatResult, HitEffect } from "../../types"; // Fix: Remove unused Position import
import {
  GameMode, // Fix: Import from correct location
  TrigramStance,
  PlayerArchetype,
} from "../../types/enums";
import {
  KOREAN_COLORS,
  // Fix: Remove unused FONT_FAMILY and FONT_WEIGHTS imports
  FONT_SIZES,
  GAME_CONFIG,
} from "../../types/constants";
import { CombatSystem } from "../../systems/CombatSystem";
import { TrigramSystem } from "../../systems/TrigramSystem";

export const GameEngine: React.FC<GameEngineProps> = ({
  player1,
  player2,
  onPlayer1Update,
  onPlayer2Update,
  onCombatResult,
  gameMode = GameMode.VERSUS,
  isPaused = false,
}) => {
  const [gameTime, setGameTime] = useState(0);
  const [combatEffects, setCombatEffects] = useState<HitEffect[]>([]);

  // Animation loop
  useTick((delta) => {
    if (!isPaused) {
      setGameTime((prevTime) => prevTime + delta);

      // Clean up expired effects
      setCombatEffects((effects) =>
        effects
          .filter((effect) => effect.lifespan > 0)
          .map((effect) => ({
            ...effect,
            lifespan: effect.lifespan - delta,
            position: {
              x: effect.position.x + (effect.velocity?.x || 0) * delta,
              y: effect.position.y + (effect.velocity?.y || 0) * delta,
            },
          }))
      );
    }
  });

  // Create helper function to ensure complete PlayerState objects
  const createCompletePlayerState = useCallback(
    (basePlayer: PlayerState, updates: Partial<PlayerState>): PlayerState => ({
      ...basePlayer,
      ...updates,
      id: updates.id || basePlayer.id,
    }),
    []
  );

  // Simplified combat result handler
  const processCombatResult = useCallback(
    (combatResult: CombatResult) => {
      if (combatResult.updatedAttacker && combatResult.updatedDefender) {
        const attackerIsPlayer1 =
          combatResult.updatedAttacker.id === player1.id;

        const updatedAttacker = createCompletePlayerState(
          attackerIsPlayer1 ? player1 : player2,
          combatResult.updatedAttacker
        );

        const updatedDefender = createCompletePlayerState(
          attackerIsPlayer1 ? player2 : player1,
          combatResult.updatedDefender
        );

        if (attackerIsPlayer1) {
          onPlayer1Update?.(updatedAttacker);
          onPlayer2Update?.(updatedDefender);
        } else {
          onPlayer1Update?.(updatedDefender);
          onPlayer2Update?.(updatedAttacker);
        }
      }

      onCombatResult?.(combatResult);
    },
    [
      player1,
      player2,
      onPlayer1Update,
      onPlayer2Update,
      onCombatResult,
      createCompletePlayerState,
    ]
  );

  // Handle keyboard input for combat
  const handleKeyDown = useCallback(
    async (event: KeyboardEvent) => {
      if (isPaused) return;

      const key = event.key;

      // Stance changes (1-8 keys)
      if (key >= "1" && key <= "8") {
        const stanceIndex = parseInt(key) - 1;
        const stances = Object.values(TrigramStance);
        const newStance = stances[stanceIndex];

        if (newStance) {
          const updatedPlayer1: Partial<PlayerState> = {
            ...player1,
            currentStance: newStance,
          };
          onPlayer1Update?.(updatedPlayer1);
        }
        return;
      }

      // Combat actions
      switch (key) {
        case " ": // Space - Execute technique
          event.preventDefault();
          try {
            const technique = TrigramSystem.getTechniqueForStance(
              player1.currentStance
            );
            if (technique) {
              const combatResult = await CombatSystem.executeAttack(
                player1,
                player2,
                technique
              );
              processCombatResult(combatResult);
            }
          } catch (error) {
            console.error("Combat execution error:", error);
          }
          break;

        case "Shift": // Guard/Block
          event.preventDefault();
          const updatedPlayer1Guard: Partial<PlayerState> = {
            ...player1,
            isGuarding: !player1.isGuarding,
          };
          onPlayer1Update?.(updatedPlayer1Guard);
          break;

        case "Tab": // Cycle archetype (for training)
          event.preventDefault();
          if (gameMode === GameMode.TRAINING) {
            const archetypes = Object.values(PlayerArchetype);
            const currentIndex = archetypes.indexOf(player1.archetype);
            const nextIndex = (currentIndex + 1) % archetypes.length;
            const updatedPlayer1Archetype: Partial<PlayerState> = {
              ...player1,
              archetype: archetypes[nextIndex],
            };
            onPlayer1Update?.(updatedPlayer1Archetype);
          }
          break;
      }
    },
    [isPaused, player1, player2, onPlayer1Update, processCombatResult, gameMode]
  );

  // Set up keyboard event listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Render game components
  return (
    <Container data-testid="game-engine">
      {/* Game time display */}
      <Text
        text={`시간: ${Math.floor(gameTime / 60)}분 ${Math.floor(
          gameTime % 60
        )}초`}
        style={
          new PIXI.TextStyle({
            fontSize: 16,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
          })
        }
        x={10}
        y={10}
      />

      {/* Combat effects layer */}
      <Container data-testid="combat-effects">
        {combatEffects.map((effect) => (
          <Container
            key={effect.id}
            x={effect.position.x}
            y={effect.position.y}
          >
            <Graphics
              draw={(g: PIXI.Graphics) => {
                g.clear();
                g.beginFill(effect.color || KOREAN_COLORS.ACCENT_RED, 0.8);
                g.drawCircle(0, 0, (effect.damage || 10) * 0.5 + 5);
                g.endFill();
              }}
            />
            {effect.damage && (
              <Text
                text={effect.damage.toString()}
                anchor={0.5}
                style={
                  new PIXI.TextStyle({
                    fontSize: 14,
                    fill: KOREAN_COLORS.TEXT_PRIMARY,
                  })
                }
              />
            )}
          </Container>
        ))}
      </Container>

      {/* Game state indicators */}
      {isPaused && (
        <Container
          x={GAME_CONFIG.CANVAS_WIDTH / 2}
          y={GAME_CONFIG.CANVAS_HEIGHT / 2}
        >
          <Text
            text="일시정지 (Paused)"
            anchor={0.5}
            style={
              new PIXI.TextStyle({
                fontSize: FONT_SIZES.xlarge,
                fill: KOREAN_COLORS.WARNING_YELLOW,
                fontWeight: "bold",
              })
            }
          />
        </Container>
      )}
    </Container>
  );
};

export default GameEngine;
