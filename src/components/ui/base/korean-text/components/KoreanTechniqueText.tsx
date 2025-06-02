import React from "react";
import type { KoreanTechniqueTextProps } from "../../../../../types/korean-text";
import { KoreanText } from "./KoreanText";

export function KoreanTechniqueText({
  korean,
  english,
  trigram,
  damage,
  mastered,
  ...props
}: KoreanTechniqueTextProps): JSX.Element {
  const text = typeof korean === "string" ? korean : korean.korean;
  const englishText =
    english || (typeof korean === "object" ? korean.english : undefined);

  return (
    <KoreanText
      korean={text}
      english={englishText}
      variant="technique"
      {...props}
    />
  );
}
