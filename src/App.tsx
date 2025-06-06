import React, {
  useState,
  useEffect,
  useCallback,
  // useMemo, // Removed unused import
  useRef,
} from "react";
import { Application } from "@pixi/react";
import * as PIXI from "pixi.js";
import "./App.css";

import { GameUI } from "./components/game/GameUI";
import { AudioManager } from "./audio/AudioManager";
import { AudioProvider, useAudio } from "./audio/AudioProvider";
import { PLACEHOLDER_AUDIO_ASSETS } from "./audio/placeholder-sounds";
import CombatScreen from "./components/combat/CombatScreen"; // Changed to default import
import { IntroScreen } from "./components/intro/IntroScreen";
import { TrainingScreen } from "./components/training/TrainingScreen";
import { EndScreen } from "./components/ui/EndScreen";
import {
  KOREAN_COLORS,
  GAME_CONFIG,
  // CYBERPUNK_DOJANG, // Removed unused import
  // PLAYER_ARCHETYPES, // Using string literals directly
} from "./types";
import type {
  PlayerState,
  GamePhase,
  TrigramStance,
  KoreanText,
  PlayerArchetype,
} from "./types";
import { createPlayerState } from "./utils/playerUtils";

// Initialize AudioManager instance
const audioManagerInstance = new AudioManager(PLACEHOLDER_AUDIO_ASSETS);

