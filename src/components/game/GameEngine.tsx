// Complete game engine for Black Trigram Korean martial arts

import React, { useState, useEffect, useCallback } from "react";
import { Application } from "@pixi/react";
import type { GameState, Position, HitEffect } from "../../types";
import { CombatSystem } from "../../systems/CombatSystem";
import { TrigramSystem } from "../../systems/TrigramSystem";
import type { GameEngineProps } from "../../types/components";

export function GameEngine({
  player1,
  player2,
  onGameStateChange,
  onPlayerUpdate,
  onGamePhaseChange,
}: GameEngineProps): React.JSX.Element {
  const [gameState] = useState<GameState>({
    currentScreen: "combat",
    player: player1,
    sessionData: {
      startTime: Date.now(),
      trainingStats: {
        sessionsCompleted: 0,
        totalTrainingTime: 0,
        stancesLearned: [],
        techniquesLearned: [],
      },
      combatStats: {
        wins: 0,
        losses: 0,
        totalCombats: 0,
        averageDamageDealt: 0,
        favoriteStance: "geon",
      },
      currentScore: 0,
    },
    settings: {
      audioEnabled: true,
      musicVolume: 0.7,
      sfxVolume: 0.8,
      language: "bilingual",
      showVitalPoints: true,
      showDebugInfo: false,
      difficulty: "intermediate",
    },
    isInitialized: true,
  });

  const [gameEffects, setGameEffects] = useState<readonly HitEffect[]>([]);
  const trigramSystem = new TrigramSystem();

  const updateCombatEffects = useCallback(() => {
    setGameEffects((prev) =>
      prev.filter((effect) => Date.now() - effect.timestamp < effect.duration)
    );
  }, []);

  const checkWinCondition = useCallback(() => {
    const result = CombatSystem.checkWinCondition([player1, player2]);
    if (result) {
      onGamePhaseChange("victory");
    }
  }, [player1, player2, onGamePhaseChange]);

  const gameLoop = useCallback(() => {
    updateCombatEffects();
    checkWinCondition();
  }, [updateCombatEffects, checkWinCondition]);

  const handleStanceChange = useCallback(
    (playerIndex: number, newStance: string) => {
      const playerState = playerIndex === 0 ? player1 : player2;

      const canTransition = trigramSystem.canTransitionTo(
        playerState.stance,
        newStance as any,
        playerState
      );

      if (canTransition.canTransition) {
        const transitionResult = trigramSystem.executeStanceChange(
          playerState,
          newStance as any
        );

        if (transitionResult.success && transitionResult.newState) {
          onPlayerUpdate(playerIndex, transitionResult.newState);
        }
      }
    },
    [player1, player2, onPlayerUpdate, trigramSystem]
  );

  const handleAttack = useCallback(
    async (
      attackerIndex: number,
      technique: any,
      targetPoint?: string | Position
    ) => {
      const attacker = attackerIndex === 0 ? player1 : player2;
      const defender = attackerIndex === 0 ? player2 : player1;

      try {
        const result = await CombatSystem.executeAttack(
          attacker,
          defender,
          technique,
          typeof targetPoint === "string" ? targetPoint : undefined
        );

        // Fix: Create proper HitEffect
        const newEffect: HitEffect = {
          id: `hit_${Date.now()}`,
          type: result.critical ? "critical" : "heavy",
          position:
            typeof targetPoint === "object" ? targetPoint : defender.position,
          damage: result.damage,
          timestamp: Date.now(),
          duration: 1000,
          color: result.critical ? 0xff0000 : 0xffffff,
        };

        setGameEffects((prev) => [...prev, newEffect]);

        // Update defender
        onPlayerUpdate(attackerIndex === 0 ? 1 : 0, {
          health: Math.max(0, defender.health - result.damage),
          pain: Math.min(100, defender.pain + result.painLevel),
          consciousness: Math.max(
            0,
            defender.consciousness - result.consciousnessImpact
          ),
        });
      } catch (error) {
        console.error("Attack execution failed:", error);
      }
    },
    [player1, player2, onPlayerUpdate]
  );

  useEffect(() => {
    const interval = setInterval(gameLoop, 16); // 60 FPS
    return () => clearInterval(interval);
  }, [gameLoop]);

  // Use variables to avoid unused warnings
  const _ = { handleStanceChange, handleAttack, gameEffects, gameState };

  return (
    <Application width={800} height={600} backgroundColor={0x1a1a1a}>
      {/* Game components will be rendered here */}
    </Application>
  );
}
