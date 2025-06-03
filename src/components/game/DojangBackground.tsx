// Underground dojang background for Korean martial arts

import React, { useCallback } from "react";
import { Container, Graphics } from "@pixi/react";
import type { DojangBackgroundProps } from "../../types/components";
import { KOREAN_COLORS } from "../../types/constants";

export function DojangBackground({
  timeOfDay = "night",
  width = 800,
  height = 600,
  weather = "clear",
}: DojangBackgroundProps): JSX.Element {
  const drawBackground = useCallback(
    (g: any) => {
      g.clear();

      // Base dojang floor using available colors
      g.beginFill(KOREAN_COLORS.GAN_BROWN); // Using available brown color
      g.drawRect(0, height * 0.7, width, height * 0.3);
      g.endFill();

      // Dojang walls using available colors
      g.beginFill(KOREAN_COLORS.GON_DARK_BROWN); // Using available dark brown
      g.drawRect(0, 0, width, height * 0.7);
      g.endFill();

      // Traditional Korean patterns (simplified)
      g.lineStyle(2, KOREAN_COLORS.DANCHEONG_GOLD, 0.7);
      for (let i = 0; i < 3; i++) {
        const y = height * 0.1 + i * height * 0.15;
        g.moveTo(width * 0.1, y);
        g.lineTo(width * 0.9, y);
      }

      // Atmospheric lighting based on time of day
      if (timeOfDay === "night") {
        // Moonlight effect using available neon colors
        g.beginFill(KOREAN_COLORS.NEON_CYAN, 0.1);
        g.drawRect(0, 0, width, height);
        g.endFill();

        // Subtle neon accent strips
        g.lineStyle(1, KOREAN_COLORS.NEON_CYAN, 0.6);
        g.moveTo(0, height * 0.2);
        g.lineTo(width, height * 0.2);
        g.moveTo(0, height * 0.8);
        g.lineTo(width, height * 0.8);
      }

      // Weather effects
      if (weather === "rain") {
        g.lineStyle(1, KOREAN_COLORS.GAM_BLUE, 0.3);
        for (let i = 0; i < 20; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          g.moveTo(x, y);
          g.lineTo(x + 2, y + 20);
        }
      }
    },
    [width, height, timeOfDay, weather]
  );

  return (
    <Container>
      <Graphics draw={drawBackground} />
    </Container>
  );
}
