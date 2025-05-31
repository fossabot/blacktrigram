import React from "react";
import {
  KOREAN_COLORS,
  KOREAN_FONT_FAMILY,
  TRIGRAM_DATA,
  type ProgressTrackerProps,
} from "../../types";

export function ProgressTracker({
  label,
  current,
  maximum,
  currentStance,
}: ProgressTrackerProps): React.ReactElement {
  const percentage = Math.max(0, Math.min(100, (current / maximum) * 100));

  // Color based on percentage and stance
  const getBarColor = (): string => {
    if (currentStance && TRIGRAM_DATA[currentStance]) {
      return `#${TRIGRAM_DATA[currentStance].color
        .toString(16)
        .padStart(6, "0")}`;
    }

    if (percentage > 60) return KOREAN_COLORS.Green;
    if (percentage > 30) return KOREAN_COLORS.Orange;
    return KOREAN_COLORS.Red;
  };

  return (
    <div
      style={{
        marginBottom: "1rem",
        fontFamily: KOREAN_FONT_FAMILY,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.25rem",
          fontSize: "0.9rem",
        }}
      >
        <span style={{ color: KOREAN_COLORS.WHITE }}>{label}</span>
        <span style={{ color: KOREAN_COLORS.GRAY_LIGHT }}>
          {Math.round(current)}/{maximum}
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: "8px",
          backgroundColor: KOREAN_COLORS.GRAY_DARK,
          borderRadius: "4px",
          overflow: "hidden",
          border: `1px solid ${KOREAN_COLORS.GRAY_MEDIUM}`,
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            backgroundColor: getBarColor(),
            transition: "width 0.3s ease, background-color 0.3s ease",
            borderRadius: "3px",
          }}
        />
      </div>

      {/* Stance indicator */}
      {currentStance && (
        <div
          style={{
            fontSize: "0.7rem",
            color: KOREAN_COLORS.GRAY_LIGHT,
            marginTop: "0.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          <span style={{ color: getBarColor() }}>
            {TRIGRAM_DATA[currentStance].symbol}
          </span>
          <span>{TRIGRAM_DATA[currentStance].korean}</span>
        </div>
      )}
    </div>
  );
}