const App: React.FC = () => {
  const [gamePhase, setGamePhase] = useState<GamePhase>("intro");
  const [player1, setPlayer1] = useState<PlayerState>(() =>
    createPlayerState(
      "player1",
      "musa" as PlayerArchetype, // Use string literal
      "geon" as TrigramStance, // Add initial stance
      { x: 200, y: GAME_CONFIG.CANVAS_HEIGHT / 2 },
      "right"
    )
  );
  const [player2, setPlayer2] = useState<PlayerState>(() =>
    createPlayerState(
      "player2",
      "amsalja" as PlayerArchetype, // Use string literal
      "geon" as TrigramStance, // Add initial stance
      { x: GAME_CONFIG.CANVAS_WIDTH - 200, y: GAME_CONFIG.CANVAS_HEIGHT / 2 },
      "left"
    )
  );

  const [gameTime, _setGameTime] = useState(0); // setGameTime is unused, aliased with _
  const [currentRound, setCurrentRound] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(
    GAME_CONFIG.ROUND_DURATION_SECONDS
  );
  const [isPaused, setIsPaused] = useState(false);
  const [winnerId, setWinnerId] = useState<string | null>(null);
  const [combatLog, _setCombatLog] = useState<KoreanText[]>([]); // setCombatLog is unused, aliased with _
  const pixiAppRef = useRef<PIXI.Application>(null);

  // Audio context
  const audio = useAudio(); // Assuming useAudio provides initialization status

  useEffect(() => {
    // Initialize audio manager when the component mounts
    // and audio context is available but not yet initialized.
    if (audio && !audio.isInitialized) {
      // Corrected: use audio.isInitialized
      audio
        .init()
        .then(() => {
          console.log("Audio Manager initialized via App.tsx effect");
          audio.playMusic("menu_theme");
        })
        .catch((error) => {
          console.error("Failed to initialize audio manager from App:", error);
        });
    }
  }, [audio]);

  const handleGamePhaseChange = useCallback(
    (phaseValue: string) => {
      const newPhase = phaseValue as GamePhase;
      setGamePhase(newPhase);
      setWinnerId(null); // Reset winner when phase changes
      if (newPhase === "combat") {
        setCurrentRound(1);
        setTimeRemaining(GAME_CONFIG.ROUND_DURATION_SECONDS);
        // Reset players for a new match
        setPlayer1(
          createPlayerState(
            "player1",
            "musa" as PlayerArchetype, // Use string literal
            "geon" as TrigramStance, // Add initial stance
            { x: 200, y: GAME_CONFIG.CANVAS_HEIGHT / 2 },
            "right"
          )
        );
        setPlayer2(
          createPlayerState(
            "player2",
            "amsalja" as PlayerArchetype, // Use string literal
            "geon" as TrigramStance, // Add initial stance
            {
              x: GAME_CONFIG.CANVAS_WIDTH - 200,
              y: GAME_CONFIG.CANVAS_HEIGHT / 2,
            },
            "left"
          )
        );
        audio?.playMusic("combat_theme");
      } else if (newPhase === "intro") {
        audio?.playMusic("menu_theme");
      }
    },
    [audio]
  );

  const handlePlayerUpdate = useCallback(
    (playerIndex: number, updates: Partial<PlayerState>) => {
      if (playerIndex === 0) {
        setPlayer1((prev) => ({ ...prev, ...updates }));
      } else {
        setPlayer2((prev) => ({ ...prev, ...updates }));
      }
    },
    []
  );

  const handleStanceChangeLocal = useCallback(
    // Renamed to avoid conflict if imported
    (playerIndex: number, stance: TrigramStance) => {
      const playerToUpdate = playerIndex === 0 ? player1 : player2;
      // Assuming TrigramSystem instance is available or stance change logic is here
      console.log(`Player ${playerToUpdate.id} changed stance to ${stance}`);
      // Example: Directly update stance, or use a TrigramSystem
      handlePlayerUpdate(playerIndex, { currentStance: stance });
      audio?.playSFX("stance_change");
    },
    [player1, player2, handlePlayerUpdate, audio]
  );

  const renderScene = () => {
    switch (gamePhase) {
      case "intro":
        return <IntroScreen onGamePhaseChange={handleGamePhaseChange} />;
      case "training":
        return (
          <TrainingScreen
            players={[player1, player2]} // Pass player1 and player2
            onGamePhaseChange={handleGamePhaseChange}
            onPlayerUpdate={handlePlayerUpdate}
            onStanceChange={(stance) => handleStanceChangeLocal(0, stance)} // Example for player 1
            selectedStance={player1.currentStance} // Use player1
            gameTime={gameTime}
            currentRound={currentRound}
          />
        );
      case "combat":
        return (
          <CombatScreen
            players={[player1, player2]}
            onGamePhaseChange={handleGamePhaseChange}
            onPlayerUpdate={handlePlayerUpdate}
            gameTime={gameTime}
            currentRound={currentRound}
            timeRemaining={timeRemaining}
            isPaused={isPaused}
          />
        );
      case "victory":
      case "defeat":
        return (
          <EndScreen
            winnerId={winnerId}
            onRestart={() => handleGamePhaseChange("combat")}
            onMenu={() => handleGamePhaseChange("intro")}
          />
        );
      default:
        console.warn(`Unhandled game phase: ${gamePhase}, returning to intro.`);
        setGamePhase("intro"); // Fallback to intro
        return <IntroScreen onGamePhaseChange={handleGamePhaseChange} />;
    }
  };

  if (!audio?.isInitialized) {
    // Corrected: use audio.isInitialized
    // Optionally, render a loading state or a silent experience until audio is ready
    // For now, rendering the app anyway, but audio features might not work immediately.
    // console.log("Audio manager not yet initialized. App might be silent.");
  }

  return (
    <div className="app-container">
      <GameUI
        players={[player1, player2]}
        gamePhase={gamePhase}
        onGamePhaseChange={handleGamePhaseChange}
        gameTime={gameTime}
        currentRound={currentRound}
        timeRemaining={timeRemaining}
        onStanceChange={handleStanceChangeLocal}
        combatLog={combatLog}
        onPlayerUpdate={handlePlayerUpdate}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused(!isPaused)}
      />
      {/* Use @pixi/react Application component */}
      <Application
        ref={pixiAppRef}
        width={GAME_CONFIG.CANVAS_WIDTH}
        height={GAME_CONFIG.CANVAS_HEIGHT}
        options={{
          backgroundColor: KOREAN_COLORS.BLACK, // Use a color from KOREAN_COLORS
          // CYBERPUNK_DOJANG.BACKGROUND_COLOR does not exist.
          antialias: true,
          resolution: window.devicePixelRatio || 1,
        }}
      >
        {renderScene()}
      </Application>
    </div>
  );
};

const AppWithAudio: React.FC = () => (
  <AudioProvider manager={audioManagerInstance}>
    <App />
  </AudioProvider>
);

export default AppWithAudio;
