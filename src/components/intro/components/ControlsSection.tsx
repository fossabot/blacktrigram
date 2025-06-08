import React, { useMemo, useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { ControlsSectionProps } from "../../../types/components"; // Corrected import path
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  FONT_WEIGHTS,
  GAME_CONFIG,
  COMBAT_CONTROLS,
} from "../../../types/constants";

export const ControlsSection: React.FC<ControlsSectionProps> = ({
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT * 0.5,
  // No changes needed here if ControlsSectionProps in types/ui.ts is updated correctly.
  ...props
}) => {
  const titleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.large,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight,
        align: "center",
      }),
    []
  );

  const controlStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.MONO,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: FONT_WEIGHTS.regular.toString() as PIXI.TextStyleFontWeight,
        align: "left",
      }),
    []
  );

  const descriptionStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.small,
        fill: KOREAN_COLORS.TEXT_SECONDARY,
        fontWeight: FONT_WEIGHTS.regular.toString() as PIXI.TextStyleFontWeight,
        align: "left",
      }),
    []
  );

  const backgroundDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.9);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Section dividers
      g.lineStyle(1, KOREAN_COLORS.UI_BORDER, 0.3);
      g.moveTo(50, 80);
      g.lineTo(width - 50, 80);
    },
    [width, height]
  );

  return (
    <Container x={0} y={0} width={width} height={height} {...props}>
      <Graphics draw={backgroundDraw} />

      {/* Title */}
      <Text
        text="조작법 (Controls)"
        style={titleStyle}
        x={width / 2}
        y={40}
        anchor={0.5}
      />

      {/* Stance Controls */}
      <Container x={50} y={100}>
        <Text
          text="팔괘 자세 (Eight Trigram Stances)"
          style={titleStyle}
          x={0}
          y={0}
        />

        {Object.entries(COMBAT_CONTROLS.stanceControls).map(
          ([key, control], index) => (
            <Container key={key} y={40 + index * 25}>
              <Text text={`${key}:`} style={controlStyle} x={0} y={0} />
              <Text
                text={`${control.korean} (${control.stance})`}
                style={descriptionStyle}
                x={40}
                y={0}
              />
              <Text
                text={control.technique}
                style={{
                  ...descriptionStyle,
                  fill: KOREAN_COLORS.ACCENT_CYAN,
                }}
                x={200}
                y={0}
              />
            </Container>
          )
        )}
      </Container>

      {/* Combat Controls */}
      <Container x={width / 2} y={100}>
        <Text
          text="전투 조작 (Combat Controls)"
          style={titleStyle}
          x={0}
          y={0}
        />

        <Container y={40}>
          <Text text="SPACE:" style={controlStyle} x={0} y={0} />
          <Text
            text="기술 실행 (Execute Technique)"
            style={descriptionStyle}
            x={80}
            y={0}
          />

          <Text text="SHIFT:" style={controlStyle} x={0} y={25} />
          <Text
            text="방어 자세 (Guard)"
            style={descriptionStyle}
            x={80}
            y={25}
          />

          <Text text="CTRL:" style={controlStyle} x={0} y={50} />
          <Text
            text="급소 겨냥 (Target Vital Points)"
            style={descriptionStyle}
            x={80}
            y={50}
          />

          <Text text="TAB:" style={controlStyle} x={0} y={75} />
          <Text
            text="캐릭터 변경 (Change Archetype)"
            style={descriptionStyle}
            x={80}
            y={75}
          />
        </Container>
      </Container>

      {/* Movement Controls */}
      <Container x={50} y={height - 120}>
        <Text text="이동 (Movement)" style={titleStyle} x={0} y={0} />

        <Container y={30}>
          <Text text="WASD / Arrow Keys:" style={controlStyle} x={0} y={0} />
          <Text
            text="전술적 이동 및 발놀림 (Tactical Movement & Footwork)"
            style={descriptionStyle}
            x={200}
            y={0}
          />
        </Container>
      </Container>

      {/* System Controls */}
      <Container x={width / 2} y={height - 120}>
        <Text text="시스템 (System)" style={titleStyle} x={0} y={0} />

        <Container y={30}>
          <Text text="ESC:" style={controlStyle} x={0} y={0} />
          <Text
            text="일시정지 / 메뉴 (Pause / Menu)"
            style={descriptionStyle}
            x={60}
            y={0}
          />

          <Text text="F1:" style={controlStyle} x={0} y={25} />
          <Text text="도움말 (Help)" style={descriptionStyle} x={60} y={25} />

          <Text text="M:" style={controlStyle} x={0} y={50} />
          <Text text="음소거 (Mute)" style={descriptionStyle} x={60} y={50} />
        </Container>
      </Container>
    </Container>
  );
};

export default ControlsSection;
