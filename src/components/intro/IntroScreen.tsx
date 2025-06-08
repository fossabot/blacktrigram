import React, { useState, useCallback } from "react";
import { Container, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { IntroScreenProps } from "../../types/components";
import { GameMode } from "../../types/enums"; // Fix: Use enums instead of game
import { KOREAN_COLORS, GAME_CONFIG } from "../../types/constants";
import { MenuSection } from "./components/MenuSection";
import { PhilosophySection } from "./components/PhilosophySection";
import { ControlsSection } from "./components/ControlsSection";
import "./IntroScreen.css";

export const IntroScreen: React.FC<IntroScreenProps> = ({
  onMenuSelect,
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
  x = 0,
  y = 0,
}) => {
  const [selectedMode, setSelectedMode] = useState<GameMode>(GameMode.VERSUS);
  const [showPhilosophy, setShowPhilosophy] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const backgroundDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.95);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Cyberpunk grid background
      g.lineStyle(1, KOREAN_COLORS.PRIMARY_CYAN, 0.1);
      const gridSize = 50;
      for (let i = 0; i <= width; i += gridSize) {
        g.moveTo(i, 0);
        g.lineTo(i, height);
      }
      for (let j = 0; j <= height; j += gridSize) {
        g.moveTo(0, j);
        g.lineTo(width, j);
      }
    },
    [width, height]
  );

  const handleModeSelect = useCallback((mode: GameMode) => {
    setSelectedMode(mode);
  }, []);

  const handleStartGame = useCallback(() => {
    onMenuSelect(selectedMode);
  }, [onMenuSelect, selectedMode]);

  const handleShowPhilosophy = useCallback(() => {
    setShowPhilosophy(true);
  }, []);

  const handleShowControls = useCallback(() => {
    setShowControls(true);
  }, []);

  const handleBack = useCallback(() => {
    setShowPhilosophy(false);
    setShowControls(false);
  }, []);

  return (
    <Container x={x} y={y}>
      <Graphics draw={backgroundDraw} />

      {!showPhilosophy && !showControls && (
        <MenuSection
          selectedMode={selectedMode}
          onModeSelect={handleModeSelect}
          onStartGame={handleStartGame}
          onShowPhilosophy={handleShowPhilosophy}
          onShowControls={handleShowControls}
          width={width}
          height={height}
        />
      )}

      {showPhilosophy && (
        <PhilosophySection onBack={handleBack} width={width} height={height} />
      )}

      {showControls && (
        <ControlsSection onBack={handleBack} width={width} height={height} />
      )}
    </Container>
  );
};

export default IntroScreen;
