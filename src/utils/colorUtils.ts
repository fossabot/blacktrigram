/**
 * @fileoverview Color utility functions for Korean martial arts game
 * @description Helper functions for color manipulation, Korean traditional colors, and UI theming
 */

import { PlayerArchetype } from "../types/enums";
import { KOREAN_COLORS } from "../types/constants";

/**
 * Color utility functions for Korean martial arts game aesthetics
 * Provides consistent color management with Korean traditional color theory
 */

export interface ArchetypeColorScheme {
  readonly primary: number;
  readonly secondary: number;
  readonly accent: number;
  readonly background: number;
  readonly text: number;
}

/**
 * Converts hex color to RGB values
 */
export function hexToRgb(
  hex: string
): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Converts RGB values to hex color
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Converts hex color to PIXI color number
 */
export function hexToPixiColor(hex: string): number {
  return parseInt(hex.replace("#", ""), 16);
}

/**
 * Converts PIXI color number to hex string
 */
export function pixiColorToHex(color: number): string {
  return "#" + color.toString(16).padStart(6, "0");
}

/**
 * Blends two colors together
 */
export function blendColors(
  color1: string,
  color2: string,
  ratio: number
): string {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return color1;

  const r = Math.round(rgb1.r * (1 - ratio) + rgb2.r * ratio);
  const g = Math.round(rgb1.g * (1 - ratio) + rgb2.g * ratio);
  const b = Math.round(rgb1.b * (1 - ratio) + rgb2.b * ratio);

  return rgbToHex(r, g, b);
}

/**
 * Gets traditional Korean color based on trigram
 */
export function getTrigramColor(trigram: string): number {
  const trigramColors: Record<string, number> = {
    geon: KOREAN_COLORS.TRIGRAM_GEON_PRIMARY,
    tae: KOREAN_COLORS.TRIGRAM_TAE_PRIMARY,
    li: KOREAN_COLORS.TRIGRAM_LI_PRIMARY,
    jin: KOREAN_COLORS.TRIGRAM_JIN_PRIMARY,
    son: KOREAN_COLORS.TRIGRAM_SON_PRIMARY,
    gam: KOREAN_COLORS.TRIGRAM_GAM_PRIMARY,
    gan: KOREAN_COLORS.TRIGRAM_GAN_PRIMARY,
    gon: KOREAN_COLORS.TRIGRAM_GON_PRIMARY,
  };

  return trigramColors[trigram.toLowerCase()] || KOREAN_COLORS.NEUTRAL_GRAY;
}

/**
 * Gets archetype-specific color scheme
 */
export function getArchetypeColors(
  archetype: PlayerArchetype
): ArchetypeColorScheme {
  switch (archetype) {
    case PlayerArchetype.MUSA:
      return {
        primary: KOREAN_COLORS.TRIGRAM_GEON_PRIMARY,
        secondary: KOREAN_COLORS.TRIGRAM_GEON_SECONDARY,
        accent: KOREAN_COLORS.ACCENT_GOLD,
        background: KOREAN_COLORS.UI_BACKGROUND_DARK,
        text: KOREAN_COLORS.TEXT_PRIMARY,
      };

    case PlayerArchetype.AMSALJA:
      return {
        primary: KOREAN_COLORS.TRIGRAM_SON_PRIMARY,
        secondary: KOREAN_COLORS.TRIGRAM_SON_SECONDARY,
        accent: KOREAN_COLORS.ACCENT_PURPLE,
        background: KOREAN_COLORS.UI_BACKGROUND_DARK,
        text: KOREAN_COLORS.TEXT_PRIMARY,
      };

    case PlayerArchetype.HACKER:
      return {
        primary: KOREAN_COLORS.PRIMARY_CYAN,
        secondary: KOREAN_COLORS.ACCENT_CYAN,
        accent: KOREAN_COLORS.ACCENT_BLUE,
        background: KOREAN_COLORS.UI_BACKGROUND_DARK,
        text: KOREAN_COLORS.TEXT_PRIMARY,
      };

    case PlayerArchetype.JEONGBO_YOWON:
      return {
        primary: KOREAN_COLORS.TRIGRAM_TAE_PRIMARY,
        secondary: KOREAN_COLORS.TRIGRAM_TAE_SECONDARY,
        accent: KOREAN_COLORS.ACCENT_MAGENTA,
        background: KOREAN_COLORS.UI_BACKGROUND_DARK,
        text: KOREAN_COLORS.TEXT_PRIMARY,
      };

    case PlayerArchetype.JOJIK_POKRYEOKBAE:
      return {
        primary: KOREAN_COLORS.TRIGRAM_JIN_PRIMARY,
        secondary: KOREAN_COLORS.TRIGRAM_JIN_SECONDARY,
        accent: KOREAN_COLORS.ACCENT_RED,
        background: KOREAN_COLORS.UI_BACKGROUND_DARK,
        text: KOREAN_COLORS.TEXT_PRIMARY,
      };

    default:
      return {
        primary: KOREAN_COLORS.NEUTRAL_GRAY,
        secondary: KOREAN_COLORS.UI_GRAY,
        accent: KOREAN_COLORS.ACCENT_GOLD,
        background: KOREAN_COLORS.UI_BACKGROUND_DARK,
        text: KOREAN_COLORS.TEXT_PRIMARY,
      };
  }
}

