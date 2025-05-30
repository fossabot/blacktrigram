import { useState, useCallback, useEffect } from "react";
import { Stage } from "@pixi/react";
import { IntroScreen } from "./components/intro/IntroScreen";
import { TrainingScreen } from "./components/training";
import { GameEngine } from "./components/game/GameEngine";
import {
  createPlayerState,
  KOREAN_COLORS,
  type GamePhase,
  type PlayerState,
} from "./types";

interface AppState {
  readonly mode: GamePhase;
  readonly isAudioInitialized: boolean;
  readonly showDebugInfo: boolean;
}

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

export default function App(): React.JSX.Element {
  const [appState, setAppState] = useState<AppState>({
    mode: "intro",
    isAudioInitialized: false,
    showDebugInfo: false,
  });

  // Initialize audio on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      setAppState((prev) => ({ ...prev, isAudioInitialized: true }));
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("keydown", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  // Handle mode transitions
  const handleModeChange = useCallback((newMode: GamePhase) => {
    setAppState((prev) => ({ ...prev, mode: newMode }));
  }, []);

  const handleStartGame = useCallback(() => {
    handleModeChange("combat");
  }, [handleModeChange]);

  const handleExitToIntro = useCallback(() => {
    handleModeChange("intro");
  }, [handleModeChange]);

  // Toggle debug information
  const toggleDebugInfo = useCallback(() => {
    setAppState((prev) => ({ ...prev, showDebugInfo: !prev.showDebugInfo }));
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "F1") {
        toggleDebugInfo();
      }
      if (event.key === "Escape" && appState.mode !== "intro") {
        handleExitToIntro();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [appState.mode, handleExitToIntro, toggleDebugInfo]);

  // Create mock players for combat mode
  const [players] = useState<[PlayerState, PlayerState]>([
    createPlayerState("player1", { x: 200, y: 400 }),
    createPlayerState("player2", { x: 600, y: 400 }),
  ]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: KOREAN_COLORS.BLACK,
        fontFamily: "Noto Sans KR, Arial, sans-serif",
      }}
    >
      <Stage
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        options={{
          backgroundColor: KOREAN_COLORS.BLACK,
          antialias: true,
          autoDensity: true,
          resolution: window.devicePixelRatio || 1,
        }}
      >
        {/* Intro Screen */}
        {appState.mode === "intro" && (
          <IntroScreen onStartGame={handleStartGame} />
        )}

        {/* Training Mode */}
        {appState.mode === "training" && (
          <TrainingScreen
            playerState={players[0]}
            onBack={() => setAppState((prev) => ({ ...prev, mode: "intro" }))}
          />
        )}

        {/* Combat Mode */}
        {appState.mode === "combat" && (
          <GameEngine
            players={players}
            gamePhase={appState.mode}
            onGamePhaseChange={handleModeChange}
            onPlayersChange={() => {}}
          />
        )}
      </Stage>

      {/* Debug Information Overlay */}
      {appState.showDebugInfo && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: KOREAN_COLORS.WHITE,
            padding: "10px",
            fontFamily: "monospace",
            fontSize: "12px",
            borderRadius: "5px",
            zIndex: 1000,
          }}
        >
          <div>흑괘 무술 도장 (Black Trigram Martial Arts)</div>
          <div>Mode: {appState.mode}</div>
          <div>Audio: {appState.isAudioInitialized ? "✓" : "✗"}</div>
          <div>
            Canvas: {CANVAS_WIDTH}x{CANVAS_HEIGHT}
          </div>
          <div>FPS: {Math.round(60)} (estimated)</div>
          <div>F1: Toggle Debug | ESC: Exit to Menu</div>
        </div>
      )}

      {/* Audio initialization prompt */}
      {!appState.isAudioInitialized && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(255, 215, 0, 0.9)",
            color: KOREAN_COLORS.BLACK,
            padding: "10px 20px",
            borderRadius: "5px",
            fontWeight: "bold",
            fontSize: "14px",
            zIndex: 1000,
          }}
        >
          클릭하여 오디오 활성화 (Click to enable audio)
        </div>
      )}
    </div>
  );
}
