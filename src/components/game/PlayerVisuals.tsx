import { useCallback } from "react";
import type { Graphics as PixiGraphics } from "pixi.js";
import type { PlayerState, Position, TrigramStance } from "../../types";
import { TRIGRAM_DATA } from "../../types";

interface PlayerVisualsProps {
  readonly playerState: PlayerState;
  readonly opponentPosition: Position;
  readonly animationTime: number;
  readonly onAttack?: (damage: number, technique: string) => void;
  readonly onStanceChange?: (stance: TrigramStance) => void;
}

export function PlayerVisuals({
  playerState,
  animationTime,
  onAttack,
}: PlayerVisualsProps): JSX.Element {
  const drawPlayer = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Traditional Korean martial arts uniform (dobok)
      g.setFillStyle({ color: 0xffffff, alpha: 0.9 });
      g.rect(-25, -90, 50, 90);
      g.fill();

      // Belt color indicating mastery level
      g.setFillStyle({ color: 0x8b0000 }); // Red belt for master
      g.rect(-27, -25, 54, 10);
      g.fill();

      // Stance-specific energy aura
      if (playerState.isAttacking) {
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

      // Health indicator
      const healthRatio = playerState.health / playerState.maxHealth;
      g.setFillStyle({
        color:
          healthRatio > 0.5
            ? 0x00ff00
            : healthRatio > 0.25
            ? 0xffff00
            : 0xff0000,
      });
      g.rect(-30, -110, 60 * healthRatio, 5);
      g.fill();

      // Stance indicator symbol
      g.setFillStyle({ color: TRIGRAM_DATA[playerState.stance].color });
      g.circle(0, -120, 15);
      g.fill();
    },
    [playerState, animationTime]
  );

  const executeKoreanTechnique = useCallback(() => {
    const technique = TRIGRAM_DATA[playerState.stance].technique;
    onAttack?.(technique.damage, technique.name);
  }, [playerState.stance, onAttack]);

  return (
    <pixiContainer
      x={playerState.position.x}
      y={playerState.position.y}
      interactive={true}
      onPointerDown={executeKoreanTechnique}
    >
      <pixiGraphics draw={drawPlayer} />

      {/* Korean technique name display */}
      <pixiText
        text={`${
          TRIGRAM_DATA[playerState.stance].technique.name
        } (${playerState.stance.toUpperCase()})`}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-140}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 16,
          fill: 0xffd700,
          fontWeight: "bold",
        }}
      />

      {/* Trigram symbol */}
      <pixiText
        text={TRIGRAM_DATA[playerState.stance].symbol}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-120}
        style={{
          fontFamily: "serif",
          fontSize: 24,
          fill: 0xffffff,
        }}
      />
    </pixiContainer>
  );
}
