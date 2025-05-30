import React from "react";
import { Container, Text } from "@pixi/react";
import { useState, useCallback, useEffect } from "react";
import type { HitEffect } from "../../types";
import { KOREAN_COLORS } from "../../types";

// Fix props interface
export interface HitEffectsLayerProps {
  readonly effects: readonly HitEffect[]; // Add effects prop
  readonly onEffectComplete?: (effectId: string) => void;
}

export function HitEffectsLayer({
  effects,
  onEffectComplete,
}: HitEffectsLayerProps): React.ReactElement {
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 16); // ~60 FPS

    return () => clearInterval(interval);
  }, []);

  // Remove completed effects
  useEffect(() => {
    effects.forEach((effect) => {
      const elapsed = currentTime - effect.startTime;
      if (elapsed >= effect.duration && onEffectComplete) {
        onEffectComplete(effect.id);
      }
    });
  }, [currentTime, effects, onEffectComplete]);

  // Fix color assignments in getEffectColor
  const getEffectColor = useCallback((effect: HitEffect): string => {
    let effectColor: string = KOREAN_COLORS.WHITE;

    if (effect.damage > 30) {
      effectColor = KOREAN_COLORS.CRITICAL_RED;
    } else if (effect.damage > 20) {
      effectColor = KOREAN_COLORS.DAMAGE_YELLOW;
    } else if (effect.damage > 10) {
      effectColor = KOREAN_COLORS.Orange;
    } else if (effect.damage > 5) {
      effectColor = KOREAN_COLORS.GOLD;
    } else {
      effectColor = KOREAN_COLORS.CYAN;
    }

    return effectColor;
  }, []);

  return (
    <Container data-testid="hit-effects-layer">
      {effects.map((effect) => {
        const elapsed = Date.now() - effect.startTime;
        // Remove unused progress variable or use it
        const alpha = Math.max(0, 1 - elapsed / effect.duration);
        const yOffset = (elapsed / effect.duration) * 20;

        return (
          <Text
            key={effect.id}
            text={`${effect.damage}`}
            anchor={{ x: 0.5, y: 0.5 }}
            x={effect.position.x}
            y={effect.position.y - yOffset}
            alpha={alpha}
            style={
              {
                fontFamily: "Noto Sans KR, Arial, sans-serif",
                fontSize: Math.max(16, Math.min(effect.damage / 2 + 12, 32)),
                fill: getEffectColor(effect),
                fontWeight: "bold",
                stroke: "#000000",
                strokeThickness: 2,
              } as any
            }
          />
        );
      })}
    </Container>
  );
}
