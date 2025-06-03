import React, { useCallback } from "react";
import { Container, Graphics } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import type { PlayerProps } from "../../types";
import { KOREAN_COLORS } from "../../types";

export function PlayerVisuals({
  playerState,
  isPlayer1 = true,
  x = 0,
  y = 0,
  width = 60,
  height = 100,
}: PlayerProps): React.ReactElement {
  // Draw player body with Korean martial arts styling
  const drawPlayerBody = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Player body (rectangle for now, can be enhanced later)
      g.setFillStyle({ color: KOREAN_COLORS.HANBOK_WHITE, alpha: 0.9 });
      g.setStrokeStyle({ color: KOREAN_COLORS.BLACK, width: 2 });
      g.rect(-width / 2, -height / 2, width, height);
      g.fill();
      g.stroke();

      // Health visualization
      const healthPercentage = playerState.health / playerState.maxHealth;
      let healthColor: number;

      if (healthPercentage > 0.7) {
        healthColor = KOREAN_COLORS.STAMINA_GREEN; // Fixed: was HEALTH_GREEN
      } else if (healthPercentage > 0.3) {
        healthColor = KOREAN_COLORS.YELLOW; // Fixed: was HEALTH_YELLOW
      } else {
        healthColor = KOREAN_COLORS.HEALTH_RED;
      }

      // Health bar
      g.setFillStyle({ color: healthColor });
      g.rect(-width / 2, -height / 2 - 10, width * healthPercentage, 4);
      g.fill();

      // Stance indicator (small colored circle)
      const stanceColors = {
        geon: KOREAN_COLORS.HEAVEN_GOLD, // Fixed: was GEON_GOLD
        tae: KOREAN_COLORS.CYAN, // Fixed: was TAE_CYAN
        li: KOREAN_COLORS.FIRE_RED, // Fixed: was LI_ORANGE
        jin: KOREAN_COLORS.PURPLE, // Fixed: was JIN_PURPLE
        son: KOREAN_COLORS.WIND_GREEN, // Fixed: was SON_GREEN
        gam: KOREAN_COLORS.WATER_BLUE, // Fixed: was GAM_BLUE
        gan: KOREAN_COLORS.MOUNTAIN_BROWN, // Fixed: was GAN_BROWN
        gon: KOREAN_COLORS.EARTH_ORANGE, // Fixed: was GON_YELLOW
      };

      const stanceColor = stanceColors[playerState.stance];
      g.setFillStyle({ color: stanceColor });
      g.circle(0, -height / 2 + 15, 8);
      g.fill();

      // Facing direction indicator
      if (playerState.facing === "left") {
        g.setFillStyle({ color: KOREAN_COLORS.WHITE });
        g.circle(-width / 4, -height / 4, 3);
        g.fill();
      } else {
        g.setFillStyle({ color: KOREAN_COLORS.WHITE });
        g.circle(width / 4, -height / 4, 3);
        g.fill();
      }

      // Combat state effects
      if (playerState.isAttacking) {
        g.setStrokeStyle({ color: KOREAN_COLORS.CRITICAL_HIT, width: 3 });
        g.circle(0, 0, width / 2 + 5);
        g.stroke();
      }

      // Status effects visualization
      if (playerState.activeEffects.length > 0) {
        playerState.activeEffects.forEach((effect, index) => {
          g.setFillStyle({ color: KOREAN_COLORS.VITAL_POINT, alpha: 0.6 });
          g.circle(-width / 2 + 10 + index * 8, height / 2 - 10, 3);
          g.fill();
        });
      }
    },
    [playerState, width, height]
  );

  return (
    <Container x={x} y={y}>
      <Graphics draw={drawPlayerBody} />
    </Container>
  );
}
