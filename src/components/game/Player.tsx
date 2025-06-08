// Complete Player component with Korean martial arts character rendering

import React, { useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { PlayerState } from "../../types";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  PLAYER_ARCHETYPES_DATA,
} from "../../types/constants";

export interface PlayerProps {
  readonly playerState: PlayerState;
  readonly x?: number;
  readonly y?: number;
  readonly showStats?: boolean;
  readonly interactive?: boolean;
  readonly onClick?: () => void;
}

export const Player: React.FC<PlayerProps> = ({
  playerState,
  x = 0,
  y = 0,
  showStats = true,
  interactive = false,
  onClick,
}) => {
  const playerDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      const archetype = playerState.archetype;
      const archetypeData = PLAYER_ARCHETYPES_DATA[archetype];
      const primaryColor =
        archetypeData?.colors?.primary || KOREAN_COLORS.UI_GRAY; // Fix: use colors property

      // Draw player body
      g.beginFill(primaryColor, 0.8);
      g.lineStyle(2, KOREAN_COLORS.WHITE_SOLID, 1);
      g.drawRect(-25, -50, 50, 100);
      g.endFill();

      // Health indicator
      const healthPercent = playerState.health / playerState.maxHealth;
      g.beginFill(
        healthPercent > 0.5
          ? KOREAN_COLORS.POSITIVE_GREEN
          : KOREAN_COLORS.WARNING_ORANGE,
        0.8
      );
      g.drawRect(-30, -60, 60 * healthPercent, 5);
      g.endFill();

      if (showStats) {
        // Ki meter background
        g.beginFill(KOREAN_COLORS.SECONDARY_BLUE_DARK, 0.3); // Fix: use existing color
        g.drawRect(-30, 15, 60, 8);
        g.endFill();

        // Ki meter fill
        const kiPercent = playerState.ki / playerState.maxKi;
        g.beginFill(KOREAN_COLORS.PRIMARY_CYAN, 0.8);
        g.drawRect(-30, 15, 60 * kiPercent, 8);
        g.endFill();

        // Stamina meter background
        g.beginFill(KOREAN_COLORS.SECONDARY_YELLOW, 0.3); // Fix: use existing color
        g.drawRect(-30, 25, 60, 8);
        g.endFill();

        // Stamina meter fill
        const staminaPercent = playerState.stamina / playerState.maxStamina;
        g.beginFill(KOREAN_COLORS.SECONDARY_YELLOW, 0.8);
        g.drawRect(-30, 25, 60 * staminaPercent, 8);
        g.endFill();
      }
    },
    [playerState, showStats]
  );

  return (
    <Container
      x={x}
      y={y}
      interactive={interactive}
      buttonMode={interactive}
      pointertap={onClick}
    >
      <Graphics draw={playerDraw} />

      {showStats && (
        <Text
          text={playerState.name.korean}
          style={
            new PIXI.TextStyle({
              fontFamily: FONT_FAMILY.PRIMARY,
              fontSize: FONT_SIZES.small,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              align: "center",
            })
          }
          anchor={0.5}
          x={0}
          y={-80}
        />
      )}
    </Container>
  );
};

export default Player;
