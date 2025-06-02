import React, { useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import { KOREAN_COLORS } from "../../types/constants"; // Import as value, not type
import type { PlayerState } from "../../types";

interface PlayerVisualsProps {
  readonly playerState: PlayerState;
  readonly showHealthBar?: boolean;
  readonly showStanceAura?: boolean;
  readonly showDamageNumbers?: boolean;
}

export function PlayerVisuals({
  playerState,
  showHealthBar = true,
  showStanceAura = true,
}: PlayerVisualsProps): React.ReactElement {
  // Draw health bar
  const drawHealthBar = useCallback(
    (g: PIXI.Graphics) => {
      if (!showHealthBar) return;

      g.clear();

      const healthRatio = playerState.health / playerState.maxHealth;
      const barWidth = 60;
      const barHeight = 6;

      // Background
      g.setFillStyle({ color: KOREAN_COLORS.SILVER, alpha: 0.3 });
      g.rect(-barWidth / 2, -110, barWidth, barHeight);
      g.fill();

      // Health bar
      g.setFillStyle({
        color:
          healthRatio > 0.6
            ? KOREAN_COLORS.WHITE
            : healthRatio > 0.3
            ? KOREAN_COLORS.GOLD
            : KOREAN_COLORS.TRADITIONAL_RED,
      });
      g.rect(-barWidth / 2, -110, barWidth * healthRatio, barHeight);
      g.fill();
    },
    [playerState.health, playerState.maxHealth, showHealthBar]
  );

  // Draw stance aura
  const drawStanceAura = useCallback(
    (g: PIXI.Graphics) => {
      if (!showStanceAura) return;

      g.clear();

      const stanceColor =
        KOREAN_COLORS[playerState.stance as keyof typeof KOREAN_COLORS] ||
        KOREAN_COLORS.WHITE;

      // Stance aura
      g.setStrokeStyle({ color: stanceColor, width: 2, alpha: 0.7 });
      g.circle(0, -45, 40);
      g.stroke();

      // Inner glow
      g.setStrokeStyle({ color: stanceColor, width: 1, alpha: 0.3 });
      g.circle(0, -45, 50);
      g.stroke();
    },
    [playerState.stance, showStanceAura]
  );

  // Draw Ki energy
  const drawKiEnergy = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      const kiRatio = playerState.ki / playerState.maxKi;

      // Ki energy bar
      g.setFillStyle({ color: KOREAN_COLORS.ACCENT_BLUE, alpha: 0.8 });
      g.rect(-30, -120, 60 * kiRatio, 3);
      g.fill();
    },
    [playerState.ki, playerState.maxKi]
  );

  return (
    <Container>
      <Graphics draw={drawHealthBar} />
      <Graphics draw={drawStanceAura} />
      <Graphics draw={drawKiEnergy} />
    </Container>
  );
}
