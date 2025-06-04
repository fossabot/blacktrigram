import React, { useState, useCallback, useEffect } from "react";
import { createPlayerState } from "./utils/playerUtils";
import { GameEngine } from "./components/game/GameEngine";
import { IntroScreen } from "./components/intro/IntroScreen";
import { TrainingScreen } from "./components/training/TrainingScreen";
import type {
  GameState,
  GameScreen,
  SessionData,
  GameSettings,
  PlayerState,
} from "./types";
import "./App.css";

// Define proper game state type
interface AppGameState {
  currentScreen: GameScreen;
  player: PlayerState;
  sessionData: SessionData;
  settings: GameSettings;
  isInitialized: boolean;
}

function App(): React.JSX.Element {
  const [gameState, setGameState] = useState<AppGameState>({
    currentScreen: "intro",
    player: createPlayerState("Player1", "musa", "geon"),
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
    isInitialized: false,
  });

  // Initialize game
  useEffect(() => {
    setGameState((prev) => ({
      ...prev,
      isInitialized: true,
    }));
  }, []);

  // Fix handleGamePhaseChange with proper typing
  const handleGamePhaseChange = useCallback((phase: string) => {
    setGameState((prev) => ({
      ...prev,
      currentScreen: phase as GameScreen, // Proper type casting
    }));
  }, []);

  const handleGameStateChange = useCallback((updates: Partial<GameState>) => {
    setGameState((prev) => ({ ...prev, ...updates }));
  }, []);

  const handlePlayerUpdate = useCallback(
    (playerIndex: number, updates: Partial<PlayerState>) => {
      if (playerIndex === 0) {
        setGameState((prev) => ({
          ...prev,
          player: { ...prev.player, ...updates },
        }));
      }
    },
    []
  );

  // Fix: Create wrapper for single-parameter handlers
  const handlePlayerChange = useCallback(
    (updates: Partial<PlayerState>) => handlePlayerUpdate(0, updates),
    [handlePlayerUpdate]
  );

  switch (gameState.currentScreen) {
    case "intro":
      return (
        <IntroScreen
          onGamePhaseChange={handleGamePhaseChange}
          onPlayerChange={handlePlayerChange}
          player={gameState.player}
          sessionData={gameState.sessionData}
        />
      );

    case "training":
      return (
        <TrainingScreen
          player={gameState.player}
          onGamePhaseChange={handleGamePhaseChange}
          onPlayerStateChange={handlePlayerChange}
        />
      );

    case "combat":
      return (
        <GameEngine
          player1={gameState.player}
          player2={createPlayerState("Player2", "amsalja", "tae")}
          onGameStateChange={handleGameStateChange}
          onPlayerUpdate={handlePlayerUpdate}
          onGamePhaseChange={handleGamePhaseChange}
        />
      );

    default:
      return (
        <IntroScreen
          onGamePhaseChange={handleGamePhaseChange}
          onPlayerChange={handlePlayerChange}
          player={gameState.player}
          sessionData={gameState.sessionData}
        />
      );
  }
}

export default App;
