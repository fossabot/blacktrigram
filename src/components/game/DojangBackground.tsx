import { useState, useEffect, useCallback } from "react";
import type { JSX } from "react";
import type { Graphics as PixiGraphics } from "pixi.js";
import { useTexture } from "../../hooks/useTexture";

// Dark Trigram theme constants with strict typing
const DARK_TRIGRAM_THEME = {
  PRIMARY_CYAN: 0x00ffd0,
  DARK_BG: 0x0a0e12,
  DARKER_BG: 0x181c20,
  MEDIUM_BG: 0x23272b,
  VITAL_ORANGE: 0xff4400,
  CRITICAL_RED: 0xff3030,
  WHITE: 0xffffff,
  GRID_CYAN: 0x003333,
  KOREAN_RED: 0x8b0000,
  TRADITIONAL_GOLD: 0xffd700,
} as const;

interface DojangBackgroundProps {
  readonly gameTime: number;
  readonly showVitalPoints?: boolean;
  readonly showTrigramPositions?: boolean;
}

interface VitalPoint {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly damage: number;
  readonly type: string;
}

interface TrigramPosition {
  readonly x: number;
  readonly y: number;
  readonly symbol: string;
  readonly name: string;
  readonly korean: string;
}

export function DojangBackground({
  gameTime,
  showVitalPoints = true,
  showTrigramPositions = true,
}: DojangBackgroundProps): JSX.Element {
  const [vitalPoints, setVitalPoints] = useState<readonly VitalPoint[]>([]);
  const { texture: logoTexture } = useTexture("/black-trigram-256.png");

  // Initialize vital points for Korean martial arts atmosphere
  useEffect(() => {
    const vitalPointTypes: readonly string[] = [
      "sternum",
      "solar_plexus",
      "throat",
      "temples",
      "pressure_points",
      "nerve_clusters",
      "circulation_points",
      "balance_points",
    ] as const;

    const newVitalPoints: VitalPoint[] = [];

    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * vitalPointTypes.length);
      const vitalPointType = vitalPointTypes[randomIndex] ?? "pressure_points";

      newVitalPoints.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        damage: Math.random() * 50 + 10,
        type: vitalPointType,
      });
    }

    setVitalPoints(newVitalPoints);
  }, []);

  // Enhanced dojang drawing with Korean martial arts elements
  const drawDojang = useCallback(
    (graphics: PixiGraphics): void => {
      graphics.clear();

      // Deep black background with subtle Korean pattern
      graphics.setFillStyle({ color: DARK_TRIGRAM_THEME.DARK_BG });
      graphics.rect(0, 0, window.innerWidth, window.innerHeight);
      graphics.fill();

      // Traditional Korean grid pattern (방격자)
      graphics.setStrokeStyle({
        color: DARK_TRIGRAM_THEME.GRID_CYAN,
        width: 1,
        alpha: 0.05,
      });

      const gridSize = 60;
      for (let y = 0; y < window.innerHeight; y += gridSize) {
        graphics.moveTo(0, y);
        graphics.lineTo(window.innerWidth, y);
        graphics.stroke();
      }

      for (let x = 0; x < window.innerWidth; x += gridSize) {
        graphics.moveTo(x, 0);
        graphics.lineTo(x, window.innerHeight);
        graphics.stroke();
      }

      // Central octagonal dojang platform (팔각 무대)
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const radius = Math.min(window.innerWidth, window.innerHeight) * 0.3;

      // Platform foundation
      graphics.setFillStyle({
        color: DARK_TRIGRAM_THEME.DARKER_BG,
        alpha: 0.8,
      });
      graphics.circle(centerX, centerY, radius + 20);
      graphics.fill();

      // Traditional Korean octagonal platform (팔각형)
      graphics.setStrokeStyle({
        color: DARK_TRIGRAM_THEME.PRIMARY_CYAN,
        width: 3,
        alpha: 0.8,
      });

      const octagonPoints: Array<{ x: number; y: number }> = [];
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        octagonPoints.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
        });
      }

      // Draw octagon martial arts platform
      if (octagonPoints.length > 0) {
        const firstPoint = octagonPoints[0];
        if (firstPoint) {
          graphics.moveTo(firstPoint.x, firstPoint.y);
          for (let i = 1; i < 8; i++) {
            const point = octagonPoints[i];
            if (point) {
              graphics.lineTo(point.x, point.y);
            }
          }
          graphics.closePath();
          graphics.stroke();
        }
      }

      // Inner training circle (내원)
      graphics.setStrokeStyle({
        color: DARK_TRIGRAM_THEME.PRIMARY_CYAN,
        width: 2,
        alpha: 0.6,
      });
      graphics.circle(centerX, centerY, radius * 0.7);
      graphics.stroke();

      // Meditation center with yin-yang inspiration
      const corePulse = Math.sin(gameTime * 0.03) * 0.4 + 0.6;

      // Outer meditation ring
      graphics.setStrokeStyle({
        color: DARK_TRIGRAM_THEME.TRADITIONAL_GOLD,
        width: 2,
        alpha: corePulse * 0.5,
      });
      graphics.circle(centerX, centerY, 40);
      graphics.stroke();

      // Inner core (단전)
      graphics.setFillStyle({
        color: DARK_TRIGRAM_THEME.PRIMARY_CYAN,
        alpha: corePulse * 0.4,
      });
      graphics.circle(centerX, centerY, 20);
      graphics.fill();

      // Central meditation point
      graphics.setFillStyle({
        color: DARK_TRIGRAM_THEME.WHITE,
        alpha: corePulse * 0.9,
      });
      graphics.circle(centerX, centerY, 6);
      graphics.fill();

      // Traditional Korean dojang corner markers (모서리 표식)
      const cornerMarkers = [
        { x: window.innerWidth * 0.1, y: window.innerHeight * 0.1 },
        { x: window.innerWidth * 0.9, y: window.innerHeight * 0.1 },
        { x: window.innerWidth * 0.1, y: window.innerHeight * 0.9 },
        { x: window.innerWidth * 0.9, y: window.innerHeight * 0.9 },
      ];

      cornerMarkers.forEach((marker, index) => {
        const markerPulse = Math.sin(gameTime * 0.02 + index * 1.5) * 0.3 + 0.7;

        // Corner shrine markers
        graphics.setStrokeStyle({
          color: DARK_TRIGRAM_THEME.KOREAN_RED,
          width: 2,
          alpha: markerPulse * 0.6,
        });
        graphics.rect(marker.x - 15, marker.y - 15, 30, 30);
        graphics.stroke();

        graphics.setFillStyle({
          color: DARK_TRIGRAM_THEME.TRADITIONAL_GOLD,
          alpha: markerPulse * 0.3,
        });
        graphics.circle(marker.x, marker.y, 8);
        graphics.fill();
      });

      // Dynamic vital point indicators (if enabled)
      if (showVitalPoints) {
        vitalPoints.forEach((point, index) => {
          const pointPulse =
            Math.sin(gameTime * 0.015 + index * 0.7) * 0.4 + 0.6;
          const distFromCenter = Math.sqrt(
            Math.pow(point.x - centerX, 2) + Math.pow(point.y - centerY, 2)
          );

          // Only show points outside the main combat area
          if (distFromCenter < radius - 80) return;

          // Vital point marker (급소점)
          graphics.setFillStyle({
            color: DARK_TRIGRAM_THEME.VITAL_ORANGE,
            alpha: pointPulse * 0.5,
          });
          graphics.circle(point.x, point.y, 4 + pointPulse * 2);
          graphics.fill();

          // Vital point energy ring
          graphics.setStrokeStyle({
            color: DARK_TRIGRAM_THEME.VITAL_ORANGE,
            width: 1,
            alpha: pointPulse * 0.4,
          });
          graphics.circle(point.x, point.y, 12 + pointPulse * 4);
          graphics.stroke();
        });
      }

      // Traditional Korean trigram positions (if enabled)
      if (showTrigramPositions) {
        const trigramPositions: readonly TrigramPosition[] = [
          {
            x: window.innerWidth * 0.2,
            y: window.innerHeight * 0.15,
            symbol: "☰",
            name: "Heaven",
            korean: "건",
          },
          {
            x: window.innerWidth * 0.8,
            y: window.innerHeight * 0.15,
            symbol: "☱",
            name: "Lake",
            korean: "태",
          },
          {
            x: window.innerWidth * 0.85,
            y: window.innerHeight * 0.5,
            symbol: "☲",
            name: "Fire",
            korean: "리",
          },
          {
            x: window.innerWidth * 0.8,
            y: window.innerHeight * 0.85,
            symbol: "☳",
            name: "Thunder",
            korean: "진",
          },
          {
            x: window.innerWidth * 0.2,
            y: window.innerHeight * 0.85,
            symbol: "☴",
            name: "Wind",
            korean: "손",
          },
          {
            x: window.innerWidth * 0.15,
            y: window.innerHeight * 0.5,
            symbol: "☵",
            name: "Water",
            korean: "감",
          },
          {
            x: window.innerWidth * 0.35,
            y: window.innerHeight * 0.25,
            symbol: "☶",
            name: "Mountain",
            korean: "간",
          },
          {
            x: window.innerWidth * 0.65,
            y: window.innerHeight * 0.75,
            symbol: "☷",
            name: "Earth",
            korean: "곤",
          },
        ] as const;

        trigramPositions.forEach((position, index) => {
          const trigramPulse =
            Math.sin(gameTime * 0.01 + index * 2) * 0.3 + 0.7;

          // Trigram shrine background
          graphics.setFillStyle({
            color: DARK_TRIGRAM_THEME.DARK_BG,
            alpha: trigramPulse * 0.8,
          });
          graphics.circle(position.x, position.y, 35);
          graphics.fill();

          // Trigram symbol border
          graphics.setStrokeStyle({
            color: DARK_TRIGRAM_THEME.PRIMARY_CYAN,
            width: 2,
            alpha: trigramPulse * 0.6,
          });
          graphics.circle(position.x, position.y, 35);
          graphics.stroke();
        });
      }

      // Traditional dojang entrance markers (입구 표식)
      graphics.setStrokeStyle({
        color: DARK_TRIGRAM_THEME.PRIMARY_CYAN,
        width: 3,
        alpha: 0.4,
      });

      // Top entrance
      graphics.moveTo(window.innerWidth / 2 - 30, 20);
      graphics.lineTo(window.innerWidth / 2 + 30, 20);
      graphics.stroke();

      // Side training area boundaries
      graphics.moveTo(20, window.innerHeight / 2 - 40);
      graphics.lineTo(20, window.innerHeight / 2 + 40);
      graphics.moveTo(window.innerWidth - 20, window.innerHeight / 2 - 40);
      graphics.lineTo(window.innerWidth - 20, window.innerHeight / 2 + 40);
      graphics.stroke();
    },
    [gameTime, vitalPoints, showVitalPoints, showTrigramPositions]
  );

  return (
    <pixiContainer data-testid="dojang-background">
      <pixiGraphics draw={drawDojang} data-testid="dojang-graphics" />

      {/* Black Trigram logo in corner */}
      {logoTexture && (
        <pixiSprite
          texture={logoTexture}
          x={window.innerWidth - 60}
          y={window.innerHeight - 60}
          scale={{ x: 0.12, y: 0.12 }}
          anchor={{ x: 0.5, y: 0.5 }}
          alpha={0.6}
          data-testid="logo-sprite"
        />
      )}

      {/* Traditional Korean trigram symbols overlay */}
      {showTrigramPositions && (
        <>
          {[
            {
              x: window.innerWidth * 0.2,
              y: window.innerHeight * 0.15,
              symbol: "☰",
              korean: "건",
            },
            {
              x: window.innerWidth * 0.8,
              y: window.innerHeight * 0.15,
              symbol: "☱",
              korean: "태",
            },
            {
              x: window.innerWidth * 0.85,
              y: window.innerHeight * 0.5,
              symbol: "☲",
              korean: "리",
            },
            {
              x: window.innerWidth * 0.8,
              y: window.innerHeight * 0.85,
              symbol: "☳",
              korean: "진",
            },
            {
              x: window.innerWidth * 0.2,
              y: window.innerHeight * 0.85,
              symbol: "☴",
              korean: "손",
            },
            {
              x: window.innerWidth * 0.15,
              y: window.innerHeight * 0.5,
              symbol: "☵",
              korean: "감",
            },
            {
              x: window.innerWidth * 0.35,
              y: window.innerHeight * 0.25,
              symbol: "☶",
              korean: "간",
            },
            {
              x: window.innerWidth * 0.65,
              y: window.innerHeight * 0.75,
              symbol: "☷",
              korean: "곤",
            },
          ].map((trigram, index) => (
            <pixiContainer
              key={index}
              x={trigram.x}
              y={trigram.y}
              data-testid={`trigram-overlay-${index}`}
            >
              <pixiText
                text={trigram.symbol}
                anchor={{ x: 0.5, y: 0.5 }}
                style={{
                  fontFamily: "serif",
                  fontSize: 28,
                  fill: DARK_TRIGRAM_THEME.WHITE,
                  fontWeight: "bold",
                  alpha: 0.7,
                }}
              />
              <pixiText
                text={trigram.korean}
                anchor={{ x: 0.5, y: 0.5 }}
                y={25}
                style={{
                  fontFamily: "Noto Sans KR",
                  fontSize: 12,
                  fill: DARK_TRIGRAM_THEME.PRIMARY_CYAN,
                  alpha: 0.6,
                }}
              />
            </pixiContainer>
          ))}
        </>
      )}

      {/* Technique effect display (if applicable) */}
      {/* {activeEffect && (
        <pixiContainer x={window.innerWidth / 2} y={window.innerHeight / 2}>
          <pixiGraphics
            draw={(g: PixiGraphics) => {
              g.clear();
              // Soft black background for effect
              g.setFillStyle({ color: 0x000000, alpha: 0.7 });
              g.circle(0, 0, 100);
              g.fill();
            }}
          />

          <pixiText
            text={activeEffect.name}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 24,
              fill: DARK_TRIGRAM_THEME.WHITE,
              fontWeight: "bold",
            }}
          />

          {/* Dynamic effect details (e.g., technique name, trigram) */}
      {/* {activeEffect.technique && (
            <pixiContainer y={40}>
              <pixiGraphics
                draw={(g: PixiGraphics) => {
                  g.clear();
                  // Traditional Korean panel background
                  g.setFillStyle({ color: 0x000000, alpha: alpha * 0.7 });
                  g.roundRect(-80, -12, 160, 24, 6);
                  g.fill();

                  // Traditional red border
                  g.setStrokeStyle({
                    color: 0x8b0000,
                    width: 1,
                    alpha: alpha * 0.8,
                  });
                  g.roundRect(-80, -12, 160, 24, 6);
                  g.stroke();
                }}
              />

              <pixiText
                text={effect.technique}
                anchor={{ x: 0.5, y: 0.5 }}
                scale={{ x: scale * 0.7, y: scale * 0.7 }}
                style={{
                  fontFamily: "Noto Sans KR",
                  fontSize: 14,
                  fill: DARK_TRIGRAM_THEME.WHITE,
                  fontWeight: "400",
                  dropShadow: {
                    color: 0x8b0000,
                    blur: 3,
                    distance: 0,
                  },
                }}
                alpha={alpha * 0.9}
              />
            </pixiContainer>
          )} */}

      {/* Trigram symbol for technique classification */}
      {/* {effect.trigram && (
            <pixiContainer y={-100}>
              <pixiGraphics
                draw={(g: PixiGraphics) => {
                  g.clear();
                  // Circular background for trigram
                  g.setFillStyle({
                    color: DARK_TRIGRAM_THEME.PRIMARY_CYAN,
                    alpha: alpha * 0.2,
                  });
                  g.circle(0, 0, 25);
                  g.fill();

                  g.setStrokeStyle({
                    color: DARK_TRIGRAM_THEME.PRIMARY_CYAN,
                    width: 2,
                    alpha: alpha * 0.6,
                  });
                  g.circle(0, 0, 25);
                  g.stroke();
                }}
              />

              <pixiText
                text={effect.trigram}
                anchor={{ x: 0.5, y: 0.5 }}
                scale={{ x: scale, y: scale }}
                style={{
                  fontFamily: "serif",
                  fontSize: 28,
                  fill: DARK_TRIGRAM_THEME.WHITE,
                  fontWeight: "bold",
                }}
                alpha={alpha * 0.8}
              />
            </pixiContainer>
          )} */}
    </pixiContainer>
  );
}
