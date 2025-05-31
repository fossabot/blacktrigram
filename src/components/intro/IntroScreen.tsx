import React, { useState, useCallback } from "react";
import { MenuSection } from "./components/MenuSection";
import { ControlsSection } from "./components/ControlsSection";
import { PhilosophySection } from "./components/PhilosophySection";
import {
  KOREAN_COLORS,
  KOREAN_FONT_FAMILY,
  TRIGRAM_STANCES_ORDER,
  type GamePhase,
  type TrigramStance,
} from "../../types";

interface IntroScreenProps {
  readonly onGamePhaseChange: (phase: GamePhase) => void;
}

export function IntroScreen({
  onGamePhaseChange,
}: IntroScreenProps): React.ReactElement {
  const [selectedStance, setSelectedStance] = useState<TrigramStance>("geon");
  const [currentSection, setCurrentSection] = useState<string>("menu");

  const handleNext = useCallback(() => {
    const currentIndex = TRIGRAM_STANCES_ORDER.indexOf(selectedStance);
    const nextIndex = (currentIndex + 1) % TRIGRAM_STANCES_ORDER.length;
    const nextStance = TRIGRAM_STANCES_ORDER[nextIndex];
    if (nextStance) {
      setSelectedStance(nextStance);
    }
  }, [selectedStance]);

  const handlePrev = useCallback(() => {
    const currentIndex = TRIGRAM_STANCES_ORDER.indexOf(selectedStance);
    const prevIndex =
      currentIndex === 0 ? TRIGRAM_STANCES_ORDER.length - 1 : currentIndex - 1;
    const prevStance = TRIGRAM_STANCES_ORDER[prevIndex];
    if (prevStance) {
      setSelectedStance(prevStance);
    }
  }, [selectedStance]);

  const handleSectionChange = useCallback((section: string) => {
    setCurrentSection(section);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: `linear-gradient(135deg, ${KOREAN_COLORS.DARK_BLUE}, ${KOREAN_COLORS.BLACK})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: KOREAN_COLORS.WHITE,
        fontFamily: KOREAN_FONT_FAMILY,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "3rem",
            margin: "0 0 0.5rem 0",
            color: KOREAN_COLORS.GOLD,
            textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
          }}
        >
          흑괘 무술 도장
        </h1>
        <h2
          style={{
            fontSize: "1.5rem",
            margin: 0,
            color: KOREAN_COLORS.CYAN,
            opacity: 0.9,
          }}
        >
          Black Trigram Martial Arts Academy
        </h2>
      </div>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {[
          { key: "menu", label: "메뉴 (Menu)" },
          { key: "controls", label: "조작법 (Controls)" },
          { key: "philosophy", label: "철학 (Philosophy)" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleSectionChange(key)}
            style={{
              padding: "0.75rem 1.5rem",
              background:
                currentSection === key
                  ? KOREAN_COLORS.GOLD
                  : "rgba(255,255,255,0.1)",
              color:
                currentSection === key
                  ? KOREAN_COLORS.BLACK
                  : KOREAN_COLORS.WHITE,
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
              transition: "all 0.3s ease",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: "800px",
          width: "100%",
          padding: "0 2rem",
          maxHeight: "60vh",
          overflowY: "auto",
        }}
      >
        {currentSection === "menu" && (
          <MenuSection onGamePhaseChange={onGamePhaseChange} />
        )}

        {currentSection === "controls" && <ControlsSection />}

        {currentSection === "philosophy" && (
          <PhilosophySection
            selectedStance={selectedStance}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </div>
    </div>
  );
}
