// Hit effects layer for combat feedback

import React from "react";
import type { HitEffect } from "../../types/effects";

interface HitEffectsLayerProps {
  readonly effects: readonly HitEffect[];
}

export function HitEffectsLayer({
  effects,
}: HitEffectsLayerProps): React.JSX.Element {
  return (
    <pixiContainer>
      {effects.map((effect) => (
        <pixiGraphics
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
    </pixiContainer>
  );
}

export default HitEffectsLayer;
