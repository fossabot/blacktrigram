// Complete player component for Korean martial arts fighter

import React, { useCallback } from "react";
import * as PIXI from "pixi.js";
import { KOREAN_COLORS } from "../../types/constants";
import type { PlayerState, PlayerArchetype } from "../../types";

interface PlayerProps {
  readonly playerState: PlayerState;
  readonly playerIndex: number;
  readonly onStateUpdate: (updates: Partial<PlayerState>) => void;
  readonly isActive?: boolean;
  readonly archetype?: PlayerArchetype;
}

export function Player({
  playerState,
  isActive = true,
}: PlayerProps): React.ReactElement {
  // Draw player martial artist
  const drawPlayer = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Get stance color from KOREAN_COLORS
      const stanceColor =
        KOREAN_COLORS[playerState.stance as keyof typeof KOREAN_COLORS] ||
        KOREAN_COLORS.WHITE;

      // Draw player body
      g.setFillStyle({ color: KOREAN_COLORS.WHITE, alpha: 0.9 });
      g.rect(-25, -90, 50, 90);
      g.fill();

      // Draw stance aura
      g.setStrokeStyle({ color: stanceColor, width: 3 });
      g.circle(0, -45, 35);
      g.stroke();

      // Health indicator
      const healthRatio = playerState.health / playerState.maxHealth;
      g.setFillStyle({
        color:
          healthRatio > 0.5
            ? KOREAN_COLORS.WHITE
            : KOREAN_COLORS.TRADITIONAL_RED,
      });
      g.rect(-20, -100, 40 * healthRatio, 5);
      g.fill();
    },
    [playerState.stance, playerState.health, playerState.maxHealth]
  );

  return (
    <pixiContainer
      x={playerState.position.x}
      y={playerState.position.y}
      interactive={isActive}
      eventMode={isActive ? "static" : "passive"}
    >
      <pixiGraphics draw={drawPlayer} />
    </pixiContainer>
  );
}
