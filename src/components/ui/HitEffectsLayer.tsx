import React, { useEffect, useState } from "react"; // Fix: Remove unused useMemo import
import { Container, Graphics, Text } from "@pixi/react";
import type { HitEffect, DisplayHitEffect } from "../../types/effects";
import { KOREAN_COLORS } from "../../types/constants"; // Fix: Remove unused FONT_SIZES import
import * as PIXI from "pixi.js";

interface HitEffectsLayerProps {
  effects: readonly HitEffect[];
  // ... other props
}

export const HitEffectsLayer: React.FC<HitEffectsLayerProps> = ({
  effects,
}) => {
  const [displayEffects, setDisplayEffects] = useState<DisplayHitEffect[]>([]);

  useEffect(() => {
    const now = Date.now();
    setDisplayEffects(
      effects
        .map((effect) => {
          const progress = Math.min(
            1,
            (now - effect.timestamp) / (effect.duration || 1000)
          );
          if (progress >= 1 && !(effect.lifespan && effect.lifespan > 0))
            return null; // Filter out expired non-lifespan effects

          return {
            ...effect,
            displayAlpha:
              effect.alpha !== undefined
                ? effect.alpha
                : 1 - progress * progress,
            displayY: (effect.yOffset ?? 0) - progress * 30,
            displaySize:
              (effect.size ?? (effect.damageAmount || 10) * 0.5 + 5) *
              (1 + progress * 0.3),
          };
        })
        .filter((effect): effect is DisplayHitEffect => effect !== null)
    );
  }, [effects]); // Removed app.ticker.lastTime for simplicity

  return (
    <Container>
      {displayEffects.map((effect) => (
        <Container
          key={effect.id}
          x={effect.position?.x || 0}
          y={effect.displayY} // Fix: Use correct property
          alpha={effect.displayAlpha} // Fix: Use correct property
        >
          <Graphics
            draw={(g: PIXI.Graphics) => {
              g.clear();
              g.beginFill(effect.color || KOREAN_COLORS.ACCENT_RED, 0.8);
              g.drawCircle(0, 0, effect.displaySize); // Fix: Use correct property
              g.endFill();
            }}
          />
          {(effect.damageAmount || effect.text) && (
            <Text
              text={
                typeof effect.text === "string"
                  ? effect.text
                  : effect.text?.korean || "" // Fix: Add null check
              }
              anchor={{ x: 0.5, y: 0.5 }}
              style={
                new PIXI.TextStyle({
                  fill: KOREAN_COLORS.TEXT_PRIMARY,
                  fontSize: 16,
                  fontWeight: "bold",
                  stroke: { color: KOREAN_COLORS.BLACK_SOLID, width: 2 },
                })
              }
            />
          )}
        </Container>
      ))}
    </Container>
  );
};

export default HitEffectsLayer; // Assuming default export
