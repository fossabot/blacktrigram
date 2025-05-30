import React, { useCallback, useEffect, useState } from "react";
import { Container, Graphics, Text, useTick } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import type { PlayerState, TrigramStance } from "../../types";

export interface PlayerProps {
  readonly playerState: PlayerState;
  readonly onStanceChange: (stance: TrigramStance) => void;
  readonly onAttack?: (target?: { x: number; y: number }) => void; // Add onAttack prop
}

export function Player({
  playerState,
  onStanceChange, // Part of component API
  onAttack, // Add onAttack prop
}: PlayerProps): React.ReactElement {
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

  const handleAttack = useCallback(() => {
    if (onAttack) {
      onAttack({ x: playerState.position.x, y: playerState.position.y });
    }
  }, [onAttack, playerState.position]);

  const handleStanceChange = useCallback(
    (newStance: TrigramStance) => {
      onStanceChange(newStance);
    },
    [onStanceChange]
  );

  // Use handleStanceChange in keyboard handler
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const stanceKeys: Record<string, TrigramStance> = {
        "1": "geon",
        "2": "tae",
        "3": "li",
        "4": "jin",
        "5": "son",
        "6": "gam",
        "7": "gan",
        "8": "gon",
      };

      const newStance = stanceKeys[event.key];
      if (newStance && newStance !== playerState.stance) {
        handleStanceChange(newStance);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleStanceChange, playerState.stance]);

  return (
    <Container x={playerState.position.x} y={playerState.position.y}>
      <Graphics draw={drawPlayer} />
      <Container interactive={true} onPointerDown={handleAttack}>
        <Text
          text={`${playerState.stance.toUpperCase()}`}
          x={0}
          y={-80}
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Arial",
            fontSize: 16,
            fill: 0xffffff,
          }}
          data-testid="pixi-text"
        />
      </Container>
    </Container>
  );
}
