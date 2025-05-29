import React, { useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { JSX } from "react";
import { KOREAN_COLORS } from "../../types";

export interface DojangBackgroundProps {
  readonly variant: "traditional" | "modern" | "mountain" | "temple";
  readonly lighting: "day" | "evening" | "night" | "dawn";
}

export function DojangBackground({
  variant = "traditional",
  lighting = "day",
}: DojangBackgroundProps): JSX.Element {
  const drawBackground = useCallback(
    (g: any) => {
      g.clear();

      // Base background color based on lighting
      const lightingColors = {
        day: 0x2c3e50,
        evening: 0x8b4513,
        night: 0x191970,
        dawn: 0x4682b4,
      };

      g.setFillStyle({ color: lightingColors[lighting], alpha: 1 });
      g.rect(0, 0, 800, 600);
      g.fill();

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
    },
    [variant, lighting]
  );

  const drawTrigramSymbols = useCallback((g: any) => {
    g.clear();

    // Eight trigram symbols positioned around the dojang
    const trigrams = ["☰", "☱", "☲", "☳", "☴", "☵", "☶", "☷"];
    const positions = [
      { x: 100, y: 100 },
      { x: 400, y: 80 },
      { x: 700, y: 100 },
      { x: 750, y: 250 },
      { x: 700, y: 350 },
      { x: 400, y: 370 },
      { x: 100, y: 350 },
      { x: 50, y: 250 },
    ];

    trigrams.forEach((symbol, index) => {
      const pos = positions[index];
      g.setFillStyle({ color: KOREAN_COLORS.GOLD, alpha: 0.3 });
      g.circle(pos.x, pos.y, 25);
      g.fill();

      g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 2, alpha: 0.5 });
      g.circle(pos.x, pos.y, 25);
      g.stroke();
    });
  }, []);

  return (
    <Container>
      {/* Main background */}
      <Graphics draw={drawBackground} />

      {/* Trigram symbols */}
      <Graphics draw={drawTrigramSymbols} />

      {/* Trigram text labels */}
      {["☰", "☱", "☲", "☳", "☴", "☵", "☶", "☷"].map((symbol, index) => {
        const positions = [
          { x: 100, y: 100 },
          { x: 400, y: 80 },
          { x: 700, y: 100 },
          { x: 750, y: 250 },
          { x: 700, y: 350 },
          { x: 400, y: 370 },
          { x: 100, y: 350 },
          { x: 50, y: 250 },
        ];
        const pos = positions[index];

        return (
          <Text
            key={`trigram-${index}`}
            text={symbol}
            x={pos.x}
            y={pos.y}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              fontFamily: "serif",
              fontSize: 20,
              fill: KOREAN_COLORS.GOLD,
              fontWeight: "bold",
              alpha: 0.6,
            }}
          />
        );
      })}

      {/* Dojang name */}
      <Text
        text="흑괘 무술 도장 (Black Trigram Martial Arts)"
        x={400}
        y={50}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 24,
          fill: KOREAN_COLORS.GOLD,
          fontWeight: "bold",
          dropShadow: {
            color: KOREAN_COLORS.BLACK,
            blur: 4,
            distance: 2,
          },
        }}
      />
    </Container>
  );
}
