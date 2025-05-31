import React from "react";
import { KoreanText } from "./KoreanText";
import { MARTIAL_COLORS, TRIGRAM_CONFIG } from "../constants";
import type { KoreanMartialTextProps } from "../types";

// Korean martial arts themed text component
export function KoreanMartialText({
  martialVariant,
  trigram,
  honorLevel = "practitioner",
  text,
  englishText,
  ...props
}: KoreanMartialTextProps): React.ReactElement {
  const martialColor = `#${MARTIAL_COLORS[martialVariant]
    .toString(16)
    .padStart(6, "0")}`;

  const honorPrefix = {
    student: "수련생",
    practitioner: "수련자",
    master: "사범님",
    grandmaster: "대사범님",
  }[honorLevel];

  const trigramSymbol = trigram ? TRIGRAM_CONFIG[trigram].symbol : "";
  const trigramColor = trigram
    ? `#${TRIGRAM_CONFIG[trigram].color.toString(16).padStart(6, "0")}`
    : undefined;

  const displayText = trigram ? `${trigramSymbol} ${text}` : text;

  // Fix: Only set englishText if it exists, otherwise leave undefined
  const koreanTextProps = {
    ...props,
    text: displayText,
    color: trigramColor || martialColor,
    emphasis: martialVariant === "mastery" ? "glow" : "shadow",
    className: `martial-text martial-${martialVariant} ${
      props.className || ""
    }`,
  } as const;

  // Conditionally add englishText only if it exists
  if (englishText) {
    return (
      <KoreanText
        {...koreanTextProps}
        englishText={`${honorPrefix} - ${englishText}`}
      />
    );
  }

  return <KoreanText {...koreanTextProps} />;
}
