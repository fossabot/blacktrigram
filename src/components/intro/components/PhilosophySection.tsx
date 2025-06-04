import React from "react";
import type { PhilosophySectionProps } from "../../../types";
import { KOREAN_COLORS } from "../../../types";
import { KoreanHeader } from "../../ui/base/KoreanHeader";
import { KoreanText } from "../../ui/base/korean-text/KoreanText";

export function PhilosophySection({
  onGamePhaseChange,
}: PhilosophySectionProps): React.ReactElement {
  const philosophyContent = [
    {
      korean: "균형의 원리",
      english: "The Principle of Balance",
      description: "모든 무술의 기초는 몸과 마음의 균형에 있습니다.",
    },
    {
      korean: "팔괘의 지혜",
      english: "Wisdom of the Eight Trigrams",
      description: "여덟 개의 괘를 통해 자연의 힘을 이해하고 활용합니다.",
    },
    {
      korean: "기의 순환",
      english: "Circulation of Ki",
      description: "생명 에너지의 흐름을 조절하여 완벽한 기법을 구사합니다.",
    },
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <KoreanHeader
        title={{
          korean: "흑괘의 철학",
          english: "Philosophy of Black Trigram",
        }} // Fixed: Provide title prop
        subtitle="무술의 정신적 기초"
        level={1}
      />

      <div style={{ marginTop: "2rem" }}>
        {philosophyContent.map((content, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              padding: "1.5rem",
              margin: "1rem 0",
              borderRadius: "8px",
              border: `1px solid #${KOREAN_COLORS.GOLD.toString(16).padStart(
                6,
                "0"
              )}`,
            }}
          >
            <KoreanText
              korean={content.korean}
              english={content.english}
              size="large"
              weight={700}
              style={{ marginBottom: "1rem" }}
            />
            <p
              style={{
                color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              {content.description}
            </p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <button
          onClick={() => onGamePhaseChange("training")}
          style={{
            padding: "1rem 2rem",
            backgroundColor: `#${KOREAN_COLORS.GOLD.toString(16).padStart(
              6,
              "0"
            )}`,
            color: `#${KOREAN_COLORS.BLACK.toString(16).padStart(6, "0")}`,
            border: "none",
            borderRadius: "4px",
            fontSize: "1.2rem",
            cursor: "pointer",
            margin: "0.5rem",
          }}
        >
          훈련으로 이동 (Go to Training)
        </button>

        <button
          onClick={() => onGamePhaseChange("menu")}
          style={{
            padding: "1rem 2rem",
            backgroundColor: "transparent",
            color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
            border: `1px solid #${KOREAN_COLORS.WHITE.toString(16).padStart(
              6,
              "0"
            )}`,
            borderRadius: "4px",
            fontSize: "1.2rem",
            cursor: "pointer",
            margin: "0.5rem",
          }}
        >
          메뉴로 돌아가기 (Back to Menu)
        </button>
      </div>

      {/* Philosophy sections */}
      <div style={{ marginTop: "3rem" }}>
        <KoreanHeader
          korean="무도 철학"
          english="Martial Arts Philosophy"
          level={1}
        />

        {/* Add subtitle as separate element */}
        <div style={{ marginBottom: "20px", color: "#888" }}>
          Traditional Korean Martial Arts Wisdom
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {[
            { korean: "건", english: "Heaven", element: "Metal" },
            { korean: "태", english: "Lake", element: "Metal" },
            { korean: "리", english: "Fire", element: "Fire" },
            { korean: "진", english: "Thunder", element: "Wood" },
            { korean: "손", english: "Wind", element: "Wood" },
            { korean: "감", english: "Water", element: "Water" },
            { korean: "간", english: "Mountain", element: "Earth" },
            { korean: "곤", english: "Earth", element: "Earth" },
          ].map((trigram, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                padding: "1rem",
                borderRadius: "4px",
                textAlign: "center",
              }}
            >
              <KoreanText
                korean={trigram.korean}
                english={trigram.english}
                size="medium"
                weight={700} // Changed from 600 to 700 (valid KoreanFontWeight)
                color={KOREAN_COLORS.TRADITIONAL_BLUE}
                className="philosophy-text"
              />
              <p
                style={{
                  margin: "0.5rem 0 0 0",
                  fontSize: "0.9rem",
                  color: `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`,
                }}
              >
                {trigram.element}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <KoreanHeader korean="팔괘" english="Eight Trigrams" level={2} />

        {/* Add subtitle as separate element */}
        <div style={{ marginBottom: "15px", color: "#888" }}>
          Traditional Korean Martial Arts Wisdom
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {[
            { korean: "건", english: "Heaven", element: "Metal" },
            { korean: "태", english: "Lake", element: "Metal" },
            { korean: "리", english: "Fire", element: "Fire" },
            { korean: "진", english: "Thunder", element: "Wood" },
            { korean: "손", english: "Wind", element: "Wood" },
            { korean: "감", english: "Water", element: "Water" },
            { korean: "간", english: "Mountain", element: "Earth" },
            { korean: "곤", english: "Earth", element: "Earth" },
          ].map((trigram, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                padding: "1rem",
                borderRadius: "4px",
                textAlign: "center",
              }}
            >
              <KoreanText
                korean={trigram.korean}
                english={trigram.english}
                size="medium"
                weight={700} // Changed from 600 to 700 (valid KoreanFontWeight)
                color={KOREAN_COLORS.TRADITIONAL_BLUE}
                className="philosophy-text"
              />
              <p
                style={{
                  margin: "0.5rem 0 0 0",
                  fontSize: "0.9rem",
                  color: `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`,
                }}
              >
                {trigram.element}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
