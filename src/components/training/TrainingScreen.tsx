import React, { useState, useCallback } from "react";
import type { TrainingScreenProps } from "../../types/components";
import { KoreanText } from "../ui/base/korean-text/KoreanText";
import { TrigramWheel } from "../ui/TrigramWheel";
import { ProgressTracker } from "../ui/ProgressTracker";
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../types/constants";
import type { TrigramStance, KoreanTechnique } from "../../types";

export function TrainingScreen({
  players,
  onPlayerUpdate,
  onStanceChange,
  gameTime,
  onReturnToMenu,
  onStartCombat,
}: TrainingScreenProps): React.JSX.Element {
  const [currentTechnique, setCurrentTechnique] =
    useState<KoreanTechnique | null>(null);
  const [trainingMode, setTrainingMode] = useState<
    "basics" | "techniques" | "philosophy"
  >("basics");

  const player = players?.[0];

  const handleStanceChange = useCallback(
    (stance: TrigramStance) => {
      onStanceChange?.(stance);
      if (onPlayerUpdate && player) {
        onPlayerUpdate(0, { stance, lastStanceChangeTime: gameTime });
      }

      // Set current technique based on stance
      const stanceData = TRIGRAM_DATA[stance];
      if (stanceData?.technique) {
        setCurrentTechnique(stanceData.technique);
      }
    },
    [onStanceChange, onPlayerUpdate, player, gameTime]
  );

  const handleExecuteTechnique = useCallback(() => {
    if (!currentTechnique || !player || !onPlayerUpdate) return;

    // Simulate technique execution in training
    const staminaCost = currentTechnique.staminaCost || 10;
    const kiCost = currentTechnique.kiCost || 5;

    onPlayerUpdate(0, {
      stamina: Math.max(0, player.stamina - staminaCost),
      ki: Math.max(0, player.ki - kiCost),
      isAttacking: true,
    });

    // Reset attack state
    setTimeout(() => {
      onPlayerUpdate(0, { isAttacking: false });
    }, currentTechnique.executionTime || 500);
  }, [currentTechnique, player, onPlayerUpdate]);

  if (!player) {
    return (
      <div
        style={{
          color: "#" + KOREAN_COLORS.WHITE.toString(16),
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <KoreanText
          korean="훈련 데이터를 불러오는 중..."
          english="Loading training data..."
        />
      </div>
    );
  }

  return (
    <div
      data-testid="training-screen"
      style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, #${KOREAN_COLORS.BLACK.toString(
          16
        )} 0%, #1a1a2e 50%, #16213e 100%)`,
        color: "#" + KOREAN_COLORS.WHITE.toString(16),
        padding: "2rem",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
        data-testid="training-header"
      >
        <div>
          <KoreanText
            korean="흑괘 무술 수련"
            english="Black Trigram Martial Training"
            size="xlarge"
            weight="bold"
            color={"#" + KOREAN_COLORS.GOLD.toString(16)}
            data-testid="training-title"
          />
          <KoreanText
            korean={`수련자: ${player.name}`}
            english={`Practitioner: ${player.name}`}
            size="medium"
            color={"#" + KOREAN_COLORS.CYAN.toString(16)}
            data-testid="practitioner-name"
          />
        </div>

        <button
          data-testid="exit-training-button"
          onClick={onReturnToMenu}
          style={{
            backgroundColor: "#" + KOREAN_COLORS.RED.toString(16),
            color: "#" + KOREAN_COLORS.WHITE.toString(16),
            border: "none",
            padding: "0.75rem 1.5rem",
            borderRadius: "5px",
            cursor: "pointer",
            fontFamily: '"Noto Sans KR", Arial, sans-serif',
          }}
        >
          <KoreanText korean="돌아가기" english="Return" />
        </button>
      </div>

      {/* Training Mode Selection */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          justifyContent: "center",
        }}
        data-testid="training-mode-selection"
      >
        {(["basics", "techniques", "philosophy"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setTrainingMode(mode)}
            data-testid={`mode-${mode}`}
            style={{
              backgroundColor:
                trainingMode === mode
                  ? "#" + KOREAN_COLORS.CYAN.toString(16)
                  : "transparent",
              color:
                trainingMode === mode
                  ? "#" + KOREAN_COLORS.BLACK.toString(16)
                  : "#" + KOREAN_COLORS.WHITE.toString(16),
              border: `2px solid #${KOREAN_COLORS.CYAN.toString(16)}`,
              padding: "0.75rem 1.5rem",
              borderRadius: "5px",
              cursor: "pointer",
              fontFamily: '"Noto Sans KR", Arial, sans-serif',
            }}
          >
            <KoreanText
              korean={
                mode === "basics"
                  ? "기초"
                  : mode === "techniques"
                  ? "기법"
                  : "철학"
              }
              english={
                mode === "basics"
                  ? "Basics"
                  : mode === "techniques"
                  ? "Techniques"
                  : "Philosophy"
              }
            />
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "2rem", height: "70vh" }}>
        {/* Left Panel - Player Status */}
        <div
          style={{
            flex: "1",
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: "10px",
            padding: "1.5rem",
          }}
          data-testid="player-status-panel"
        >
          <KoreanText
            korean="수련자 상태"
            english="Practitioner Status"
            size="large"
            weight="bold"
            color={"#" + KOREAN_COLORS.GOLD.toString(16)}
          />

          <div style={{ marginTop: "1rem" }}>
            {/* Health */}
            <ProgressTracker
              label="체력 (Health)"
              value={player.health}
              maxValue={player.maxHealth}
              barColor={KOREAN_COLORS.RED}
              backgroundColor={KOREAN_COLORS.BLACK}
              borderColor={KOREAN_COLORS.WHITE}
              showText={true}
            />
            {/* Ki */}
            <ProgressTracker
              label="기 (Ki)"
              value={player.ki}
              maxValue={player.maxKi}
              barColor={KOREAN_COLORS.CYAN}
              backgroundColor={KOREAN_COLORS.BLACK}
              borderColor={KOREAN_COLORS.WHITE}
              showText={true}
            />
            {/* Stamina */}
            <ProgressTracker
              label="스태미나 (Stamina)"
              value={player.stamina}
              maxValue={player.maxStamina}
              barColor={KOREAN_COLORS.GREEN}
              backgroundColor={KOREAN_COLORS.BLACK}
              borderColor={KOREAN_COLORS.WHITE}
              showText={true}
            />
          </div>

          {/* Current Stance */}
          <div style={{ marginTop: "2rem" }}>
            <KoreanText
              korean="현재 자세"
              english="Current Stance"
              size="medium"
              weight="bold"
              color={"#" + KOREAN_COLORS.CYAN.toString(16)}
            />
            <div
              style={{
                marginTop: "0.5rem",
                padding: "1rem",
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "5px",
              }}
            >
              <KoreanText
                korean={TRIGRAM_DATA[player.stance]?.name?.korean || ""}
                english={TRIGRAM_DATA[player.stance]?.name?.english || ""}
                size="large"
                color={
                  "#" +
                  (KOREAN_COLORS[player.stance]
                    ? KOREAN_COLORS[player.stance].toString(16)
                    : KOREAN_COLORS.WHITE.toString(16))
                }
              />
            </div>
          </div>
        </div>

        {/* Center Panel - Training Content */}
        <div
          style={{
            flex: "2",
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: "10px",
            padding: "1.5rem",
          }}
          data-testid="training-content-panel"
        >
          {trainingMode === "basics" && (
            <>
              <KoreanText
                korean="팔괘 자세 수련"
                english="Eight Trigram Stance Training"
                size="large"
                weight="bold"
                color={"#" + KOREAN_COLORS.GOLD.toString(16)}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2rem",
                }}
              >
                <TrigramWheel
                  currentStance={player.stance}
                  onStanceSelect={handleStanceChange}
                  size={300}
                  interactive={true}
                />
              </div>

              {/* Current Stance Information */}
              <div style={{ marginTop: "2rem" }}>
                <KoreanText
                  korean="선택된 팔괘"
                  english="Selected Trigram"
                  size="medium"
                  weight="bold"
                  color={"#" + KOREAN_COLORS.CYAN.toString(16)}
                />
                <div
                  style={{
                    marginTop: "1rem",
                    padding: "1rem",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: "5px",
                  }}
                >
                  <KoreanText
                    korean={
                      TRIGRAM_DATA[player.stance]?.symbol +
                      " " +
                      (TRIGRAM_DATA[player.stance]?.name?.korean || "")
                    }
                    english={TRIGRAM_DATA[player.stance]?.name?.english || ""}
                    size="large"
                    color={
                      "#" +
                      (KOREAN_COLORS[player.stance]
                        ? KOREAN_COLORS[player.stance].toString(16)
                        : KOREAN_COLORS.WHITE.toString(16))
                    }
                  />
                </div>
              </div>

              {/* Technique Information */}
              {currentTechnique && (
                <div style={{ marginTop: "2rem" }}>
                  <KoreanText
                    korean="기법"
                    english="Technique"
                    size="medium"
                    weight="bold"
                    color={"#" + KOREAN_COLORS.CYAN.toString(16)}
                  />
                  <div
                    style={{
                      marginTop: "1rem",
                      padding: "1rem",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderRadius: "5px",
                    }}
                  >
                    <KoreanText
                      korean={`기법: ${currentTechnique.koreanName}`}
                      english={`Technique: ${currentTechnique.englishName}`}
                      size="medium"
                    />
                    <KoreanText
                      korean={`설명: ${
                        currentTechnique.description?.korean || ""
                      }`}
                      english={`Description: ${
                        currentTechnique.description?.english || ""
                      }`}
                      size="small"
                      style={{ marginTop: "0.5rem" }}
                    />
                    <KoreanText
                      korean={`데미지: ${currentTechnique.damage || 0}`}
                      english={`Damage: ${currentTechnique.damage || 0}`}
                      size="small"
                      style={{ marginTop: "0.5rem" }}
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {trainingMode === "techniques" && currentTechnique && (
            <>
              <KoreanText
                korean="기법 수련"
                english="Technique Training"
                size="large"
                weight="bold"
                color={"#" + KOREAN_COLORS.GOLD.toString(16)}
              />

              <div
                style={{
                  marginTop: "2rem",
                  padding: "1.5rem",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                }}
              >
                <KoreanText
                  korean={currentTechnique.koreanName}
                  english={currentTechnique.englishName}
                  size="xlarge"
                  weight="bold"
                  color={
                    "#" +
                    (KOREAN_COLORS[player.stance]
                      ? KOREAN_COLORS[player.stance].toString(16)
                      : KOREAN_COLORS.WHITE.toString(16))
                  }
                />

                <div style={{ marginTop: "1rem" }}>
                  <KoreanText
                    korean={currentTechnique.description?.korean || ""}
                    english={currentTechnique.description?.english || ""}
                    size="medium"
                  />
                </div>

                <button
                  onClick={handleExecuteTechnique}
                  disabled={
                    player.stamina < (currentTechnique.staminaCost || 10)
                  }
                  style={{
                    marginTop: "1.5rem",
                    backgroundColor: "#" + KOREAN_COLORS.CYAN.toString(16),
                    color: "#" + KOREAN_COLORS.BLACK.toString(16),
                    border: "none",
                    padding: "1rem 2rem",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontFamily: '"Noto Sans KR", Arial, sans-serif',
                    opacity:
                      player.stamina < (currentTechnique.staminaCost || 10)
                        ? 0.5
                        : 1,
                  }}
                >
                  <KoreanText korean="기법 실행" english="Execute Technique" />
                </button>
              </div>
            </>
          )}

          {trainingMode === "philosophy" && (
            <>
              <KoreanText
                korean="무술 철학"
                english="Martial Arts Philosophy"
                size="large"
                weight="bold"
                color={"#" + KOREAN_COLORS.GOLD.toString(16)}
              />

              <div
                style={{
                  marginTop: "2rem",
                  padding: "1.5rem",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                }}
              >
                <KoreanText
                  korean={TRIGRAM_DATA[player.stance]?.philosophy?.korean || ""}
                  english={
                    TRIGRAM_DATA[player.stance]?.philosophy?.english || ""
                  }
                  size="medium"
                />
              </div>
            </>
          )}
        </div>

        {/* Right Panel - Controls */}
        <div
          style={{
            flex: "1",
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: "10px",
            padding: "1.5rem",
          }}
          data-testid="controls-panel"
        >
          <KoreanText
            korean="수련 제어"
            english="Training Controls"
            size="large"
            weight="bold"
            color={"#" + KOREAN_COLORS.GOLD.toString(16)}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            <button
              onClick={() => onStartCombat?.()}
              data-testid="enter-combat-button"
              style={{
                backgroundColor: "#" + KOREAN_COLORS.RED.toString(16),
                color: "#" + KOREAN_COLORS.WHITE.toString(16),
                border: "none",
                padding: "1rem",
                borderRadius: "5px",
                cursor: "pointer",
                fontFamily: '"Noto Sans KR", Arial, sans-serif',
              }}
            >
              <KoreanText korean="실전 모드" english="Combat Mode" />
            </button>

            <button
              onClick={() => {
                if (onPlayerUpdate) {
                  onPlayerUpdate(0, {
                    health: player.maxHealth,
                    ki: player.maxKi,
                    stamina: player.maxStamina,
                  });
                }
              }}
              data-testid="restore-button"
              style={{
                backgroundColor: "#" + KOREAN_COLORS.GREEN.toString(16),
                color: "#" + KOREAN_COLORS.WHITE.toString(16),
                border: "none",
                padding: "1rem",
                borderRadius: "5px",
                cursor: "pointer",
                fontFamily: '"Noto Sans KR", Arial, sans-serif',
              }}
            >
              <KoreanText korean="회복" english="Restore" />
            </button>

            <button
              onClick={onReturnToMenu}
              data-testid="return-to-menu-button"
              style={{
                backgroundColor: "transparent",
                color: "#" + KOREAN_COLORS.WHITE.toString(16),
                border: `2px solid #${KOREAN_COLORS.WHITE.toString(16)}`,
                padding: "1rem",
                borderRadius: "5px",
                cursor: "pointer",
                fontFamily: '"Noto Sans KR", Arial, sans-serif',
              }}
            >
              <KoreanText korean="메뉴로 돌아가기" english="Return to Menu" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
