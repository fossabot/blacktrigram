import React, { useCallback, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import { GameMode } from "../../../types/game"; // Fix: Import from correct location
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
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
  onModeSelect,
  onStartGame,
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

  const handleStartClick = useCallback(() => {
    onStartGame();
  }, [onStartGame]);

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

      {/* Game Mode Selection */}
      <Container x={(width - 640) / 2} y={140}>
        <Container
          interactive={true}
          pointerdown={() => onModeSelect(GameMode.VERSUS)}
        >
          <Graphics
            draw={(g: PIXI.Graphics) => {
              g.clear()
                .lineStyle(2, KOREAN_COLORS.PRIMARY_CYAN)
                .beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8)
                .drawRoundedRect(0, 0, 200, 60, 10)
                .endFill();
            }}
          />
          <Text
            text="대전 (Versus)"
            style={buttonStyle}
            x={100}
            y={30}
            anchor={0.5}
          />
        </Container>

        <Container
          x={220}
          interactive={true}
          pointerdown={() => onModeSelect(GameMode.TRAINING)}
        >
          <Graphics
            draw={(g: PIXI.Graphics) => {
              g.clear()
                .lineStyle(2, KOREAN_COLORS.ACCENT_GOLD)
                .beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8)
                .drawRoundedRect(0, 0, 200, 60, 10)
                .endFill();
            }}
          />
          <Text
            text="훈련 (Training)"
            style={buttonStyle}
            x={100}
            y={30}
            anchor={0.5}
          />
        </Container>
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
