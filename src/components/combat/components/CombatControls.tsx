import React from "react";
import type { CombatControlsProps } from "../../../types";
import { KOREAN_COLORS } from "../../../types";
import { KoreanText } from "../../ui/base/korean-text/KoreanText";

export function CombatControls({
  players,
  onStanceChange,
  isExecutingTechnique,
  isPaused,
}: CombatControlsProps): React.ReactElement {
  const renderStanceSelector = (playerIndex: number) => (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        border: `2px solid #${KOREAN_COLORS.CYAN.toString(16).padStart(
          6,
          "0"
        )}`,
        borderRadius: "8px",
        padding: "16px",
        margin: "8px",
      }}
    >
      <KoreanText
        korean={`플레이어 ${playerIndex + 1} 자세`}
        english={`Player ${playerIndex + 1} Stance`}
        style={{ marginBottom: "12px", fontWeight: "bold" }}
      />

      {/* Stance buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {["geon", "tae", "li", "jin", "son", "gam", "gan", "gon"].map(
          (stance) => (
            <button
              key={stance}
              onClick={() => onStanceChange(playerIndex, stance as any)}
              disabled={isExecutingTechnique || isPaused}
              style={{
                padding: "8px 12px",
                backgroundColor:
                  players[playerIndex]?.stance === stance
                    ? `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`
                    : "transparent",
                border: `1px solid #${KOREAN_COLORS.GOLD.toString(16).padStart(
                  6,
                  "0"
                )}`,
                borderRadius: "4px",
                color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
                cursor:
                  isExecutingTechnique || isPaused ? "not-allowed" : "pointer",
                opacity: isExecutingTechnique || isPaused ? 0.5 : 1,
              }}
            >
              {stance.toUpperCase()}
            </button>
          )
        )}
      </div>
    </div>
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "20px",
        pointerEvents: "auto",
      }}
    >
      {renderStanceSelector(0)}
      {renderStanceSelector(1)}
    </div>
  );
}
