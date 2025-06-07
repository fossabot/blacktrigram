import React, { useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { BaseUIComponentProps, PlayerArchetype } from "../../types";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  PLAYER_ARCHETYPES_DATA,
} from "../../types/constants";

interface ArchetypeDisplayProps extends BaseUIComponentProps {
  readonly archetype: PlayerArchetype;
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
  readonly showDescription?: boolean;
  readonly interactive?: boolean;
  readonly onArchetypeSelect?: (archetype: PlayerArchetype) => void;
}

export const ArchetypeDisplay: React.FC<ArchetypeDisplayProps> = ({
  archetype,
  width = 200,
  height = 100,
  x = 0,
  y = 0,
  showDescription = true,
  interactive = false,
  onArchetypeSelect,
  ...props
}) => {
  const archetypeData = PLAYER_ARCHETYPES_DATA[archetype];

  const titleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        align: "center",
        fontWeight: "bold",
      }),
    []
  );

  const descriptionStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.small,
        fill: KOREAN_COLORS.TEXT_SECONDARY,
        align: "center",
        wordWrap: true,
        wordWrapWidth: width - 20,
      }),
    [width]
  );

  const drawBackground = (g: PIXI.Graphics) => {
    g.clear();

    const primaryColor =
      archetypeData?.colors.primary || KOREAN_COLORS.UI_BACKGROUND_MEDIUM;
    const secondaryColor =
      archetypeData?.colors.secondary || KOREAN_COLORS.UI_BORDER;

    g.beginFill(primaryColor, 0.1);
    g.lineStyle(2, secondaryColor, 0.8);
    g.drawRoundedRect(0, 0, width, height, 10);
    g.endFill();
  };

  const handleClick = () => {
    if (interactive && onArchetypeSelect) {
      onArchetypeSelect(archetype);
    }
  };

  return (
    <Container
      x={x}
      y={y}
      interactive={interactive}
      buttonMode={interactive}
      pointertap={handleClick}
      {...props}
    >
      <Graphics draw={drawBackground} />

      <Text
        text={`${archetypeData?.name.korean} (${archetypeData?.name.english})`}
        anchor={0.5}
        x={width / 2}
        y={20}
        style={titleStyle}
      />

      {showDescription && (
        <Text
          text={archetypeData?.description.korean || ""}
          anchor={0.5}
          x={width / 2}
          y={50}
          style={descriptionStyle}
        />
      )}
    </Container>
  );
};

export default ArchetypeDisplay;
