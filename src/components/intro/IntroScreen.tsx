import { useState, useCallback } from "react";
import type { JSX } from "react";
import { KoreanHeader } from "../ui/KoreanHeader";
import { BackgroundGrid } from "../ui/base/BackgroundGrid";
import { ControlsSection } from "./components/ControlsSection";
import { PhilosophySection } from "./components/PhilosophySection";

interface IntroScreenProps {
  readonly onStartGame: () => void;
  readonly onStartTraining: () => void;
}

// Korean color constants with all required colors
const KOREAN_COLORS = {
  RED: 0x8b0000,
  GOLD: 0xffd700,
  BLACK: 0x000000,
  WHITE: 0xffffff,
  CYAN: 0x00ffd0,
  BLUE: 0x4a90e2,
  GRAY_DARK: 0x2c2c2c,
  GRAY_LIGHT: 0xbdbdbd,
  GREEN: 0x27a844,
  ORANGE: 0xe67e22,
  PURPLE: 0x9b59b6,
  ACCENT_BLUE: 0x004455,
  DARK_BLUE: 0x000a12,
  GRAY_MEDIUM: 0x6c757d,
} as const;

type MenuOption = "game" | "training" | null;

export function IntroScreen({
  onStartGame,
  onStartTraining,
}: IntroScreenProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<MenuOption>(null);

  const handleStartGame = useCallback(() => {
    onStartGame();
  }, [onStartGame]);

  const handleStartTraining = useCallback(() => {
    onStartTraining();
  }, [onStartTraining]);

  return (
    <pixiContainer x={0} y={0}>
      {/* Background gradient */}
      <pixiGraphics
        draw={(g: any) => {
          g.clear();
          g.setFillStyle({ color: KOREAN_COLORS.BLACK });
          g.rect(0, 0, window.innerWidth, window.innerHeight);
          g.fill();

          // Traditional Korean pattern overlay
          g.setFillStyle({ color: KOREAN_COLORS.RED, alpha: 0.1 });
          for (let i = 0; i < 8; i++) {
            const x = (window.innerWidth / 8) * i;
            g.rect(x, 0, 2, window.innerHeight);
            g.fill();
          }
        }}
      />

      {/* Header with Korean dojang name */}
      <KoreanHeader />

      {/* Menu options */}
      <pixiContainer x={window.innerWidth / 2} y={window.innerHeight / 2}>
        <pixiGraphics
          draw={(g: any) => {
            g.clear();
            g.setFillStyle({ color: KOREAN_COLORS.DARK_BLUE, alpha: 0.8 });
            g.roundRect(-200, -80, 400, 160, 10);
            g.fill();

            g.setStrokeStyle({
              color: KOREAN_COLORS.GOLD,
              width: 2,
              alpha: 0.6,
            });
            g.roundRect(-200, -80, 400, 160, 10);
            g.stroke();
          }}
        />

        {/* Game mode button */}
        <pixiContainer
          y={-30}
          interactive={true}
          cursor="pointer"
          onPointerDown={handleStartGame}
          onPointerEnter={() => {
            setSelectedOption("game");
          }}
          onPointerLeave={() => setSelectedOption(null)}
        >
          <pixiGraphics
            draw={(g: any) => {
              g.clear();
              const isSelected = selectedOption === "game";
              g.setFillStyle({
                color: isSelected
                  ? KOREAN_COLORS.RED
                  : KOREAN_COLORS.ACCENT_BLUE,
                alpha: 0.8,
              });
              g.roundRect(-150, -20, 300, 40, 5);
              g.fill();
            }}
          />
          <pixiText
            text="1. 대련 모드 (Combat Mode)"
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 18,
              fill: KOREAN_COLORS.WHITE,
              fontWeight: "bold",
            }}
          />
        </pixiContainer>

        {/* Training mode button */}
        <pixiContainer
          y={30}
          interactive={true}
          cursor="pointer"
          onPointerDown={handleStartTraining}
          onPointerEnter={() => {
            setSelectedOption("training");
          }}
          onPointerLeave={() => setSelectedOption(null)}
        >
          <pixiGraphics
            draw={(g: any) => {
              g.clear();
              const isSelected = selectedOption === "training";
              g.setFillStyle({
                color: isSelected
                  ? KOREAN_COLORS.RED
                  : KOREAN_COLORS.ACCENT_BLUE,
                alpha: 0.8,
              });
              g.roundRect(-150, -20, 300, 40, 5);
              g.fill();
            }}
          />
          <pixiText
            text="2. 수련 모드 (Training Mode)"
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 18,
              fill: KOREAN_COLORS.WHITE,
              fontWeight: "bold",
            }}
          />
        </pixiContainer>
      </pixiContainer>

      {/* Philosophy and controls sections */}
      <PhilosophySection
        x={window.innerWidth / 2}
        y={window.innerHeight - 200}
      />
      <ControlsSection x={window.innerWidth / 2} y={window.innerHeight - 80} />
    </pixiContainer>
  );
}
