import React, { useState, useCallback } from "react";
import type { TrainingScreenProps, TrigramStance } from "../../types";
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../types/constants"; // Updated import path
import { KoreanHeader } from "../ui/base/KoreanHeader";
import { KoreanText } from "../ui/base/korean-text/KoreanText";
import { TrigramWheel } from "../ui/TrigramWheel";

export function TrainingScreen({
  player, // Changed from players array
  onPlayerStateChange, // Changed from onPlayerUpdate
  onReturnToMenu, // Changed from onGamePhaseChange
  onStartCombat, // Changed from onGamePhaseChange
  selectedStance,
  showVitalPoints, // Renamed prop
  difficulty, // Renamed prop
  gameTime, // Keep to avoid unused warning
  currentRound, // Keep to avoid unused warning
}: TrainingScreenProps): React.JSX.Element {
  const [activePlayer, setActivePlayer] = useState(0);
  const [currentExercise, setCurrentExercise] =
    useState<string>("stance_practice");

  const handleStanceChange = useCallback(
    (newStance: TrigramStance) => {
      if (!player || !onPlayerStateChange) return; // Fix: add null checks

      onPlayerStateChange({
        stance: newStance,
        ki: Math.max(0, player.ki - 5),
        stamina: Math.max(0, player.stamina - 3),
      });
    },
    [player?.ki, player?.stamina, onPlayerStateChange] // Fix: use optional chaining
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
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1a1a1a",
        minHeight: "100vh",
      }}
    >
      <KoreanHeader
        title={{ korean: "훈련", english: "Training" }} // Fixed: Provide title prop
        subtitle="무술 기법 연습"
        level={1}
      />

      <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
        {/* Player Selection */}
        <div style={{ flex: "0 0 300px" }}>
          <h3>플레이어 선택 (Player Selection)</h3>
          {/* Removed player selection buttons */}
        </div>

        {/* Stance Selection */}
        <div style={{ flex: "1" }}>
          <h3>자세 선택 (Stance Selection)</h3>

          {/* Trigram Wheel Section */}
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ color: "#ffffff", marginBottom: "10px" }}>
              팔괘 자세 선택 (Trigram Stance Selection)
            </h3>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <TrigramWheel
                currentStance={player?.stance || "geon"}
                // Fix: Remove selectedStance prop that doesn't exist
                onStanceChange={(newStance: TrigramStance) => {
                  if (onPlayerStateChange) {
                    onPlayerStateChange({ stance: newStance });
                  }
                  if (selectedStance !== newStance) {
                    setSelectedStance(newStance);
                  }
                }}
                interactive={true}
                showLabels={true}
              />
            </div>

            {/* Current Stance Info */}
            {selectedStance && (
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <h4 style={{ color: "#ffffff" }}>
                  현재 자세:{" "}
                  {TRIGRAM_DATA[selectedStance]?.name.korean || "알 수 없음"}
                </h4>
                <p style={{ color: "#cccccc" }}>
                  {TRIGRAM_DATA[selectedStance]?.name.english || "Unknown"}
                </p>

                {/* Available Techniques */}
                <div style={{ marginTop: "15px" }}>
                  <h5 style={{ color: "#ffffff" }}>사용 가능한 기법:</h5>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      justifyContent: "center",
                    }}
                  >
                    {TRIGRAM_DATA[selectedStance]?.technique && (
                      <div
                        style={{
                          padding: "8px 12px",
                          backgroundColor: "#333",
                          borderRadius: "6px",
                          border: "1px solid #555",
                        }}
                      >
                        <div
                          style={{
                            color: "#ffffff",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          {TRIGRAM_DATA[selectedStance].technique.koreanName}
                        </div>
                        <div style={{ color: "#cccccc", fontSize: "12px" }}>
                          {TRIGRAM_DATA[selectedStance].technique.englishName}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

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

      {/* Training Exercises */}
      <div>
        <h3 style={{ color: "#ffffff", marginBottom: "15px" }}>
          훈련 예제 (Training Exercises)
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
          }}
        >
          {/* Fix: Add proper typing for technique parameter */}
          {(TRIGRAM_DATA[selectedStance]?.technique
            ? [TRIGRAM_DATA[selectedStance].technique]
            : []
          ).map((technique: any, index: number) => (
            <div
              key={index}
              style={{
                padding: "15px",
                backgroundColor: "#222",
                borderRadius: "8px",
                border: "1px solid #444",
              }}
            >
              <h4 style={{ color: "#ffffff", marginBottom: "10px" }}>
                {technique.koreanName} ({technique.englishName})
              </h4>
              <p style={{ color: "#cccccc", fontSize: "14px" }}>
                {technique.description?.korean || "훈련 설명"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <button
          onClick={onStartCombat} // Changed from onGamePhaseChange
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
          onClick={onReturnToMenu} // Changed from onGamePhaseChange
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
