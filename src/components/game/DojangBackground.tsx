import React, { useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import { KOREAN_COLORS } from "../../types";

export interface DojangBackgroundProps {
  readonly width: number;
  readonly height: number;
  readonly style?: "traditional" | "modern" | "cyberpunk";
}

export function DojangBackground({
  width,
  height,
  style = "traditional",
}: DojangBackgroundProps): React.ReactElement {
  const drawBackground = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Main dojang floor with gradient effect
      g.setFillStyle({
        color: KOREAN_COLORS.DOJANG_BLUE,
        alpha: 0.8,
      });
      g.rect(0, 0, width, height);
      g.fill();

      // Traditional Korean pattern overlay
      g.setFillStyle({
        color: KOREAN_COLORS.TRADITIONAL_RED,
        alpha: 0.1,
      });

      // Draw traditional Korean geometric patterns (dancheong style)
      const patternSize = 60;
      for (let x = 0; x < width; x += patternSize) {
        for (let y = 0; y < height; y += patternSize) {
          // Traditional Korean dancheong pattern
          g.circle(x + patternSize / 2, y + patternSize / 2, 8);
          g.fill();
        }
      }

      // Combat area marking - outer circle
      const centerX = width / 2;
      const centerY = height / 2;
      const arenaRadius = Math.min(width, height) * 0.35;

      g.setStrokeStyle({
        color: KOREAN_COLORS.GOLD,
        width: 4,
        alpha: 0.7,
      });
      g.circle(centerX, centerY, arenaRadius);
      g.stroke();

      // Inner circle for close combat
      g.setStrokeStyle({
        color: KOREAN_COLORS.WHITE,
        width: 2,
        alpha: 0.5,
      });
      g.circle(centerX, centerY, arenaRadius * 0.6);
      g.stroke();

      // Grid lines for positioning reference
      if (style === "modern") {
        g.setStrokeStyle({
          color: KOREAN_COLORS.GRAY_MEDIUM,
          width: 1,
          alpha: 0.2,
        });

        const gridSize = 50;
        for (let x = 0; x <= width; x += gridSize) {
          g.moveTo(x, 0);
          g.lineTo(x, height);
          g.stroke();
        }

        for (let y = 0; y <= height; y += gridSize) {
          g.moveTo(0, y);
          g.lineTo(width, y);
          g.stroke();
        }
      }

      // Ambient lighting effect using multiple circles
      const lightRadius = arenaRadius * 1.5;
      const lightSteps = 10;

      for (let i = 0; i < lightSteps; i++) {
        const alpha = (1 - i / lightSteps) * 0.1;
        const radius = lightRadius * (1 - i / lightSteps);

        g.setFillStyle({
          color: KOREAN_COLORS.WHITE,
          alpha: alpha,
        });
        g.circle(centerX, centerY, radius);
        g.fill();
      }

      // Corner decorative elements
      const cornerSize = 30;
      g.setStrokeStyle({
        color: KOREAN_COLORS.GOLD,
        width: 2,
        alpha: 0.6,
      });

      // Top-left corner
      g.moveTo(20, 20 + cornerSize);
      g.lineTo(20, 20);
      g.lineTo(20 + cornerSize, 20);
      g.stroke();

      // Top-right corner
      g.moveTo(width - 20 - cornerSize, 20);
      g.lineTo(width - 20, 20);
      g.lineTo(width - 20, 20 + cornerSize);
      g.stroke();

      // Bottom-left corner
      g.moveTo(20, height - 20 - cornerSize);
      g.lineTo(20, height - 20);
      g.lineTo(20 + cornerSize, height - 20);
      g.stroke();

      // Bottom-right corner
      g.moveTo(width - 20 - cornerSize, height - 20);
      g.lineTo(width - 20, height - 20);
      g.lineTo(width - 20, height - 20 - cornerSize);
      g.stroke();
    },
    [width, height, style]
  );

  return (
    <Container data-testid="dojang-background">
      <Graphics draw={drawBackground} />

      {/* Korean dojang name */}
      <Text
        text="흑괘 무술 도장"
        anchor={{ x: 0.5, y: 0.5 }}
        x={width / 2}
        y={50}
        style={{
          fontFamily: "Noto Sans KR, Arial, sans-serif",
          fontSize: 32,
          fill: KOREAN_COLORS.GOLD,
          fontWeight: "bold",
          dropShadow: {
            color: KOREAN_COLORS.BLACK,
            distance: 3,
            angle: Math.PI / 4,
            alpha: 0.8,
            blur: 2,
          },
        }}
      />

      {/* Traditional elements text */}
      <Text
        text="팔괘권 수련장"
        anchor={{ x: 0.5, y: 0.5 }}
        x={width / 2}
        y={height - 50}
        style={{
          fontFamily: "Noto Sans KR, Arial, sans-serif",
          fontSize: 18,
          fill: KOREAN_COLORS.WHITE,
        }}
        alpha={0.8}
      />

      {/* Corner trigram symbols with proper alpha */}
      <Text
        text="☰"
        anchor={{ x: 0.5, y: 0.5 }}
        x={80}
        y={80}
        style={{
          fontFamily: "serif",
          fontSize: 24,
          fill: KOREAN_COLORS.GOLD,
        }}
        alpha={0.6}
      />

      <Text
        text="☷"
        anchor={{ x: 0.5, y: 0.5 }}
        x={width - 80}
        y={80}
        style={{
          fontFamily: "serif",
          fontSize: 24,
          fill: KOREAN_COLORS.GOLD,
        }}
        alpha={0.6}
      />

      <Text
        text="☲"
        anchor={{ x: 0.5, y: 0.5 }}
        x={80}
        y={height - 80}
        style={{
          fontFamily: "serif",
          fontSize: 24,
          fill: KOREAN_COLORS.GOLD,
        }}
        alpha={0.6}
      />

      <Text
        text="☵"
        anchor={{ x: 0.5, y: 0.5 }}
        x={width - 80}
        y={height - 80}
        style={{
          fontFamily: "serif",
          fontSize: 24,
          fill: KOREAN_COLORS.GOLD,
        }}
        alpha={0.6}
      />

      {/* Center focus indicator */}
      <Container x={width / 2} y={height / 2}>
        <Text
          text="●"
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 12,
            fill: KOREAN_COLORS.GOLD,
          }}
          alpha={0.5}
        />
      </Container>

      {/* Traditional Korean border pattern */}
      <Container>
        {/* Top border pattern */}
        {Array.from({ length: Math.floor(width / 40) }, (_, i) => (
          <Text
            key={`top-${i}`}
            text="◆"
            x={20 + i * 40}
            y={10}
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 8,
              fill: KOREAN_COLORS.TRADITIONAL_RED,
            }}
            alpha={0.3}
          />
        ))}

        {/* Bottom border pattern */}
        {Array.from({ length: Math.floor(width / 40) }, (_, i) => (
          <Text
            key={`bottom-${i}`}
            text="◆"
            x={20 + i * 40}
            y={height - 20}
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 8,
              fill: KOREAN_COLORS.TRADITIONAL_RED,
            }}
            alpha={0.3}
          />
        ))}
      </Container>
    </Container>
  );
}
