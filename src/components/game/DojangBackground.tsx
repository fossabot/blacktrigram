// Underground dojang background for Korean martial arts

import React from "react";
import { Container, Graphics } from "@pixi/react";
import { KOREAN_COLORS } from "../../types";
import type { DojangBackgroundProps } from "../../types/components";

export function DojangBackground({
  timeOfDay = "night",
  weather = "clear",
  width = 800,
  height = 600,
}: DojangBackgroundProps): React.JSX.Element {
  const floorColor = KOREAN_COLORS.GON_DARK_BROWN;

  // Create background graphics
  const drawBackground = React.useCallback(
    (g: any) => {
      g.clear();

      // Main floor
      g.beginFill(floorColor);
      g.drawRect(0, height * 0.7, width, height * 0.3);
      g.endFill();

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
