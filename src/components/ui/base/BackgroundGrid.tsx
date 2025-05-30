import { useCallback } from "react";
import type { JSX } from "react";
import { KOREAN_COLORS } from "../../../types";
import { Graphics } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";

export interface BackgroundGridProps {
  readonly width?: number;
  readonly height?: number;
  readonly gridSize?: number;
  readonly time?: number;
}

export function BackgroundGrid({
  width = window.innerWidth,
  height = window.innerHeight,
  gridSize = 60,
  time = 0,
}: BackgroundGridProps): JSX.Element {
  const drawGrid = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Background fill
      g.setFillStyle({ color: KOREAN_COLORS.BLACK });
      g.rect(0, 0, width, height);
      g.fill();

      // Animated grid lines
      const alpha = 0.2 + Math.sin(time * 0.01) * 0.1;
      g.setStrokeStyle({
        color: KOREAN_COLORS.DOJANG_BLUE,
        width: 1,
        alpha,
      });

      // Vertical lines
      for (let x = 0; x < width; x += gridSize) {
        g.moveTo(x, 0);
        g.lineTo(x, height);
        g.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < height; y += gridSize) {
        g.moveTo(0, y);
        g.lineTo(width, y);
        g.stroke();
      }
    },
    [width, height, gridSize, time]
  );

  return <Graphics draw={drawGrid} data-testid="background-grid" />;
}
