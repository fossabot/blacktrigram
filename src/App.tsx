import { Application, extend } from "@pixi/react";
import { Container, Graphics, Text, Sprite } from "pixi.js";
import { useState, useCallback } from "react";
import type { JSX } from "react";
import "./App.css";
import { GameEngine } from "./components/game/GameEngine";
import { useAudio } from "./audio/AudioManager";
import { IntroScreen } from "./components/intro/IntroScreen";
import { TrainingScreen } from "./components/training/TrainingScreen";

// Extend @pixi/react with the Pixi components we want to use
extend({
  Container,
  Graphics,
  Text,
  Sprite,
});

// Declare the extended components for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      pixiContainer: any;
      pixiGraphics: any;
      pixiText: any;
      pixiSprite: any;
    }
  }
}

// Type definitions
type GameMode = "intro" | "game" | "training";

interface BackButtonProps {
  readonly onBack: () => void;
}

// Constants
const COLORS_APP = {
  BLACK: 0x000000,
  WHITE: 0xffffff,
  DARK_BLUE: 0x000a12,
  ACCENT_BLUE: 0x004455,
  GRAY_TEXT: 0xcccccc,
  CYAN: 0x00ffd0,
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
            <TrainingScreen onExit={returnToIntro} />
            <BackButton onBack={returnToIntro} />
          </pixiContainer>
        )}
      </Application>
    </div>
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
        draw={(g: any) => {
          g.clear();
          g.setFillStyle({ color: COLORS_APP.DARK_BLUE, alpha: 0.9 });
          g.roundRect(-40, -20, 80, 40, 5);
          g.fill();

          g.setStrokeStyle({
            color: isHovered ? COLORS_APP.CYAN : COLORS_APP.ACCENT_BLUE,
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
          fill: isHovered ? COLORS_APP.CYAN : COLORS_APP.GRAY_TEXT,
          ...(isHovered && {
            dropShadow: {
              color: COLORS_APP.CYAN,
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
