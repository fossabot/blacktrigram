import React, { useMemo, useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import { usePixiExtensions } from "../../utils/pixiExtensions";
import { KOREAN_COLORS, PLAYER_ARCHETYPES_DATA } from "../../types/constants";
import type { PlayerState } from "../../types/player";

export interface ArchetypeDisplayProps {
  readonly player: PlayerState;
  readonly showDetails?: boolean;
  readonly compact?: boolean;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
}

export const ArchetypeDisplay: React.FC<ArchetypeDisplayProps> = ({
  player,
  showDetails = true,
  compact = false,
  x = 0,
  y = 0,
  width = 200,
  height = 120,
}) => {
  usePixiExtensions();

  const archetypeData = PLAYER_ARCHETYPES_DATA[player.archetype];

  const drawBackground = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(archetypeData.colors.primary, 0.2);
      g.lineStyle(2, archetypeData.colors.primary, 0.8);
      g.drawRoundedRect(0, 0, width, height, 10);
      g.endFill();
    },
    [archetypeData.colors.primary, width, height]
  );

  const titleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: compact ? 14 : 18,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: "bold",
      }),
    [compact]
  );

  const descriptionStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 12,
        fill: KOREAN_COLORS.TEXT_SECONDARY,
        wordWrap: true,
        wordWrapWidth: width - 20,
      }),
    [width]
  );

  return (
    <Container x={x} y={y} data-testid="archetype-display">
      <Graphics draw={drawBackground} />

      <Text text={archetypeData.name.korean} style={titleStyle} x={10} y={10} />

      {showDetails && (
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
