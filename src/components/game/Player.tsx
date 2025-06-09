// Complete Player component with Korean martial arts character rendering

import React, { useMemo, useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { PlayerState } from "../../types";
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
  showStats = false, // Fix: Add showStats with default
  x = 0,
  y = 0,
  onClick,
  interactive = false,
  width = 100,
  height = 150,
}) => {
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

  const drawHealthBars = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Health bar
      const healthPercent = playerState.health / playerState.maxHealth;
      g.beginFill(KOREAN_COLORS.NEGATIVE_RED, 0.3);
      g.drawRect(0, -30, width, 8);
      g.endFill();
      g.beginFill(KOREAN_COLORS.POSITIVE_GREEN);
      g.drawRect(0, -30, width * healthPercent, 8);
      g.endFill();

      // Ki bar
      const kiPercent = playerState.ki / playerState.maxKi;
      g.beginFill(KOREAN_COLORS.PRIMARY_CYAN, 0.3);
      g.drawRect(0, -20, width, 6);
      g.endFill();
      g.beginFill(KOREAN_COLORS.PRIMARY_CYAN);
      g.drawRect(0, -20, width * kiPercent, 6);
      g.endFill();

      // Stamina bar
      const staminaPercent = playerState.stamina / playerState.maxStamina;
      g.beginFill(KOREAN_COLORS.SECONDARY_YELLOW, 0.3);
      g.drawRect(0, -10, width, 6);
      g.endFill();
      g.beginFill(KOREAN_COLORS.SECONDARY_YELLOW);
      g.drawRect(0, -10, width * staminaPercent, 6);
      g.endFill();
    },
    [playerState, width]
  );

  const displayName =
    typeof playerState.name === "string"
      ? playerState.name
      : playerState.name.korean;

  return (
    <Container
      x={x}
      y={y}
      interactive={interactive}
      buttonMode={interactive}
      pointertap={onClick}
    >
      <Graphics draw={playerDraw} />

      {/* Fix: Use showStats prop */}
      {showStats && <Graphics draw={drawHealthBars} />}

      <Text
        text={displayName}
        style={
          new PIXI.TextStyle({
            fontSize: FONT_SIZES.small,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
          })
        }
        x={5}
        y={height + 5}
      />

      {/* Fix: Use showStats prop for detailed stats */}
      {showStats && (
        <Container x={width + 10} y={0}>
          <Text
            text={`자세: ${playerState.currentStance}`}
            style={
              new PIXI.TextStyle({
                fontSize: FONT_SIZES.tiny,
                fill: KOREAN_COLORS.TEXT_SECONDARY,
              })
            }
            y={0}
          />
          <Text
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
          <Text
            text={`기: ${Math.round(playerState.ki)}/${playerState.maxKi}`}
            style={
              new PIXI.TextStyle({
                fontSize: FONT_SIZES.tiny,
                fill: KOREAN_COLORS.TEXT_SECONDARY,
              })
            }
            y={24}
          />
        </Container>
      )}
    </Container>
  );
};

export default Player;
