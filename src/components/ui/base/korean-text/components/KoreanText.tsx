import React from "react";
import type {
  KoreanTextProps,
} from "../../../../../types/korean-text";
import { useKoreanTextStyle } from "../hooks/useKoreanTextStyle";

export function KoreanText({
  korean,
  english,
  size = "medium",
  variant = "body",
  weight = "regular",
  emphasis = "none",
  showBoth = false,
  separator = " - ",
  className,
  style,
  ...restProps
}: KoreanTextProps): React.ReactElement {
  const textStyle = useKoreanTextStyle({
    korean,
    english,
    size,
    variant,
    weight,
    emphasis,
    style,
    ...restProps,
  });

  // Extract Korean and English text
  const koreanText = typeof korean === "object" ? korean.korean : korean;
  const englishText =
    english || (typeof korean === "object" ? korean.english : "");

  // Determine display text
  let displayText = koreanText;
  if (showBoth && englishText) {
    displayText = `${koreanText}${separator}${englishText}`;
  } else if (!koreanText && englishText) {
    displayText = englishText;
  }

  return (
    <span className={className} style={textStyle} {...restProps}>
      {displayText}
    </span>
  );
}
