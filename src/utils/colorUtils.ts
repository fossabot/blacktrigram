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

export interface RGB {
  r: number; // Red: 0-255
  g: number; // Green: 0-255
  b: number; // Blue: 0-255
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
 * Create a gradient color between two colors
 */
export function blendColors(
  color1: number,
  color2: number,
  ratio: number
): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * ratio);
  const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * ratio);
  const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * ratio);

  return rgbToHex(r, g, b);
}

/**
 * Get Korean martial arts themed color based on archetype
 */
export function getArchetypeColor(archetype: string): number {
  switch (archetype) {
    case "musa":
      return KOREAN_COLORS.SECONDARY_BROWN; // Traditional warrior - brown/gold
    case "amsalja":
      return KOREAN_COLORS.SECONDARY_PURPLE_DARK; // Shadow assassin - dark purple
    case "hacker":
      return KOREAN_COLORS.PRIMARY_CYAN; // Cyber warrior - cyan
    case "jeongbo_yowon":
      return KOREAN_COLORS.SECONDARY_BLUE; // Intelligence - blue
    case "jojik_pokryeokbae":
      return KOREAN_COLORS.ACCENT_RED; // Crime - red
    default:
      return KOREAN_COLORS.TEXT_PRIMARY;
  }
}

/**
 * Get stance-based color for trigram system
 */
export function getTrigramColor(stance: string): number {
  switch (stance) {
    case "geon": // Heaven - bright gold
      return KOREAN_COLORS.ACCENT_GOLD;
    case "tae": // Lake - blue
      return KOREAN_COLORS.PRIMARY_BLUE;
    case "li": // Fire - red/orange
      return KOREAN_COLORS.ACCENT_RED;
    case "jin": // Thunder - electric blue
      return KOREAN_COLORS.PRIMARY_CYAN;
    case "son": // Wind - green
      return KOREAN_COLORS.POSITIVE_GREEN;
    case "gam": // Water - deep blue
      return KOREAN_COLORS.SECONDARY_BLUE_DARK;
    case "gan": // Mountain - brown
      return KOREAN_COLORS.SECONDARY_BROWN;
    case "gon": // Earth - yellow/brown
      return KOREAN_COLORS.SECONDARY_YELLOW;
    default:
      return KOREAN_COLORS.TEXT_SECONDARY;
  }
}

/**
 * Create cyberpunk glow effect color
 */
export function createGlowColor(
  baseColor: number,
  intensity: number = 0.5
): number {
  const hsl = hexToHsl(baseColor);
  // Increase saturation and lightness for glow effect
  hsl.s = Math.min(100, hsl.s + intensity * 30);
  hsl.l = Math.min(80, hsl.l + intensity * 20);
  return hslToHex(hsl.h, hsl.s, hsl.l);
}

/**
 * Get damage-based color for visual feedback
 */
export function getDamageColor(
  damage: number,
  maxDamage: number = 100
): number {
  const ratio = Math.min(1, damage / maxDamage);

  if (ratio < 0.3) {
    // Light damage - green to yellow
    return blendColors(
      KOREAN_COLORS.POSITIVE_GREEN,
      KOREAN_COLORS.ACCENT_YELLOW,
      ratio * 3.33
    );
  } else if (ratio < 0.7) {
    // Medium damage - yellow to orange
    return blendColors(
      KOREAN_COLORS.ACCENT_YELLOW,
      KOREAN_COLORS.WARNING_ORANGE,
      (ratio - 0.3) * 2.5
    );
  } else {
    // Heavy damage - orange to red
    return blendColors(
      KOREAN_COLORS.WARNING_ORANGE,
      KOREAN_COLORS.ACCENT_RED,
      (ratio - 0.7) * 3.33
    );
  }
}

/**
 * Generate Korean martial arts combat palette
 */
