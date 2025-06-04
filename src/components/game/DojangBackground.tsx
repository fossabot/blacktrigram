// Underground dojang background for Korean martial arts

import React, { useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import { KOREAN_COLORS, KOREAN_FONT_FAMILY_PRIMARY } from "../../types/constants";

export interface DojangBackgroundProps {
  readonly width: number;
  readonly height: number;
  readonly timeOfDay?: "dawn" | "day" | "dusk" | "night";
  readonly weather?: "clear" | "rain" | "snow" | "storm";
}

export function DojangBackground({
  width,
  height,
  timeOfDay = "night",
  weather = "clear",
}: DojangBackgroundProps): React.ReactElement {
  // Draw main background
  const drawBackground = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Back wall
      g.beginFill(KOREAN_COLORS.DOJANG_WALL);
      g.drawRect(0, 0, width, height * 0.7);
      g.endFill();

      // Traditional Korean decorative elements
      // Ceiling beams
      g.beginFill(KOREAN_COLORS.WOOD_BROWN);
      g.drawRect(0, height * 0.1, width, 20);
      g.drawRect(0, height * 0.25, width, 15);
      g.endFill();

      // Lighting effects based on time of day
      if (timeOfDay === "day") {
        g.beginFill(KOREAN_COLORS.HANBOK_WHITE, 0.1);
        g.drawRect(0, 0, width, height);
        g.endFill();
      }

      // Weather effects
      if (weather === "rain") {
        // Add subtle rain effect overlay
        for (let i = 0; i < 20; i++) {
          g.lineStyle(1, KOREAN_COLORS.ELECTRIC_BLUE, 0.3);
          g.moveTo(Math.random() * width, 0);
          g.lineTo(Math.random() * width, height);
        }
      }

      // Traditional Korean patterns (dancheong style)
      g.lineStyle(2, KOREAN_COLORS.TRADITIONAL_RED, 0.6);
      g.drawRect(width * 0.1, height * 0.15, width * 0.8, 5);

      g.lineStyle(2, KOREAN_COLORS.TRADITIONAL_BLUE, 0.6);
      g.drawRect(width * 0.1, height * 0.2, width * 0.8, 5);
    },
    [width, height, timeOfDay, weather, floorColor]
  );

  return (
    <Container>
      <Graphics draw={drawBackground} />
    </Container>
  );
}
