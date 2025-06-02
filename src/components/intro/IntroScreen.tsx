import React, { useState, useEffect } from "react";
import type { IntroScreenProps, GamePhase } from "../../types";
import { KOREAN_COLORS } from "../../types";
import { useAudio } from "../../audio/AudioManager";

export function IntroScreen({
  onGamePhaseChange,
}: IntroScreenProps): React.ReactElement {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("");
  const audio = useAudio();

  // Play intro music when component mounts
  useEffect(() => {
    audio.playMusic("intro_theme", true);

    // Cleanup music when component unmounts
    return () => {
      audio.stopMusic(true);
    };
  }, [audio]);

  const handleMenuClick = (phase: GamePhase) => {
    audio.playSFX("menu_select");
    setSelectedMenuItem(phase);
    onGamePhaseChange(phase);
  };

  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: `linear-gradient(135deg, #${KOREAN_COLORS.DARK_BLUE.toString(
      16
    ).padStart(6, "0")}, #${KOREAN_COLORS.BLACK.toString(16).padStart(
      6,
      "0"
    )})`,
    color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
    fontFamily: "Noto Sans KR, Arial, sans-serif",
  };

  const titleStyle: React.CSSProperties = {
    margin: 0,
    padding: "0.5rem 0",
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    textAlign: "center",
    color: `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`,
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    fontSize: "2.5rem",
    fontWeight: 700,
    marginBottom: "2rem",
  };

  const menuItemStyle = (isSelected: boolean): React.CSSProperties => ({
    padding: "1rem 2rem",
    margin: "0.5rem 0",
    fontSize: "1.2rem",
    backgroundColor: isSelected
      ? `#${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`
      : `#${KOREAN_COLORS.DOJANG_BLUE.toString(16).padStart(6, "0")}`,
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    minWidth: "200px",
  });

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>
        흑괘 무술 도장
        <div style={{ fontSize: "0.6em", opacity: 0.8, marginTop: "0.5rem" }}>
          Black Trigram Martial Arts
        </div>
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <button
          style={menuItemStyle(selectedMenuItem === "training")}
          onClick={() => handleMenuClick("training")}
          onMouseEnter={() => setSelectedMenuItem("training")}
          onMouseLeave={() => setSelectedMenuItem("")}
        >
          무술 수련 (Training)
        </button>

        <button
          style={menuItemStyle(selectedMenuItem === "combat")}
          onClick={() => handleMenuClick("combat")}
          onMouseEnter={() => setSelectedMenuItem("combat")}
          onMouseLeave={() => setSelectedMenuItem("")}
        >
          실전 대련 (Combat)
        </button>

        <button
          style={menuItemStyle(selectedMenuItem === "philosophy")}
          onClick={() => handleMenuClick("philosophy")}
          onMouseEnter={() => setSelectedMenuItem("philosophy")}
          onMouseLeave={() => setSelectedMenuItem("")}
        >
          팔괘 철학 (Philosophy)
        </button>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          textAlign: "center",
          opacity: 0.7,
          fontSize: "0.9rem",
        }}
      >
        <p>어둠 속에서 완벽한 일격을 찾아라</p>
        <p>Master the dark arts through perfect strikes</p>
      </div>
    </div>
  );
}
