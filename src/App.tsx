import React, { useState, useEffect } from "react";
import type { GamePhase } from "./types/game";
import type { PlayerState } from "./types/player";
import { createPlayerState } from "./utils/playerUtils";
import { IntroScreen } from "./components/intro/IntroScreen";
import { AudioProvider } from "./audio/AudioProvider";
import { TrainingScreen } from "./components/training/TrainingScreen";
import { CombatScreen } from "./components/combat/CombatScreen";
import { EndScreen } from "./components/ui/EndScreen";

// Black Trigram (흑괘) - Korean Martial Arts Combat Simulator
function App(): React.JSX.Element {
  const [gamePhase, setGamePhase] = useState<GamePhase>("intro");
  const [players, setPlayers] = useState<readonly [PlayerState, PlayerState]>(
    () => [
      createPlayerState("Player 1", "musa", "geon"),
      createPlayerState("Player 2", "amsalja", "tae"),
    ]
  );
  const [gameTime, setGameTime] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(180000); // 3 minutes
  const [winnerId, setWinnerId] = useState<string | null>(null);

  // Game timer
  useEffect(() => {
    if (gamePhase === "combat" && timeRemaining > 0 && !winnerId) {
      const timer = setInterval(() => {
        setGameTime((prev) => prev + 100);
        setTimeRemaining((prev) => Math.max(0, prev - 100));
      }, 100);
      return () => clearInterval(timer);
    }
  }, [gamePhase, timeRemaining, winnerId]);

  const handlePlayerUpdate = (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => {
    setPlayers((prev) => {
      // Fix: Use proper tuple creation with guaranteed 2 elements
      const newPlayers: [PlayerState, PlayerState] = [
        playerIndex === 0 ? { ...prev[0], ...updates } : prev[0],
        playerIndex === 1 ? { ...prev[1], ...updates } : prev[1],
      ];
      return newPlayers;
    });
  };

  const handleGamePhaseChange = (newPhase: string) => {
    setGamePhase(newPhase as GamePhase);
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
            gameTime={gameTime}
            currentRound={currentRound}
          />
        );

      case "combat":
        return (
          <CombatScreen
            players={players}
            onGamePhaseChange={handleGamePhaseChange}
            onPlayerUpdate={handlePlayerUpdate}
            gameTime={gameTime}
            currentRound={currentRound}
            timeRemaining={timeRemaining}
            isPaused={false}
          />
        );

      case "victory":
      case "defeat":
        return (
          <EndScreen
            winnerId={winnerId}
            winner={winnerId || undefined}
            onRestart={() => {
              setGamePhase("intro");
              setWinnerId(null);
              setGameTime(0);
              setCurrentRound(1);
              setTimeRemaining(180000);
            }}
            onMenu={() => setGamePhase("intro")}
          />
        );

      default:
        return <IntroScreen onGamePhaseChange={handleGamePhaseChange} />;
    }
  };

  return (
    <AudioProvider>
      <div className="app">
        {renderCurrentScreen()}
        <style>{`
          .app {
            width: 100vw;
            height: 100vh;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
            font-family: 'Noto Sans KR', Arial, sans-serif;
            overflow: hidden;
          }
          
          * {
            box-sizing: border-box;
          }
          
          body {
            margin: 0;
            padding: 0;
          }
        `}</style>
      </div>
    </AudioProvider>
  );
}

export default App;
