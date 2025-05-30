import React, { useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import { KOREAN_COLORS } from "../../types";

export interface DojangBackgroundProps {
  readonly width: number;
  readonly height: number;
}

export function DojangBackground({
  width,
  height,
}: DojangBackgroundProps): React.JSX.Element {
  const drawBackground = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      g.setFillStyle({ color: KOREAN_COLORS.DOJANG_BLUE });
      g.rect(0, 0, width, height);
      g.fill();
    },
    [width, height]
  );

  const drawFloor = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      const floorHeight = height * 0.15;
      g.setFillStyle({ color: KOREAN_COLORS.GRAY_DARK });
      g.rect(0, height - floorHeight, width, floorHeight);
      g.fill();

      g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 2 });
      g.moveTo(0, height - floorHeight);
      g.lineTo(width, height - floorHeight);
      g.stroke();
    },
    [width, height]
  );

  const drawDecorations = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      g.setFillStyle({ color: KOREAN_COLORS.TRADITIONAL_RED });
      g.rect(width * 0.05, height * 0.1, width * 0.9, height * 0.05);
      g.fill();

      g.setFillStyle({ color: KOREAN_COLORS.GOLD });
      g.rect(width * 0.07, height * 0.11, width * 0.86, height * 0.03);
      g.fill();
    },
    [width, height]
  );

  const drawGrid = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      g.setStrokeStyle({
        color: KOREAN_COLORS.ACCENT_BLUE,
        width: 1,
        alpha: 0.3,
      });

      const gridSize = 50;
      for (let x = 0; x <= width; x += gridSize) {
        g.moveTo(x, 0);
        g.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        g.moveTo(0, y);
        g.lineTo(width, y);
      }
      g.stroke();
    },
    [width, height]
  );

  return (
    <Container>
      <Graphics draw={drawBackground} />
      <Graphics draw={drawFloor} />
      <Graphics draw={drawDecorations} />
      <Graphics draw={drawGrid} />

      <Text
        text="무술 도장"
        x={10}
        y={20}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 16,
          fill: KOREAN_COLORS.BLACK,
        }}
        alpha={0.7}
      />
    </Container>
  );
}
