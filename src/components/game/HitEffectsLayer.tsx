// Hit effects layer for combat feedback

import React, { useEffect, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { HitEffectsLayerProps } from "../../types/components";
import type { DisplayHitEffect } from "../../types/effects"; // Fix: Remove unused HitEffect import
import { KOREAN_COLORS, FONT_SIZES } from "../../types/constants";

export const HitEffectsLayer: React.FC<HitEffectsLayerProps> = ({
  effects,
  onEffectComplete,
  width = 800, // Use width for container bounds
  height = 600, // Use height for container bounds
  x = 0,
  y = 0,
}) => {
  const displayEffects = useMemo(() => {
    return effects.map((effect: any) => ({
      id: effect.id || `effect_${Date.now()}`,
      position: effect.position || { x: 0, y: 0 },
      color: effect.color || KOREAN_COLORS.ACCENT_RED,
      damageAmount: effect.damageAmount,
      text: effect.text,
      type: effect.type || "damage",
      duration: effect.duration || 1000,
      intensity: effect.intensity || 1.0,
      opacity: effect.opacity || 1.0,
      scale: effect.scale || 1.0,
      startTime: effect.startTime || Date.now(),
      // Add missing display properties
      displayAlpha: effect.displayAlpha || 1.0,
      displayY: effect.displayY || effect.position?.y || 0,
      displaySize: effect.displaySize || 20,
    })) as DisplayHitEffect[];
  }, [effects]);

  // Use width and height for bounds checking
  const boundedEffects = useMemo(() => {
    return displayEffects.filter((effect) => {
      const pos = effect.position;
      return (
        pos && pos.x >= 0 && pos.x <= width && pos.y >= 0 && pos.y <= height
      );
    });
  }, [displayEffects, width, height]);

  // Use onEffectComplete callback
  useEffect(() => {
    const completedEffects = displayEffects.filter(
      (effect) => Date.now() - effect.startTime >= effect.duration
    );

    completedEffects.forEach((effect) => {
      onEffectComplete?.(effect.id);
    });
  }, [displayEffects, onEffectComplete]);

  return (
    <Container x={x} y={y}>
      {boundedEffects.map((effect) => (
        <Container
          key={effect.id}
          x={effect.position?.x || 0}
          y={effect.position?.y || 0}
        >
          <Graphics
            draw={(g: PIXI.Graphics) => {
              g.clear();
              g.beginFill(effect.color || KOREAN_COLORS.ACCENT_RED, 0.8);
              g.drawCircle(0, 0, 20);
              g.endFill();
            }}
          />
          {(effect.damageAmount || effect.text) && (
            <Text
              text={
                typeof effect.text === "string"
                  ? effect.text
                  : effect.text?.korean || ""
              }
              style={
                new PIXI.TextStyle({
                  fontSize: FONT_SIZES.large,
                  fill: KOREAN_COLORS.TEXT_PRIMARY,
                  fontWeight: "bold",
                })
              }
              anchor={0.5}
              y={-30}
            />
          )}
        </Container>
      ))}
    </Container>
  );
};

export default HitEffectsLayer;
