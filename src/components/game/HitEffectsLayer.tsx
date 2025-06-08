// Hit effects layer for combat feedback

import React, { useCallback, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { HitEffect, HitEffectsLayerProps } from "../../types";
import { HitEffectType } from "../../types/enums";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  PIXI_FONT_WEIGHTS, // Use this for PIXI.TextStyle fontWeight
  GAME_CONFIG,
} from "../../types/constants";
import { blendColors } from "../../utils/colorUtils";

export interface HitEffectsLayerProps {
  readonly effects: readonly HitEffect[];
  readonly width?: number;
  readonly height?: number;
}

const getEffectIntensity = (effect: HitEffect): number => {
  if (effect.isCritical) return 1.0;
  if (
    effect.type === HitEffectType.HEAVY ||
    effect.type === HitEffectType.CRITICAL
  )
    return 0.8; // Corrected
  if (effect.type === HitEffectType.MEDIUM) return 0.6; // Corrected
  if (effect.type === HitEffectType.LIGHT) return 0.4; // Corrected
  return 0.5; // Default intensity
};

const getEffectColor = (effectType: HitEffectType): number => {
  switch (effectType) {
    case HitEffectType.CRITICAL: // Corrected
      return KOREAN_COLORS.ACCENT_RED;
    case HitEffectType.HEAVY: // Corrected
      return KOREAN_COLORS.WARNING_ORANGE;
    case HitEffectType.MEDIUM: // Corrected
      return KOREAN_COLORS.ACCENT_YELLOW;
    case HitEffectType.LIGHT: // Corrected
      return KOREAN_COLORS.TEXT_PRIMARY;
    case HitEffectType.PERFECT:
      return KOREAN_COLORS.ACCENT_GOLD;
    case HitEffectType.COUNTER:
      return KOREAN_COLORS.PRIMARY_BLUE;
    case HitEffectType.BLOCK:
      return KOREAN_COLORS.UI_BORDER;
    case HitEffectType.MISS:
      return KOREAN_COLORS.TEXT_SECONDARY;
    case HitEffectType.NORMAL:
    default:
      return KOREAN_COLORS.TEXT_PRIMARY;
  }
};

export const HitEffectsLayer: React.FC<HitEffectsLayerProps> = ({
  effects,
  currentTime,
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
}) => {
  const activeEffects = useMemo(
    () =>
      effects.filter(
        (effect: HitEffect) => currentTime - effect.timestamp < effect.duration // Added HitEffect type
      ),
    [effects, currentTime]
  );

  const getEffectSize = useCallback((effect: HitEffect): number => {
    if (
      effect.type === HitEffectType.PERFECT ||
      effect.type === HitEffectType.CRITICAL
    ) {
      return 30;
    }
    return effect.type === HitEffectType.HEAVY
      ? 25
      : effect.type === HitEffectType.MEDIUM
      ? 20
      : effect.type === HitEffectType.LIGHT
      ? 15
      : effect.type === HitEffectType.COUNTER
      ? 22
      : effect.type === HitEffectType.BLOCK
      ? 18
      : effect.type === HitEffectType.MISS
      ? 12
      : 15; // Default size
  }, []);

  const effectTextStyle = useMemo(
    () => (effect: HitEffect) =>
      new PIXI.TextStyle({ // Using PIXI.TextStyle directly
        fontFamily: FONT_FAMILY.CYBER,
        fontSize: getEffectSize(effect) * 0.8,
        fill: getEffectColor(effect.type),
        fontWeight: PIXI_FONT_WEIGHTS.bold,
        stroke: KOREAN_COLORS.BLACK_SOLID,
        strokeThickness: 3, // This is valid for PIXI.TextStyle
        dropShadow: true,
        dropShadowColor: KOREAN_COLORS.BLACK_SOLID,
        dropShadowBlur: 5,
        dropShadowAngle: Math.PI / 4,
        dropShadowDistance: 3,
        align: "center",
      }),
    [getEffectSize]
  );

  const drawSparkEffect = useCallback(
    (g: PIXI.Graphics, effect: HitEffect) => {
      g.clear();
      const intensity = getEffectIntensity(effect);
      const color = getEffectColor(effect.type); // effect.type is HitEffectType
      const size = getEffectSize(effect); // Use getEffectSize

      const numSparks = Math.floor(intensity * 10 + 5);
      for (let i = 0; i < numSparks; i++) {
        const angle = Math.random() * Math.PI * 2;
        const length = Math.random() * size * 1.5 * intensity + size * 0.5;
        const sparkX = Math.cos(angle) * length;
        const sparkY = Math.sin(angle) * length;
        g.lineStyle(Math.random() * 2 + 1, color, Math.random() * 0.5 + 0.5)
          .moveTo(0, 0)
          .lineTo(sparkX, sparkY);
      }
    },
    [getEffectSize]
  );

  const drawImpactRing = useCallback(
    (g: PIXI.Graphics, effect: HitEffect, progress: number) => {
      g.clear();
      if (effect.type === HitEffectType.MISS) {
        // Use enum for comparison
        return; // No ring for misses
      }
      const color = getEffectColor(effect.type); // effect.type is HitEffectType
      const baseSize = getEffectSize(effect); // Use getEffectSize
      const currentRadius = baseSize * (1 + progress * 2);
      const alpha = 1 - progress;
      const lineWidth = Math.max(1, baseSize * 0.2 * (1 - progress));

      g.lineStyle(lineWidth, color, alpha).drawCircle(0, 0, currentRadius);

      if (effect.type === HitEffectType.BLOCK) {
        // Use enum for comparison
        // Add a shield-like segment for blocks
        g.lineStyle(
          lineWidth + 2,
          blendColors(color, KOREAN_COLORS.PRIMARY_CYAN, 0.5),
          alpha * 0.7
        ).arc(0, 0, currentRadius * 0.8, -Math.PI / 3, Math.PI / 3);
      }
    },
    [getEffectSize]
  );

  return (
    <Container width={width} height={height}>
      {activeEffects.map((effect: HitEffect) => {
        // Added HitEffect type
        const progress = (Date.now() - effect.timestamp) / effect.duration;
        const opacity = 1 - progress;
        const scale = 1 + progress * 0.5;
        const text = effect.text || (effect.damage ? `${effect.damage}` : "");

        return (
          <Container
            key={effect.id}
            x={effect.position.x}
            y={effect.position.y - progress * 30}
            alpha={opacity}
            scale={scale}
          >
            {/* Spark/Impact Visual */}
            {effect.type !== HitEffectType.MISS &&
              effect.type !== HitEffectType.BLOCK && (
                <Graphics
                  draw={(g: PIXI.Graphics) => drawSparkEffect(g, effect)}
                />
              )}
            <Graphics
              draw={(g: PIXI.Graphics) => drawImpactRing(g, effect, progress)}
            />

            {/* Damage Text / Effect Text */}
            {text && (
              <Text
                text={text}
                anchor={0.5}
                style={effectTextStyle(effect)}
                y={-getEffectSize(effect) * 0.5} // Position text above impact
              />
            )}
          </Container>
        );
      })}
    </Container>
  );
};
