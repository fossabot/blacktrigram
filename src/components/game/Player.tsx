import React, { useState, useCallback } from "react";
import { Container, Graphics, Text, useTick } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import type { PlayerState, Position } from "../../types";

export interface PlayerProps {
  readonly playerState: PlayerState;
  readonly onAttack: () => void;
  readonly onStanceChange: (stance: string) => void;
}

export function Player({
  playerState,
  onAttack, // This prop is part of the component's API
  onStanceChange, // This prop is part of the component's API, usage is up to the parent
}: PlayerProps): JSX.Element {
  const [animationTime, setAnimationTime] = useState<number>(0);

  useTick(
    useCallback((delta: number) => {
      setAnimationTime((prev) => prev + delta);
    }, [])
  );

  const drawPlayer = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Traditional Korean martial arts uniform (dobok)
      g.beginFill(0xffffff, 0.9);
      g.drawRect(-25, -90, 50, 90);
      g.endFill();

      // Belt color indicating mastery level
      g.beginFill(0x8b0000); // Red belt for master
      g.drawRect(-27, -25, 54, 10);
      g.endFill();

      // Stance-specific energy aura
      if (playerState.isAttacking) {
        const stanceColors: Record<string, number> = {
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
        g.lineStyle(8, stanceColors[playerState.stance] || 0xffffff, auraAlpha);
        g.drawCircle(0, -45, 45 + Math.sin(animationTime * 0.5) * 5);
      }
    },
    [playerState.stance, playerState.isAttacking, animationTime]
  );

  return (
    <Container
      x={playerState.position.x}
      y={playerState.position.y}
      interactive={true}
      onPointerDown={onAttack}
      data-testid="pixi-container"
    >
      <Graphics draw={drawPlayer} />

      <Text
        text={`${playerState.stance.toUpperCase()}`}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-120}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 16,
          fill: 0xffd700,
          fontWeight: "bold",
        }}
        data-testid="pixi-text"
      />
    </Container>
  );
}
