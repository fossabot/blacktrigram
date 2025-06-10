import React, { useMemo } from "react";
import * as PIXI from "pixi.js";
import { BaseButton } from "../../ui/base/BaseButton";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import { CYBERPUNK_COLORS } from "../../../types/constants/colors";
import { KOREAN_TYPOGRAPHY } from "../../../types/constants/typography";

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
}) => {
  // Ensure PixiJS components are extended
  usePixiExtensions();

  const drawBackground = useMemo(
    () => (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(CYBERPUNK_COLORS.BG_DARK, 0.9);
      g.drawRect(0, 0, width, height);
      g.endFill();
    },
    [width, height]
  );

  const titleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: KOREAN_TYPOGRAPHY.FONTS.HEADING.join(", "),
        fontSize: KOREAN_TYPOGRAPHY.SIZES.HEADING,
        fontWeight: "bold",
        fill: CYBERPUNK_COLORS.TEXT_PRIMARY,
        wordWrap: true,
        wordWrapWidth: width - 100,
        lineHeight: 24,
      }),
    [width]
  );

  const contentStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: KOREAN_TYPOGRAPHY.FONTS.BODY.join(", "),
        fontSize: KOREAN_TYPOGRAPHY.SIZES.BODY,
        fontWeight: "normal",
        fill: CYBERPUNK_COLORS.TEXT_SECONDARY,
        wordWrap: true,
        wordWrapWidth: width - 100,
        lineHeight: 22,
      }),
    [width]
  );

  return (
    <pixiContainer x={0} y={0} data-testid="philosophy-section">
      <pixiGraphics draw={drawBackground} />

      {/* Philosophy content using pixiText components */}
      <pixiText
        text="흑괘의 철학 (Philosophy of Black Trigram)"
        style={titleStyle}
        x={width / 2}
        y={60}
        anchor={0.5}
      />

      <pixiText
        text="팔괘 (Eight Trigrams) represent the fundamental forces of nature and combat"
        style={contentStyle}
        x={50}
        y={150}
      />

      {/* Additional philosophy content */}
      <pixiContainer x={50} y={200}>
        {/* Trigram explanations using pixiText */}
        <pixiText
          text="☰ 건 (Geon) - Heaven: Direct bone-striking force"
          style={contentStyle}
          y={0}
        />
        <pixiText
          text="☱ 태 (Tae) - Lake: Fluid joint manipulation"
          style={contentStyle}
          y={40}
        />
        <pixiText
          text="☲ 리 (Li) - Fire: Precise nerve strikes"
          style={contentStyle}
          y={80}
        />
        <pixiText
          text="☳ 진 (Jin) - Thunder: Stunning techniques"
          style={contentStyle}
          y={120}
        />
      </pixiContainer>

      {/* Back button */}
      <BaseButton
        x={width - 150}
        y={height - 80}
        width={120}
        height={50}
        text="Back"
        koreanText="돌아가기"
        onClick={onBack}
        variant="secondary"
        testId="philosophy-back-button"
      />
    </pixiContainer>
  );
};

export default PhilosophySection;
