import React, { useMemo, useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { PhilosophySectionProps } from "../../../types";
import { PlayerArchetype } from "../../../types/enums"; // Add enum import
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES, // Fix: use FONT_SIZES instead of KOREAN_TEXT_SIZES
  FONT_WEIGHTS, // Fix: use FONT_WEIGHTS instead of KOREAN_FONT_WEIGHTS
  PLAYER_ARCHETYPES_DATA, // Fix: use proper import
  GAME_CONFIG,
} from "../../../types/constants";

// Define player archetypes order for display
const PLAYER_ARCHETYPES_ORDER: PlayerArchetype[] = [
  PlayerArchetype.MUSA, // Use enum
  PlayerArchetype.AMSALJA, // Use enum
  PlayerArchetype.HACKER, // Use enum
  PlayerArchetype.JEONGBO_YOWON, // Use enum
  PlayerArchetype.JOJIK_POKRYEOKBAE, // Use enum
];

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT * 0.6,
  x = 0,
  y = 0,
  ...props
}) => {
  const titleStyle = useMemo(
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

  const subtitleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium, // Fix: use FONT_SIZES
        fill: KOREAN_COLORS.TEXT_SECONDARY,
        fontWeight: FONT_WEIGHTS.medium.toString() as PIXI.TextStyleFontWeight, // Fix: use FONT_WEIGHTS
        align: "center",
      }),
    []
  );

  const descriptionStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.small, // Fix: use FONT_SIZES
        fill: KOREAN_COLORS.TEXT_SECONDARY,
        fontWeight: FONT_WEIGHTS.regular.toString() as PIXI.TextStyleFontWeight, // Fix: use FONT_WEIGHTS
        align: "left",
        wordWrap: true,
        wordWrapWidth: 300,
      }),
    []
  );

  const backgroundDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Decorative border
      g.lineStyle(2, KOREAN_COLORS.ACCENT_GOLD, 0.5);
      g.drawRoundedRect(20, 20, width - 40, height - 40, 10);
    },
    [width, height]
  );

  return (
    <Container x={x} y={y} width={width} height={height} {...props}>
      <Graphics draw={backgroundDraw} />

      {/* Main Title */}
      <Text
        text="흑괘의 철학 (Philosophy of Black Trigram)"
        style={titleStyle}
        x={width / 2}
        y={60}
        anchor={0.5}
      />

      {/* Player Archetypes */}
      <Container x={50} y={120}>
        {PLAYER_ARCHETYPES_ORDER.map(
          (archetype: PlayerArchetype, index: number) => {
            const data = PLAYER_ARCHETYPES_DATA[archetype]; // Fix: use PLAYER_ARCHETYPES_DATA
            const archetypeX = (index % 3) * 250;
            const archetypeY = Math.floor(index / 3) * 160;

            return (
              <Container key={archetype} x={archetypeX} y={archetypeY}>
                {/* Archetype background */}
                <Graphics
                  draw={(g: PIXI.Graphics) => {
                    g.clear();
                    const color =
                      data?.colors?.primary ||
                      KOREAN_COLORS.UI_BACKGROUND_MEDIUM;
                    g.beginFill(color, 0.2);
                    g.lineStyle(2, color, 0.6);
                    g.drawRoundedRect(0, 0, 220, 140, 8);
                    g.endFill();
                  }}
                />

                {/* Archetype name */}
                <Text
                  text={data?.name.korean || archetype}
                  style={{
                    ...subtitleStyle,
                    fontSize: FONT_SIZES.small, // Fix: use FONT_SIZES
                    fill: data?.colors?.primary || KOREAN_COLORS.TEXT_PRIMARY,
                  }}
                  x={110}
                  y={20}
                  anchor={0.5}
                />

                <Text
                  text={`(${data?.name.english || archetype})`}
                  style={{
                    ...descriptionStyle,
                    fontSize: FONT_SIZES.small, // Fix: use FONT_SIZES
                  }}
                  x={110}
                  y={40}
                  anchor={0.5}
                />

                {/* Description */}
                <Text
                  text={data?.description.korean || "전통 무술가"}
                  style={descriptionStyle}
                  x={10}
                  y={70}
                  anchor={0}
                />

                <Text
                  text={
                    data?.description.english || "Traditional martial artist"
                  }
                  style={{
                    ...descriptionStyle,
                    fill: KOREAN_COLORS.TEXT_SECONDARY,
                    fontSize: 10,
                  }}
                  x={10}
                  y={100}
                  anchor={0}
                />
              </Container>
            );
          }
        )}
      </Container>

      {/* Philosophy Text */}
      <Container x={50} y={height - 120}>
        <Text
          text="팔괘 철학: 음양의 조화와 전통 무술의 정신"
          style={{
            ...titleStyle,
            fontSize: FONT_SIZES.large, // Fix: use FONT_SIZES
          }}
          x={0}
          y={0}
        />

        <Text
          text="Eight Trigrams Philosophy: Harmony of Yin-Yang and Traditional Martial Spirit"
          style={descriptionStyle}
          x={0}
          y={30}
        />
      </Container>
    </Container>
  );
};

export default PhilosophySection;
