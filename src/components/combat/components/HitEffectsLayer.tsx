// Hit effects layer for combat feedback

import React, { useEffect, useState, useCallback } from "react";
import { extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import type { DisplayHitEffect } from "../../../types/effects";
import { KOREAN_COLORS } from "../../../types/constants";
import type { HitEffectsLayerProps } from "../../../types/components";

extend({ Container, Graphics, Text });

export const HitEffectsLayer: React.FC<HitEffectsLayerProps> = ({
  effects,
  onEffectComplete,
}) => {
  const [displayEffects, setDisplayEffects] = useState<DisplayHitEffect[]>([]);

  // Update display effects with proper animation calculations
  useEffect(() => {
    const updatedEffects = effects.map((effect) => {
      const elapsed = Date.now() - effect.timestamp;
      const progress = elapsed / effect.duration;

      return {
        ...effect,
        opacity: Math.max(0, 1 - progress),
        scale: 1 + progress * 0.5,
        displayAlpha: Math.max(0, 1 - progress),
        displayY: (effect.position?.y || 0) - progress * 30, // Float upward
        displaySize: 1 + progress * 0.3,
        startTime: effect.timestamp,
        attackerId: effect.attackerId || "unknown",
        defenderId: effect.defenderId || "unknown",
      } satisfies DisplayHitEffect;
    });

    setDisplayEffects(updatedEffects);

    // Clean up expired effects
    effects.forEach((effect) => {
      if (Date.now() - effect.timestamp > effect.duration) {
        onEffectComplete(effect.id);
      }
    });
  }, [effects, onEffectComplete]);

  // Enhanced effect drawing
  const drawEffect = useCallback(
    (effect: DisplayHitEffect) => {
      const effectText = getEffectText(effect);
      const effectColor = getEffectColor(effect);

      return (
        <pixiContainer
          key={effect.id}
          x={effect.position?.x || 0}
          y={effect.displayY}
          alpha={effect.opacity}
          scale={{ x: effect.scale, y: effect.scale }}
          data-testid={`hit-effect-${effect.id}`}
        >
          {/* Main effect text */}
          <pixiText
            text={effectText.korean}
            style={{
              fontSize: 18 * effect.displaySize,
              fill: effectColor,
              fontWeight: "bold",
              align: "center",
              fontFamily: '"Noto Sans KR", Arial, sans-serif',
              stroke: { color: 0x000000, width: 2 },
            }}
            anchor={0.5}
          />

          {/* English subtitle */}
          <pixiText
            text={effectText.english}
            style={{
              fontSize: 12 * effect.displaySize,
              fill: effectColor,
              align: "center",
              fontStyle: "italic",
              stroke: { color: 0x000000, width: 1 },
            }}
            anchor={0.5}
            y={20 * effect.displaySize}
            alpha={0.8}
          />

          {/* Enhanced visual effects for critical hits */}
          {effect.type === "critical_hit" && (
            <pixiGraphics
              draw={(g) => {
                g.clear();

                // Radiating impact lines
                for (let i = 0; i < 8; i++) {
                  const angle = (i / 8) * Math.PI * 2;
                  const length = 30 * effect.displaySize;
                  const startX = Math.cos(angle) * 10;
                  const startY = Math.sin(angle) * 10;
                  const endX = Math.cos(angle) * length;
                  const endY = Math.sin(angle) * length;

                  g.stroke({
                    width: 3,
                    color: effectColor,
                    alpha: effect.opacity * 0.8,
                  });
                  g.moveTo(startX, startY);
                  g.lineTo(endX, endY);
                  g.stroke();
                }

                // Impact circle
                g.stroke({
                  width: 4,
                  color: effectColor,
                  alpha: effect.opacity * 0.6,
                });
                g.circle(0, 0, 25 * effect.displaySize);
                g.stroke();
              }}
            />
          )}

          {/* Martial arts technique effects */}
          {effect.type === "technique_hit" && (
            <pixiGraphics
              draw={(g) => {
                g.clear();

                // Traditional Korean brush stroke effect
                g.stroke({
                  width: 6,
                  color: KOREAN_COLORS.ACCENT_GOLD,
                  alpha: effect.opacity * 0.7,
                });

                // Draw stylized brush strokes
                g.moveTo(-20 * effect.displaySize, -5);
                g.bezierCurveTo(
                  -10 * effect.displaySize,
                  -15 * effect.displaySize,
                  10 * effect.displaySize,
                  15 * effect.displaySize,
                  20 * effect.displaySize,
                  5
                );
                g.stroke();
              }}
            />
          )}

          {/* Block/parry effects */}
          {effect.type === "block" && (
            <pixiGraphics
              draw={(g) => {
                g.clear();

                // Shield-like defensive pattern
                g.fill({
                  color: KOREAN_COLORS.PRIMARY_BLUE,
                  alpha: effect.opacity * 0.6,
                });
                g.rect(
                  -15 * effect.displaySize,
                  -20 * effect.displaySize,
                  30 * effect.displaySize,
                  40 * effect.displaySize
                );
                g.fill();

                g.stroke({
                  width: 2,
                  color: KOREAN_COLORS.ACCENT_GOLD,
                  alpha: effect.opacity,
                });
                g.rect(
                  -15 * effect.displaySize,
                  -20 * effect.displaySize,
                  30 * effect.displaySize,
                  40 * effect.displaySize
                );
                g.stroke();
              }}
            />
          )}
        </pixiContainer>
      );
    },
    [effects]
  );

  // Get Korean and English text for effects
  const getEffectText = (effect: DisplayHitEffect) => {
    switch (effect.type) {
      case "critical_hit":
        return { korean: "치명타!", english: "Critical Hit!" };
      case "hit":
        return { korean: "명중!", english: "Hit!" };
      case "miss":
        return { korean: "빗나감!", english: "Miss!" };
      case "block":
        return { korean: "막기!", english: "Block!" };
      case "technique_hit":
        return { korean: effect.text || "기술!", english: "Technique!" };
      case "counter":
        return { korean: "반격!", english: "Counter!" };
      case "stun":
        return { korean: "기절!", english: "Stunned!" };
      case "ko":
        return { korean: "KO!", english: "Knockout!" };
      default:
        return { korean: effect.text || "효과", english: "Effect" };
    }
  };

  // Get color based on effect type
  const getEffectColor = (effect: DisplayHitEffect) => {
    switch (effect.type) {
      case "critical_hit":
        return KOREAN_COLORS.ACCENT_RED;
      case "hit":
        return KOREAN_COLORS.ACCENT_GOLD;
      case "miss":
        return KOREAN_COLORS.TEXT_SECONDARY;
      case "block":
        return KOREAN_COLORS.PRIMARY_BLUE;
      case "technique_hit":
        return KOREAN_COLORS.PRIMARY_CYAN;
      case "counter":
        return KOREAN_COLORS.ACCENT_PURPLE;
      case "stun":
        return KOREAN_COLORS.WARNING_YELLOW;
      case "ko":
        return KOREAN_COLORS.NEGATIVE_RED;
      default:
        return KOREAN_COLORS.TEXT_PRIMARY;
    }
  };

  return (
    <pixiContainer data-testid="hit-effects-layer">
      {displayEffects.map(drawEffect)}
    </pixiContainer>
  );
};

export default HitEffectsLayer;
