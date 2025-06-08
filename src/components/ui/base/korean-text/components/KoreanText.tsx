import React from "react";
import type { KoreanTextComponentProps } from "../types";

export const KoreanText: React.FC<KoreanTextComponentProps> = ({
  text,
  korean = "",
  english = "",
  size = "medium",
  weight = "regular",
  variant = "primary",
  emphasis = "none",
  display = "both",
  order = "korean_first",
  showBoth = true,
  koreanFirst = true,
  separator = " / ",
  cyberpunk = false,
  showUnderline = false,
  align = "left",
  color,
  className,
  style,
  onClick,
  id,
  children,
  ...rest
}) => {
  // Handle text content
  const getDisplayText = (): string => {
    // Fix: Properly handle text parameter
    if (typeof text === "string") {
      return text;
    }

    if (text && typeof text === "object" && text !== null) {
      // Handle KoreanText object
      const koreanText = text.korean || "";
      const englishText = text.english || "";
      return `${koreanText} / ${englishText}`;
    }

    // Fallback to individual props
    return `${korean} / ${english}`;
  };

  const displayText = getDisplayText();

  const spanStyle: React.CSSProperties = {
    fontSize: typeof size === "number" ? `${size}px` : undefined,
    fontWeight: weight,
    color:
      typeof color === "string"
        ? color
        : color
        ? `#${color.toString(16).padStart(6, "0")}`
        : undefined,
    textAlign: align,
    textDecoration: showUnderline ? "underline" : "none",
    ...style,
  };

  return (
    <span
      className={className}
      style={spanStyle}
      onClick={onClick}
      id={id}
      {...(rest as React.HTMLAttributes<HTMLSpanElement>)}
    >
      {displayText}
      {children}
    </span>
  );
};

export default KoreanText;
