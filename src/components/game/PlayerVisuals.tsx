import React, { useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { PlayerState } from "../../types";
import { TrigramStance } from "../../types/enums";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  TRIGRAM_DATA,
} from "../../types/constants";

export interface PlayerVisualsProps {
  readonly playerState: PlayerState;
  readonly playerIndex: number;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly showDetails?: boolean;
  readonly onPlayerClick?: (playerIndex: number) => void;
  readonly interactive?: boolean;
}

export const PlayerVisuals: React.FC<PlayerVisualsProps> = ({
  playerState,
  playerIndex,
  x = 0,
  y = 0,
  width = 100,
  height = 150,
  showDetails = true,
  onPlayerClick,
  interactive = true,
}) => {
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

  const handleClick = () => {
    onPlayerClick?.(playerIndex);
  };

  return (
    <Container
      x={x}
      y={y}
      interactive={interactive}
      buttonMode={interactive}
      pointertap={handleClick}
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
