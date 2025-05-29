import { useCallback } from "react";
import { useTick, type Ticker } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import type { PlayerState, Position, TrigramStance } from "../../types";

interface PlayerVisualsProps {
  readonly playerState: PlayerState;
  readonly opponentPosition: Position;
  readonly animationTime: number;
}

export function PlayerVisuals({
  playerState,
  opponentPosition,
  animationTime,
}: PlayerVisualsProps): React.JSX.Element {
  // Animation logic
  const currentAnimation = playerState.isAttacking
    ? "attacking"
    : playerState.isBlocking
    ? "blocking"
    : playerState.isMoving
    ? "moving"
    : "idle";

  // Drawing callback for player visualization
  const drawPlayer = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Draw player body (Korean martial arts uniform - dobok)
      g.setFillStyle({ color: 0xffffff, alpha: 0.9 });
      g.rect(-25, -90, 50, 90);
      g.fill();

      // Draw belt based on experience level
      const beltColor = 0x8b0000; // Red belt for master level
      g.setFillStyle({ color: beltColor });
      g.rect(-27, -25, 54, 10);
      g.fill();

      // Draw stance-specific aura
      if (playerState.isAttacking || playerState.ki > playerState.maxKi * 0.8) {
        const stanceColors: Record<TrigramStance, number> = {
          geon: 0xffd700, // Gold - Heaven
          tae: 0x87ceeb, // Sky Blue - Lake
          li: 0xff4500, // Red Orange - Fire
          jin: 0x9370db, // Purple - Thunder
          son: 0x98fb98, // Pale Green - Wind
          gam: 0x4169e1, // Royal Blue - Water
          gan: 0x8b4513, // Saddle Brown - Mountain
          gon: 0x654321, // Dark Brown - Earth
        };

        const auraAlpha = Math.sin(animationTime * 0.3) * 0.4 + 0.6;
        g.setStrokeStyle({
          color: stanceColors[playerState.stance],
          width: 8,
          alpha: auraAlpha,
        });
        g.circle(0, -45, 45 + Math.sin(animationTime * 0.5) * 5);
        g.stroke();
      }

      // Add animation effects
      const armOffset = currentAnimation === "attacking" ? 20 : 10;

      // Draw arms with animation
      g.setFillStyle({ color: 0xffdbac }); // Skin tone
      g.rect(-35, -60, 15, 40); // Left arm
      g.rect(
        20 + (currentAnimation === "attacking" ? armOffset : 0),
        -60,
        15,
        40
      ); // Right arm
      g.fill();
    },
    [playerState, animationTime, currentAnimation]
  );

  return (
    <pixiContainer x={playerState.position.x} y={playerState.position.y}>
      <pixiGraphics draw={drawPlayer} />

      {/* Health indicator */}
      <pixiText
        text={`${Math.round(playerState.health)}/${playerState.maxHealth}`}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-120}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 12,
          fill:
            playerState.health > playerState.maxHealth * 0.3
              ? 0x00ff00
              : 0xff0000,
        }}
      />

      {/* Korean stance display */}
      <pixiText
        text={`${playerState.stance.toUpperCase()}`}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-140}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 14,
          fill: 0xffd700,
          fontWeight: "bold",
        }}
      />
    </pixiContainer>
  );
}
