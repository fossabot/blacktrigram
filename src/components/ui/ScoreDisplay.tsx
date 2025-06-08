import React, { useMemo } from "react";
import { Container, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { PlayerState } from "../../types";
import { KOREAN_COLORS, FONT_FAMILY, FONT_SIZES } from "../../types/constants";

export interface ScoreDisplayProps {
  readonly player1: PlayerState;
  readonly player2: PlayerState;
  readonly matchStatistics?: {
    roundsWon: { player1: number; player2: number };
  };
  readonly x?: number;
  readonly y?: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  player1,
  player2,
  matchStatistics,
  x = 0,
  y = 0,
}) => {
  const scoreStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.xlarge,
        fill: KOREAN_COLORS.ACCENT_GOLD,
        fontWeight: "bold",
        align: "center",
        stroke: KOREAN_COLORS.BLACK_SOLID,
      }),
    []
  );

  const nameStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.KOREAN_BATTLE,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_SECONDARY,
        align: "center",
      }),
    []
  );

  return (
    <Container x={x} y={y}>
      <Text text="점수 (Score)" style={scoreStyle} anchor={0.5} y={0} />

      <Text
        text={`${matchStatistics?.roundsWon?.player1 || 0} - ${
          matchStatistics?.roundsWon?.player2 || 0
        }`} // Fix: Use matchStatistics
        style={scoreStyle}
        anchor={0.5}
        y={40}
      />

      <Text
        text={`${player1.name.korean} vs ${player2.name.korean}`}
        style={nameStyle}
        anchor={0.5}
        y={80}
      />
    </Container>
  );
};

export default ScoreDisplay;
