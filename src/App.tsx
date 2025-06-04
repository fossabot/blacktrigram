import React, { useState, useCallback, useEffect } from "react";
import { Application } from "@pixi/react";
import "./App.css";

// Fix imports - separate type imports from value imports
import type { PlayerState, TrigramStance } from "./types";
import type {
  GameState,
  GameScreen,
  SessionData,
  GameSettings,
} from "./types/constants";

// Import as value
import { TRIGRAM_DATA } from "./types/constants";

import { IntroScreen } from "./components/intro/IntroScreen";
import { TrainingScreen } from "./components/training/TrainingScreen";
import { GameEngine } from "./components/game/GameEngine";
import { createPlayerState } from "./utils/playerUtils"; // Single import

// Define proper game state type
type GameScreen = "intro" | "training" | "combat";

interface AppGameState {
  currentScreen: GameScreen;
  player: PlayerState;
  sessionData: SessionData;
  settings: GameSettings;
  isInitialized: boolean;
}

function App(): React.JSX.Element {
  // Fix createPlayerState call with proper parameters
  const [gameState, setGameState] = useState<AppGameState>({
    currentScreen: "intro",
    // Fix: createPlayerState takes (name, archetype, stance) in that order
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

  return (
    <div className="App">
      <Application width={1200} height={800} backgroundColor={0x0a0a0a}>
        {gameState.currentScreen === "intro" && (
          <IntroScreen
            onGamePhaseChange={handleGamePhaseChange}
            onStartTraining={() => handleGamePhaseChange("training")}
            onStartCombat={() => handleGamePhaseChange("combat")}
            player={gameState.player}
            onPlayerChange={(updates) => handlePlayerUpdate(updates)}
            sessionData={gameState.sessionData}
          />
        )}

        {gameState.currentScreen === "training" && (
          <TrainingScreen
            player={gameState.player}
            onPlayerStateChange={(updates) => handlePlayerUpdate(updates)}
            onReturnToMenu={() => handleGamePhaseChange("intro")}
            onStartCombat={() => handleGamePhaseChange("combat")}
          />
        )}

        {gameState.currentScreen === "combat" && (
          <GameEngine
            // Fix: Use proper prop names for GameEngineProps
            player1={gameState.player}
            player2={createPlayerState("Player2", "amsalja", "tae")}
            onGameStateChange={handleGameStateChange}
            onPlayerUpdate={handlePlayerUpdate}
            onGamePhaseChange={handleGamePhaseChange}
          />
        )}
      </Application>

      {/* Fix debug info - use proper TRIGRAM_DATA access */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          color: "white",
          fontSize: "12px",
        }}
      >
        <div>Screen: {gameState.currentScreen}</div>
        <div>
          Player: {gameState.player.archetype} | Stance:{" "}
          {TRIGRAM_DATA[gameState.player.stance].symbol}{" "}
          {TRIGRAM_DATA[gameState.player.stance].name.korean}
        </div>
      </div>
    </div>
  );
}

export default App;
