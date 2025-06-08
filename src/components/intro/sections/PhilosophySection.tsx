import React, { useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import { PlayerArchetype, GamePhase } from "../../../types/enums";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  FONT_WEIGHTS,
  GAME_CONFIG,
  PLAYER_ARCHETYPES_DATA,
} from "../../../types/constants";

interface PhilosophySectionProps {
  readonly width?: number;
  readonly height?: number;
  readonly onBack?: () => void;
  readonly onGamePhaseChange?: (phase: GamePhase) => void;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
  onBack,
  onGamePhaseChange,
}) => {
  const headerStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.xlarge,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight,
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
        fontWeight: FONT_WEIGHTS.regular.toString() as PIXI.TextStyleFontWeight,
        align: "left",
        wordWrap: true,
        wordWrapWidth: width - 100,
      }),
    [width]
  );

  const archetypeStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.ACCENT_CYAN,
        fontWeight: FONT_WEIGHTS.medium.toString() as PIXI.TextStyleFontWeight,
        align: "left",
      }),
    []
  );

  const buttonStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: FONT_WEIGHTS.medium.toString() as PIXI.TextStyleFontWeight,
        align: "center",
      }),
    []
  );

  const PLAYER_ARCHETYPES_ORDER: PlayerArchetype[] = [
    PlayerArchetype.MUSA,
    PlayerArchetype.AMSALJA,
    PlayerArchetype.HACKER,
    PlayerArchetype.JEONGBO_YOWON,
    PlayerArchetype.JOJIK_POKRYEOKBAE,
  ];

  return (
    <Container width={width} height={height}>
      {/* Background */}
      <Graphics
        draw={(g: PIXI.Graphics) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.95);
          g.drawRect(0, 0, width, height);
          g.endFill();
        }}
      />

      {/* Header */}
      <Text
        text="흑괘의 철학 (Philosophy of Black Trigram)"
        anchor={0.5}
        x={width / 2}
        y={50}
        style={headerStyle}
      />

      {/* Philosophy Text */}
      <Container x={50} y={100}>
        <Text
          text="한국 무술의 정신과 현대 기술의 융합\nThe fusion of Korean martial arts spirit and modern technology\n\n팔괘(八卦)는 우주의 원리를 나타내며, 각 자세는 독특한 전투 스타일을 제공합니다.\nThe Eight Trigrams represent universal principles, each stance offering unique combat styles.\n\n다섯 원형은 서로 다른 전투 철학을 구현합니다:\nFive archetypes embody different combat philosophies:"
          style={bodyStyle}
          y={0}
        />

        {/* Archetypes */}
        <Container y={180}>
          {PLAYER_ARCHETYPES_ORDER.map((archetype, index) => {
            const data = PLAYER_ARCHETYPES_DATA[archetype];
            return (
              <Container key={archetype} y={index * 60}>
                <Text
                  text={`${data.name.korean} (${data.name.english})`}
                  style={archetypeStyle}
                  y={0}
                />
                <Text
                  text={`${data.description.korean}\n${data.description.english}`}
                  style={bodyStyle}
                  y={25}
                />
              </Container>
            );
          })}
        </Container>

        {/* Combat Button */}
        <Container
          x={(width - 200) / 2 - 50}
          y={500}
          interactive
          buttonMode
          pointertap={() => onGamePhaseChange?.(GamePhase.COMBAT)}
        >
          <Graphics
            draw={(g: PIXI.Graphics) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.ACCENT_RED, 0.8);
              g.lineStyle(2, KOREAN_COLORS.ACCENT_ORANGE);
              g.drawRoundedRect(0, 0, 200, 50, 10);
              g.endFill();
            }}
          />
          <Text
            text="전투 시작 (Start Combat)"
            anchor={0.5}
            x={100}
            y={25}
            style={buttonStyle}
          />
        </Container>
      </Container>

      {/* Back Button */}
      <Container
        x={50}
        y={height - 80}
        interactive
        buttonMode
        pointertap={onBack}
      >
        <Graphics
          draw={(g: PIXI.Graphics) => {
            g.clear();
            g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
            g.lineStyle(2, KOREAN_COLORS.UI_BORDER);
            g.drawRoundedRect(0, 0, 120, 40, 8);
            g.endFill();
          }}
        />
        <Text
          text="뒤로 (Back)"
          anchor={0.5}
          x={60}
          y={20}
          style={buttonStyle}
        />
      </Container>
    </Container>
  );
};

export default PhilosophySection;
