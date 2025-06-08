import React from "react";
import { KoreanText } from "./KoreanText";
import type { KoreanTechniqueTextProps } from "../types";

export const KoreanMartialText: React.FC<KoreanTechniqueTextProps> = ({
  technique,
  size = "medium", // Fix: Use valid size
  weight = "regular", // Fix: Use valid weight
  variant = "primary", // Fix: Use valid variant
  emphasis = "none", // Fix: Use valid emphasis
  display = "both",
  order = "korean_first",
  showStance = true,
  showDescription = false,
  showEffects = false,
  className,
  style,
  ...rest
}) => {
  const koreanToDisplay = technique.koreanName;
  const englishToDisplay = technique.englishName;

  return (
    <div className={className} style={style}>
      <KoreanText
        korean={koreanToDisplay}
        english={englishToDisplay}
        size={size}
        weight={weight}
        variant={variant}
        emphasis={emphasis}
        display={display}
        order={order}
        {...rest}
      />

      {showDescription && technique.description && (
        <KoreanText
          korean={technique.description.korean}
          english={technique.description.english}
          size="small"
          weight="light"
          variant="secondary"
          display={display}
          order={order}
        />
      )}
    </div>
  );
};
