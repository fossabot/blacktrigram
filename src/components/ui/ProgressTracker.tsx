import { useCallback } from "react";
import type { TrigramStance, ProgressTrackerProps } from "../../types";
import { TRIGRAM_DATA } from "../../types";
import type {
  Graphics as PixiGraphics,
  TextStyle as PixiTextStyle,
} from "pixi.js";
import { Container, Graphics, Text } from "@pixi/react";

const PROGRESS_BAR_HEIGHT = 20; // Define height as a constant

export function ProgressTracker({
  label,
  current,
  maximum,
  currentStance,
  x = 0, // Default position props
  y = 0,
}: ProgressTrackerProps & { x?: number; y?: number }): React.JSX.Element {
  // Add x, y to props
  const progress = maximum > 0 ? Math.min(100, (current / maximum) * 100) : 0;

  const drawProgressBar = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      const width = 200;
      const height = PROGRESS_BAR_HEIGHT; // Use constant
      const progressWidth = (width * current) / maximum; // Use current and maximum directly

      g.beginFill(0x333333, 0.8);
      g.drawRect(0, 0, width, height);
      g.endFill();

      const stanceColors: Record<TrigramStance, number> = {
        geon: 0xffd700,
        tae: 0x87ceeb,
        li: 0xff4500,
        jin: 0x9370db,
        son: 0x98fb98,
        gam: 0x4169e1,
        gan: 0x8b4513,
        gon: 0x654321,
      };

      const fillColor = currentStance ? stanceColors[currentStance] : 0x00ff00;

      g.beginFill(fillColor, 0.9); // Slightly more opaque
      g.drawRect(0, 0, progressWidth, height);
      g.endFill();

      g.lineStyle(1, 0xffffff, 0.7); // Thinner border
      g.drawRect(0, 0, width, height);
    },
    [current, maximum, currentStance]
  );

  const labelStyle: Partial<PixiTextStyle> = {
    fontFamily: "Noto Sans KR",
    fontSize: 14,
    fill: 0xffffff,
  };

  const progressTextStyle: Partial<PixiTextStyle> = {
    fontFamily: "Noto Sans KR",
    fontSize: 12,
    fill: 0xcccccc,
  };

  const stanceTextStyle: Partial<PixiTextStyle> = {
    fontFamily: "Noto Sans KR",
    fontSize: 10,
    fill: 0xffd700,
  };

  return (
    <Container x={x} y={y} data-testid="pixi-container">
      <Text
        text={label}
        y={-18} // Adjusted position
        style={labelStyle as PixiTextStyle}
      />
      <Graphics draw={drawProgressBar} y={0} />
      <Text
        text={`${current}/${maximum} (${Math.round(progress)}%)`}
        y={PROGRESS_BAR_HEIGHT + 5} // Position below bar using constant
        x={100} // Centered on bar
        anchor={{ x: 0.5, y: 0 }}
        style={progressTextStyle as Partial<PixiTextStyle>} // Cast style
      />
      {currentStance && (
        <Text
          text={`자세: ${
            TRIGRAM_DATA[currentStance]?.koreanName ||
            currentStance.toUpperCase()
          }`}
          y={PROGRESS_BAR_HEIGHT + 25} // Position further below using constant
          x={100}
          anchor={{ x: 0.5, y: 0 }}
          style={stanceTextStyle as Partial<PixiTextStyle>} // Cast style
        />
      )}
    </Container>
  );
}
