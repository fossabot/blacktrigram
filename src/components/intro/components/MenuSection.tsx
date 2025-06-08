import React, { useMemo, useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import { GameMode } from "../../../types/game"; // Fix: Import from correct location
import { MenuSectionProps } from "../../../types";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  FONT_WEIGHTS,
  GAME_CONFIG,
} from "../../../types/constants";
import { BaseButton } from "../../ui/base/BaseButton";

export const MenuSection: React.FC<MenuSectionProps> = ({
  onModeSelect,
  onStartGame,
  onShowPhilosophy,
  onShowControls,
  selectedMode,
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
}) => {
  const titleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.title,
        fill: KOREAN_COLORS.ACCENT_GOLD,
        fontWeight: FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight,
        align: "center",
        stroke: KOREAN_COLORS.BLACK_SOLID,
      }),
    []
  );

  const subtitleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.large,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: FONT_WEIGHTS.medium.toString() as PIXI.TextStyleFontWeight,
        align: "center",
      }),
    []
  );

  const handleModeSelect = useCallback(
    (mode: GameMode) => {
      onModeSelect?.(mode);
    },
    [onModeSelect]
  );

  const handleStartClick = useCallback(() => {
    onStartGame?.();
  }, [onStartGame]);

  const handlePhilosophyClick = useCallback(() => {
    onShowPhilosophy?.();
  }, [onShowPhilosophy]);

  const handleControlsClick = useCallback(() => {
    onShowControls?.();
  }, [onShowControls]);

  const backgroundDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.9);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Cyberpunk grid effect
      g.lineStyle(1, KOREAN_COLORS.PRIMARY_CYAN, 0.2);
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

  return (
    <Container width={width} height={height}>
      <Graphics draw={backgroundDraw} />

      {/* Main Title */}
      <Text
        text="흑괘 (Black Trigram)"
        style={titleStyle}
        x={width / 2}
        y={100}
        anchor={0.5}
      />

      <Text
        text="Korean Martial Arts Combat Simulator"
        style={subtitleStyle}
        x={width / 2}
        y={160}
        anchor={0.5}
      />

      {/* Game Mode Selection */}
      <Container x={width / 2} y={240}>
        <Text
          text="게임 모드 선택 (Select Game Mode)"
          style={{
            ...subtitleStyle,
            fontSize: FONT_SIZES.medium,
          }}
          anchor={0.5}
          y={0}
        />

        {/* Mode Buttons */}
        <Container y={40}>
          {Object.values(GameMode).map((mode, index) => {
            // Fix: Proper type handling for key and text
            const modeKey = `mode-${mode}-${index}`;
            const modeText =
              mode === GameMode.VERSUS
                ? "대련 (Versus)"
                : mode === GameMode.TRAINING
                ? "수련 (Training)"
                : mode === GameMode.STORY
                ? "이야기 (Story)"
                : String(mode);

            return (
              <BaseButton
                key={modeKey} // Fix: Use string key
                text={modeText} // Fix: Ensure string type
                onClick={() => handleModeSelect(mode)}
                x={-300 + index * 200}
                y={0}
                width={180}
                height={50}
                variant={selectedMode === mode ? "accent" : "secondary"}
              />
            );
          })}
        </Container>
      </Container>

      {/* Menu Buttons */}
      <Container x={width / 2} y={height - 200}>
        <BaseButton
          text="게임 시작 (Start Game)"
          onClick={handleStartClick}
          x={-100}
          y={0}
          width={200}
          height={60}
          variant="primary"
        />

        <BaseButton
          text="철학 (Philosophy)"
          onClick={handlePhilosophyClick}
          x={-100}
          y={80}
          width={200}
          height={50}
          variant="secondary"
        />

        <BaseButton
          text="조작법 (Controls)"
          onClick={handleControlsClick}
          x={-100}
          y={140}
          width={200}
          height={50}
          variant="secondary"
        />
      </Container>
    </Container>
  );
};

export default MenuSection;
