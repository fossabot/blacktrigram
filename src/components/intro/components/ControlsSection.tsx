import React from "react";
import { KoreanText } from "../../ui/base/korean-text/components/KoreanText";
import { KOREAN_COLORS } from "../../../types";

interface ControlsSectionProps {
  readonly onGamePhaseChange: (phase: string) => void;
}

export function ControlsSection({}: ControlsSectionProps): React.ReactElement {
  const controlsData = [
    {
      title: "기본 조작",
      titleEnglish: "Basic Controls",
      controls: [
        {
          korean: "이동",
          english: "Movement",
          description: "W(앞), A(왼쪽), S(뒤), D(오른쪽)으로 이동",
        },
        {
          korean: "공격",
          english: "Attack",
          description: "현재 팔괘 자세의 기술로 공격",
        },
        {
          korean: "방어",
          english: "Block/Guard",
          description: "방어 자세로 전환하여 피해 감소",
        },
        {
          korean: "메뉴",
          english: "Menu",
          description: "게임 메뉴로 돌아가기",
        },
      ],
    },
    {
      title: "팔괘 조작",
      titleEnglish: "Trigram Controls",
      controls: [
        {
          korean: "팔괘 변경",
          english: "Change Trigram Stance",
          description:
            "각 숫자 키로 팔괘 자세 변경 (1: 건, 2: 태, 3: 리, 4: 진, 5: 손, 6: 감, 7: 간, 8: 곤)",
        },
      ],
    },
  ];

  const containerStyle: React.CSSProperties = {
    textAlign: "center",
  };

  const controlsGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
    maxWidth: "800px",
    margin: "0 auto",
  };

  const sectionStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.05)",
    borderRadius: "8px",
    padding: "1.5rem",
    border: `1px solid #${KOREAN_COLORS.ACCENT_BLUE.toString(16).padStart(
      6,
      "0"
    )}`,
  };

  const controlItemStyle: React.CSSProperties = {
    marginBottom: "1rem",
    padding: "0.5rem",
    background: `#${KOREAN_COLORS.ACCENT_BLUE.toString(16).padStart(6, "0")}`,
    color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
    borderRadius: "4px",
    fontWeight: "bold",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <KoreanText
        korean="조작법"
        english="Controls"
        size="xlarge"
        color={`#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`}
        style={{ marginBottom: "2rem" }}
      />

      <div style={controlsGridStyle}>
        {controlsData.map((section, sectionIndex) => (
          <div key={sectionIndex} style={sectionStyle}>
            <KoreanText
              korean={section.title}
              english={section.titleEnglish}
              size="large"
              weight={700}
              style={{ marginBottom: "1rem" }}
            />

            {section.controls.map((control, controlIndex) => (
              <div key={controlIndex} style={controlItemStyle}>
                <KoreanText
                  korean={control.korean}
                  english={control.english}
                  size="medium"
                  style={{ marginBottom: "0.5rem" }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <KoreanText
        korean="팁: 각 팔괘는 고유한 철학과 전투 스타일을 가지고 있습니다. 상황에 맞는 팔괘를 선택하여 최적의 전략을 구사하세요!"
        size="small"
        color={`#${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`}
        style={{ fontStyle: "italic" }}
      />
    </div>
  );
}
