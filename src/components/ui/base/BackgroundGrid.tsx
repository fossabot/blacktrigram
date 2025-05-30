import React, { useCallback } from "react";
import { Graphics } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";

interface BackgroundGridProps {
  readonly width: number;
  readonly height: number;
  readonly gridSize?: number;
  readonly color?: number;
  readonly alpha?: number;
}

export function BackgroundGrid({
  width,
  height,
  gridSize = 50,
  color = 0xcccccc,
  alpha = 0.2,
}: BackgroundGridProps): React.JSX.Element {
  const drawGrid = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      g.lineStyle(1, color, alpha);

      for (let i = 0; i < width; i += gridSize) {
        g.moveTo(i, 0);
        g.lineTo(i, height);
      }
      for (let j = 0; j < height; j += gridSize) {
        g.moveTo(0, j);
        g.lineTo(width, j);
      }
    },
    [width, height, gridSize, color, alpha]
  );

  return <Graphics draw={drawGrid} />;
}
