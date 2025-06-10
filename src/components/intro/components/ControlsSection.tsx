import React from "react";
import { KOREAN_COLORS } from "../../../types/constants";
import { COMBAT_CONTROLS } from "../../../types/constants/controls";

export interface ControlsSectionProps {
  readonly onBack: () => void;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
}

export const ControlsSection: React.FC<ControlsSectionProps> = ({
  onBack,
  x = 0,
  y = 0,
  width = 800,
  height = 600,
}) => {
  return (
    <pixiContainer x={x} y={y} data-testid="controls-section">
      {/* Background */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.95 });
          g.roundRect(0, 0, width, height, 12);
          g.fill();
          g.stroke({ width: 3, color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.8 });
          g.roundRect(0, 0, width, height, 12);
          g.stroke();
        }}
      />

      {/* Title */}
      <pixiText
        text="조작법 (Controls)"
        style={{
          fontSize: 32,
          fill: KOREAN_COLORS.ACCENT_GOLD,
          fontFamily: "Arial, sans-serif",
          align: "center",
          fontWeight: "bold",
        }}
        x={width / 2}
        y={40}
        anchor={0.5}
      />

      {/* Trigram Stances Section */}
      <pixiText
        text="팔괘 자세 (Trigram Stances)"
        style={{
          fontSize: 24,
          fill: KOREAN_COLORS.TEXT_PRIMARY,
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
        }}
        x={40}
        y={100}
      />

      {/* Stance Controls */}
      {Object.entries(COMBAT_CONTROLS.stanceControls).map(
        ([key, value], index) => (
          <pixiContainer key={key} x={40} y={140 + index * 30}>
            <pixiText
              text={`${key}: ${value.korean} (${value.technique})`}
              style={{
                fontSize: 16,
                fill: KOREAN_COLORS.TEXT_SECONDARY,
                fontFamily: "Arial, sans-serif",
              }}
            />
          </pixiContainer>
        )
      )}

      {/* Combat Controls Section */}
      <pixiText
        text="전투 조작 (Combat Controls)"
        style={{
          fontSize: 24,
          fill: KOREAN_COLORS.TEXT_PRIMARY,
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
        }}
        x={40}
        y={380}
      />

      {Object.entries(COMBAT_CONTROLS.combat).map(
        ([key, description], index) => (
          <pixiContainer key={key} x={40} y={420 + index * 30}>
            <pixiText
              text={`${key}: ${description}`}
              style={{
                fontSize: 16,
                fill: KOREAN_COLORS.TEXT_SECONDARY,
                fontFamily: "Arial, sans-serif",
              }}
            />
          </pixiContainer>
        )
      )}

      {/* Back Button */}
      <pixiContainer x={width - 150} y={height - 80}>
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.fill({ color: KOREAN_COLORS.ACCENT_RED, alpha: 0.8 });
            g.roundRect(0, 0, 120, 40, 5);
            g.fill();
          }}
          interactive={true}
          onPointerDown={onBack}
        />
        <pixiText
          text="돌아가기"
          style={{
            fontSize: 16,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            align: "center",
            fontWeight: "bold",
          }}
          x={60}
          y={20}
          anchor={0.5}
        />
      </pixiContainer>
    </pixiContainer>
  );
};

export default ControlsSection;
