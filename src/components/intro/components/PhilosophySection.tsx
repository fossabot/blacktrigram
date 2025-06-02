import React, { useState } from "react";
import { KoreanHeader } from "../../ui/base/KoreanHeader";
import type { PhilosophySectionProps, TrigramStance } from "../../../types";
import { TRIGRAM_DATA, KOREAN_COLORS } from "../../../types";

export function PhilosophySection({
  onGamePhaseChange,
}: PhilosophySectionProps): React.ReactElement {
  const [selectedStance, setSelectedStance] = useState<TrigramStance | null>(
    null
  );

  const containerStyle: React.CSSProperties = {
    width: "100%",
    minHeight: "100vh",
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

  const trigramCardStyle = (stance: TrigramStance): React.CSSProperties => {
    const isSelected = selectedStance === stance;
    const trigramData = TRIGRAM_DATA[stance];

    return {
      padding: "1.5rem",
      borderRadius: "8px",
      backgroundColor: isSelected
        ? `rgba(${parseInt(
            trigramData.color.toString(16).slice(0, 2),
            16
          )}, ${parseInt(
            trigramData.color.toString(16).slice(2, 4),
            16
          )}, ${parseInt(trigramData.color.toString(16).slice(4, 6), 16)}, 0.3)`
        : "rgba(255, 255, 255, 0.1)",
      border: isSelected
        ? `3px solid #${trigramData.color.toString(16).padStart(6, "0")}`
        : "2px solid rgba(255, 255, 255, 0.2)",
      cursor: "pointer",
      transition: "all 0.3s ease",
      transform: isSelected ? "scale(1.02)" : "scale(1)",
    };
  };

  const symbolStyle = (stance: TrigramStance): React.CSSProperties => {
    const trigramData = TRIGRAM_DATA[stance];
    return {
      fontSize: "3rem",
      color: `#${trigramData.color.toString(16).padStart(6, "0")}`,
      textAlign: "center" as const,
      marginBottom: "1rem",
      textShadow: "0 0 10px rgba(255,255,255,0.3)",
    };
  };

  return (
    <div style={containerStyle}>
      <KoreanHeader
        korean="팔괘 철학"
        english="Trigram Philosophy"
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
          <div
            key={stance}
            style={trigramCardStyle(stance as TrigramStance)}
            onClick={() => setSelectedStance(stance as TrigramStance)}
            onMouseEnter={() => setSelectedStance(stance as TrigramStance)}
            onMouseLeave={() => setSelectedStance(null)}
          >
            <div style={symbolStyle(stance as TrigramStance)}>
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

            <div style={{ marginBottom: "1rem" }}>
              <strong>무술 적용:</strong>
              <div style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
                {data.technique.description.korean}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  opacity: 0.8,
                  marginTop: "0.25rem",
                }}
              >
                {data.technique.description.english}
              </div>
            </div>

            <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>
              <div>원소: {data.element}</div>
              <div>기법: {data.technique.koreanName}</div>
              <div>피해: {data.technique.damage}</div>
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
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              color: `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`,
            }}
          >
            팔괘의 상극상생 (Trigram Interactions)
          </h3>
          <p style={{ fontSize: "0.9rem", opacity: 0.8, marginTop: "1rem" }}>
            각 팔괘는 서로 다른 팔괘와 상극 또는 상생의 관계를 가지며, 이는
            전투에서 전략적 우위를 결정합니다.
          </p>
          <p style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: "0.5rem" }}>
            Each trigram has complementary or opposing relationships with
            others, determining strategic advantages in combat.
          </p>
        </div>

        <button
          onClick={() => onGamePhaseChange("intro")}
          style={{
            padding: "1rem 2rem",
            fontSize: "1.1rem",
            backgroundColor: `#${KOREAN_COLORS.DOJANG_BLUE.toString(
              16
            ).padStart(6, "0")}`,
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "1rem",
          }}
        >
          메뉴로 돌아가기 (Return to Menu)
        </button>

        <button
          onClick={() => onGamePhaseChange("training")}
          style={{
            padding: "1rem 2rem",
            fontSize: "1.1rem",
            backgroundColor: `#${KOREAN_COLORS.GOLD.toString(16).padStart(
              6,
              "0"
            )}`,
            color: "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          수련 시작 (Begin Training)
        </button>
      </div>
    </div>
  );
}
