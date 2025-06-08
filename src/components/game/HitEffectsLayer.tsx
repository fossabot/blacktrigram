// Hit effects layer for combat feedback

import React, { useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { HitEffect } from "../../types";
import { HitEffectType } from "../../types/enums";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  GAME_CONFIG,
  FONT_WEIGHTS,
} from "../../types/constants";

export interface HitEffectsLayerProps {
  readonly effects: readonly HitEffect[];
  readonly width?: number;
  readonly height?: number;
  readonly currentTime?: number; // Add missing property
}

const getEffectColor = (effect: HitEffect): number => {
  switch (effect.type) {
    case HitEffectType.HEAVY:
      return KOREAN_COLORS.ACCENT_RED;
    case HitEffectType.MEDIUM:
      return KOREAN_COLORS.ACCENT_ORANGE;
    case HitEffectType.LIGHT:
      return KOREAN_COLORS.ACCENT_YELLOW;
    case HitEffectType.PERFECT:
      return KOREAN_COLORS.ACCENT_GOLD;
    case HitEffectType.CRITICAL:
      return KOREAN_COLORS.NEGATIVE_RED;
    case HitEffectType.MISS:
      return KOREAN_COLORS.UI_GRAY; // Fix: use existing color
    case HitEffectType.NORMAL:
    default:
      return KOREAN_COLORS.TEXT_PRIMARY;
  }
};

// Add missing utility functions
const getEffectSize = (effect: HitEffect): number => {
  switch (effect.type) {
    case HitEffectType.HEAVY:
      return 32;
    case HitEffectType.MEDIUM:
      return 24;
    case HitEffectType.LIGHT:
      return 16;
    case HitEffectType.PERFECT:
      return 40;
    case HitEffectType.CRITICAL:
      return 48;
    case HitEffectType.MISS:
      return 12;
    case HitEffectType.NORMAL:
    default:
      return 20;
  }
};

export const HitEffectsLayer: React.FC<HitEffectsLayerProps> = ({
  effects,
  currentTime = Date.now(), // Provide default value
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
}) => {
  const activeEffects = useMemo(
    () =>
      effects.filter(
        (effect: HitEffect) => currentTime - effect.timestamp < effect.duration
      ),
    [effects, currentTime]
  );

  const effectTextStyle = useMemo(
    () => (effect: HitEffect) =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: getEffectSize(effect) * 0.8,
        fill: getEffectColor(effect),
        fontWeight: FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight,
        stroke: KOREAN_COLORS.BLACK_SOLID,
        dropShadow: {
          color: KOREAN_COLORS.BLACK_SOLID, // Fix: use dropShadow object format
          blur: 5,
          angle: Math.PI / 4,
          distance: 3,
        },
        align: "center",
      }),
    []
  );

  return (
    <Container width={width} height={height}>
      {activeEffects.map((effect: HitEffect) => {
        const progress = (currentTime - effect.timestamp) / effect.duration;
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
            {/* Effect visuals */}
            <Graphics
              draw={(g: PIXI.Graphics) => {
                g.clear();
                const color = getEffectColor(effect);
                const size = getEffectSize(effect);
                g.beginFill(color, 0.6);
                g.drawCircle(0, 0, size);
                g.endFill();
              }}
            />

            {/* Damage text */}
            {text && (
              <Text
                text={text}
                anchor={0.5}
                style={effectTextStyle(effect)}
                y={-getEffectSize(effect) * 0.5}
              />
            )}
          </Container>
        );
      })}
    </Container>
  );
};
