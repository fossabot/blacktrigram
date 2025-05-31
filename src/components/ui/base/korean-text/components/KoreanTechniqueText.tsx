import React from "react";
import { KoreanText } from "./KoreanText";
import { TRIGRAM_CONFIG } from "../constants";
import { KOREAN_COLORS } from "../../../../../types";
import type { KoreanTechniqueTextProps } from "../types";

// Korean technique display component
export function KoreanTechniqueText({
  techniqueName,
  englishName,
  stance,
  showStanceSymbol = true,
  showDamage = false,
  damage,
  kiCost,
  size = "medium",
  interactive = false,
  disabled = false,
  mastered = false,
}: KoreanTechniqueTextProps): React.ReactElement {
  const stanceConfig = TRIGRAM_CONFIG[stance];
  const stanceColor = `#${stanceConfig.color.toString(16).padStart(6, "0")}`;

  const displayText = showStanceSymbol
    ? `${stanceConfig.symbol} ${techniqueName}`
    : techniqueName;

  const techniqueInfo = [];
  if (showDamage && damage) techniqueInfo.push(`피해: ${damage}`);
  if (kiCost) techniqueInfo.push(`기력: ${kiCost}`);

  const fullEnglishText = [
    englishName,
    ...techniqueInfo,
    mastered ? "숙련됨" : "",
  ]
    .filter(Boolean)
    .join(" • ");

  const baseProps = {
    text: displayText,
    size,
    color: disabled
      ? `#${KOREAN_COLORS.GRAY_DARK.toString(16).padStart(6, "0")}`
      : stanceColor,
    weight: mastered ? "bold" : "normal",
    emphasis: mastered ? "glow" : interactive ? "shadow" : "none",
    showBoth: true,
    bilingual: "stacked",
    animate: interactive,
    className: `technique-text stance-${stance}`,
  } as const;

  return (
    <div
      className={`technique-display ${disabled ? "disabled" : ""} ${
        mastered ? "mastered" : ""
      }`}
    >
      {fullEnglishText ? (
        <KoreanText {...baseProps} englishText={fullEnglishText} />
      ) : (
        <KoreanText {...baseProps} />
      )}

      {(showDamage || kiCost) && (
        <div
          className="technique-stats"
          style={{
            fontSize: "0.75em",
            color: `#${KOREAN_COLORS.GRAY_LIGHT.toString(16).padStart(6, "0")}`,
            marginTop: "0.25em",
          }}
        >
          {showDamage && damage && <span>데미지: {damage}</span>}
          {kiCost && (
            <span style={{ marginLeft: showDamage ? "1em" : "0" }}>
              기력 소모: {kiCost}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
