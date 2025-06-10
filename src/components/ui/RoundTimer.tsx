import React from "react";
import { usePixiExtensions } from "../../utils/pixiExtensions";
import type { RoundTimerProps } from "../../types/components";
import { KOREAN_COLORS } from "../../types/constants";

export const RoundTimer: React.FC<RoundTimerProps> = ({
  timeRemaining,
  totalTime, // Fix: Use totalTime from props
  isPaused = false,
  showWarning = true,
  x = 0,
  y = 0,
  width = 120,
  height = 40,
}) => {
  usePixiExtensions();

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const timeText = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  const timePercentage = timeRemaining / totalTime;
  const isWarning = showWarning && timePercentage < 0.3;

  return (
    <pixiContainer x={x} y={y} data-testid="round-timer">
      {/* Background */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
          g.drawRoundedRect(0, 0, width, height, 5);
          g.endFill();
        }}
      />

      {/* Time Bar */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          const barColor = isWarning
            ? KOREAN_COLORS.WARNING_ORANGE
            : KOREAN_COLORS.POSITIVE_GREEN;
          g.beginFill(barColor, 0.7);
          g.drawRoundedRect(
            5,
            5,
            (width - 10) * timePercentage,
            height - 10,
            3
          );
          g.endFill();
        }}
      />

      {/* Time Text */}
      <pixiText
        text={timeText}
        style={{
          fontSize: 16,
          fill: isWarning
            ? KOREAN_COLORS.WARNING_ORANGE
            : KOREAN_COLORS.TEXT_PRIMARY,
          fontWeight: "bold",
          align: "center",
        }}
        x={width / 2}
        y={height / 2}
        anchor={0.5}
      />

      {/* Paused Indicator */}
      {isPaused && (
        <pixiText
          text="일시정지"
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.WARNING_YELLOW,
            align: "center",
          }}
          x={width / 2}
          y={height + 15}
          anchor={0.5}
        />
      )}
    </pixiContainer>
  );
};

export default RoundTimer;
