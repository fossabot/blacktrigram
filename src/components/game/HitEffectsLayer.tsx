// Hit effects layer for combat feedback

import React from "react";
import type { HitEffect } from "../../types";
import { Container, Text } from "@pixi/react";
import { KOREAN_COLORS } from "../../types";

// Add missing interface
interface HitEffectsLayerProps {
  readonly effects: readonly HitEffect[];
  readonly duration?: number;
  readonly fadeOutDuration?: number;
  readonly maxEffects?: number;
}

export function HitEffectsLayer({
  effects,
}: HitEffectsLayerProps): React.ReactElement {
  return (
    <Container>
      {effects.map((effect: HitEffect, index: number) => (
        <Container
          key={`${effect.id}-${index}`}
          x={effect.position.x}
          y={effect.position.y}
        >
          {effect.type === "critical" && (
            <Text
              text={effect.korean}
              style={{
                fontSize: 24,
                fill: KOREAN_COLORS.CRITICAL_HIT,
                stroke: KOREAN_COLORS.BLACK,
                strokeThickness: 2, // Fixed: PIXI uses strokeThickness
                fontWeight: "bold",
              }}
            />
          )}
          {effect.type !== "critical" && (
            <Text
              text={`${effect.damage}`}
              style={{
                fontSize: 18,
                fill: effect.color,
                stroke: KOREAN_COLORS.BLACK,
                strokeThickness: 1, // Fixed: PIXI uses strokeThickness
              }}
            />
          )}
        </Container>
      ))}
    </Container>
  );
}
