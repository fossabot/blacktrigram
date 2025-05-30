import { extend } from "@pixi/react";
import {
  Container as PixiContainer,
  Graphics as PixiGraphics,
  Text as PixiText,
  Sprite as PixiSprite,
} from "pixi.js";
import { PixiGraphicsType } from ".";

// Extend PixiJS objects to make them available as React components
extend({
  Container: PixiContainer,
  Graphics: PixiGraphics,
  Text: PixiText,
  Sprite: PixiSprite,
});

// Re-export extended components for consistency
// These will be available as <pixiContainer>, <pixiGraphics>, etc.
export { extend };

// Export types for draw callbacks and other PixiJS usage
export type {
  Graphics as PixiGraphicsType,
  Container as PixiContainerType,
  Text as PixiTextType,
  Sprite as PixiSpriteType,
  TextStyle,
  Texture,
  FederatedPointerEvent,
} from "pixi.js";

// Korean-specific colors for styling
export const KOREAN_COLORS = {
  TRADITIONAL_RED: 0x8a0000,
  GOLD: 0xffd700,
  BLACK: 0x000000,
  WHITE: 0xffffff,
  DOJANG_BLUE: 0x4a89e2,
  CYAN: 0x00ffff,
  DARK_BLUE: 0x000a12,
  ACCENT_BLUE: 0x004455,
} as const;

// Korean text default style
export const KOREAN_TEXT_STYLE = {
  fontFamily: "Noto Sans KR, Arial, sans-serif",
  fontSize: 16,
  fill: KOREAN_COLORS.WHITE,
} as const;

// Traditional Korean background pattern helper
export const drawKoreanBackground = (
  graphics: PixiGraphics,
  width: number = 800,
  height: number = 600
) => {
  graphics.clear();

  // Dark background
  graphics.setFillStyle({ color: KOREAN_COLORS.DARK_BLUE, alpha: 0.9 });
  graphics.rect(0, 0, width, height);
  graphics.fill();

  // Traditional border
  graphics.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 2 });
  graphics.rect(10, 10, width - 20, height - 20);
  graphics.stroke();

  // Corner decorations
  graphics.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 3 });

  // Top-left corner
  graphics.moveTo(10, 30);
  graphics.lineTo(10, 10);
  graphics.lineTo(30, 10);

  // Top-right corner
  graphics.moveTo(width - 30, 10);
  graphics.lineTo(width - 10, 10);
  graphics.lineTo(width - 10, 30);

  // Bottom-right corner
  graphics.moveTo(width - 10, height - 30);
  graphics.lineTo(width - 10, height - 10);
  graphics.lineTo(width - 30, height - 10);

  // Bottom-left corner
  graphics.moveTo(30, height - 10);
  graphics.lineTo(10, height - 10);
  graphics.lineTo(10, height - 30);

  graphics.stroke();
};

// Trigram symbol helper
export const getTrigramSymbol = (stance: string): string => {
  const symbols: Record<string, string> = {
    geon: "☰", // Heaven
    tae: "☱", // Lake
    li: "☲", // Fire
    jin: "☳", // Thunder
    son: "☴", // Wind
    gam: "☵", // Water
    gan: "☶", // Mountain
    gon: "☷", // Earth
  };
  return symbols[stance] || "?";
};

// Helper for Korean martial arts energy aura
export const drawEnergyAura = (
  graphics: PixiGraphics,
  x: number,
  y: number,
  radius: number,
  color: number,
  alpha: number = 0.6
) => {
  graphics.setStrokeStyle({ color, width: 4, alpha });
  graphics.circle(x, y, radius);
  graphics.stroke();

  // Inner glow
  graphics.setStrokeStyle({ color, width: 2, alpha: alpha * 0.5 });
  graphics.circle(x, y, radius * 0.8);
  graphics.stroke();
};

// Helper for drawing Korean martial artist silhouette
export const drawMartialArtist = (
  graphics: PixiGraphicsType,
  x: number = 0,
  y: number = 0,
  stance: string = "geon"
) => {
  graphics.clear();
  graphics.position.set(x, y);

  // Traditional Korean martial arts uniform (dobok)
  graphics.setFillStyle({ color: KOREAN_COLORS.WHITE, alpha: 0.9 });
  graphics.rect(-25, -90, 50, 90);
  graphics.fill();

  // Belt (red for master level)
  graphics.setFillStyle({ color: KOREAN_COLORS.TRADITIONAL_RED });
  graphics.rect(-27, -25, 54, 10);
  graphics.fill();

  // Head
  graphics.setFillStyle({ color: 0xfdbcb4 }); // Skin tone
  graphics.circle(0, -100, 15);
  graphics.fill();

  // Stance-specific posture adjustments
  const stanceColors: Record<string, number> = {
    geon: KOREAN_COLORS.GOLD, // Heaven - Gold
    tae: 0x87ceeb, // Lake - Sky Blue
    li: 0xff4500, // Fire - Red Orange
    jin: 0x9370db, // Thunder - Purple
    son: 0x98fb98, // Wind - Pale Green
    gam: KOREAN_COLORS.DOJANG_BLUE, // Water - Blue
    gan: 0x8b4513, // Mountain - Brown
    gon: 0x654321, // Earth - Dark Brown
  };

  // Stance energy indicator
  const stanceColor = stanceColors[stance] || KOREAN_COLORS.WHITE;
  graphics.setStrokeStyle({ color: stanceColor, width: 3, alpha: 0.8 });
  graphics.circle(0, -45, 50);
  graphics.stroke();
};
