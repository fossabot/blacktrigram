import React, { useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { EndScreenProps } from "../../types";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  FONT_WEIGHTS,
  GAME_CONFIG,
} from "../../types/constants";
import * as PIXI from "pixi.js";

export const EndScreen: React.FC<EndScreenProps> = ({
  winnerId,
  onRestart,
  onReturnToMenu,
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
  ...props
}) => {
  const resultText = useMemo(() => {
    if (winnerId) {
      return {
        korean: "승리!",
        english: "Victory!",
      };
    } else {
      return {
        korean: "무승부",
        english: "Draw",
      };
    }
  }, [winnerId]);

  const titleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.xlarge,
        fill: winnerId
          ? KOREAN_COLORS.POSITIVE_GREEN
          : KOREAN_COLORS.SECONDARY_YELLOW_LIGHT,
        fontWeight: FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight,
        align: "center",
        dropShadow: {
          color: KOREAN_COLORS.BLACK_SOLID,
          blur: 5,
          distance: 3,
        },
      }),
    [winnerId]
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

  const drawBackground = (g: PIXI.Graphics) => {
    g.clear();
    g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DEEP_DARK, 0.9);
    g.drawRect(0, 0, width, height);
    g.endFill();
  };

  const drawButton = (g: PIXI.Graphics, isHover: boolean = false) => {
    g.clear();
    g.beginFill(
      isHover
        ? KOREAN_COLORS.ACCENT_PRIMARY
        : KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
      isHover ? 0.3 : 0.8
    );
    g.lineStyle(2, KOREAN_COLORS.UI_BORDER);
    g.drawRoundedRect(0, 0, 200, 50, 10);
    g.endFill();
  };

  return (
    <Container {...props} x={0} y={0} width={width} height={height}>
      <Graphics draw={drawBackground} />

      <Text
        text={resultText.korean}
        anchor={0.5}
        x={width / 2}
        y={height / 2 - 100}
        style={titleStyle}
      />
      <Text
        text={resultText.english}
        anchor={0.5}
        x={width / 2}
        y={height / 2 - 50}
        style={{
          ...titleStyle,
          fontSize: FONT_SIZES.large,
          fill: KOREAN_COLORS.TEXT_SECONDARY,
        }}
      />

      {/* Restart Button */}
      <Container
        x={width / 2 - 100}
        y={height / 2 + 50}
        interactive={true}
        buttonMode={true}
        pointertap={onRestart}
      >
        <Graphics draw={(g: PIXI.Graphics) => drawButton(g, false)} />
        <Text
          text="다시 시작 (Restart)"
          anchor={0.5}
          x={100}
          y={25}
          style={buttonStyle}
        />
      </Container>

      {/* Return to Menu Button */}
      <Container
        x={width / 2 - 100}
        y={height / 2 + 120}
        interactive={true}
        buttonMode={true}
        pointertap={onReturnToMenu}
      >
        <Graphics draw={(g: PIXI.Graphics) => drawButton(g, false)} />
        <Text
          text="메뉴로 (Menu)"
          anchor={0.5}
          x={100}
          y={25}
          style={buttonStyle}
        />
      </Container>
    </Container>
  );
};

export default EndScreen;
