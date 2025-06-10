import React, { useMemo } from "react";
import * as PIXI from "pixi.js";
import { BaseButton } from "../../ui/base/BaseButton";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import { CYBERPUNK_COLORS } from "../../../types/constants/colors";
import { KOREAN_TYPOGRAPHY } from "../../../types/constants/typography";

export interface ControlsSectionProps {
  readonly onBack: () => void;
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
}

export const ControlsSection: React.FC<ControlsSectionProps> = ({
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
      }),
    [width]
  );

  const controlStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: KOREAN_TYPOGRAPHY.FONTS.BODY.join(", "),
        fontSize: KOREAN_TYPOGRAPHY.SIZES.BODY,
        fontWeight: "normal",
        fill: CYBERPUNK_COLORS.TEXT_SECONDARY,
        wordWrap: true,
        wordWrapWidth: width - 100,
      }),
    [width]
  );

  return (
    <pixiContainer x={0} y={0} data-testid="controls-section">
      <pixiGraphics draw={drawBackground} />

      {/* Controls header */}
      <pixiText
        text="조작법 (Controls)"
        style={titleStyle}
        x={width / 2}
        y={60}
        anchor={0.5}
      />

      {/* Combat controls */}
      <pixiContainer x={50} y={150}>
        <pixiText
          text="전투 조작 (Combat Controls):"
          style={controlStyle}
          y={0}
        />
        <pixiText
          text="1-8: 팔괘 자세 선택 (Trigram Stance Selection)"
          style={controlStyle}
          y={40}
        />
        <pixiText
          text="SPACE: 기술 실행 (Execute Technique)"
          style={controlStyle}
          y={80}
        />
        <pixiText
          text="SHIFT: 방어 자세 (Defensive Guard)"
          style={controlStyle}
          y={120}
        />
        <pixiText
          text="CTRL: 급소 타격 모드 (Vital Point Targeting)"
          style={controlStyle}
          y={160}
        />
      </pixiContainer>

      {/* Movement controls */}
      <pixiContainer x={50} y={350}>
        <pixiText
          text="이동 조작 (Movement Controls):"
          style={controlStyle}
          y={0}
        />
        <pixiText
          text="WASD: 전술적 위치 이동 (Tactical Positioning)"
          style={controlStyle}
          y={40}
        />
        <pixiText
          text="화살표 키: 대체 이동 시스템 (Alternative Movement)"
          style={controlStyle}
          y={80}
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
        testId="controls-back-button"
      />
    </pixiContainer>
  );
};

export default ControlsSection;
