import React from "react";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import type { ControlsSectionProps } from "../../../types/components";
import { KOREAN_COLORS, COMBAT_CONTROLS } from "../../../types/constants";

export const ControlsSection: React.FC<ControlsSectionProps> = ({
  onBack,
  width = 800,
  height = 600,
  x = 0,
  y = 0,
}) => {
  usePixiExtensions();

  return (
    <pixiContainer x={x} y={y} data-testid="controls-section">
      {/* Background */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.9);
          g.drawRect(0, 0, width, height);
          g.endFill();
        }}
      />

      {/* Title */}
      <pixiText
        text="조작법 - Controls"
        style={{
          fontSize: 24,
          fill: KOREAN_COLORS.ACCENT_GOLD,
          fontWeight: "bold",
          align: "center",
        }}
        x={width / 2}
        y={60}
        anchor={0.5}
      />

      {/* Controls Content */}
      <pixiContainer x={50} y={120}>
        <pixiText
          text="팔괘 자세 (Trigram Stances):"
          style={{
            fontSize: 16,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            fontWeight: "bold",
          }}
          y={0}
        />

        {Object.entries(COMBAT_CONTROLS.stanceControls).map(
          ([key, control], index) => (
            <pixiText
              key={key}
              text={`${key}: ${control.korean} (${control.technique})`}
              style={{
                fontSize: 12,
                fill: KOREAN_COLORS.TEXT_SECONDARY,
              }}
              y={30 + index * 20}
            />
          )
        )}

        <pixiText
          text="전투 조작 (Combat Controls):"
          style={{
            fontSize: 16,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            fontWeight: "bold",
          }}
          y={220}
        />

        <pixiText
          text="SPACE: 기술 실행 (Execute Technique)"
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          }}
          y={250}
        />

        <pixiText
          text="SHIFT: 방어 자세 (Defensive Guard)"
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          }}
          y={270}
        />

        <pixiText
          text="CTRL: 급소 조준 (Vital Point Targeting)"
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          }}
          y={290}
        />
      </pixiContainer>

      {/* Back Button */}
      <pixiContainer x={50} y={height - 80}>
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
            g.drawRoundedRect(0, 0, 100, 40, 5);
            g.endFill();
          }}
          interactive={true}
          onPointerDown={onBack}
        />
        <pixiText
          text="돌아가기"
          style={{
            fontSize: 14,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            align: "center",
          }}
          x={50}
          y={20}
          anchor={0.5}
        />
      </pixiContainer>
    </pixiContainer>
  );
};

export type { ControlsSectionProps } from "../../../types/components";

export default ControlsSection;
