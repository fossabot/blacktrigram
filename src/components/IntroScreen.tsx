import React from "react";
import type { IntroScreenProps } from "../types/game";
import { PLAYER_ARCHETYPES, ARCHETYPE_NAMES } from "../types/constants/player";
import { KOREAN_COLORS } from "../types/constants/colors";

const IntroScreen: React.FC<IntroScreenProps> = ({
  onArchetypeSelect,
  onStartTraining,
  onStartCombat,
  selectedArchetype,
}) => {
  return (
    <div
      className="intro-screen"
      style={{
        padding: "2rem",
        background:
          "linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)",
        color: "#ffffff",
        minHeight: "100vh",
        fontFamily: '"Noto Sans KR", Arial, sans-serif',
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            color: `#${KOREAN_COLORS.GOLD.toString(16)}`,
            marginBottom: "2rem",
            fontSize: "3rem",
          }}
        >
          흑괘 무술 도장
          <br />
          <span style={{ fontSize: "1.5rem" }}>Black Trigram Martial Arts</span>
        </h1>

        <div className="archetype-selection" style={{ marginBottom: "2rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>
            무도 유형 선택 (Choose Your Path)
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {PLAYER_ARCHETYPES.map((archetype) => (
              <button
                key={archetype}
                onClick={() => onArchetypeSelect(archetype)}
                style={{
                  padding: "1rem",
                  background:
                    selectedArchetype === archetype
                      ? `#${KOREAN_COLORS.GOLD.toString(16)}`
                      : "rgba(255, 255, 255, 0.1)",
                  color:
                    selectedArchetype === archetype ? "#000000" : "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontFamily: '"Noto Sans KR", Arial, sans-serif',
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                }}
              >
                {ARCHETYPE_NAMES[archetype].korean}
                <br />
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: "normal",
                  }}
                >
                  {ARCHETYPE_NAMES[archetype].english}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div
          className="action-buttons"
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <button
            onClick={onStartTraining}
            style={{
              padding: "1rem 2rem",
              background: `#${KOREAN_COLORS.GOLD.toString(16)}`,
              color: "#000000",
              border: "none",
              borderRadius: "4px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              cursor: "pointer",
              fontFamily: '"Noto Sans KR", Arial, sans-serif',
            }}
          >
            훈련 시작 (Start Training)
          </button>
          <button
            onClick={onStartCombat}
            style={{
              padding: "1rem 2rem",
              background: `#${KOREAN_COLORS.GOLD.toString(16)}`,
              color: "#000000",
              border: "none",
              borderRadius: "4px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              cursor: "pointer",
              fontFamily: '"Noto Sans KR", Arial, sans-serif',
            }}
          >
            실전 격투 (Enter Combat)
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