export function generateCombatPalette(primaryColor: number) {
  return {
    primary: primaryColor,
    secondary: adjustSaturation(darkenColor(primaryColor, 20), -20),
    accent: lightenColor(adjustSaturation(primaryColor, 30), 15),
    glow: createGlowColor(primaryColor, 0.8),
    dark: darkenColor(primaryColor, 40),
    light: lightenColor(primaryColor, 30),
  };
}

/**
 * Get health-based color transition
 */
export function getHealthColor(
  currentHealth: number,
  maxHealth: number
): number {
  const ratio = currentHealth / maxHealth;

  if (ratio > 0.6) {
    return KOREAN_COLORS.POSITIVE_GREEN;
  } else if (ratio > 0.3) {
    return blendColors(
      KOREAN_COLORS.ACCENT_RED,
      KOREAN_COLORS.ACCENT_YELLOW,
      (ratio - 0.3) / 0.3
    );
  } else {
    return KOREAN_COLORS.ACCENT_RED;
  }
}

/**
 * Apply cyberpunk color filter effect
 */
export function applyCyberpunkFilter(
  color: number,
  filterType: "neon" | "matrix" | "retro" = "neon"
): number {
  const hsl = hexToHsl(color);

  switch (filterType) {
    case "neon":
      // Enhance saturation and add cyan tint
      hsl.s = Math.min(100, hsl.s + 40);
      hsl.h = (hsl.h + 180) % 360; // Shift hue towards cyan
      return hslToHex(hsl.h, hsl.s, hsl.l);

    case "matrix":
      // Green-tinted matrix effect
      return blendColors(color, KOREAN_COLORS.POSITIVE_GREEN, 0.3);

    case "retro":
      // Pink/purple retro wave effect
      return blendColors(color, KOREAN_COLORS.SECONDARY_PURPLE, 0.4);

    default:
      return color;
  }
}

/**
 * Validate color contrast for accessibility
 */
export function getContrastRatio(color1: number, color2: number): number {
  const getLuminance = (color: number) => {
    const rgb = hexToRgb(color);
    const sRGB = [rgb.r, rgb.g, rgb.b].map((c) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Ensure sufficient contrast for Korean text readability
 */
export function ensureReadableContrast(
  textColor: number,
  backgroundColor: number
): number {
  const contrastRatio = getContrastRatio(textColor, backgroundColor);

  if (contrastRatio < 4.5) {
    // WCAG AA standard
    // Adjust text color for better contrast
    const textHsl = hexToHsl(textColor);
    const bgHsl = hexToHsl(backgroundColor);

    if (bgHsl.l > 50) {
      // Light background, darken text
      textHsl.l = Math.max(0, textHsl.l - 50);
    } else {
      // Dark background, lighten text
      textHsl.l = Math.min(100, textHsl.l + 50);
    }

    return hslToHex(textHsl.h, textHsl.s, textHsl.l);
  }

  return textColor;
}

/**
 * Lighten a color
 * @param color - The original color
 * @returns The lightened color
 */
export function lightenColor(color: number): number {
  let r = (color >> 16) & 0xff;
  let g = (color >> 8) & 0xff;
  let b = color & 0xff;

  r = Math.min(255, r + 25);
  g = Math.min(255, g + 25);
  b = Math.min(255, b + 25);

  return (r << 16) | (g << 8) | b;
}

import { STANCE_VISUAL_THEMES, CYBERPUNK_PALETTE } from "../types/constants";

export function getTrigramColor(
  stance: TrigramStance,
  type: "primary" | "secondary" | "glow" = "primary"
): number {
  const theme = STANCE_VISUAL_THEMES[stance];
  if (theme) {
    return theme[type];
  }
  // Fallback color if stance or type is not found
  return CYBERPUNK_PALETTE.TEXT_SECONDARY; // Cyberpunk neutral fallback
}

export function getTrigramColorFromTheme(
  stance: TrigramStance,
  themePart: "primary" | "secondary" | "glow" = "primary"
): number {
  const theme = STANCE_VISUAL_THEMES[stance];
  return theme ? theme[themePart] : CYBERPUNK_PALETTE.TECH_WHITE; // Default to tech white if not found
}
