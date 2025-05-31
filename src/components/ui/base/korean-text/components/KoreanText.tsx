import React from "react";
import { hasKoreanText } from "../utils";
import { useKoreanTextStyle } from "../hooks/useKoreanTextStyle";
import type { KoreanTextProps } from "../types";

// Main KoreanText component - simplified and focused
export function KoreanText({
  text,
  englishText,
  showBoth = false,
  bilingual = "stacked",
  tooltip,
  ariaLabel,
  className = "",
  onClick,
  onHover,
  ...styleProps
}: KoreanTextProps): React.ReactElement {
  const { textStyle } = useKoreanTextStyle({ text, ...styleProps });

  // Handle interactions
  const handleMouseEnter = () => onHover?.(true);
  const handleMouseLeave = () => onHover?.(false);

  // Render bilingual text
  if (showBoth && englishText) {
    const englishStyle = {
      ...textStyle,
      fontSize: `calc(${textStyle.fontSize} * 0.85)`,
      opacity: 0.8,
      fontStyle: "italic" as const,
      fontFamily: "Arial, sans-serif",
    };

    const containerStyle: React.CSSProperties = {
      display: bilingual === "horizontal" ? "flex" : "block",
      gap: bilingual === "horizontal" ? "0.5em" : "0.2em",
      alignItems: bilingual === "horizontal" ? "center" : "flex-start",
    };

    return (
      <div
        className={`korean-text bilingual ${className}`}
        style={containerStyle}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        title={tooltip}
        aria-label={ariaLabel || `${text} ${englishText}`}
      >
        <span style={textStyle}>{text}</span>
        <span style={englishStyle}>
          {bilingual === "horizontal" ? `(${englishText})` : englishText}
        </span>
      </div>
    );
  }

  // Render single language text
  return (
    <span
      className={`korean-text ${
        hasKoreanText(text) ? "korean-script" : "latin-script"
      } ${className}`}
      style={textStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={tooltip}
      aria-label={ariaLabel || text}
    >
      {text}
    </span>
  );
}
