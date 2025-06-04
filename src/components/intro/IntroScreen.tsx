import React, { useState, useEffect, useCallback } from "react";
import type { IntroScreenProps } from "../../types";
import { KOREAN_COLORS } from "../../types";
import useAudio from "../../audio/AudioManager";
import { KoreanHeader } from "../ui/KoreanHeader";
import { PhilosophySection } from "./components/PhilosophySection";
import { KoreanText } from "../ui";

export function IntroScreen({
  onGamePhaseChange, // Use onGamePhaseChange parameter
  onSectionChange,
  currentSection = "menu",
  onStartTraining,
  onStartCombat,
  player,
}: IntroScreenProps): React.JSX.Element {
  const [activeSection, setActiveSection] = useState(currentSection);
  const audio = useAudio(); // Now properly typed

  // Play intro music when component mounts
  useEffect(() => {
    audio.playMusic("intro_theme", { loop: true });

    // Cleanup music when component unmounts
    return () => {
      audio.stopMusic();
    };
  }, [audio]);

  const handleSectionChange = useCallback(
    (section: string) => {
      setActiveSection(section);
      onSectionChange?.(section);
    },
    [onSectionChange]
  );

  const handleGamePhaseChange = (phase: string) => {
    onGamePhaseChange(phase); // Use the parameter
  };

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: `linear-gradient(135deg, #${KOREAN_COLORS.TRADITIONAL_BLUE.toString(
      16
    ).padStart(6, "0")} 0%, #${KOREAN_COLORS.BLACK.toString(16).padStart(
      6,
      "0"
    )} 100%)`,
    color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
    padding: "2rem",
    fontFamily: "Noto Sans KR, Arial, sans-serif",
  };

  if (activeSection === "philosophy") {
    return (
      <div style={containerStyle}>
        <PhilosophySection
          onGamePhaseChange={handleGamePhaseChange} // Fix: Provide required function
        />
      </div>
    );
  }

  return (
    <div
      style={{
        ...containerStyle,
        backgroundColor: `#${KOREAN_COLORS.DOJANG_BLUE.toString(16).padStart(
          6,
          "0"
        )}`,
      }}
    >
      <KoreanHeader
        korean="흑괘"
        english="Black Trigram"
        // Remove subtitle prop - not supported
        level={1}
      />

      {/* Add subtitle as separate element */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#888",
          fontSize: "14px",
        }}
      >
        Korean Martial Arts Combat Simulator
      </div>

      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <button
          onClick={() => handleSectionChange("philosophy")}
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
          철학 보기 (View Philosophy)
        </button>

        <button
          onClick={onStartTraining}
          style={{
            padding: "1rem 2rem",
            backgroundColor: `#${KOREAN_COLORS.DOJANG_BLUE.toString(
              16
            ).padStart(6, "0")}`,
            color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
            border: "none",
            borderRadius: "4px",
            fontSize: "1.2rem",
            cursor: "pointer",
            margin: "0.5rem",
          }}
        >
          훈련 시작 (Start Training)
        </button>

        <button
          onClick={onStartCombat}
          style={{
            padding: "1rem 2rem",
            backgroundColor: `#${KOREAN_COLORS.RED.toString(16).padStart(
              6,
              "0"
            )}`,
            color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
            border: "none",
            borderRadius: "4px",
            fontSize: "1.2rem",
            cursor: "pointer",
            margin: "0.5rem",
          }}
        >
          실전 대련 (Start Combat)
        </button>
      </div>

      <div
        style={{
          marginTop: "32px",
          textAlign: "center",
          opacity: 0.8,
        }}
      >
        <KoreanText
          korean={`플레이어: ${player.name}`}
          english={`Player: ${player.name}`}
          size="medium"
          weight="regular"
          color="#ffffff"
        />
      </div>
    </div>
  );
}

export default IntroScreen;
