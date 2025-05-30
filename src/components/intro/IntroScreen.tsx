import React, { useState, useCallback, useEffect } from "react";
import { MenuSection } from "./components/MenuSection";
import { ControlsSection } from "./components/ControlsSection";
import { PhilosophySection } from "./components/PhilosophySection";
import type { GamePhase } from "../../types";
import { KOREAN_COLORS } from "../../types";

export interface IntroScreenProps {
  readonly onGamePhaseChange: (phase: GamePhase) => void;
}

export function IntroScreen({
  onGamePhaseChange,
}: IntroScreenProps): React.ReactElement {
  const [currentSection, setCurrentSection] = useState<
    "menu" | "controls" | "philosophy"
  >("menu");
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Handle window resize for responsive dimensions
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: Math.min(window.innerWidth * 0.9, 1200),
        height: Math.min(window.innerHeight * 0.8, 800),
      });
    };

    handleResize(); // Set initial dimensions
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSectionChange = useCallback(
    (section: "menu" | "controls" | "philosophy") => {
      setCurrentSection(section);
    },
    []
  );

  const handlePhilosophyNavigation = useCallback(
    (direction: "next" | "prev") => {
      // Handle philosophy section navigation
      if (direction === "next") {
        // Could navigate to training or combat mode
        onGamePhaseChange("training");
      } else {
        // Return to controls section
        setCurrentSection("controls");
      }
    },
    [onGamePhaseChange]
  );

  return (
    <div
      className="intro-screen"
      style={{
        width: "100%",
        height: "100vh",
        background: `linear-gradient(135deg, ${KOREAN_COLORS.DARK_BLUE}, ${KOREAN_COLORS.BLACK})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: KOREAN_COLORS.WHITE,
        fontFamily: "Noto Sans KR, Arial, sans-serif",
      }}
      data-testid="intro-screen"
    >
      {/* Header with Korean title */}
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "3rem",
            color: KOREAN_COLORS.GOLD,
            textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
            marginBottom: "0.5rem",
          }}
        >
          흑괘 무술 도장
        </h1>
        <p style={{ fontSize: "1.2rem", opacity: 0.8 }}>
          Black Trigram Martial Arts Simulator
        </p>
      </header>

      {/* Navigation */}
      <nav style={{ marginBottom: "2rem" }}>
        <button
          onClick={() => handleSectionChange("menu")}
          style={{
            background:
              currentSection === "menu" ? KOREAN_COLORS.GOLD : "transparent",
            color:
              currentSection === "menu"
                ? KOREAN_COLORS.BLACK
                : KOREAN_COLORS.WHITE,
            border: `2px solid ${KOREAN_COLORS.GOLD}`,
            padding: "0.5rem 1rem",
            margin: "0 0.5rem",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          메뉴 (Menu)
        </button>
        <button
          onClick={() => handleSectionChange("controls")}
          style={{
            background:
              currentSection === "controls"
                ? KOREAN_COLORS.GOLD
                : "transparent",
            color:
              currentSection === "controls"
                ? KOREAN_COLORS.BLACK
                : KOREAN_COLORS.WHITE,
            border: `2px solid ${KOREAN_COLORS.GOLD}`,
            padding: "0.5rem 1rem",
            margin: "0 0.5rem",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          조작법 (Controls)
        </button>
        <button
          onClick={() => handleSectionChange("philosophy")}
          style={{
            background:
              currentSection === "philosophy"
                ? KOREAN_COLORS.GOLD
                : "transparent",
            color:
              currentSection === "philosophy"
                ? KOREAN_COLORS.BLACK
                : KOREAN_COLORS.WHITE,
            border: `2px solid ${KOREAN_COLORS.GOLD}`,
            padding: "0.5rem 1rem",
            margin: "0 0.5rem",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          철학 (Philosophy)
        </button>
      </nav>

      {/* Content sections */}
      <main style={{ width: "100%", maxWidth: "1000px", height: "400px" }}>
        {currentSection === "menu" && (
          <MenuSection
            onGamePhaseChange={onGamePhaseChange}
            width={dimensions.width}
            height={dimensions.height}
          />
        )}
        {currentSection === "controls" && <ControlsSection />}
        {currentSection === "philosophy" && (
          <PhilosophySection
            onNext={() => handlePhilosophyNavigation("next")}
            onPrev={() => handlePhilosophyNavigation("prev")}
          />
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          marginTop: "2rem",
          textAlign: "center",
          opacity: 0.6,
          fontSize: "0.9rem",
        }}
      >
        <p>Korean Traditional Martial Arts • 한국 전통 무술</p>
        <p>Press keys 1-8 to select trigram stances</p>
      </footer>
    </div>
  );
}
