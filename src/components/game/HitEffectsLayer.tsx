// Hit effects layer for combat feedback

import React, { useCallback } from "react";
import * as PIXI from "pixi.js";
import { usePixiExtensions } from "../../utils/pixiExtensions";
import { KOREAN_COLORS } from "../../types/constants";

export interface HitEffect {
  readonly id: string;
  readonly position: { x: number; y: number };
  readonly damage: number;
  readonly radius?: number;
  readonly text?: string;
  readonly color?: number;
  readonly duration?: number;
}

export interface HitEffectsLayerProps {
  readonly effects: HitEffect[];
}

export const HitEffectsLayer: React.FC<HitEffectsLayerProps> = ({
  effects,
}) => {
  // Ensure PixiJS components are extended
  usePixiExtensions();

  const drawEffect = useCallback((g: PIXI.Graphics, effect: HitEffect) => {
    g.clear();
    g.beginFill(effect.color || 0xff0000, 0.8);
    g.drawCircle(0, 0, effect.radius || 10);
    g.endFill();
  }, []);

  return (
    <pixiContainer data-testid="hit-effects-layer">
      {effects.map((effect, index) => (
        <pixiContainer
          key={`${effect.id}-${index}`}
          x={effect.position.x}
          y={effect.position.y}
        >
          <pixiGraphics draw={(g) => drawEffect(g, effect)} />
          <pixiText
            text={effect.text || effect.damage.toString()}
            style={
              new PIXI.TextStyle({
                fontSize: 16,
                fill: KOREAN_COLORS.TEXT_PRIMARY,
                fontWeight: "bold",
              })
            }
            anchor={0.5}
          />
        </pixiContainer>
      ))}
    </pixiContainer>
  );
};

export default HitEffectsLayer;
