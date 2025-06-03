// Complete player component for Korean martial arts fighter

import React, { useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { PlayerProps } from "../../types/components";
import { KOREAN_COLORS } from "../../types/constants";

export function Player({
  playerState,
  // playerIndex, // Remove unused prop
  // onStateUpdate, // Remove unused prop
  ...containerProps
}: PlayerProps): React.ReactElement {
  const { position, health, maxHealth, stance, archetype } = playerState;

  const playerVisuals = useMemo(() => {
    // Health bar color calculation
    const healthPercent = health / maxHealth;
    let healthColor: number = KOREAN_COLORS.HEALTH_GREEN;

    if (healthPercent < 0.3)
      healthColor = KOREAN_COLORS.TRADITIONAL_RED as number;
    else if (healthPercent < 0.6) healthColor = KOREAN_COLORS.GOLD as number;

    return {
      healthColor,
      stanceColor: getStanceColor(stance),
      archetypeColor: getArchetypeColor(archetype),
    };
  }, [health, maxHealth, stance, archetype]);

  const drawPlayer = (g: any) => {
    g.clear();

    // Draw main body
    g.setFillStyle({ color: playerVisuals.archetypeColor });
    g.circle(0, 0, 30);
    g.fill();

    // Draw stance aura
    g.setFillStyle({ color: playerVisuals.stanceColor, alpha: 0.3 });
    g.circle(0, 0, 45);
    g.fill();

    // Draw health bar
    g.setFillStyle({ color: 0x000000 });
    g.rect(-25, -50, 50, 8);
    g.fill();

    g.setFillStyle({ color: playerVisuals.healthColor });
    g.rect(-25, -50, 50 * (health / maxHealth), 8);
    g.fill();
  };

  return (
    <Container x={position.x} y={position.y} {...containerProps}>
      <Graphics draw={drawPlayer} />

      {/* Player name */}
      <Text
        text={playerState.name}
        x={0}
        y={40}
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
        y={-60}
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

function getStanceColor(stance: string): number {
  const stanceColors: Record<string, number> = {
    geon: KOREAN_COLORS.GEON_GOLD,
    tae: KOREAN_COLORS.TAE_CYAN,
    li: KOREAN_COLORS.LI_ORANGE,
    jin: KOREAN_COLORS.JIN_PURPLE,
    son: KOREAN_COLORS.SON_GREEN,
    gam: KOREAN_COLORS.GAM_BLUE,
    gan: KOREAN_COLORS.GAN_BROWN,
    gon: KOREAN_COLORS.GON_YELLOW,
  };
  return stanceColors[stance] || KOREAN_COLORS.WHITE;
}

function getArchetypeColor(archetype: string): number {
  const archetypeColors: Record<string, number> = {
    musa: KOREAN_COLORS.GOLD,
    amsalja: KOREAN_COLORS.NEON_PURPLE,
    hacker: KOREAN_COLORS.ELECTRIC_BLUE,
    jeongbo: KOREAN_COLORS.SILVER,
    jojik: KOREAN_COLORS.TRADITIONAL_RED,
  };
  return archetypeColors[archetype] || KOREAN_COLORS.WHITE;
}
