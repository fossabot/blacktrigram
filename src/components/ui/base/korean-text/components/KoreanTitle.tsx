import React from "react";
import type { KoreanTitleProps } from "../types";
import {
  KOREAN_COLORS,
  KOREAN_FONT_FAMILY,
} from "../../../../../types/constants";

export const KoreanTitle: React.FC<KoreanTitleProps> = ({
  korean,
  english,
  level = 1,
  variant = "primary",
  cyberpunk = false,
  glow = false,
  className,
  style,
  display = "both",
  order = "korean_first",
  centerAlign = false,
  ...rest
}) => {
  const TagName = `h${level}` as keyof JSX.IntrinsicElements;

  const titleStyle: React.CSSProperties = {
    fontFamily: KOREAN_FONT_FAMILY,
    fontSize: level === 1 ? "2.5rem" : level === 2 ? "2rem" : "1.5rem",
    fontWeight: "bold",
    color:
      variant === "primary"
        ? `#${KOREAN_COLORS.TEXT_PRIMARY.toString(16)}`
        : `#${KOREAN_COLORS.TEXT_ACCENT.toString(16)}`,
    textAlign: centerAlign ? "center" : "left",
    margin: "0.5rem 0",
    textShadow: glow ? "0 0 10px currentColor" : "none",
    ...style,
  };

  const displayText =
    display === "korean"
      ? korean
      : display === "english"
      ? english
      : order === "korean_first"
      ? `${korean} / ${english}`
      : `${english} / ${korean}`;

  return React.createElement(
    TagName,
    {
      className,
      style: titleStyle,
      ...rest,
    },
    displayText
  );
};

export default KoreanTitle;
