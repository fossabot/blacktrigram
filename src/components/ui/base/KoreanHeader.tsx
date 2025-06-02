import React from "react";
import { Text as PixiText } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { KoreanTextHeaderProps } from "../../../types/korean-text";
import { KOREAN_COLORS } from "../../../types/constants";

export function KoreanHeader({
  korean,
  english,
  subtitle,
  level = 1,
  color = KOREAN_COLORS.GOLD,
  style,
}: KoreanTextHeaderProps): React.ReactElement {
  const getFontSize = (level: number): number => {
    const sizes = { 1: 32, 2: 28, 3: 24, 4: 20, 5: 18, 6: 16 };
    return sizes[level as keyof typeof sizes] || 24;
  };

  // Create PIXI-compatible style
  const pixiStyle = new PIXI.TextStyle({
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    fontSize: getFontSize(level),
    fill: color,
    fontWeight: level <= 2 ? "bold" : "normal",
    align: "center",
    dropShadow: {
      alpha: 0.5,
      angle: Math.PI / 4,
      blur: 2,
      color: KOREAN_COLORS.BLACK,
      distance: 2,
    },
  });

  const displayText = english ? `${korean}\n${english}` : korean;
  const fullText = subtitle ? `${displayText}\n${subtitle}` : displayText;

  return (
    <PixiText text={fullText} style={pixiStyle} anchor={{ x: 0.5, y: 0.5 }} />
  );
}

export default KoreanHeader;
