import React, { useCallback, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import {
  KOREAN_COLORS,
  KOREAN_FONT_FAMILY_PRIMARY,
} from "../../types/constants";

export interface ProgressBarProps {
  readonly current: number;
  readonly maximum: number;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly color?: number;
  readonly backgroundColor?: number;
  readonly borderColor?: number;
  readonly showText?: boolean;
  readonly label?: string;
  readonly showPercentage?: boolean;
}

export function ProgressBar({
  current,
  maximum,
  x = 0,
  y = 0,
  width = 200,
  height = 20,
  color = KOREAN_COLORS.GREEN,
  backgroundColor = KOREAN_COLORS.GRAY_DARK,
  borderColor = KOREAN_COLORS.WHITE,
  showText = true,
  label,
  showPercentage = false,
}: ProgressBarProps): React.ReactElement {
  const percentage = useMemo(() => {
    return Math.max(0, Math.min(1, current / maximum));
  }, [current, maximum]);

  const barColor = useMemo(() => {
    // Dynamic color based on percentage
    if (percentage > 0.6) return color;
    if (percentage > 0.3) return KOREAN_COLORS.YELLOW;
    return KOREAN_COLORS.RED;
  }, [percentage, color]);

  const drawProgressBar = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Background
      g.setFillStyle({ color: backgroundColor, alpha: 0.8 });
      g.roundRect(0, 0, width, height, 4);
      g.fill();

      // Progress fill
      if (percentage > 0) {
        g.setFillStyle({ color: barColor });
        g.roundRect(0, 0, width * percentage, height, 4);
        g.fill();
      }

      // Border
      g.setStrokeStyle({ color: borderColor, width: 1 });
      g.roundRect(0, 0, width, height, 4);
      g.stroke();

      // Critical warning effect
      if (percentage < 0.25) {
        g.setStrokeStyle({ color: KOREAN_COLORS.RED, width: 2, alpha: 0.6 });
        g.roundRect(-2, -2, width + 4, height + 4, 6);
        g.stroke();
      }
    },
    [width, height, percentage, barColor, backgroundColor, borderColor]
  );

  const displayText = useMemo(() => {
    if (showPercentage) {
      return `${Math.round(percentage * 100)}%`;
    }
    return `${Math.round(current)}/${maximum}`;
  }, [current, maximum, percentage, showPercentage]);

  return (
    <Container x={x} y={y}>
      {/* Label */}
      {label && (
        <Text
          text={label}
          anchor={{ x: 0, y: 1 }}
          y={-5}
          style={{
            fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
            fontSize: 12,
            fill: KOREAN_COLORS.WHITE,
            fontWeight: "bold",
          }}
        />
      )}

      {/* Progress bar */}
      <Graphics draw={drawProgressBar} />

      {/* Value text */}
      {showText && (
        <Text
          text={displayText}
          anchor={0.5}
          x={width / 2}
          y={height / 2}
          style={{
            fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
            fontSize: Math.min(height * 0.6, 14),
            fill: KOREAN_COLORS.WHITE,
            stroke: KOREAN_COLORS.BLACK,
            strokeThickness: 1,
            fontWeight: "bold",
          }}
        />
      )}
    </Container>
  );
}

export interface ProgressTrackerProps {
  readonly health: { current: number; maximum: number };
  readonly ki: { current: number; maximum: number };
  readonly stamina: { current: number; maximum: number };
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly spacing?: number;
  readonly showLabels?: boolean;
}

export function ProgressTracker({
  health,
  ki,
  stamina,
  x = 0,
  y = 0,
  width = 200,
  spacing = 25,
  showLabels = true,
}: ProgressTrackerProps): React.ReactElement {
  return (
    <Container x={x} y={y}>
      {/* Health Bar */}
      <ProgressBar
        current={health.current}
        maximum={health.maximum}
        width={width}
        height={18}
        color={KOREAN_COLORS.HEALTH_RED}
        label={showLabels ? "체력 (Health)" : undefined}
        y={0}
      />

      {/* Ki Bar */}
      <ProgressBar
        current={ki.current}
        maximum={ki.maximum}
        width={width}
        height={15}
        color={KOREAN_COLORS.CYAN}
        label={showLabels ? "기 (Ki)" : undefined}
        y={spacing}
      />

      {/* Stamina Bar */}
      <ProgressBar
        current={stamina.current}
        maximum={stamina.maximum}
        width={width}
        height={12}
        color={KOREAN_COLORS.STAMINA_GREEN}
        label={showLabels ? "체력 (Stamina)" : undefined}
        y={spacing * 2}
      />
    </Container>
  );
}
