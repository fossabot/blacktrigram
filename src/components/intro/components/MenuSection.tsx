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
  selectedMode = "versus",
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT * 0.4,
  x = 0,
  y = 0,
  ...props
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
    onStartGame?.(selectedMode as GameMode); // Fix: type assertion
  }, [onStartGame, selectedMode]);

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

  const renderModeButton = useCallback(
    (
      mode: GameMode,
      korean: string,
      english: string,
      buttonX: number,
      buttonY: number
    ) => {
      const isSelected = selectedMode === mode;

      return (
        <Container
          key={mode}
          x={buttonX}
          y={buttonY}
          interactive={true}
          buttonMode={true}
          pointertap={() => handleModeClick(mode)}
        >
          <Graphics
            draw={(g: PIXI.Graphics) => {
              g.clear();
              const fillColor = isSelected
                ? KOREAN_COLORS.ACCENT_PRIMARY
                : KOREAN_COLORS.UI_BACKGROUND_MEDIUM;
              const borderColor = isSelected
                ? KOREAN_COLORS.ACCENT_GOLD
                : KOREAN_COLORS.UI_BORDER;

              g.beginFill(fillColor, 0.8);
              g.lineStyle(2, borderColor, 0.8);
              g.drawRoundedRect(0, 0, 200, 60, 10);
              g.endFill();
            }}
          />

          <Text
            text={korean}
            style={{
              ...buttonStyle,
              fill: isSelected
                ? KOREAN_COLORS.BLACK_SOLID
                : KOREAN_COLORS.TEXT_PRIMARY,
            }}
            x={100}
            y={20}
            anchor={0.5}
          />

          <Text
            text={english}
            style={{
              ...buttonStyle,
              fontSize: FONT_SIZES.small,
              fill: isSelected
                ? KOREAN_COLORS.BLACK_SOLID
                : KOREAN_COLORS.TEXT_SECONDARY,
            }}
            x={100}
            y={40}
            anchor={0.5}
          />
        </Container>
      );
    },
    [selectedMode, buttonStyle, handleModeClick]
  );

  return (
    <Container x={x} y={y} width={width} height={height} {...props}>
      <Graphics draw={backgroundDraw} />

      {/* Title */}
      <Text
        text="흑괘 (Black Trigram)"
        style={titleStyle}
        x={width / 2}
        y={60}
        anchor={0.5}
      />

      {/* Game Mode Selection */}
      <Container x={(width - 640) / 2} y={140}>
        {renderModeButton(GameMode.VERSUS, "대전 모드", "Versus Mode", 0, 0)} //
        Fix: use enum
        {renderModeButton(
          GameMode.TRAINING,
          "훈련 모드",
          "Training Mode",
          220,
          0
        )}{" "}
        // Fix: use enum
        {renderModeButton(
          GameMode.STORY,
          "스토리 모드",
          "Story Mode",
          440,
          0
        )}{" "}
        // Fix: use enum
      </Container>

      {/* Start Button */}
      <Container
        x={width / 2 - 100}
        y={height - 100}
        interactive={true}
        buttonMode={true}
        pointertap={handleStartClick}
      >
        <Graphics
          draw={(g: PIXI.Graphics) => {
            g.clear();
            g.beginFill(KOREAN_COLORS.POSITIVE_GREEN, 0.8);
            g.lineStyle(3, KOREAN_COLORS.ACCENT_GOLD, 0.9);
            g.drawRoundedRect(0, 0, 200, 60, 15);
            g.endFill();
          }}
        />

        <Text
          text="시작 (Start)"
          style={{
            ...titleStyle,
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
