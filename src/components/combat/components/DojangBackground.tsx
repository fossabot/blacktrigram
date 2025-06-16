import React, { useCallback } from "react";
import { extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import { KOREAN_COLORS } from "../../../types/constants";

extend({ Container, Graphics, Text });

export interface DojangBackgroundProps {
  readonly width: number;
  readonly height: number;
  readonly lighting?: "normal" | "dim" | "bright" | "cyberpunk" | "traditional";
  readonly animate?: boolean;
  readonly "data-testid"?: string;
}

export const DojangBackground: React.FC<DojangBackgroundProps> = ({
  width,
  height,
  lighting = "normal",
  animate = true,
  ...props
}) => {
  const drawKoreanDojang = useCallback(
    (g: any) => {
      g.clear();

      // Traditional Korean dojang floor
      const bgColor =
        lighting === "cyberpunk"
          ? KOREAN_COLORS.UI_BACKGROUND_DARK
          : KOREAN_COLORS.UI_BACKGROUND_MEDIUM;

      g.fill({ color: bgColor, alpha: 0.95 });
      g.rect(0, 0, width, height);
      g.fill();

      // Traditional mat pattern
      g.stroke({
        width: 1,
        color:
          lighting === "cyberpunk"
            ? KOREAN_COLORS.NEON_CYAN
            : KOREAN_COLORS.ACCENT_GOLD,
        alpha: 0.3,
      });

      const gridSize = 60;
      for (let i = 0; i < width; i += gridSize) {
        g.moveTo(i, 0);
        g.lineTo(i, height);
      }
      for (let j = 0; j < height; j += gridSize) {
        g.moveTo(0, j);
        g.lineTo(width, j);
      }
      g.stroke();

      // Center training circle
      g.stroke({
        width: 3,
        color:
          lighting === "cyberpunk"
            ? KOREAN_COLORS.NEON_PURPLE
            : KOREAN_COLORS.PRIMARY_CYAN,
        alpha: 0.6,
      });
      g.circle(width / 2, height / 2, Math.min(width, height) * 0.15);
      g.stroke();

      // Traditional Korean corner decorations
      const cornerSize = 40;
      const cornerColor =
        lighting === "cyberpunk"
          ? KOREAN_COLORS.NEON_PINK
          : KOREAN_COLORS.KOREAN_RED;

      g.fill({ color: cornerColor, alpha: 0.4 });
      g.rect(0, 0, cornerSize, cornerSize);
      g.rect(width - cornerSize, 0, cornerSize, cornerSize);
      g.rect(0, height - cornerSize, cornerSize, cornerSize);
      g.rect(width - cornerSize, height - cornerSize, cornerSize, cornerSize);
      g.fill();
    },
    [width, height, lighting]
  );

  return (
    <pixiContainer {...props}>
      <pixiGraphics draw={drawKoreanDojang} data-testid="dojang-background" />
    </pixiContainer>
  );
};

export default DojangBackground;
