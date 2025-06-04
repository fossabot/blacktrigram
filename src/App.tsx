import React, { useState, useCallback } from "react";
import { useAudio } from "./audio/AudioManager";
import IntroScreen from "./components/IntroScreen";
import TrainingScreen from "./components/TrainingScreen";
import CombatScreen from "./components/combat/CombatScreen";
import type { PlayerArchetype, TrigramStance, GameState } from "./types";
import "./App.css";

function App(): React.JSX.Element {
  const audio = useAudio();
  const [gameState, setGameState] = useState<GameState>({
    currentScreen: "intro",
    players: [],
    isGameActive: false,
    gameTime: 0,
    currentRound: 1,
    maxRounds: 3,
    winner: null,
    selectedArchetype: "musa",
    selectedStance: "geon",
  });

  // Korean martial arts archetype selection
  const handleArchetypeSelect = useCallback(
    (archetype: PlayerArchetype) => {
      setGameState((prev) => ({ ...prev, selectedArchetype: archetype }));
      audio.playSFX("menu_select");
    },
    [audio]
  );

  // Eight trigram stance selection
  const handleStanceSelect = useCallback(
    (stance: TrigramStance) => {
      setGameState((prev) => ({ ...prev, selectedStance: stance }));
      audio.playSFX("stance_select");
    },
    [audio]
  );

  const handleStartTraining = useCallback(() => {
    setGameState((prev) => ({ ...prev, currentScreen: "training" }));
    audio.playSFX("menu_select");
  }, [audio]);

  const handleStartCombat = useCallback(() => {
    setGameState((prev) => ({ ...prev, currentScreen: "combat" }));
    audio.playMusic("combat_theme");
  }, [audio]);

  const handleBackToMenu = useCallback(() => {
    setGameState((prev) => ({ ...prev, currentScreen: "intro" }));
    audio.stopMusic();
  }, [audio]);

  const renderCurrentScreen = () => {
    switch (gameState.currentScreen) {
      case "intro":
        return (
          <IntroScreen
            onArchetypeSelect={handleArchetypeSelect}
            onStanceSelect={handleStanceSelect}
            onStartTraining={handleStartTraining}
            onStartCombat={handleStartCombat}
            selectedArchetype={gameState.selectedArchetype!}
            selectedStance={gameState.selectedStance!}
          />
        );

      case "training":
        return (
          <TrainingScreen
            archetype={gameState.selectedArchetype!}
            stance={gameState.selectedStance!}
            onBack={handleBackToMenu}
            onStartCombat={handleStartCombat}
          />
        );

      case "combat":
        return (
          <CombatScreen
            archetype={gameState.selectedArchetype!}
            stance={gameState.selectedStance!}
            onBack={handleBackToMenu}
          />
        );

      default:
        return (
          <div className="loading-screen">
            <h1>흑괘 로딩중... (Black Trigram Loading...)</h1>
          </div>
        );
    }
  };

  return (
    <div className="app">
      <div className="app-container">{renderCurrentScreen()}</div>
    </div>
  );
}

export default App;
