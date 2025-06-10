import React from "react";
import * as PIXI from "pixi.js";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import { HealthBar } from "../../ui/HealthBar";
import { StanceIndicator } from "../../ui/StanceIndicator";
import { RoundTimer } from "../../ui/RoundTimer";
import { ScoreDisplay } from "../../ui/ScoreDisplay";
import { KOREAN_COLORS } from "../../../types/constants";
import type { PlayerState } from "../../../types/player";

export interface CombatHUDProps {
  readonly player1: PlayerState;
  readonly player2: PlayerState;
  readonly currentRound: number;
  readonly timeRemaining: number;
  readonly maxRounds: number;
  readonly isPaused: boolean;
  readonly onPauseToggle?: () => void;
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
}

export const CombatHUD: React.FC<CombatHUDProps> = ({
  player1,
  player2,
  currentRound,
  timeRemaining,
  maxRounds,
  isPaused,
  width = 1200,
  height = 100,
  x = 0,
  y = 0,
}) => {
  usePixiExtensions();

  const drawHUDBackground = React.useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.9);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Border
      g.lineStyle(2, KOREAN_COLORS.PRIMARY_CYAN, 0.8);
      g.drawRect(0, 0, width, height);
    },
    [width, height]
  );

  return (
    <pixiContainer x={x} y={y} data-testid="combat-hud">
      {/* HUD Background */}
      <pixiGraphics draw={drawHUDBackground} />

      {/* Player 1 Health & Info */}
      <pixiContainer x={20} y={20}>
        <pixiText
          text={player1.name.korean}
          style={
            new PIXI.TextStyle({
              fontSize: 16,
              fill: KOREAN_COLORS.PLAYER_1_COLOR,
              fontWeight: "bold",
            })
          }
          y={0}
        />
        <HealthBar
          currentHealth={player1.health}
          maxHealth={player1.maxHealth}
          width={200}
          height={15}
          y={20}
        />
        <StanceIndicator
          stance={player1.currentStance}
          size={30}
          x={0}
          y={45}
        />
      </pixiContainer>

      {/* Center - Timer & Round Info */}
      <pixiContainer x={width / 2} y={20}>
        <RoundTimer
          timeRemaining={timeRemaining}
          totalTime={180}
          isRunning={!isPaused}
          x={0}
          y={0}
        />
        <ScoreDisplay
          player1Score={0}
          player2Score={0}
          player1Name={player1.name.korean}
          player2Name={player2.name.korean}
          x={-80}
          y={30}
        />
      </pixiContainer>

      {/* Player 2 Health & Info */}
      <pixiContainer x={width - 220} y={20}>
        <pixiText
          text={player2.name.korean}
          style={
            new PIXI.TextStyle({
              fontSize: 16,
              fill: KOREAN_COLORS.PLAYER_2_COLOR,
              fontWeight: "bold",
              align: "right",
            })
          }
          anchor={1}
          x={200}
          y={0}
        />
        <HealthBar
          currentHealth={player2.health}
          maxHealth={player2.maxHealth}
          width={200}
          height={15}
          y={20}
        />
        <StanceIndicator
          stance={player2.currentStance}
          size={30}
          x={170}
          y={45}
        />
      </pixiContainer>

      {/* Round Indicator */}
      <pixiText
        text={`라운드 ${currentRound}/${maxRounds}`}
        style={
          new PIXI.TextStyle({
            fontSize: 14,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
            align: "center",
          })
        }
        x={width / 2}
        y={height - 20}
        anchor={0.5}
      />
    </pixiContainer>
  );
};

export default CombatHUD;
