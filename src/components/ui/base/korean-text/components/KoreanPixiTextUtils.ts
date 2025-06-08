import type { KoreanText } from "../../../../../types";
import { KOREAN_COLORS, FONT_FAMILY } from "../../../../../types/constants";
import * as PIXI from "pixi.js";

export interface KoreanPixiTextStyle {
  fontSize?: number;
  fill?: number | string;
  fontWeight?: string;
  align?: "left" | "center" | "right";
  stroke?: number | string;
  fontFamily?: string;
}

export function createKoreanTextStyle(
  options: KoreanPixiTextStyle
): PIXI.TextStyle {
  return new PIXI.TextStyle({
    fontFamily: options.fontFamily || FONT_FAMILY.PRIMARY,
    fontSize: options.fontSize || 16,
    fill: options.fill || KOREAN_COLORS.TEXT_PRIMARY,
    fontWeight: (options.fontWeight || "400") as PIXI.TextStyleFontWeight,
    align: options.align || "left",
    stroke: options.stroke || KOREAN_COLORS.BLACK_SOLID,
  });
}

export function formatKoreanTextForPixi(
  text: KoreanText | string,
  showBoth: boolean = true,
  koreanFirst: boolean = true
): string {
  if (typeof text === "string") return text;

  if (!showBoth) {
    return koreanFirst ? text.korean : text.english;
  }

  return koreanFirst
    ? `${text.korean} / ${text.english}`
    : `${text.english} / ${text.korean}`;
}
