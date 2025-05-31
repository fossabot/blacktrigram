import React from "react";
import { KOREAN_COLORS, KOREAN_FONT_FAMILY } from "../../../../../types";
import type { KoreanTitleProps } from "../types";

// Korean title component - DOM-only, not PixiJS
export function KoreanTitle({
  korean,
  english,
  level = 1,
  color = `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`,
  showBoth = true,
  className = "",
  style = {},
}: KoreanTitleProps): React.ReactElement {
  // Standard DOM CSS properties only
  const titleStyle: React.CSSProperties = {
    color,
    fontFamily: KOREAN_FONT_FAMILY,
    fontWeight: "bold",
    margin: "1rem 0",
    textAlign: "center",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    ...style,
  };

  // Create the heading element using React.createElement to avoid JSX conflicts
  const headingElement = React.createElement(
    `h${level}` as keyof JSX.IntrinsicElements,
    { style: titleStyle },
    korean
  );

  return (
    <div className={`korean-title ${className}`}>
      {headingElement}
      {showBoth && english && (
        <p
          style={{
            color: `#${KOREAN_COLORS.GRAY_LIGHT.toString(16).padStart(6, "0")}`,
            fontSize: "0.8em",
            fontStyle: "italic",
            marginTop: "0.25rem",
            textAlign: "center",
          }}
        >
          {english}
        </p>
      )}
    </div>
  );
}
