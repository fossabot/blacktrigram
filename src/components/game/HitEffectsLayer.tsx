// Hit effects layer for combat feedback

import React from "react";
import { Container, Graphics } from "@pixi/react"; // Remove unused Text
import type { HitEffect } from "../../types/effects";
// Remove unused KOREAN_COLORS import

interface HitEffectsLayerProps {
  readonly effects: readonly HitEffect[];
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
          draw={(g: any) => {
            // Fix: Use any type for graphics parameter
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

export default HitEffectsLayer;
