import React, { useState, useCallback } from "react";
import { Container } from "@pixi/react";
import { AudioProvider } from "./audio/AudioProvider";
import { IntroScreen } from "./components/intro/IntroScreen";
import { CombatScreen } from "./components/combat/CombatScreen";
import { TrainingScreen } from "./components/training/TrainingScreen";
import { createPlayerState } from "./utils/playerUtils";
import { GamePhase, PlayerArchetype } from "./types/enums";
import { GameMode } from "./types/game"; // Fix: Only import GameMode from one source
import type { GameState, PlayerState } from "./types";
import { GAME_CONFIG } from "./types/constants";
import "./App.css";

export function App(): React.JSX.Element {
  const [gamePhase, setGamePhase] = useState<GamePhase>(GamePhase.INTRO);
  const [gameState, setGameState] = useState<GameState>(() => ({
    mode: GameMode.VERSUS,
    phase: GamePhase.INTRO,
    isTraining: false,
    player1: createPlayerState(
      { korean: "Player 1", english: "Player 1" },
      PlayerArchetype.MUSA,
      { korean: "건", english: "geon" },
      "player1"
    ),
    player2: createPlayerState(
      { korean: "Player 2", english: "Player 2" },
      PlayerArchetype.AMSALJA,
      { korean: "태", english: "tae" },
      "player2"
    ),
    currentRound: 1,
    maxRounds: 3,
    timeRemaining: 120,
    isPaused: false,
    combatEffects: [],
    matchHistory: [],
    // Fix: Add missing properties
    gameTime: 0,
    winner: null,
  }));

  const handleMenuSelect = useCallback((mode: GameMode) => {
    setGamePhase(
      mode === GameMode.TRAINING ? GamePhase.TRAINING : GamePhase.COMBAT
    );
    setGameState((prev) => ({
      ...prev,
      mode, // Fix: Use compatible GameMode type
      phase: mode === GameMode.TRAINING ? GamePhase.TRAINING : GamePhase.COMBAT,
      isTraining: mode === GameMode.TRAINING,
    }));
  }, []);

  const handlePlayerUpdate = useCallback(
    (playerIndex: number, updates: Partial<PlayerState>) => {
      setGameState((prev) => ({
        ...prev,
        player1:
          playerIndex === 0 ? { ...prev.player1, ...updates } : prev.player1,
        player2:
          playerIndex === 1 ? { ...prev.player2, ...updates } : prev.player2,
      }));
    },
    []
  );

  const handleReturnToMenu = useCallback(() => {
    setGamePhase(GamePhase.INTRO);
    setGameState((prev) => ({ ...prev, phase: GamePhase.INTRO }));
  }, []);

  return (
    <AudioProvider>
      <Container
        width={GAME_CONFIG.CANVAS_WIDTH}
        height={GAME_CONFIG.CANVAS_HEIGHT}
      >
        {gamePhase === GamePhase.INTRO && (
          <IntroScreen onMenuSelect={handleMenuSelect} />
        )}

        {gamePhase === GamePhase.TRAINING && (
          <TrainingScreen
            selectedArchetype={gameState.player1.archetype}
            onBack={handleReturnToMenu}
            onTrainingComplete={(result) => {
              console.log("Training completed:", result);
              setGamePhase(GamePhase.INTRO);
            }}
          />
        )}

        {gamePhase === GamePhase.COMBAT && (
          <CombatScreen
            players={[gameState.player1, gameState.player2] as const}
            onPlayerUpdate={handlePlayerUpdate}
            onReturnToMenu={handleReturnToMenu}
            // Fix: Remove invalid matchStatistics prop
            timeRemaining={120}
          />
        )}
      </Container>
    </AudioProvider>
  );
}

export default App;
