/**
 * TypeScript type definitions for Korean PixiJS text utilities
 * This file provides types that can be imported separately from the React components
 */

import type * as PIXI from "pixi.js";

export interface KoreanText {
  readonly korean: string;
  readonly english: string;
  readonly romanized?: string;
}

export interface KoreanPixiTextStyle {
  fontSize?: number;
  fill?: number;
  fontWeight?: string;
  align?: string;
  wordWrap?: boolean;
  wordWrapWidth?: number;
}

export interface KoreanPixiTextProps {
  text: KoreanText;
  style?: PIXI.TextStyle;
  showRomanization?: boolean;
  x?: number;
  y?: number;
  anchor?: number | { x: number; y: number };
}

// Fix: Function type definitions with optional parameters
export declare function createKoreanTextStyle(
  options?: KoreanPixiTextStyle
): PIXI.TextStyle;

export declare function getDisplayText(
  text: KoreanText,
  showRomanization?: boolean
): string;

export declare const KOREAN_TEXT_STYLES: {
  readonly heading: PIXI.TextStyle;
  readonly body: PIXI.TextStyle;
  readonly small: PIXI.TextStyle;
  readonly accent: PIXI.TextStyle;
};
