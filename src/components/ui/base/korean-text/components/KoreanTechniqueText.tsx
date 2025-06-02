import React from "react";
import { Text as PixiText } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { KoreanTechniqueTextProps } from "../../../../../types/korean-text";
import { useKoreanTextStyle } from "../hooks/useKoreanTextStyle"; // For web React styles
import { getPixiTextStyle } from "../utils"; // For Pixi styles
import { KOREAN_COLORS } from "../../../../../types/constants"; // Import KOREAN_COLORS

// Removed unused PixiTextStyle variable

export function KoreanTechniqueText({
  korean, // From KoreanText (bilingual object or string)
  english, // From KoreanText
  koreanName: propKoreanName, // Specific prop
  englishName: propEnglishName, // Specific prop
  trigram,
  showStanceSymbol,
  showDamage,
  damage,
  kiCost,
  staminaCost,
  mastered,
  className,
  style: htmlStyle,
  // Pixi specific props
  x,
  y,
  anchor,
  alpha,
  visible,
  interactive,
  onpointertap,
  ...restKoreanTextProps
}: KoreanTechniqueTextProps & {
  // Add Pixi specific props
  x?: number;
  y?: number;
  anchor?: { x: number; y: number } | number;
  alpha?: number;
  visible?: boolean;
  interactive?: boolean;
  onpointertap?: (event: PIXI.FederatedPointerEvent) => void;
}): JSX.Element {
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
  if (showStanceSymbol && trigram) {
    // Add trigram symbol logic if needed, e.g., from TRIGRAM_DATA
    // textContent = `${TRIGRAM_DATA[trigram]?.symbol || ''} ${textContent}`;
  }
  // Add damage, kiCost, staminaCost to textContent if needed

  // For PIXI rendering:
  const pixiStyleOptions = getPixiTextStyle({
    korean: finalKorean,
    english: finalEnglish,
    trigram,
    ...restKoreanTextProps,
  });
  // Ensure trigram color is applied if not handled by getPixiTextStyle's variant logic
  if (trigram && KOREAN_COLORS[trigram] && !pixiStyleOptions.fill) {
    pixiStyleOptions.fill = KOREAN_COLORS[trigram] as PIXI.FillInput;
  }
  if (mastered) {
    pixiStyleOptions.fill = KOREAN_COLORS.GOLD as PIXI.FillInput; // Example: mastered techniques are gold
    pixiStyleOptions.fontWeight = "bold" as PIXI.TextStyleFontWeight;
  }
  const finalPixiStyle = new PIXI.TextStyle(pixiStyleOptions);

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

  return (
    <span className={className} style={reactStyle}>
      {textContent}
      {/* Optionally add more details like Ki cost, damage, etc. for web display */}
    </span>
  );
}
