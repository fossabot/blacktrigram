import React from "react";
import { KoreanText } from "../../ui/base/korean-text";
import { useAudio } from "../../../audio/AudioManager";
import type { MenuSectionProps } from "../../../types/components";
import type { GamePhase } from "../../../types/enums";

/**
 * Main menu section for Black Trigram intro screen
 * Features authentic Korean martial arts theming
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
        "Practice Korean martial arts techniques and vital point targeting",
      trigram: "☰",
      philosophy: "Through discipline comes mastery",
    },
    {
      korean: "실전",
      english: "Combat",
      action: () => {
        audio.playSFX("menu_select");
        onGamePhaseChange("combat" as GamePhase);
      },
      description: "Enter realistic Korean martial arts combat simulation",
      trigram: "☳",
      philosophy: "Test your skills in authentic combat",
    },
    {
      korean: "철학",
      english: "Philosophy",
      action: () => {
        audio.playSFX("menu_select");
        onGamePhaseChange("philosophy" as GamePhase);
      },
      description: "Learn the philosophical foundations of Korean martial arts",
      trigram: "☶",
      philosophy: "Wisdom guides the warrior's path",
    },
    {
      korean: "설정",
      english: "Settings",
      action: () => {
        audio.playSFX("menu_hover");
        // TODO: Implement settings screen
        console.log("Settings screen - 설정 화면 (준비 중)");
      },
      description: "Configure game options and accessibility features",
      trigram: "☷",
      philosophy: "Adapt the training to your needs",
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
        gap: "2rem",
        padding: "2rem",
        background: "rgba(0, 17, 34, 0.95)", // Deep cyberpunk blue
        borderRadius: "12px",
        border: "1px solid rgba(0, 255, 255, 0.3)",
        boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)",
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <div
          style={{ fontSize: "2rem", marginBottom: "0.5rem", color: "#ffd700" }}
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
            marginTop: "0.5rem",
            color: "#00ffff",
            fontSize: "0.9rem",
            fontStyle: "italic",
            opacity: 0.8,
          }}
        >
          흑괘 무술 도장 • Black Trigram Dojang
        </div>
      </div>

      {/* Menu Options */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        {menuOptions.map((option, index) => (
          <button
            key={index}
            onClick={option.action}
            onMouseEnter={handleMenuHover}
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(0, 200, 255, 0.05) 100%)",
              border: "2px solid #00ffff",
              color: "#ffffff",
              padding: "1.5rem",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              minHeight: "120px",
              position: "relative",
              overflow: "hidden",
              textAlign: "left",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(0, 255, 255, 0.2) 0%, rgba(0, 200, 255, 0.1) 100%)";
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow =
                "0 8px 25px rgba(0, 255, 255, 0.3)";
              e.currentTarget.style.borderColor = "#00ffaa";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(0, 200, 255, 0.05) 100%)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "#00ffff";
            }}
          >
            {/* Trigram Symbol */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                fontSize: "2rem",
                color: "#ffd700",
                opacity: 0.7,
              }}
            >
              {option.trigram}
            </div>

            {/* Main Text */}
            <div style={{ marginBottom: "0.5rem" }}>
              <KoreanText
                korean={option.korean}
                english={option.english}
                size="large"
                weight="bold"
                align="left"
              />
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: "0.9rem",
                marginBottom: "0.5rem",
                opacity: 0.9,
                color: "#e0e0e0",
                lineHeight: 1.4,
              }}
            >
              {option.description}
            </div>

            {/* Philosophy Quote */}
            <div
              style={{
                fontSize: "0.8rem",
                fontStyle: "italic",
                opacity: 0.7,
                color: "#00dddd",
                borderTop: "1px solid rgba(0, 255, 255, 0.2)",
                paddingTop: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              "{option.philosophy}"
            </div>
          </button>
        ))}
      </div>

      {/* Footer Text */}
      <div
        style={{
          textAlign: "center",
          marginTop: "1rem",
          opacity: 0.6,
          fontSize: "0.8rem",
          color: "#ffffff",
        }}
      >
        <KoreanText
          korean="선택하여 무도의 여정을 시작하세요"
          english="Choose your path to begin the martial journey"
          size="small"
          align="center"
          emphasis="italic"
        />
      </div>
    </div>
  );
}
