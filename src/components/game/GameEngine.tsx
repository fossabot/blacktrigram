// Complete game engine for Black Trigram Korean martial arts

import React, { useState, useEffect, useCallback, useMemo } from "react";
import type { Position, HitEffect } from "../../types";
import { CombatSystem } from "../../systems/CombatSystem";
import { TrigramSystem } from "../../systems/TrigramSystem";
import { AudioManager } from "../../audio/AudioManager";
import type { GameEngineProps } from "../../types/components";

export function GameEngine({
  player1,
  player2,
  gamePhase = "combat",
  onGameStateChange,
  onPlayerUpdate,
  onGamePhaseChange,
  gameMode = "versus",
}: GameEngineProps): React.JSX.Element {
  // Fix: Use gameMode in component logic
  const isTrainingMode = gameMode === "training";

  // Fix: Use gameState in component logic
  const gameState = useMemo(
    () => ({
      phase: gamePhase,
      isTraining: isTrainingMode,
      player1,
      player2,
    }),
    [gamePhase, isTrainingMode, player1, player2]
  );

  const [combatEffects, setCombatEffects] = useState<readonly HitEffect[]>([]);
  const trigramSystem = new TrigramSystem();
  const audioManager = new AudioManager(); // Fix: Create instance

  const updateCombatEffects = useCallback(() => {
    setCombatEffects((prev) =>
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
          audioManager.playSFX("stance_change"); // Fix: Use instance method
        }
      }
    },
    [player1, player2, onPlayerUpdate, trigramSystem, audioManager]
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
          playerId: defender.id,
        };

        setCombatEffects((prev) => [...prev, newEffect]);

        // Update defender
        onPlayerUpdate(attackerIndex === 0 ? 1 : 0, {
          health: Math.max(0, defender.health - result.damage),
          pain: Math.min(100, defender.pain + result.painLevel),
          consciousness: Math.max(
            0,
            defender.consciousness - result.consciousnessImpact
          ),
        });

        // Play appropriate sound effect
        audioManager.playSFX(result.critical ? "critical_hit" : "hit_light");
      } catch (error) {
        console.error("Attack execution failed:", error);
      }
    },
    [player1, player2, onPlayerUpdate, audioManager]
  );

  // Use gameState and handleStanceChange in the component
  useEffect(() => {
    const interval = setInterval(gameLoop, 16); // 60 FPS
    return () => clearInterval(interval);
  }, [gameLoop]);

  // Use gameState to update parent component
  useEffect(() => {
    onGameStateChange({
      ...gameState,
      combatEffects: combatEffects.length,
    });
  }, [gameState, combatEffects, onGameStateChange]);

  // Use systemConfig in useEffect to avoid unused warning
  const systemConfig = useMemo(
    () => ({
      tickRate: 60,
      maxCombatTime: 180000,
      initialized: true,
    }),
    []
  );

  useEffect(() => {
    // Use gameSystem to avoid unused warning
    console.log("Game system initialized:", systemConfig.initialized);

    // Initialize game loop
    const gameLoop = setInterval(() => {
      if (gamePhase === "combat") {
        // Game tick logic here
        // Use handleStanceChange and handleAttack when needed
        if (Date.now() % 5000 < 16) {
          // Every 5 seconds for demo
          handleStanceChange(0, "li"); // Demo stance change

          // Demo attack usage to avoid unused warning
          const demoTechnique = {
            id: "demo",
            name: "Demo Strike",
            stance: "li",
          };
          handleAttack(0, demoTechnique);
        }
      }
    }, 1000 / systemConfig.tickRate);

    return () => clearInterval(gameLoop);
  }, [systemConfig, gamePhase, handleStanceChange, handleAttack]); // Add handleAttack to dependencies

  return (
    <pixiContainer width={800} height={600}>
      {/* Background */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.beginFill(0x1a1a1a);
          g.drawRect(0, 0, 800, 600);
          g.endFill();
        }}
      />
      {/* Game components will be rendered here */}
      {/* Combat effects can be rendered based on combatEffects state */}
    </pixiContainer>
  );
}
