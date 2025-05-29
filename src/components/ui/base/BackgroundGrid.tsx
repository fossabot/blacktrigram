import { useCallback } from "react";
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
  color = 0x333333,
  alpha = 0.1,
}: BackgroundGridProps): JSX.Element {
  const drawGrid = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      g.setStrokeStyle({ color, width: 1, alpha });

      // Draw vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        g.moveTo(x, 0);
        g.lineTo(x, height);
      }

      // Draw horizontal lines
      for (let y = 0; y <= height; y += gridSize) {
        g.moveTo(0, y);
        g.lineTo(width, y);
      }

      g.stroke();
    },
    [width, height, gridSize, color, alpha]
  );

  return <pixiGraphics draw={drawGrid} />;
}
