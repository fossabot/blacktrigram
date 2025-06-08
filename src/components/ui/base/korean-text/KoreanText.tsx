import React, { useMemo } from "react";
import { weightToCSSValue } from "../utils";
import type { KoreanTextComponentProps } from "../types";
import { KOREAN_FONT_FAMILY } from "../../../../../types/constants";

export const KoreanText: React.FC<KoreanTextComponentProps> = ({
  text,
  showBoth = true,
  koreanFirst = true,
  separator = " / ",
  size = "medium",
  weight = "regular",
  color,
  emphasis = "none",
  align = "left",
  className,
  style: customStyle,
}) => {
  const displayText = useMemo(() => {
    if (typeof text === "string") return text;

    if (!showBoth) {
      return koreanFirst ? text.korean : text.english;
    }

    return koreanFirst
      ? `${text.korean}${separator}${text.english}`
      : `${text.english}${separator}${text.korean}`;
  }, [text, showBoth, koreanFirst, separator]);

  const fontSize = typeof size === "number" ? size : 16;

  const styles = useMemo(
    () => ({
      fontFamily: KOREAN_FONT_FAMILY,
      fontSize: `${fontSize}px`,
      fontWeight: weightToCSSValue(weight),
      color:
        typeof color === "number"
          ? `#${color.toString(16).padStart(6, "0")}`
          : color || "#ffffff",
      textAlign: align as React.CSSProperties["textAlign"],
      fontStyle:
        emphasis === "italic" ? ("italic" as const) : ("normal" as const),
      textDecoration: emphasis === "underline" ? "underline" : "none",
      ...customStyle,
    }),
    [fontSize, weight, color, align, emphasis, customStyle]
  );

  const titleAttribute = useMemo(() => {
    if (typeof text === "string") return text;
    return `${text.korean} (${text.english})`;
  }, [text]);

  return (
    <span className={className} style={styles} title={titleAttribute}>
      {displayText}
    </span>
  );
};

export default KoreanText;
