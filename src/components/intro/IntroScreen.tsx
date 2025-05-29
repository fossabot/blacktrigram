import { useState, useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import { KOREAN_COLORS } from "../../types";

interface IntroScreenProps {
  readonly onStartGame: () => void;
  readonly onStartTraining: () => void;
}

export function IntroScreen({
  onStartGame,
  onStartTraining,
}: IntroScreenProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<number>(0);

  const drawBackground = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      // Traditional Korean dojang background
      g.setFillStyle({ color: KOREAN_COLORS.BLACK });
      g.rect(0, 0, window.innerWidth, window.innerHeight);
      g.fill();

      // Add traditional Korean design elements
      g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 3, alpha: 0.7 });
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Draw trigram circle
      g.circle(centerX, centerY - 100, 80);
      g.stroke();
    },
    [setSelectedOption]
  );

  return (
    <Container>
      <Graphics draw={drawBackground} />

      <Text
        text="흑괘 무술 도장"
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 - 200}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 48,
          fill: KOREAN_COLORS.GOLD,
          fontWeight: "bold",
        }}
      />

      <Text
        text="Black Trigram Martial Arts"
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 - 150}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 24,
          fill: KOREAN_COLORS.WHITE,
        }}
      />

      <Container
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 + 50}
        interactive={true}
        onPointerDown={onStartGame}
      >
        <Graphics
          draw={(g: PixiGraphics) => {
            g.clear();
            g.setFillStyle({
              color: KOREAN_COLORS.TRADITIONAL_RED,
              alpha: 0.8,
            });
            g.roundRect(-100, -25, 200, 50, 10);
            g.fill();
            g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 2 });
            g.roundRect(-100, -25, 200, 50, 10);
            g.stroke();
          }}
        />
        <Text
          text="대전 시작 (Start Combat)"
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 18,
            fill: KOREAN_COLORS.WHITE,
            fontWeight: "bold",
          }}
        />
      </Container>

      <Container
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 + 120}
        interactive={true}
        onPointerDown={onStartTraining}
      >
        <Graphics
          draw={(g: PixiGraphics) => {
            g.clear();
            g.setFillStyle({ color: KOREAN_COLORS.DOJANG_BLUE, alpha: 0.8 });
            g.roundRect(-100, -25, 200, 50, 10);
            g.fill();
            g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 2 });
            g.roundRect(-100, -25, 200, 50, 10);
            g.stroke();
          }}
        />
        <Text
          text="수련 (Training)"
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 18,
            fill: KOREAN_COLORS.WHITE,
            fontWeight: "bold",
          }}
        />
      </Container>
    </Container>
  );
}
