import React, { useCallback, useMemo, useState } from "react";
import { useTick } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import {
  PixiContainerComponent,
  PixiGraphicsComponent,
  PixiTextComponent,
} from "../ui/base/PixiComponents";
import { type HitEffect, KOREAN_COLORS, KOREAN_FONT_FAMILY } from "../../types";

export interface HitEffectsLayerProps {
  readonly effects: readonly HitEffect[];
}

export function HitEffectsLayer({
  effects,
}: HitEffectsLayerProps): React.ReactElement {
  // Filter active effects based on current time
  const activeEffects = useMemo(() => {
    const now = Date.now();
    return effects.filter((effect) => now - effect.startTime < effect.duration);
  }, [effects]);

  return (
    <PixiContainerComponent>
      {activeEffects.map((effect) => (
        <HitEffectDisplay key={effect.id} effect={effect} />
      ))}
    </PixiContainerComponent>
  );
}

interface HitEffectDisplayProps {
  readonly effect: HitEffect;
}

function HitEffectDisplay({
  effect,
}: HitEffectDisplayProps): React.ReactElement {
  const [alpha, setAlpha] = useState(1);
  const [scale, setScale] = useState(1);
  const [offsetY, setOffsetY] = useState(0);

  useTick(
    useCallback(() => {
      const elapsed = Date.now() - effect.startTime;
      const progress = elapsed / effect.duration;

      if (progress >= 1) return;

      // Fade out effect
      setAlpha(1 - progress);

      // Scale effect based on damage type
      if (effect.type === "critical" || effect.type === "heavy") {
        setScale(1 + Math.sin(progress * Math.PI * 4) * 0.1);
      }

      // Float upward
      setOffsetY(-progress * 30);
    }, [effect])
  );

  const drawEffect = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Draw hit effect background
      const radius = effect.type === "critical" ? 25 : 15;
      g.setFillStyle({
        color: effect.color,
        alpha: alpha * 0.3,
      });
      g.circle(0, 0, radius);
      g.fill();

      // Draw effect border
      g.setStrokeStyle({
        color: effect.color,
        width: 2,
        alpha: alpha,
      });
      g.circle(0, 0, radius);
      g.stroke();
    },
    [effect.color, effect.type, alpha]
  );

  return (
    <PixiContainerComponent
      x={effect.position.x}
      y={effect.position.y + offsetY}
      alpha={alpha}
      scale={{ x: scale, y: scale }}
    >
      <PixiGraphicsComponent draw={drawEffect} />

      {/* Damage text */}
      <PixiTextComponent
        text={effect.damage.toString()}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: KOREAN_FONT_FAMILY,
          fontSize: effect.type === "critical" ? 20 : 16,
          fill: KOREAN_COLORS.WHITE,
          fontWeight: "bold",
        }}
      />

      {/* Korean damage text for critical hits */}
      {effect.type === "critical" && (
        <PixiTextComponent
          text="치명타!"
          y={-25}
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: KOREAN_FONT_FAMILY,
            fontSize: 12,
            fill: KOREAN_COLORS.CRITICAL_RED,
            fontWeight: "bold",
          }}
        />
      )}
    </PixiContainerComponent>
  );
}
