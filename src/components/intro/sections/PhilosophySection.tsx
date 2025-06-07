import React, { useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { PhilosophySectionProps } from "../../../types";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  KOREAN_FONT_WEIGHTS,
} from "../../../types/constants";

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({
  onGamePhaseChange,
  onBackToMenu,
  selectedArchetype,
  onArchetypeSelect,
  x = 0,
  y = 0,
  width = 800,
  height = 600,
  ...props
}) => {
  const titleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.xlarge,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight:
          KOREAN_FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight,
        align: "center",
      }),
    []
  );

  const headerStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.large,
        fill: KOREAN_COLORS.ACCENT_PRIMARY,
        fontWeight:
          KOREAN_FONT_WEIGHTS.medium.toString() as PIXI.TextStyleFontWeight,
        align: "center",
      }),
    []
  );

  const bodyStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_SECONDARY,
        fontWeight:
          KOREAN_FONT_WEIGHTS.regular.toString() as PIXI.TextStyleFontWeight,
        wordWrap: true,
        wordWrapWidth: width - 40,
      }),
    [width]
  );

  const drawBackground = (g: PIXI.Graphics) => {
    g.clear();
    g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.9);
    g.drawRect(0, 0, width, height);
    g.endFill();
  };

  return (
    <Container x={x} y={y} width={width} height={height} {...props}>
      <Graphics draw={drawBackground} />

      <Text
        text="흑괘의 철학 (Philosophy of Black Trigram)"
        anchor={0.5}
        x={width / 2}
        y={30}
        style={titleStyle}
      />

      <Text
        text="한국 전통 무예와 현대 사이버펑크의 만남"
        anchor={0.5}
        x={width / 2}
        y={80}
        style={headerStyle}
      />

      <Text
        text="흑괘는 음양오행과 팔괘의 원리를 바탕으로 한 정밀한 전투 시뮬레이터입니다. 70개의 급소를 활용한 해부학적으로 정확한 타격과 한국 전통 무예의 진정성을 추구합니다."
        x={40}
        y={120}
        style={bodyStyle}
      />

      {/* Philosophy content sections */}
      <Container y={200}>
        <Text
          text="팔괘 시스템 (Eight Trigram System)"
          x={40}
          y={0}
          style={headerStyle}
        />

        <Text
          text="건(☰), 태(☱), 리(☲), 진(☳), 손(☴), 감(☵), 간(☶), 곤(☷)"
          x={40}
          y={30}
          style={bodyStyle}
        />

        <Text
          text="각 괘는 고유한 무예 철학과 전투 기법을 대표합니다."
          x={40}
          y={60}
          style={bodyStyle}
        />
      </Container>

      {/* Back Button */}
      {onBackToMenu && (
        <Container
          x={width - 120}
          y={height - 60}
          interactive={true}
          buttonMode={true}
          pointertap={onBackToMenu}
        >
          <Graphics
            draw={(g: PIXI.Graphics) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
              g.lineStyle(2, KOREAN_COLORS.UI_BORDER);
              g.drawRoundedRect(0, 0, 100, 40, 5);
              g.endFill();
            }}
          />
          <Text
            text="뒤로 (Back)"
            anchor={0.5}
            x={50}
            y={20}
            style={bodyStyle}
          />
        </Container>
      )}
    </Container>
  );
};

export default PhilosophySection;
