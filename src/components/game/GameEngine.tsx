// Complete game engine for Black Trigram Korean martial arts

import React, { useState, useEffect, useCallback, useRef } from "react";
import type {
  PlayerState,
  TrigramStance,
  CombatResult,
  PlayerArchetype,
  GameState,
  HitEffect,
} from "../../types";
import { CombatSystem } from "../../systems/CombatSystem";
import { TrigramSystem } from "../../systems/TrigramSystem";
import { VitalPointSystem } from "../../systems/VitalPointSystem";
import { useAudio } from "../../audio/AudioManager";
import { KOREAN_COLORS } from "../../types/constants";

export interface GameEngineProps {
  readonly player1: PlayerState;
  readonly player2: PlayerState;
  readonly onGameStateChange: (gameState: GameState) => void;
  readonly onPlayerUpdate: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
  readonly isPaused?: boolean;
  readonly gameMode?: "combat" | "training" | "demo";
}

interface EngineState {
  gameTime: number;
  frameCount: number;
  deltaTime: number;
  combatEffects: HitEffect[];
  isProcessingCombat: boolean;
}

export function GameEngine({
  player1,
  player2,
  onGameStateChange,
  onPlayerUpdate,
  isPaused = false,
  gameMode = "combat",
}: GameEngineProps): React.ReactElement {
  const audio = useAudio();
  const [engineState, setEngineState] = useState<EngineState>({
    gameTime: 0,
    frameCount: 0,
    deltaTime: 0,
    combatEffects: [],
    isProcessingCombat: false,
  });

  const lastTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>();

  // Combat and game systems
  const combatSystem = useRef(new CombatSystem());
  const trigramSystem = useRef(new TrigramSystem());
  const vitalPointSystem = useRef(new VitalPointSystem());

  // Main game loop
  const gameLoop = useCallback(
    (currentTime: number) => {
      if (isPaused) {
        animationFrameRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      setEngineState((prev) => ({
        ...prev,
        gameTime: prev.gameTime + deltaTime,
        frameCount: prev.frameCount + 1,
        deltaTime,
      }));

      // Update game systems
      updateGameSystems(deltaTime);

      // Continue game loop
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    },
    [isPaused]
  );

  // Update all game systems
  const updateGameSystems = useCallback(
    (deltaTime: number) => {
      // Update player states
      updatePlayerStates(deltaTime);

      // Update combat effects
      updateCombatEffects(deltaTime);

      // Check win conditions
      checkWinConditions();

      // Update AI if needed
      if (gameMode === "demo" || player2.archetype === "ai") {
        updateAI(deltaTime);
      }
    },
    [gameMode, player1, player2]
  );

  // Update player states based on time
  const updatePlayerStates = useCallback(
    (deltaTime: number) => {
      const updates1 = calculatePlayerUpdates(player1, deltaTime);
      const updates2 = calculatePlayerUpdates(player2, deltaTime);

      if (Object.keys(updates1).length > 0) {
        onPlayerUpdate(0, updates1);
      }
      if (Object.keys(updates2).length > 0) {
        onPlayerUpdate(1, updates2);
      }
    },
    [player1, player2, onPlayerUpdate]
  );

  // Calculate time-based player updates
  const calculatePlayerUpdates = (
    player: PlayerState,
    deltaTime: number
  ): Partial<PlayerState> => {
    const updates: Partial<PlayerState> = {};

    // Ki regeneration
    const kiRegenRate = trigramSystem.current.getKiRecoveryRate(player);
    const kiRegen = (kiRegenRate * deltaTime) / 1000;
    if (player.ki < player.maxKi) {
      updates.ki = Math.min(player.maxKi, player.ki + kiRegen);
    }

    // Stamina regeneration
    const staminaRegenRate = 5; // Base stamina regen per second
    const staminaRegen = (staminaRegenRate * deltaTime) / 1000;
    if (player.stamina < player.maxStamina) {
      updates.stamina = Math.min(
        player.maxStamina,
        player.stamina + staminaRegen
      );
    }

    // Pain reduction over time
    if (player.pain > 0) {
      const painReduction = (10 * deltaTime) / 1000; // 10 pain reduction per second
      updates.pain = Math.max(0, player.pain - painReduction);
    }

    // Update active effects
    if (player.activeEffects && player.activeEffects.length > 0) {
      const activeEffects = player.activeEffects
        .filter((effect) => {
          return effect.duration ? effect.duration > deltaTime : true;
        })
        .map((effect) => ({
          ...effect,
          duration: effect.duration
            ? Math.max(0, effect.duration - deltaTime)
            : effect.duration,
        }));

      if (activeEffects.length !== player.activeEffects.length) {
        updates.activeEffects = activeEffects;
      }
    }

    return updates;
  };

  // Update combat effects animation
  const updateCombatEffects = useCallback((deltaTime: number) => {
    setEngineState((prev) => ({
      ...prev,
      combatEffects: prev.combatEffects.filter((effect) => {
        const age = Date.now() - effect.startTime;
        return age < effect.duration;
      }),
    }));
  }, []);

  // Check for win conditions
  const checkWinConditions = useCallback(() => {
    const result = combatSystem.current.checkWinCondition(player1, player2);
    if (result) {
      onGameStateChange({
        phase: "gameOver",
        winner: result,
        players: [player1, player2],
        timeElapsed: engineState.gameTime,
        gameMode,
      });
      audio.playMusic("victory_theme");
    }
  }, [
    player1,
    player2,
    onGameStateChange,
    engineState.gameTime,
    gameMode,
    audio,
  ]);

  // Simple AI behavior
  const updateAI = useCallback(
    (deltaTime: number) => {
      // Basic AI logic for demonstration
      if (Math.random() < 0.01) {
        // 1% chance per frame to change stance
        const stances: TrigramStance[] = [
          "geon",
          "tae",
          "li",
          "jin",
          "son",
          "gam",
          "gan",
          "gon",
        ];
        const randomStance =
          stances[Math.floor(Math.random() * stances.length)];

        if (randomStance !== player2.stance) {
          const canTransition = trigramSystem.current.canTransitionToStance(
            player2.stance,
            randomStance,
            player2
          );

          if (canTransition.allowed) {
            onPlayerUpdate(1, { stance: randomStance });
            audio.playStanceChangeSound();
          }
        }
      }
    },
    [player2, onPlayerUpdate, audio]
  );

  // Execute combat technique
  const executeTechnique = useCallback(
    async (
      attackerIndex: number,
      targetPosition?: { x: number; y: number }
    ) => {
      if (engineState.isProcessingCombat) return;

      setEngineState((prev) => ({ ...prev, isProcessingCombat: true }));

      try {
        const attacker = attackerIndex === 0 ? player1 : player2;
        const defender = attackerIndex === 0 ? player2 : player1;

        // Get technique for current stance
        const technique = trigramSystem.current.getTechniqueForStance(
          attacker.stance
        );

        // Execute combat
        const result: CombatResult = await combatSystem.current.executeAttack(
          attacker,
          defender,
          technique,
          targetPosition
        );

        // Apply results
        if (result.hit) {
          const defenderIndex = attackerIndex === 0 ? 1 : 0;
          onPlayerUpdate(defenderIndex, {
            health: Math.max(0, defender.health - result.damage),
            consciousness: Math.max(
              0,
              defender.consciousness - (result.consciousnessLoss || 0)
            ),
            pain: Math.min(100, defender.pain + (result.painInflicted || 0)),
          });

          // Create hit effect
          const hitEffect: HitEffect = {
            id: `hit_${Date.now()}`,
            type:
              result.damage > 30
                ? "critical"
                : result.damage > 15
                ? "heavy"
                : "medium",
            position: targetPosition || defender.position,
            damage: result.damage,
            color:
              result.damage > 30
                ? KOREAN_COLORS.CRITICAL_HIT
                : KOREAN_COLORS.YELLOW,
            startTime: Date.now(),
            duration: 1000,
            korean: result.damage > 30 ? "치명타!" : "타격!",
            createdAt: Date.now(),
          };

          setEngineState((prev) => ({
            ...prev,
            combatEffects: [...prev.combatEffects, hitEffect],
          }));

          // Audio feedback
          audio.playHitSound(result.damage, !!result.vitalPointsHit?.length);
        }
      } finally {
        setTimeout(() => {
          setEngineState((prev) => ({ ...prev, isProcessingCombat: false }));
        }, 300);
      }
    },
    [engineState.isProcessingCombat, player1, player2, onPlayerUpdate, audio]
  );

  // Initialize game loop
  useEffect(() => {
    lastTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameLoop]);

  // Expose engine methods
  useEffect(() => {
    // Attach engine methods to window for debugging
    if (typeof window !== "undefined") {
      (window as any).gameEngine = {
        executeTechnique,
        getEngineState: () => engineState,
        getCombatSystems: () => ({
          combat: combatSystem.current,
          trigram: trigramSystem.current,
          vitalPoint: vitalPointSystem.current,
        }),
      };
    }
  }, [executeTechnique, engineState]);

  return (
    <div className="game-engine" style={{ display: "none" }}>
      {/* Engine runs in background */}
      <div>Frame: {engineState.frameCount}</div>
      <div>Time: {(engineState.gameTime / 1000).toFixed(1)}s</div>
      <div>Effects: {engineState.combatEffects.length}</div>
    </div>
  );
}
