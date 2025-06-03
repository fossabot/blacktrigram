import React, { useState, useCallback } from "react";
import type { TrainingScreenProps } from "../../types";
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../types"; // Removed unused TRIGRAM_STANCES_ORDER
import { KoreanHeader } from "../ui/base/KoreanHeader";
import { KoreanText } from "../ui/base/korean-text/KoreanText";
import { TrigramWheel } from "../ui/TrigramWheel";

export function TrainingScreen({
  players,
  onGamePhaseChange,
  onPlayerUpdate,
  selectedStance,
  onStanceChange,
  gameTime, // Keep to avoid unused warning
  currentRound, // Keep to avoid unused warning
}: TrainingScreenProps): React.JSX.Element {
  const [activePlayer, setActivePlayer] = useState(0);

  const handleStanceChange = useCallback(
    (stance: any) => {
      onStanceChange(stance);
      onPlayerUpdate(activePlayer, { stance });
    },
    [activePlayer, onStanceChange, onPlayerUpdate]
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

  const descriptionStyle: React.CSSProperties = {
    marginBottom: "1rem",
    color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
  };

  return (
    <div style={containerStyle}>
      <KoreanHeader
        title={{ korean: "훈련", english: "Training" }} // Fixed: Provide title prop
        subtitle="무술 기법 연습"
        level={1}
      />

      <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
        {/* Player Selection */}
        <div style={{ flex: "0 0 300px" }}>
          <h3>플레이어 선택 (Player Selection)</h3>
          {players.map((player, index) => (
            <button
              key={player.id}
              onClick={() => setActivePlayer(index)}
              style={{
                display: "block",
                width: "100%",
                padding: "1rem",
                margin: "0.5rem 0",
                backgroundColor:
                  activePlayer === index
                    ? `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`
                    : "rgba(255, 255, 255, 0.1)",
                color:
                  activePlayer === index
                    ? `#${KOREAN_COLORS.BLACK.toString(16).padStart(6, "0")}`
                    : `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <KoreanText
                korean={player.name}
                english={player.archetype.toUpperCase()}
                size="medium"
              />
            </button>
          ))}
        </div>

        {/* Stance Selection */}
        <div style={{ flex: "1" }}>
          <h3>자세 선택 (Stance Selection)</h3>

          <TrigramWheel
            size={200}
            position={{ x: 250, y: 200 }}
            selectedStance={selectedStance}
            onStanceChange={handleStanceChange}
            interactive={true}
            showLabels={true}
          />

          {/* Stance Information */}
          <div style={{ marginTop: "2rem" }}>
            <h4>현재 자세 정보 (Current Stance Info)</h4>
            {(() => {
              const trigramData = TRIGRAM_DATA[selectedStance];
              return (
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    padding: "1.5rem",
                    borderRadius: "8px",
                    border: `1px solid #${KOREAN_COLORS.GOLD.toString(
                      16
                    ).padStart(6, "0")}`,
                  }}
                >
                  <KoreanText
                    korean={trigramData.name.korean} // Fixed: access name.korean
                    english={trigramData.name.english} // Fixed: access name.english
                    size="large"
                    weight={700}
                    style={{ marginBottom: "1rem" }}
                  />

                  <p style={descriptionStyle}>
                    {/* Fix: Convert KoreanText to string */}
                    {typeof trigramData.philosophy === "string"
                      ? trigramData.philosophy
                      : trigramData.philosophy.korean +
                        " / " +
                        trigramData.philosophy.english}
                  </p>

                  <h5>기법 (Techniques)</h5>
                  <ul>
                    {trigramData.preferredTechniques?.map(
                      (technique, index) => (
                        <li key={index}>
                          {technique.koreanName} ({technique.englishName})
                        </li> // Fixed: Display technique names instead of object
                      )
                    ) || []}
                  </ul>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <button
          onClick={() => onGamePhaseChange("combat")}
          style={{
            padding: "1rem 2rem",
            backgroundColor: `#${KOREAN_COLORS.TRADITIONAL_RED.toString(
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
          전투 시작 (Start Combat)
        </button>

        <button
          onClick={() => onGamePhaseChange("intro")}
          style={{
            padding: "1rem 2rem",
            backgroundColor: "transparent",
            color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
            border: `1px solid #${KOREAN_COLORS.WHITE.toString(16).padStart(
              6,
              "0"
            )}`,
            borderRadius: "4px",
            fontSize: "1.2rem",
            cursor: "pointer",
            margin: "0.5rem",
          }}
        >
          뒤로 (Back)
        </button>
      </div>

      {/* Debug info to use gameTime and currentRound */}
      {process.env.NODE_ENV === "development" && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            right: 0,
            fontSize: "0.8rem",
            opacity: 0.5,
          }}
        >
          Time: {gameTime}ms | Round: {currentRound}
        </div>
      )}
    </div>
  );
}
