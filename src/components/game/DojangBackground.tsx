import React, { useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import { KOREAN_COLORS } from "../../types";

export interface DojangBackgroundProps {
  variant: "traditional" | "modern" | "mountain" | "temple";
  lighting: "day" | "night" | "dawn" | "evening";
  setting?: string; // Make optional
  timeOfDay?: string; // Make optional
  weather?: string;
  dojangType?: string;
}

export function DojangBackground({
  variant,
  lighting,
  setting,
  timeOfDay,
  weather,
  dojangType,
}: DojangBackgroundProps): React.ReactElement {
  const backgroundStyle = {
    variant,
    lighting,
    setting: setting || "traditional",
    timeOfDay: timeOfDay || "day",
    weather: weather || "clear",
    dojangType: dojangType || "traditional",
  };

  const trigrams = ["☰", "☱", "☲", "☳", "☴", "☵", "☶", "☷"];
  const positions = [
    { x: 100, y: 100 },
    { x: 200, y: 100 },
    { x: 300, y: 100 },
    { x: 400, y: 100 },
    { x: 100, y: 200 },
    { x: 200, y: 200 },
    { x: 300, y: 200 },
    { x: 400, y: 200 },
  ];

  const drawBackground = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Use backgroundStyle to determine colors and patterns
      const baseColor =
        backgroundStyle.lighting === "night" ? 0x1a1a2e : 0x87ceeb;
      g.setFillStyle({ color: baseColor });
      g.rect(0, 0, 800, 600);
      g.fill();

      // Apply variant-specific styling
      if (backgroundStyle.variant === "mountain") {
        g.setFillStyle({ color: 0x8b7355 });
        // Draw mountain silhouettes
      }

      // Floor
      g.setFillStyle({ color: 0x8b4513, alpha: 0.8 });
      g.rect(0, 400, 800, 200);
      g.fill();

      // Traditional wooden floor pattern
      for (let i = 0; i < 800; i += 100) {
        g.setStrokeStyle({ color: 0x654321, width: 2, alpha: 0.6 });
        g.moveTo(i, 400);
        g.lineTo(i, 600);
        g.stroke();
      }

      // Walls
      g.setFillStyle({ color: 0x696969, alpha: 0.7 });
      g.rect(0, 0, 800, 400);
      g.fill();

      // Traditional Korean decorative elements
      if (variant === "traditional") {
        // Wooden beams
        g.setFillStyle({ color: 0x8b4513, alpha: 0.9 });
        g.rect(0, 350, 800, 20);
        g.rect(0, 180, 800, 15);
        g.fill();

        // Traditional Korean patterns
        g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 3, alpha: 0.6 });

        // Draw simplified dancheong pattern
        for (let x = 100; x < 700; x += 150) {
          // Cloud pattern
          g.arc(x, 100, 20, 0, Math.PI * 2);
          g.stroke();

          // Geometric patterns
          g.rect(x - 15, 120, 30, 15);
          g.stroke();
        }
      }

      // Side pillars
      g.setFillStyle({ color: 0x8b4513, alpha: 0.8 });
      g.rect(50, 200, 30, 200);
      g.rect(720, 200, 30, 200);
      g.fill();

      trigrams.forEach((_, index) => {
        const pos = positions[index];
        if (pos) {
          g.circle(pos.x, pos.y, 25);
          g.fill();
        }
      });
    },
    [backgroundStyle] // Include backgroundStyle in dependencies
  );

  return (
    <Container>
      {/* Main background */}
      <Graphics draw={drawBackground} />

      {/* Trigram symbols */}
      {trigrams.map((symbol, index) => {
        const pos = positions[index];
        return pos ? (
          <Text
            key={index}
            text={symbol}
            x={pos.x}
            y={pos.y}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              fontFamily: "serif",
              fontSize: 24,
              fill: 0xffd700,
              dropShadow: {
                color: "#000000",
                blur: 4,
                distance: 2,
                alpha: 0.8,
                angle: Math.PI / 4,
              },
            }}
          />
        ) : null;
      })}
    </Container>
  );
}
