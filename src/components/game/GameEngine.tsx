// Complete game engine for Black Trigram Korean martial arts

import React, { useEffect, useCallback, useMemo } from "react";
import { Container } from "@pixi/react";
import type { GameEngineProps } from "../../types/components";
import type { KoreanTechnique } from "../../types"; // Fix: Remove unused imports
import { GameMode, TrigramStance } from "../../types/enums";
import { CombatSystem } from "../../systems/CombatSystem";
import { VitalPointSystem } from "../../systems/VitalPointSystem";
import { TrigramSystem } from "../../systems/TrigramSystem";
import { GAME_CONFIG } from "../../types/constants";

export const GameEngine: React.FC<GameEngineProps> = ({
  players,
  onPlayerUpdate,
  onCombatResult,
  onGameEvent,
  isPaused = false,
  gameMode = GameMode.VERSUS, // Fix: Use gameMode parameter
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
}) => {
  // Initialize systems
  const combatSystem = useMemo(() => new CombatSystem(), []);
  const vitalPointSystem = useMemo(() => new VitalPointSystem(), []);
  const trigramSystem = useMemo(() => new TrigramSystem(), []);

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

  // Handle technique execution
  const handleTechniqueExecution = useCallback(
    (playerIndex: number, technique: KoreanTechnique) => {
      if (playerIndex < 0 || playerIndex >= players.length) return;

      const attacker = players[playerIndex];
      const defender = players[playerIndex === 0 ? 1 : 0];

      if (!attacker || !defender) return;

      // Fix: Execute technique through combat system with proper signature
      const result = combatSystem.resolveAttack(
        attacker,
        defender,
        technique, // Fix: Pass technique object, not technique.id
        undefined // No specific vital point targeting for now
      );

      // Apply combat result
      const { updatedAttacker, updatedDefender } =
        combatSystem.applyCombatResult(result, attacker, defender);

      // Update player states
      onPlayerUpdate(playerIndex, updatedAttacker);
      onPlayerUpdate(playerIndex === 0 ? 1 : 0, updatedDefender);

      // Send combat result
      onCombatResult(result);

      // Trigger game events based on result
      if (result.hit) {
        onGameEvent("technique_hit", {
          attacker: playerIndex,
          technique: technique.id, // Fix: Use technique.id for event data
          damage: result.damage,
        });
      }

      if (result.criticalHit) {
        onGameEvent("critical_hit", {
          attacker: playerIndex,
          damage: result.damage,
        });
      }

      if (result.vitalPointHit) {
        onGameEvent("vital_point_hit", {
          attacker: playerIndex,
          damage: result.damage,
        });
      }
    },
    [players, combatSystem, onPlayerUpdate, onCombatResult, onGameEvent]
  );

  // Handle stance changes
  const handleStanceChange = useCallback(
    (playerIndex: number, newStance: TrigramStance) => {
      if (playerIndex < 0 || playerIndex >= players.length) return;

      const player = players[playerIndex];
      if (!player) return;

      // Fix: Check if stance change is valid using basic conditions
      const canChange =
        player.ki >= 10 &&
        player.stamina >= 5 &&
        !player.isStunned &&
        player.currentStance !== newStance;

      if (canChange) {
        const updatedPlayer = {
          ...player,
          currentStance: newStance,
          ki: player.ki - 10,
          stamina: player.stamina - 5,
          lastStanceChangeTime: Date.now(),
        };

        onPlayerUpdate(playerIndex, updatedPlayer);
        onGameEvent("stance_changed", {
          player: playerIndex,
          newStance,
          previousStance: player.currentStance,
        });
      }
    },
    [players, onPlayerUpdate, onGameEvent]
  );

  // Expose engine methods through container props (for external control)
  const engineRef = useCallback(
    (container: any) => {
      if (container) {
        // Attach engine methods to container for external access
        container.executeTechnique = handleTechniqueExecution;
        container.changeStance = handleStanceChange;
        container.getCombatSystem = () => combatSystem;
        container.getVitalPointSystem = () => vitalPointSystem;
        container.getTrigramSystem = () => trigramSystem;
      }
    },
    [
      handleTechniqueExecution,
      handleStanceChange,
      combatSystem,
      vitalPointSystem,
      trigramSystem,
    ]
  );

  return (
    <Container
      ref={engineRef}
      width={width}
      height={height}
      interactive={false}
      visible={false} // Engine is invisible, only handles logic
    />
  );
};

export default GameEngine;
