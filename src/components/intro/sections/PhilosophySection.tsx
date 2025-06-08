import React, { useCallback, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { PhilosophySectionProps } from "../../../types/components";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  FONT_WEIGHTS,
  GAME_CONFIG,
  PLAYER_ARCHETYPES_DATA,
} from "../../../types/constants";
import { PlayerArchetype } from "../../../types/enums";

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
        fontSize: FONT_SIZES.title,
        fill: KOREAN_COLORS.ACCENT_GOLD,
        fontWeight: FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight,
        align: "center",
        stroke: KOREAN_COLORS.BLACK_SOLID,
        // strokeThickness: 2, // Remove: deprecated in PixiJS v7+
      }),
    []
  );

  const bodyStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
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
        fontSize: FONT_SIZES.large,
        fill: KOREAN_COLORS.PRIMARY_CYAN,
        fontWeight:
          FONT_WEIGHTS.semibold.toString() as PIXI.TextStyleFontWeight,
        align: "left",
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

  // Use onGamePhaseChange in a meaningful way or remove if not needed
  const handleBackClick = useCallback(() => {
    onBack?.();
    onGamePhaseChange?.("intro" as any); // Use both props to avoid warnings
  }, [onBack, onGamePhaseChange]);

  return (
    <Container width={width} height={height}>
      {/* Philosophy Content */}
      <Container x={50} y={200}>
        {PLAYER_ARCHETYPES_ORDER.map((archetype, index) => {
          const archetypeData = PLAYER_ARCHETYPES_DATA[archetype];
          return (
            <Container key={archetype} y={index * 60}>
              <Text
                text={`${archetypeData.name.korean} (${archetypeData.name.english})`}
                style={archetypeStyle}
                y={0}
              />
              <Text
                text={archetypeData.description.korean} // Fix: use description instead of philosophy
                style={bodyStyle}
                y={25}
              />
            </Container>
          );
        })}
      </Container>

      {/* Back Button */}
      {onBack && (
        <Container x={50} y={height - 80}>
          <Graphics
            draw={(g: PIXI.Graphics) => {
              g.clear()
                .lineStyle(2, KOREAN_COLORS.PRIMARY_CYAN)
                .beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8)
                .drawRoundedRect(0, 0, 120, 40, 5)
                .endFill();
            }}
            interactive={true}
            pointerdown={handleBackClick} // Use the combined handler
          />
          <Text
            text="뒤로 (Back)"
            x={60}
            y={20}
            anchor={0.5}
            style={archetypeStyle}
          />
        </Container>
      )}
    </Container>
  );
};

export default PhilosophySection;
