import React, { useCallback, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { CombatControlsProps } from "../../../types/components";
import type { TrigramStance } from "../../../types/enums";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  FONT_WEIGHTS,
  TRIGRAM_DATA,
  TRIGRAM_STANCES_ORDER,
} from "../../../types/constants";

export const CombatControls: React.FC<CombatControlsProps> = ({
  player,
  onStanceChange,
  isExecutingTechnique = false,
  isPaused = false,
  x = 0,
  y = 0,
}) => {
  const handleStanceClick = useCallback(
    (stance: TrigramStance) => {
      if (!isPaused && !isExecutingTechnique) {
        onStanceChange(0, stance);
      }
    },
    [onStanceChange, isPaused, isExecutingTechnique]
  );

  const stanceButtonStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.small,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: FONT_WEIGHTS.medium.toString() as PIXI.TextStyleFontWeight,
        align: "center",
        stroke: KOREAN_COLORS.BLACK_SOLID,
      }),
    []
  );

  const renderStanceButton = useCallback(
    (stance: TrigramStance) => {
      const stanceData = TRIGRAM_DATA[stance];
      const isSelected = player.currentStance === stance;

      return (
        <Container
          key={stance}
          interactive={true}
          buttonMode={true}
          pointertap={() => handleStanceClick(stance)}
        >
          <Graphics
            draw={(g: PIXI.Graphics) => {
              g.clear();
              const fillColor = isSelected
                ? KOREAN_COLORS.ACCENT_PRIMARY
                : stanceData.theme?.primary ||
                  KOREAN_COLORS.UI_BACKGROUND_MEDIUM;

              g.beginFill(fillColor, 0.8);
              g.drawRect(0, 0, 60, 60);
              g.endFill();

              // Draw trigram symbol
              g.lineStyle(3, KOREAN_COLORS.TEXT_PRIMARY, 1);
              for (let i = 0; i < 3; i++) {
                g.moveTo(10, 15 + i * 15);
                g.lineTo(50, 15 + i * 15);
              }
            }}
          />

          <Text
            text={stanceData.name?.korean || stance}
            style={stanceButtonStyle}
            x={30}
            y={45}
            anchor={0.5}
          />
        </Container>
      );
    },
    [player.currentStance, handleStanceClick, stanceButtonStyle]
  );

  return (
    <Container x={x} y={y}>
      {/* Current stance display */}
      <Text
        text={`현재 자세: ${
          TRIGRAM_DATA[player.currentStance as TrigramStance].name?.korean
        } (${
          TRIGRAM_DATA[player.currentStance as TrigramStance].name?.english
        })`}
        style={stanceButtonStyle}
        x={20}
        y={20}
      />

      {/* Stance buttons grid */}
      <Container x={20} y={50}>
        {TRIGRAM_STANCES_ORDER.map((stance, index) => (
          <Container
            key={stance}
            x={(index % 4) * 70}
            y={Math.floor(index / 4) * 70}
          >
            {renderStanceButton(stance as TrigramStance)}{" "}
            {/* Fix: type assertion */}
          </Container>
        ))}
      </Container>
    </Container>
  );
};

export default CombatControls;
