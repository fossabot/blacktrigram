import * as PIXI from "pixi.js";
import { FONT_FAMILY, KOREAN_COLORS } from "../../../../../types/constants";

// Fix: Define KoreanText interface locally to avoid import issues
export interface KoreanText {
  readonly korean: string;
  readonly english: string;
  readonly romanized?: string;
}

// Fix: Define options type for createKoreanTextStyle
export interface KoreanPixiTextStyle {
  fontSize?: number;
  fill?: number;
  fontWeight?: string;
  align?: string;
  wordWrap?: boolean;
  wordWrapWidth?: number;
}

// Korean Pixi Text utilities for Black Trigram martial arts game - Fix: Make options parameter optional
export const createKoreanTextStyle = (
  options: KoreanPixiTextStyle = {}
): PIXI.TextStyle => {
  return new PIXI.TextStyle({
    fontFamily: FONT_FAMILY.PRIMARY,
    fontSize: options.fontSize || 16,
    fill: options.fill || KOREAN_COLORS.TEXT_PRIMARY,
    fontWeight: (options.fontWeight || "normal") as PIXI.TextStyleFontWeight,
    align: (options.align || "left") as PIXI.TextStyleAlign,
    wordWrap: options.wordWrap || false,
    wordWrapWidth: options.wordWrapWidth || 0,
  });
};

export const KOREAN_TEXT_STYLES = {
  heading: createKoreanTextStyle({
    fontSize: 24,
    fontWeight: "bold",
    fill: KOREAN_COLORS.ACCENT_GOLD,
  }),
  body: createKoreanTextStyle({
    fontSize: 16,
    fill: KOREAN_COLORS.TEXT_PRIMARY,
  }),
  small: createKoreanTextStyle({
    fontSize: 12,
    fill: KOREAN_COLORS.TEXT_SECONDARY,
  }),
  accent: createKoreanTextStyle({
    fontSize: 18,
    fontWeight: "bold",
    fill: KOREAN_COLORS.PRIMARY_CYAN,
  }),
};

export const getDisplayText = (
  text: KoreanText,
  showRomanization: boolean = false
): string => {
  return showRomanization ? `${text.korean} (${text.english})` : text.korean;
};

export interface KoreanPixiTextProps {
  text: KoreanText;
  style?: PIXI.TextStyle;
  showRomanization?: boolean;
  x?: number;
  y?: number;
  anchor?: number | { x: number; y: number };
}

export default {
  createKoreanTextStyle,
  KOREAN_TEXT_STYLES,
  getDisplayText,
};
