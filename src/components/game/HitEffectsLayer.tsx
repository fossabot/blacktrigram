// Hit effects layer for combat feedback

import React, { useCallback } from "react";
import * as PIXI from "pixi.js";
import type { HitEffect } from "../../types";
import { KOREAN_COLORS } from "../../types";

interface HitEffectsLayerProps {
  readonly effects: readonly HitEffect[];
}

export function HitEffectsLayer({
  effects,
}: HitEffectsLayerProps): React.ReactElement {
  const renderEffect = (effect: HitEffect): React.ReactElement => {
    const age = Date.now() - effect.startTime;
    const progress = Math.min(1, age / effect.duration);
    const alpha = 1 - progress;

    return (
      <pixiContainer
        key={effect.id}
        x={effect.position.x}
        y={effect.position.y}
      >
        <pixiGraphics
          draw={useCallback(
            (g: PIXI.Graphics) => {
              g.clear();

              // Impact flash
              g.setFillStyle({ color: effect.color, alpha: alpha * 0.7 });
              g.circle(0, 0, 20 * (1 + progress));
              g.fill();

              // Sparks for critical hits
              if (effect.damage >= 30) {
                for (let i = 0; i < 6; i++) {
                  const angle = (i / 6) * Math.PI * 2;
                  const distance = 15 + progress * 20;
                  const x = Math.cos(angle) * distance;
                  const y = Math.sin(angle) * distance;

                  g.setFillStyle({ color: KOREAN_COLORS.GOLD, alpha });
                  g.circle(x, y, 2);
                  g.fill();
                }
              }
            },
            [effect, progress, alpha]
          )}
        />

        <pixiText
          text={effect.damage.toString()}
          x={0}
          y={-30}
          anchor={{ x: 0.5, y: 0.5 }}
          style={
            new PIXI.TextStyle({
              fontFamily: "Noto Sans KR, Arial, sans-serif",
              fontSize: 24,
              fill: effect.color,
              fontWeight: "bold",
            })
          }
          alpha={alpha}
        />
      </pixiContainer>
    );
  };

  return <pixiContainer>{effects.map(renderEffect)}</pixiContainer>;
}
