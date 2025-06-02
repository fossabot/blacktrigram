import React from "react";
import type { KoreanTitleProps } from "../../../../../types/korean-text";

export function KoreanTitle({
  korean,
  english,
  level = 1,
  className,
  style,
  ...restProps
}: KoreanTitleProps): React.ReactElement {
  const titleText = typeof korean === "object" ? korean.korean : korean;
  const subtitleText =
    english || (typeof korean === "object" ? korean.english : "");

  const combinedStyle: React.CSSProperties = {
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    fontSize: level === 1 ? "2rem" : level === 2 ? "1.5rem" : "1.25rem",
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: "1rem",
    ...style,
  };

  return React.createElement(
    `h${level}`,
    {
      className,
      style: combinedStyle,
      ...restProps,
    },
    titleText + (subtitleText ? ` (${subtitleText})` : "")
  );
}
