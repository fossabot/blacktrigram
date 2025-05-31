import React, { useState, useCallback } from "react";
import { KoreanText } from "../../ui/base/KoreanText";
import {
  KOREAN_COLORS,
  TRIGRAM_DATA,
  TRIGRAM_STANCES_ORDER,
  type TrigramStance,
} from "../../../types";

export interface PhilosophySectionProps {
  readonly selectedStance?: TrigramStance;
  readonly onStanceSelect?: (stance: TrigramStance) => void;
}

export function PhilosophySection({
  selectedStance,
  onStanceSelect,
}: PhilosophySectionProps = {}): React.ReactElement {
  const [currentStance, setCurrentStance] = useState<TrigramStance>(
    selectedStance || "geon"
  );

  const handleStanceSelect = useCallback(
    (stance: TrigramStance) => {
      setCurrentStance(stance);
      onStanceSelect?.(stance);
    },
    [onStanceSelect]
  );

  const handleNextStance = useCallback(() => {
    const currentIndex = TRIGRAM_STANCES_ORDER.indexOf(currentStance);
    const nextIndex = (currentIndex + 1) % TRIGRAM_STANCES_ORDER.length;
    const nextStance = TRIGRAM_STANCES_ORDER[nextIndex];
    if (nextStance) {
      handleStanceSelect(nextStance);
    }
  }, [currentStance, handleStanceSelect]);

  const handlePrevStance = useCallback(() => {
    const currentIndex = TRIGRAM_STANCES_ORDER.indexOf(currentStance);
    const prevIndex =
      currentIndex === 0 ? TRIGRAM_STANCES_ORDER.length - 1 : currentIndex - 1;
    const prevStance = TRIGRAM_STANCES_ORDER[prevIndex];
    if (prevStance) {
      handleStanceSelect(prevStance);
    }
  }, [currentStance, handleStanceSelect]);

  const trigramData = TRIGRAM_DATA[currentStance];

  return (
    <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
      <KoreanText
        text="팔괘 철학"
        englishText="Eight Trigrams Philosophy"
        size="xlarge"
        color={`#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`}
        showBoth={true}
        style={{ marginBottom: "2rem" }}
      />

      {/* Stance Selector */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          marginBottom: "2rem",
          padding: "1rem",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "12px",
          border: `2px solid #${trigramData.color.toString(16).padStart(6, "0")}`,
        }}
      >
        <button
          onClick={handlePrevStance}
          style={{
            padding: "0.5rem 1rem",
            background: `#${KOREAN_COLORS.ACCENT_BLUE.toString(16).padStart(
              6,
              "0"
            )}`,
            color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1.2rem",
          }}
        >
          ←
        </button>

        <div style={{ textAlign: "center", minWidth: "200px" }}>
          <div
            style={{
              fontSize: "3rem",
              color: `#${trigramData.color.toString(16).padStart(6, "0")}`,
              marginBottom: "0.5rem",
            }}
          >
            {trigramData.symbol}
          </div>
          <KoreanText
            text={trigramData.koreanName}
            englishText={trigramData.englishName}
            size="large"
            showBoth={true}
            style={{ marginBottom: "0.5rem" }}
          />
          <div
            style={{
              fontSize: "0.9rem",
              color: `#${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`,
            }}
          >
            {trigramData.element} • {trigramData.direction}
          </div>
        </div>

        <button
          onClick={handleNextStance}
          style={{
            padding: "0.5rem 1rem",
            background: `#${KOREAN_COLORS.ACCENT_BLUE.toString(16).padStart(
              6,
              "0"
            )}`,
            color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1.2rem",
          }}
        >
          →
        </button>
      </div>

      {/* Philosophy Content */}
      <div
        style={{
          background: "rgba(0,0,0,0.6)",
          padding: "2rem",
          borderRadius: "12px",
          border: `1px solid #${trigramData.color.toString(16).padStart(6, "0")}`,
          textAlign: "left",
        }}
      >
        <KoreanText
          text="철학과 의미"
          englishText="Philosophy and Meaning"
          size="large"
          color={`#${trigramData.color.toString(16).padStart(6, "0")}`}
          showBoth={true}
          style={{ marginBottom: "1.5rem", textAlign: "center" }}
        />

        <div style={{ marginBottom: "1.5rem" }}>
          <KoreanText
            text="핵심 철학:"
            englishText="Core Philosophy:"
            size="medium"
            weight="bold"
            showBoth={true}
            style={{ marginBottom: "0.5rem" }}
          />
          <div
            style={{
              fontSize: "1rem",
              color: `#${KOREAN_COLORS.GRAY_LIGHT.toString(16).padStart(
                6,
                "0"
              )}`,
              lineHeight: "1.6",
              marginLeft: "1rem",
            }}
          >
            {trigramData.philosophy}
          </div>
        </div>

        {/* Technique Information */}
        <div style={{ marginBottom: "1.5rem" }}>
          <KoreanText
            text="대표 기술:"
            englishText="Representative Technique:"
            size="medium"
            weight="bold"
            showBoth={true}
            style={{ marginBottom: "0.5rem" }}
          />
          <div style={{ marginLeft: "1rem" }}>
            <KoreanText
              text={trigramData.technique.koreanName}
              englishText={trigramData.technique.englishName}
              size="medium"
              color={`#${trigramData.color.toString(16).padStart(6, "0")}`}
              showBoth={true}
              style={{ marginBottom: "0.5rem" }}
            />
            <div
              style={{
                fontSize: "0.9rem",
                color: `#${KOREAN_COLORS.GRAY_LIGHT.toString(16).padStart(
                  6,
                  "0"
                )}`,
                lineHeight: "1.5",
              }}
            >
              {trigramData.technique.description.korean}
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: `#${KOREAN_COLORS.GRAY_MEDIUM.toString(16).padStart(
                  6,
                  "0"
                )}`,
                fontStyle: "italic",
                marginTop: "0.25rem",
              }}
            >
              {trigramData.technique.description.english}
            </div>
          </div>
        </div>

        {/* Combat Statistics */}
        <div>
          <KoreanText
            text="전투 특성:"
            englishText="Combat Characteristics:"
            size="medium"
            weight="bold"
            showBoth={true}
            style={{ marginBottom: "0.5rem" }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginLeft: "1rem",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: `#${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`,
                }}
              >
                공격력: {Math.round((trigramData.damageModifier || 1) * 100)}%
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: `#${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`,
                }}
              >
                방어력: {Math.round((trigramData.defenseModifier || 1) * 100)}%
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: `#${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`,
                }}
              >
                속도: {Math.round((trigramData.speedModifier || 1) * 100)}%
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: `#${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`,
                }}
              >
                기력 회복: {Math.round((trigramData.kiRegenRate || 1) * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Trigrams Quick Reference */}
      <div style={{ marginTop: "2rem" }}>
        <KoreanText
          text="팔괘 요약"
          englishText="Eight Trigrams Summary"
          size="large"
          color={`#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`}
          showBoth={true}
          style={{ marginBottom: "1rem" }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1rem",
          }}
        >
          {TRIGRAM_STANCES_ORDER.map((stance) => {
            const data = TRIGRAM_DATA[stance];
            const isSelected = stance === currentStance;
            return (
              <button
                key={stance}
                onClick={() => handleStanceSelect(stance)}
                style={{
                  padding: "1rem",
                  background: isSelected
                    ? `#${data.color.toString(16).padStart(6, "0")}44`
                    : "rgba(255,255,255,0.05)",
                  border: `2px solid #${data.color.toString(16).padStart(6, "0")}`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    color: `#${data.color.toString(16).padStart(6, "0")}`,
                    marginBottom: "0.5rem",
                  }}
                >
                  {data.symbol}
                </div>
                <div style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                  {data.korean}
                </div>
                <div style={{ fontSize: "0.7rem", opacity: 0.8 }}>
                  {data.english}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
import React, { useState, useCallback } from "react";
import { KoreanText } from "../../ui/base/KoreanText";
import {
  KOREAN_COLORS,
  TRIGRAM_DATA,
  TRIGRAM_STANCES_ORDER,
  type TrigramStance,
} from "../../../types";

export interface PhilosophySectionProps {
  readonly selectedStance?: TrigramStance;
  readonly onStanceSelect?: (stance: TrigramStance) => void;
}

export function PhilosophySection({
  selectedStance,
  onStanceSelect,
}: PhilosophySectionProps = {}): React.ReactElement {
  const [currentStance, setCurrentStance] = useState<TrigramStance>(
    selectedStance || "geon"
  );

  const handleStanceSelect = useCallback(
    (stance: TrigramStance) => {
      setCurrentStance(stance);
      onStanceSelect?.(stance);
    },
    [onStanceSelect]
  );

  const handleNextStance = useCallback(() => {
    const currentIndex = TRIGRAM_STANCES_ORDER.indexOf(currentStance);
    const nextIndex = (currentIndex + 1) % TRIGRAM_STANCES_ORDER.length;
    const nextStance = TRIGRAM_STANCES_ORDER[nextIndex];
    if (nextStance) {
      handleStanceSelect(nextStance);
    }
  }, [currentStance, handleStanceSelect]);

  const handlePrevStance = useCallback(() => {
    const currentIndex = TRIGRAM_STANCES_ORDER.indexOf(currentStance);
    const prevIndex =
      currentIndex === 0 ? TRIGRAM_STANCES_ORDER.length - 1 : currentIndex - 1;
    const prevStance = TRIGRAM_STANCES_ORDER[prevIndex];
    if (prevStance) {
      handleStanceSelect(prevStance);
    }
  }, [currentStance, handleStanceSelect]);

  const trigramData = TRIGRAM_DATA[currentStance];

  return (
    <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
      <KoreanText
        text="팔괘 철학"
        englishText="Eight Trigrams Philosophy"
        size="xlarge"
        color={`#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`}
        showBoth={true}
        style={{ marginBottom: "2rem" }}
      />

      {/* Stance Selector */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          marginBottom: "2rem",
          padding: "1rem",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "12px",
          border: `2px solid #${trigramData.color.toString(16).padStart(6, "0")}`,
        }}
      >
        <button
          onClick={handlePrevStance}
          style={{
            padding: "0.5rem 1rem",
            background: `#${KOREAN_COLORS.ACCENT_BLUE.toString(16).padStart(
              6,
              "0"
            )}`,
            color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1.2rem",
          }}
        >
          ←
        </button>

        <div style={{ textAlign: "center", minWidth: "200px" }}>
          <div
            style={{
              fontSize: "3rem",
              color: `#${trigramData.color.toString(16).padStart(6, "0")}`,
              marginBottom: "0.5rem",
            }}
          >
            {trigramData.symbol}
          </div>
          <KoreanText
            text={trigramData.koreanName}
            englishText={trigramData.englishName}
            size="large"
            showBoth={true}
            style={{ marginBottom: "0.5rem" }}
          />
          <div
            style={{
              fontSize: "0.9rem",
              color: `#${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`,
            }}
          >
            {trigramData.element} • {trigramData.direction}
          </div>
        </div>

        <button
          onClick={handleNextStance}
          style={{
            padding: "0.5rem 1rem",
            background: `#${KOREAN_COLORS.ACCENT_BLUE.toString(16).padStart(
              6,
              "0"
            )}`,
            color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1.2rem",
          }}
        >
          →
        </button>
      </div>

      {/* Philosophy Content */}
      <div
        style={{
          background: "rgba(0,0,0,0.6)",
          padding: "2rem",
          borderRadius: "12px",
          border: `1px solid #${trigramData.color.toString(16).padStart(6, "0")}`,
          textAlign: "left",
        }}
      >
        <KoreanText
          text="철학과 의미"
          englishText="Philosophy and Meaning"
          size="large"
          color={`#${trigramData.color.toString(16).padStart(6, "0")}`}
          showBoth={true}
          style={{ marginBottom: "1.5rem", textAlign: "center" }}
        />

        <div style={{ marginBottom: "1.5rem" }}>
          <KoreanText
            text="핵심 철학:"
            englishText="Core Philosophy:"
            size="medium"
            weight="bold"
            showBoth={true}
            style={{ marginBottom: "0.5rem" }}
          />
          <div
            style={{
              fontSize: "1rem",
              color: `#${KOREAN_COLORS.GRAY_LIGHT.toString(16).padStart(
                6,
                "0"
              )}`,
              lineHeight: "1.6",
              marginLeft: "1rem",
            }}
          >
            {trigramData.philosophy}
          </div>
        </div>

        {/* Technique Information */}
        <div style={{ marginBottom: "1.5rem" }}>
          <KoreanText
            text="대표 기술:"
            englishText="Representative Technique:"
            size="medium"
            weight="bold"
            showBoth={true}
            style={{ marginBottom: "0.5rem" }}
          />
          <div style={{ marginLeft: "1rem" }}>
            <KoreanText
              text={trigramData.technique.koreanName}
              englishText={trigramData.technique.englishName}
              size="medium"
              color={`#${trigramData.color.toString(16).padStart(6, "0")}`}
              showBoth={true}
              style={{ marginBottom: "0.5rem" }}
            />
            <div
              style={{
                fontSize: "0.9rem",
                color: `#${KOREAN_COLORS.GRAY_LIGHT.toString(16).padStart(
                  6,
                  "0"
                )}`,
                lineHeight: "1.5",
              }}
            >
              {trigramData.technique.description.korean}
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: `#${KOREAN_COLORS.GRAY_MEDIUM.toString(16).padStart(
                  6,
                  "0"
                )}`,
                fontStyle: "italic",
                marginTop: "0.25rem",
              }}
            >
              {trigramData.technique.description.english}
            </div>
          </div>
        </div>

        {/* Combat Statistics */}
        <div>
          <KoreanText
            text="전투 특성:"
            englishText="Combat Characteristics:"
            size="medium"
            weight="bold"
            showBoth={true}
            style={{ marginBottom: "0.5rem" }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginLeft: "1rem",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: `#${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`,
                }}
              >
                공격력: {Math.round((trigramData.damageModifier || 1) * 100)}%
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: `#${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`,
                }}
              >
                방어력: {Math.round((trigramData.defenseModifier || 1) * 100)}%
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: `#${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`,
                }}
              >
                속도: {Math.round((trigramData.speedModifier || 1) * 100)}%
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: `#${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`,
                }}
              >
                기력 회복: {Math.round((trigramData.kiRegenRate || 1) * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Trigrams Quick Reference */}
      <div style={{ marginTop: "2rem" }}>
        <KoreanText
          text="팔괘 요약"
          englishText="Eight Trigrams Summary"
          size="large"
          color={`#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`}
          showBoth={true}
          style={{ marginBottom: "1rem" }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1rem",
          }}
        >
          {TRIGRAM_STANCES_ORDER.map((stance) => {
            const data = TRIGRAM_DATA[stance];
            const isSelected = stance === currentStance;
            return (
              <button
                key={stance}
                onClick={() => handleStanceSelect(stance)}
                style={{
                  padding: "1rem",
                  background: isSelected
                    ? `#${data.color.toString(16).padStart(6, "0")}44`
                    : "rgba(255,255,255,0.05)",
                  border: `2px solid #${data.color.toString(16).padStart(6, "0")}`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    color: `#${data.color.toString(16).padStart(6, "0")}`,
                    marginBottom: "0.5rem",
                  }}
                >
                  {data.symbol}
                </div>
                <div style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                  {data.korean}
                </div>
                <div style={{ fontSize: "0.7rem", opacity: 0.8 }}>
                  {data.english}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
import React, { useState, useCallback } from "react";
import { 
  TRIGRAM_DATA, 
  KOREAN_COLORS, 
  type TrigramStance, 
  TRIGRAM_STANCES_ORDER 
} from "../../../types";

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
    TRIGRAM_STANCES_ORDER.indexOf(selectedStance) || 0
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
  const trigramData = TRIGRAM_DATA[currentStance];

  return (
    <div className="philosophy-section">
      <div
        className="philosophy-grid"
        style={{
          color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, '0')}`,
          fontFamily: 'Noto Sans KR, Arial, sans-serif',
          padding: '2rem',
          background: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '10px',
          border: `2px solid #${KOREAN_COLORS.GOLD.toString(16).padStart(6, '0')}`,
        }}
      >
        <h2 style={{
          color: `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, '0')}`,
          textAlign: 'center',
          marginBottom: '2rem',
        }}>
          팔괘 철학 (Eight Trigrams Philosophy)
        </h2>

        <div
          className="trigram-philosophy"
          style={{
            color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, '0')}`,
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ 
              fontSize: '3rem',
              color: `#${trigramData.color.toString(16).padStart(6, '0')}`,
            }}>
              {trigramData.symbol}
            </span>
          </div>

          <h3 style={{
            color: `#${KOREAN_COLORS.CYAN.toString(16).padStart(6, '0')}`,
            marginBottom: '1rem',
          }}>
            {trigramData.korean} ({trigramData.english})
          </h3>

          <div style={{ marginBottom: '1rem' }}>
            <p><strong>원소:</strong> {trigramData.element}</p>
            <p><strong>방향:</strong> {trigramData.direction}</p>
            <p><strong>철학:</strong> {trigramData.philosophy}</p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ 
              color: `#${KOREAN_COLORS.CYAN.toString(16).padStart(6, '0')}`,
              marginBottom: '0.5rem' 
            }}>
              대표 기술: {trigramData.technique.koreanName}
            </h4>
            <p>{trigramData.technique.description.korean}</p>
            <p style={{ fontStyle: 'italic', opacity: 0.8 }}>
              {trigramData.technique.description.english}
            </p>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '2rem',
          }}>
            <button
              onClick={handlePrev}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: `#${KOREAN_COLORS.DOJANG_BLUE.toString(16).padStart(6, '0')}`,
                color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, '0')}`,
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              ← 이전
            </button>

            <span style={{ 
              color: `#${KOREAN_COLORS.GRAY_LIGHT.toString(16).padStart(6, '0')}` 
            }}>
              {currentStanceIndex + 1} / {TRIGRAM_STANCES_ORDER.length}
            </span>

            <button
              onClick={handleNext}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: `#${KOREAN_COLORS.DOJANG_BLUE.toString(16).padStart(6, '0')}`,
                color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, '0')}`,
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              다음 →
            </button>
          </div>
        </div>

        {/* Traditional Korean martial arts context */}
        <div style={{ 
          marginTop: '2rem',
          padding: '1rem',
          background: 'rgba(255, 215, 0, 0.1)',
          borderRadius: '5px',
        }}>
          <h4 style={{ 
            color: `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, '0')}`,
            marginBottom: '0.5rem',
          }}>
            전통 무예에서의 의미
          </h4>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
            {trigramData.korean}은(는) 한국 전통 무예에서 {trigramData.philosophy}을(를) 
            상징하며, {trigramData.element} 원소의 특성을 반영한 움직임과 기법을 
            나타냅니다. 이 자세는 {trigramData.direction} 방향의 기운을 활용하여 
            상대방과의 조화로운 대립을 추구합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

// Default export for easier imports
export function PhilosophySection(): React.ReactElement {
  const [selectedStance, setSelectedStance] = useState<TrigramStance>("geon");

  const handleNext = useCallback(() => {
    const currentIndex = TRIGRAM_STANCES_ORDER.indexOf(selectedStance);
    const nextIndex = (currentIndex + 1) % TRIGRAM_STANCES_ORDER.length;
    setSelectedStance(TRIGRAM_STANCES_ORDER[nextIndex]);
  }, [selectedStance]);

  const handlePrev = useCallback(() => {
    const currentIndex = TRIGRAM_STANCES_ORDER.indexOf(selectedStance);
    const prevIndex = currentIndex === 0 
      ? TRIGRAM_STANCES_ORDER.length - 1 
      : currentIndex - 1;
    setSelectedStance(TRIGRAM_STANCES_ORDER[prevIndex]);
  }, [selectedStance]);

  return (
    <PhilosophySection
      selectedStance={selectedStance}
      onNext={handleNext}
      onPrev={handlePrev}
    />
  );
}
