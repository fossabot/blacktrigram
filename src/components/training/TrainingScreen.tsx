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
  ); // Fix: Use enum value
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
      <pixiContainer x={width / 2} y={40}>
        <pixiText
          text="훈련 모드 - Training Mode"
          style={{
            fontSize: 24,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            fontWeight: "bold",
            align: "center",
          }}
          anchor={0.5}
        />
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

      {/* Training Controls */}
      <pixiContainer x={50} y={height - 200}>
        <TrigramWheel
          currentStance={selectedStance} // Fix: Use currentStance instead of selectedStance
          onStanceSelect={handleStanceChange} // Fix: Use onStanceSelect instead of onStanceChange
          size={80}
          interactive={true}
        />
      </pixiContainer>

      {/* Health and Stats */}
      {trainingPlayer && (
        <pixiContainer x={50} y={50}>
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
        </pixiContainer>
      )}

      {/* Training Button */}
      <pixiContainer x={width / 2} y={height - 100}>
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.beginFill(
              isTraining
                ? KOREAN_COLORS.NEGATIVE_RED
                : KOREAN_COLORS.POSITIVE_GREEN,
              0.8
            );
            g.drawRoundedRect(0, 0, 120, 40, 5);
            g.endFill();
          }}
          interactive={true}
          onPointerDown={handleTrainingStart}
        />
        <pixiText
          text={isTraining ? "훈련 중..." : "훈련 시작"}
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

      {/* Return Button */}
      <pixiContainer x={width - 120} y={20}>
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
            g.drawRoundedRect(0, 0, 100, 40, 5);
            g.endFill();
          }}
          interactive={true}
          onPointerDown={onReturnToMenu}
        />
        <pixiText
          text="돌아가기"
          style={{
            fontSize: 14,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            align: "center",
          }}
          x={50}
          y={20}
          anchor={0.5}
        />
      </pixiContainer>
    </pixiContainer>
  );
};

export default TrainingScreen;
