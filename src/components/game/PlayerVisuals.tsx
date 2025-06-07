import React, { useMemo, useCallback } from "react";
import { Container, Text, Graphics as PixiGraphics } from "@pixi/react"; // Renamed Graphics to PixiGraphics to avoid conflict
import {
  KOREAN_COLORS,
  PLAYER_ARCHETYPES_DATA,
  TRIGRAM_DATA,
  FONT_FAMILY,
  FONT_SIZES,
  KOREAN_FONT_WEIGHTS,
  GAME_CONFIG,
  VITAL_POINT_DATA,
} from "../../types/constants";
import * as PIXI from "pixi.js";
import type { PlayerState, VitalPoint } from "../../types";

interface PlayerVisualsProps {
  playerState: PlayerState;
  x?: number;
  y?: number;
  showVitalPoints?: boolean;
}

const PlayerVisuals: React.FC<PlayerVisualsProps> = ({
  playerState,
  x = 0, // Default to 0 if not provided
  y = 0, // Default to 0 if not provided
  showVitalPoints,
}) => {
  const {
    name,
    health,
    maxHealth,
    ki,
    maxKi,
    stamina,
    maxStamina,
    archetype,
    currentStance,
    vitalPoints,
  } = playerState;
  const archetypeData = PLAYER_ARCHETYPES_DATA[archetype];

  const playerColor = useMemo(
    () => archetypeData?.theme?.primary || KOREAN_COLORS.UI_STEEL_GRAY,
    [archetypeData]
  );

  const nameStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.KOREAN_BATTLE,
        fontSize: FONT_SIZES.medium,
        fill: playerColor,
        fontWeight:
          KOREAN_FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight,
        stroke: { color: KOREAN_COLORS.BLACK_SOLID, width: 2 },
      }),
    [playerColor]
  );

  const barStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.MONO,
        fontSize: FONT_SIZES.xsmall,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
      }),
    []
  );

  const playerWidth = GAME_CONFIG.PLAYER_VISUAL_WIDTH;
  const playerHeight = GAME_CONFIG.PLAYER_VISUAL_HEIGHT;

  const drawPlayer = useCallback(
    // Renamed g to graphics
    (graphics: PIXI.Graphics) => {
      graphics.clear();
      // Main body
      graphics.beginFill(playerColor, 0.7);
      graphics.lineStyle(
        2,
        archetypeData?.theme?.secondary || KOREAN_COLORS.UI_BORDER
      );
      graphics.drawEllipse(0, 0, playerWidth / 2, playerHeight / 2);
      graphics.endFill();

      // Head
      graphics.beginFill(playerColor, 0.9);
      graphics.drawCircle(0, -playerHeight / 2 + 20, 20);
      graphics.endFill();

      // "stance aura"
      const stanceData = TRIGRAM_DATA[currentStance];
      if (stanceData) {
        graphics.lineStyle(3, stanceData.theme.primary, 0.5);
        graphics.drawCircle(
          0,
          0,
          playerWidth / 2 + 5 + Math.sin(Date.now() / 200) * 2
        ); // Pulsating aura
      }
    },
    [playerColor, archetypeData, playerWidth, playerHeight, currentStance]
  );

  const barWidth = playerWidth * 0.8;
  const barHeight = 8;

  const drawBar = useCallback(
    // Renamed g to graphics
    (
      graphics: PIXI.Graphics,
      value: number,
      maxValue: number,
      color: number,
      yOffset: number
    ) => {
      const ratio = Math.max(0, value / maxValue);
      graphics.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
      graphics.drawRect(-barWidth / 2, yOffset, barWidth, barHeight);
      graphics.endFill();

      graphics.beginFill(color, 0.9);
      graphics.drawRect(-barWidth / 2, yOffset, barWidth * ratio, barHeight);
      graphics.endFill();

      graphics.lineStyle(1, KOREAN_COLORS.UI_BORDER_LIGHT);
      graphics.drawRect(-barWidth / 2, yOffset, barWidth, barHeight);
    },
    [barWidth, barHeight]
  );

  const drawVitalPoints = useCallback(
    // Renamed g to graphics
    (graphics: PIXI.Graphics) => {
      graphics.clear();
      if (!showVitalPoints || !vitalPoints) return;

      Object.values(vitalPoints).forEach((vpState) => {
        const vpData = VITAL_POINT_DATA[vpState.id];
        if (!vpData) return;

        let vpColor = KOREAN_COLORS.VITAL_POINT_NORMAL;
        if (vpState.status === "damaged")
          vpColor = KOREAN_COLORS.VITAL_POINT_WEAK;
        if (vpState.status === "critical")
          vpColor = KOREAN_COLORS.VITAL_POINT_CRITICAL;

        // Approximate position based on region - this is highly simplified
        // In a real scenario, vpData.position would be relative to player origin
        const regionPos = vpData.position || { x: 0, y: 0 }; // Default to center
        const displayX = (regionPos.x / 100) * (playerWidth / 2); // Assuming position is %
        const displayY =
          (regionPos.y / 100) * (playerHeight / 2) - playerHeight / 4;

        graphics.beginFill(vpColor, 0.8);
        graphics.drawCircle(displayX, displayY, 3);
        graphics.endFill();
      });
    },
    [showVitalPoints, vitalPoints, playerWidth, playerHeight]
  );

  return (
    <Container x={x} y={y}>
      <PixiGraphics draw={drawPlayer} />

      {/* Name Text */}
      <Text
        text={name.korean}
        anchor={0.5}
        y={-playerHeight / 2 - 20}
        style={nameStyle}
      />

      {/* Bars Container */}
      <Container y={playerHeight / 2 + 10}>
        <PixiGraphics
          draw={(g: PIXI.Graphics) =>
            drawBar(g, health, maxHealth, KOREAN_COLORS.POSITIVE_GREEN, 0)
          }
        />
        <Text
          text={`H:${health}`}
          x={-barWidth / 2 - 25}
          y={0}
          style={barStyle}
        />

        <PixiGraphics
          draw={(g: PIXI.Graphics) =>
            drawBar(g, ki, maxKi, KOREAN_COLORS.PRIMARY_BLUE, barHeight + 3)
          }
        />
        <Text
          text={`K:${ki}`}
          x={-barWidth / 2 - 25}
          y={barHeight + 3}
          style={barStyle}
        />

        <PixiGraphics
          draw={(g: PIXI.Graphics) =>
            drawBar(
              g,
              stamina,
              maxStamina,
              KOREAN_COLORS.SECONDARY_YELLOW,
              (barHeight + 3) * 2
            )
          }
        />
        <Text
          text={`S:${stamina}`}
          x={-barWidth / 2 - 25}
          y={(barHeight + 3) * 2}
          style={barStyle}
        />
      </Container>

      {/* Stance Text - Example, can be improved */}
      <Text
        text={TRIGRAM_DATA[currentStance]?.symbol || ""}
        anchor={0.5}
        y={0}
        style={
          new PIXI.TextStyle({
            // Corrected style definition
            fontFamily: FONT_FAMILY.PRIMARY,
            fontSize: FONT_SIZES.large,
            fill:
              TRIGRAM_DATA[currentStance]?.theme.secondary ||
              KOREAN_COLORS.TEXT_PRIMARY,
            stroke: {
              color:
                TRIGRAM_DATA[currentStance]?.theme.primary ||
                KOREAN_COLORS.BLACK_SOLID,
              width: 3,
            },
          })
        }
      />

      {showVitalPoints && <PixiGraphics draw={drawVitalPoints} />}
    </Container>
  );
};

export default PlayerVisuals;
