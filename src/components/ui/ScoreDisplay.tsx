import React from "react";
import { usePixiExtensions } from "../../utils/pixiExtensions";
import type { ScoreDisplayProps } from "../../types/components";
import { KOREAN_COLORS } from "../../types/constants";

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  player1Score,
  player2Score,
  maxScore = 3,
  x = 0,
  y = 0,
  width = 200,
  height = 60,
}) => {
  usePixiExtensions();

  return (
    <pixiContainer x={x} y={y} data-testid="score-display">
      {/* Background */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
          g.drawRoundedRect(0, 0, width, height, 5);
          g.endFill();
        }}
      />

      {/* Player 1 Score */}
      <pixiText
        text={`P1: ${player1Score}`}
        style={{
          fontSize: 16,
          fill: KOREAN_COLORS.PLAYER_1_COLOR,
          fontWeight: "bold",
        }}
        x={10}
        y={height / 2}
        anchor={{ x: 0, y: 0.5 }}
      />

      {/* VS Separator */}
      <pixiText
        text="VS"
        style={{
          fontSize: 14,
          fill: KOREAN_COLORS.TEXT_SECONDARY,
          fontWeight: "bold",
          align: "center",
        }}
        x={width / 2}
        y={height / 2}
        anchor={0.5}
      />

      {/* Player 2 Score */}
      <pixiText
        text={`P2: ${player2Score}`}
        style={{
          fontSize: 16,
          fill: KOREAN_COLORS.PLAYER_2_COLOR,
          fontWeight: "bold",
          align: "right",
        }}
        x={width - 10}
        y={height / 2}
        anchor={{ x: 1, y: 0.5 }}
      />

      {/* Score Progress Bars */}
      <pixiContainer y={35}>
        {/* Player 1 Progress */}
        {Array.from({ length: maxScore }, (_, i) => (
          <pixiGraphics
            key={`p1-${i}`}
            draw={(g) => {
              g.clear();
              const filled = i < player1Score;
              g.beginFill(
                filled ? KOREAN_COLORS.PLAYER_1_COLOR : KOREAN_COLORS.UI_GRAY,
                0.7
              );
              g.drawRoundedRect(10 + i * 15, 0, 12, 8, 2);
              g.endFill();
            }}
          />
        ))}

        {/* Player 2 Progress */}
        {Array.from({ length: maxScore }, (_, i) => (
          <pixiGraphics
            key={`p2-${i}`}
            draw={(g) => {
              g.clear();
              const filled = i < player2Score;
              g.beginFill(
                filled ? KOREAN_COLORS.PLAYER_2_COLOR : KOREAN_COLORS.UI_GRAY,
                0.7
              );
              g.drawRoundedRect(width - 22 - i * 15, 0, 12, 8, 2);
              g.endFill();
            }}
          />
        ))}
      </pixiContainer>
    </pixiContainer>
  );
};

export default ScoreDisplay;
