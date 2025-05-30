import type { JSX } from "react";
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../types";
import type { ProgressTrackerProps } from "../../types";
import type { Graphics as PixiGraphics } from "pixi.js";

export function ProgressTracker({
  label,
  current,
  maximum,
  currentStance,
}: ProgressTrackerProps): JSX.Element {
  const percentage = Math.min(100, (current / maximum) * 100);
  const stanceText = currentStance ? TRIGRAM_DATA[currentStance].korean : "";

  const drawProgressBar = (g: PixiGraphics): void => {
    g.clear();

    // Background bar
    g.setFillStyle({ color: KOREAN_COLORS.BLACK, alpha: 0.7 });
    g.roundRect(0, 0, 200, 20, 10);
    g.fill();

    // Progress fill
    const fillWidth = (percentage / 100) * 200;
    g.setFillStyle({ color: KOREAN_COLORS.GOLD, alpha: 0.8 });
    g.roundRect(0, 0, fillWidth, 20, 10);
    g.fill();

    // Border
    g.setStrokeStyle({ color: KOREAN_COLORS.WHITE, width: 2 });
    g.roundRect(0, 0, 200, 20, 10);
    g.stroke();
  };

  return (
    <pixiContainer data-testid="progress-tracker">
      {/* Label */}
      <pixiText
        text={label}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 14,
          fill: KOREAN_COLORS.WHITE,
        }}
        y={-25}
      />

      {/* Progress Bar */}
      <pixiGraphics draw={drawProgressBar} />

      {/* Progress Text */}
      <pixiText
        text={`${current}/${maximum} (${Math.round(percentage)}%)`}
        anchor={{ x: 0.5, y: 0.5 }}
        x={100}
        y={10}
        style={{
          fontFamily: "monospace",
          fontSize: 12,
          fill: KOREAN_COLORS.BLACK,
          fontWeight: "bold",
        }}
      />

      {/* Stance Text */}
      {currentStance && (
        <pixiText
          text={`${stanceText} (${currentStance.toUpperCase()})`}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 12,
            fill: KOREAN_COLORS.GOLD,
          }}
          y={30}
        />
      )}
    </pixiContainer>
  );
}
