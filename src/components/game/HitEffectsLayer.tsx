// Hit effects layer for combat feedback

import React, { useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { HitEffect } from "../../types"; // Fix: Remove unused HitEffectType import
import { KOREAN_COLORS, FONT_FAMILY, FONT_SIZES } from "../../types/constants";

interface HitEffectsLayerProps {
  effects: readonly HitEffect[];
  currentTime?: number; // Fix: Add currentTime prop
}

export const HitEffectsLayer: React.FC<HitEffectsLayerProps> = ({
  effects,
  currentTime = Date.now(), // Fix: Use proper default
}) => {
  const textStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_ACCENT,
      }),
    []
  );

  // Fix: Filter effects with proper property access
  const activeEffects = useMemo(() => {
    return effects.filter(
      (effect: HitEffect) => currentTime - effect.timestamp < effect.duration
    );
  }, [effects, currentTime]);

  const getEffectColor = (effect: HitEffect): number => {
    switch (effect.type) {
      case "hit":
        return KOREAN_COLORS.ACCENT_RED;
      case "critical":
        return KOREAN_COLORS.ACCENT_GOLD;
      case "block":
        return KOREAN_COLORS.PRIMARY_CYAN;
      case "miss":
        return KOREAN_COLORS.TEXT_SECONDARY;
      default:
        return effect.color || KOREAN_COLORS.ACCENT_RED;
    }
  };

  const getEffectSize = (effect: HitEffect): number => {
    switch (effect.type) {
      case "critical":
        return 20;
      case "hit":
        return 15;
      case "block":
        return 12;
      case "miss":
        return 8;
      default:
        return (effect.damage || 10) * 0.5 + 5;
    }
  };

  return (
    <Container data-testid="hit-effects-layer">
      {activeEffects.map((effect: HitEffect) => {
        // Fix: Use proper property access with required properties
        const progress = (currentTime - effect.timestamp) / effect.duration;
        const alpha = Math.max(0, 1 - progress);
        const text = effect.text || (effect.damage ? `${effect.damage}` : "");
        const effectColor = getEffectColor(effect);
        const effectSize = getEffectSize(effect);

        return (
          <Container
            key={effect.id}
            x={effect.position.x}
            y={effect.position.y}
          >
            <Graphics
              draw={(g: PIXI.Graphics) => {
                g.clear();
                g.beginFill(effectColor, alpha * 0.8);
                g.drawCircle(0, 0, effectSize);
                g.endFill();
              }}
            />
            {text && (
              <Text
                text={text}
                anchor={0.5}
                style={{
                  ...textStyle,
                  fill: effectColor,
                }}
                alpha={alpha}
              />
            )}
          </Container>
        );
      })}
    </Container>
  );
};

export default HitEffectsLayer;
