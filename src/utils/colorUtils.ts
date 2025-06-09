import * as PIXI from "pixi.js";

/**
 * Utility functions for converting between different color formats
 * Used throughout Black Trigram for PixiJS and CSS compatibility
 */

/**
 * Convert numeric color to hex string for CSS
 */
export function numericToHex(color: number): string {
  return `#${color.toString(16).padStart(6, "0")}`;
}

/**
 * Convert hex string to numeric color for PixiJS
 */
export function hexToNumeric(hex: string): number {
  return parseInt(hex.replace("#", ""), 16);
}

/**
 * Convert KOREAN_COLORS numeric values to CSS-compatible colors
 */
export function convertKoreanColorForCSS(colorValue: number | string): string {
  if (typeof colorValue === "string") {
    return colorValue;
  }
  return numericToHex(colorValue);
}

/**
 * Ensure color is valid for PixiJS (numeric)
 */
export function ensurePixiColor(color: number | string): number {
  if (typeof color === "number") {
    return color;
  }
  return hexToNumeric(color);
}

/**
 * Color utility functions for Korean cyberpunk martial arts aesthetic
 */

import { KOREAN_COLORS } from "../types/constants";
import type { TrigramStance } from "../types";

export interface HSL {
  h: number; // Hue: 0-360
  s: number; // Saturation: 0-100
  l: number; // Lightness: 0-100
}

// RGB interface
export interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: number): RGB {
  return {
    r: (hex >> 16) & 255,
    g: (hex >> 8) & 255,
    b: hex & 255,
  };
}

/**
 * Convert RGB to hex color
 */
export function rgbToHex(r: number, g: number, b: number): number {
  return (r << 16) | (g << 8) | b;
}

/**
 * Convert hex color to HSL
 */
