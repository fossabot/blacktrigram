import React, { useState } from "react";
import { IntroScreen } from "./components/intro/IntroScreen";
import { TrainingScreen } from "./components/training/TrainingScreen";
import { CombatScreen } from "./components/combat/CombatScreen";
import { EndScreen } from "./components/ui/EndScreen";
import { createPlayerState } from "./utils/playerUtils";
import type { AppState, PlayerState } from "./types";
import type { GamePhase } from "./types/game";

// Black Trigram (흑괘) - Korean Martial Arts Combat Simulator
function App(): React.JSX.Element {
  const [appState, setAppState] = useState<AppState>(() => ({
    gamePhase: "intro" as GamePhase,
    players: [
      createPlayerState("Player 1", "musa"),
      createPlayerState("Player 2", "amsalja"),
    ] as readonly [PlayerState, PlayerState],
    gameTime: 0,
    currentRound: 1,
    timeRemaining: 180000,
    combatLog: [],
    isPaused: false,
    winnerId: null,
  }));

  const handleGamePhaseChange = (newPhase: GamePhase | string) => {
    setAppState((prev) => ({
      ...prev,
      gamePhase: newPhase as GamePhase,
    }));
  };

  const handlePlayerUpdate = (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => {
    setAppState((prev) => ({
      ...prev,
      players: prev.players.map((player, index) =>
        index === playerIndex ? { ...player, ...updates } : player
      ) as unknown as readonly [PlayerState, PlayerState],
    }));
  };

  const renderCurrentScreen = () => {
    switch (appState.gamePhase) {
      case "intro":
        return <IntroScreen onGamePhaseChange={handleGamePhaseChange} />;

      case "training":
        return (
          <TrainingScreen
            players={appState.players}
            onGamePhaseChange={handleGamePhaseChange}
            onPlayerUpdate={handlePlayerUpdate}
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

      case "victory":
      case "defeat":
        return (
          <EndScreen
            winnerId={appState.winnerId}
            winner={appState.winnerId || "unknown"}
            onReturnToMenu={() => handleGamePhaseChange("intro")}
            onMenu={() => handleGamePhaseChange("intro")}
          />
        );

      default:
        return <div>Loading...</div>;
    }
  };

  return <div className="app">{renderCurrentScreen()}</div>;
}

export default App;
