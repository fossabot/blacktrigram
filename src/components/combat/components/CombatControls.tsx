import React, { useCallback, useState, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { CombatControlsProps } from "../../../types";
import { TrigramStance } from "../../../types/enums";
import {
  TRIGRAM_STANCES_ORDER, // This MUST be of type readonly TrigramStance[] from constants/trigram.ts
  TRIGRAM_DATA,
  FONT_FAMILY,
  FONT_SIZES,
  FONT_WEIGHTS,
  KOREAN_COLORS,
} from "../../../types/constants";
import * as PIXI from "pixi.js";

export const CombatControls: React.FC<CombatControlsProps> = ({
  players, // Now used
  player,
  onStanceChange,
  isExecutingTechnique,
  isPaused,
  showVitalPoints, // Now used
  width = 800, // Default width
  height = 100, // Default height
  ...props
}) => {
  const [hoveredStance, setHoveredStance] = useState<TrigramStance | null>(
    null
  );

  const handleStanceClick = useCallback(
    (stance: TrigramStance) => {
      onStanceChange(player.id === players[0].id ? 0 : 1, stance);
    },
    [onStanceChange, player, players]
  );

  const buttonWidth = width / TRIGRAM_STANCES_ORDER.length - 10;
  const buttonHeight = height - 20;

  const drawButton = useCallback(
    (g: PIXI.Graphics, stance: TrigramStance, isCurrent: boolean) => {
      const stanceData = TRIGRAM_DATA[stance];
      const isDisabled = isExecutingTechnique || isPaused;
      const isHover = hoveredStance === stance;

      let fillColor =
        stanceData?.theme?.primary || KOREAN_COLORS.UI_BACKGROUND_MEDIUM; // Fixed theme access
      let lineColor = stanceData?.theme?.secondary || KOREAN_COLORS.UI_BORDER; // Fixed theme access
      let alpha = isDisabled ? 0.5 : 1;

      if (isCurrent) {
        fillColor = stanceData?.theme?.active || KOREAN_COLORS.PRIMARY_CYAN; // Fixed theme access and color
        lineColor = stanceData?.theme?.secondary || KOREAN_COLORS.WHITE_SOLID; // Fixed color
      } else if (isHover && !isDisabled) {
        fillColor =
          stanceData?.theme?.hover || KOREAN_COLORS.UI_BACKGROUND_LIGHT; // Fixed theme access
        lineColor = stanceData?.theme?.secondary || KOREAN_COLORS.PRIMARY_CYAN; // Fixed color
      }

      g.clear();
      g.beginFill(fillColor, alpha);
      g.lineStyle(2, lineColor, alpha);
      g.drawRoundedRect(0, 0, buttonWidth, buttonHeight, 10);
      g.endFill();
    },
    [
      buttonWidth,
      buttonHeight,
      hoveredStance,
      isExecutingTechnique,
      isPaused,
      player.currentStance,
    ] // Added player.currentStance
  );

  // Fix text style
  const textStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.small,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: FONT_WEIGHTS.regular.toString() as PIXI.TextStyleFontWeight, // Fixed: use lowercase
        align: "center",
      }),
    []
  );

  return (
    <Container {...props}>
      {/* ... other elements ... */}
      <Container x={10} y={10}>
        {/* Ensure TRIGRAM_STANCES_ORDER is `readonly TrigramStance[]` */}
        {(TRIGRAM_STANCES_ORDER as readonly TrigramStance[]).map(
          (stance: TrigramStance, index) => {
            // Added type assertion for safety
            const isCurrentStance = player.currentStance === stance;
            const buttonX = index * (buttonWidth + 5);
            const stanceData = TRIGRAM_DATA[stance];

            return (
              <Container
                key={stance} // stance is a TrigramStance enum member, which is a string at runtime
                x={buttonX}
                y={0}
                interactive={!(isExecutingTechnique || isPaused)}
                buttonMode={!(isExecutingTechnique || isPaused)}
                pointertap={() => {
                  if (!(isExecutingTechnique || isPaused)) {
                    handleStanceClick(stance);
                  }
                }}
                pointerover={() => {
                  if (!(isExecutingTechnique || isPaused)) {
                    setHoveredStance(stance);
                  }
                }}
                pointerout={() => setHoveredStance(null)}
              >
                <Graphics
                  draw={(g: PIXI.Graphics) =>
                    drawButton(g, stance, isCurrentStance)
                  }
                />
                <Text
                  text={stanceData?.symbol || ""}
                  anchor={0.5}
                  x={buttonWidth / 2}
                  y={buttonHeight / 2 - 10}
                  style={{
                    ...textStyle,
                    fontSize: FONT_SIZES.large,
                    fill: isCurrentStance
                      ? KOREAN_COLORS.BLACK_SOLID
                      : KOREAN_COLORS.TEXT_PRIMARY,
                  }}
                />
                <Text
                  text={
                    stanceData?.name.korean || // Use stanceData for Korean name
                    stance.toString() // Fallback to string representation of enum value
                  }
                  anchor={0.5}
                  x={buttonWidth / 2}
                  y={buttonHeight / 2 + 10}
                  style={{
                    ...textStyle,
                    fontSize: FONT_SIZES.small,
                    fill: isCurrentStance
                      ? KOREAN_COLORS.BLACK_SOLID
                      : KOREAN_COLORS.TEXT_SECONDARY,
                  }}
                />
              </Container>
            );
          }
        )}
      </Container>
      {/* ... other controls ... */}
    </Container>
  );
};

export default CombatControls;
