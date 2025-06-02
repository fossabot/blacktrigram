import React, { useState } from "react";
import { KoreanHeader } from "../../ui/base/KoreanHeader";
import type { PhilosophySectionProps, TrigramStance } from "../../../types";
import { TRIGRAM_DATA, KOREAN_COLORS } from "../../../types";

export function PhilosophySection({
  onGamePhaseChange,
}: PhilosophySectionProps): React.ReactElement {
  const [selectedStance, setSelectedStance] = useState<TrigramStance | null>(
    "geon"
  );

  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "100vh",
    padding: "2rem",
    backgroundColor: `#${KOREAN_COLORS.BLACK.toString(16).padStart(6, "0")}`,
    color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
  };

  const renderStanceCard = (stance: TrigramStance) => {
    const trigramData = TRIGRAM_DATA[stance as keyof typeof TRIGRAM_DATA];
    if (!trigramData) return null;

    return (
      <div
        key={stance}
        onClick={() => setSelectedStance(stance)}
        style={{
          padding: "1rem",
          margin: "0.5rem",
          border:
            selectedStance === stance ? "2px solid gold" : "1px solid gray",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        <h3>
          {trigramData.symbol} {trigramData.korean}
        </h3>
        <p>{trigramData.philosophy}</p>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <KoreanHeader
        title="팔괘 철학 (Trigram Philosophy)"
        subtitle="한국 무예의 전통 철학 (Traditional Korean Martial Philosophy)"
        level={1}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {(Object.keys(TRIGRAM_DATA) as TrigramStance[]).map(renderStanceCard)}
      </div>

      <button
        onClick={() => onGamePhaseChange("intro")}
        style={{
          padding: "1rem 2rem",
          marginTop: "2rem",
          backgroundColor: `#${KOREAN_COLORS.DOJANG_BLUE.toString(16).padStart(
            6,
            "0"
          )}`,
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        메뉴로 돌아가기 (Return to Menu)
      </button>
    </div>
  );
}
