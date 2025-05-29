import { useCallback } from "react";
import type { TrigramStance, ProgressTrackerProps } from "../../types";
import type { Graphics as PixiGraphics } from "pixi.js";

export function ProgressTracker({
  label,
  current,
  maximum,
  currentStance,
}: ProgressTrackerProps): JSX.Element {
  const progress = maximum > 0 ? Math.min(100, (current / maximum) * 100) : 0;

  const drawProgressBar = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      const width = 300;
      const height = 20;
      const progressWidth = (width * progress) / 100;

      g.setFillStyle({ color: 0x333333, alpha: 0.8 });
      g.rect(0, 0, width, height);
      g.fill();

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

      g.setFillStyle({ color: fillColor, alpha: 0.8 });
      g.rect(0, 0, progressWidth, height);
      g.fill();

      g.setStrokeStyle({ color: 0xffffff, width: 2, alpha: 0.7 });
      g.rect(0, 0, width, height);
      g.stroke();
    },
    [progress, currentStance]
  );

  return (
    <pixiContainer>
      <pixiText
        text={label}
        y={-25}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 14,
          fill: 0xffffff,
        }}
      />
      <pixiGraphics draw={drawProgressBar} />
      <pixiText
        text={`${current}/${maximum} (${Math.round(progress)}%)`}
        y={25}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 12,
          fill: 0xcccccc,
        }}
      />
      {currentStance && (
        <pixiText
          text={`현재 자세: ${currentStance.toUpperCase()}`}
          y={45}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 10,
            fill: 0xffd700,
          }}
        />
      )}
    </pixiContainer>
  );
}
