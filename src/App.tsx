import React, { useState, useEffect, useCallback } from "react";
import type { AppState, GamePhase, PlayerState, TrigramStance } from "./types";
import { createPlayerState } from "./utils/playerUtils";
import { IntroScreen } from "./components/intro/IntroScreen";
import { TrainingScreen } from "./components/training/TrainingScreen";
import { CombatScreen } from "./components/combat/CombatScreen";
import { EndScreen } from "./components/ui/EndScreen";
import { useAudio } from "./audio/AudioManager";
import "./App.css";

function App(): React.ReactElement {
  const audio = useAudio();

  // Initialize game state
  const [appState, setAppState] = useState<AppState>(() => ({
    gamePhase: "intro",
    players: [
      createPlayerState("Player 1", "musa", "geon"), // Fixed: proper archetype
      createPlayerState("Player 2", "amsalja", "tae"), // Fixed: proper archetype
    ],
    gameTime: 0,
    currentRound: 1,
    timeRemaining: 180000, // 3 minutes in milliseconds
    combatLog: [],
    isPaused: false,
    winnerId: null,
  }));

  // Game phase change handler
  const handleGamePhaseChange = useCallback(
    (phase: GamePhase | string) => {
      const gamePhase = phase as GamePhase;
      setAppState((prev) => ({ ...prev, gamePhase }));

      // Play appropriate music
      switch (gamePhase) {
        case "intro":
          audio.playMusic("intro_theme");
          break;
        case "training":
          audio.playMusic("training_theme");
          break;
        case "combat":
          audio.playMusic("combat_theme");
          break;
        case "game_over":
          audio.playMusic("victory_theme");
          break;
      }
    },
    [audio]
  );

  // Player update handler
  const handlePlayerUpdate = useCallback(
    (playerIndex: number, updates: Partial<PlayerState>) => {
      setAppState((prev) => {
        const newPlayers = [...prev.players] as [PlayerState, PlayerState];
        newPlayers[playerIndex] = { ...newPlayers[playerIndex], ...updates };

        // Check for game over conditions
        const player = newPlayers[playerIndex];
        let winnerId: string | null = null;

        if (player.health <= 0 || player.consciousness <= 0) {
          winnerId = newPlayers[1 - playerIndex].id; // Fixed: access id property
          handleGamePhaseChange("game_over");
        }

        return {
          ...prev,
          players: newPlayers,
          winnerId,
        };
      });
    },
    [handleGamePhaseChange]
  );

  // Stance change handler
  const handleStanceChange = useCallback(
    (playerIndex: number, stance: TrigramStance) => {
      handlePlayerUpdate(playerIndex, { stance });
      audio.playStanceChangeSound();
    },
    [handlePlayerUpdate, audio]
  );

  // Game time effect
  useEffect(() => {
    if (appState.gamePhase === "combat" && !appState.isPaused) {
      const timer = setInterval(() => {
        setAppState((prev) => {
          const newTimeRemaining = Math.max(0, prev.timeRemaining - 1000);
          if (newTimeRemaining === 0) {
            handleGamePhaseChange("game_over");
          }
          return {
            ...prev,
            gameTime: prev.gameTime + 1000,
            timeRemaining: newTimeRemaining,
          };
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [appState.gamePhase, appState.isPaused, handleGamePhaseChange]);

  // Start match handler
  const handleStartMatch = useCallback(() => {
    setAppState((prev) => ({
      ...prev,
      gamePhase: "combat",
      timeRemaining: 180000 / 1000,
      currentRound: 1,
    }));
    audio.playSFX("match_start");
  }, [audio]);

  // Reset match handler
  const handleResetMatch = useCallback(() => {
    setAppState((prev) => ({
      ...prev,
      players: [
        createPlayerState("Player 1", "musa", "geon"),
        createPlayerState("Player 2", "amsalja", "tae"),
      ],
      gameTime: 0,
      currentRound: 1,
      timeRemaining: 180000,
      combatLog: [],
      winnerId: null,
    }));
  }, []);

  // Toggle pause handler
  const handleTogglePause = useCallback(() => {
    setAppState((prev) => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
    audio.playSFX("menu_select");
  }, [audio]);

  // Render appropriate screen based on game phase
  const renderCurrentScreen = (): React.ReactElement => {
    switch (appState.gamePhase) {
      case "intro":
      case "philosophy":
        return <IntroScreen onGamePhaseChange={handleGamePhaseChange} />;

      case "training":
        return (
          <TrainingScreen
            players={appState.players}
            onGamePhaseChange={handleGamePhaseChange}
            onPlayerUpdate={handlePlayerUpdate}
            onStanceChange={(stance) => handleStanceChange(0, stance)}
            selectedStance={appState.players[0].stance}
            gameTime={appState.gameTime}
            currentRound={appState.currentRound}
          />
        );

      case "combat":
        return (
          <CombatScreen
            players={appState.players}
            onGamePhaseChange={handleGamePhaseChange}
            onPlayerUpdate={handlePlayerUpdate}
            gameTime={appState.gameTime}
            currentRound={appState.currentRound}
            timeRemaining={appState.timeRemaining}
            isPaused={appState.isPaused}
          />
        );

      case "game_over":
      case "victory":
      case "defeat":
        return (
          <EndScreen
            winnerId={appState.winnerId}
            onRestart={handleResetMatch}
            onMenu={() => handleGamePhaseChange("intro")}
          />
        );

      default:
        return <IntroScreen onGamePhaseChange={handleGamePhaseChange} />;
    }
  };

  // Use the functions in your JSX
  return (
    <div className="App">
      <div className="game-container">{renderCurrentScreen()}</div>
      {/* Add pause toggle button */}
      <button
        onClick={handleTogglePause}
        style={{ position: "absolute", top: 10, right: 10 }}
      >
        {appState.isPaused ? "Resume" : "Pause"}
      </button>
      {/* Add start match button when appropriate */}
      {appState.gamePhase === "menu" && (
        <button
          onClick={handleStartMatch}
          style={{ position: "absolute", top: 50, right: 10 }}
        >
          Start Match
        </button>
      )}
    </div>
  );
}

export default App;
