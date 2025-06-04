import React, { useState } from "react";
import { KoreanText } from "../ui/base/korean-text";
import { MenuSection } from "./sections/MenuSection";
import { PhilosophySection } from "./sections/PhilosophySection";
import { KoreanHeader } from "../ui/KoreanHeader";
import type { IntroScreenProps } from "../../types/components";
import { useAudio } from "../../audio/AudioManager";

/**
 * Introduction Screen for Black Trigram (흑괘)
 * Korean Martial Arts Combat Simulator
 */
export function IntroScreen({
  onGamePhaseChange,
  currentSection = "menu",
}: IntroScreenProps): React.JSX.Element {
  const [activeSection, setActiveSection] = useState(currentSection);
  const audio = useAudio();

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    audio.playSFX("menu_select");
  };

  const renderCurrentSection = () => {
    switch (activeSection) {
      case "philosophy":
        return <PhilosophySection onGamePhaseChange={onGamePhaseChange} />;
      case "menu":
      default:
        return <MenuSection onGamePhaseChange={onGamePhaseChange} />;
    }
  };

  return (
    <div
      className="intro-screen"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #000011 0%, #001122 100%)",
        color: "#ffffff",
        padding: "2rem",
      }}
    >
      <KoreanHeader
        korean="흑괘 무술 도장"
        english="Black Trigram Dojang"
        subtitle="Precision Korean Martial Arts Combat"
        showLogo={true}
        level={1}
      />

      <nav style={{ textAlign: "center", marginBottom: "2rem" }}>
        <button
          onClick={() => handleSectionChange("menu")}
          style={{
            background: activeSection === "menu" ? "#00ffff" : "transparent",
            color: activeSection === "menu" ? "#000" : "#00ffff",
            border: "1px solid #00ffff",
            padding: "0.5rem 1rem",
            margin: "0 0.5rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          메뉴 / Menu
        </button>
        <button
          onClick={() => handleSectionChange("philosophy")}
          style={{
            background:
              activeSection === "philosophy" ? "#00ffff" : "transparent",
            color: activeSection === "philosophy" ? "#000" : "#00ffff",
            border: "1px solid #00ffff",
            padding: "0.5rem 1rem",
            margin: "0 0.5rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          철학 / Philosophy
        </button>
      </nav>

      {renderCurrentSection()}

      <footer style={{ textAlign: "center", marginTop: "3rem", opacity: 0.7 }}>
        <KoreanText
          korean="흑괘의 길을 걸어라"
          english="Walk the Path of the Black Trigram"
          size="small"
          align="center"
          emphasis="italic"
        />
      </footer>
    </div>
  );
}

export default IntroScreen;
