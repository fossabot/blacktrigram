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
} as const;

interface DojangBackgroundProps {
  readonly gameTime: number;
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
}

export function DojangBackground({
  gameTime,
}: DojangBackgroundProps): JSX.Element {
  const [vitalPoints, setVitalPoints] = useState<readonly VitalPoint[]>([]);
  const { texture: logoTexture } = useTexture("/dark-trigram-256.png");

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
    
    for (let i = 0; i < 12; i++) {
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

      // Deep black background
      graphics.setFillStyle({ color: DARK_TRIGRAM_THEME.DARK_BG });
      graphics.rect(0, 0, window.innerWidth, window.innerHeight);
      graphics.fill();

      // Subtle animated grid pattern
      graphics.setStrokeStyle({ 
        color: DARK_TRIGRAM_THEME.GRID_CYAN, 
        width: 1, 
        alpha: 0.03 
      });
      
      const gridSize = 40;
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

      // Central octagonal dojang platform
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const radius = Math.min(window.innerWidth, window.innerHeight) * 0.25;

      // Platform base
      graphics.setFillStyle({ color: DARK_TRIGRAM_THEME.DARKER_BG });
      graphics.circle(centerX, centerY, radius);
      graphics.fill();

      // Traditional Korean octagonal platform outline
      graphics.setStrokeStyle({ 
        color: DARK_TRIGRAM_THEME.PRIMARY_CYAN, 
        width: 2, 
        alpha: 0.6 
      });
      
      const octagonPoints: Array<{ x: number; y: number }> = [];
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4 - Math.PI / 8;
        octagonPoints.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
        });
      }

      // Draw octagon outline
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

      // Pulsing center core with yin-yang inspiration
      const corePulse = Math.sin(gameTime * 0.05) * 0.3 + 0.7;
      
      // Outer glow
      graphics.setStrokeStyle({
        color: DARK_TRIGRAM_THEME.PRIMARY_CYAN,
        width: 3,
        alpha: corePulse * 0.4,
      });
      graphics.circle(centerX, centerY, 30);
      graphics.stroke();

      // Inner core
      graphics.setFillStyle({ 
        color: DARK_TRIGRAM_THEME.PRIMARY_CYAN, 
        alpha: corePulse * 0.6 
      });
      graphics.circle(centerX, centerY, 12);
      graphics.fill();

      // Central dot (meditation point)
      graphics.setFillStyle({
        color: DARK_TRIGRAM_THEME.WHITE,
        alpha: corePulse * 0.8,
      });
      graphics.circle(centerX, centerY, 4);
      graphics.fill();

      // Dynamic vital point indicators
      vitalPoints.forEach((point, index) => {
        const pointPulse = Math.sin(gameTime * 0.01 + index * 0.5) * 0.3 + 0.7;
        const distFromCenter = Math.sqrt(
          Math.pow(point.x - centerX, 2) + Math.pow(point.y - centerY, 2)
        );

        // Only show points outside the main combat area
        if (distFromCenter < radius - 50) return;

        // Vital point marker
        graphics.setFillStyle({
          color: DARK_TRIGRAM_THEME.VITAL_ORANGE,
          alpha: pointPulse * 0.4,
        });
        graphics.circle(point.x, point.y, 3 + pointPulse * 2);
        graphics.fill();

        // Vital point ring
        graphics.setStrokeStyle({
          color: DARK_TRIGRAM_THEME.VITAL_ORANGE,
          width: 1,
          alpha: pointPulse * 0.3,
        });
        graphics.circle(point.x, point.y, 8 + pointPulse * 3);
        graphics.stroke();
      });

      // Traditional Korean dojang boundary markers
      const trigramPositions: readonly TrigramPosition[] = [
        { x: window.innerWidth * 0.15, y: window.innerHeight * 0.2, symbol: "☰", name: "Heaven" },
        { x: window.innerWidth * 0.85, y: window.innerHeight * 0.2, symbol: "☱", name: "Lake" },
        { x: window.innerWidth * 0.15, y: window.innerHeight * 0.8, symbol: "☲", name: "Fire" },
        { x: window.innerWidth * 0.85, y: window.innerHeight * 0.8, symbol: "☳", name: "Thunder" },
      ] as const;

      trigramPositions.forEach((position, index) => {
        const trigramPulse = Math.sin(gameTime * 0.008 + index * 1.5) * 0.2 + 0.8;
        
        // Trigram symbol background
        graphics.setFillStyle({
          color: DARK_TRIGRAM_THEME.PRIMARY_CYAN,
          alpha: trigramPulse * 0.1,
        });
        graphics.circle(position.x, position.y, 25);
        graphics.fill();

        // Trigram symbol border
        graphics.setStrokeStyle({
          color: DARK_TRIGRAM_THEME.PRIMARY_CYAN,
          width: 1,
          alpha: trigramPulse * 0.3,
        });
        graphics.circle(position.x, position.y, 25);
        graphics.stroke();
      });

      // Corner accent lines for dojang atmosphere
      graphics.setStrokeStyle({ 
        color: DARK_TRIGRAM_THEME.PRIMARY_CYAN, 
        width: 1, 
        alpha: 0.3
      });
      
      // Top corners
      graphics.moveTo(0, 0);
      graphics.lineTo(50, 0);
      graphics.moveTo(0, 0);
      graphics.lineTo(0, 50);
      graphics.moveTo(window.innerWidth, 0);
      graphics.lineTo(window.innerWidth - 50, 0);
      graphics.moveTo(window.innerWidth, 0);
      graphics.lineTo(window.innerWidth, 50);
      
      // Bottom corners
      graphics.moveTo(0, window.innerHeight);
      graphics.lineTo(50, window.innerHeight);
      graphics.moveTo(0, window.innerHeight);
      graphics.lineTo(0, window.innerHeight - 50);
      graphics.moveTo(window.innerWidth, window.innerHeight);
      graphics.lineTo(window.innerWidth - 50, window.innerHeight);
      graphics.moveTo(window.innerWidth, window.innerHeight);
      graphics.lineTo(window.innerWidth, window.innerHeight - 50);
      graphics.stroke();
    },
    [gameTime, vitalPoints]
  );

  return (
    <pixiContainer>
      <pixiGraphics draw={drawDojang} />
    
      {/* Dark Trigram logo in bottom right corner */}
      {logoTexture && (
        <pixiSprite
          texture={logoTexture}
          x={window.innerWidth - 50}
          y={window.innerHeight - 50}
          scale={{ x: 0.15, y: 0.15 }}
          anchor={{ x: 0.5, y: 0.5 }}
          alpha={0.5}
        />
      )}
    </pixiContainer>
  );
}
