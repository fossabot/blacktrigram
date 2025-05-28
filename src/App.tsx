import { Application, extend } from "@pixi/react";
import { Container, Graphics, Text, Sprite } from "pixi.js";
import { useState, useCallback } from "react"; // Removed useEffect, useMemo
import type { JSX } from "react";
import "./App.css";
import { GameEngine } from "./components/game/GameEngine";
import { useAudio } from "./audio/AudioManager";
import { IntroScreen } from "./components/intro/IntroScreen.tsx"; // Added .tsx extension

// Extend @pixi/react with the Pixi components we want to use
extend({
  Container,
  Graphics,
  Text,
  Sprite,
});

// Type definitions
type GameMode = "intro" | "game" | "training";

interface BackButtonProps {
  readonly onBack: () => void;
}

// Constants
const COLORS_APP = {
  // Renamed to avoid conflict if some colors are kept here
  BLACK: 0x000000,
  WHITE: 0xffffff,
  DARK_BLUE: 0x000a12,
  ACCENT_BLUE: 0x004455,
  GRAY_TEXT: 0xcccccc,
  CYAN: 0x00ffff, // Added CYAN
  // Keep only colors used by App, BackButton, TrainingMode
} as const;

function App(): JSX.Element {
  const [gameMode, setGameMode] = useState<GameMode>("intro");
  const audio = useAudio();

  const startGame = useCallback((): void => {
    audio.playSFX("menu_select");
    setGameMode("game");
  }, [audio]);

  const startTraining = useCallback((): void => {
    audio.playSFX("menu_select");
    setGameMode("training");
  }, [audio]);

  const returnToIntro = useCallback((): void => {
    audio.playSFX("menu_back");
    setGameMode("intro");
  }, [audio]);

  return (
    <div className="app-container">
      <Application
        width={window.innerWidth}
        height={window.innerHeight}
        backgroundColor={COLORS_APP.BLACK}
        antialias={true}
        resizeTo={window}
      >
        {gameMode === "intro" && (
          <IntroScreen
            onStartGame={startGame}
            onStartTraining={startTraining}
          />
        )}
        {gameMode === "game" && (
          <pixiContainer>
            <GameEngine />
            <BackButton onBack={returnToIntro} />
          </pixiContainer>
        )}
        {gameMode === "training" && (
          <pixiContainer>
            <TrainingMode />
            <BackButton onBack={returnToIntro} />
          </pixiContainer>
        )}
      </Application>
    </div>
  );
}

// TrainingMode component remains the same
function TrainingMode(): JSX.Element {
  return (
    <pixiContainer>
      <pixiText
        text="수련 모드 (Training Mode)"
        x={window.innerWidth / 2}
        y={window.innerHeight / 2}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 32,
          fill: COLORS_APP.WHITE,
          fontWeight: "bold",
        }}
      />
      <pixiText
        text="곧 출시됩니다 (Coming Soon)"
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 + 50}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 18,
          fill: 0x999999, // Example: Using a specific color or from COLORS_APP if defined
        }}
      />
    </pixiContainer>
  );
}

function BackButton({ onBack }: BackButtonProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const audio = useAudio();

  return (
    <pixiContainer
      x={50}
      y={50}
      interactive={true}
      cursor="pointer"
      onPointerDown={() => {
        audio.playSFX("menu_back");
        onBack();
      }}
      onPointerEnter={() => {
        audio.playSFX("menu_hover");
        setIsHovered(true);
      }}
      onPointerLeave={() => setIsHovered(false)}
    >
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.setFillStyle({ color: COLORS_APP.DARK_BLUE, alpha: 0.9 });
          g.roundRect(-40, -20, 80, 40, 5);
          g.fill();

          g.setStrokeStyle({
            color: isHovered ? 0x00ffd0 : COLORS_APP.ACCENT_BLUE, // Example: Using specific color or from COLORS_APP
            width: isHovered ? 2 : 1,
            alpha: isHovered ? 0.9 : 0.7,
          });
          g.roundRect(-40, -20, 80, 40, 5);
          g.stroke();

          g.setStrokeStyle({ color: COLORS_APP.CYAN, width: 1, alpha: 0.4 });
          g.moveTo(-40, -10);
          g.lineTo(-30, -20);
          g.moveTo(40, -10);
          g.lineTo(30, -20);
          g.stroke();
        }}
      />
      <pixiText
        text="← 뒤로"
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 14,
          fill: isHovered ? 0x00ffd0 : COLORS_APP.GRAY_TEXT, // Example: Using specific color or from COLORS_APP
          ...(isHovered && {
            dropShadow: {
              color: 0x00ffd0, // Example: Using specific color
              blur: 4,
              distance: 0,
            },
          }),
        }}
      />
    </pixiContainer>
  );
}

export default App;
