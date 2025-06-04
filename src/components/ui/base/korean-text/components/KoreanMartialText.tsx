import React from "react";
import type { KoreanMartialTextProps } from "../../../../../types/korean-text";
import { KoreanText } from "./KoreanText";

export function KoreanMartialText({
  korean,
  english,
  martialVariant,
  honorLevel,
  ...props
}: KoreanMartialTextProps): React.JSX.Element {
  const text = typeof korean === "string" ? korean : korean.korean;
  const englishText =
    english || (typeof korean === "object" ? korean.english : undefined);

  return (
    <KoreanText
      korean={text}
      english={englishText}
      variant="martial"
      {...props}
    />
  );
}
