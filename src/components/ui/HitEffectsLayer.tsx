import React, { useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { HitEffectsLayerProps, HitEffect } from "../../types";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  KOREAN_TEXT_SIZES,
} from "../../types/constants";

export const HitEffectsLayer: React.FC<HitEffectsLayerProps> = ({
  effects,
  x = 0,
  y = 0,
  // Remove unused width and height parameters
  ...props
}) => {
  const damageTextStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.large,
        fill: KOREAN_COLORS.NEGATIVE_RED,
        stroke: { color: KOREAN_COLORS.BLACK_SOLID, width: 2 },
        fontWeight: "bold",
        align: "center",
      }),
    []
  );

  const criticalTextStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.xlarge,
        fill: KOREAN_COLORS.WARNING_ORANGE,
        stroke: { color: KOREAN_COLORS.BLACK_SOLID, width: 3 },
        fontWeight: "bold",
        align: "center",
        dropShadow: {
          color: KOREAN_COLORS.NEGATIVE_RED,
          blur: 4,
          distance: 2,
        },
      }),
    []
  );

  const getEffectColor = (type: HitEffectType): number => {
    switch (type) {
      case "light":
        return KOREAN_COLORS.TEXT_SECONDARY;
      case "medium":
        return KOREAN_COLORS.SECONDARY_YELLOW; // Use existing yellow
      case "heavy":
        return KOREAN_COLORS.WARNING_ORANGE; // Corrected Color
      case "critical":
        return KOREAN_COLORS.ACCENT_RED;
      default:
        return KOREAN_COLORS.TEXT_PRIMARY;
    }
  };

  const textStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: KOREAN_TEXT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        stroke: { color: KOREAN_COLORS.BLACK_SOLID, width: 1 },
        dropShadow: {
          color: KOREAN_COLORS.BLACK_SOLID,
          blur: 3,
          distance: 2,
        },
      }),
    []
  );

  const drawEffect = (g: PIXI.Graphics, effect: HitEffect) => {
    const now = Date.now();
    const lifetime = now - effect.timestamp;
    const alpha = Math.max(0, 1 - lifetime / effect.duration);

    if (alpha <= 0) {
      g.clear();
      return;
    }

    const color = effect.color || getEffectColor(effect.type);
    const size =
      effect.type === "critical" ? 20 : effect.type === "heavy" ? 15 : 10;

    g.clear();
    g.beginFill(color, alpha * 0.7); // More subtle fill
    // Simple star shape for impact
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
      const x1 = Math.cos(angle) * size * (1 - alpha); // Expands outwards
      const y1 = Math.sin(angle) * size * (1 - alpha);
      const x2 = Math.cos(angle + Math.PI / 5) * (size / 2) * (1 - alpha);
      const y2 = Math.sin(angle + Math.PI / 5) * (size / 2) * (1 - alpha);
      if (i === 0) g.moveTo(x1, y1);
      else g.lineTo(x1, y1);
      g.lineTo(x2, y2);
    }
    g.closePath();
    g.endFill();

    // Add damage text if present
    if (effect.damage) {
      // This part would require a <Text> component for each effect,
      // managing them within the Graphics draw call is complex for text.
      // For simplicity, this example omits direct text rendering in Graphics.
      // Consider rendering Text components separately per effect.
    }
  };

  return (
    <Container>
      {effects.map((effect) => (
        <Container
          key={effect.id}
          x={effect.position.x}
          y={
            effect.position.y -
            20 * ((Date.now() - effect.timestamp) / effect.duration)
          }
        >
          <Graphics draw={(g) => drawEffect(g, effect)} />
          {effect.damage && Date.now() - effect.timestamp < effect.duration && (
            <Text
              text={effect.damage.toString()}
              style={{
                ...textStyle,
                fill: effect.color || getEffectColor(effect.type),
                fontSize:
                  effect.type === "critical"
                    ? KOREAN_TEXT_SIZES.large
                    : KOREAN_TEXT_SIZES.medium,
                alpha: Math.max(
                  0,
                  1 - (Date.now() - effect.timestamp) / effect.duration
                ),
              }}
              anchor={0.5}
              y={-10} // Position text above the graphic
            />
          )}
        </Container>
      ))}
    </Container>
  );
};
