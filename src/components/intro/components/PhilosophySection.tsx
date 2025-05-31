import React, { useState, useCallback } from "react";
import { TRIGRAM_DATA, KOREAN_COLORS, type TrigramStance, TRIGRAM_STANCES_ORDER } from "../../../types";

interface PhilosophySectionProps {
  readonly selectedStance: TrigramStance;
  readonly onNext: () => void;
  readonly onPrev: () => void;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({
  selectedStance,
  onNext,
  onPrev,
}) => {
  const [currentStanceIndex, setCurrentStanceIndex] = useState<number>(
    TRIGRAM_STANCES_ORDER.indexOf(selectedStance)
  );

  const handleNext = useCallback(() => {
    const nextIndex = (currentStanceIndex + 1) % TRIGRAM_STANCES_ORDER.length;
    setCurrentStanceIndex(nextIndex);
    onNext();
  }, [currentStanceIndex, onNext]);

  const handlePrev = useCallback(() => {
    const prevIndex = currentStanceIndex === 0 
      ? TRIGRAM_STANCES_ORDER.length - 1 
      : currentStanceIndex - 1;
    setCurrentStanceIndex(prevIndex);
    onPrev();
  }, [currentStanceIndex, onPrev]);

  const currentStance = TRIGRAM_STANCES_ORDER[currentStanceIndex];
  const trigram = currentStance ? TRIGRAM_DATA[currentStance] : TRIGRAM_DATA.geon;

  return (
    <div
      style={{
        padding: "2rem",
        background: "rgba(0,0,0,0.3)",
        borderRadius: "8px",
        border: `2px solid ${KOREAN_COLORS.GOLD}`,
        margin: "1rem 0",
        maxWidth: "800px",
      }}
    >
      {/* Navigation Header */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "2rem" 
      }}>
        <button
          onClick={handlePrev}
          style={{
            padding: "0.5rem 1rem",
            background: KOREAN_COLORS.ACCENT_BLUE,
            color: KOREAN_COLORS.WHITE,
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          ← 이전 (Previous)
        </button>

        <h2
          style={{
            color: `#${trigram.color.toString(16).padStart(6, "0")}`,
            textAlign: "center",
            fontSize: "1.8rem",
            margin: 0,
          }}
        >
          {trigram.symbol} {trigram.koreanName}
        </h2>

        <button
          onClick={handleNext}
          style={{
            padding: "0.5rem 1rem",
            background: KOREAN_COLORS.ACCENT_BLUE,
            color: KOREAN_COLORS.WHITE,
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          다음 (Next) →
        </button>
      </div>
      
      {/* Philosophy Content */}
      <div style={{ lineHeight: "1.6", fontSize: "1rem" }}>
        <h3 
          style={{ 
            color: `#${trigram.color.toString(16).padStart(6, "0")}`, 
            marginBottom: "0.5rem" 
          }}
        >
          철학 (Philosophy)
        </h3>
        <p style={{ marginBottom: "1rem" }}>{trigram.philosophy}</p>
        
        <h3 
          style={{ 
            color: `#${trigram.color.toString(16).padStart(6, "0")}`, 
            marginBottom: "0.5rem" 
          }}
        >
          원소 (Element)
        </h3>
        <p style={{ marginBottom: "1rem" }}>{trigram.element}</p>
        
        <h3 
          style={{ 
            color: `#${trigram.color.toString(16).padStart(6, "0")}`, 
            marginBottom: "0.5rem" 
          }}
        >
          방향 (Direction)
        </h3>
        <p style={{ marginBottom: "1rem" }}>{trigram.direction}</p>
        
        <h3 
          style={{ 
            color: `#${trigram.color.toString(16).padStart(6, "0")}`, 
            marginBottom: "0.5rem" 
          }}
        >
          기술 (Technique)
        </h3>
        <div style={{ 
          background: "rgba(255,255,255,0.05)", 
          padding: "1rem", 
          borderRadius: "4px" 
        }}>
          <h4 style={{ color: KOREAN_COLORS.CYAN, marginBottom: "0.5rem" }}>
            {trigram.technique.koreanName}
          </h4>
          <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
            {trigram.technique.description.korean}
          </p>
          <p style={{ fontSize: "0.8rem", opacity: 0.8 }}>
            {trigram.technique.description.english}
          </p>
          
          {/* Technique Stats */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(2, 1fr)", 
            gap: "0.5rem",
            marginTop: "1rem",
            fontSize: "0.85rem"
          }}>
            <div>위력 (Damage): {trigram.technique.damage}</div>
            <div>기 소모 (Ki Cost): {trigram.technique.kiCost}</div>
            <div>체력 소모 (Stamina): {trigram.technique.staminaCost}</div>
            <div>사거리 (Range): {trigram.technique.range}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
