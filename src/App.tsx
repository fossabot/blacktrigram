import React, { useState, useCallback } from "react";
import { IntroScreen } from "./components/intro/IntroScreen";
import { GameEngine } from "./components/game/GameEngine";
import { GameUI } from "./components/game/GameUI";
import { TrainingScreen } from "./components/training/TrainingScreen";
import type { GamePhase, PlayerState, TrigramStance } from "./types";
import { createPlayerState } from "./types";
import "./App.css";

// Korean martial arts application state
interface AppState {
  readonly gamePhase: GamePhase;
  readonly players: readonly [PlayerState, PlayerState];
  readonly gameTime: number;
  readonly currentRound: number;
  readonly timeRemaining: number;
  readonly combatLog: readonly string[];
  readonly isPaused: boolean;
}

// Create AudioProvider component if it doesn't exist
const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};

export function App(): React.ReactElement {
  // Initialize Korean martial arts game state
  const [appState, setAppState] = useState<AppState>({
    gamePhase: "intro",
    players: [
      // Fix: Use createPlayerState correctly without problematic overrides
      createPlayerState("player1", { x: 150, y: 300 }, "geon"),
      createPlayerState("player2", { x: 650, y: 300 }, "gon"),
    ] as const,
    gameTime: 0,
    currentRound: 1,
    timeRemaining: 180000, // 3 minutes in milliseconds
    combatLog: [],
    isPaused: false,
  });

  // Initialize players using createPlayerState with proper required parameters
  const [players, setPlayers] = useState<readonly [PlayerState, PlayerState]>([
    createPlayerState("player1", { x: 100, y: 300 }, "geon", {
      health: 100,
      maxHealth: 100,
      ki: 50,
      maxKi: 100,
      stamina: 100,
      maxStamina: 100,
      facing: "right",
    }),
    createPlayerState("player2", { x: 700, y: 300 }, "tae", {
      health: 100,
      maxHealth: 100,
      ki: 50,
      maxKi: 100,
      stamina: 100,
      maxStamina: 100,
      facing: "left",
    }),
  ]);

  // Game phase and state management
  const handleGamePhaseChange = useCallback((newPhase: GamePhase) => {
    setAppState((prev) => ({
      ...prev,
      gamePhase: newPhase,
    }));
  }, []);

  const handleStanceChange = useCallback(
    (playerIndex: number, stance: TrigramStance): void => {
      setPlayers((prevState) => {
        const newState = [...prevState] as [PlayerState, PlayerState];
        newState[playerIndex] = {
          ...newState[playerIndex],
          stance,
          lastStanceChangeTime: Date.now(),
        };
        return newState;
      });
    },
    []
  );

  // Korean martial arts combat log
  const addToCombatLog = useCallback((message: string): void => {
    setAppState((prev) => ({
      ...prev,
      combatLog: [...prev.combatLog, message].slice(-10), // Keep last 10 messages
    }));
  }, []);

  // Korean martial arts match management
  const handleStartMatch = useCallback((): void => {
    setAppState((prev) => ({
      ...prev,
      gamePhase: "combat",
      gameTime: 0,
      timeRemaining: 180000,
      combatLog: [],
      players: [
        // Fix: Create fresh player states with explicit health/ki/stamina
        createPlayerState("player1", { x: 150, y: 300 }, "geon", {
          health: 100,
          ki: 50,
          stamina: 100,
        }),
        createPlayerState("player2", { x: 650, y: 300 }, "gon", {
          health: 100,
          ki: 50,
          stamina: 100,
        }),
      ] as const,
    }));
    addToCombatLog(
      "🥋 한국 무술 대결 시작! (Korean martial arts match begins!)"
    );
  }, [addToCombatLog]);

  const handleResetMatch = useCallback((): void => {
    setAppState((prev) => ({
      ...prev,
      gamePhase: "intro",
      gameTime: 0,
      timeRemaining: 180000,
      combatLog: [],
      players: [
        // Fix: Reset to clean initial states
        createPlayerState("player1", { x: 150, y: 300 }, "geon"),
        createPlayerState("player2", { x: 650, y: 300 }, "gon"),
      ] as const,
    }));
  }, []);

  const handleTogglePause = useCallback((): void => {
    setAppState((prev) => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  }, []);

  // Keyboard input handling for game controls
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      switch (key) {
        case "1":
          setAppState("intro");
          break;
        case "2":
          setAppState("training");
          break;
        case "3":
          setAppState("philosophy");
          break;
        default:
          // Handle stance changes
          const stanceKeys: Record<string, TrigramStance> = {
            "1": "geon",
            "2": "tae",
            "3": "li",
            "4": "jin",
            "5": "son",
            "6": "gam",
            "7": "gan",
            "8": "gon",
          };

          const newStance = stanceKeys[key];
          if (newStance) {
            handleStanceChange(0, newStance);
          }
          break;
      }
    },
    [setAppState, handleStanceChange]
  );

  // Player state update handling
  const handlePlayerUpdate = useCallback(
    (playerIndex: number, updates: Partial<PlayerState>): void => {
      setPlayers((prevState) => {
        const newState = [...prevState] as [PlayerState, PlayerState];
        newState[playerIndex] = {
          ...newState[playerIndex],
          ...updates,
        };
        return newState;
      });
    },
    []
  );

  // UI props using the game state
  const gameUIProps = {
    players,
    gamePhase: appState.gamePhase,
    onGamePhaseChange: handleGamePhaseChange,
    gameTime: 0,
    currentRound: 1,
    timeRemaining: 180,
    onStanceChange: handleStanceChange,
    combatLog: [],
    onStartMatch: () => setAppState("combat"),
    onResetMatch: () => {
      setAppState("intro");
      setPlayers([
        createPlayerState("player1", { x: 200, y: 300 }, "geon"),
        createPlayerState("player2", { x: 600, y: 300 }, "gon"),
      ]);
    },
    onTogglePause: () => {
      // Toggle pause logic here
    },
  };

  // Korean martial arts render logic
  const renderCurrentPhase = (): React.ReactElement => {
    switch (appState.gamePhase) {
      case "intro":
        return <IntroScreen onGamePhaseChange={handleGamePhaseChange} />;

      case "training":
        return <TrainingScreen onGamePhaseChange={handleGamePhaseChange} />;

      case "philosophy":
        return <IntroScreen onGamePhaseChange={handleGamePhaseChange} />;

      case "combat":
      case "result":
      case "victory":
      case "defeat":
        return (
          <div className="game-container">
            {/* Korean martial arts game UI overlay */}
            <GameUI
              {...gameUIProps}
              onGamePhaseChange={handleGamePhaseChange}
              onStartMatch={handleStartMatch}
              onResetMatch={handleResetMatch}
              onTogglePause={handleTogglePause}
            />

            {/* Korean martial arts game engine */}
            <GameEngine
              players={appState.players}
              gamePhase={appState.gamePhase}
              onGamePhaseChange={handleGamePhaseChange}
              onPlayerUpdate={handlePlayerUpdate} // Fix: Now properly defined
              onStanceChange={handleStanceChange}
              width={800}
              height={600}
              isPaused={appState.isPaused}
            />
          </div>
        );

      default:
        return <IntroScreen onGamePhaseChange={handleGamePhaseChange} />;
    }
  };

  return (
    <AudioProvider>
      <div className="app korean-martial-arts-app">
        <header className="app-header">
          <h1 className="korean-title">
            흑괘 무술 도장 (Black Trigram Martial Arts Dojang)
          </h1>
          <div className="phase-indicator korean-phase">
            {appState.gamePhase === "intro" && "소개 (Introduction)"}
            {appState.gamePhase === "training" && "수련 (Training)"}
            {appState.gamePhase === "philosophy" && "철학 (Philosophy)"}
            {appState.gamePhase === "combat" && "대결 (Combat)"}
            {appState.gamePhase === "result" && "결과 (Result)"}
            {appState.gamePhase === "victory" && "승리 (Victory)"}
            {appState.gamePhase === "defeat" && "패배 (Defeat)"}
          </div>
        </header>

        <main className="app-main korean-dojang">{renderCurrentPhase()}</main>

        <footer className="app-footer korean-footer">
          <p className="korean-wisdom">
            마음이 고요할 때 진정한 힘이 나온다
            <br />
            <span className="english-translation">
              (True power emerges when the mind is calm)
            </span>
          </p>
        </footer>
      </div>
    </AudioProvider>
  );
}

export default App;
