// Hit effects layer for combat feedback

import React, { useEffect, useState } from "react";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import type { DisplayHitEffect, HitEffectType } from "../../../types/effects";
import { HitEffectType as HET } from "../../../types/effects";
import { KOREAN_COLORS } from "../../../types/constants";
import type { HitEffectsLayerProps } from "../../../types/components";

export const HitEffectsLayer: React.FC<HitEffectsLayerProps> = ({
  effects,
  onEffectComplete,
}) => {
  usePixiExtensions();

  const [displayEffects, setDisplayEffects] = useState<DisplayHitEffect[]>([]);

  useEffect(() => {
    // Update display effects with all required properties
    const updatedEffects = effects.map(
      (effect) =>
        ({
          ...effect,
          opacity: Math.max(
            0,
            1 - (Date.now() - effect.timestamp) / effect.duration
          ),
          scale: 1 + ((Date.now() - effect.timestamp) / effect.duration) * 0.5,
          startTime: effect.timestamp,
          displayAlpha: 1,
          displayY: effect.position?.y || 0,
          displaySize: 1,
          attackerId: effect.attackerId || "unknown",
          defenderId: effect.defenderId || "unknown",
        } satisfies DisplayHitEffect)
    );

    setDisplayEffects(updatedEffects);

    // Clean up expired effects
    effects.forEach((effect) => {
      if (Date.now() - effect.timestamp > effect.duration) {
        onEffectComplete(effect.id);
      }
    });
  }, [effects, onEffectComplete]);

  // Get effect color based on type
  const getEffectColor = (type: HitEffectType): number => {
    switch (type) {
      case HET.HIT:
        return KOREAN_COLORS.ACCENT_YELLOW;
      case HET.CRITICAL_HIT:
        return KOREAN_COLORS.CRITICAL_HIT;
      case HET.TECHNIQUE_HIT:
        return KOREAN_COLORS.ACCENT_GOLD;
      case HET.VITAL_POINT_HIT:
        return KOREAN_COLORS.ACCENT_PURPLE;
      case HET.STUN:
        return KOREAN_COLORS.WARNING_YELLOW;
      case HET.KO:
        return KOREAN_COLORS.NEGATIVE_RED;
      default:
        return KOREAN_COLORS.TEXT_PRIMARY;
    }
  };

  // Get effect text based on type
  const getEffectText = (type: HitEffectType): string => {
    switch (type) {
      case HET.HIT:
        return "타격!";
      case HET.CRITICAL_HIT:
        return "치명타!";
      case HET.TECHNIQUE_HIT:
        return "기술!";
      case HET.VITAL_POINT_HIT:
        return "급소!";
      case HET.STUN:
        return "기절!";
      case HET.KO:
        return "KO!";
      default:
        return "효과";
    }
  };

  return (
    <pixiContainer data-testid="hit-effects-layer">
      {displayEffects.map((effect) => (
        <pixiContainer
          key={effect.id}
          x={effect.position?.x || 0}
          y={effect.displayY}
          alpha={effect.opacity}
        >
          {/* Main effect text */}
          <pixiText
            text={effect.text || getEffectText(effect.type)}
            style={{
              fontSize: 16 * effect.scale,
              fill: getEffectColor(effect.type),
              fontWeight: "bold",
              align: "center",
            }}
            anchor={0.5}
          />

          {/* Special effects for different types */}
          {effect.type === HET.CRITICAL_HIT && (
            <pixiGraphics
              draw={(g) => {
                g.clear();
                g.stroke({
                  width: 2,
                  color: KOREAN_COLORS.CRITICAL_HIT,
                  alpha: effect.opacity * 0.8,
                });
                g.circle(0, 0, 30 * effect.scale);
                g.stroke();
              }}
            />
          )}

          {effect.type === HET.VITAL_POINT_HIT && (
            <pixiGraphics
              draw={(g) => {
                g.clear();
                g.stroke({
                  width: 3,
                  color: KOREAN_COLORS.ACCENT_PURPLE,
                  alpha: effect.opacity,
                });
                g.star(0, 0, 5, 20 * effect.scale, 10 * effect.scale);
                g.stroke();
              }}
            />
          )}
        </pixiContainer>
      ))}
    </pixiContainer>
  );
};

export default HitEffectsLayer;
