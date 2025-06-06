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
