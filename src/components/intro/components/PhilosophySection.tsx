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
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    overflow: "auto",
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    marginTop: "2rem",
  };

  const trigramCardStyle: React.CSSProperties = {
    padding: "1.5rem",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    transition: "all 0.3s ease",
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
        korean="팔괘 철학 (Trigram Philosophy)"
        subtitle="Traditional Korean martial arts wisdom through the Eight Trigrams"
        level={1}
      />

      <div style={{ textAlign: "center", margin: "2rem 0" }}>
        <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          팔괘는 우주의 기본 원리를 나타내며, 각각 고유한 무술 철학을 담고
          있습니다.
        </p>
        <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
          The Eight Trigrams represent fundamental principles of the universe,
          each containing unique martial philosophy.
        </p>
      </div>

      <div style={gridStyle}>
        {Object.entries(TRIGRAM_DATA).map(([stance, data]) => (
          <div key={stance} style={trigramCardStyle}>
            <div
              style={{
                fontSize: "3rem",
                color: `#${data.color.toString(16).padStart(6, "0")}`,
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              {data.symbol}
            </div>

            <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
              {data.korean} ({data.english})
            </h3>

            <div style={{ marginBottom: "1rem" }}>
              <strong>철학:</strong>
              <div style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
                {data.philosophy}
              </div>
            </div>

            <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>
              <div>원소: {data.element}</div>
              <div>특성: {data.description?.korean || "전통 무술 기법"}</div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "3rem",
          textAlign: "center",
          borderTop: `1px solid #${KOREAN_COLORS.CYAN.toString(16).padStart(
            6,
            "0"
          )}`,
          paddingTop: "2rem",
        }}
      >
        <button
          onClick={() => onGamePhaseChange("intro")}
          style={{
            padding: "1rem 2rem",
            fontSize: "1.1rem",
            backgroundColor: `#${KOREAN_COLORS.ACCENT_BLUE.toString(
              16
            ).padStart(6, "0")}`,
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          메뉴로 돌아가기 (Return to Menu)
        </button>
      </div>
    </div>
  );
}
