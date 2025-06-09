import React, { useMemo } from "react";
import { Container, Text, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
import { BaseButton } from "../../ui/base/BaseButton";
import { KoreanHeader } from "../../ui/base/KoreanHeader";
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
  const backgroundDraw = useMemo(
    () => (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.9);
      g.drawRect(0, 0, width, height);
      g.endFill();
    },
    [width, height]
  );

  const textStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 16,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        wordWrap: true,
        wordWrapWidth: width - 100,
        lineHeight: 24,
      }),
    [width]
  );

  return (
    <Container x={x} y={y}>
      <Graphics draw={backgroundDraw} />

      {/* Header */}
      <KoreanHeader
        title={{
          korean: "철학",
          english: "Philosophy",
        }}
        subtitle={{
          korean: "흑괘 무술의 철학적 기반",
          english: "Philosophical Foundation of Black Trigram",
        }}
        x={width / 2}
        y={60}
        fontSize={24}
        align="center" // Fix: Use 'align' instead of 'alignment'
      />

      {/* Philosophy Content */}
      <Container x={50} y={140}>
        <Text
          text="팔괘의 철학 (Eight Trigrams Philosophy)"
          style={
            new PIXI.TextStyle({
              ...textStyle,
              fontSize: 20,
              fill: KOREAN_COLORS.ACCENT_GOLD,
              fontWeight: "bold",
            })
          }
          y={0}
        />

        <Text
          text="흑괘 무술은 고대 한국의 철학과 현대 사이버펑크 기술의 융합입니다.\n\n팔괘(八卦)는 천지만물의 변화를 나타내는 여덟 개의 기호로,\n각각 고유한 전투 스타일과 철학을 대표합니다.\n\n• 건(☰) - 하늘: 창조적 힘과 무한한 가능성\n• 태(☱) - 호수: 평온함과 유연한 적응\n• 리(☲) - 불: 밝음과 정확한 판단\n• 진(☳) - 천둥: 역동성과 순간적 행동"
          style={textStyle}
          y={40}
        />

        <Text
          text="Black Trigram martial arts represents the fusion of ancient Korean\nphilosophy with modern cyberpunk technology.\n\nThe Eight Trigrams (팔괘) are symbols representing the changes\nof all things in the universe, each embodying unique combat\nstyles and philosophical principles.\n\nThrough disciplined practice and understanding of these\nprinciples, practitioners achieve harmony between mind,\nbody, and spirit in the digital age."
          style={
            new PIXI.TextStyle({
              ...textStyle,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
            })
          }
          y={220}
        />
      </Container>

      {/* Back Button */}
      <BaseButton
        text="돌아가기 (Back)"
        onClick={onBack}
        x={50}
        y={height - 80}
        width={150}
        height={50}
        variant="secondary"
      />
    </Container>
  );
};

export default PhilosophySection;
