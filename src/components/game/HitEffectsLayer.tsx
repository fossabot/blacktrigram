// Hit effects layer for combat feedback

import React from "react";
import { Container, Graphics, Text } from "@pixi/react";
import { KOREAN_COLORS } from "../../types/constants";

// Add missing interface
interface HitEffectsLayerProps {
  readonly effects: readonly any[];
}

export function HitEffectsLayer({
  effects,
}: HitEffectsLayerProps): React.JSX.Element {
  return (
    <Container>
      {effects.map((effect) => (
        <Graphics
          key={effect.id}
          x={effect.position.x}
          y={effect.position.y}
          draw={(g: PIXI.Graphics) => {
            g.clear();
            g.beginFill(effect.color);
            g.drawCircle(0, 0, 10);
            g.endFill();
          }}
        />
      ))}
    </Container>
  );
}
