import React from "react";
import type { KoreanTitleProps } from "../../../../../types/korean-text";
import { KoreanText } from "./KoreanText";

export function KoreanTitle({
  korean,
  english,
  level = 1,
  subtitle,
  size,
  weight = 700,
  variant = "title",
  ...restProps
}: KoreanTitleProps): React.ReactElement {
  // Determine size based on level if not explicitly provided
  const titleSize =
    size || (level === 1 ? "xxlarge" : level === 2 ? "xlarge" : "large");

  return (
    <div>
      <KoreanText
        korean={korean}
        english={english}
        size={titleSize}
        weight={weight}
        variant={variant}
        {...restProps}
      />
      {subtitle && (
        <KoreanText
          korean={subtitle}
          size="medium"
          weight={400}
          variant="subtitle"
          style={{ marginTop: "0.5rem", opacity: 0.8 }}
        />
      )}
    </div>
  );
}
