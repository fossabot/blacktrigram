import React from "react"; // Remove unused useMemo
import type { KoreanTextComponentProps } from "./types";

export const KoreanText: React.FC<KoreanTextComponentProps> = ({
  text,
  korean = "",
  english = "",
  showBoth = true,
  koreanFirst = true,
  separator = " / ",
  className,
  style,
  // Remove color from rest parameters to avoid conflicts
  color,
  ...rest
}) => {
  const getDisplayText = (): string => {
    if (typeof text === "string") return text;

    if (text && typeof text === "object") {
      if (!showBoth) {
        return koreanFirst ? text.korean || "" : text.english || "";
      }

      const koreanText = text.korean || "";
      const englishText = text.english || "";

      return koreanFirst
        ? `${koreanText}${separator}${englishText}`
        : `${englishText}${separator}${koreanText}`;
    }

    if (!showBoth) {
      return koreanFirst ? korean : english;
    }

    return koreanFirst
      ? `${korean}${separator}${english}`
      : `${english}${separator}${korean}`;
  };

  const displayText = getDisplayText();

  // Handle color conversion for CSS
  const cssStyle = {
    ...style,
    ...(color && {
      color:
        typeof color === "number"
          ? `#${color.toString(16).padStart(6, "0")}`
          : color,
    }),
  };

  return (
    <span className={className} style={cssStyle} {...rest}>
      {displayText}
    </span>
  );
};

export default KoreanText;
