import React from "react";
import { KoreanText } from "../../ui/base/korean-text";
import { useAudio } from "../../../audio"; // Fix: Import from audio barrel
import type { MenuSectionProps } from "../../../types/components";
import type { GamePhase } from "../../../types/enums";

/**
 * Main menu section for Black Trigram (흑괘) intro screen
 * Features authentic Korean martial arts theming with cyberpunk aesthetics
 */
export function MenuSection({
  onGamePhaseChange,
}: MenuSectionProps): React.JSX.Element {
  const audio = useAudio();

  const menuOptions = [
    {
      korean: "수련",
      english: "Training",
      action: () => {
        audio.playSFX("menu_select");
        onGamePhaseChange("training" as GamePhase);
      },
      description:
        "Practice Korean martial arts techniques and master the 70 vital points",
      trigram: "☰",
      element: "Heaven",
      philosophy: "Through discipline comes mastery",
      koreanPhilosophy: "수련을 통해 숙련이 온다",
      archetype: "무사 (Musa) - Traditional Warrior",
      color: "#ffd700",
    },
    {
      korean: "실전",
      english: "Combat",
      action: () => {
        audio.playSFX("menu_select");
        onGamePhaseChange("combat" as GamePhase);
      },
      description:
        "Enter realistic Korean martial arts combat with 5 unique archetypes",
      trigram: "☳",
      element: "Thunder",
      philosophy: "Test your skills in authentic combat",
      koreanPhilosophy: "진정한 전투에서 실력을 시험하라",
      archetype: "암살자 (Amsalja) - Shadow Assassin",
      color: "#ff4500",
    },
    {
      korean: "철학",
      english: "Philosophy",
      action: () => {
        audio.playSFX("menu_select");
        onGamePhaseChange("philosophy" as GamePhase);
      },
      description:
        "Learn the deep philosophical foundations of Korean martial arts",
      trigram: "☶",
      element: "Mountain",
      philosophy: "Wisdom guides the warrior's path",
      koreanPhilosophy: "지혜가 무사의 길을 인도한다",
      archetype: "정보요원 (Jeongbo Yowon) - Intelligence Operative",
      color: "#8b4513",
    },
    {
      korean: "아키타입",
      english: "Archetypes",
      action: () => {
        audio.playSFX("menu_select");
        onGamePhaseChange("archetypes" as GamePhase);
      },
      description:
        "Choose your path: Warrior, Assassin, Hacker, Agent, or Criminal",
      trigram: "☴",
      element: "Wind",
      philosophy: "Each path shapes the warrior",
      koreanPhilosophy: "각각의 길이 무사를 만든다",
      archetype: "해커 (Hacker) - Cyber Warrior",
      color: "#00ffff",
    },
    {
      korean: "설정",
      english: "Settings",
      action: () => {
        audio.playSFX("menu_hover");
        // TODO: Implement settings screen
        console.log("Settings screen - 설정 화면 (준비 중)");
      },
      description: "Configure game options, audio, and accessibility features",
      trigram: "☷",
      element: "Earth",
      philosophy: "Adapt the training to your needs",
      koreanPhilosophy: "당신의 필요에 맞게 수련을 조정하라",
      archetype: "조직폭력배 (Jojik Pokryeokbae) - Organized Crime",
      color: "#654321",
    },
  ];

  const handleMenuHover = () => {
    audio.playSFX("menu_hover");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2.5rem",
        padding: "3rem",
        background:
          "linear-gradient(135deg, rgba(0, 17, 34, 0.98) 0%, rgba(0, 34, 68, 0.95) 100%)",
        borderRadius: "16px",
        border: "2px solid rgba(0, 255, 255, 0.4)",
        boxShadow: "0 0 40px rgba(0, 255, 255, 0.3)",
        position: "relative",
        overflow: "hidden",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 30%),
            radial-gradient(circle at 80% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 30%),
            linear-gradient(45deg, transparent 49%, rgba(255, 215, 0, 0.05) 50%, transparent 51%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Section Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: "3rem",
            marginBottom: "1rem",
            color: "#ffd700",
            textShadow: "0 0 15px rgba(255, 215, 0, 0.7)",
            letterSpacing: "0.3rem",
          }}
        >
          ☰☱☲☳☴☵☶☷
        </div>
        <KoreanText
          korean="무도의 길"
          english="Path of Martial Arts"
          size="xlarge"
          weight="bold"
          color="#ffd700"
          align="center"
        />
        <div
          style={{
            marginTop: "1rem",
            color: "#00ffff",
            fontSize: "1rem",
            fontStyle: "italic",
            opacity: 0.9,
            textShadow: "0 0 8px rgba(0, 255, 255, 0.5)",
          }}
        >
          흑괘 무술 도장 • Black Trigram Dojang
        </div>
        <div
          style={{
            marginTop: "0.5rem",
            color: "#ffffff",
            fontSize: "0.85rem",
            opacity: 0.7,
          }}
        >
          Korean Martial Arts Combat Simulator
        </div>
      </div>

      {/* Menu Options Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "2rem",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {menuOptions.map((option, index) => (
          <button
            key={index}
            onClick={option.action}
            onMouseEnter={handleMenuHover}
            style={{
              background: `linear-gradient(135deg, 
                rgba(0, 255, 255, 0.12) 0%, 
                rgba(0, 200, 255, 0.08) 50%,
                rgba(${
                  option.color === "#ffd700"
                    ? "255, 215, 0"
                    : option.color === "#ff4500"
                    ? "255, 69, 0"
                    : option.color === "#8b4513"
                    ? "139, 69, 19"
                    : option.color === "#00ffff"
                    ? "0, 255, 255"
                    : "101, 67, 33"
                }, 0.1) 100%)`,
              border: `2px solid ${option.color}`,
              color: "#ffffff",
              padding: "2rem",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              minHeight: "180px",
              position: "relative",
              overflow: "hidden",
              textAlign: "left",
              backdropFilter: "blur(5px)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = `linear-gradient(135deg, 
                rgba(0, 255, 255, 0.25) 0%, 
                rgba(0, 200, 255, 0.15) 50%,
                rgba(${
                  option.color === "#ffd700"
                    ? "255, 215, 0"
                    : option.color === "#ff4500"
                    ? "255, 69, 0"
                    : option.color === "#8b4513"
                    ? "139, 69, 19"
                    : option.color === "#00ffff"
                    ? "0, 255, 255"
                    : "101, 67, 33"
                }, 0.2) 100%)`;
              e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
              e.currentTarget.style.boxShadow = `0 15px 35px rgba(0, 255, 255, 0.4)`;
              e.currentTarget.style.borderColor = "#00ffaa";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = `linear-gradient(135deg, 
                rgba(0, 255, 255, 0.12) 0%, 
                rgba(0, 200, 255, 0.08) 50%,
                rgba(${
                  option.color === "#ffd700"
                    ? "255, 215, 0"
                    : option.color === "#ff4500"
                    ? "255, 69, 0"
                    : option.color === "#8b4513"
                    ? "139, 69, 19"
                    : option.color === "#00ffff"
                    ? "0, 255, 255"
                    : "101, 67, 33"
                }, 0.1) 100%)`;
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = option.color;
            }}
          >
            {/* Trigram Symbol and Element */}
            <div
              style={{
                position: "absolute",
                top: "15px",
                right: "20px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "2.5rem",
                  color: option.color,
                  opacity: 0.8,
                  lineHeight: 1,
                  textShadow: `0 0 10px ${option.color}`,
                }}
              >
                {option.trigram}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: option.color,
                  opacity: 0.6,
                  marginTop: "0.3rem",
                  fontWeight: "bold",
                }}
              >
                {option.element}
              </div>
            </div>

            {/* Main Content */}
            <div style={{ marginBottom: "1rem", paddingRight: "4rem" }}>
              <KoreanText
                korean={option.korean}
                english={option.english}
                size="large"
                weight="bold"
                align="left"
                color={option.color}
              />
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: "0.95rem",
                marginBottom: "1rem",
                opacity: 0.95,
                color: "#e8e8e8",
                lineHeight: 1.5,
                paddingRight: "1rem",
              }}
            >
              {option.description}
            </div>

            {/* Archetype Reference */}
            <div
              style={{
                fontSize: "0.8rem",
                marginBottom: "1rem",
                opacity: 0.8,
                color: option.color,
                fontWeight: "600",
                borderLeft: `3px solid ${option.color}`,
                paddingLeft: "0.8rem",
              }}
            >
              {option.archetype}
            </div>

            {/* Philosophy Section */}
            <div
              style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                paddingTop: "1rem",
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.85rem",
                  fontStyle: "italic",
                  opacity: 0.8,
                  color: "#00dddd",
                  marginBottom: "0.3rem",
                }}
              >
                "{option.philosophy}"
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  fontStyle: "italic",
                  opacity: 0.7,
                  color: "#ffd700",
                }}
              >
                「{option.koreanPhilosophy}」
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Footer Section */}
      <div
        style={{
          textAlign: "center",
          marginTop: "2rem",
          opacity: 0.7,
          fontSize: "0.9rem",
          color: "#ffffff",
          position: "relative",
          zIndex: 1,
        }}
      >
        <KoreanText
          korean="선택하여 무도의 여정을 시작하세요"
          english="Choose your path to begin the martial journey"
          size="medium"
          align="center"
          emphasis="italic"
        />
        <div
          style={{
            marginTop: "1rem",
            fontSize: "0.75rem",
            opacity: 0.6,
            color: "#00ffff",
          }}
        >
          • 70 Vital Points • 8 Trigram Stances • 5 Player Archetypes •
        </div>
        <div
          style={{
            marginTop: "0.5rem",
            fontSize: "0.7rem",
            opacity: 0.5,
            color: "#ffffff",
          }}
        >
          Realistic Korean Martial Arts Combat Simulator
        </div>
      </div>
    </div>
  );
}
