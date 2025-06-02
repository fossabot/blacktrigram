import React from "react";
import type { KoreanTitleProps } from "../../../../../types/korean-text"; // Corrected path
import { KoreanText } from "./KoreanText"; // Assuming KoreanText is the base component

export function KoreanTitle({
  korean,
  english,
  level = 1,
  className,
  style,
  variant = "primary", // Default variant for KoreanText if needed
  size = "title", // Default size for KoreanText if needed
  weight = 700, // Default weight
  as: Component = `h${level}`,
  ...rest
}: KoreanTitleProps): JSX.Element {
  const titleText = english ? { korean, english } : korean;

  // If 'as' is a DOM element type string like 'h1'
  if (typeof Component === "string") {
    return (
      <Component
        className={className}
        style={style as React.CSSProperties} // Cast if style is more generic initially
        {...rest} // Spread other DOM-compatible props
      >
        {/* Render KoreanText component inside the heading */}
        <KoreanText
          korean={korean}
          english={english}
          variant={variant} // Pass appropriate variant
          size={size} // Pass appropriate size
          weight={weight}
          // style prop for KoreanText might need specific handling if different from outer style
        />
      </Component>
    );
  }

  // If 'as' is a React ComponentType (less common for simple headings)
  // This branch might need more specific prop handling for the custom Component
  return (
    <Component
      className={className}
      style={style}
      {...rest} // Spread other props compatible with the custom Component
    >
      <KoreanText
        korean={korean}
        english={english}
        variant={variant}
        size={size}
        weight={weight}
      />
    </Component>
  );
}
