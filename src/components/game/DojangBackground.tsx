// Underground dojang background for Korean martial arts

import React, { useState, useCallback, useEffect } from "react";
import { Container, Graphics } from "@pixi/react"; // Fix: Remove unused Text and useTick imports
import * as PIXI from "pixi.js";
import type { DojangBackgroundProps } from "../../types/components";
import {
  KOREAN_COLORS,
  // Fix: Remove unused FONT_FAMILY, FONT_SIZES, FONT_WEIGHTS imports
  GAME_CONFIG,
} from "../../types/constants";

export const DojangBackground: React.FC<DojangBackgroundProps> = ({
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
  animate = true,
  lighting = "cyberpunk",
}) => {
  const [time, setTime] = useState(0);

  const drawDojang = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Floor
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Wall panels with lighting effects
      const panelWidth = width / 8;
      for (let i = 0; i < 8; i++) {
        const lightColor =
          i % 2 === 0
            ? KOREAN_COLORS.SECONDARY_YELLOW
            : KOREAN_COLORS.WARNING_YELLOW;

        // Apply lighting based on mode - Fix: Use proper color constants
        let finalColor: number = lightColor;
        if (lighting === "dramatic") {
          finalColor = KOREAN_COLORS.WARNING_YELLOW; // Fix: Use existing color
        } else if (lighting === "cyberpunk") {
          finalColor = KOREAN_COLORS.ACCENT_CYAN; // Fix: Use existing color
        }

        g.beginFill(finalColor, 0.3);
        g.drawRect(i * panelWidth, 0, panelWidth, height * 0.3);
        g.endFill();
      }

      // Cyberpunk grid overlay
      g.lineStyle(1, KOREAN_COLORS.PRIMARY_CYAN, 0.2);
      const gridSize = 50;
      for (let x = 0; x <= width; x += gridSize) {
        g.moveTo(x, 0);
        g.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        g.moveTo(0, y);
        g.lineTo(width, y);
      }

      // Add pulsing effect if animate is true
      if (animate) {
        const pulse = Math.sin(time * 0.1) * 0.1 + 0.9;
        g.alpha = pulse;
      }
    },
    [width, height, animate, lighting, time]
  );

  // Animation loop
  useEffect(() => {
    if (!animate) return;

    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 0.1);
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [animate]);

  return (
    <Container>
      <Graphics draw={drawDojang} />
    </Container>
  );
};
