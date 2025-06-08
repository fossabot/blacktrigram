import React, { useState, useCallback } from "react";
import { Container } from "@pixi/react";
import type { IntroScreenProps } from "../../types";
import { GameMode } from "../../types/enums";
import { GAME_CONFIG } from "../../types/constants";
import { MenuSection } from "./sections/MenuSection";
import { PhilosophySection } from "./sections/PhilosophySection";
import { ControlsSection } from "./sections/ControlsSection";

export const IntroScreen: React.FC<IntroScreenProps> = ({
  onGameStart,
  onModeSelect,
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
}) => {
  const [activeSection, setActiveSection] = useState<
    "menu" | "philosophy" | "controls"
  >("menu");
  const [selectedMode, setSelectedMode] = useState<GameMode>(GameMode.VERSUS);

  const handleGameStart = useCallback(() => {
    onGameStart?.(selectedMode);
  }, [onGameStart, selectedMode]);

  const handleModeSelect = useCallback(
    (mode: GameMode) => {
      setSelectedMode(mode);
      onModeSelect?.(mode);
    },
    [onModeSelect]
  );

  const renderCurrentSection = () => {
    switch (activeSection) {
      case "philosophy":
        return (
          <PhilosophySection
            width={width}
            height={height}
            onBack={() => setActiveSection("menu")}
          />
        );
      case "controls":
        return (
          <ControlsSection
            width={width}
            height={height}
            onBack={() => setActiveSection("menu")}
          />
        );
      case "menu":
      default:
        return (
          <MenuSection
            selectedMode={selectedMode}
            onModeSelect={handleModeSelect}
            onStartGame={handleGameStart}
            onShowPhilosophy={() => setActiveSection("philosophy")}
            onShowControls={() => setActiveSection("controls")}
            width={width}
            height={height}
          />
        );
    }
  };

  return (
    <Container width={width} height={height}>
      {renderCurrentSection()}
    </Container>
  );
};

export default IntroScreen;
