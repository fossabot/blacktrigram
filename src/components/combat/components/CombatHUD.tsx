import React from "react";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import type { CombatHUDProps } from "../../../types/components";
import { HealthBar } from "../../ui/HealthBar";
import { RoundTimer } from "../../ui/RoundTimer";
import { StanceIndicator } from "../../ui/StanceIndicator";
import { KOREAN_COLORS } from "../../../types/constants";

export const CombatHUD: React.FC<CombatHUDProps> = ({
  player1,
  player2,
  timeRemaining,
  currentRound,
  maxRounds,
  isPaused,
  onPauseToggle,
  width = 1200,
  height = 100,
  x = 0,
  y = 0,
}) => {
  usePixiExtensions();

  return (
    <pixiContainer x={x} y={y} data-testid="combat-hud">
      {/* Background */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
          g.drawRect(0, 0, width, height);
          g.endFill();
        }}
      />

      {/* Player 1 Health */}
      <HealthBar
        currentHealth={player1.health}
        maxHealth={player1.maxHealth}
        x={20}
        y={20}
        width={200}
        height={20}
      />

      {/* Player 1 Name */}
      <pixiText
        text={player1.name.korean}
        style={{
          fontSize: 16,
          fill: KOREAN_COLORS.PLAYER_1_COLOR,
          fontWeight: "bold",
        }}
        x={20}
        y={5}
      />

      {/* Player 1 Stance */}
      <StanceIndicator stance={player1.currentStance} x={20} y={45} size={30} />

      {/* Round Timer */}
      <RoundTimer
        timeRemaining={timeRemaining}
        totalTime={180}
        x={width / 2 - 60}
        y={20}
        width={120}
        height={30}
      />

      {/* Round Counter */}
      <pixiText
        text={`Round ${currentRound}/${maxRounds}`}
        style={{
          fontSize: 14,
          fill: KOREAN_COLORS.TEXT_PRIMARY,
          align: "center",
        }}
        x={width / 2}
        y={55}
        anchor={0.5}
      />

      {/* Player 2 Health */}
      <HealthBar
        currentHealth={player2.health}
        maxHealth={player2.maxHealth}
        x={width - 220}
        y={20}
        width={200}
        height={20}
      />

      {/* Player 2 Name */}
      <pixiText
        text={player2.name.korean}
        style={{
          fontSize: 16,
          fill: KOREAN_COLORS.PLAYER_2_COLOR,
          fontWeight: "bold",
          align: "right",
        }}
        x={width - 20}
        y={5}
        anchor={{ x: 1, y: 0 }}
      />

      {/* Player 2 Stance */}
      <StanceIndicator
        stance={player2.currentStance}
        x={width - 50}
        y={45}
        size={30}
      />

      {/* Pause Indicator */}
      {isPaused && (
        <pixiContainer x={width / 2} y={height / 2}>
          <pixiText
            text="일시정지 - PAUSED"
            style={{
              fontSize: 18,
              fill: KOREAN_COLORS.WARNING_YELLOW,
              fontWeight: "bold",
              align: "center",
            }}
            anchor={0.5}
          />
        </pixiContainer>
      )}

      {/* Pause Button */}
      {onPauseToggle && (
        <pixiContainer x={width - 60} y={height - 30}>
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
              g.drawRoundedRect(0, 0, 50, 25, 3);
              g.endFill();
            }}
            interactive={true}
            onPointerDown={onPauseToggle}
          />
          <pixiText
            text={isPaused ? "▶" : "⏸"}
            style={{
              fontSize: 12,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              align: "center",
            }}
            x={25}
            y={12}
            anchor={0.5}
          />
        </pixiContainer>
      )}
    </pixiContainer>
  );
};

export default CombatHUD;
