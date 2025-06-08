import React, { useCallback, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import { GameMode } from "../../../types/enums";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  FONT_WEIGHTS,
  GAME_CONFIG,
} from "../../../types/constants";

interface MenuSectionProps {
  readonly selectedMode: GameMode;
  readonly onModeSelect: (mode: GameMode) => void;
  readonly onStartGame: () => void;
  readonly onShowPhilosophy: () => void;
  readonly onShowControls: () => void;
  readonly width?: number;
  readonly height?: number;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  selectedMode,
  onModeSelect,
  onStartGame,
  onShowPhilosophy,
  onShowControls,
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
}) => {
  const titleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.title,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight,
        align: "center",
        dropShadow: {
          color: KOREAN_COLORS.ACCENT_CYAN,
          blur: 8,
          angle: Math.PI / 6,
          distance: 3,
        },
      }),
    []
  );

  const subtitleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.SECONDARY,
        fontSize: FONT_SIZES.large,
        fill: KOREAN_COLORS.TEXT_SECONDARY,
        fontWeight: FONT_WEIGHTS.regular.toString() as PIXI.TextStyleFontWeight,
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

  const selectedButtonStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.BLACK_SOLID,
        fontWeight: FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight,
        align: "center",
      }),
    []
  );

  const renderModeButton = useCallback(
    (
      mode: GameMode,
      koreanText: string,
      englishText: string,
      x: number,
      y: number
    ) => {
      const isSelected = selectedMode === mode;
      return (
        <Container
          x={x}
          y={y}
          interactive
          buttonMode
          pointertap={() => onModeSelect(mode)}
        >
          <Graphics
            draw={(g: PIXI.Graphics) => {
              g.clear();
              if (isSelected) {
                g.beginFill(KOREAN_COLORS.PRIMARY_CYAN, 0.8);
                g.lineStyle(2, KOREAN_COLORS.ACCENT_CYAN);
              } else {
                g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.6);
                g.lineStyle(2, KOREAN_COLORS.UI_BORDER);
              }
              g.drawRoundedRect(0, 0, 200, 80, 10);
              g.endFill();
            }}
          />
          <Text
            text={koreanText}
            anchor={0.5}
            x={100}
            y={25}
            style={isSelected ? selectedButtonStyle : buttonStyle}
          />
          <Text
            text={englishText}
            anchor={0.5}
            x={100}
            y={50}
            style={isSelected ? selectedButtonStyle : buttonStyle}
          />
        </Container>
      );
    },
    [selectedMode, onModeSelect, buttonStyle, selectedButtonStyle]
  );

  return (
    <Container width={width} height={height}>
      {/* Background */}
      <Graphics
        draw={(g: PIXI.Graphics) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.9);
          g.drawRect(0, 0, width, height);
          g.endFill();
        }}
      />

      {/* Title */}
      <Text text="흑괘" anchor={0.5} x={width / 2} y={100} style={titleStyle} />
      <Text
        text="Black Trigram"
        anchor={0.5}
        x={width / 2}
        y={160}
        style={subtitleStyle}
      />

      {/* Game Mode Selection */}
      <Container x={(width - 660) / 2} y={250}>
        {renderModeButton(GameMode.VERSUS, "대전 모드", "Versus Mode", 0, 0)}
        {renderModeButton(
          GameMode.TRAINING,
          "훈련 모드",
          "Training Mode",
          220,
          0
        )}
        {renderModeButton(GameMode.STORY, "스토리 모드", "Story Mode", 440, 0)}
      </Container>

      {/* Start Game Button */}
      <Container
        x={width / 2 - 100}
        y={380}
        interactive
        buttonMode
        pointertap={onStartGame}
      >
        <Graphics
          draw={(g: PIXI.Graphics) => {
            g.clear();
            g.beginFill(KOREAN_COLORS.ACCENT_GOLD, 0.9);
            g.lineStyle(3, KOREAN_COLORS.ACCENT_YELLOW);
            g.drawRoundedRect(0, 0, 200, 60, 15);
            g.endFill();
          }}
        />
        <Text
          text="게임 시작"
          anchor={0.5}
          x={100}
          y={20}
          style={
            new PIXI.TextStyle({
              fontFamily: FONT_FAMILY.PRIMARY,
              fontSize: FONT_SIZES.large,
              fill: KOREAN_COLORS.BLACK_SOLID,
              fontWeight:
                FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight,
              align: "center",
            })
          }
        />
        <Text
          text="Start Game"
          anchor={0.5}
          x={100}
          y={40}
          style={
            new PIXI.TextStyle({
              fontFamily: FONT_FAMILY.SECONDARY,
              fontSize: FONT_SIZES.medium,
              fill: KOREAN_COLORS.BLACK_SOLID,
              fontWeight:
                FONT_WEIGHTS.medium.toString() as PIXI.TextStyleFontWeight,
              align: "center",
            })
          }
        />
      </Container>

      {/* Menu Options */}
      <Container x={(width - 400) / 2} y={480}>
        <Container
          x={0}
          y={0}
          interactive
          buttonMode
          pointertap={onShowPhilosophy}
        >
          <Graphics
            draw={(g: PIXI.Graphics) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.7);
              g.lineStyle(1, KOREAN_COLORS.UI_BORDER);
              g.drawRoundedRect(0, 0, 180, 40, 8);
              g.endFill();
            }}
          />
          <Text
            text="철학 (Philosophy)"
            anchor={0.5}
            x={90}
            y={20}
            style={buttonStyle}
          />
        </Container>

        <Container
          x={220}
          y={0}
          interactive
          buttonMode
          pointertap={onShowControls}
        >
          <Graphics
            draw={(g: PIXI.Graphics) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.7);
              g.lineStyle(1, KOREAN_COLORS.UI_BORDER);
              g.drawRoundedRect(0, 0, 180, 40, 8);
              g.endFill();
            }}
          />
          <Text
            text="조작법 (Controls)"
            anchor={0.5}
            x={90}
            y={20}
            style={buttonStyle}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default MenuSection;
