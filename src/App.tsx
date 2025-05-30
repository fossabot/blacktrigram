import React, { useState, useCallback, useEffect } from "react";
import { Stage } from "@pixi/react";
import { IntroScreen } from "./components/intro/IntroScreen";
import { GameUI } from "./components/game/GameUI";
import { TrainingScreen } from "./components/training/TrainingScreen";
import { PhilosophySection } from "./components/intro/components/PhilosophySection";
import type { GamePhase, PlayerState, TrigramStance, Position } from "./types";
import { createPlayerState } from "./types";
import "./App.css";

// Define AppState interface
interface AppState {
  readonly gamePhase: GamePhase;
  readonly players: [PlayerState, PlayerState]; // Mutable array for GameUI compatibility
  readonly gameTime: number;
  readonly currentRound: number;
  readonly timeRemaining: number;
  readonly combatLog: string[]; // Mutable array for easier updates
  readonly isPaused: boolean;
}

// Initial player positions
const PLAYER_1_START: Position = { x: 200, y: 300 };
const PLAYER_2_START: Position = { x: 600, y: 300 };

export function App(): React.ReactElement {
  // Main application state
  const [appState, setAppState] = useState<AppState>({
    gamePhase: "intro",
    players: [
      createPlayerState("player1", PLAYER_1_START, "geon"),
      createPlayerState("player2", PLAYER_2_START, "tae"),
    ],
    gameTime: 0,
    currentRound: 1,
    timeRemaining: 120, // 2 minutes per round
    combatLog: ["Welcome to Black Trigram Martial Arts!"],
    isPaused: false,
  });

  // Game phase transitions
  const handleGamePhaseChange = useCallback((newPhase: GamePhase) => {
    setAppState((prev: AppState) => ({
      ...prev,
      gamePhase: newPhase,
      combatLog: [...prev.combatLog, `Phase changed to: ${newPhase}`],
    }));
  }, []);

  // Handle game start from intro
  const handleGameStart = useCallback((selectedPhase: GamePhase) => {
    setAppState((prev: AppState) => ({
      ...prev,
      gamePhase: selectedPhase,
      combatLog: [...prev.combatLog, `Starting ${selectedPhase} mode...`],
    }));
  }, []);

  // Handle game exit/reset
  const handleGameExit = useCallback(() => {
    setAppState((prev: AppState) => ({
      ...prev,
      gamePhase: "intro",
      combatLog: [...prev.combatLog, "Returning to main menu..."],
    }));
  }, []);

  // Stance change handler
  const handleStanceChange = useCallback(
    (playerIndex: number, newStance: TrigramStance) => {
      if (playerIndex < 0 || playerIndex > 1) return;

      setAppState((prev: AppState) => {
        const updatedPlayers: [PlayerState, PlayerState] = [
          ...prev.players,
        ] as [PlayerState, PlayerState];

        // Properly update the player while maintaining all required properties
        const currentPlayer = updatedPlayers[playerIndex];
        updatedPlayers[playerIndex] = {
          ...currentPlayer,
          stance: newStance,
          lastStanceChangeTime: Date.now(),
        } as PlayerState;

        return {
          ...prev,
          players: updatedPlayers,
          combatLog: [
            ...prev.combatLog,
            `Player ${playerIndex + 1} changed stance to ${newStance}`,
          ],
        };
      });
    },
    []
  );

  // Match control handlers
  const handleStartMatch = useCallback(() => {
    setAppState((prev: AppState) => ({
      ...prev,
      gamePhase: "combat",
      timeRemaining: 120,
      combatLog: [...prev.combatLog, "Combat match started!"],
    }));
  }, []);

  const handleResetMatch = useCallback(() => {
    setAppState((prev: AppState) => ({
      ...prev,
      players: [
        createPlayerState("player1", PLAYER_1_START, "geon"),
        createPlayerState("player2", PLAYER_2_START, "tae"),
      ],
      gameTime: 0,
      timeRemaining: 120,
      combatLog: ["Match reset. Ready for new combat!"],
    }));
  }, []);

  const handleTogglePause = useCallback(() => {
    setAppState((prev: AppState) => ({
      ...prev,
      isPaused: !prev.isPaused,
      combatLog: [
        ...prev.combatLog,
        prev.isPaused ? "Game resumed" : "Game paused",
      ],
    }));
  }, []);

  // Game timer effect
  useEffect(() => {
    if (
      appState.gamePhase === "combat" &&
      !appState.isPaused &&
      appState.timeRemaining > 0
    ) {
      const timer = setInterval(() => {
        setAppState((prev: AppState) => ({
          ...prev,
          gameTime: prev.gameTime + 1,
          timeRemaining: Math.max(0, prev.timeRemaining - 1),
        }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [appState.gamePhase, appState.isPaused, appState.timeRemaining]);

  // Handle philosophy section navigation
  const handlePhilosophyNext = useCallback(() => {
    handleGamePhaseChange("training");
  }, [handleGamePhaseChange]);

  const handlePhilosophyPrev = useCallback(() => {
    handleGamePhaseChange("intro");
  }, [handleGamePhaseChange]);

  // Render appropriate screen based on game phase
  const renderCurrentScreen = useCallback(() => {
    switch (appState.gamePhase) {
      case "intro":
        return (
          <IntroScreen onGameStart={handleGameStart} onExit={handleGameExit} />
        );

      case "training":
        return <TrainingScreen onGamePhaseChange={handleGamePhaseChange} />;

      case "philosophy":
        return (
          <PhilosophySection
            onNext={handlePhilosophyNext}
            onPrev={handlePhilosophyPrev}
          />
        );

      case "combat":
      case "result":
      case "victory":
      case "defeat":
        return (
          <GameUI
            players={appState.players}
            gamePhase={appState.gamePhase}
            onGamePhaseChange={handleGamePhaseChange}
            gameTime={appState.gameTime}
            currentRound={appState.currentRound}
            timeRemaining={appState.timeRemaining}
            onStanceChange={handleStanceChange}
            combatLog={appState.combatLog}
            onStartMatch={handleStartMatch}
            onResetMatch={handleResetMatch}
            onTogglePause={handleTogglePause}
          />
        );

      default:
        return (
          <IntroScreen onGameStart={handleGameStart} onExit={handleGameExit} />
        );
    }
  }, [
    appState.gamePhase,
    appState.players,
    appState.gameTime,
    appState.currentRound,
    appState.timeRemaining,
    appState.combatLog,
    handleGameStart,
    handleGameExit,
    handleGamePhaseChange,
    handleStanceChange,
    handleStartMatch,
    handleResetMatch,
    handleTogglePause,
    handlePhilosophyNext,
    handlePhilosophyPrev,
  ]);

  return (
    <div className="app" data-testid="black-trigram-app">
      {/* Korean Martial Arts Title */}
      <header className="app-header">
        <h1 className="app-title">
          <span className="korean-title">흑괘 무술 도장</span>
          <span className="english-title">Black Trigram Martial Arts</span>
        </h1>
        <div className="app-status">
          <span className="phase-indicator">Phase: {appState.gamePhase}</span>
          {appState.gamePhase === "combat" && (
            <span className="time-indicator">
              Time: {Math.floor(appState.timeRemaining / 60)}:
              {(appState.timeRemaining % 60).toString().padStart(2, "0")}
            </span>
          )}
        </div>
      </header>

      {/* Main Game Container */}
      <main className="app-main">
        <Stage
          width={1200}
          height={800}
          options={{
            backgroundColor: 0x000a12,
            antialias: true,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
          }}
        >
          {renderCurrentScreen()}
        </Stage>
      </main>

      {/* Debug Info (development only) */}
      {process.env.NODE_ENV === "development" && (
        <footer className="app-debug">
          <details>
            <summary>Debug Info</summary>
            <pre>
              {JSON.stringify(
                {
                  gamePhase: appState.gamePhase,
                  gameTime: appState.gameTime,
                  timeRemaining: appState.timeRemaining,
                  playerStances: appState.players.map((p) => ({
                    id: p.playerId,
                    stance: p.stance,
                    health: p.health,
                    ki: p.ki,
                  })),
                },
                null,
                2
              )}
            </pre>
          </details>
        </footer>
      )}
    </div>
  );
}

export default App;
