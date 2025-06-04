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
