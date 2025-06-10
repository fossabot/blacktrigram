import React from "react";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import { KOREAN_COLORS } from "../../../types/constants";

export interface PhilosophySectionProps {
  readonly onBack: () => void;
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({
  onBack,
  width = 800,
  height = 600,
  x = 0,
  y = 0,
}) => {
  usePixiExtensions();

  return (
    <pixiContainer x={x} y={y} data-testid="philosophy-section">
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
        text="흑괘의 철학 - Philosophy of Black Trigram"
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

      {/* Philosophy Content */}
      <pixiContainer x={50} y={120}>
        <pixiText
          text="팔괘 (八卦) - Eight Trigrams"
          style={{
            fontSize: 18,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            fontWeight: "bold",
          }}
          y={0}
        />

        <pixiText
          text="한국 무술은 자연의 힘과 조화를 이루는 예술입니다."
          style={{
            fontSize: 14,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          }}
          y={30}
        />

        <pixiText
          text="Korean martial arts are the art of harmonizing with nature's forces."
          style={{
            fontSize: 14,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          }}
          y={50}
        />

        <pixiText
          text="• ☰ 건 (Geon) - Heaven: Direct striking force"
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          }}
          y={90}
        />

        <pixiText
          text="• ☱ 태 (Tae) - Lake: Fluid joint manipulation"
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          }}
          y={110}
        />

        <pixiText
          text="• ☲ 리 (Li) - Fire: Precise nerve strikes"
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          }}
          y={130}
        />

        <pixiText
          text="• ☳ 진 (Jin) - Thunder: Stunning techniques"
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          }}
          y={150}
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

export default PhilosophySection;
