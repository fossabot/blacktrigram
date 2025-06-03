// Hit effects layer for combat feedback

import React from "react";
import { Container, Text } from "@pixi/react";
import type { HitEffectsLayerProps } from "../../types/components";
import { KOREAN_COLORS } from "../../types/constants";

export function HitEffectsLayer({
  effects,
  duration = 2000,
  fadeOutDuration = 500,
  maxEffects = 10,
}: HitEffectsLayerProps): JSX.Element {
  const getCriticalHitColor = () => KOREAN_COLORS.CRITICAL_HIT;
  const getVitalPointColor = () => KOREAN_COLORS.VITAL_POINT;

  return (
    <Container>
      {effects.map((effect) => {
        const damageColor = effect.damage > 20 ? 0xff4444 : 0xffaa00;

        return (
          <Container
            key={effect.id}
            x={effect.position.x}
            y={effect.position.y}
          >
            <Text
              text={`-${effect.damage}`}
              style={{
                fontSize: 16 + effect.damage * 0.5,
                fill: damageColor,
                stroke: 0x000000,
                strokeWidth: 2,
                fontWeight: "bold" as any, // Cast to any to bypass type check
              }}
              anchor={0.5}
            />
            <Text
              text={effect.korean}
              style={{
                fontSize: 12,
                fill: damageColor,
                stroke: 0x000000,
                strokeWidth: 1,
                fontWeight: "normal" as any, // Cast to any to bypass type check
              }}
              anchor={0.5}
              y={20}
            />
          </Container>
        );
      })}
    </Container>
  );
}
