// Complete game engine for Black Trigram Korean martial arts

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  // useRef // Removed unused useRef
} from "react";
import {
  Container,
  Graphics as PixiGraphics,
  Text as PixiText, // Added PixiText for loading/error
} from "@pixi/react";
import { TrigramSystem } from "../../systems/TrigramSystem";
import { CombatSystem } from "../../systems/CombatSystem"; // Ensure CombatSystem is imported
import { useAudio } from "../../audio/AudioProvider"; // Ensure useAudio is imported
import {
  GamePhase,
  GameMode,
  // PlayerArchetype, // Removed as it's not directly used here
  TrigramStance,
  HitEffectType,
} from "../../types/enums";
import type {
  PlayerState,
  GameEngineProps,
  KoreanTechnique,
  CombatResult,
  HitEffect,
  GameState,
  Position,
  // WinConditionCheckResult, // Removed as it'sunused
} from "../../types";
import { GAME_CONFIG } from "../../types/constants"; // GAME_CONFIG is already imported from types
import type * as PIXI from "pixi.js";

// Removed unused import:
// import {
//   createPlayerState,
//   executeTechnique as executePlayerTechnique,
// } from "../../utils/playerUtils";

export function GameEngine({
  player1: initialPlayer1, // Renamed to avoid confusion with internal state
  player2: initialPlayer2, // Renamed to avoid confusion with internal state
  gamePhase = GamePhase.COMBAT,
  onGameStateChange,
  onPlayerUpdate,
  onGamePhaseChange,
  timeRemaining = GAME_CONFIG.ROUND_DURATION,
  currentRound = 1,
  isPaused = false,
  gameMode = GameMode.VERSUS,
}: GameEngineProps): React.JSX.Element {
  // const isTrainingMode = gameMode === GameMode.TRAINING; // Removed unused variable

  const [player1, setPlayer1] = useState<PlayerState>(initialPlayer1);
  const [player2, setPlayer2] = useState<PlayerState>(initialPlayer2);
  const [combatEffects, setCombatEffects] = useState<readonly HitEffect[]>([]);
  const [currentGameState, setCurrentGameState] = useState<GameState>(() => ({
    phase: gamePhase,
    mode: gameMode,
    isTraining: gameMode === GameMode.TRAINING,
    player1,
    player2,
    currentRound,
    maxRounds: GAME_CONFIG.MAX_ROUNDS,
    timeRemaining,
    gameTime: 0,
    isPaused,
    winner: null,
    combatEffects: [],
    matchHistory: [],
  }));

  const trigramSystem = useMemo(() => new TrigramSystem(), []);
  const audioManager = useAudio();

  const updateCombatEffects = useCallback(() => {
    setCombatEffects((prev) =>
      prev.filter((effect) => Date.now() - effect.timestamp < effect.duration)
    );
  }, []);

  const gameLoop = useCallback(() => {
    if (
      isPaused ||
      currentGameState.phase === GamePhase.VICTORY ||
      currentGameState.phase === GamePhase.DEFEAT ||
      currentGameState.phase === GamePhase.DRAW
    ) {
      return;
    }
    updateCombatEffects();

    const currentPlayers: [PlayerState, PlayerState] = [player1, player2];
    const winCheckResult = CombatSystem.checkWinCondition(currentPlayers);

    if (winCheckResult) {
      if (winCheckResult.winner) {
        setCurrentGameState((prev) => ({
          ...prev,
          phase: GamePhase.VICTORY,
          winner: winCheckResult.winner,
        }));
        onGamePhaseChange(GamePhase.VICTORY);
      } else if (winCheckResult.draw) {
        setCurrentGameState((prev) => ({ ...prev, phase: GamePhase.DRAW }));
        onGamePhaseChange(GamePhase.DRAW);
      }
      return;
    }

    // Update time remaining
    setCurrentGameState((prev) => {
      const newTimeRemaining = prev.timeRemaining - 1000 / GAME_CONFIG.FPS;
      if (newTimeRemaining <= 0) {
        const timeUpResult = CombatSystem.checkWinConditionOnTimeUp?.(
          currentPlayers
        ) || { winner: null, draw: true, reason: "time_up" };
        if (timeUpResult.winner) {
          onGamePhaseChange(GamePhase.VICTORY);
          return {
            ...prev,
            timeRemaining: 0,
            phase: GamePhase.VICTORY,
            winner: timeUpResult.winner,
          };
        } else {
          onGamePhaseChange(GamePhase.DRAW);
          return {
            ...prev,
            timeRemaining: 0,
            phase: GamePhase.DRAW,
            winner: null,
          };
        }
      }
      return {
        ...prev,
        timeRemaining: newTimeRemaining,
        gameTime: prev.gameTime + 1000 / GAME_CONFIG.FPS,
      };
    });
  }, [
    player1,
    player2,
    isPaused,
    currentGameState.phase,
    updateCombatEffects,
    onGamePhaseChange,
  ]);

  const handleStanceChange = useCallback(
    (playerIndex: 0 | 1, newStance: TrigramStance) => {
      // Ensure newStance is TrigramStance
      const playerToUpdate = playerIndex === 0 ? player1 : player2;

      const canTransition = trigramSystem.canTransitionTo(
        playerToUpdate.currentStance,
        newStance,
        playerToUpdate
      );

      if (canTransition.canTransition) {
        const transitionResult = trigramSystem.executeStanceChange(
          playerToUpdate,
          newStance
        );

        if (transitionResult.success && transitionResult.newState) {
          if (playerIndex === 0) setPlayer1(transitionResult.newState);
          else setPlayer2(transitionResult.newState);
          onPlayerUpdate?.(playerIndex, transitionResult.newState);
          audioManager.playSFX("stance_change");
        }
      }
    },
    [player1, player2, onPlayerUpdate, trigramSystem, audioManager]
  );

  const handleAttack = useCallback(
    async (
      attackerIndex: 0 | 1,
      technique: KoreanTechnique,
      targetPoint?: string | Position // targetPoint can be vital point ID or position
    ) => {
      const attacker = attackerIndex === 0 ? player1 : player2;
      const defender = attackerIndex === 0 ? player2 : player1;

      try {
        // Assuming CombatSystem.executeAttack takes 3 arguments
        // If targetPoint (4th arg) is vital, it should be part of technique or a different method
        const combatResult: CombatResult = await CombatSystem.executeAttack(
          attacker,
          defender,
          technique
          // If targetPoint is for specific vital point targeting, CombatSystem.executeAttack needs to handle it
        );

        // Update players based on combatResult's updatedAttacker and updatedDefender
        setPlayer1(
          combatResult.updatedAttacker.id === player1.id
            ? combatResult.updatedAttacker
            : combatResult.updatedDefender
        );
        setPlayer2(
          combatResult.updatedAttacker.id === player2.id
            ? combatResult.updatedAttacker
            : combatResult.updatedDefender
        );

        const newEffect: HitEffect = {
          id: `hit_${Date.now()}`,
          type: combatResult.critical
            ? HitEffectType.CRITICAL // Corrected
            : combatResult.damage > 30 // Example threshold for HEAVY
            ? HitEffectType.HEAVY // Corrected
            : combatResult.damage > 15 // Example threshold for MEDIUM
            ? HitEffectType.MEDIUM // Corrected
            : HitEffectType.LIGHT, // Corrected
          position:
            combatResult.hitPosition ||
            (typeof targetPoint === "object" ? targetPoint : defender.position),
          damage: combatResult.damage,
          timestamp: Date.now(),
          duration: 1000,
          // color: combatResult.critical ? 0xff0000 : 0xffffff, // Color can be derived in HitEffectsLayer
          sourcePlayerId: attacker.id,
          targetPlayerId: defender.id,
        };
        setCombatEffects((prev) => [...prev, newEffect]);

        // Notify player update
        onPlayerUpdate?.(
          0,
          attackerIndex === 0
            ? combatResult.updatedAttacker
            : combatResult.updatedDefender
        );
        onPlayerUpdate?.(
          1,
          attackerIndex === 1
            ? combatResult.updatedAttacker
            : combatResult.updatedDefender
        );

        audioManager.playSFX(
          combatResult.critical
            ? "critical_hit"
            : combatResult.hit
            ? combatResult.damage && combatResult.damage > 15
              ? "hit_heavy"
              : "hit_light"
            : "miss"
        );
      } catch (error) {
        console.error("Attack execution failed:", error);
      }
    },
    [player1, player2, onPlayerUpdate, audioManager]
  );

  useEffect(() => {
    const interval = setInterval(gameLoop, 1000 / GAME_CONFIG.FPS);
    return () => clearInterval(interval);
  }, [gameLoop]);

  useEffect(() => {
    const newGameState: GameState = {
      phase: currentGameState.phase,
      mode: currentGameState.mode,
      isTraining: currentGameState.isTraining,
      player1, // Use updated player1 state
      player2, // Use updated player2 state
      combatEffects,
      currentRound: currentGameState.currentRound,
      maxRounds: currentGameState.maxRounds,
      timeRemaining: currentGameState.timeRemaining,
      gameTime: currentGameState.gameTime,
      isPaused: currentGameState.isPaused,
      winner: currentGameState.winner,
      matchHistory: currentGameState.matchHistory,
    };
    setCurrentGameState(newGameState); // Keep internal state consistent
    onGameStateChange?.(newGameState); // Notify parent
  }, [
    player1,
    player2,
    combatEffects,
    currentGameState.phase,
    currentGameState.mode,
    currentGameState.isTraining,
    currentGameState.currentRound,
    currentGameState.maxRounds,
    currentGameState.timeRemaining,
    currentGameState.gameTime,
    currentGameState.isPaused,
    currentGameState.winner,
    currentGameState.matchHistory,
    onGameStateChange,
  ]);

  const systemConfig = useMemo(
    () => ({
      tickRate: GAME_CONFIG.FPS,
      maxCombatTime: GAME_CONFIG.ROUND_DURATION * GAME_CONFIG.MAX_ROUNDS,
      initialized: true,
    }),
    []
  );

  useEffect(() => {
    console.log("Game system config:", systemConfig);

    // Demo logic (can be removed if actual game interactions are implemented)
    const demoInterval = setInterval(() => {
      if (currentGameState.phase === GamePhase.COMBAT && !isPaused) {
        // Example: Player 1 (human) changes stance, Player 2 (AI) attacks
        // This is placeholder logic. Actual input handling would trigger these.
        // if (Math.random() < 0.01) { // Low probability random action
        //   const randomStanceIndex = Math.floor(Math.random() * TRIGRAM_STANCES_ORDER.length);
        //   handleStanceChange(0, TRIGRAM_STANCES_ORDER[randomStanceIndex]);
        // }
        // if (Math.random() < 0.005 && player2.availableTechniques.length > 0) {
        //   const randomTechnique = player2.availableTechniques[Math.floor(Math.random() * player2.availableTechniques.length)];
        //   handleAttack(1, randomTechnique);
        // }
      }
    }, 2000); // Slower interval for demo actions

    return () => clearInterval(demoInterval);
  }, [
    systemConfig,
    currentGameState.phase,
    isPaused,
    handleStanceChange,
    handleAttack,
    player2.availableTechniques, // Added to dependency array
  ]);

  return (
    <Container
      width={GAME_CONFIG.CANVAS_WIDTH}
      height={GAME_CONFIG.CANVAS_HEIGHT}
    >
      <PixiGraphics
        draw={(g: PIXI.Graphics) => {
          g.clear()
            .beginFill(0x1a1a1a) // Example dark background
            .drawRect(0, 0, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT)
            .endFill();
        }}
      />
      {/* Render PlayerVisuals, HitEffectsLayer etc. here */}
      {/* Example:
      <PlayerVisuals playerState={player1} x={100} y={300} />
      <PlayerVisuals playerState={player2} x={500} y={300} />
      <HitEffectsLayer effects={combatEffects} />
      */}
      <PixiText
        text={`Time: ${Math.ceil(currentGameState.timeRemaining)}`}
        x={GAME_CONFIG.CANVAS_WIDTH / 2}
        y={20}
        anchor={0.5}
        style={{ fill: "white" }}
      />
    </Container>
  );
}

export default GameEngine;

// No changes needed if GAME_CONFIG.FPS is correctly defined in types/constants/game.ts
