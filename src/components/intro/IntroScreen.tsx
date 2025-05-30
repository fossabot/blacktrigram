import React, { useState, useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import type { GamePhase } from "../../types";
import { KOREAN_COLORS, KOREAN_FONT_FAMILY } from "../../types";
import { MenuSection } from "./components/MenuSection";
import { ControlsSection } from "./components/ControlsSection";
import { PhilosophySection } from "./components/PhilosophySection";

export interface IntroScreenProps {
  readonly onGameStart: (phase: GamePhase) => void;
  readonly onExit?: () => void;
}

type IntroSection = "menu" | "controls" | "philosophy";

export function IntroScreen({
  onGameStart,
  onExit,
}: IntroScreenProps): React.ReactElement {
  const [currentSection, setCurrentSection] = useState<IntroSection>("menu");
  const [selectedOption, setSelectedOption] = useState<GamePhase>("training");

  const handleOptionSelect = useCallback((option: GamePhase) => {
    setSelectedOption(option);
  }, []);

  const handleGameStart = useCallback(() => {
    onGameStart(selectedOption);
  }, [selectedOption, onGameStart]);

  // Korean cyberpunk background
  const drawBackground = useCallback((g: PixiGraphics) => {
    g.clear();

    // Dark cyberpunk base
    g.setFillStyle({ color: 0x000a12, alpha: 1.0 });
    g.rect(0, 0, 1200, 800);
    g.fill();

    // Korean traditional pattern overlay
    const gridSize = 40;
    g.setStrokeStyle({ color: 0x004455, width: 1, alpha: 0.3 });

    for (let x = 0; x < 1200; x += gridSize) {
      g.moveTo(x, 0);
      g.lineTo(x, 800);
      g.stroke();
    }

    for (let y = 0; y < 800; y += gridSize) {
      g.moveTo(0, y);
      g.lineTo(1200, y);
      g.stroke();
    }

    // Central focus area with trigram styling
    g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 3, alpha: 0.8 });
    g.circle(600, 400, 200);
    g.stroke();

    // Inner energy ring
    g.setStrokeStyle({ color: KOREAN_COLORS.CYAN, width: 2, alpha: 0.6 });
    g.circle(600, 400, 150);
    g.stroke();
  }, []);

  const handleNext = useCallback(() => {
    switch (currentSection) {
      case "menu":
        setCurrentSection("controls");
        break;
      case "controls":
        setCurrentSection("philosophy");
        break;
      case "philosophy":
        handleGameStart();
        break;
    }
  }, [currentSection, handleGameStart]);

  const handlePrev = useCallback(() => {
    switch (currentSection) {
      case "controls":
        setCurrentSection("menu");
        break;
      case "philosophy":
        setCurrentSection("controls");
        break;
      case "menu":
        if (onExit) {
          onExit();
        }
        break;
    }
  }, [currentSection, onExit]);

  const renderCurrentSection = useCallback(() => {
    switch (currentSection) {
      case "menu":
        return (
          <MenuSection
            selectedOption={selectedOption}
            onOptionSelect={handleOptionSelect}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case "controls":
        return <ControlsSection onNext={handleNext} onPrev={handlePrev} />;
      case "philosophy":
        return <PhilosophySection onNext={handleNext} onPrev={handlePrev} />;
      default:
        return null;
    }
  }, [
    currentSection,
    selectedOption,
    handleOptionSelect,
    handleNext,
    handlePrev,
  ]);

  return (
    <Container data-testid="intro-screen">
      {/* Background */}
      <Graphics draw={drawBackground} />

      {/* Main title */}
      <Text
        text="흑괘 무술 도장"
        anchor={{ x: 0.5, y: 0.5 }}
        x={600}
        y={150}
        style={
          {
            fontFamily: KOREAN_FONT_FAMILY,
            fontSize: 48,
            fill: KOREAN_COLORS.GOLD,
            fontWeight: "bold",
            stroke: KOREAN_COLORS.BLACK,
            strokeThickness: 3,
          } as any
        }
      />

      {/* Subtitle */}
      <Text
        text="Black Trigram Martial Arts Academy"
        anchor={{ x: 0.5, y: 0.5 }}
        x={600}
        y={200}
        style={
          {
            fontFamily: "Arial, sans-serif",
            fontSize: 24,
            fill: KOREAN_COLORS.CYAN,
            fontStyle: "italic",
          } as any
        }
      />

      {/* Section indicator */}
      <Text
        text={getSectionTitle(currentSection)}
        anchor={{ x: 0.5, y: 0.5 }}
        x={600}
        y={280}
        style={
          {
            fontFamily: KOREAN_FONT_FAMILY,
            fontSize: 20,
            fill: KOREAN_COLORS.WHITE,
            fontWeight: "bold",
          } as any
        }
      />

      {/* Current section content */}
      <Container x={0} y={320}>
        {renderCurrentSection()}
      </Container>

      {/* Navigation hints */}
      <Text
        text="← 이전 (Previous) | 다음 (Next) →"
        anchor={{ x: 0.5, y: 0.5 }}
        x={600}
        y={750}
        style={
          {
            fontFamily: KOREAN_FONT_FAMILY,
            fontSize: 16,
            fill: KOREAN_COLORS.GRAY_LIGHT,
          } as any
        }
      />

      {/* Footer text */}
      <Text
        text="정확한 타격과 전통 무술의 만남 - Precision Combat Meets Traditional Martial Arts"
        anchor={{ x: 0.5, y: 0.5 }}
        x={600}
        y={780}
        style={
          {
            fontFamily: KOREAN_FONT_FAMILY,
            fontSize: 14,
            fill: KOREAN_COLORS.GRAY_MEDIUM,
            fontStyle: "italic",
          } as any
        }
      />
    </Container>
  );
}

// Helper function to get section titles in Korean
function getSectionTitle(section: IntroSection): string {
  switch (section) {
    case "menu":
      return "메인 메뉴 (Main Menu)";
    case "controls":
      return "조작법 (Controls)";
    case "philosophy":
      return "무술 철학 (Martial Philosophy)";
    default:
      return "";
  }
}
