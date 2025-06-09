import React, { useEffect, useState } from "react";
import { Container, Graphics, Text, useApp } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { HitEffect } from "../../types"; // Remove unused KoreanText import
import { KOREAN_COLORS } from "../../types/constants";

// Define local DisplayHitEffect type
interface DisplayHitEffect extends HitEffect {
  displayAlpha: number;
  displaySize: number;
  displayY: number;
}

interface HitEffectsLayerProps {
  effects: readonly HitEffect[];
  // ... other props
}

const HitEffectsLayer: React.FC<HitEffectsLayerProps> = ({ effects }) => {
  const app = useApp();
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
  }, [effects, app.ticker.lastTime]); // Update based on ticker for smoother animations

  return (
    <Container>
      {displayEffects.map((effect) => (
        <Container
          key={effect.id}
          x={effect.position?.x || 0}
          y={effect.displayY}
          alpha={effect.displayAlpha}
        >
          <Graphics
            draw={(g: PIXI.Graphics) => {
              g.clear();
              g.beginFill(effect.color || KOREAN_COLORS.ACCENT_RED, 0.8); // Use effect.color
              g.drawCircle(0, 0, effect.displaySize);
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
                  stroke: KOREAN_COLORS.BLACK_SOLID,
                  strokeThickness: 2,
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
