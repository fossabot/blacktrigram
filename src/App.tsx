import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Application } from "@pixi/react";
import { GameEngine } from "./components/game/GameEngine";
import { IntroScreen } from "./components/intro/IntroScreen";
import { TrainingScreen } from "./components/training/TrainingScreen";
import { EndScreen } from "./components/ui/EndScreen";
import { AudioProvider } from "./audio/AudioProvider";
import { createPlayerState } from "./utils/playerUtils";
import type { PlayerState, KoreanText, Position } from "./types";
import {
  GamePhase,
  GameMode,
  PlayerArchetype,
  TrigramStance,
} from "./types/enums";
import { GAME_CONFIG } from "./types/constants";

const App: React.FC = () => {
  const player1Name: KoreanText = { korean: "선수1", english: "Player1" };
  const player2Name: KoreanText = { korean: "선수2", english: "Player2" };
  const player1Position: Position = { x: 100, y: 300 };
  const player2Position: Position = { x: 700, y: 300 };

  const [player1, setPlayer1] = useState<PlayerState>(() =>
    createPlayerState(
      "player1",
      PlayerArchetype.MUSA,
      player1Name,
      player1Position
    )
  );
  const [player2, setPlayer2] = useState<PlayerState>(() =>
    createPlayerState(
      "player2",
      PlayerArchetype.AMSALJA,
      player2Name,
      player2Position
    )
  );

  const [gamePhase, setGamePhase] = useState<GamePhase>(GamePhase.INTRO);
  const [selectedMode, setSelectedMode] = useState<GameMode>(GameMode.VERSUS);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [currentRound, setCurrentRound] = useState(1);
  const [gameTime, setGameTime] = useState(0);
  const [winner, setWinner] = useState<PlayerState | null>(null);

  const handleGameStart = useCallback((mode: GameMode) => {
    setSelectedMode(mode);
    if (mode === GameMode.TRAINING) {
      setGamePhase(GamePhase.TRAINING);
    } else {
      setGamePhase(GamePhase.PREPARATION); // Now exists in enum
    }
  }, []);

  const handlePlayerUpdate = useCallback(
    (playerIndex: 0 | 1, updates: Partial<PlayerState>) => {
      if (playerIndex === 0) {
        setPlayer1((prev) => ({
          ...prev,
          ...updates,
          ...(updates.currentStance && {
            currentStance: updates.currentStance as TrigramStance,
          }),
        }));
      } else {
        setPlayer2((prev) => ({
          ...prev,
          ...updates,
          ...(updates.currentStance && {
            currentStance: updates.currentStance as TrigramStance,
          }),
        }));
      }
    },
    []
  );

  const handleGameStateChange = useCallback(() => {
    // Game state change logic
  }, []);

  // Use all state variables in game logic
  const gameState = useMemo(
    () => ({
      phase: gamePhase,
      mode: selectedMode,
      isTraining: selectedMode === GameMode.TRAINING,
      player1,
      player2,
      currentRound,
      maxRounds: 3,
      timeRemaining,
      gameTime,
      isPaused: false,
      winner,
      combatEffects: [] as const,
      matchHistory: [] as const,
    }),
    [
      gamePhase,
      selectedMode,
      player1,
      player2,
      currentRound,
      timeRemaining,
      gameTime,
      winner,
    ]
  );

  // Game timer logic
  useEffect(() => {
    if (
      gamePhase === GamePhase.COMBAT &&
      !gameState.isPaused &&
      timeRemaining > 0
    ) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            // Round ended
            setCurrentRound((prev) => prev + 1);
            setGameTime((prev) => prev + (60 - newTime));
            return 60; // Reset for next round
          }
          return newTime;
        });
        setGameTime((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gamePhase, gameState.isPaused, timeRemaining]);

  // Win condition checking
  useEffect(() => {
    if (player1.health <= 0) {
      setWinner(player2);
      setGamePhase(GamePhase.VICTORY);
    } else if (player2.health <= 0) {
      setWinner(player1);
      setGamePhase(GamePhase.VICTORY);
    } else if (currentRound >= 3 && timeRemaining <= 0) {
      // Determine winner by health
      const healthDiff = player1.health - player2.health;
      setWinner(healthDiff > 0 ? player1 : player2);
      setGamePhase(GamePhase.VICTORY);
    }
  }, [player1.health, player2.health, currentRound, timeRemaining]);

  const renderCurrentPhase = () => {
    switch (gamePhase) {
      case GamePhase.INTRO:
      case GamePhase.MENU:
        return (
          <IntroScreen
            onGameStart={handleGameStart} // Fix: now properly typed
            onModeSelect={setSelectedMode}
            width={GAME_CONFIG.CANVAS_WIDTH}
            height={GAME_CONFIG.CANVAS_HEIGHT}
          />
        );

      case GamePhase.PREPARATION:
      case GamePhase.COMBAT:
        return (
          <GameEngine
            player1={player1}
            player2={player2}
            gamePhase={gamePhase}
            gameMode={selectedMode}
            onGameStateChange={handleGameStateChange}
            onPlayerUpdate={handlePlayerUpdate}
            onGamePhaseChange={setGamePhase}
            timeRemaining={timeRemaining}
            currentRound={currentRound}
            isPaused={false}
          />
        );

      case GamePhase.TRAINING:
        return (
          <TrainingScreen
            players={[player1, player2]}
            selectedStance={TrigramStance.GEON}
            onPlayerUpdate={handlePlayerUpdate}
          />
        );

      case GamePhase.VICTORY:
      case GamePhase.DEFEAT:
        return (
          <EndScreen
            winner={winner}
            onRestart={() => setGamePhase(GamePhase.INTRO)}
            onReturnToMenu={() => setGamePhase(GamePhase.INTRO)}
            matchDuration={gameTime}
            roundsPlayed={currentRound}
          />
        );

      default:
        return (
          <IntroScreen
            onGameStart={handleGameStart} // Fix: now properly typed
            onModeSelect={setSelectedMode}
          />
        );
    }
  };

  return (
    <AudioProvider>
      <Application
        width={GAME_CONFIG.CANVAS_WIDTH}
        height={GAME_CONFIG.CANVAS_HEIGHT}
        options={{
          backgroundColor: 0x1a1a2e,
          antialias: true,
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
        }}
      >
        {renderCurrentPhase()}
      </Application>
    </AudioProvider>
  );
};

export default App;
