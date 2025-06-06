import React from "react";
import { extend } from "@pixi/react";
import { Text, TextStyle } from "pixi.js";
import type { KoreanText } from "../types";
import {
  KOREAN_FONT_FAMILY,
  KOREAN_TEXT_SIZES,
  KOREAN_TEXT_WEIGHTS,
} from "../../../../../types/korean-text"; // Use constants from korean-text.ts

// Extend PIXI React with Text component
extend({ Text });

// Declare extended components for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      pixiText: any;
    }
  }
}

export interface KoreanPixiTextProps {
  text?: string | KoreanText;
  korean?: string;
  english?: string;
  style?: any;
  anchor?: [number, number] | number;
  position?: [number, number];
  [key: string]: any;
}

export function KoreanPixiText({
  text,
  korean,
  english,
  style = {},
  anchor = [0, 0],
  position = [0, 0],
  ...props
}: KoreanPixiTextProps): React.JSX.Element {
  // Handle different text input formats
  let displayText: string;

  if (text) {
    displayText =
      typeof text === "string" ? text : text.korean || text.english || "";
  } else if (korean && english) {
    displayText = korean; // Prefer Korean if both are provided
  } else if (korean) {
    displayText = korean;
  } else if (english) {
    displayText = english;
  } else {
    displayText = "";
  }

  const textStyle = createKoreanTextStyle(style);

  return React.createElement("pixiText", {
    text: displayText,
    style: textStyle,
    anchor: typeof anchor === "object" ? anchor[0] : anchor,
    x: Array.isArray(position) ? position[0] : 0,
    y: Array.isArray(position) ? position[1] : 0,
    ...props,
  });
}

export function createKoreanTextStyle(style: any = {}): TextStyle {
  return new TextStyle({
    fontFamily: style.fontFamily || KOREAN_FONT_FAMILY,
    fontSize: style.fontSize || KOREAN_TEXT_SIZES.medium,
    fill: style.fill || 0xffffff,
    align: style.align || "left",
    fontWeight: style.fontWeight || KOREAN_TEXT_WEIGHTS.REGULAR,
    wordWrap: style.wordWrap || false,
    wordWrapWidth: style.wordWrapWidth || 0,
    dropShadow: style.dropShadow || false,
    ...style,
  });
}

export function getDisplayText(text: string | KoreanText): string {
  return typeof text === "string" ? text : text.korean || text.english || "";
}
