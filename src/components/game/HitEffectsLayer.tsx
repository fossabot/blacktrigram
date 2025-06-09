// Hit effects layer for combat feedback

import React, { useState /*, useMemo // Unused */ } from "react";
import * as PIXI from "pixi.js";
import {
  Container,
  Graphics,
  Text,
  useTick /*, useApp // Unused */,
} from "@pixi/react";
import type { HitEffect, HitEffectsLayerProps, KoreanText } from "../../types"; // Add KoreanText import
import { HitEffectType } from "../../types/effects";
import { KOREAN_COLORS } from "../../types/constants";

const HitEffectsLayer: React.FC<HitEffectsLayerProps> = ({ effects }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useTick(() => {
    setCurrentTime(Date.now());
  });

  const activeEffects = effects.filter(
    (effect: HitEffect) =>
      currentTime - effect.timestamp < (effect.duration ?? 1000)
  );

  const getEffectColor = (effect: HitEffect): number => {
    if (effect.color) return effect.color;
    switch (effect.type) {
      case HitEffectType.CRITICAL_HIT:
        return KOREAN_COLORS.CRITICAL_HIT || KOREAN_COLORS.ACCENT_RED;
      case HitEffectType.VITAL_POINT_STRIKE:
        return KOREAN_COLORS.VITAL_POINT_HIT || KOREAN_COLORS.ACCENT_ORANGE;
      case HitEffectType.GENERAL_DAMAGE:
        return KOREAN_COLORS.ACCENT_RED;
      default:
        return effect.color || KOREAN_COLORS.ACCENT_RED;
    }
  };

  const getEffectSize = (effect: HitEffect): number => {
    let baseSize = effect.damageAmount || 10;
    switch (effect.type) {
      case HitEffectType.CRITICAL_HIT:
        return baseSize * 0.7 + 10;
      case HitEffectType.VITAL_POINT_STRIKE:
        return baseSize * 0.6 + 7;
      default:
        return baseSize * 0.5 + 5;
    }
  };

  const getEffectTextAndStyle = (
    effect: HitEffect,
    progress: number
  ): { textStr: string; style: PIXI.TextStyle } => {
    const text =
      typeof effect.text === "object"
        ? (effect.text as any).korean
        : effect.text || (effect.damageAmount ? `${effect.damageAmount}` : "");
    let fontSize = 16;
    let fill: number = KOREAN_COLORS.TEXT_PRIMARY;

    switch (effect.type) {
      case HitEffectType.CRITICAL_HIT:
        fontSize = 24;
        fill = KOREAN_COLORS.CRITICAL_HIT || KOREAN_COLORS.ACCENT_RED;
        break;
      case HitEffectType.VITAL_POINT_STRIKE:
        fontSize = 20;
        fill = KOREAN_COLORS.VITAL_POINT_HIT || KOREAN_COLORS.ACCENT_ORANGE;
        break;
      default:
        fill = getEffectColor(effect);
        break;
    }

    return {
      textStr: text,
      style: new PIXI.TextStyle({
        fill: fill,
        fontSize: fontSize * (1 - progress * 0.5),
        fontWeight: "bold",
        stroke: KOREAN_COLORS.BLACK,
        strokeThickness: 2,
        align: "center",
      }),
    };
  };

  return (
    <Container>
      {activeEffects.map((effect) => {
        const progress =
          (currentTime - effect.timestamp) / (effect.duration ?? 1000);
        const alpha = effect.alpha ?? 1 - progress; // Use effect.alpha if provided
        const { textStr, style } = getEffectTextAndStyle(effect, progress);
        const yOffset = (effect.yOffset ?? 0) - 30 * progress; // Use effect.yOffset

        return (
          <Container
            key={effect.id}
            x={effect.position?.x || 0}
            y={(effect.position?.y || 0) + yOffset}
            alpha={alpha}
          >
            <Graphics
              draw={(g: PIXI.Graphics) => {
                // Add type for g
                g.clear();
                g.beginFill(getEffectColor(effect), 0.8 * alpha);
                g.drawCircle(
                  0,
                  0,
                  getEffectSize(effect) * (1 + progress * 0.2)
                ); // Slightly different expansion
                g.endFill();
              }}
            />
            {textStr && (
              <Text text={textStr} anchor={{ x: 0.5, y: 0.5 }} style={style} />
            )}
          </Container>
        );
      })}
    </Container>
  );
};

export default HitEffectsLayer; // Assuming default export
