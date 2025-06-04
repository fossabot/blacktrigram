import { useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { ProgressTrackerProps } from "../../types";
import type { Graphics as PixiGraphics } from "pixi.js";

// Simple progress bar component for individual bars
interface ProgressBarProps {
  readonly label: string;
  readonly current: number;
  readonly max: number; // Added missing property
  readonly color: string;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
}

function ProgressBar({
  label,
  current,
  max,
  color,
  x = 0,
  y = 0,
  width = 200,
  height = 20,
}: ProgressBarProps) {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));

  const drawBackground = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      g.beginFill(0x333333);
      g.drawRect(0, 0, width, height);
      g.endFill();
    },
    [width, height]
  );

  const drawProgress = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      g.beginFill(color);
      g.drawRect(0, 0, (width * percentage) / 100, height);
      g.endFill();
    },
    [color, width, height, percentage]
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
          text={`${label}: ${Math.round(current)}/${max}`}
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
  health = 100,
  ki = 100,
  stamina = 100,
  maxHealth = 100,
  maxKi = 100,
  maxStamina = 100,
}: ProgressTrackerProps): React.JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <ProgressBar
        label="Health"
        current={health}
        max={maxHealth} // Now valid
        color="#ff4444"
      />
      <ProgressBar
        label="Ki"
        current={ki}
        max={maxKi} // Now valid
        color="#4444ff"
      />
      <ProgressBar
        label="Stamina"
        current={stamina}
        max={maxStamina} // Now valid
        color="#44ff44"
      />
    </div>
  );
}

export default ProgressTracker;
