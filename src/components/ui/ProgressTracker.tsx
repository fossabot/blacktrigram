import type { JSX } from "react";
import type { Graphics as PixiGraphics } from "pixi.js";

export type TrigramStance =
  | "geon"
  | "tae"
  | "li"
  | "jin"
  | "son"
  | "gam"
  | "gan"
  | "gon";

interface ProgressTrackerProps {
  readonly practiceCount: Record<TrigramStance, number>;
  readonly totalPractices: number;
  readonly currentStance: TrigramStance;
}

const COLORS = {
  CYAN: 0x00ffd0,
  WHITE: 0xffffff,
  DARK_BLUE: 0x000a12,
  VITAL_ORANGE: 0xff7700,
  GRAY_MEDIUM: 0x666666,
} as const;

export function ProgressTracker({
  practiceCount,
  totalPractices,
  currentStance,
}: ProgressTrackerProps): JSX.Element {
  const completedStances = Object.values(practiceCount).filter(
    (count) => count >= 10
  ).length;
  const overallProgress = Math.round((completedStances / 8) * 100);

  return (
    <pixiContainer
      x={window.innerWidth - 250}
      y={200}
      data-testid="progress-tracker"
    >
      {/* Background panel */}
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();
          g.setFillStyle({ color: COLORS.DARK_BLUE, alpha: 0.8 });
          g.roundRect(-10, -10, 220, 150, 10);
          g.fill();

          g.setStrokeStyle({ color: COLORS.CYAN, width: 2, alpha: 0.6 });
          g.roundRect(-10, -10, 220, 150, 10);
          g.stroke();
        }}
        data-testid="progress-background"
      />

      {/* Title */}
      <pixiText
        text="수련 진행도"
        anchor={{ x: 0.5, y: 0.5 }}
        x={100}
        y={10}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 16,
          fill: COLORS.CYAN,
          fontWeight: "bold",
        }}
        data-testid="progress-title"
      />

      {/* Current stance */}
      <pixiText
        text={`현재 자세: ${currentStance.toUpperCase()}`}
        anchor={{ x: 0, y: 0.5 }}
        x={10}
        y={40}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 12,
          fill: COLORS.WHITE,
        }}
        data-testid="current-stance"
      />

      {/* Total practices */}
      <pixiText
        text={`총 연습: ${totalPractices}회`}
        anchor={{ x: 0, y: 0.5 }}
        x={10}
        y={60}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 12,
          fill: COLORS.WHITE,
        }}
        data-testid="total-practices"
      />

      {/* Overall progress */}
      <pixiText
        text={`전체 진행도: ${overallProgress}%`}
        anchor={{ x: 0, y: 0.5 }}
        x={10}
        y={80}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 12,
          fill: COLORS.VITAL_ORANGE,
          fontWeight: "bold",
        }}
        data-testid="progress-percentage"
      />

      {/* Mastery indicator */}
      <pixiText
        text={`숙련된 자세: ${completedStances}/8`}
        anchor={{ x: 0, y: 0.5 }}
        x={10}
        y={100}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 12,
          fill: COLORS.WHITE,
        }}
        data-testid="mastery-count"
      />

      {/* Progress bar */}
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();

          // Background bar
          g.setFillStyle({ color: COLORS.GRAY_MEDIUM, alpha: 0.3 });
          g.roundRect(10, 115, 180, 8, 4);
          g.fill();

          // Progress bar
          const progressWidth = (overallProgress / 100) * 180;
          g.setFillStyle({ color: COLORS.CYAN, alpha: 0.8 });
          g.roundRect(10, 115, progressWidth, 8, 4);
          g.fill();
        }}
        data-testid="progress-bar"
      />
    </pixiContainer>
  );
}
