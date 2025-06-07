import React, { useMemo } from "react";
import { Container, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
import { KOREAN_COLORS, GAME_CONFIG } from "../../../types/constants";

interface LocalBackgroundGridProps {
  readonly gridSize?: number;
  readonly lineColor?: number;
  readonly lineAlpha?: number;
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
  readonly showMajorLines?: boolean;
  readonly majorLineInterval?: number;
}

export const BackgroundGrid: React.FC<LocalBackgroundGridProps> = ({
  gridSize = 50,
  lineColor = KOREAN_COLORS.UI_BORDER,
  lineAlpha = 0.3,
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
  x = 0,
  y = 0,
  showMajorLines = true,
  majorLineInterval = 5,
}) => {
  const safeWidth = width ?? GAME_CONFIG.CANVAS_WIDTH;
  const safeHeight = height ?? GAME_CONFIG.CANVAS_HEIGHT;

  const drawGrid = useMemo(() => {
    return (g: PIXI.Graphics) => {
      g.clear();

      // Draw vertical lines
      g.lineStyle(1, lineColor, lineAlpha);
      for (let px = 0; px <= safeWidth; px += gridSize) {
        for (let py = 0; py <= safeHeight; py += gridSize) {
          g.moveTo(px, 0);
          g.lineTo(px, safeHeight);
        }
      }

      // Draw horizontal lines
      for (let py = 0; py <= safeHeight; py += gridSize) {
        g.moveTo(0, py);
        g.lineTo(safeWidth, py);
      }

      // Draw major grid lines if enabled
      if (showMajorLines) {
        g.lineStyle(2, lineColor, lineAlpha * 1.5);
        for (let px = 0; px <= safeWidth; px += gridSize * majorLineInterval) {
          g.moveTo(px, 0);
          g.lineTo(px, safeHeight);
        }

        for (let py = 0; py <= safeHeight; py += gridSize * majorLineInterval) {
          g.moveTo(0, py);
          g.lineTo(safeWidth, py);
        }
      }
    };
  }, [
    safeWidth,
    safeHeight,
    gridSize,
    lineColor,
    lineAlpha,
    showMajorLines,
    majorLineInterval,
  ]);

  return (
    <Container x={x} y={y}>
      <Graphics draw={drawGrid} />
    </Container>
  );
};
