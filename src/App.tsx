import React, { useState, useCallback, useEffect } from "react";
import { Application } from "@pixi/react";
import type { GameState, PlayerArchetype } from "./types";
import { IntroScreen } from "./components/intro/IntroScreen";
import { TrainingScreen } from "./components/training/TrainingScreen";
import { GameEngine } from "./components/game/GameEngine";
import { useAudioContext } from "./audio/AudioProvider";
import "./App.css";

export default function App(): React.JSX.Element {
  const { audioManager, isReady } = useAudioContext();
  const [gameState, setGameState] = useState<GameState>("intro");
  const [selectedArchetype, setSelectedArchetype] =
    useState<PlayerArchetype>("musa");

  const handleStateChange = useCallback(
    (newState: GameState) => {
      setGameState(newState);

      // Play state transition sound if audio is available
      if (audioManager) {
        try {
          audioManager.playSFX("ui_transition" as any);
        } catch (error) {
          console.warn("Failed to play transition sound:", error);
        }
      }
    },
    [audioManager]
  );

  const handleArchetypeSelect = useCallback(
    (archetype: PlayerArchetype) => {
      setSelectedArchetype(archetype);

      // Play archetype selection sound if audio is available
      if (audioManager) {
        try {
          audioManager.playSFX(`select_${archetype}` as any);
        } catch (error) {
          console.warn("Failed to play selection sound:", error);
        }
      }
    },
    [audioManager]
  );

  // Show loading screen while audio initializes
  if (!isReady) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <h1 className="korean-title">흑괘 로딩 중...</h1>
          <p className="english-subtitle">Loading Black Trigram...</p>
        </div>
      </div>
    );
  }

  // Render appropriate screen based on game state
  switch (gameState) {
    case "intro":
      return (
        <IntroScreen
          onStartTraining={() => handleStateChange("training")}
          onStartCombat={() => handleStateChange("combat")}
          onArchetypeSelect={handleArchetypeSelect}
          selectedArchetype={selectedArchetype}
        />
      );

    case "training":
      return (
        <TrainingScreen
          archetype={selectedArchetype}
          onReturnToIntro={() => handleStateChange("intro")}
          onStartCombat={() => handleStateChange("combat")}
        />
      );

    case "combat":
      return (
        <Stage
          width={1920}
          height={1080}
          options={{
            backgroundColor: 0x000000,
            antialias: true,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
          }}
        >
          <GameEngine
            archetype={selectedArchetype}
            onReturnToIntro={() => handleStateChange("intro")}
            onReturnToTraining={() => handleStateChange("training")}
          />
        </Stage>
      );

    default:
      return (
        <div className="error-state">
          <h1>Unknown Game State: {gameState}</h1>
          <button onClick={() => handleStateChange("intro")}>
            Return to Intro
          </button>
        </div>
      );
  }
}
