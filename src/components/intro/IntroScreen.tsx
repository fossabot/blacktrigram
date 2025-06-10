import React, { useState } from "react";
import * as PIXI from "pixi.js";
import { usePixiExtensions } from "../../utils/pixiExtensions";
import { MenuSection } from "./components/MenuSection";
import { PhilosophySection } from "./components/PhilosophySection";
import { ControlsSection } from "./components/ControlsSection";
import { KoreanHeader } from "../ui/base/KoreanHeader";
import { KOREAN_COLORS } from "../../types/constants";
import { GameMode } from "../../types/enums";

export interface IntroScreenProps {
  readonly onMenuSelect: (mode: GameMode) => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onMenuSelect }) => {
  usePixiExtensions();

  const [currentSection, setCurrentSection] = useState<string>("menu");

  const drawBackground = React.useCallback((g: PIXI.Graphics) => {
    g.clear();

    // Cyberpunk grid background
    g.lineStyle(1, KOREAN_COLORS.PRIMARY_CYAN, 0.1);
    for (let i = 0; i < 1200; i += 40) {
      g.moveTo(i, 0);
      g.lineTo(i, 800);
    }
    for (let i = 0; i < 800; i += 40) {
      g.moveTo(0, i);
      g.lineTo(1200, i);
    }

    // Background fill
    g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.9);
    g.drawRect(0, 0, 1200, 800);
    g.endFill();
  }, []);

  const renderCurrentSection = () => {
    switch (currentSection) {
      case "philosophy":
        return (
          <PhilosophySection
            onBack={() => setCurrentSection("menu")}
            width={1200}
            height={600}
            y={100}
          />
        );
      case "controls":
        return (
          <ControlsSection
            onBack={() => setCurrentSection("menu")}
            width={1200}
            height={600}
            y={100}
          />
        );
      default:
        return (
          <MenuSection
            selectedMode={GameMode.VERSUS}
            onModeSelect={onMenuSelect}
            onStartGame={() => onMenuSelect(GameMode.VERSUS)}
            onShowPhilosophy={() => setCurrentSection("philosophy")}
            onShowControls={() => setCurrentSection("controls")}
            width={1200}
            height={600}
            y={100}
          />
        );
    }
  };

  return (
    <pixiContainer width={1200} height={800} data-testid="intro-screen">
      {/* Background */}
      <pixiGraphics draw={drawBackground} />

      {/* Main Title */}
      <KoreanHeader
        title={{ korean: "흑괘", english: "Black Trigram" }}
        subtitle={{
          korean: "한국 무술 시뮬레이터",
          english: "Korean Martial Arts Simulator",
        }}
        align="center" // Fix: Use correct prop name
        x={600} // Fix: Use fixed value instead of undefined width
        y={80}
      />

      {/* Current Section */}
      {renderCurrentSection()}

      {/* Footer */}
      <pixiText
        text="흑괘의 길을 걸어라 - Walk the Path of the Black Trigram"
        style={
          new PIXI.TextStyle({
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_TERTIARY,
            align: "center",
            fontStyle: "italic",
          })
        }
        x={600}
        y={770}
        anchor={0.5}
      />
    </pixiContainer>
  );
};

export default IntroScreen;
