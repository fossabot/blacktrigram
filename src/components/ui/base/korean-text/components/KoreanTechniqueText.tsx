import React from "react";
import { Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { KoreanTechniqueTextProps } from "../types";
import { KOREAN_TEXT_SIZES, KOREAN_FONT_FAMILIES } from "../constants";
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../../../types";

export function KoreanTechniqueText({
  korean,
  english,
  koreanName,
  englishName,
  trigram,
  showStanceSymbol = false,
  damage,
  mastered = false,
  size = "medium",
  weight = 400,
  color,
  align = "left",
  ...props
}: KoreanTechniqueTextProps): React.ReactElement {
  const fontSize =
    typeof size === "number"
      ? size
      : KOREAN_TEXT_SIZES[size] || KOREAN_TEXT_SIZES.medium;

  const stanceColor = trigram ? TRIGRAM_DATA[trigram]?.color : undefined;
  const finalColor = color || stanceColor || KOREAN_COLORS.WHITE;

  const techniqueStyle = new PIXI.TextStyle({
    fontFamily: KOREAN_FONT_FAMILIES.PRIMARY,
    fontSize,
    fill: finalColor,
    fontWeight: weight,
    align,
    wordWrap: true,
    wordWrapWidth: 400,
  });

  const koreanText = typeof korean === "string" ? korean : korean.korean;
  const englishText =
    english || (typeof korean === "object" ? korean.english : undefined);

  const displayText = [
    showStanceSymbol && trigram ? TRIGRAM_DATA[trigram]?.symbol : "",
    koreanName || koreanText,
    englishName || englishText ? `(${englishName || englishText})` : "",
    damage ? `- ${damage} 피해` : "",
    mastered ? "✓" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Text
      text={displayText}
      style={techniqueStyle}
      anchor={{ x: 0, y: 0.5 }}
      {...props}
    />
  );
}
