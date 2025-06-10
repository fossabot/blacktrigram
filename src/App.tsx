import React, { useState, useCallback } from "react";
import { Stage } from "@pixi/react"; // Fix: Use Stage instead of Application
import { usePixiExtensions } from "./utils/pixiExtensions";
import { AudioProvider } from "./audio/AudioProvider";
import { IntroScreen } from "./components/intro/IntroScreen";
import { TrainingScreen } from "./components/training/TrainingScreen";
import { CombatScreen } from "./components/combat/CombatScreen";
import { GameMode, PlayerArchetype } from "./types/enums"; // Fix: Import PlayerArchetype
import type { PlayerState } from "./types/player";
import { createPlayerFromArchetype } from "./utils/playerUtils";

export const App: React.FC = () => {
  usePixiExtensions();

  const [currentScreen, setCurrentScreen] = useState<string>("intro");
  // Fix: Use gameMode in the conditional logic
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.VERSUS);
  const [players, setPlayers] = useState<PlayerState[]>([
    // Fix: Use proper enum values
    createPlayerFromArchetype(PlayerArchetype.MUSA, 0),
    createPlayerFromArchetype(PlayerArchetype.AMSALJA, 1),
  ]);

  const handleModeSelect = useCallback((mode: GameMode) => {
    setGameMode(mode);
    setCurrentScreen(mode === GameMode.TRAINING ? "training" : "combat");
  }, []);

  const handlePlayerUpdate = useCallback(
    (index: number, updates: Partial<PlayerState>) => {
      setPlayers((prev) => {
        const newPlayers = [...prev];
        newPlayers[index] = { ...newPlayers[index], ...updates };
        return newPlayers;
      });
    },
    []
  );

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "intro":
        return <IntroScreen onMenuSelect={handleModeSelect} />;
      case "training":
        return (
          <TrainingScreen
            onReturnToMenu={() => setCurrentScreen("intro")}
            player={players[0]}
            onPlayerUpdate={(updates) => handlePlayerUpdate(0, updates)}
          />
        );
      case "combat":
        return (
          <CombatScreen
            players={players as [PlayerState, PlayerState]}
            currentRound={1}
            timeRemaining={180}
            isPaused={false}
            gameMode={gameMode} // Fix: Use gameMode variable
            onPlayerUpdate={handlePlayerUpdate}
            onReturnToMenu={() => setCurrentScreen("intro")}
            onGameEnd={() => setCurrentScreen("intro")}
          />
        );
      default:
        return <IntroScreen onMenuSelect={handleModeSelect} />;
    }
  };

  return (
    <AudioProvider>
      <Stage // Fix: Use Stage instead of Application
        width={1200}
        height={800}
        options={{ backgroundColor: 0x1a1a2e, antialias: true }}
      >
        {renderCurrentScreen()}
      </Stage>
    </AudioProvider>
  );
};

export default App;
