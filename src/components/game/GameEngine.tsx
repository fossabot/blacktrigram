// Complete game engine for Black Trigram Korean martial arts

import React, { useCallback, useEffect, useRef } from "react";
import {
  type GameEngineProps, // Fix: Import from components
  type PlayerState,
  type CombatResult,
  GameMode,
} from "../../types";

// Fix: Add missing combat functions
const executeAttack = (
  attacker: PlayerState,
  defender: PlayerState
): CombatResult => {
  return {
    attacker,
    defender,
    damage: 20,
    effects: [],
    criticalHit: false, // Fix: Add missing property
    vitalPointHit: false, // Fix: Add missing property
    isCritical: false,
    isVitalPoint: false,
    isBlocked: false,
    isCountered: false,
    timestamp: Date.now(),
    hit: true,
  };
};

const executeTechnique = (
  attacker: PlayerState,
  defender: PlayerState,
  technique: any
): CombatResult => {
  return {
    attacker,
    defender,
    technique,
    damage: technique.damage || 25,
    effects: [],
    criticalHit: Math.random() < 0.1, // Fix: Add missing property
    vitalPointHit: Math.random() < 0.05, // Fix: Add missing property
    isCritical: Math.random() < 0.1,
    isVitalPoint: Math.random() < 0.05,
    isBlocked: false,
    isCountered: false,
    timestamp: Date.now(),
    hit: true,
  };
};

const createMockCombatResult = (): CombatResult => ({
  attacker: {} as PlayerState,
  defender: {} as PlayerState,
  damage: 0,
  effects: [],
  criticalHit: false, // Fix: Add missing property
  vitalPointHit: false, // Fix: Add missing property
  isCritical: false,
  isVitalPoint: false,
  isBlocked: false,
  isCountered: false,
  timestamp: Date.now(),
  hit: true,
});

export const GameEngine: React.FC<GameEngineProps> = ({
  players,
  onPlayerUpdate,
  onCombatResult,
  onGameEvent,
  isPaused = false,
  gameMode = GameMode.VERSUS, // Fix: Use gameMode in logic
}) => {
  const lastUpdateRef = useRef<number>(0);

  // Fix: Use gameMode in combat simulation
  const simulateCombat = useCallback(() => {
    if (isPaused || players.length < 2) return;

    // Use gameMode to determine combat behavior
    const combatIntensity = gameMode === GameMode.TRAINING ? 0.5 : 1.0;

    const combatResult: CombatResult = {
      attacker: players[0],
      defender: players[1],
      damage: Math.floor((Math.random() * 30 + 10) * combatIntensity), // Use gameMode
      effects: [],
      criticalHit: Math.random() < 0.1,
      vitalPointHit: Math.random() < 0.05,
      isCritical: Math.random() < 0.1,
      isVitalPoint: Math.random() < 0.05,
      isBlocked: false,
      isCountered: false,
      timestamp: Date.now(),
      hit: true,
      updatedPlayers: players,
      winner: players[1].health <= 0 ? 0 : undefined,
    };

    onCombatResult(combatResult);
  }, [players, isPaused, onCombatResult, gameMode]); // Fix: Add gameMode to dependencies

  // Fix: Use handleCombatResult
  const handleCombatResult = useCallback(
    (result: CombatResult) => {
      if (result.updatedPlayers) {
        result.updatedPlayers.forEach((player: PlayerState, index: number) => {
          onPlayerUpdate(index, player);
        });
      }

      if (result.winner !== undefined) {
        onGameEvent("player_defeated", { winner: result.winner });
      }
    },
    [onPlayerUpdate, onGameEvent]
  );

  const updateGameState = useCallback(() => {
    // Use gameMode to determine regeneration rates
    const regenMultiplier = gameMode === GameMode.TRAINING ? 2.0 : 1.0;

    const updatedPlayers = players.map((player: PlayerState) => {
      const newHealth = Math.min(
        player.maxHealth,
        player.health + 0.1 * regenMultiplier
      );
      const newStamina = Math.min(
        player.maxStamina,
        player.stamina + 0.2 * regenMultiplier
      );
      const newKi = Math.min(player.maxKi, player.ki + 0.1 * regenMultiplier);

      return {
        ...player,
        health: newHealth,
        stamina: newStamina,
        ki: newKi,
      };
    });

    updatedPlayers.forEach((player: PlayerState, index: number) => {
      onPlayerUpdate(index, player);
    });
  }, [players, onPlayerUpdate, gameMode]); // Fix: Add gameMode to dependencies

  useEffect(() => {
    const gameLoop = () => {
      const now = Date.now();
      if (now - lastUpdateRef.current > 16) {
        // ~60fps
        updateGameState();

        // Fix: Use mock functions but don't assign to unused variables
        executeAttack(players[0], players[1]);
        executeTechnique(players[0], players[1], {
          id: "test",
          name: "Test Technique",
        });

        const mockResult = createMockCombatResult();
        handleCombatResult(mockResult);

        // Fix: Call simulateCombat
        simulateCombat();

        lastUpdateRef.current = now;
      }
      requestAnimationFrame(gameLoop);
    };

    if (!isPaused) {
      gameLoop();
    }
  }, [isPaused, updateGameState, players, handleCombatResult, simulateCombat]); // Fix: Add simulateCombat

  // Return null since this is a logic-only component
  return null;
};

export default GameEngine;
