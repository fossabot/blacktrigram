// Complete game engine for Black Trigram Korean martial arts

import React, { useEffect, useCallback, useMemo } from "react";
import { Container } from "@pixi/react";
import type { GameEngineProps, PlayerState, CombatResult } from "../../types";
import { CombatSystem } from "../../systems/CombatSystem";
import { VitalPointSystem } from "../../systems/VitalPointSystem";
import { TrigramSystem } from "../../systems/TrigramSystem";
import { GameMode, CombatState } from "../../types/enums";
import { useTick } from "@pixi/react";

export const GameEngine: React.FC<GameEngineProps> = ({
  players,
  onPlayerUpdate,
  onCombatResult,
  onGameEvent,
  isPaused = false,
  gameMode = GameMode.VERSUS,
  width = 800,
  height = 600,
}) => {
  // Initialize game systems
  const combatSystem = useMemo(() => new CombatSystem(), []);
  const vitalPointSystem = useMemo(() => new VitalPointSystem(), []);
  const trigramSystem = useMemo(() => new TrigramSystem(), []);

  // Game loop
  useTick((delta) => {
    if (isPaused) return;

    // Update game systems
    updateGameSystems(delta);

    // Check win conditions
    checkWinConditions();
  });

  const updateGameSystems = useCallback(
    (deltaTime: number) => {
      // Update player Ki flow based on stance
      players.forEach((player, index) => {
        if (player.health <= 0) return;

        const updatedPlayer = trigramSystem.updatePlayerKiFlow(player);
        if (updatedPlayer !== player) {
          onPlayerUpdate(index, updatedPlayer);
        }
      });

      // Update status effects
      updateStatusEffects(deltaTime);

      // Update combat states
      updateCombatStates(deltaTime);
    },
    [players, onPlayerUpdate, trigramSystem]
  );

  const updateStatusEffects = useCallback(
    (deltaTime: number) => {
      const currentTime = Date.now();

      players.forEach((player, index) => {
        const activeEffects = player.statusEffects.filter(
          (effect) => effect.endTime > currentTime
        );

        if (activeEffects.length !== player.statusEffects.length) {
          onPlayerUpdate(index, { statusEffects: activeEffects });
        }
      });
    },
    [players, onPlayerUpdate]
  );

  const updateCombatStates = useCallback(
    (deltaTime: number) => {
      const currentTime = Date.now();

      players.forEach((player, index) => {
        // Check if player should exit recovery state
        if (
          player.combatState === CombatState.RECOVERING &&
          currentTime - player.lastActionTime > player.recoveryTime
        ) {
          onPlayerUpdate(index, { combatState: CombatState.IDLE });
        }

        // Check if stun should end
        if (player.isStunned && player.health > 0) {
          const stunDuration = 2000; // 2 seconds
          if (currentTime - player.lastActionTime > stunDuration) {
            onPlayerUpdate(index, {
              isStunned: false,
              combatState: CombatState.IDLE,
            });
          }
        }
      });
    },
    [players, onPlayerUpdate]
  );

  const checkWinConditions = useCallback(() => {
    const alivePlayers = players.filter((player) => player.health > 0);

    if (alivePlayers.length === 1) {
      const winnerIndex = players.indexOf(alivePlayers[0]);
      onGameEvent("player_victory", { winner: winnerIndex });
    } else if (alivePlayers.length === 0) {
      onGameEvent("draw", {});
    }
  }, [players, onGameEvent]);

  // Handle combat techniques
  const handleTechniqueExecution = useCallback(
    (attackerIndex: number, technique: any, targetVitalPoint?: string) => {
      const attacker = players[attackerIndex];
      const defenderIndex = attackerIndex === 0 ? 1 : 0;
      const defender = players[defenderIndex];

      if (!attacker || !defender || attacker.health <= 0) return;

      // Check if attacker can act
      if (!canPlayerAct(attacker)) return;

      // Resolve the attack
      const result: CombatResult = combatSystem.resolveAttack(
        attacker,
        defender,
        technique,
        targetVitalPoint
      );

      // Apply results
      const { updatedAttacker, updatedDefender } =
        CombatSystem.applyCombatResult(result, attacker, defender);

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
  useEffect(() => {
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
    <Container name="GameEngine" width={width} height={height}>
      {/* Game engine is invisible - it only manages game logic */}
    </Container>
  );
};

export default GameEngine;
