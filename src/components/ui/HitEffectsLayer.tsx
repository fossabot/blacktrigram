import React, { useEffect, useState } from "react"; // Fix: Remove unused useMemo import
import { Container, Graphics, Text } from "@pixi/react";
import type { HitEffect, DisplayHitEffect } from "../../types/effects";
import { KOREAN_COLORS } from "../../types/constants"; // Fix: Remove unused FONT_SIZES import
import * as PIXI from "pixi.js";
import { usePixiExtensions } from "../../utils/pixiExtensions";

interface HitEffectsLayerProps {
  effects: readonly HitEffect[];
  onEffectComplete?: (effectId: string) => void;
  width?: number;
  height?: number;
}

export const HitEffectsLayer: React.FC<HitEffectsLayerProps> = ({
  effects,
  onEffectComplete,
  width = 800,
  height = 600,
}) => {
  usePixiExtensions();

  // Fix: Use the parameters
  React.useEffect(() => {
    effects.forEach((effect) => {
      if (effect.duration <= 0) {
        onEffectComplete?.(effect.id);
      }
    });
  }, [effects, onEffectComplete]);

  // Fix: Use width and height parameters instead of unused containerBounds
  React.useEffect(() => {
    console.log(`Effects layer bounds: ${width}x${height}`);
  }, [width, height]);

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

  const getEffectColor = (type: string): number => {
    switch (type) {
      case "critical_hit":
        return KOREAN_COLORS.CRITICAL_HIT;
      case "vital_point_strike":
        return KOREAN_COLORS.VITAL_POINT_HIT;
      case "block":
        return KOREAN_COLORS.BLOCKED_ATTACK;
      case "miss":
        return KOREAN_COLORS.UI_GRAY;
      default:
        return KOREAN_COLORS.TEXT_PRIMARY;
    }
  };

  return (
    <Container data-testid="hit-effects-layer">
      {displayEffects.map((effect) => {
        const color = getEffectColor(effect.type);
        const alpha = Math.max(0, Math.min(1, effect.alpha || 1));
        const size = (effect.size || 1) * effect.intensity;

        return (
          <Container
            key={effect.id}
            x={effect.position?.x || 0}
            y={effect.position?.y || 0}
            alpha={alpha}
          >
            <Graphics
              draw={(g: PIXI.Graphics) => {
                g.clear();
                g.beginFill(color, 0.8);
                g.drawCircle(0, 0, 10 * size);
                g.endFill();

                // Add glow effect
                g.lineStyle(2, color, 0.6);
                g.drawCircle(0, 0, 15 * size);
              }}
            />

            {effect.text && (
              <Text
                text={
                  typeof effect.text === "string"
                    ? effect.text
                    : effect.text.korean
                }
                style={
                  new PIXI.TextStyle({
                    fontSize: 12 * size,
                    fill: color,
                    fontWeight: "bold",
                    align: "center",
                  })
                }
                anchor={0.5}
                y={-20 * size}
              />
            )}
          </Container>
        );
      })}
    </Container>
  );
};

export default HitEffectsLayer; // Assuming default export
