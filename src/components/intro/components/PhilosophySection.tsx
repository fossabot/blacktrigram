import React, { useState } from "react";
import {
  KOREAN_COLORS,
  KOREAN_FONT_FAMILY,
  TRIGRAM_DATA,
  type TrigramStance,
} from "../../../types";

export interface PhilosophySectionProps {
  readonly onNext: () => void;
  readonly onPrev: () => void;
}

export function PhilosophySection({
  onNext,
  onPrev,
}: PhilosophySectionProps): React.ReactElement {
  const [selectedTrigram, setSelectedTrigram] = useState<TrigramStance>("geon");
  const trigram = TRIGRAM_DATA[selectedTrigram];

  return (
    <div
      className="philosophy-section"
      style={{
        fontFamily: KOREAN_FONT_FAMILY,
        color: KOREAN_COLORS.WHITE,
        padding: "2rem",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          color: KOREAN_COLORS.GOLD,
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        팔괘 철학 (Trigram Philosophy)
      </h2>

      {/* Trigram Selector */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        {Object.entries(TRIGRAM_DATA).map(([stance, data]) => (
          <button
            key={stance}
            onClick={() => setSelectedTrigram(stance as TrigramStance)}
            style={{
              background:
                selectedTrigram === stance ? data.color : "transparent",
              color:
                selectedTrigram === stance
                  ? KOREAN_COLORS.BLACK
                  : KOREAN_COLORS.WHITE,
              border: `2px solid ${data.color}`,
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1.2rem",
              transition: "all 0.3s ease",
            }}
          >
            {data.symbol}
          </button>
        ))}
      </div>

      {/* Selected Trigram Details */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div
          style={{
            fontSize: "4rem",
            color: trigram.color,
            marginBottom: "1rem",
          }}
        >
          {trigram.symbol}
        </div>
        <h3 style={{ color: trigram.color, marginBottom: "0.5rem" }}>
          {trigram.koreanName}
        </h3>
        <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          {trigram.philosophy}
        </p>
        <p style={{ opacity: 0.8 }}>
          방향: {trigram.direction} • 원소: {trigram.element}
        </p>
      </div>

      {/* Technique Details */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <h4 style={{ color: KOREAN_COLORS.CYAN, marginBottom: "1rem" }}>
          전용 기술: {trigram.technique.koreanName}
        </h4>
        <p style={{ marginBottom: "1rem" }}>
          {trigram.technique.description.korean}
        </p>
        <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
          {trigram.technique.description.english}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ color: KOREAN_COLORS.DAMAGE_YELLOW }}>위력</div>
            <div>{trigram.technique.damage}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: KOREAN_COLORS.CYAN }}>정확도</div>
            <div>{Math.round(trigram.technique.accuracy * 100)}%</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: KOREAN_COLORS.Purple }}>기 소모</div>
            <div>{trigram.technique.kiCost}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: KOREAN_COLORS.Orange }}>사거리</div>
            <div>{trigram.technique.range}</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={onPrev}
          style={{
            background: "transparent",
            color: KOREAN_COLORS.WHITE,
            border: `2px solid ${KOREAN_COLORS.GRAY_MEDIUM}`,
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          ← 이전
        </button>
        <button
          onClick={onNext}
          style={{
            background: KOREAN_COLORS.TRADITIONAL_RED,
            color: KOREAN_COLORS.WHITE,
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          수련 시작 →
        </button>
      </div>
    </div>
  );
}
