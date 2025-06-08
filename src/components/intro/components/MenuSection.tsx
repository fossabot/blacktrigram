import React, { useMemo, useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import { GameMode } from "../../../types/enums";
import { MenuSectionProps } from "../../../types";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  FONT_WEIGHTS,
  GAME_CONFIG,
} from "../../../types/constants";

export const MenuSection: React.FC<MenuSectionProps> = ({
  onModeSelect,
  onStartGame,
  selectedMode,
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
}) => {
  const titleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.xlarge,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight,
        align: "center",
      }),
    []
  );

  const buttonStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: FONT_WEIGHTS.medium.toString() as PIXI.TextStyleFontWeight,
        align: "center",
      }),
    []
  );

  const handleModeClick = useCallback(
    (mode: GameMode) => {
      onModeSelect?.(mode);
    },
    [onModeSelect]
  );

  const handleStartClick = useCallback(() => {
    onStartGame?.(); // Fix: remove parameter
  }, [onStartGame]);

  const backgroundDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.9);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Title background
      g.beginFill(KOREAN_COLORS.ACCENT_PRIMARY, 0.1);
      g.drawRoundedRect(50, 20, width - 100, 80, 10);
      g.endFill();
    },
    [width, height]
  );

  return (
    <Container width={width} height={height}>
      <Graphics draw={backgroundDraw} />

      {/* Title */}
      <Text
        text="흑괘 (Black Trigram)"
        style={titleStyle}
        x={width / 2}
        y={60}
        anchor={0.5}
      />

      {/* Game Mode Selection - Implement actual mode buttons */}
      <Container x={(width - 640) / 2} y={140}>
        <Text
          text="게임 모드 선택 (Select Game Mode)"
          style={buttonStyle}
          x={320}
          y={0}
          anchor={0.5}
        />

        {/* Add actual mode selection buttons here if needed */}
      </Container>

      {/* Start Button */}
      <Container
        x={width / 2 - 100}
        y={height - 100}
        interactive={true}
        pointerdown={handleStartClick}
      >
        <Graphics
          draw={(g: PIXI.Graphics) => {
            g.clear()
              .lineStyle(2, KOREAN_COLORS.ACCENT_GOLD)
              .beginFill(KOREAN_COLORS.ACCENT_PRIMARY, 0.8)
              .drawRoundedRect(0, 0, 200, 60, 10)
              .endFill();
          }}
        />

        <Text
          text="시작 (Start)"
          style={{
            ...buttonStyle,
            fontSize: FONT_SIZES.large,
            fill: KOREAN_COLORS.BLACK_SOLID,
          }}
          x={100}
          y={30}
          anchor={0.5}
        />
      </Container>
    </Container>
  );
};

export default MenuSection;
