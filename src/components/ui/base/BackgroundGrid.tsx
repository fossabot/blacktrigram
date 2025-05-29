import React, { useCallback } from "react";
import { Graphics } from "@pixi/react";
import type { JSX } from "react";
import { KOREAN_COLORS } from "../../../types";

export interface BackgroundGridProps {
  readonly width: number;
  readonly height: number;
  readonly gridSize?: number;
  readonly opacity?: number;
}

export function BackgroundGrid({
  width,
  height,
  gridSize = 50,
  opacity = 0.1,
}: BackgroundGridProps): JSX.Element {
  const drawGrid = useCallback(
    (g: any) => {
      g.clear();

      // Set grid line style
      g.setStrokeStyle({
        color: KOREAN_COLORS.CYAN,
        width: 1,
        alpha: opacity,
      });

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

      // Add subtle Korean pattern elements
      g.setStrokeStyle({
        color: KOREAN_COLORS.GOLD,
        width: 2,
        alpha: opacity * 0.5,
      });

      // Draw traditional Korean corner decorations
      const cornerSize = 20;
      const corners = [
        { x: 0, y: 0 },
        { x: width - cornerSize, y: 0 },
        { x: 0, y: height - cornerSize },
        { x: width - cornerSize, y: height - cornerSize },
      ];

      corners.forEach((corner) => {
        // Traditional Korean corner pattern
        g.moveTo(corner.x, corner.y + cornerSize);
        g.lineTo(corner.x, corner.y);
        g.lineTo(corner.x + cornerSize, corner.y);
      });

      g.stroke();
    },
    [width, height, gridSize, opacity]
  );

  return <Graphics draw={drawGrid} />;
}
