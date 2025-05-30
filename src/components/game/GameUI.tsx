import { useCallback } from "react";
import { Container, Text, Graphics } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import { KOREAN_COLORS, type PlayerState } from "../../types";

export interface GameUIProps {
  readonly players: [PlayerState, PlayerState];
  readonly gameTime: number;
  readonly currentRound: number;
  readonly timeRemaining: number;
  readonly combatLog: string[];
}

export function GameUI({
  players,
  currentRound,
  timeRemaining,
  combatLog,
}: GameUIProps): React.ReactElement {
  const [player1, player2] = players;

  const drawHealthBar = useCallback(
    (g: PixiGraphics, player: PlayerState, x: number, y: number) => {
      g.clear();

      const barWidth = 200;
      const barHeight = 20;
      const healthPercent = player.health / player.maxHealth;

      // Background
      g.setFillStyle({ color: KOREAN_COLORS.GRAY_DARK });
      g.rect(x, y, barWidth, barHeight);
      g.fill();

      // Health fill - fix color references
      const healthColor =
        healthPercent > 0.5
          ? KOREAN_COLORS.Green
          : healthPercent > 0.25
          ? KOREAN_COLORS.YELLOW
          : KOREAN_COLORS.Red;
      g.setFillStyle({ color: healthColor });
      g.rect(x + 2, y + 2, (barWidth - 4) * healthPercent, barHeight - 4);
      g.fill();

      // Border
      g.setStrokeStyle({ color: KOREAN_COLORS.WHITE, width: 2 });
      g.rect(x, y, barWidth, barHeight);
      g.stroke();
    },
    []
  );

  return (
    <Container>
      {/* Player 1 UI */}
      <Container x={50} y={50}>
        <Text
          text={`Player 1: ${player1.playerId}`}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 18,
            fill: KOREAN_COLORS.WHITE,
            fontWeight: "bold",
          }}
        />
        <Graphics draw={(g) => drawHealthBar(g, player1, 0, 30)} />
        <Text
          text={`Stance: ${player1.stance.toUpperCase()}`}
          y={85}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 14,
            fill: KOREAN_COLORS.GOLD,
          }}
        />
      </Container>

      {/* Player 2 UI */}
      <Container x={550} y={50}>
        <Text
          text={`Player 2: ${player2.playerId}`}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 18,
            fill: KOREAN_COLORS.WHITE,
            fontWeight: "bold",
          }}
        />
        <Graphics draw={(g) => drawHealthBar(g, player2, 0, 30)} />
        <Text
          text={`Stance: ${player2.stance.toUpperCase()}`}
          y={85}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 14,
            fill: KOREAN_COLORS.GOLD,
          }}
        />
      </Container>

      {/* Game Info */}
      <Container x={400} y={30}>
        <Text
          text={`Round ${currentRound}`}
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 24,
            fill: KOREAN_COLORS.GOLD,
            fontWeight: "bold",
          }}
        />
        <Text
          text={`Time: ${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60)
            .toString()
            .padStart(2, "0")}`}
          anchor={{ x: 0.5, y: 0.5 }}
          y={30}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 18,
            fill: KOREAN_COLORS.WHITE,
          }}
        />
      </Container>

      {/* Combat Log */}
      <Container x={50} y={500}>
        <Text
          text="Combat Log:"
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 16,
            fill: KOREAN_COLORS.WHITE,
            fontWeight: "bold",
          }}
        />
        {combatLog.slice(-3).map((entry, index) => (
          <Text
            key={index}
            text={entry}
            y={25 + index * 20}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 12,
              fill: KOREAN_COLORS.GRAY_LIGHT,
            }}
          />
        ))}
      </Container>
    </Container>
  );
}
