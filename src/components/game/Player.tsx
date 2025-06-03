// Complete player component for Korean martial arts fighter

import { Container, Graphics, Text } from "@pixi/react";
import { useCallback } from "react";
import type { PlayerProps } from "../../types/components";
import { KOREAN_COLORS, getTrigramColor } from "../../types/constants";

export function Player({
  playerState,
  playerIndex,
  onStateUpdate,
  x = 0,
  y = 0,
  width = 60,
  height = 80,
}: PlayerProps): JSX.Element {
  const drawPlayer = useCallback(
    (g: any) => {
      g.clear();

      // Get stance color
      const stanceColor = getTrigramColor(playerState.stance);

      // Player body (simplified representation)
      g.beginFill(stanceColor);
      g.drawRoundedRect(-width / 2, -height / 2, width, height, 10);
      g.endFill();

      // Health indicator outline
      const healthPercent = playerState.health / playerState.maxHealth;
      let healthColor = KOREAN_COLORS.HEALTH_GREEN;
      if (healthPercent < 0.3) healthColor = KOREAN_COLORS.HEALTH_RED;
      else if (healthPercent < 0.6) healthColor = KOREAN_COLORS.HEALTH_YELLOW;

      g.lineStyle(2, healthColor);
      g.drawRoundedRect(-width / 2, -height / 2, width, height, 10);

      // Stance indicator (small trigram symbol area)
      g.beginFill(KOREAN_COLORS.BLACK, 0.7);
      g.drawCircle(0, -height / 2 - 15, 8);
      g.endFill();

      // Ki energy aura if high
      if (playerState.ki > 70) {
        g.lineStyle(1, KOREAN_COLORS.KI_BLUE, 0.5);
        g.drawCircle(0, 0, width / 2 + 5);
      }
    },
    [playerState, width, height]
  );

  return (
    <Container x={x} y={y}>
      <Graphics draw={drawPlayer} />

      {/* Player name */}
      <Text
        text={playerState.name}
        x={0}
        y={height / 2 + 10}
        anchor={0.5}
        style={{
          fontFamily: "Arial",
          fontSize: 12,
          fill: KOREAN_COLORS.WHITE,
          align: "center",
        }}
      />

      {/* Stance symbol */}
      <Text
        text={playerState.stance}
        x={0}
        y={-height / 2 - 15}
        anchor={0.5}
        style={{
          fontFamily: "Arial",
          fontSize: 10,
          fill: KOREAN_COLORS.WHITE,
          align: "center",
        }}
      />
    </Container>
  );
}
