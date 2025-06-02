import React from "react";
import type { KoreanMartialTextProps } from "../../../../../types/korean-text";
import { KoreanText } from "./KoreanText";
import { KOREAN_COLORS } from "../../../../../types/constants";

// Korean martial arts themed text component
export function KoreanMartialText({
  korean,
  english,
  martialVariant = "technique",
  honorLevel = "student",
  ...rest
}: KoreanMartialTextProps): React.ReactElement {
  // Apply martial arts specific styling
  const getMartialColor = () => {
    switch (martialVariant) {
      case "technique":
        return KOREAN_COLORS.GOLD;
      case "philosophy":
        return KOREAN_COLORS.CYAN;
      case "master":
        return KOREAN_COLORS.TRADITIONAL_RED;
      case "honor":
        return KOREAN_COLORS.GOLD;
      default:
        return KOREAN_COLORS.WHITE;
    }
  };

  const getHonorPrefix = () => {
    switch (honorLevel) {
      case "master":
        return "사범님 ";
      case "grandmaster":
        return "대사범님 ";
      default:
        return "";
    }
  };

  const finalKorean = `${getHonorPrefix()}${korean}`;

  return (
    <KoreanText
      korean={finalKorean}
      english={english}
      color={getMartialColor()}
      weight="bold"
      emphasis="shadow"
      {...rest}
    />
  );
}
