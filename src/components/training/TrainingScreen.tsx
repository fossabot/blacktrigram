import React, { useCallback, useState } from "react";
import { Stage, Container, Text } from "@pixi/react";
import { TrigramWheel } from "../ui/TrigramWheel";
import { ProgressTracker } from "../ui/ProgressTracker";
import { KoreanHeader } from "../ui/KoreanHeader";
import {
  KOREAN_COLORS,
  KOREAN_FONT_FAMILY,
  TRIGRAM_DATA,
  type TrainingScreenProps,
  type TrigramStance,
} from "../../types";

export function TrainingScreen({
  onGamePhaseChange,
  onStanceChange,
  selectedStance = "geon",
  playerProgress,
}: TrainingScreenProps): React.ReactElement {
  const [trainingMode, setTrainingMode] = useState<
    "forms" | "techniques" | "philosophy"
  >("forms");
  const [practiceCount, setPracticeCount] = useState<number>(0);

  const handleStanceSelect = useCallback(
    (stance: TrigramStance): void => {
      onStanceChange(stance);
      setPracticeCount((prev) => prev + 1);
    },
    [onStanceChange]
  );

  const handleTrainingModeChange = useCallback(
    (mode: "forms" | "techniques" | "philosophy"): void => {
      setTrainingMode(mode);
    },
    []
  );

  const selectedTrigramData = TRIGRAM_DATA[selectedStance];
  const currentProgress = playerProgress?.[selectedStance] || {
    practiceCount: 0,
    mastery: 0,
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: `linear-gradient(135deg, ${KOREAN_COLORS.DARK_BLUE}, ${KOREAN_COLORS.BLACK})`,
        display: "flex",
        flexDirection: "column",
        color: KOREAN_COLORS.WHITE,
        fontFamily: KOREAN_FONT_FAMILY,
      }}
    >
      {/* Header */}
      <KoreanHeader
        title="팔괘 수련 도장"
        subtitle="Trigram Training Dojang"
        currentRound={practiceCount}
        timeRemaining={0}
      />

      {/* Main Training Area */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Left Panel - Training Controls */}
        <div
          style={{
            width: "300px",
            padding: "1rem",
            background: "rgba(0,0,0,0.3)",
            borderRight: `2px solid ${KOREAN_COLORS.GOLD}`,
          }}
        >
          <h3
            style={{
              color: KOREAN_COLORS.GOLD,
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            수련 모드 (Training Mode)
          </h3>

          {/* Training Mode Selector */}
          <div style={{ marginBottom: "2rem" }}>
            {[
              {
                mode: "forms" as const,
                korean: "형 연습",
                english: "Forms Practice",
              },
              {
                mode: "techniques" as const,
                korean: "기술 훈련",
                english: "Technique Training",
              },
              {
                mode: "philosophy" as const,
                korean: "철학 명상",
                english: "Philosophy Meditation",
              },
            ].map(({ mode, korean, english }) => (
              <button
                key={mode}
                onClick={() => handleTrainingModeChange(mode)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "0.75rem",
                  margin: "0.5rem 0",
                  background:
                    trainingMode === mode
                      ? KOREAN_COLORS.GOLD
                      : "rgba(255,255,255,0.1)",
                  color:
                    trainingMode === mode
                      ? KOREAN_COLORS.BLACK
                      : KOREAN_COLORS.WHITE,
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                {korean}
                <br />
                <small>{english}</small>
              </button>
            ))}
          </div>

          {/* Current Stance Info */}
          <div
            style={{
              marginBottom: "2rem",
              padding: "1rem",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "8px",
            }}
          >
            <h4 style={{ color: KOREAN_COLORS.CYAN, marginBottom: "0.5rem" }}>
              현재 자세 (Current Stance)
            </h4>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                {selectedTrigramData.symbol}
              </div>
              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  marginBottom: "0.25rem",
                }}
              >
                {selectedTrigramData.koreanName}
              </div>
              <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                {selectedTrigramData.englishName}
              </div>
            </div>
          </div>

          {/* Progress Tracking */}
          <ProgressTracker
            label="숙련도 (Mastery)"
            current={currentProgress.mastery}
            maximum={100}
            currentStance={selectedStance}
          />

          <ProgressTracker
            label="연습 횟수 (Practice Count)"
            current={currentProgress.practiceCount + practiceCount}
            maximum={1000}
            currentStance={selectedStance}
          />

          {/* Navigation */}
          <div style={{ marginTop: "2rem" }}>
            <button
              onClick={() => onGamePhaseChange("combat")}
              style={{
                width: "100%",
                padding: "0.75rem",
                background: KOREAN_COLORS.TRADITIONAL_RED,
                color: KOREAN_COLORS.WHITE,
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              실전 모드 (Combat Mode)
            </button>
            <button
              onClick={() => onGamePhaseChange("intro")}
              style={{
                width: "100%",
                padding: "0.75rem",
                background: KOREAN_COLORS.GRAY_MEDIUM,
                color: KOREAN_COLORS.WHITE,
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              메인 메뉴 (Main Menu)
            </button>
          </div>
        </div>

        {/* Center - PixiJS Training Visualization */}
        <div style={{ flex: 1, position: "relative" }}>
          <Stage
            width={800}
            height={600}
            options={{
              backgroundColor: parseInt(
                KOREAN_COLORS.DARK_BLUE.replace("#", ""),
                16
              ),
              antialias: true,
            }}
          >
            <Container>
              {/* Training visualization would go here */}
              <Text
                text={`${selectedTrigramData.technique.koreanName} 연습`}
                anchor={{ x: 0.5, y: 0.5 }}
                x={400}
                y={300}
                style={{
                  fontFamily: KOREAN_FONT_FAMILY,
                  fontSize: 24,
                  fill: parseInt(KOREAN_COLORS.GOLD.replace("#", ""), 16),
                  fontWeight: "bold",
                }}
              />
            </Container>
          </Stage>

          {/* Training Content Overlay */}
          <div
            style={{
              position: "absolute",
              bottom: "2rem",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.8)",
              padding: "1rem",
              borderRadius: "8px",
              textAlign: "center",
              minWidth: "400px",
            }}
          >
            <h4 style={{ color: KOREAN_COLORS.GOLD, marginBottom: "0.5rem" }}>
              {selectedTrigramData.technique.koreanName}
            </h4>
            <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
              {selectedTrigramData.technique.description.korean}
            </p>
            <p style={{ fontSize: "0.8rem", opacity: 0.8 }}>
              {selectedTrigramData.technique.description.english}
            </p>
          </div>
        </div>

        {/* Right Panel - Trigram Wheel */}
        <div
          style={{
            width: "300px",
            padding: "1rem",
            background: "rgba(0,0,0,0.3)",
            borderLeft: `2px solid ${KOREAN_COLORS.GOLD}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              color: KOREAN_COLORS.GOLD,
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            팔괘 선택 (Trigram Selection)
          </h3>

          <TrigramWheel
            selectedStance={selectedStance}
            onStanceChange={handleStanceSelect}
            radius={120}
            isEnabled={true}
            playerKi={100}
            playerMaxKi={100}
          />

          {/* Technique Details */}
          <div style={{ marginTop: "2rem", width: "100%" }}>
            <h4 style={{ color: KOREAN_COLORS.CYAN, marginBottom: "1rem" }}>
              기술 정보 (Technique Info)
            </h4>
            <div style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>위력:</strong> {selectedTrigramData.technique.damage}
              </div>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>기 소모:</strong> {selectedTrigramData.technique.kiCost}
              </div>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>체력 소모:</strong>{" "}
                {selectedTrigramData.technique.staminaCost}
              </div>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>사거리:</strong> {selectedTrigramData.technique.range}
              </div>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>정확도:</strong>{" "}
                {Math.round(selectedTrigramData.technique.accuracy * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
