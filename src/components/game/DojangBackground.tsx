// Underground dojang background for Korean martial arts

import React, { useCallback } from "react";
import * as PIXI from "pixi.js";
import { KOREAN_COLORS } from "../../types/constants";

export interface DojangBackgroundProps {
  readonly width?: number;
  readonly height?: number;
  readonly animate?: boolean;
  readonly lighting?: "normal" | "cyberpunk" | "traditional";
}

export const DojangBackground: React.FC<DojangBackgroundProps> = ({
  width = 800,
  height = 600,
  animate = true,
  lighting = "normal",
}) => {
  const backgroundDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Base dojang floor
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Traditional Korean pattern overlay
      if (lighting === "cyberpunk") {
        g.lineStyle(1, KOREAN_COLORS.PRIMARY_CYAN, 0.3);
      } else {
        g.lineStyle(1, KOREAN_COLORS.ACCENT_GOLD, 0.2);
      }

      // Draw traditional pattern
      const patternSize = 100;
      for (let i = 0; i < width; i += patternSize) {
        for (let j = 0; j < height; j += patternSize) {
          g.drawCircle(i + patternSize / 2, j + patternSize / 2, 30);
        }
      }
    },
    [width, height, lighting]
  );

  const animationDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.PRIMARY_CYAN, 0.1);
      g.drawRect(0, height * 0.8, width, height * 0.2);
      g.endFill();
    },
    [width, height]
  );

  return (
    <pixiContainer data-testid="dojang-background">
      <pixiGraphics draw={backgroundDraw} />

      {animate && <pixiGraphics draw={animationDraw} />}
    </pixiContainer>
  );
};

export default DojangBackground;
