import React from "react";
import type { KoreanMartialTextProps } from "../../../../../types"; // Use types from main types
// import { KOREAN_MARTIAL_TEXT_STYLES, KOREAN_HONORIFICS } from "../constants"; // KOREAN_HONORIFICS not exported
import { KoreanText } from "./KoreanText"; // Assuming this is the React DOM component

export const KoreanMartialText: React.FC<KoreanMartialTextProps> = ({
  technique,
  size = "medium", // Fix: Use valid size
  weight = "regular", // Fix: Use valid weight
  variant = "primary",
  emphasis = "none", // Fix: Use valid emphasis
  display = "both",
  order = "korean_first",
  showTechnique = true,
  showArchetype = false,
  className,
  style,
  ...rest
}) => {
  // Remove unused englishToDisplay variable
  const koreanToDisplay = showTechnique
    ? technique.koreanName
    : technique.description.korean;

  // const styleKey = martialVariant || "default";
  // const baseStyle = KOREAN_MARTIAL_TEXT_STYLES[styleKey] || KOREAN_MARTIAL_TEXT_STYLES.default;

  // let honorificText = "";
  // if (showHonorific && honorLevel) {
  //   honorificText = KOREAN_HONORIFICS[honorLevel] || "";
  //   if (honorificText) {
  //     textToDisplay = `${textToDisplay} ${honorificText}`;
  //   }
  // }
  // if (showHonorific && rank && !honorLevel) { // Fallback to rank if honorLevel not provided
  //    honorificText = KOREAN_HONORIFICS[rank] || "";
  //    if (honorificText) {
  //      textToDisplay = `${textToDisplay} ${honorificText}`;
  //    }
  // }

  return (
    <KoreanText
      korean={koreanToDisplay}
      english={technique.englishName}
      size={size}
      weight={weight}
      variant={variant}
      emphasis={emphasis}
      display={display}
      order={order}
      className={className}
      style={style}
      {...rest}
    />
  );
};
