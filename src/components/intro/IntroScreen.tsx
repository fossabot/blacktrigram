import React, { useState, useCallback, useEffect } from "react";
import type { IntroScreenProps } from "../../types";
import { KOREAN_COLORS } from "../../types";
import { useAudio } from "../../audio/AudioManager";
import { KoreanHeader } from "../ui/base/KoreanHeader";
import { PhilosophySection } from "./components/PhilosophySection";

export function IntroScreen({
  onGamePhaseChange,
  onSectionChange,
  currentSection = "main",
}: IntroScreenProps): React.ReactElement {
  const [activeSection, setActiveSection] = useState(currentSection);
  const audio = useAudio();

  // Play intro music when component mounts
  useEffect(() => {
    audio.playMusic("intro_theme", true);

    // Cleanup music when component unmounts
    return () => {
      audio.stopMusic(true);
    };
  }, [audio]);

  const handleSectionChange = useCallback(
    (section: string) => {
      setActiveSection(section);
      onSectionChange?.(section);
    },
    [onSectionChange]
  );

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
        <PhilosophySection onGamePhaseChange={onGamePhaseChange} />
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
        title={{ korean: "흑괘", english: "Black Trigram" }}
        subtitle="Korean Martial Arts Combat Simulator"
        level={1}
      />

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
          onClick={() => onGamePhaseChange("training")}
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
      </div>
    </div>
  );
}
