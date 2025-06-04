// Underground dojang background for Korean martial arts

import React, { useCallback } from "react";
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../types/constants";

export interface DojangBackgroundProps {
  readonly width: number;
  readonly height: number;
  readonly ambientLevel?: number;
  readonly showTrigramSymbols?: boolean;
}

export function DojangBackground({
  width,
  height,
  ambientLevel = 0.3,
  showTrigramSymbols = true,
}: DojangBackgroundProps): React.ReactElement {
  // Draw main background
  const drawBackground = useCallback(
    (g: any) => {
      if (!g || !g.clear) return;

      g.clear();

      // Deep black base representing underground training hall
      g.beginFill(KOREAN_COLORS.BLACK, 1.0);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Subtle gray concrete texture (using existing SILVER color)
      g.beginFill(KOREAN_COLORS.SILVER, 0.1);
      for (let i = 0; i < 5; i++) {
        const x = (width / 5) * i;
        g.drawRect(x, 0, width / 5, height);
      }
      g.endFill();

      // Neon accent lighting - cyberpunk Korean aesthetic
      const neonIntensity = ambientLevel * 0.8;

      // Cool cyan neon strips
      g.beginFill(KOREAN_COLORS.CYAN, neonIntensity);
      g.drawRect(0, height * 0.1, width, 2);
      g.drawRect(0, height * 0.9, width, 2);
      g.endFill();

      // Traditional Korean blue accent
      g.beginFill(KOREAN_COLORS.DOJANG_BLUE, neonIntensity * 0.6);
      g.drawRect(width * 0.05, 0, 2, height);
      g.drawRect(width * 0.95, 0, 2, height);
      g.endFill();

      // Center dojang area with subtle gold Korean traditional accent
      g.lineStyle(1, KOREAN_COLORS.GOLD, neonIntensity);
      g.drawRect(width * 0.2, height * 0.2, width * 0.6, height * 0.6);

      // Combat training mat indication
      g.beginFill(KOREAN_COLORS.HANBOK_WHITE, 0.05);
      g.drawRect(width * 0.25, height * 0.25, width * 0.5, height * 0.5);
      g.endFill();
    },
    [width, height, ambientLevel]
  );

  // Trigram symbols positioned around the dojang
  const drawTrigramSymbols = useCallback(
    (g: any) => {
      if (!g || !g.clear) return;

      g.clear();

      // Draw the 8 trigram positions around the combat area
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const radius = Math.min(width, height) * 0.4;

      Object.entries(TRIGRAM_DATA).forEach(([stance], index) => {
        const angle = (index / 8) * Math.PI * 2 - Math.PI / 2; // Start from top
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        // Traditional Korean blue glow around symbols
        g.lineStyle(2, KOREAN_COLORS.WIND_GREEN, ambientLevel * 0.7);
        g.drawCircle(x, y, 15);

        // Stance-specific color accent
        const stanceColor =
          KOREAN_COLORS[stance as keyof typeof KOREAN_COLORS] ||
          KOREAN_COLORS.WHITE;
        g.beginFill(stanceColor, ambientLevel * 0.5);
        g.drawCircle(x, y, 8);
        g.endFill();
      });
    },
    [width, height, ambientLevel]
  );

  return (
    <pixiContainer>
      {/* Main dojang background */}
      <pixiGraphics draw={drawBackground} />

      {/* Trigram symbols if enabled */}
      {showTrigramSymbols && <pixiGraphics draw={drawTrigramSymbols} />}

      {/* Dojang identification text */}
      <pixiText
        text="흑괘 도장 (Black Trigram Dojang)"
        x={width * 0.5}
        y={height * 0.05}
        anchor={0.5}
        style={{
          fontFamily: "Noto Sans KR, Arial, sans-serif",
          fontSize: 18,
          fill: KOREAN_COLORS.GOLD,
          fontWeight: "bold",
          dropShadow: {
            color: KOREAN_COLORS.BLACK,
            distance: 2,
            alpha: 0.8,
            angle: Math.PI / 4,
            blur: 1,
          },
        }}
      />

      {/* Traditional Korean martial arts atmosphere text */}
      <pixiText
        text="정격자의 길 (Path of the Precision Striker)"
        x={width * 0.5}
        y={height * 0.95}
        anchor={0.5}
        style={{
          fontFamily: "Noto Sans KR, Arial, sans-serif",
          fontSize: 12,
          fill: KOREAN_COLORS.SILVER,
          fontStyle: "italic",
        }}
      />
    </pixiContainer>
  );
}
