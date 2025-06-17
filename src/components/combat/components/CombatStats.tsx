import React, { useCallback, useMemo } from "react";
import { extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import type { PlayerState } from "../../../types/player";
import { KOREAN_COLORS } from "../../../types/constants";
import * as PIXI from "pixi.js";

extend({ Container, Graphics, Text });

export interface CombatStatsProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly combatLog: readonly string[];
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
}

const calculateAccuracy = (player: PlayerState): number => {
  const totalAttempts = (player.hitsLanded || 0) + (player.hitsTaken || 0);
  if (totalAttempts === 0) return 0;
  return Math.round(((player.hitsLanded || 0) / totalAttempts) * 100);
};

export const CombatStats: React.FC<CombatStatsProps> = ({
  players,
  combatLog,
  x = 0,
  y = 0,
  width = 300,
  height = 160,
}) => {
  usePixiExtensions();

  const [player1, player2] = players;

  const drawBackground = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.9 });
      g.roundRect(0, 0, width, height, 8);
      g.fill();

      g.stroke({ width: 2, color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.6 });
      g.roundRect(0, 0, width, height, 8);
      g.stroke();
    },
    [width, height]
  );

  const visibleLog = useMemo(() => combatLog.slice(-5), [combatLog]);

  return (
    <pixiContainer x={x} y={y} data-testid="combat-stats">
      <pixiGraphics draw={drawBackground} />

      {/* Combat log */}
      <pixiContainer x={10} y={10}>
        <pixiText
          text="전투 기록"
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.ACCENT_GOLD,
            fontWeight: "bold",
          }}
        />

        {visibleLog.map((entry, index) => (
          <pixiText
            key={index}
            text={entry}
            style={{
              fontSize: 9,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              wordWrap: true,
              wordWrapWidth: width - 20,
            }}
            x={0}
            y={20 + index * 12}
          />
        ))}
      </pixiContainer>

      {/* Player stats comparison */}
      <pixiContainer x={10} y={height - 60}>
        <pixiText
          text="통계 - Statistics"
          style={{
            fontSize: 9,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          }}
        />

        <pixiText
          text={`정확도: P1 ${calculateAccuracy(players[0])}%`}
          style={{
            fontSize: 7,
            fill: KOREAN_COLORS.PLAYER_1_COLOR,
          }}
          y={12}
        />

        <pixiText
          text={`P2 ${calculateAccuracy(players[1])}%`}
          style={{
            fontSize: 7,
            fill: KOREAN_COLORS.PLAYER_2_COLOR,
          }}
          x={width - 80}
          y={12}
        />

        <pixiText
          text={`${player1.name.korean}: ${player1.health}/${player1.maxHealth}`}
          style={{
            fontSize: 8,
            fill: KOREAN_COLORS.PLAYER_1_COLOR,
          }}
          y={24}
        />

        <pixiText
          text={`${player2.name.korean}: ${player2.health}/${player2.maxHealth}`}
          style={{
            fontSize: 8,
            fill: KOREAN_COLORS.PLAYER_2_COLOR,
          }}
          y={36}
        />
      </pixiContainer>
    </pixiContainer>
  );
};

export default CombatStats;
export default CombatStats;
export default CombatStats;
