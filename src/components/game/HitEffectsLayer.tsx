// Hit effects layer for combat feedback

import React from "react";
import { Container, Text, Graphics } from "@pixi/react";
import { KOREAN_COLORS } from "../../types";
import type { HitEffectsLayerProps } from "../../types/components";

interface HitEffect {
  id: string;
  x: number;
  y: number;
  damage: number;
  type: "light" | "medium" | "heavy" | "critical";
  startTime: number;
  duration: number;
}

export function HitEffectsLayer({
  effects,
  duration = 1000,
}: HitEffectsLayerProps): React.JSX.Element {
  const currentTime = Date.now();

  // Filter active effects based on duration
  const activeEffects = effects.filter((effect: any) => {
    const effectStartTime = effect.startTime || effect.createdAt || currentTime;
    const effectDuration = effect.duration || duration;
    return currentTime - effectStartTime < effectDuration;
  });

  const renderDamageNumber = React.useCallback(
    (effect: any, index: number) => {
      const effectStartTime =
        effect.startTime || effect.createdAt || currentTime;
      const elapsed = currentTime - effectStartTime;
      const progress = elapsed / (effect.duration || duration);

      // Calculate animation values
      const opacity = Math.max(0, 1 - progress);
      const yOffset = progress * 50; // Float upward
      const scale = 1 + progress * 0.5; // Grow slightly

      // Determine color based on effect type or damage
      let color = KOREAN_COLORS.WHITE;
      if (effect.type === "critical" || effect.damage > 35) {
        color = KOREAN_COLORS.CRITICAL_HIT;
      } else if (effect.type === "heavy" || effect.damage > 25) {
        color = KOREAN_COLORS.DANGER_RED;
      } else if (effect.type === "medium" || effect.damage > 15) {
        color = KOREAN_COLORS.WARNING_ORANGE;
      }

      const damageTextStyle = {
        fontSize: 18 + (effect.damage || 0) * 0.2,
        fill: color,
        stroke: KOREAN_COLORS.BLACK,
        strokeWidth: 2,
        fontWeight: 700 as const, // Use number instead of string
        fontFamily: "Arial, sans-serif",
      };

      return (
        <Container
          key={effect.id || index}
          x={effect.x || effect.position?.x || 0}
          y={(effect.y || effect.position?.y || 0) - yOffset}
          alpha={opacity}
          scale={{ x: scale, y: scale }}
        >
          <Text
            text={`-${Math.round(effect.damage || 0)}`}
            style={damageTextStyle}
          />

          {/* Add Korean text for critical hits */}
          {(effect.type === "critical" || effect.damage > 35) && (
            <Text
              text="치명타!"
              y={25}
              style={{
                fontSize: 12,
                fill: KOREAN_COLORS.GOLD,
                fontFamily: "Arial, sans-serif",
              }}
            />
          )}
        </Container>
      );
    },
    [currentTime, duration]
  );

  const renderImpactEffect = React.useCallback(
    (effect: any, index: number) => {
      const effectStartTime =
        effect.startTime || effect.createdAt || currentTime;
      const elapsed = currentTime - effectStartTime;
      const progress = elapsed / (effect.duration || duration);

      if (progress > 1) return null;

      const opacity = Math.max(0, 1 - progress);
      const radius = 10 + progress * 30;

      const drawImpact = (g: any) => {
        g.clear();
        g.lineStyle(3, effect.color || KOREAN_COLORS.WARNING_ORANGE, opacity);
        g.drawCircle(0, 0, radius);

        // Add inner flash for critical hits
        if (effect.type === "critical") {
          g.beginFill(KOREAN_COLORS.CRITICAL_HIT, opacity * 0.3);
          g.drawCircle(0, 0, radius * 0.5);
          g.endFill();
        }
      };

      return (
        <Graphics
          key={`impact-${effect.id || index}`}
          x={effect.x || effect.position?.x || 0}
          y={effect.y || effect.position?.y || 0}
          draw={drawImpact}
        />
      );
    },
    [currentTime, duration]
  );

  return (
    <Container>
      {/* Render damage numbers */}
      {activeEffects.map((effect: any, index: number) =>
        renderDamageNumber(effect, index)
      )}

      {/* Render impact effects */}
      {activeEffects.map((effect: any, index: number) =>
        renderImpactEffect(effect, index)
      )}
    </Container>
  );
}
