import { useState, useCallback } from "react";
import { Application, Stage } from "@pixi/react";
import { GameMode, PlayerArchetype, TrigramStance } from "./types/enums"; // Fix: Import TrigramStance
import { IntroScreen } from "./components/intro/IntroScreen";
import { CombatScreen } from "./components/combat/CombatScreen";
import { TrainingScreen } from "./components/training/TrainingScreen";
import { AudioProvider } from "./audio/AudioProvider";
import { GAME_CONFIG } from "./types/constants";
import type { PlayerState } from "./types";
import "./App.css";

function App() {
  const [currentMode, setCurrentMode] = useState<GameMode | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Create default players for combat
  const createDefaultPlayers = useCallback((): [PlayerState, PlayerState] => {
    const player1: PlayerState = {
      id: "player1",
      name: { korean: "플레이어 1", english: "Player 1" },
      archetype: PlayerArchetype.MUSA,
      health: 100,
      maxHealth: 100,
      ki: 100,
      maxKi: 100,
      stamina: 100,
      maxStamina: 100,
      currentStance: TrigramStance.GEON,
      position: { x: 200, y: 300 },
      isGuarding: false,
      stunDuration: 0,
      comboCount: 0,
      lastActionTime: 0,
      consciousness: 100,
      pain: 0,
      balance: 100,
      bloodLoss: 0,
      currentTechnique: null,
      activeEffects: [],
      vitalPoints: [], // Fix: Use vitalPoints instead of vitalPointHits
      defensiveBonus: 0,
      attackPower: 1.0,
      movementSpeed: 1.0,
      reactionTime: 1.0,
      focusLevel: 100,
      battleExperience: 0,
      injuredLimbs: [],
      statusConditions: [],
    };

    const player2: PlayerState = {
      id: "player2",
      name: { korean: "플레이어 2", english: "Player 2" },
      archetype: PlayerArchetype.AMSALJA,
      health: 100,
      maxHealth: 100,
      ki: 100,
      maxKi: 100,
      stamina: 100,
      maxStamina: 100,
      currentStance: TrigramStance.TAE,
      position: { x: 600, y: 300 },
      isGuarding: false,
      stunDuration: 0,
      comboCount: 0,
      lastActionTime: 0,
      consciousness: 100,
      pain: 0,
      balance: 100,
      bloodLoss: 0,
      currentTechnique: null,
      activeEffects: [],
      vitalPoints: [], // Fix: Use vitalPoints instead of vitalPointHits
      defensiveBonus: 0,
      attackPower: 1.0,
      movementSpeed: 1.0,
      reactionTime: 1.0,
      focusLevel: 100,
      battleExperience: 0,
      injuredLimbs: [],
      statusConditions: [],
    };

    return [player1, player2];
  }, []);

  const handleMenuSelect = useCallback((mode: GameMode) => {
    setCurrentMode(mode);
    setIsInitialized(true);
  }, []);

  const handleBackToMenu = useCallback(() => {
    setCurrentMode(null);
    setIsInitialized(false);
  }, []);

  const renderCurrentScreen = () => {
    if (!isInitialized || !currentMode) {
      return <IntroScreen onMenuSelect={handleMenuSelect} />;
    }

    switch (currentMode) {
      case GameMode.VERSUS:
        return (
          <CombatScreen
            onReturnToMenu={handleBackToMenu}
            players={createDefaultPlayers()}
          />
        ); // Fix: Add players prop
      case GameMode.TRAINING:
        return (
          <TrainingScreen
            selectedArchetype={PlayerArchetype.MUSA} // Fix: Use PlayerArchetype enum
            onBack={handleBackToMenu}
            onTrainingComplete={() => {
              console.log("Training completed");
            }}
          />
        );
      case GameMode.STORY:
        return (
          <CombatScreen
            onReturnToMenu={handleBackToMenu}
            players={createDefaultPlayers()}
          />
        ); // Fix: Add players prop
      case GameMode.ARCADE:
        return (
          <CombatScreen
            onReturnToMenu={handleBackToMenu}
            players={createDefaultPlayers()}
          />
        ); // Fix: Add players prop
      case GameMode.SURVIVAL:
        return (
          <CombatScreen
            onReturnToMenu={handleBackToMenu}
            players={createDefaultPlayers()}
          />
        ); // Fix: Add players prop
      default:
        return <IntroScreen onMenuSelect={handleMenuSelect} />;
    }
  };

  return (
    <AudioProvider>
      <div className="app">
        <Application
          width={GAME_CONFIG.CANVAS_WIDTH}
          height={GAME_CONFIG.CANVAS_HEIGHT}
          options={{
            backgroundColor: 0x000000,
            antialias: true,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
          }}
        >
          <Stage>{renderCurrentScreen()}</Stage>
        </Application>
      </div>
    </AudioProvider>
  );
}

export default App;
