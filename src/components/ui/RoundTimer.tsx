import React from "react";
import * as PIXI from "pixi.js";
import { usePixiExtensions } from "../../utils/pixiExtensions";
import { KOREAN_COLORS } from "../../types/constants";

export interface RoundTimerProps {
  readonly timeRemaining: number;
  readonly totalTime?: number;
  readonly isRunning?: boolean;
  readonly showWarning?: boolean;
  readonly x?: number;
  readonly y?: number;
}

export const RoundTimer: React.FC<RoundTimerProps> = ({
  timeRemaining,
  totalTime = 180,
  isRunning = true,
  showWarning = true,
  x = 0,
  y = 0,
}) => {
  usePixiExtensions();

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = Math.floor(timeRemaining % 60);
  const timeText = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  const isLowTime = timeRemaining <= 30;
  const textColor =
    isLowTime && showWarning
      ? KOREAN_COLORS.WARNING_ORANGE
      : KOREAN_COLORS.TEXT_PRIMARY;

  // Fix: Use totalTime and isRunning to avoid unused variable warnings
  const progressPercent = totalTime > 0 ? timeRemaining / totalTime : 1;
  const timerAlpha = isRunning ? 1.0 : 0.5;

  return (
    <pixiContainer x={x} y={y} data-testid="round-timer" alpha={timerAlpha}>
      <pixiText
        text="시간 (Time)"
        style={
          new PIXI.TextStyle({
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          })
        }
        anchor={0.5}
        y={-15}
      />

      <pixiText
        text={timeText}
        style={
          new PIXI.TextStyle({
            fontSize: 24,
            fill: textColor,
            fontWeight: "bold",
          })
        }
        anchor={0.5}
      />

      {/* Progress bar showing time remaining */}
      <pixiGraphics
        draw={(g: PIXI.Graphics) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.5);
          g.drawRect(-50, 20, 100, 4);
          g.endFill();

          g.beginFill(
            isLowTime
              ? KOREAN_COLORS.WARNING_ORANGE
              : KOREAN_COLORS.PRIMARY_CYAN
          );
          g.drawRect(-50, 20, 100 * progressPercent, 4);
          g.endFill();
        }}
      />
    </pixiContainer>
  );
};

export default RoundTimer;
