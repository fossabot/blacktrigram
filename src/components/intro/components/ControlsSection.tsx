import React, { useCallback, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { ControlsSectionProps } from "../../../types/components";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  COMBAT_CONTROLS,
  FONT_WEIGHTS, // Fix: Now properly exported
} from "../../../types/constants";
import { BaseButton } from "@/components/ui";

export const ControlsSection: React.FC<ControlsSectionProps> = ({
  onBack,
  width = 800,
  height = 600,
  x = 0,
  y = 0,
}) => {
  const titleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.title,
        fill: KOREAN_COLORS.ACCENT_GOLD,
        fontWeight: FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight, // Fix: use number value
        align: "center",
      }),
    []
  );

  const controlsDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
      g.drawRoundedRect(0, 0, width - 40, height - 40, 10);
      g.endFill();

      g.lineStyle(2, KOREAN_COLORS.PRIMARY_CYAN, 0.6);
      g.drawRoundedRect(0, 0, width - 40, height - 40, 10);
    },
    [width, height]
  );

  return (
    <Container x={x} y={y}>
      <Container x={20} y={20}>
        <Graphics draw={controlsDraw} />

        <Container x={30} y={30}>
          <Text text="Controls / 조작법" style={titleStyle} />

          <Container y={60}>
            {Object.entries(COMBAT_CONTROLS.stanceControls).map(
              ([key, control], index) => {
                // Fix: Add index parameter
                const stanceControl = control as {
                  korean: string;
                  technique: string;
                };
                return (
                  <BaseButton
                    key={key}
                    text={`${key}: ${stanceControl.korean} (${stanceControl.technique})`}
                    onClick={() => console.log(`Stance ${key} selected`)}
                    variant="ghost"
                    width={280}
                    height={30}
                    y={index * 35} // Fix: Now index is defined
                  />
                );
              }
            )}
          </Container>
        </Container>
      </Container>

      {/* Back button */}
      <BaseButton
        text="돌아가기 (Back)"
        onClick={onBack} // Fix: Use onBack directly
        x={50}
        y={height - 100}
        width={200}
        height={50}
        variant="secondary"
      />
    </Container>
  );
};

export default ControlsSection;
