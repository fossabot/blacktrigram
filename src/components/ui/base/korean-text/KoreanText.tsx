import React from "react";
import type { KoreanTextProps } from "../../../../types/korean-text";
import { KOREAN_COLORS, KOREAN_FONT_FAMILY_PRIMARY } from "../../../../types";

export function KoreanText({
  korean,
  english,
  size = "medium",
  weight = 400,
  color = KOREAN_COLORS.WHITE,
  variant = "body",
  emphasis = "none",
  align = "left",
  className,
  style,
}: KoreanTextProps): React.ReactElement {
  const koreanText = typeof korean === "string" ? korean : korean.korean;
  const englishText =
    english || (typeof korean === "object" ? korean.english : undefined);

  const fontSize =
    typeof size === "string"
      ? {
          small: "0.875rem",
          medium: "1rem",
          large: "1.25rem",
          xlarge: "1.5rem",
          xxlarge: "2rem",
        }[size]
      : `${size}px`;

  const baseStyle: React.CSSProperties = {
    fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
    fontSize,
    fontWeight: weight,
    color:
      typeof color === "number"
        ? `#${color.toString(16).padStart(6, "0")}`
        : color,
    textAlign: align,
    ...style,
  };

  const combinedClassName = `korean-text korean-text--${variant} ${
    emphasis !== "none" ? `korean-text--${emphasis}` : ""
  } ${className || ""}`.trim();

  return (
    <div className={combinedClassName} style={baseStyle}>
      <span className="korean-text__korean">{koreanText}</span>
      {englishText && (
        <span
          className="korean-text__english"
          style={{ display: "block", fontSize: "0.9em", opacity: 0.8 }}
        >
          {englishText}
        </span>
      )}
    </div>
  );
}
