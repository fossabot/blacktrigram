import React from "react";
import { Container, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
import { KOREAN_COLORS } from "../../../types/constants";

export interface BackgroundGridProps {
  width?: number;
  height?: number;
  cellSize?: number;
  color?: number;
  alpha?: number;
}

export const BackgroundGrid: React.FC<BackgroundGridProps> = ({
  width = 800,
  height = 600,
  cellSize = 50,
  color = KOREAN_COLORS.UI_BORDER,
  alpha = 0.3,
}) => {
  const drawGrid = React.useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.lineStyle(1, color, alpha);

      // Vertical lines
      for (let x = 0; x <= width; x += cellSize) {
        g.moveTo(x, 0);
        g.lineTo(x, height);
      }

      // Horizontal lines
      for (let y = 0; y <= height; y += cellSize) {
        g.moveTo(0, y);
        g.lineTo(width, y);
      }
    },
    [width, height, cellSize, color, alpha]
  );

  return (
    <Container>
      <Graphics draw={drawGrid} />
    </Container>
  );
};
