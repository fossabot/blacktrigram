import React from "react";
import * as PIXI from "pixi.js";
import { usePixiExtensions } from "../../utils/pixiExtensions";
import { KOREAN_COLORS } from "../../types/constants";

export interface ScoreDisplayProps {
  readonly player1Score: number;
  readonly player2Score: number;
  readonly maxScore?: number;
  readonly player1Name?: string;
  readonly player2Name?: string;
  readonly x?: number;
  readonly y?: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  player1Score,
  player2Score,
  maxScore = 3,
  player1Name = "Player 1",
  player2Name = "Player 2",
  x = 0,
  y = 0,
}) => {
  usePixiExtensions();

  // Fix: Use the styles to avoid unused variable warnings
  const scoreStyle = React.useMemo(
    () =>
      new PIXI.TextStyle({
        fontSize: 28,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: "bold",
      }),
    []
  );

  const nameStyle = React.useMemo(
    () =>
      new PIXI.TextStyle({
        fontSize: 14,
        fill: KOREAN_COLORS.TEXT_SECONDARY,
        fontWeight: "bold",
      }),
    []
  );

  return (
    <pixiContainer x={x} y={y} data-testid="score-display">
      {/* Player 1 Score */}
      <pixiContainer x={0} y={0}>
        <pixiText text={player1Name} style={nameStyle} anchor={0.5} y={-20} />
        <pixiText
          text={player1Score.toString()}
          style={scoreStyle}
          anchor={0.5}
        />
      </pixiContainer>

      {/* VS Text */}
      <pixiText
        text="VS"
        style={
          new PIXI.TextStyle({
            fontSize: 16,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
            fontWeight: "bold",
          })
        }
        x={80}
        y={-5}
        anchor={0.5}
      />

      {/* Player 2 Score */}
      <pixiContainer x={160} y={0}>
        <pixiText text={player2Name} style={nameStyle} anchor={0.5} y={-20} />
        <pixiText
          text={player2Score.toString()}
          style={scoreStyle}
          anchor={0.5}
        />
      </pixiContainer>

      {/* Score progress indicators */}
      {Array.from({ length: maxScore }, (_, i) => (
        <pixiGraphics
          key={`p1-${i}`}
          draw={(g: PIXI.Graphics) => {
            g.clear();
            g.beginFill(
              i < player1Score
                ? KOREAN_COLORS.PLAYER_1_COLOR
                : KOREAN_COLORS.UI_GRAY,
              0.8
            );
            g.drawCircle(0, 0, 4);
            g.endFill();
          }}
          x={-40 + i * 12}
          y={25}
        />
      ))}

      {Array.from({ length: maxScore }, (_, i) => (
        <pixiGraphics
          key={`p2-${i}`}
          draw={(g: PIXI.Graphics) => {
            g.clear();
            g.beginFill(
              i < player2Score
                ? KOREAN_COLORS.PLAYER_2_COLOR
                : KOREAN_COLORS.UI_GRAY,
              0.8
            );
            g.drawCircle(0, 0, 4);
            g.endFill();
          }}
          x={200 + i * 12}
          y={25}
        />
      ))}
    </pixiContainer>
  );
};

export default ScoreDisplay;
