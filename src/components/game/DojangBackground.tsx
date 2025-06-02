// Underground dojang background for Korean martial arts

import React, { useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { KOREAN_COLORS } from "../../types";

interface DojangBackgroundProps {
  readonly width?: number;
  readonly height?: number;
  readonly style?: "traditional" | "cyberpunk" | "underground";
}

export function DojangBackground({
  width = 800,
  height = 600,
  style = "underground",
}: DojangBackgroundProps): React.ReactElement {
  const drawBackground = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Underground dojang background
      g.setFillStyle({ color: 0x1a1a1a });
      g.rect(0, 0, width, height);
      g.fill();

      // Floor tiles
      g.setStrokeStyle({ color: 0x333333, width: 1 });
      for (let x = 0; x < width; x += 50) {
        for (let y = height - 100; y < height; y += 50) {
          g.rect(x, y, 50, 50);
          g.stroke();
        }
      }

      // Neon accent lines
      g.setStrokeStyle({ color: 0x00ffff, width: 2, alpha: 0.6 });
      g.moveTo(0, height - 100);
      g.lineTo(width, height - 100);
      g.stroke();
    },
    [width, height, style]
  );

  const drawNeonEffects = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Neon glow effects around the dojang
      const neonColors = [0x00ffff, 0xff0040, 0x00ff00];

      neonColors.forEach((color, index) => {
        g.setStrokeStyle({
          color,
          width: 1,
          alpha: 0.3 + Math.sin(Date.now() * 0.001 + index) * 0.2,
        });
        g.rect(
          20 + index * 10,
          20 + index * 10,
          width - 40 - index * 20,
          height - 40 - index * 20
        );
        g.stroke();
      });
    },
    [width, height]
  );

  return (
    <Container>
      <Graphics draw={drawBackground} />
      <Graphics draw={drawNeonEffects} />

      {/* Korean calligraphy elements */}
      <Text
        text="흑괘 도장"
        x={width / 2}
        y={50}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR, Arial, sans-serif",
          fontSize: 32,
          fill: 0xffd700,
          fontWeight: "bold",
        }}
      />

      <Text
        text="Black Trigram Dojang"
        x={width / 2}
        y={85}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Orbitron, monospace",
          fontSize: 16,
          fill: 0x00ffff,
          fontWeight: "normal",
        }}
      />
    </Container>
  );
}
