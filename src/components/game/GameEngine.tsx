// Complete game engine for Black Trigram Korean martial arts

import React, { useEffect, useCallback } from "react";
import { usePixiExtensions } from "../../utils/pixiExtensions";
import { GameMode } from "../../types/enums"; // Fix: Import GameMode
import type { GameEngineProps } from "../../types/components";
import type { TrigramStance } from "../../types/trigram"; // Fix: Import TrigramStance

export const GameEngine: React.FC<GameEngineProps> = ({
  players,
  onPlayerUpdate,
  onCombatResult,
  onGameEvent,
  isPaused = false,
  gameMode,
  width = 800,
  height = 600,
}) => {
  usePixiExtensions();

  // Mock combat system for now
  const combatSystem = {
    updatePlayerState: (player: any, _deltaTime: number) => {
      // Simple health regeneration in training mode
      if (gameMode === GameMode.TRAINING) {
        return {
          ...player,
          stamina: Math.min(player.stamina + 0.1, player.maxStamina),
        };
      }
      return player;
    },
  };

  // Game loop
  useEffect(() => {
    if (isPaused) return;

    const gameLoop = setInterval(() => {
      // Update player states based on game mode
      if (gameMode === GameMode.TRAINING) {
        // Training mode updates
        players.forEach((player, index) => {
          // Simple training updates - regenerate resources
          const updatedPlayer = {
            ...player,
            ki: Math.min(player.maxKi, player.ki + 1),
            stamina: Math.min(player.maxStamina, player.stamina + 1),
          };
          if (updatedPlayer !== player) {
            onPlayerUpdate(index, updatedPlayer);
          }
        });
      } else {
        // Combat mode updates
        players.forEach((player, index) => {
          // Apply natural regeneration and status effects
          const updatedPlayer = combatSystem.updatePlayerState(player, 16);
          if (updatedPlayer !== player) {
            onPlayerUpdate(index, updatedPlayer);
          }
        });
      }

      // Check win conditions
      players.forEach((player, index) => {
        if (player.health <= 0 || player.consciousness <= 0) {
          const winner = index === 0 ? 1 : 0;
          onGameEvent("player_defeated", { winner });
        }
      });
    }, 16); // 60fps

    return () => clearInterval(gameLoop);
  }, [isPaused, players, combatSystem, onPlayerUpdate, onGameEvent, gameMode]);

  // Fix: Use technique execution handler
  const handleTechniqueExecution = useCallback(
    (technique: any) => {
      onGameEvent?.("technique_executed", { technique });

      onCombatResult?.({
        hit: true,
        damage: 10,
        criticalHit: false,
        vitalPointHit: false,
        effects: [],
        timestamp: Date.now(),
        success: true,
        isCritical: false,
        isBlocked: false,
      });
    },
    [onGameEvent, onCombatResult]
  );

  // Fix: Use stance change handler
  const handleStanceChange = useCallback(
    (playerIndex: number, newStance: TrigramStance) => {
      const player = players[playerIndex];
      if (player) {
        onPlayerUpdate(playerIndex, {
          currentStance: newStance,
          ki: Math.max(player.ki - 5, 0),
        });
        onGameEvent?.("stance_changed", { playerIndex, stance: newStance });
      }
    },
    [players, onPlayerUpdate, onGameEvent]
  );

  // Expose handlers for external use
  React.useEffect(() => {
    (window as any).gameEngine = {
      executeTechnique: handleTechniqueExecution,
      changeStance: handleStanceChange,
    };

    return () => {
      delete (window as any).gameEngine;
    };
  }, [handleTechniqueExecution, handleStanceChange]);

  return (
    <pixiContainer width={width} height={height} data-testid="game-engine">
      <pixiText
        text="Game Engine Active"
        style={{ fontSize: 12, fill: 0xffffff }}
        x={10}
        y={10}
      />
    </pixiContainer>
  );
};

export default GameEngine;