export function hexToHsl(hex: number): HSL {
  const rgb = hexToRgb(hex);
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

/**
 * Convert RGB to HSL
 */
export function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Convert HSL to RGB
 */
export function hslToRgb(h: number, s: number, l: number): RGB {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Convert HSL to hex
 */
export function hslToHex(h: number, s: number, l: number): number {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

/**
 * Darken a color by reducing lightness
 */
export function darkenColor(hex: number, amount: number): number {
  const hsl = hexToHsl(hex);
  hsl.l = Math.max(0, hsl.l - amount);
  return hslToHex(hsl.h, hsl.s, hsl.l);
}

/**
 * Lighten a color by increasing lightness
 */
export function lightenColor(hex: number, amount: number): number {
  const hsl = hexToHsl(hex);
  hsl.l = Math.min(100, hsl.l + amount);
  return hslToHex(hsl.h, hsl.s, hsl.l);
}

/**
 * Adjust color saturation
 */
export function adjustSaturation(hex: number, amount: number): number {
  const hsl = hexToHsl(hex);
  hsl.s = Math.max(0, Math.min(100, hsl.s + amount));
  return hslToHex(hsl.h, hsl.s, hsl.l);
}

/**
 * Color utility functions for Korean martial arts aesthetics
 */

import { KOREAN_COLORS } from "../types/constants";

/**
 * Blend two colors together
 */
export function blendColors(
  color1: number,
  color2: number,
  ratio: number = 0.5
): number {
  const r1 = (color1 >> 16) & 0xff;
  const g1 = (color1 >> 8) & 0xff;
  const b1 = color1 & 0xff;

  const r2 = (color2 >> 16) & 0xff;
  const g2 = (color2 >> 8) & 0xff;
  const b2 = color2 & 0xff;

  const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
  const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
  const b = Math.round(b1 * (1 - ratio) + b2 * ratio);

  return (r << 16) | (g << 8) | b;
}

/**
 * Darken a color by a percentage
 */
export function darkenColor(color: number, amount: number = 0.1): number {
  const { r, g, b } = hexToRgb(color);
  const factor = 1 - amount;
  return rgbToHex(
    Math.round(r * factor),
    Math.round(g * factor),
    Math.round(b * factor)
  );
}

/**
 * Lighten a color by a percentage
 */
export function lightenColor(color: number, amount: number = 0.1): number {
  const { r, g, b } = hexToRgb(color);
  const factor = amount;
  return rgbToHex(
    Math.min(255, Math.round(r + (255 - r) * factor)),
    Math.min(255, Math.round(g + (255 - g) * factor)),
    Math.min(255, Math.round(b + (255 - b) * factor))
  );
}

/**
 * Get color for health percentage
 */
export function getHealthColor(healthPercent: number): number {
  if (healthPercent > 0.75) return KOREAN_COLORS.POSITIVE_GREEN;
  if (healthPercent > 0.5) return KOREAN_COLORS.SECONDARY_YELLOW;
  if (healthPercent > 0.25) return KOREAN_COLORS.WARNING_ORANGE;
  return KOREAN_COLORS.NEGATIVE_RED;
}

/**
 * Get color for damage type
 */
export function getDamageTypeColor(damageType: string): number {
  switch (damageType) {
    case "critical":
      return KOREAN_COLORS.CRITICAL_HIT;
    case "vital_point":
      return KOREAN_COLORS.VITAL_POINT_HIT;
    case "blocked":
      return KOREAN_COLORS.BLOCKED_ATTACK;
    case "perfect":
      return KOREAN_COLORS.PERFECT_STRIKE;
    default:
      return KOREAN_COLORS.TEXT_PRIMARY;
  }
}

/**
 * Add alpha to a color
 */
export function addAlpha(color: number, alpha: number): string {
  const hex = color.toString(16).padStart(6, "0");
  const alphaHex = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${hex}${alphaHex}`;
}

/**
 * Get trigram stance color
 */
export function getTrigramColor(stance: string): number {
  switch (stance) {
    case "geon":
      return KOREAN_COLORS.TRIGRAM_GEON_PRIMARY;
    case "tae":
      return KOREAN_COLORS.TRIGRAM_TAE_PRIMARY;
    case "li":
      return KOREAN_COLORS.TRIGRAM_LI_PRIMARY;
    case "jin":
      return KOREAN_COLORS.TRIGRAM_JIN_PRIMARY;
    case "son":
      return KOREAN_COLORS.TRIGRAM_SON_PRIMARY;
    case "gam":
      return KOREAN_COLORS.TRIGRAM_GAM_PRIMARY;
    case "gan":
      return KOREAN_COLORS.TRIGRAM_GAN_PRIMARY;
    case "gon":
      return KOREAN_COLORS.TRIGRAM_GON_PRIMARY;
    default:
      return KOREAN_COLORS.TEXT_PRIMARY;
  }
}

/**
 * Create gradient color array for smooth transitions
 */
export function createGradient(
  startColor: number,
  endColor: number,
  steps: number
): number[] {
  const gradient: number[] = [];
  for (let i = 0; i < steps; i++) {
    const ratio = i / (steps - 1);
    gradient.push(blendColors(startColor, endColor, ratio));
  }
  return gradient;
}

/**
 * Color utilities for Korean martial arts theming
 */

/**
 * Convert hex color to PIXI color number
 */
export function hexToPixi(hex: string): number {
  return parseInt(hex.replace("#", ""), 16);
}

/**
 * Convert RGB values to PIXI color number
 */
export function rgbToPixi(r: number, g: number, b: number): number {
  return (r << 16) | (g << 8) | b;
}

/**
 * Get color with alpha
 */
export function colorWithAlpha(color: number, alpha: number): number {
  return (Math.floor(alpha * 255) << 24) | color;
}

/**
 * Interpolate between two colors
 */
export function interpolateColor(
  color1: number,
  color2: number,
  factor: number
): number {
  const r1 = (color1 >> 16) & 0xff;
  const g1 = (color1 >> 8) & 0xff;
  const b1 = color1 & 0xff;

  const r2 = (color2 >> 16) & 0xff;
  const g2 = (color2 >> 8) & 0xff;
  const b2 = color2 & 0xff;

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return rgbToPixi(r, g, b);
}

/**
 * Get Korean martial arts themed colors
 */
export const KOREAN_THEME_COLORS = {
  CRIMSON: 0xdc143c,
  GOLD: 0xffd700,
  JADE: 0x00a86b,
  MIDNIGHT: 0x191970,
  SILVER: 0xc0c0c0,
  BRONZE: 0xcd7f32,
} as const;

/**
 * Get archetype color scheme
 */
export function getArchetypeColors(archetype: string): {
  primary: number;
  secondary: number;
  accent: number;
} {
  switch (archetype) {
    case "musa":
      return {
        primary: KOREAN_THEME_COLORS.CRIMSON,
        secondary: KOREAN_THEME_COLORS.GOLD,
        accent: KOREAN_THEME_COLORS.SILVER,
      };
    case "amsalja":
      return {
        primary: KOREAN_THEME_COLORS.MIDNIGHT,
        secondary: KOREAN_THEME_COLORS.SILVER,
        accent: KOREAN_THEME_COLORS.JADE,
      };
    default:
      return {
        primary: KOREAN_THEME_COLORS.GOLD,
        secondary: KOREAN_THEME_COLORS.CRIMSON,
        accent: KOREAN_THEME_COLORS.SILVER,
      };
  }
}

export const ColorUtils = {
  hexToPixi,
  pixiToHex,
  getArchetypeColor,
};

export default {
  numericToHex,
  hexToNumeric,
  convertKoreanColorForCSS,
  ensurePixiColor,
  hexToRgb,
  rgbToHex,
  hexToHsl,
  rgbToHsl,
  hslToRgb,
  hslToHex,
  darkenColor,
  lightenColor,
  adjustSaturation,
  blendColors,
  getHealthColor,
  getDamageTypeColor,
  addAlpha,
  getTrigramColor,
  createGradient,
  ...ColorUtils,
};
