import React from "react";
import { Text as PixiText } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { KoreanTechniqueTextProps } from "../../../../../types/korean-text";
import { useKoreanTextStyle } from "../hooks/useKoreanTextStyle";
import { getPixiTextStyle } from "../utils";
import { KOREAN_COLORS } from "../../../../../types/constants";

export function KoreanTechniqueText({
  korean,
  english,
  koreanName: propKoreanName,
  englishName: propEnglishName,
  trigram,
  showStanceSymbol,
  damage,
  mastered,
  className,
  style: htmlStyle,
  x,
  y,
  anchor,
  alpha,
  visible,
  interactive,
  onpointertap,
  ...restKoreanTextProps
}: KoreanTechniqueTextProps & {
  x?: number;
  y?: number;
  anchor?: { x: number; y: number } | number;
  alpha?: number;
  visible?: boolean;
  interactive?: boolean;
  onpointertap?: (event: PIXI.FederatedPointerEvent) => void;
}): React.ReactElement {
  const finalKorean =
    propKoreanName || (typeof korean === "object" ? korean.korean : korean);
  const finalEnglish =
    propEnglishName || (typeof korean === "object" ? korean.english : english);

  // Get trigram color if available
  const trigramColor = trigram
    ? KOREAN_COLORS[trigram as keyof typeof KOREAN_COLORS]
    : KOREAN_COLORS.GOLD;

  // Create PIXI text style
  const pixiStyle = getPixiTextStyle(
    {
      korean: finalKorean,
      english: finalEnglish,
      size: "medium",
      weight: "bold",
      color: trigramColor,
      ...restKoreanTextProps,
    },
    trigramColor
  );

  // Format technique display text
  const displayText =
    showStanceSymbol && trigram
      ? `${finalKorean} (${finalEnglish})`
      : `${finalKorean} ${finalEnglish ? `(${finalEnglish})` : ""}`;

  const enhancedText = damage ? `${displayText} [${damage}]` : displayText;

  const finalText = mastered ? `★ ${enhancedText}` : enhancedText;

  return (
    <PixiText
      text={finalText}
      style={pixiStyle}
      x={x}
      y={y}
      anchor={anchor}
      alpha={alpha}
      visible={visible}
      interactive={interactive}
      onpointertap={onpointertap}
    />
  );
}
