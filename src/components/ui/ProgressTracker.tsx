import React, { useCallback } from "react";
import { Container, Graphics } from "@pixi/react";
import type { JSX } from "react";
import { KoreanText } from "./base/KoreanText";
import { KOREAN_COLORS } from "../../types";

export interface ProgressTrackerProps {
  readonly label: string;
  readonly current: number;
  readonly maximum: number;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly color?: number;
  readonly showPercentage?: boolean;
}

export function ProgressTracker({
  label,
  current,
  maximum,
  x = 0,
  y = 0,
  width = 200,
  height = 20,
  color = KOREAN_COLORS.CYAN,
  showPercentage = true,
}: ProgressTrackerProps): JSX.Element {
  const progress = Math.max(0, Math.min(1, current / maximum));
  const percentage = Math.round(progress * 100);

  const drawProgressBar = useCallback(
    (g: any) => {
      g.clear();

      // Background
      g.setFillStyle({ color: KOREAN_COLORS.GRAY_DARK, alpha: 0.8 });
      g.roundRect(0, 0, width, height, height / 2);
      g.fill();

      // Border
      g.setStrokeStyle({ color: KOREAN_COLORS.WHITE, width: 1, alpha: 0.3 });
      g.roundRect(0, 0, width, height, height / 2);
      g.stroke();

      // Progress fill
      if (progress > 0) {
        const fillWidth = width * progress;
        g.setFillStyle({ color, alpha: 0.8 });
        g.roundRect(0, 0, fillWidth, height, height / 2);
        g.fill();

        // Progress highlight
        g.setStrokeStyle({ color, width: 1, alpha: 0.6 });
        g.roundRect(0, 0, fillWidth, height, height / 2);
        g.stroke();
      }

      // Warning state for low values
      if (progress < 0.25) {
        g.setStrokeStyle({ color: KOREAN_COLORS.RED, width: 2, alpha: 0.8 });
        g.roundRect(-1, -1, width + 2, height + 2, height / 2);
        g.stroke();
      }
    },
    [width, height, progress, color]
  );

  return (
    <Container x={x} y={y}>
      <KoreanText
        text={label}
        y={-25}
        style={{
          fontSize: 12,
          fill: KOREAN_COLORS.WHITE,
          fontWeight: "400",
        }}
      />

      <Graphics draw={drawProgressBar} />

      {showPercentage && (
        <KoreanText
          text={`${current}/${maximum}`}
          x={width + 10}
          y={height / 2}
          anchor={{ x: 0, y: 0.5 }}
          style={{
            fontSize: 11,
            fill: KOREAN_COLORS.GRAY_LIGHT,
            fontWeight: "300",
          }}
        />
      )}

      <KoreanText
        text={`${percentage}%`}
        x={width / 2}
        y={height / 2}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontSize: 10,
          fill: progress > 0.5 ? KOREAN_COLORS.BLACK : KOREAN_COLORS.WHITE,
          fontWeight: "bold",
        }}
      />
    </Container>
  );
}
