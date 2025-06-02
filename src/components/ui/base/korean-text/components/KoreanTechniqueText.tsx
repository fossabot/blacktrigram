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

  const reactStyle = useKoreanTextStyle({
    korean: finalKorean,
    english: finalEnglish,
    trigram,
    ...restKoreanTextProps,
    style: htmlStyle,
  });

  let textContent = `${finalKorean}`;
  if (finalEnglish) {
    textContent += ` (${finalEnglish})`;
  }

  // For PIXI rendering:
  const pixiStyleOptions = getPixiTextStyle({
    korean: finalKorean,
    english: finalEnglish,
    trigram,
    ...restKoreanTextProps,
  });

  if (trigram && KOREAN_COLORS[trigram] && !pixiStyleOptions.fill) {
    pixiStyleOptions.fill = KOREAN_COLORS[trigram] as PIXI.FillInput;
  }
  if (mastered) {
    pixiStyleOptions.fill = KOREAN_COLORS.GOLD as PIXI.FillInput;
    pixiStyleOptions.fontWeight = "bold" as PIXI.TextStyleFontWeight;
  }

  const finalPixiStyle = new PIXI.TextStyle(pixiStyleOptions);

  // Always return a JSX element
  if (x !== undefined || y !== undefined) {
    return (
      <PixiText
        text={textContent}
        style={finalPixiStyle}
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

  // Return DOM element when not using PIXI coordinates
  return (
    <span className={className} style={reactStyle}>
      {textContent}
    </span>
  );
}
