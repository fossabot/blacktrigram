import React, { useState, useCallback, useEffect } from "react";
import { IntroScreen } from "./components/intro/IntroScreen";
import { GameUI } from "./components/game/GameUI";
import { TrainingScreen } from "./components/training/TrainingScreen";
import type { TrigramStance, PlayerState, GamePhase, Position } from "./types";
import { createPlayerState } from "./types";
import "./App.css";

// Define AppState interface
interface AppState {
  readonly gamePhase: GamePhase;
  readonly players: readonly [PlayerState, PlayerState];
  readonly gameTime: number;
  readonly currentRound: number;
  readonly timeRemaining: number;
  readonly combatLog: readonly string[];
}

export function App(): React.ReactElement {
  const [appState, setAppState] = useState<AppState>({
    gamePhase: "intro" as const,
    players: [
      createPlayerState("player1", { x: 200, y: 300 }, "geon", {
        health: 100,
        maxHealth: 100,
        ki: 50,
        maxKi: 100,
        stamina: 100,
        maxStamina: 100,
        visible: true,
        facing: "right",
      }),
      createPlayerState("player2", { x: 600, y: 300 }, "gam", {
        health: 100,
        maxHealth: 100,
        ki: 50,
        maxKi: 100,
        stamina: 100,
        maxStamina: 100,
        visible: true,
        facing: "left",
      }),
    ] as const,
    gameTime: 0,
    currentRound: 1,
    timeRemaining: 60,
    combatLog: [],
  });

  // Handle game phase changes
  const handleGamePhaseChange = useCallback((phase: GamePhase) => {
    setAppState((prevState) => ({
      ...prevState,
      gamePhase: phase,
    }));
  }, []);

  // Handle stance changes
  const handleStanceChange = useCallback(
    (playerIndex: number, stance: TrigramStance) => {
      setAppState((prevState) => {
        const newPlayers = [...prevState.players] as [PlayerState, PlayerState];
        // Fix: Ensure all required PlayerState properties are included
        newPlayers[playerIndex] = {
          ...newPlayers[playerIndex],
          stance,
          lastStanceChangeTime: Date.now(),
          playerId: newPlayers[playerIndex].playerId, // Ensure playerId is preserved
        };
        return {
          ...prevState,
          players: newPlayers,
        };
      });
    },
    []
  );

  // Match control functions
  const handleStartMatch = useCallback(() => {
    setAppState((prevState) => ({
      ...prevState,
      gamePhase: "combat",
      gameTime: 0,
      timeRemaining: 60,
      combatLog: ["Match started!"],
    }));
  }, []);

  const handleResetMatch = useCallback(() => {
    setAppState((prevState) => ({
      ...prevState,
      gamePhase: "intro",
      players: [
        createPlayerState("player1", { x: 200, y: 300 }, "geon", {
          health: 100,
          maxHealth: 100,
          ki: 50,
          maxKi: 100,
          stamina: 100,
          maxStamina: 100,
          visible: true,
          facing: "right",
        }),
        createPlayerState("player2", { x: 600, y: 300 }, "gam", {
          health: 100,
          maxHealth: 100,
          ki: 50,
          maxKi: 100,
          stamina: 100,
          maxStamina: 100,
          visible: true,
          facing: "left",
        }),
      ] as const,
      gameTime: 0,
      timeRemaining: 60,
      combatLog: [],
    }));
  }, []);

  const handleTogglePause = useCallback(() => {
    console.log("Game paused/unpaused");
  }, []);

  // Game loop for time updates
  useEffect(() => {
    if (appState.gamePhase === "combat" && appState.timeRemaining > 0) {
      const interval = setInterval(() => {
        setAppState((prevState) => ({
          ...prevState,
          gameTime: prevState.gameTime + 1,
          timeRemaining: Math.max(0, prevState.timeRemaining - 1),
        }));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [appState.gamePhase, appState.timeRemaining]);

  // Render appropriate screen based on game phase
  switch (appState.gamePhase) {
    case "intro":
      return <IntroScreen onGamePhaseChange={handleGamePhaseChange} />;

    case "training":
      return <TrainingScreen onGamePhaseChange={handleGamePhaseChange} />;

    case "philosophy":
      return (
        <div className="philosophy-screen">
          <h1>Korean Martial Arts Philosophy</h1>
          <p>
            Learn about the eight trigrams and their martial applications...
          </p>
          <button onClick={() => handleGamePhaseChange("intro")}>
            Back to Main Menu
          </button>
        </div>
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
        <div className="error-screen">
          <h1>Unknown Game Phase</h1>
          <button onClick={() => handleGamePhaseChange("intro")}>
            Return to Main Menu
          </button>
        </div>
      );
  }
}

export default App;
