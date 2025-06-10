// Complete Player component with Korean martial arts character rendering

import React from "react";
import * as PIXI from "pixi.js";
import { usePixiExtensions } from "../../utils/pixiExtensions";
import { KOREAN_COLORS, PLAYER_ARCHETYPES_DATA } from "../../types/constants";
import type { PlayerState } from "../../types/player";

export interface PlayerProps {
  readonly playerState: PlayerState;
  readonly playerIndex: number;
  readonly x?: number;
  readonly y?: number;
  readonly onClick?: () => void;
  readonly interactive?: boolean; // Fix: Add missing prop
}

export const Player: React.FC<PlayerProps> = ({
  playerState,
  playerIndex,
  x = 0,
  y = 0,
  onClick,
  interactive = false, // Fix: Add default value
}) => {
  usePixiExtensions();

  const archetypeData = PLAYER_ARCHETYPES_DATA[playerState.archetype];
  const healthPercent = playerState.health / playerState.maxHealth;

  const drawPlayer = React.useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Player body
      g.beginFill(archetypeData.colors.primary, 0.8);
      g.drawCircle(0, 0, 30);
      g.endFill();

      // Health indicator
      g.beginFill(
        healthPercent > 0.5
          ? KOREAN_COLORS.POSITIVE_GREEN
          : healthPercent > 0.25
          ? KOREAN_COLORS.WARNING_ORANGE
          : KOREAN_COLORS.NEGATIVE_RED
      );
      g.drawRect(-35, -50, 70 * healthPercent, 5);
      g.endFill();

      // Stance indicator
      g.lineStyle(2, archetypeData.colors.secondary);
      g.drawCircle(0, 0, 35);
    },
    [archetypeData, healthPercent]
  );

  return (
    <pixiContainer
      x={x}
      y={y}
      interactive={interactive} // Fix: Use the prop
      onPointerDown={onClick}
      data-testid={`player-${playerIndex}`}
    >
      <pixiGraphics draw={drawPlayer} />

      <pixiText
        text={playerState.name.korean}
        style={
          new PIXI.TextStyle({
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            align: "center",
          })
        }
        anchor={0.5}
        y={-60}
      />

      <pixiText
        text={playerState.currentStance}
        style={
          new PIXI.TextStyle({
            fontSize: 10,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
            align: "center",
          })
        }
        anchor={0.5}
        y={45}
      />
    </pixiContainer>
  );
};

export default Player;
