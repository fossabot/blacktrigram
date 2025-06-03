import React, { useMemo } from "react";
import { Container, Graphics } from "@pixi/react";
import type { PlayerProps } from "../../types";
import { KOREAN_COLORS } from "../../types";

export function PlayerVisuals({
  playerState,
}: PlayerProps): React.ReactElement {
  const { position, health, maxHealth, stance, conditions } = playerState;

  const stanceVisuals = useMemo(() => {
    return {
      color: getStanceColor(stance),
      symbol: getStanceSymbol(stance),
    };
  }, [stance]);

  const playerVisuals = useMemo(() => {
    const healthPercent = health / maxHealth;

    return {
      mainColor: KOREAN_COLORS.WHITE,
      healthPercent,
      hasConditions: conditions.length > 0,
    };
  }, [playerState, stanceVisuals]); // Fixed dependency order

  const drawPlayerVisuals = (g: any) => {
    g.clear();

    // Main player body
    g.setFillStyle({ color: playerVisuals.mainColor });
    g.circle(0, 0, 25);
    g.fill();

    // Stance aura
    g.setFillStyle({ color: stanceVisuals.color, alpha: 0.3 });
    g.circle(0, 0, 40);
    g.fill();

    // Health indicator
    const healthColor =
      playerVisuals.healthPercent > 0.6
        ? KOREAN_COLORS.HEALTH_GREEN
        : playerVisuals.healthPercent > 0.3
        ? KOREAN_COLORS.HEALTH_YELLOW
        : KOREAN_COLORS.HEALTH_RED;

    g.setFillStyle({ color: healthColor });
    g.rect(-20, -35, 40 * playerVisuals.healthPercent, 4);
    g.fill();
  };

  return (
    <Container x={position.x} y={position.y}>
      <Graphics draw={drawPlayerVisuals} />
    </Container>
  );
}

function getStanceColor(stance: string): number {
  const colors: Record<string, number> = {
    geon: KOREAN_COLORS.GEON_GOLD,
    tae: KOREAN_COLORS.TAE_CYAN,
    li: KOREAN_COLORS.LI_ORANGE,
    jin: KOREAN_COLORS.JIN_PURPLE,
    son: KOREAN_COLORS.SON_GREEN,
    gam: KOREAN_COLORS.GAM_BLUE,
    gan: KOREAN_COLORS.GAN_BROWN,
    gon: KOREAN_COLORS.GON_YELLOW,
  };
  return colors[stance] || KOREAN_COLORS.WHITE;
}

function getStanceSymbol(stance: string): string {
  const symbols: Record<string, string> = {
    geon: "☰",
    tae: "☱",
    li: "☲",
    jin: "☳",
    son: "☴",
    gam: "☵",
    gan: "☶",
    gon: "☷",
  };
  return symbols[stance] || "○";
}
