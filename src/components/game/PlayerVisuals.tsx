import React, { useCallback } from "react";
import * as PIXI from "pixi.js";
import { usePixiExtensions } from "../../utils/pixiExtensions";
import type { PlayerState } from "../../types/player";
import { KOREAN_COLORS } from "../../types/constants";

export interface PlayerVisualsProps {
  readonly playerState: PlayerState;
  readonly archetype: string;
  readonly width?: number;
  readonly height?: number;
}

export const PlayerVisuals: React.FC<PlayerVisualsProps> = ({
  playerState,
  archetype,
  width = 100,
  height = 150,
}) => {
  usePixiExtensions();

  const drawPlayer = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Player body based on archetype - use number type for fill
      let playerColor: number = KOREAN_COLORS.PLAYER_1_COLOR;
      switch (archetype) {
        case "무사 (Musa)":
          playerColor = 0xffd700; // Gold
          break;
        case "암살자 (Amsalja)":
          playerColor = 0x00ffff; // Cyan
          break;
        case "해커 (Hacker)":
          playerColor = 0x0066ff; // Blue
          break;
        case "정보요원 (Jeongbo Yowon)":
          playerColor = 0x9933ff; // Purple
          break;
        case "조직폭력배 (Jojik Pokryeokbae)":
          playerColor = 0xff3333; // Red
          break;
      }

      g.beginFill(playerColor, 0.8);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Health indicator
      const healthPercent = playerState.health / playerState.maxHealth;
      g.beginFill(KOREAN_COLORS.POSITIVE_GREEN, 0.7);
      g.drawRect(5, 5, (width - 10) * healthPercent, 10);
      g.endFill();

      // Stance indicator (trigram symbol)
      g.lineStyle(2, KOREAN_COLORS.PRIMARY_CYAN);
      g.drawCircle(width / 2, height - 20, 15);
      g.lineStyle(0);
    },
    [playerState.health, playerState.maxHealth, width, height, archetype]
  );

  return (
    <pixiContainer data-testid="player-visuals">
      <pixiGraphics draw={drawPlayer} />
      <pixiText
        text={`${archetype} - ${playerState.currentStance}`}
        style={
          new PIXI.TextStyle({
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            fontWeight: "bold",
          })
        }
        anchor={0.5}
        x={width / 2}
        y={-20}
      />
    </pixiContainer>
  );
};

export default PlayerVisuals;
