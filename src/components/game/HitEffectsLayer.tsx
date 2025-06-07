// Hit effects layer for combat feedback

import React, { useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  KOREAN_TEXT_SIZES,
  GAME_CONFIG,
  FONT_SIZES,
} from "../../types/constants"; // FONT_SIZES changed to KOREAN_TEXT_SIZES
import * as PIXI from "pixi.js";
import type { HitEffect } from "../../types";

interface HitEffectsLayerProps {
  effects: readonly HitEffect[];
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export const HitEffectsLayer: React.FC<HitEffectsLayerProps> = ({
  effects,
  x = 0,
  y = 0,
  width = 800,
  height = 600,
}) => {
  const baseStyle = new PIXI.TextStyle({
    fontFamily: FONT_FAMILY.PRIMARY,
    fontSize: KOREAN_TEXT_SIZES.medium,
    fill: KOREAN_COLORS.WHITE_SOLID,
    fontWeight: "normal",
    stroke: { color: KOREAN_COLORS.BLACK_SOLID, width: 2 },
    dropShadow: {
      color: KOREAN_COLORS.BLACK_SOLID,
      blur: 4,
      distance: 2,
    },
  });

  const getEffectStyle = (
    effectType: HitEffectType
  ): Partial<PIXI.TextStyleOptions> => {
    switch (effectType) {
      case "light":
        return {
          ...baseStyle,
          fontSize: KOREAN_TEXT_SIZES.small, // Use KOREAN_TEXT_SIZES
          fill: KOREAN_COLORS.TEXT_SECONDARY,
        };
      case "medium":
        return {
          ...baseStyle,
          fontSize: KOREAN_TEXT_SIZES.medium, // Use KOREAN_TEXT_SIZES
          fill: KOREAN_COLORS.SECONDARY_YELLOW, // Corrected Color
          stroke: { color: KOREAN_COLORS.BLACK_SOLID, width: 1 },
        };
      case "heavy":
        return {
          ...baseStyle,
          fontSize: KOREAN_TEXT_SIZES.large, // Use KOREAN_TEXT_SIZES
          fill: KOREAN_COLORS.NEGATIVE_RED,
          fontWeight: "bold",
          stroke: { color: KOREAN_COLORS.BLACK_SOLID, width: 2 },
          dropShadow: {
            color: KOREAN_COLORS.BLACK_SOLID,
            blur: 5,
            distance: 3,
          },
        };
      case "critical":
        return {
          ...baseStyle,
          fontSize: KOREAN_TEXT_SIZES.xlarge, // Use KOREAN_TEXT_SIZES
          fill: KOREAN_COLORS.ACCENT_RED,
          fontWeight: "bold",
          stroke: { color: KOREAN_COLORS.BLACK_SOLID, width: 2 },
          dropShadow: {
            color: KOREAN_COLORS.BLACK_SOLID,
            blur: 5,
            distance: 3,
          },
        };
      case "block":
        return {
          ...baseStyle,
          fontSize: KOREAN_TEXT_SIZES.medium, // Use KOREAN_TEXT_SIZES
          fill: KOREAN_COLORS.PRIMARY_BLUE,
        };
      case "miss":
        return {
          ...baseStyle,
          fontSize: KOREAN_TEXT_SIZES.small, // Use KOREAN_TEXT_SIZES
          fill: KOREAN_COLORS.UI_GRAY,
        };
      default:
        return baseStyle;
    }
  };

  const drawEffectShape = (g: PIXI.Graphics, effect: HitEffect) => {
    // Added PIXI.Graphics type
    g.clear();
    const size =
      effect.type === "critical" ? 20 : effect.type === "heavy" ? 15 : 10;
    const alpha = 1 - (Date.now() - effect.timestamp) / effect.duration;

    if (alpha <= 0) return;

    g.beginFill(effect.color || KOREAN_COLORS.ACCENT_RED, alpha * 0.5);
    g.drawCircle(effect.position.x, effect.position.y, size);
    g.endFill();
  };

  const drawEffect = (g: PIXI.Graphics, effect: HitEffect) => {
    g.clear();

    const age = Date.now() - effect.timestamp;
    const progress = Math.min(1, age / effect.duration);
    const alpha = Math.max(0, 1 - progress);

    // Calculate floating animation
    const floatOffset = progress * 40; // Float upward
    const scale = 1 + progress * 0.5; // Scale up slightly

    const effectX = effect.position.x;
    const effectY = effect.position.y - floatOffset;

    switch (effect.type) {
      case "critical":
        // Critical hit burst effect
        g.beginFill(
          effect.color || KOREAN_COLORS.SECONDARY_YELLOW_LIGHT,
          alpha * 0.8
        );
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI * 2) / 8;
          const radius = 20 * scale;
          const x = effectX + Math.cos(angle) * radius;
          const y = effectY + Math.sin(angle) * radius;
          g.drawCircle(x, y, 3 * scale);
        }
        g.endFill();

        // Central glow
        g.beginFill(KOREAN_COLORS.WHITE_SOLID, alpha * 0.6);
        g.drawCircle(effectX, effectY, 8 * scale);
        g.endFill();
        break;

      case "heavy":
        // Heavy impact ripples
        g.beginFill(effect.color || KOREAN_COLORS.NEGATIVE_RED, alpha * 0.6);
        for (let i = 0; i < 3; i++) {
          const rippleRadius = (10 + i * 5) * scale;
          g.drawCircle(effectX, effectY, rippleRadius);
        }
        g.endFill();
        break;

      case "medium":
        // Medium impact flash
        g.beginFill(
          effect.color || KOREAN_COLORS.SECONDARY_YELLOW,
          alpha * 0.5
        );
        g.drawCircle(effectX, effectY, 15 * scale);
        g.endFill();
        break;

      case "light":
      default:
        // Light impact sparkle
        g.beginFill(effect.color || KOREAN_COLORS.PRIMARY_CYAN, alpha * 0.4);
        g.drawCircle(effectX, effectY, 8 * scale);
        g.endFill();
        break;
    }
  };

  const activeEffects = effects.filter(
    (effect) => Date.now() - effect.timestamp < effect.duration
  );

  return (
    <Container x={x} y={y} width={width} height={height}>
      {activeEffects.map((effect) => {
        const age = Date.now() - effect.timestamp;
        const progress = Math.min(1, age / effect.duration);
        const alpha = Math.max(0, 1 - progress);
        const floatOffset = progress * 40;

        return (
          <Container key={effect.id} alpha={alpha}>
            <Graphics draw={(g) => drawEffect(g, effect)} />

            {/* Damage number text */}
            <Text
              text={`-${effect.damage}`}
              x={effect.position.x}
              y={effect.position.y - floatOffset - 10}
              anchor={0.5}
              style={
                effect.type === "critical" ? criticalTextStyle : damageTextStyle
              }
            />

            {/* Critical hit Korean text */}
            {effect.type === "critical" && (
              <Text
                text="급소!"
                x={effect.position.x}
                y={effect.position.y - floatOffset + 20}
                anchor={0.5}
                style={{
                  ...criticalTextStyle,
                  fontSize: FONT_SIZES.medium,
                  fill: KOREAN_COLORS.WHITE_SOLID,
                }}
              />
            )}
          </Container>
        );
      })}
    </Container>
  );
};

export default HitEffectsLayer;
