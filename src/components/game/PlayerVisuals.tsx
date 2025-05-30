import React, { useCallback, useState } from "react";
import { Container, Graphics, Text, useTick } from "@pixi/react";
import type { PlayerState } from "../../types";
import type { Graphics as PixiGraphics } from "pixi.js";

export interface PlayerVisualsProps {
  readonly playerState: PlayerState;
  readonly scale?: number;
  readonly showHealthBar?: boolean;
}

export function PlayerVisuals({
  playerState,
  scale = 1,
  showHealthBar = true,
}: PlayerVisualsProps): React.ReactElement {
  const [animationTime, setAnimationTime] = useState<number>(0);

  useTick(
    useCallback((delta: number) => {
      setAnimationTime((prev) => prev + delta);
    }, [])
  );

  const drawPlayer = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      const pulseFactor = Math.sin(animationTime * 0.1) * 0.1 + 1;

      g.setFillStyle({ color: 0x4a89e2 });
      g.circle(0, 0, 20 * scale * pulseFactor);
      g.fill();
    },
    [scale, animationTime]
  );

  return (
    <Container
      x={playerState.position.x}
      y={playerState.position.y}
      scale={{ x: scale, y: scale }}
    >
      <Graphics draw={drawPlayer} />
      {showHealthBar && (
        <Text
          text={`HP: ${playerState.health}/${playerState.maxHealth}`}
          y={-40}
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Arial",
            fontSize: 12,
            fill: 0xffffff,
          }}
        />
      )}
    </Container>
  );
}
