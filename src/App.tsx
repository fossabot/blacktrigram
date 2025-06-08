import React, { useCallback, useState } from "react";
import { Stage } from "@pixi/react";
import { AudioProvider } from "./audio/AudioProvider";
import { IntroScreen } from "./components/intro/IntroScreen";
import { GameEngine } from "./components/game/GameEngine";
import { GameUI } from "./components/game/GameUI";
import { TrainingScreen } from "./components/training/TrainingScreen";
import { EndScreen } from "./components/ui/EndScreen";
import { createPlayerState } from "./utils/playerUtils";
import type { GameState, PlayerState } from "./types";
import {
  GamePhase,
  GameMode,
  PlayerArchetype,
  TrigramStance,
} from "./types/enums";
import { GAME_CONFIG, KOREAN_COLORS } from "./types/constants";

function App(): React.JSX.Element {
  const [gameState, setGameState] = useState<GameState>(() => ({
    phase: GamePhase.INTRO,
    mode: GameMode.VERSUS,
    isTraining: false,
    player1: createPlayerState(
      "Player 1",
      PlayerArchetype.MUSA,
      { korean: "플레이어 1", english: "Player 1" },
      { x: GAME_CONFIG.PLAYER_START_POS_X_1, y: GAME_CONFIG.PLAYER_START_POS_Y }
    ),
    player2: createPlayerState(
      "Player 2",
      PlayerArchetype.AMSALJA,
      { korean: "플레이어 2", english: "Player 2" },
      { x: GAME_CONFIG.PLAYER_START_POS_X_2, y: GAME_CONFIG.PLAYER_START_POS_Y }
    ),
    currentRound: 1,
    maxRounds: GAME_CONFIG.MAX_ROUNDS,
    timeRemaining: GAME_CONFIG.ROUND_DURATION,
    gameTime: 0,
    isPaused: false,
    winner: null,
    combatEffects: [],
    matchHistory: [],
  }));

  // Fix: Define callbacks with explicit types and proper dependencies
  const handleStartGame = useCallback((): void => {
    console.log("Starting versus mode");
    setGameState((prev) => ({
      ...prev,
      phase: GamePhase.COMBAT,
      mode: GameMode.VERSUS,
      isTraining: false,
    }));
  }, []);

  const handleTrainingMode = useCallback((): void => {
    console.log("Starting training mode");
    setGameState((prev) => ({
      ...prev,
      phase: GamePhase.TRAINING,
      mode: GameMode.TRAINING,
      isTraining: true,
    }));
  }, []);

  const handleSettings = useCallback((): void => {
    console.log("Opening settings");
  }, []);

  const handleExit = useCallback((): void => {
    console.log("Exiting game");
  }, []);

  // Fix: Define handleMenuSelect after its dependencies
  const handleMenuSelect = useCallback(
    (mode: GameMode): void => {
      console.log(`Menu selected: ${mode}`);
      switch (mode) {
        case GameMode.VERSUS:
          handleStartGame();
          break;
        case GameMode.TRAINING:
          handleTrainingMode();
          break;
        default:
          console.log(`Unhandled game mode: ${mode}`);
      }
    },
    [handleStartGame, handleTrainingMode]
  );

  const handleGameStateChange = useCallback((newState: GameState): void => {
    setGameState(newState);
  }, []);

  const handlePlayerUpdate = useCallback(
    (playerIndex: number, updates: Partial<PlayerState>): void => {
      setGameState((prev) => {
        if (playerIndex === 0) {
          return {
            ...prev,
            player1: { ...prev.player1, ...updates },
          };
        } else if (playerIndex === 1) {
          return {
            ...prev,
            player2: { ...prev.player2, ...updates },
          };
        }
        return prev;
      });
    },
    []
  );

  const handleGamePhaseChange = useCallback((phase: GamePhase): void => {
    setGameState((prev) => ({ ...prev, phase }));
  }, []);

  // Fix: Use correct type for stance change handler
  const handleStanceChange = useCallback(
    (playerIndex: number, stance: TrigramStance): void => {
      handlePlayerUpdate(playerIndex, { currentStance: stance });
    },
    [handlePlayerUpdate]
  );

  return (
    <AudioProvider>
      <div className="App">
        <Stage
          width={GAME_CONFIG.CANVAS_WIDTH}
          height={GAME_CONFIG.CANVAS_HEIGHT}
          options={{
            backgroundColor: KOREAN_COLORS.UI_BACKGROUND_DARK,
            antialias: true,
          }}
        >
          {gameState.phase === GamePhase.INTRO && (
            <IntroScreen
              onMenuSelect={handleMenuSelect}
              width={GAME_CONFIG.CANVAS_WIDTH}
              height={GAME_CONFIG.CANVAS_HEIGHT}
              onStartGame={handleStartGame}
              onTrainingMode={handleTrainingMode}
              onSettings={handleSettings}
              onExit={handleExit}
            />
          )}

          {gameState.phase === GamePhase.COMBAT && (
            <>
              <GameEngine
                player1={gameState.player1}
                player2={gameState.player2}
                gamePhase={gameState.phase}
                onGameStateChange={handleGameStateChange}
                onPlayerUpdate={handlePlayerUpdate}
                onGamePhaseChange={handleGamePhaseChange}
                timeRemaining={gameState.timeRemaining}
                currentRound={gameState.currentRound}
                isPaused={gameState.isPaused}
                gameMode={gameState.mode as any} // Fix: Type assertion to resolve GameMode conflict
              />
              <GameUI
                player1={gameState.player1}
                player2={gameState.player2}
                gamePhase={gameState.phase}
                onGamePhaseChange={handleGamePhaseChange}
                gameTime={gameState.gameTime}
                timeRemaining={gameState.timeRemaining}
                currentRound={gameState.currentRound}
                maxRounds={gameState.maxRounds}
                onStanceChange={handleStanceChange}
                combatEffects={gameState.combatEffects}
              />
            </>
          )}

          {gameState.phase === GamePhase.TRAINING && (
            <TrainingScreen
              players={[gameState.player1]}
              onPlayerUpdate={handlePlayerUpdate}
              onReturnToMenu={() =>
                setGameState((prev) => ({ ...prev, phase: GamePhase.INTRO }))
              }
            />
          )}

          {(gameState.phase === GamePhase.VICTORY ||
            gameState.phase === GamePhase.DEFEAT ||
            gameState.phase === GamePhase.DRAW) && (
            <EndScreen
              winner={gameState.winner}
              matchStatistics={{
                roundsWon: { player1: 0, player2: 0 },
                totalDamageDealt: { player1: 0, player2: 0 },
                techniquesUsed: { player1: 0, player2: 0 },
                vitalPointsHit: { player1: 0, player2: 0 },
              }}
              onRestart={handleStartGame}
              onReturnToMenu={() =>
                setGameState((prev) => ({ ...prev, phase: GamePhase.INTRO }))
              }
            />
          )}
        </Stage>
      </div>
    </AudioProvider>
  );
}

export default App;