/**
 * Applies alpha transparency to a color
 */
export function applyAlpha(color: number, alpha: number): number {
  const r = (color >> 16) & 0xff;
  const g = (color >> 8) & 0xff;
  const b = color & 0xff;
  const a = Math.round(alpha * 255);

  return (a << 24) | (r << 16) | (g << 8) | b;
}

/**
 * Creates a gradient between two colors
 */
export function createGradient(
  startColor: number,
  endColor: number,
  steps: number
): number[] {
  const gradient: number[] = [];

  for (let i = 0; i < steps; i++) {
    const ratio = i / (steps - 1);
    const startHex = pixiColorToHex(startColor);
    const endHex = pixiColorToHex(endColor);
    const blended = blendColors(startHex, endHex, ratio);
    gradient.push(hexToPixiColor(blended));
  }

  return gradient;
}

/**
 * Gets traditional Korean five-element colors
 */
export function getFiveElementColor(
  element: "wood" | "fire" | "earth" | "metal" | "water"
): number {
  const elementColors = {
    wood: 0x4a7c59, // Green
    fire: 0xd73027, // Red
    earth: 0xf4a582, // Yellow/Orange
    metal: 0xd9d9d9, // White/Silver
    water: 0x4575b4, // Blue
  };

  return elementColors[element];
}

/**
 * Generates a color palette based on Korean traditional aesthetics
 */
export function generateKoreanPalette(baseColor: number): {
  primary: number;
  secondary: number;
  tertiary: number;
  accent: number;
} {
  const baseHex = pixiColorToHex(baseColor);

  return {
    primary: baseColor,
    secondary: hexToPixiColor(blendColors(baseHex, "#FFFFFF", 0.3)),
    tertiary: hexToPixiColor(blendColors(baseHex, "#000000", 0.3)),
    accent: hexToPixiColor(blendColors(baseHex, "#FFD700", 0.5)), // Gold accent
  };
}

/**
 * Gets health-based color with Korean aesthetic
 */
export function getHealthColor(healthPercentage: number): number {
  if (healthPercentage > 0.7) return KOREAN_COLORS.POSITIVE_GREEN;
  if (healthPercentage > 0.4) return KOREAN_COLORS.WARNING_YELLOW;
  if (healthPercentage > 0.2) return KOREAN_COLORS.WARNING_ORANGE;
  return KOREAN_COLORS.NEGATIVE_RED;
}

/**
 * Gets combat state color
 */
export function getCombatStateColor(state: string): number {
  switch (state) {
    case "attacking":
      return KOREAN_COLORS.ACCENT_RED;
    case "defending":
      return KOREAN_COLORS.ACCENT_BLUE;
    case "stunned":
      return KOREAN_COLORS.WARNING_YELLOW;
    case "countering":
      return KOREAN_COLORS.ACCENT_PURPLE;
    default:
      return KOREAN_COLORS.NEUTRAL_GRAY;
  }
}

/**
 * Applies Korean traditional color harmony principles
 */
export function applyKoreanColorHarmony(
  baseColor: number,
  intensity: number = 1.0
): number {
  // Implement traditional Korean color theory adjustments
  return baseColor;
}
