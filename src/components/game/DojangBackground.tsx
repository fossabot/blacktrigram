// Underground dojang background for Korean martial arts

import React, { useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import { KOREAN_COLORS } from "../../types";

interface DojangBackgroundProps {
  width?: number;
  height?: number;
}

// Underground cyberpunk dojang background with traditional and neon elements
export function DojangBackground({
  width = 960,
  height = 720,
}: DojangBackgroundProps): React.ReactElement {
  // Draw main dojang background
  const drawBackground = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      // Main floor
      g.beginFill(KOREAN_COLORS.BLACK, 1);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Simulate a gradient with two rectangles (PIXI.Graphics has no gradient fill)
      g.beginFill(KOREAN_COLORS.DOJANG_BLUE, 0.85);
      g.drawRect(0, height - 180, width, 120);
      g.endFill();
      g.beginFill(KOREAN_COLORS.GOLD, 0.55);
      g.drawRect(0, height - 60, width, 60);
      g.endFill();

      // Floor tiles (traditional)
      g.lineStyle(1, KOREAN_COLORS.DARK_BLUE, 0.5);
      for (let x = 0; x < width; x += 60) {
        for (let y = height - 180; y < height; y += 60) {
          g.drawRect(x, y, 60, 60);
        }
      }
      g.lineStyle(0);

      // Neon accent lines (cyberpunk)
      g.lineStyle(3, KOREAN_COLORS.CYAN, 0.7);
      g.moveTo(0, height - 180);
      g.lineTo(width, height - 180);
      g.moveTo(0, height - 100);
      g.lineTo(width, height - 100);
      g.lineStyle(0);

      // Blood stains (atmosphere)
      g.beginFill(0x8b0000, 0.15);
      g.drawEllipse(width * 0.7, height - 120, 60, 18);
      g.drawEllipse(width * 0.3, height - 80, 40, 12);
      g.endFill();
    },
    [width, height]
  );

  // Neon glow and calligraphy
  const drawNeonEffects = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      // Neon glow borders
      const neonColors = [
        KOREAN_COLORS.CYAN,
        KOREAN_COLORS.TRADITIONAL_RED,
        KOREAN_COLORS.DOJANG_BLUE,
      ];
      neonColors.forEach((color, i) => {
        g.lineStyle(2, color, 0.25 + 0.1 * i);
        g.drawRoundedRect(
          16 + i * 10,
          16 + i * 10,
          width - 32 - i * 20,
          height - 32 - i * 20,
          24 - i * 4
        );
      });
      g.lineStyle(0);
    },
    [width, height]
  );

  return (
    <Container>
      <Graphics draw={drawBackground} />
      <Graphics draw={drawNeonEffects} />
      {/* Trigram symbols in neon */}
      <Text
        text={"☰ ☱ ☲ ☳☴ ☵ ☶ ☷"}
        x={width / 2}
        y={height - 140}
        anchor={{ x: 0.5, y: 0.5 }}
        style={
          new PIXI.TextStyle({
            fontFamily: "Orbitron, monospace",
            fontSize: 36,
            fill: KOREAN_COLORS.CYAN,
            letterSpacing: 8,
            dropShadow: true,
          })
        }
      />
      {/* Korean calligraphy - large, glowing */}
      <Text
        text="흑괘 무술 도장"
        x={width / 2}
        y={60}
        anchor={{ x: 0.5, y: 0.5 }}
        style={
          new PIXI.TextStyle({
            fontFamily: "Noto Sans KR, Arial, sans-serif",
            fontSize: 44,
            fill: KOREAN_COLORS.GOLD,
            fontWeight: "bold",
            dropShadow: true,
          })
        }
      />
      {/* English subtitle */}
      <Text
        text="Black Trigram Dojang"
        x={width / 2}
        y={100}
        anchor={{ x: 0.5, y: 0.5 }}
        style={
          new PIXI.TextStyle({
            fontFamily: "Orbitron, monospace",
            fontSize: 20,
            fill: KOREAN_COLORS.CYAN,
            fontWeight: "normal",
            letterSpacing: 2,
          })
        }
      />
      {/* Traditional Korean pattern overlay (subtle) */}
      <Container alpha={0.18}>
        <Text
          text={"✦ ✹ ✦ ✹ ✦"}
          x={width / 2}
          y={height - 40}
          anchor={{ x: 0.5, y: 0.5 }}
          style={
            new PIXI.TextStyle({
              fontFamily: "Noto Sans KR, Arial, sans-serif",
              fontSize: 24,
              fill: KOREAN_COLORS.GOLD,
              letterSpacing: 12,
            })
          }
        />
      </Container>
    </Container>
  );
}
