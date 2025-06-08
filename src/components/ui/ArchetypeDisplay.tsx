import React, { useMemo, useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { PlayerArchetype } from "../../types";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  PLAYER_ARCHETYPES_DATA,
} from "../../types/constants";

export interface ArchetypeDisplayProps {
  readonly archetype: PlayerArchetype;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly showDescription?: boolean;
}

export const ArchetypeDisplay: React.FC<ArchetypeDisplayProps> = ({
  archetype,
  x = 0,
  y = 0,
  width = 250,
  height = 80,
  showDescription = true,
}) => {
  const archetypeData = PLAYER_ARCHETYPES_DATA[archetype];

  const backgroundDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Background with archetype colors
      const primaryColor =
        archetypeData?.colors?.primary || KOREAN_COLORS.UI_BACKGROUND_MEDIUM;
      g.beginFill(primaryColor, 0.2);
      g.lineStyle(2, primaryColor, 0.8);
      g.drawRoundedRect(0, 0, width, height, 8);
      g.endFill();
    },
    [width, height, archetypeData]
  );

  const titleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: archetypeData?.colors?.primary || KOREAN_COLORS.TEXT_PRIMARY,
        align: "left",
        fontWeight: "bold",
      }),
    [archetypeData]
  );

  const descriptionStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.small,
        fill: KOREAN_COLORS.TEXT_SECONDARY,
        align: "left",
        wordWrap: true,
        wordWrapWidth: width - 20,
      }),
    [width]
  );

  return (
    <Container x={x} y={y}>
      <Graphics draw={backgroundDraw} />

      <Text
        text={`${archetypeData?.name.korean || archetype} (${
          archetypeData?.name.english || archetype
        })`}
        style={titleStyle}
        x={10}
        y={10}
      />

      {showDescription && archetypeData?.description && (
        <Text
          text={archetypeData.description.korean}
          style={descriptionStyle}
          x={10}
          y={35}
        />
      )}
    </Container>
  );
};

export default ArchetypeDisplay;
