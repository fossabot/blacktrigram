import React, { useState } from "react";
import { IntroScreen } from "./components/intro/IntroScreen";
import { TrainingScreen } from "./components/training/TrainingScreen";
import { CombatScreen } from "./components/combat/CombatScreen";
import { EndScreen } from "./components/ui/EndScreen";
import { AudioProvider } from "./audio/AudioProvider";
import { createPlayerState } from "./utils/playerUtils";
import type { PlayerState } from "./types";
import type { GamePhase } from "./types/game";

// Black Trigram (흑괘) - Korean Martial Arts Combat Simulator
function App(): React.JSX.Element {
  const [gamePhase, setGamePhase] = useState<GamePhase>("intro");
  const [players, setPlayers] = useState<readonly [PlayerState, PlayerState]>(
    () => [
      createPlayerState("Player 1", "musa"),
      createPlayerState("Player 2", "amsalja"),
    ]
  );
  const [winnerId, setWinnerId] = useState<string | null>(null);

  const handleGamePhaseChange = (newPhase: GamePhase | string) => {
    setGamePhase(newPhase as GamePhase);
    if (newPhase === "intro") {
      setWinnerId(null); // Reset winner when returning to intro
    }
  };

  const handlePlayerUpdate = (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => {
    setPlayers(
      (prev) =>
        prev.map((player, index) =>
          index === playerIndex ? { ...player, ...updates } : player
        ) as readonly [PlayerState, PlayerState]
    );
  };

  const renderCurrentScreen = () => {
    switch (gamePhase) {
      case "intro":
        return <IntroScreen onGamePhaseChange={handleGamePhaseChange} />;

      case "training":
        return (
          <TrainingScreen
            players={players}
            onGamePhaseChange={handleGamePhaseChange}
            onPlayerUpdate={handlePlayerUpdate}
            gameTime={0}
            currentRound={1}
          />
        );

      case "combat":
        return (
          <CombatScreen
            players={players}
            onGamePhaseChange={handleGamePhaseChange}
            onPlayerUpdate={handlePlayerUpdate}
            gameTime={0}
            currentRound={1}
            timeRemaining={180000}
            isPaused={false}
          />
        );

      case "victory":
      case "defeat":
        return (
          <EndScreen
            winner={winnerId}
            onRestart={() => handleGamePhaseChange("combat")}
            onMenu={() => handleGamePhaseChange("intro")}
          />
        );

      default:
        return (
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#000011",
              color: "#00ffff",
            }}
          >
            Loading Black Trigram...
          </div>
        );
    }
  };

  return (
    <AudioProvider>
      <div
        className="app"
        style={{ minHeight: "100vh", background: "#000011" }}
      >
        {renderCurrentScreen()}
      </div>
    </AudioProvider>
  );
}

export default App;
