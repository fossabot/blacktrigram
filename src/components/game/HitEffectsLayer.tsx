// Hit effects layer for combat feedback

import React, { useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { HitEffectsLayerProps } from "../../types/components";
import { KOREAN_COLORS } from "../../types/constants";

export function HitEffectsLayer({
  effects,
  duration = 1000,
}: HitEffectsLayerProps): JSX.Element {
  const drawEffect = useCallback((g: any, effect: any) => {
    g.clear();

    // Effect based on type
    switch (effect.type) {
      case "critical":
        // Bright flash effect
        g.beginFill(KOREAN_COLORS.CRITICAL_HIT, 0.8);
        g.drawCircle(0, 0, 30);
        g.endFill();
        break;

      case "vital":
        // Pulsing vital point effect
        g.beginFill(KOREAN_COLORS.VITAL_POINT, 0.6);
        g.drawStar(0, 0, 6, 20, 10);
        g.endFill();
        break;

      case "heavy":
        // Impact ripple
        g.lineStyle(3, KOREAN_COLORS.HEALTH_RED, 0.7);
        g.drawCircle(0, 0, 25);
        g.lineStyle(2, KOREAN_COLORS.HEALTH_RED, 0.5);
        g.drawCircle(0, 0, 35);
        break;

      default:
        // Basic hit effect
        g.beginFill(KOREAN_COLORS.WHITE, 0.6);
        g.drawCircle(0, 0, 15);
        g.endFill();
    }
  }, []);

  return (
    <Container>
      {effects.map((effect, index) => (
        <Container
          key={index}
          x={effect.position?.x || 0}
          y={effect.position?.y || 0}
        >
          <Graphics draw={(g) => drawEffect(g, effect)} />

          {/* Damage number */}
          {effect.damage && (
            <Text
              text={`${effect.damage}`}
              y={-40}
              anchor={0.5}
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: 16,
                fill:
                  effect.type === "critical"
                    ? KOREAN_COLORS.CRITICAL_HIT
                    : KOREAN_COLORS.WHITE,
                fontWeight: "bold",
                stroke: KOREAN_COLORS.BLACK,
                strokeThickness: 2,
              }}
            />
          )}

          {/* Korean effect text */}
          {effect.korean && (
            <Text
              text={effect.korean}
              y={20}
              anchor={0.5}
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: 12,
                fill: KOREAN_COLORS.DANCHEONG_GOLD,
                align: "center",
              }}
            />
          )}
        </Container>
      ))}
    </Container>
  );
}
