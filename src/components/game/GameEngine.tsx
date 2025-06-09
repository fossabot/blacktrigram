// Complete game engine for Black Trigram Korean martial arts

import React, { useCallback } from "react";
import { Container } from "@pixi/react";
import { useTick } from "@pixi/react";
import type { GameEngineProps, PlayerState } from "../../types/components";
import { CombatSystem } from "../../systems/CombatSystem";
import { TrigramSystem } from "../../systems/TrigramSystem";
import { VitalPointSystem } from "../../systems/VitalPointSystem";
import { CombatState } from "@/types/enums";

export const GameEngine: React.FC<GameEngineProps> = ({
  players,
  onPlayerUpdate,
  onCombatResult,
  onGameEvent,
  isPaused = false,
}) => {
  // Initialize game systems
  const combatSystem = React.useMemo(() => new CombatSystem(), []);
  const vitalPointSystem = React.useMemo(() => new VitalPointSystem(), []);
  const trigramSystem = React.useMemo(() => new TrigramSystem(), []);

  // Game loop
  useTick(() => {
    if (isPaused) return;

    // Update player states
    const updatedPlayers = players.map((player, index) => {
      if (player.health <= 0) return player;

      const updatedPlayer = trigramSystem.updatePlayerKiFlow(player);
      onPlayerUpdate(index, updatedPlayer);
      return updatedPlayer;
    });

    // Check win conditions
    if (updatedPlayers[0] && updatedPlayers[0].health <= 0) {
      onGameEvent("player_defeated", { winner: 1 });
    } else if (updatedPlayers[1] && updatedPlayers[1].health <= 0) {
      onGameEvent("player_defeated", { winner: 0 });
    }
  });

  useTick(() => {
    if (isPaused) return;
    // Additional game logic here if needed
  });

  // Handle combat techniques
  const handleTechniqueExecution = useCallback(
    (attackerIndex: number, targetVitalPoint?: string) => {
      const attacker = players[attackerIndex];
      const defenderIndex = attackerIndex === 0 ? 1 : 0;
      const defender = players[defenderIndex];

      if (!attacker || !defender || attacker.health <= 0) return;

      // Check if attacker can act
      if (!canPlayerAct(attacker)) return;

      // Fix: Use correct parameter signature (3 arguments)
      const result = combatSystem.resolveAttack(
        attacker,
        defender,
        targetVitalPoint
      );

      // Apply results
      const { updatedAttacker, updatedDefender } =
        combatSystem.applyCombatResult(result, attacker, defender);

      // Update players
      onPlayerUpdate(attackerIndex, updatedAttacker);
      onPlayerUpdate(defenderIndex, updatedDefender);

      // Notify combat result
      onCombatResult(result);

      // Fire game events
      if (result.hit) {
        onGameEvent("player_hit", {
          attacker: attackerIndex,
          defender: defenderIndex,
          damage: result.damage,
          critical: result.criticalHit,
          vitalPoint: result.vitalPointHit,
        });
      }
    },
    [players, combatSystem, onPlayerUpdate, onCombatResult, onGameEvent]
  );

  // Helper function to check if player can act
  const canPlayerAct = (player: PlayerState): boolean => {
    return (
      !player.isStunned &&
      player.health > 0 &&
      player.combatState !== CombatState.RECOVERING &&
      player.ki >= 5 && // Minimum Ki required
      player.stamina >= 5 // Minimum stamina required
    );
  };

  // Expose engine methods for external use
  React.useEffect(() => {
    // Add engine methods to global scope for debugging
    (window as any).gameEngine = {
      handleTechniqueExecution,
      combatSystem,
      vitalPointSystem,
      trigramSystem,
      players,
    };
  }, [
    handleTechniqueExecution,
    combatSystem,
    vitalPointSystem,
    trigramSystem,
    players,
  ]);

  return (
    <Container name="GameEngine">
      {/* Game engine is invisible - it only manages game logic */}
    </Container>
  );
};

export default GameEngine;
