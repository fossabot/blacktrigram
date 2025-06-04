import React, { useState, useCallback } from "react";
import { AudioProvider } from "./audio/AudioManager"; // Fix import path
import { IntroScreen } from "./components/intro/IntroScreen";
import { TrainingScreen } from "./components/training/TrainingScreen";
import CombatScreen from "./components/combat/CombatScreen";
import type { PlayerArchetype, PlayerState, TrigramStance } from "./types";
import { createPlayerState } from "./utils/playerUtils";
import "./App.css";

type AppState = "intro" | "training" | "combat" | "menu" | "gameOver";

interface GameState {
  currentScreen: AppState;
  selectedArchetype: PlayerArchetype;
  selectedStance: TrigramStance;
  player: PlayerState | null;
  winner: PlayerState | null;
}

function App(): React.ReactElement {
  const [gameState, setGameState] = useState<GameState>({
    currentScreen: "intro",
    selectedArchetype: "musa",
    selectedStance: "geon",
    player: null,
    winner: null,
  });

  // Handle navigation between screens
  const navigateToScreen = useCallback((screen: AppState) => {
    setGameState((prev) => ({ ...prev, currentScreen: screen }));
  }, []);

  // Handle archetype selection
  const handleArchetypeSelect = useCallback((archetype: PlayerArchetype) => {
    setGameState((prev) => ({ ...prev, selectedArchetype: archetype }));
  }, []);

  // Handle stance selection
  const handleStanceSelect = useCallback((stance: TrigramStance) => {
    setGameState((prev) => ({ ...prev, selectedStance: stance }));
  }, []);

  // Start combat
  const handleStartCombat = useCallback(() => {
    const player = createPlayerState(
      "player1",
      gameState.selectedArchetype,
      gameState.selectedStance,
      {
        name: "플레이어",
        position: { x: 200, y: 400 },
        facing: "right",
      }
    );

    setGameState((prev) => ({
      ...prev,
      player,
      currentScreen: "combat",
    }));
  }, [gameState.selectedArchetype, gameState.selectedStance]);

  // Handle game over
  const handleGameOver = useCallback((winner: PlayerState) => {
    setGameState((prev) => ({
      ...prev,
      winner,
      currentScreen: "gameOver",
    }));
  }, []);

  // Return to main menu
  const handleReturnToMenu = useCallback(() => {
    setGameState({
      currentScreen: "intro",
      selectedArchetype: "musa",
      selectedStance: "geon",
      player: null,
      winner: null,
    });
  }, []);

  // Fixed position interface
  const defaultPosition = { x: 200, y: 300 };

  // Render current screen
  const renderCurrentScreen = () => {
    switch (gameState.currentScreen) {
      case "intro":
        return (
          <IntroScreen
            onArchetypeSelect={handleArchetypeSelect}
            onStanceSelect={handleStanceSelect}
            onStartTraining={() => navigateToScreen("training")}
            onStartCombat={handleStartCombat}
            selectedArchetype={gameState.selectedArchetype}
            selectedStance={gameState.selectedStance}
          />
        );

      case "training":
        return (
          <TrainingScreen
            archetype={gameState.selectedArchetype}
            stance={gameState.selectedStance}
            onBack={() => navigateToScreen("intro")}
            onStartCombat={handleStartCombat}
          />
        );

      case "combat":
        return gameState.player ? (
          <CombatScreen
            player={gameState.player}
            archetype={gameState.selectedArchetype}
            onGameOver={handleGameOver}
            onReturnToMenu={handleReturnToMenu}
          />
        ) : (
          <div>Error: No player data</div>
        );

      case "gameOver":
        return (
          <div className="game-over-screen">
            <h1>게임 종료 (Game Over)</h1>
            <h2>
              승자: {gameState.winner?.name} ({gameState.winner?.archetype})
            </h2>
            <button onClick={handleReturnToMenu}>
              메인 메뉴로 돌아가기 (Return to Main Menu)
            </button>
          </div>
        );

      default:
        return <div>Unknown screen</div>;
    }
  };

  return (
    <AudioProvider>
      <div className="App">
        <header className="App-header">
          <h1>흑괘 (Black Trigram)</h1>
          <p>Korean Martial Arts Combat Simulator</p>
        </header>

        <main className="App-main">{renderCurrentScreen()}</main>

        <footer className="App-footer">
          <p>
            Current: {gameState.currentScreen} | Archetype:{" "}
            {gameState.selectedArchetype} | Stance: {gameState.selectedStance}
          </p>
        </footer>
      </div>
    </AudioProvider>
  );
}

export default App;
