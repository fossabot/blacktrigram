import React, { useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import { KOREAN_COLORS } from "../../types";
import type {
  TextStyle as PixiTextStyle,
  Graphics as PixiGraphics,
} from "pixi.js";

interface IntroScreenProps {
  readonly onStartGame: () => void;
  readonly onStartTraining: () => void;
}

export function IntroScreen({
  onStartGame,
  onStartTraining,
}: IntroScreenProps): React.JSX.Element {
  const titleStyle: Partial<PixiTextStyle> = {
    fontFamily: "Noto Sans KR",
    fontSize: 48,
    fontWeight: "bold",
    fill: KOREAN_COLORS.GOLD,
    stroke: KOREAN_COLORS.BLACK,
    strokeThickness: 4, // This is correct for PIXI.TextStyle
    align: "center",
  };

  const buttonTextStyle: Partial<PixiTextStyle> = {
    fontFamily: "Noto Sans KR",
    fontSize: 24,
    fill: KOREAN_COLORS.WHITE,
    align: "center",
  };

  const drawButton = useCallback(
    (g: PixiGraphics, width: number, height: number, hover: boolean) => {
      g.clear();
      g.beginFill(
        hover ? KOREAN_COLORS.TRADITIONAL_RED : KOREAN_COLORS.DOJANG_BLUE,
        0.8
      );
      g.lineStyle(2, KOREAN_COLORS.GOLD, 1);
      g.drawRoundedRect(0, 0, width, height, 15);
      g.endFill();
    },
    []
  );

  return (
    <Container>
      <Text text="흑괘 무술" x={400} y={150} anchor={0.5} style={titleStyle} />
      <Text
        text="Black Trigram Martial Arts"
        x={400}
        y={220}
        anchor={0.5}
        style={{
          ...buttonTextStyle,
          fontSize: 18,
          fill: KOREAN_COLORS.LIGHT_GREY,
        }}
      />

      {/* Start Game Button */}
      <Container
        x={300}
        y={300}
        interactive={true}
        buttonMode={true}
        pointertap={onStartGame}
      >
        <Graphics draw={(g: PixiGraphics) => drawButton(g, 200, 60, false)} />{" "}
        {/* Pass hover state if managed */}
        <Text
          text="게임 시작"
          x={100}
          y={30}
          anchor={0.5}
          style={buttonTextStyle}
        />
      </Container>

      {/* Training Mode Button */}
      <Container
        x={300}
        y={400}
        interactive={true}
        buttonMode={true}
        pointertap={onStartTraining}
      >
        <Graphics draw={(g: PixiGraphics) => drawButton(g, 200, 60, false)} />{" "}
        {/* Pass hover state if managed */}
        <Text
          text="수련 모드"
          x={100}
          y={30}
          anchor={0.5}
          style={buttonTextStyle}
        />
      </Container>
    </Container>
  );
}
