// Hit effects layer for combat feedback

import React from "react";
import { Container, Graphics, Text } from "@pixi/react";
import { KOREAN_COLORS } from "../../types/constants";

// Add missing interface
interface HitEffectsLayerProps {
  readonly effects: readonly any[];
}

export function HitEffectsLayer({
  effects,
}: HitEffectsLayerProps): React.JSX.Element {
  return (
    <Container>
      {effects.map((effect) => (
        <Container key={effect.id} x={effect.position.x} y={effect.position.y}>
          {/* Impact visual */}
          <Graphics
            draw={(g) => {
              g.clear();
              const color =
                effect.type === "critical"
                  ? KOREAN_COLORS.RED
                  : effect.type === "vital"
                  ? KOREAN_COLORS.PURPLE
                  : KOREAN_COLORS.WHITE;
              g.beginFill(color, 0.8);
              g.drawCircle(0, 0, 15);
              g.endFill();
            }}
          />

          {/* Damage number */}
          <Text
            text={`-${effect.damage}`}
            style={{
              fontFamily: '"Noto Sans KR", Arial, sans-serif',
              fontSize: 18,
              fill:
                effect.type === "critical"
                  ? KOREAN_COLORS.RED
                  : KOREAN_COLORS.WHITE,
              fontWeight: "bold",
            }}
            anchor={0.5}
            y={-25}
          />
        </Container>
      ))}
    </Container>
  );
}
