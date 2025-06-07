import React, { useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { PlayerVisualsProps, TrigramStance } from "../../types";
import {
  KOREAN_COLORS,
  TRIGRAM_DATA,
  FONT_FAMILY,
  FONT_SIZES,
} from "../../types/constants";

export const PlayerVisuals: React.FC<PlayerVisualsProps> = ({
  playerState,
  playerIndex,
  showVitalPoints = false,
  x = 0,
  y = 0,
  interactive = false,
  onPlayerClick,
  ...props
}) => {
  // Type-safe access to trigram data
  const currentStance = playerState.currentStance as TrigramStance;
  const stanceData = TRIGRAM_DATA[currentStance];

  const playerStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        align: "center",
      }),
    []
  );

  const drawPlayer = React.useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Simple player representation
      g.beginFill(KOREAN_COLORS.TEXT_PRIMARY, 0.8);
      g.drawRect(-20, -30, 40, 60);
      g.endFill();

      // Stance indicator
      if (stanceData) {
        g.beginFill(
          stanceData.theme?.primary || KOREAN_COLORS.ACCENT_PRIMARY,
          0.5
        );
        g.drawCircle(0, 0, 35);
        g.endFill();
      }
    },
    [stanceData]
  );

  return (
    <Container
      x={x}
      y={y}
      interactive={interactive}
      buttonMode={interactive}
      pointertap={onPlayerClick}
      {...props}
    >
      <Graphics draw={drawPlayer} />

      {/* Player name */}
      <Text
        text={playerState.name.korean}
        anchor={0.5}
        x={0}
        y={-50}
        style={playerStyle}
      />

      {/* Stance symbol */}
      <Text
        text={stanceData?.symbol || "?"}
        anchor={0.5}
        x={0}
        y={15}
        style={{
          ...playerStyle,
          fontSize: FONT_SIZES.large,
          fill: stanceData?.theme?.primary || KOREAN_COLORS.ACCENT_PRIMARY,
        }}
      />
    </Container>
  );
};

export default PlayerVisuals;
