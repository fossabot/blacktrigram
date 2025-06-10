import React from "react";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import { HealthBar } from "../../ui/HealthBar";
import { StanceIndicator } from "../../ui/StanceIndicator";
import { RoundTimer } from "../../ui/RoundTimer";
import type { CombatHUDProps } from "../../../types/components";
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
  height = 800,
  x = 0,
  y = 0,
}) => {
  usePixiExtensions();

  return (
    <pixiContainer x={x} y={y} data-testid="combat-hud">
      {/* Player 1 Health Bar */}
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
          fontSize: 14,
          fill: KOREAN_COLORS.TEXT_PRIMARY,
          fontWeight: "bold",
        }}
        x={20}
        y={45}
      />

      {/* Player 2 Health Bar */}
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
          fontSize: 14,
          fill: KOREAN_COLORS.TEXT_PRIMARY,
          fontWeight: "bold",
          align: "right",
        }}
        x={width - 20}
        y={45}
        anchor={{ x: 1, y: 0 }}
      />

      {/* Round Timer */}
      <RoundTimer
        timeRemaining={timeRemaining}
        totalTime={180}
        x={width / 2}
        y={20}
      />

      {/* Round Counter */}
      <pixiText
        text={`라운드 ${currentRound} / ${maxRounds}`}
        style={{
          fontSize: 16,
          fill: KOREAN_COLORS.TEXT_PRIMARY,
          fontWeight: "bold",
          align: "center",
        }}
        x={width / 2}
        y={50}
        anchor={0.5}
      />

      {/* Player 1 Stance */}
      <StanceIndicator
        stance={player1.currentStance}
        x={20}
        y={height - 120}
        size={60}
      />

      {/* Player 2 Stance */}
      <StanceIndicator
        stance={player2.currentStance}
        x={width - 80}
        y={height - 120}
        size={60}
      />

      {/* Pause Indicator */}
      {isPaused && (
        <pixiContainer x={width / 2} y={height / 2}>
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
              g.drawRoundedRect(-100, -30, 200, 60, 10);
              g.endFill();
            }}
          />
          <pixiText
            text="일시정지 - PAUSED"
            style={{
              fontSize: 18,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              fontWeight: "bold",
              align: "center",
            }}
            anchor={0.5}
          />
        </pixiContainer>
      )}

      {/* Pause Button */}
      {onPauseToggle && (
        <pixiContainer x={width - 60} y={height - 60}>
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
              g.drawRoundedRect(0, 0, 40, 40, 5);
              g.endFill();
            }}
            interactive={true}
            onPointerDown={onPauseToggle}
          />
          <pixiText
            text="⏸"
            style={{
              fontSize: 16,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              align: "center",
            }}
            x={20}
            y={20}
            anchor={0.5}
          />
        </pixiContainer>
      )}
    </pixiContainer>
  );
};

export default CombatHUD;
