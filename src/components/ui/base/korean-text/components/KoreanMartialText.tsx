import React from "react";
import type { KoreanMartialTextProps } from "../../../../../types/korean-text";
import { KoreanText } from "./KoreanText";

// Korean martial arts themed text component
export function KoreanMartialText({
  korean,
  english,
  martialVariant = "technique",
  honorLevel = "student",
  weight = "bold",
  size = "medium",
  ...restProps
}: KoreanMartialTextProps): React.ReactElement {
  return (
    <KoreanText
      korean={korean}
      english={english}
      variant="martial"
      weight={weight}
      size={size}
      {...restProps}
    />
  );
}
