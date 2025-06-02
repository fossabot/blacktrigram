import React from "react";
import { KOREAN_MARTIAL_TEXT_PRESETS, TRIGRAM_TEXT_CONFIG } from "../constants"; // Use TRIGRAM_TEXT_CONFIG
import type { KoreanMartialTextProps } from "../types"; // Corrected path
import { useKoreanTextStyle } from "../hooks/useKoreanTextStyle";
import { KoreanText } from "./KoreanText"; // Import KoreanText for rendering

// Korean martial arts themed text component
export function KoreanMartialText({
  korean,
  english,
  martialVariant = "practitioner",
  trigram,
  honorLevel,
  className,
  style,
  ...restProps
}: KoreanMartialTextProps): React.ReactElement {
  const preset = KOREAN_MARTIAL_TEXT_PRESETS[martialVariant];
  const trigramInfo = trigram ? TRIGRAM_TEXT_CONFIG[trigram] : undefined;

  const textStyleProps: KoreanMartialTextProps = {
    korean,
    english,
    martialVariant,
    trigram,
    honorLevel,
    size: preset.size,
    weight: preset.weight,
    color: trigramInfo?.color,
    ...restProps,
  };

  return <KoreanText {...textStyleProps} className={className} style={style} />;
}
