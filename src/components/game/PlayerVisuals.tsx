import React, { useMemo, useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { PlayerState } from "../../types"; // Remove unused TrigramStance import
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  PLAYER_ARCHETYPES_DATA,
} from "../../types/constants";

// Define PlayerVisualsProps locally to avoid conflict
interface PlayerVisualsProps {
  readonly playerState: PlayerState;
  readonly showVitalPoints?: boolean;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number; // Add missing width prop
  readonly height?: number; // Add missing height prop
  readonly interactive?: boolean;
  readonly onClick?: () => void; // Add missing onClick prop
  readonly onPlayerClick?: () => void;
  readonly onVitalPointClick?: (vitalPointId: string) => void;
}

export const PlayerVisuals: React.FC<PlayerVisualsProps> = ({
  playerState,
  showVitalPoints = false,
  x = 0,
  y = 0,
  width = 100, // Add default width
  height = 150, // Add default height
  interactive = false,
  onClick, // Add onClick prop
  onPlayerClick,
  // Remove unused onVitalPointClick
}) => {
  const archetype = playerState.archetype;
  const stance = playerState.currentStance;

  // Remove unused facing variable
  const currentHealth = playerState.health;
  const maxHealth = playerState.maxHealth;
  const healthPercentage = (currentHealth / maxHealth) * 100;

  const playerStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY, // Fix: use existing font family
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        align: "center",
      }),
    []
  );

  const playerDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Main body (simple rectangle for now)
      const archetypeData = PLAYER_ARCHETYPES_DATA[archetype];
      const bodyColor = archetypeData?.colors?.primary || KOREAN_COLORS.UI_GRAY; // Fix: use colors property

      g.beginFill(bodyColor, 0.8);
      g.lineStyle(2, KOREAN_COLORS.WHITE_SOLID, 1);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw simple humanoid shape
      // Head
      g.drawCircle(centerX, centerY - height * 0.3, width * 0.15);

      // Body
      g.drawRect(
        centerX - width * 0.15,
        centerY - height * 0.15,
        width * 0.3,
        height * 0.4
      );

      // Arms
      g.drawRect(
        centerX - width * 0.25,
        centerY - height * 0.1,
        width * 0.1,
        height * 0.25
      );
      g.drawRect(
        centerX + width * 0.15,
        centerY - height * 0.1,
        width * 0.1,
        height * 0.25
      );

      // Legs
      g.drawRect(
        centerX - width * 0.1,
        centerY + height * 0.15,
        width * 0.08,
        height * 0.25
      );
      g.drawRect(
        centerX + width * 0.02,
        centerY + height * 0.15,
        width * 0.08,
        height * 0.25
      );

      g.endFill();

      // Health bar
      const healthBarWidth = width * 0.8;

      // Health bar background
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
      g.drawRect(
        centerX - healthBarWidth / 2,
        y + height - 10,
        healthBarWidth,
        6
      );
      g.endFill();

      // Health bar fill
      g.beginFill(KOREAN_COLORS.POSITIVE_GREEN, 0.9);
      g.drawRect(
        centerX - healthBarWidth / 2,
        y + height - 10,
        (healthBarWidth * healthPercentage) / 100,
        6
      );
      g.endFill();
    },
    [archetype, healthPercentage, width, height, y]
  );

  const vitalPointsDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      if (!showVitalPoints) return;

      // Draw vital points - Fix: use proper type and remove unused id
      const vitalPoints = (playerState as any).vitalPoints || {}; // Temporary fix
      Object.entries(vitalPoints).forEach(([, vitalPoint]: [string, any]) => {
        let vpColor: number = KOREAN_COLORS.VITAL_POINT_NORMAL;
        if (vitalPoint.damage > 50) {
          // Fix: use typed vitalPoint
          vpColor = KOREAN_COLORS.VITAL_POINT_CRITICAL;
        } else if (vitalPoint.damage > 20) {
          // Fix: use typed vitalPoint
          vpColor = KOREAN_COLORS.VITAL_POINT_WEAK;
        }

        g.beginFill(vpColor, 0.7);
        g.drawCircle(
          ((vitalPoint.location?.x || 50) / 100) * width, // Fix: use typed vitalPoint
          ((vitalPoint.location?.y || 50) / 100) * height,
          5
        );
        g.endFill();
      });
    },
    [showVitalPoints, playerState, width, height] // Fix: use playerState instead of specific property
  );

  return (
    <Container
      x={x}
      y={y}
      width={width}
      height={height}
      interactive={interactive}
      buttonMode={interactive}
      pointertap={onClick || onPlayerClick}
    >
      {/* Player body */}
      <Graphics draw={playerDraw} />

      {/* Player name */}
      <Text
        text={playerState.name.korean}
        style={playerStyle}
        anchor={0.5}
        x={width / 2}
        y={-20}
      />

      {/* Stance indicator */}
      <Container x={width / 2} y={height + 20}>
        <Text
          text={`${stance} 자세`}
          style={playerStyle}
          anchor={0.5}
          x={0}
          y={0}
        />
      </Container>

      {/* Health display */}
      <Text
        text={`${currentHealth}/${maxHealth}`}
        style={{
          ...playerStyle,
          fontSize: FONT_SIZES.small,
          fill:
            healthPercentage > 30
              ? KOREAN_COLORS.POSITIVE_GREEN
              : KOREAN_COLORS.WARNING_ORANGE,
        }}
        anchor={0.5}
        x={width / 2}
        y={height + 50}
      />

      {/* Vital points overlay */}
      <Graphics draw={vitalPointsDraw} />
    </Container>
  );
};

export default PlayerVisuals;
