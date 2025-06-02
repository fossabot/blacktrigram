import React, { useState, useCallback } from "react";
import { KoreanHeader } from "../ui/base/KoreanHeader";
import type { TrainingScreenProps, TrigramStance } from "../../types";
import { TRIGRAM_DATA, KOREAN_COLORS } from "../../types";

export function TrainingScreen({
  onGamePhaseChange,
  onStanceChange,
  selectedStance,
}: TrainingScreenProps): React.ReactElement {
  const [focusedStance, setFocusedStance] = useState<TrigramStance | null>(
    null
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

  const stanceCardStyle = (stance: TrigramStance): React.CSSProperties => {
    const isSelected = selectedStance === stance;
    const isFocused = focusedStance === stance;
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
      transform: isFocused ? "scale(1.05)" : "scale(1)",
    };
  };

  const symbolStyle = (stance: TrigramStance): React.CSSProperties => {
    const trigramData = TRIGRAM_DATA[stance];
    return {
      fontSize: "3rem",
      color: `#${trigramData.color.toString(16).padStart(6, "0")}`,
      textAlign: "center" as const,
      marginBottom: "1rem",
    };
  };

  const handleStanceSelect = useCallback(
    (stance: TrigramStance) => {
      onStanceChange(stance);
    },
    [onStanceChange]
  );

  const renderStanceCard = (stance: TrigramStance) => {
    const trigramData = TRIGRAM_DATA[stance];
    const technique = trigramData.technique;

    return (
      <div
        key={stance}
        style={stanceCardStyle(stance)}
        onClick={() => handleStanceSelect(stance)}
        onMouseEnter={() => setFocusedStance(stance)}
        onMouseLeave={() => setFocusedStance(null)}
      >
        <div style={symbolStyle(stance)}>{trigramData.symbol}</div>

        <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
          {trigramData.korean} ({trigramData.english})
        </h3>

        <div style={{ marginBottom: "1rem" }}>
          <strong>기법:</strong> {technique.koreanName}
          <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
            {technique.englishName}
          </div>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <strong>설명:</strong>
          <div style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
            {technique.description.korean}
          </div>
          <div
            style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: "0.25rem" }}
          >
            {technique.description.english}
          </div>
        </div>

        <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>
          <div>데미지: {technique.damage || "15-25"}</div>
          <div>
            스태미나: {technique.staminaCost} | 기력: {technique.kiCost}
          </div>
          <div>타입: {technique.damageType}</div>
        </div>
      </div>
    );
  };

  const trigramData = TRIGRAM_DATA[selectedStance];
  const stanceColor = KOREAN_COLORS.GOLD; // Use consistent color

  return (
    <div style={containerStyle}>
      <KoreanHeader
        title="무술 수련 (Martial Training)"
        subtitle="전통 한국 무예 연습 (Traditional Korean Martial Arts Practice)"
        level={1}
      />

      <div style={{ textAlign: "center", margin: "2rem 0" }}>
        <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          팔괘 선택 (Select Trigram Stance)
        </p>
        <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
          각 팔괘는 고유한 철학과 기법을 가지고 있습니다
        </p>
        <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>
          Each trigram embodies unique philosophy and techniques
        </p>
      </div>

      <div style={gridStyle}>
        {(Object.keys(TRIGRAM_DATA) as TrigramStance[]).map(renderStanceCard)}
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
        {selectedStance && (
          <div style={{ marginBottom: "2rem" }}>
            <p
              style={{
                fontSize: "1.2rem",
                color: `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`,
              }}
            >
              선택된 팔괘: {TRIGRAM_DATA[selectedStance].symbol}{" "}
              {TRIGRAM_DATA[selectedStance].korean}
            </p>
            <p style={{ fontSize: "1rem", opacity: 0.8 }}>
              Selected Trigram: {TRIGRAM_DATA[selectedStance].english}
            </p>
          </div>
        )}

        {trigramData && (
          <>
            <div
              style={{ color: `#${stanceColor.toString(16).padStart(6, "0")}` }}
            >
              <h3>
                {trigramData.name.korean} ({trigramData.name.english})
              </h3>
              <p>{trigramData.philosophy}</p>
            </div>

            <div>
              <h4>Preferred Techniques:</h4>
              <ul>
                {trigramData.preferredTechniques.map((technique, index) => (
                  <li key={index}>{technique}</li>
                ))}
              </ul>
            </div>
          </>
        )}

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
