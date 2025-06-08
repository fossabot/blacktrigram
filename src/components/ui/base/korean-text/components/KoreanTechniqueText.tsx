import React from "react";
import { KoreanText } from "./KoreanText";
import { TRIGRAM_DATA } from "../../../../../types/constants/trigram";
import type { KoreanTechniqueTextProps } from "../types";
import type { TrigramStance } from "../../../../../types";

export const KoreanTechniqueText: React.FC<KoreanTechniqueTextProps> = ({
  technique,
  size = "medium",
  weight = "regular",
  variant = "primary",
  emphasis = "none",
  display = "both",
  order = "korean_first",
  showStance = true,
  showDescription = false,
  showEffects = false,
  className,
  style,
  ...rest
}) => {
  const stanceData = TRIGRAM_DATA[technique.stance as TrigramStance];

  return (
    <div className={className} style={style}>
      <KoreanText
        korean={technique.koreanName}
        english={technique.englishName}
        size={size}
        weight={weight}
        variant={variant}
        emphasis={emphasis}
        {...rest}
      />

      {showStance && stanceData && (
        <KoreanText
          korean={`(${stanceData.name.korean})`}
          english={`(${stanceData.name.english})`}
          size="small"
          weight="light"
          variant="secondary"
        />
      )}

      {showDescription && technique.description && (
        <KoreanText
          korean={technique.description.korean}
          english={technique.description.english}
          size="small"
          weight="light"
          variant="secondary"
        />
      )}
    </div>
  );
};
