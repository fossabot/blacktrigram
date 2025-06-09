import React, { useEffect } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { GameUIProps } from "../../types/components";
import { KOREAN_COLORS, FONT_SIZES } from "../../types/constants";
import * as PIXI from "pixi.js";

export const GameUI: React.FC<GameUIProps> = ({
  gameState,
  onStateChange,
  x = 0,
  y = 0,
  width = 800,
  height = 600,
}) => {
  const backgroundDraw = (g: PIXI.Graphics) => {
    g.clear();
    g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
    g.drawRect(0, 0, width, height);
    g.endFill();
  };

  // Use onStateChange for future state management
  useEffect(() => {
    if (onStateChange && gameState) {
      onStateChange(gameState);
    }
  }, [gameState, onStateChange]);

  return (
    <Container x={x} y={y}>
      <Graphics draw={backgroundDraw} />
      <Text
        text="게임 UI (Game UI)"
        style={
          new PIXI.TextStyle({
            fontSize: FONT_SIZES.large,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
          })
        }
        x={20}
        y={20}
      />

      {gameState && (
        <Text
          text={`상태: ${JSON.stringify(gameState)}`}
          style={
            new PIXI.TextStyle({
              fontSize: FONT_SIZES.medium,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
            })
          }
          x={20}
          y={60}
        />
      )}
    </Container>
  );
};

export default GameUI;
