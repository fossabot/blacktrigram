import React, { useState, useCallback, useMemo } from "react";
import type { TrainingScreenProps } from "../../types/components";
import type { PlayerState } from "../../types/player";
import type { TrigramStance } from "../../types/trigram";
import { TrigramStance as TrigramStanceEnum } from "../../types/enums"; // Fix: Import enum
import { Player } from "../game/Player";
import { TrigramWheel } from "../ui/TrigramWheel";
import { HealthBar } from "../ui/HealthBar";
import { StanceIndicator } from "../ui/StanceIndicator";
import { DojangBackground } from "../game/DojangBackground";
import { KOREAN_COLORS } from "../../types/constants";

export const TrainingScreen: React.FC<TrainingScreenProps> = ({
  onReturnToMenu,
  player,
  onPlayerUpdate,
  width = 1200,
  height = 800,
  x = 0,
  y = 0,
}) => {
  const [selectedStance, setSelectedStance] = useState<TrigramStance>(
    TrigramStanceEnum.GEON
  );
  const [isTraining, setIsTraining] = useState(false);

  // Fix: Use these memoized values in the component
  const trainingPlayer = useMemo(() => {
    return (player || {
      id: "training_player",
      name: { korean: "훈련생", english: "Trainee" },
      health: 100,
      maxHealth: 100,
      currentStance: TrigramStanceEnum.GEON,
      // ... other default properties
    }) as PlayerState;
  }, [player]);

  const trainingDummy = useMemo(() => {
    return {
      id: "training_dummy",
      name: { korean: "훈련 더미", english: "Training Dummy" },
      health: 1000,
      maxHealth: 1000,
      currentStance: TrigramStanceEnum.GAN,
      // ... other properties
    } as PlayerState;
  }, []);

  // Fix: Remove unused handleArchetypeChange or use it
  const handleStanceChange = useCallback(
    (stance: TrigramStance) => {
      setSelectedStance(stance);
      if (onPlayerUpdate) {
        onPlayerUpdate({ currentStance: stance });
      }
    },
    [onPlayerUpdate]
  );

  // Fix: Use the handlers and computed values
  const handleTrainingStart = useCallback(() => {
    setIsTraining(true);
    console.log("Training started with player:", trainingPlayer);
    console.log("Training against dummy:", trainingDummy);

    // Auto-stop training after 3 seconds
    setTimeout(() => {
      setIsTraining(false);
    }, 3000);
  }, [trainingPlayer, trainingDummy]);

  return (
    <pixiContainer x={x} y={y} data-testid="training-screen">
      <DojangBackground
        width={width}
        height={height}
        lighting="traditional"
        animate={true}
      />

      {/* Training Header */}
      <pixiContainer x={width / 2} y={40} data-testid="training-title">
        <pixiText
          text="흑괘 훈련 도장 - Black Trigram Training"
          style={{
            fontSize: 24,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            fontWeight: "bold",
            align: "center",
          }}
          anchor={0.5}
        />
      </pixiContainer>

      {/* Training Status Indicator - Use isTraining */}
      {isTraining && (
        <pixiContainer x={width / 2} y={height / 2 - 50}>
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.ACCENT_GOLD, 0.9);
              g.drawRoundedRect(-100, -25, 200, 50, 10);
              g.endFill();
            }}
          />
          <pixiText
            text="훈련 중... Training in Progress"
            style={{
              fontSize: 16,
              fill: KOREAN_COLORS.BLACK_SOLID,
              align: "center",
              fontWeight: "bold",
            }}
            anchor={0.5}
          />
        </pixiContainer>
      )}

      {/* Player Status Panel */}
      <pixiContainer x={50} y={50} data-testid="player-status-panel">
        {trainingPlayer && (
          <>
            <HealthBar
              currentHealth={trainingPlayer.health}
              maxHealth={trainingPlayer.maxHealth}
              width={200}
              height={20}
            />

            <StanceIndicator
              stance={trainingPlayer.currentStance}
              size={60}
              x={0}
              y={40}
            />

            <pixiText
              text="수련자 상태"
              style={{
                fontSize: 14,
                fill: KOREAN_COLORS.TEXT_SECONDARY,
              }}
              y={-25}
            />
          </>
        )}
      </pixiContainer>

      {/* Training Content Panel */}
      <pixiContainer
        x={50}
        y={height - 300}
        data-testid="training-content-panel"
      >
        {/* Mode Selection */}
        <pixiContainer y={0}>
          <pixiContainer x={0} y={0} data-testid="mode-basics">
            <pixiGraphics
              draw={(g) => {
                g.clear();
                g.beginFill(KOREAN_COLORS.ACCENT_GOLD, 0.8);
                g.drawRoundedRect(0, 0, 80, 30, 5);
                g.endFill();
              }}
              interactive={true}
              onPointerDown={() => console.log("Basics mode selected")}
            />
            <pixiText
              text="기초"
              style={{
                fontSize: 14,
                fill: KOREAN_COLORS.BLACK_SOLID,
                align: "center",
              }}
              x={40}
              y={15}
              anchor={0.5}
            />
          </pixiContainer>

          <pixiContainer x={90} y={0} data-testid="mode-techniques">
            <pixiGraphics
              draw={(g) => {
                g.clear();
                g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
                g.drawRoundedRect(0, 0, 80, 30, 5);
                g.endFill();
              }}
              interactive={true}
              onPointerDown={() => console.log("Techniques mode selected")}
            />
            <pixiText
              text="기법"
              style={{
                fontSize: 14,
                fill: KOREAN_COLORS.TEXT_PRIMARY,
                align: "center",
              }}
              x={40}
              y={15}
              anchor={0.5}
            />
          </pixiContainer>

          <pixiContainer x={180} y={0} data-testid="mode-philosophy">
            <pixiGraphics
              draw={(g) => {
                g.clear();
                g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
                g.drawRoundedRect(0, 0, 80, 30, 5);
                g.endFill();
              }}
              interactive={true}
              onPointerDown={() => console.log("Philosophy mode selected")}
            />
            <pixiText
              text="철학"
              style={{
                fontSize: 14,
                fill: KOREAN_COLORS.TEXT_PRIMARY,
                align: "center",
              }}
              x={40}
              y={15}
              anchor={0.5}
            />
          </pixiContainer>
        </pixiContainer>

        {/* Technique Execution - Modified to show training state */}
        <pixiContainer x={0} y={50}>
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.beginFill(
                isTraining
                  ? KOREAN_COLORS.WARNING_ORANGE
                  : KOREAN_COLORS.POSITIVE_GREEN,
                0.8
              );
              g.drawRoundedRect(0, 0, 120, 40, 5);
              g.endFill();
            }}
            interactive={!isTraining}
            onPointerDown={isTraining ? undefined : handleTrainingStart}
          />
          <pixiText
            text={isTraining ? "훈련 중..." : "기법 실행"}
            style={{
              fontSize: 14,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              align: "center",
            }}
            x={60}
            y={20}
            anchor={0.5}
          />
        </pixiContainer>

        {/* Training Progress Indicator */}
        {isTraining && (
          <pixiContainer x={130} y={50}>
            <pixiGraphics
              draw={(g) => {
                g.clear();
                g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
                g.drawRoundedRect(0, 0, 150, 40, 5);
                g.endFill();
                // Progress bar
                g.beginFill(KOREAN_COLORS.ACCENT_GOLD, 0.8);
                g.drawRoundedRect(5, 15, 140 * 0.7, 10, 2); // 70% progress example
                g.endFill();
              }}
            />
            <pixiText
              text="진행률 70%"
              style={{
                fontSize: 12,
                fill: KOREAN_COLORS.TEXT_PRIMARY,
                align: "center",
              }}
              x={75}
              y={20}
              anchor={0.5}
            />
          </pixiContainer>
        )}

        {/* Trigram Training Section */}
        <pixiContainer x={0} y={100}>
          <pixiText
            text="팔괘 자세 수련"
            style={{
              fontSize: 16,
              fill: KOREAN_COLORS.ACCENT_GOLD,
              fontWeight: "bold",
            }}
            y={0}
          />

          <TrigramWheel
            currentStance={selectedStance}
            onStanceSelect={handleStanceChange}
            size={80}
            interactive={true}
            x={0}
            y={25}
          />
        </pixiContainer>

        {/* Philosophy Section */}
        <pixiContainer x={200} y={50}>
          <pixiText
            text="무술 철학"
            style={{
              fontSize: 14,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
            }}
          />
          <pixiText
            text="현재 자세: 건괘 (천)"
            style={{
              fontSize: 12,
              fill: KOREAN_COLORS.TEXT_TERTIARY,
            }}
            y={20}
          />
        </pixiContainer>
      </pixiContainer>

      {/* Controls Panel */}
      <pixiContainer
        x={width - 200}
        y={height - 200}
        data-testid="controls-panel"
      >
        {/* Enter Combat Button */}
        <pixiContainer data-testid="enter-combat-button">
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.ACCENT_RED, 0.8);
              g.drawRoundedRect(0, 0, 150, 40, 5);
              g.endFill();
            }}
            interactive={true}
            onPointerDown={() => console.log("Enter combat")}
          />
          <pixiText
            text="실전 모드"
            style={{
              fontSize: 14,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              align: "center",
            }}
            x={75}
            y={20}
            anchor={0.5}
          />
        </pixiContainer>

        {/* Restore/Recovery Button */}
        <pixiContainer y={50}>
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.POSITIVE_GREEN, 0.8);
              g.drawRoundedRect(0, 0, 150, 40, 5);
              g.endFill();
            }}
            interactive={true}
            onPointerDown={() => console.log("Restore player")}
          />
          <pixiText
            text="회복"
            style={{
              fontSize: 14,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              align: "center",
            }}
            x={75}
            y={20}
            anchor={0.5}
          />
        </pixiContainer>

        {/* Return to Menu Button */}
        <pixiContainer y={100} data-testid="return-to-menu-button">
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
              g.drawRoundedRect(0, 0, 150, 40, 5);
              g.endFill();
            }}
            interactive={true}
            onPointerDown={onReturnToMenu}
          />
          <pixiText
            text="메뉴로 돌아가기"
            style={{
              fontSize: 14,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              align: "center",
            }}
            x={75}
            y={20}
            anchor={0.5}
          />
        </pixiContainer>
      </pixiContainer>

      {/* Player Display */}
      {trainingPlayer && (
        <Player
          playerState={trainingPlayer}
          playerIndex={0}
          x={width / 2}
          y={height / 2}
          onClick={() => console.log("Player clicked")}
        />
      )}
    </pixiContainer>
  );
};

export default TrainingScreen;
