// Complete Player component with Korean martial arts character rendering

import React, { useMemo } from "react";
import * as PIXI from "pixi.js";
import type { PlayerState } from "../../types";
import { usePixiExtensions } from "../../utils/pixiExtensions";
import { KOREAN_COLORS, FONT_SIZES } from "../../types/constants";

export interface PlayerProps {
  readonly playerState: PlayerState;
  readonly playerIndex: number;
  readonly showStats?: boolean; // Fix: Add missing showStats prop
  readonly x?: number;
  readonly y?: number;
  readonly onClick?: () => void;
  readonly interactive?: boolean;
  readonly width?: number;
  readonly height?: number;
}

export const Player: React.FC<PlayerProps> = ({
  playerState,
  playerIndex,
  showStats = false,
  x = 0,
  y = 0,
  onClick,
  width = 100,
  height = 150,
}) => {
  // Ensure PixiJS components are extended
  usePixiExtensions();

  const playerColor = useMemo(() => {
    return playerIndex === 0
      ? KOREAN_COLORS.PLAYER_1_COLOR
      : KOREAN_COLORS.PLAYER_2_COLOR;
  }, [playerIndex]);

  const playerDraw = useMemo(
    () => (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(playerColor, 0.8);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Health indicator
      const healthPercent = playerState.health / playerState.maxHealth;
      g.beginFill(KOREAN_COLORS.POSITIVE_GREEN, 0.7);
      g.drawRect(5, 5, (width - 10) * healthPercent, 10);
      g.endFill();

      // Stance indicator
      g.lineStyle(2, KOREAN_COLORS.PRIMARY_CYAN);
      g.drawCircle(width / 2, height - 20, 15);
      g.lineStyle(0);
    },
    [playerColor, playerState.health, playerState.maxHealth, width, height]
  );

  return (
    <pixiContainer
      x={x}
      y={y}
      interactive={true}
      onPointerDown={onClick}
      data-testid="game-player"
    >
      <pixiGraphics draw={playerDraw} />

      {/* Player stance indicator */}
      <pixiText
        text={`${playerState.archetype} - ${playerState.currentStance}`}
        style={
          new PIXI.TextStyle({
            fontSize: FONT_SIZES.small,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
          })
        }
        x={0}
        y={-30}
        anchor={0.5}
      />

      {/* Health display */}
      <pixiText
        text={`체력: ${playerState.health}/${playerState.maxHealth}`}
        style={
          new PIXI.TextStyle({
            fontSize: FONT_SIZES.tiny,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          })
        }
        x={0}
        y={100}
        anchor={0.5}
      />

      {/* Fix: Use showStats prop for detailed stats */}
      {showStats && (
        <pixiContainer x={width + 10} y={0}>
          <pixiText
            text={`자세: ${playerState.currentStance}`}
            style={
              new PIXI.TextStyle({
                fontSize: FONT_SIZES.tiny,
                fill: KOREAN_COLORS.TEXT_SECONDARY,
              })
            }
            y={0}
          />
          <pixiText
            text={`체력: ${Math.round(playerState.health)}/${
              playerState.maxHealth
            }`}
            style={
              new PIXI.TextStyle({
                fontSize: FONT_SIZES.tiny,
                fill: KOREAN_COLORS.TEXT_SECONDARY,
              })
            }
            y={12}
          />
          <pixiText
            text={`기: ${Math.round(playerState.ki)}/${playerState.maxKi}`}
            style={
              new PIXI.TextStyle({
                fontSize: FONT_SIZES.tiny,
                fill: KOREAN_COLORS.TEXT_SECONDARY,
              })
            }
            y={24}
          />
        </pixiContainer>
      )}
    </pixiContainer>
  );
};

export default Player;
