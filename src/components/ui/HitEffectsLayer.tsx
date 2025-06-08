import React from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { HitEffect } from "../../types";
import { KOREAN_COLORS, FONT_FAMILY, FONT_SIZES } from "../../types/constants";

interface HitEffectsLayerProps {
  effects: readonly HitEffect[];
  // ... other props
}

export const HitEffectsLayer: React.FC<HitEffectsLayerProps> = ({
  effects,
}) => {
  const textStyle = new PIXI.TextStyle({
    fontFamily: FONT_FAMILY.PRIMARY,
    fontSize: FONT_SIZES.medium,
    fill: KOREAN_COLORS.TEXT_ACCENT,
  });

  return (
    <Container>
      {effects.map((effect: HitEffect) => (
        <Container key={effect.id} x={effect.position.x} y={effect.position.y}>
          <Graphics
            draw={(g: PIXI.Graphics) => {
              g.clear();
              g.beginFill(effect.color || KOREAN_COLORS.ACCENT_RED, 0.8);
              g.drawCircle(0, 0, (effect.damage || 10) * 0.5 + 5);
              g.endFill();
            }}
          />
          {effect.damage && (
            <Text
              text={effect.damage.toString()}
              anchor={0.5}
              style={textStyle}
            />
          )}
        </Container>
      ))}
    </Container>
  );
};

export default HitEffectsLayer;
