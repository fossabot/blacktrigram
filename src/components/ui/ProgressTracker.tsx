import { useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { ProgressTrackerProps } from "../../types";
import type { Graphics as PixiGraphics } from "pixi.js";

// Simple progress bar component for individual bars
interface ProgressBarProps {
  readonly current: number;
  readonly maximum: number;
  readonly width: number;
  readonly height?: number;
  readonly barColor?: number;
  readonly backgroundColor?: number;
  readonly label?: string;
  readonly x?: number;
  readonly y?: number;
}

function ProgressBar({
  current,
  maximum,
  width,
  height = 20,
  barColor = 0x00ff00,
  backgroundColor = 0x333333,
  label,
  x = 0,
  y = 0,
}: ProgressBarProps) {
  const percentage = Math.max(0, Math.min(100, (current / maximum) * 100));

  const drawBackground = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      g.beginFill(backgroundColor);
      g.drawRect(0, 0, width, height);
      g.endFill();
    },
    [backgroundColor, width, height]
  );

  const drawProgress = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      g.beginFill(barColor);
      g.drawRect(0, 0, (width * percentage) / 100, height);
      g.endFill();
    },
    [barColor, width, height, percentage]
  );

  return (
    <Container x={x} y={y}>
      {/* Background bar */}
      <Graphics draw={drawBackground} />

      {/* Progress fill */}
      <Graphics draw={drawProgress} />

      {/* Label if provided */}
      {label && (
        <Text
          text={`${label}: ${Math.round(current)}/${maximum}`}
          style={{
            fontFamily: "Arial",
            fontSize: 12,
            fill: 0xffffff,
          }}
          x={width + 10}
          y={height / 2 - 6}
        />
      )}
    </Container>
  );
}

export function ProgressTracker({
  health,
  ki,
  stamina,
  maxHealth = 100,
  maxKi = 100,
  maxStamina = 100,
  x = 0,
  y = 0,
  width = 200,
  showLabels = true,
  spacing = 25,
}: ProgressTrackerProps): React.JSX.Element {
  return (
    <Container x={x} y={y}>
      {/* Health bar */}
      <ProgressBar
        current={health}
        maximum={maxHealth}
        width={width}
        barColor={0xff0000}
        label={showLabels ? "체력 (Health)" : undefined}
        y={0}
      />

      {/* Ki bar */}
      <ProgressBar
        current={ki}
        maximum={maxKi}
        width={width}
        barColor={0x0080ff}
        label={showLabels ? "기 (Ki)" : undefined}
        y={spacing}
      />

      {/* Stamina bar */}
      <ProgressBar
        current={stamina}
        maximum={maxStamina}
        width={width}
        barColor={0x00ff80}
        label={showLabels ? "체력 (Stamina)" : undefined}
        y={spacing * 2}
      />
    </Container>
  );
}

export default ProgressTracker;
