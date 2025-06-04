import React, { useState, useCallback } from "react";
import type { TrainingScreenProps } from "../../types/components";
import { KoreanText } from "../ui/base/korean-text/KoreanText";
import { TrigramWheel } from "../ui/TrigramWheel";
import { ProgressTracker } from "../ui/ProgressTracker";
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../types/constants";
import type { TrigramStance, KoreanTechnique } from "../../types";

export function TrainingScreen({
  players,
  onGamePhaseChange,
  onPlayerUpdate,
  onStanceChange,
  selectedStance,
  gameTime,
  currentRound,
  onReturnToMenu,
  onStartCombat,
  ...props
}: TrainingScreenProps): React.JSX.Element {
  const [currentTechnique, setCurrentTechnique] =
    useState<KoreanTechnique | null>(null);
  const [trainingMode, setTrainingMode] = useState<
    "basics" | "techniques" | "philosophy"
  >("basics");

  const player = players?.[0];
  const trainingDummy = players?.[1];

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
          color: KOREAN_COLORS.WHITE,
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
        background: `linear-gradient(135deg, ${KOREAN_COLORS.BLACK} 0%, #1a1a2e 50%, #16213e 100%)`,
        color: KOREAN_COLORS.WHITE,
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
      >
        <div>
          <KoreanText
            korean="흑괘 무술 수련"
            english="Black Trigram Martial Training"
            size="xlarge"
            weight="bold"
            color={KOREAN_COLORS.GOLD}
          />
          <KoreanText
            korean={`수련자: ${player.name}`}
            english={`Practitioner: ${player.name}`}
            size="medium"
            color={KOREAN_COLORS.CYAN}
          />
        </div>

        <button
          data-testid="exit-training"
          onClick={onReturnToMenu}
          style={{
            backgroundColor: KOREAN_COLORS.RED,
            color: KOREAN_COLORS.WHITE,
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
      >
        {(["basics", "techniques", "philosophy"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setTrainingMode(mode)}
            style={{
              backgroundColor:
                trainingMode === mode ? KOREAN_COLORS.CYAN : "transparent",
              color:
                trainingMode === mode
                  ? KOREAN_COLORS.BLACK
                  : KOREAN_COLORS.WHITE,
              border: `2px solid ${KOREAN_COLORS.CYAN}`,
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
        >
          <KoreanText
            korean="수련자 상태"
            english="Practitioner Status"
            size="large"
            weight="bold"
            color={KOREAN_COLORS.GOLD}
          />

          <div style={{ marginTop: "1rem" }}>
            <ProgressTracker
              health={player.health}
              ki={player.ki}
              stamina={player.stamina}
              maxHealth={player.maxHealth}
              maxKi={player.maxKi}
              maxStamina={player.maxStamina}
              showLabels={true}
              spacing={15}
            />
          </div>

          {/* Current Stance */}
          <div style={{ marginTop: "2rem" }}>
            <KoreanText
              korean="현재 자세"
              english="Current Stance"
              size="medium"
              weight="bold"
              color={KOREAN_COLORS.CYAN}
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
                color={KOREAN_COLORS[player.stance] || KOREAN_COLORS.WHITE}
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
        >
          {trainingMode === "basics" && (
            <>
              <KoreanText
                korean="팔괘 자세 수련"
                english="Eight Trigram Stance Training"
                size="large"
                weight="bold"
                color={KOREAN_COLORS.GOLD}
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
                  onStanceChange={handleStanceChange}
                  size={300}
                  interactive={true}
                  showLabels={true}
                />
              </div>
            </>
          )}

          {trainingMode === "techniques" && currentTechnique && (
            <>
              <KoreanText
                korean="기법 수련"
                english="Technique Training"
                size="large"
                weight="bold"
                color={KOREAN_COLORS.GOLD}
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
                  color={KOREAN_COLORS[player.stance]}
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
                    backgroundColor: KOREAN_COLORS.CYAN,
                    color: KOREAN_COLORS.BLACK,
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
                color={KOREAN_COLORS.GOLD}
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
        >
          <KoreanText
            korean="수련 제어"
            english="Training Controls"
            size="large"
            weight="bold"
            color={KOREAN_COLORS.GOLD}
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
              style={{
                backgroundColor: KOREAN_COLORS.RED,
                color: KOREAN_COLORS.WHITE,
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
              style={{
                backgroundColor: KOREAN_COLORS.GREEN,
                color: KOREAN_COLORS.WHITE,
                border: "none",
                padding: "1rem",
                borderRadius: "5px",
                cursor: "pointer",
                fontFamily: '"Noto Sans KR", Arial, sans-serif',
              }}
            >
              <KoreanText korean="회복" english="Restore" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
