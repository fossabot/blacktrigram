// Complete Player component with Korean martial arts character rendering

import React, { useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { PlayerProps } from "../../types";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  KOREAN_TEXT_SIZES, // Changed from FONT_SIZES
  KOREAN_FONT_WEIGHTS, // Changed from FONT_WEIGHTS
  TRIGRAM_DATA,
  PLAYER_ARCHETYPES_DATA,
  FONT_SIZES, // Added import
} from "../../types/constants";

const getStanceColor = (stance: string): number => {
  const stanceData = TRIGRAM_DATA[stance as keyof typeof TRIGRAM_DATA];
  return stanceData?.theme?.primary || KOREAN_COLORS.UI_STEEL_GRAY;
};

export const Player: React.FC<PlayerProps> = ({
  playerState,
  playerIndex,
  position = { x: 0, y: 0 },
  showVitalPoints = false,
  showDebugInfo = false,
  onStateUpdate,
  x = 0,
  y = 0,
  width = 200,
  height = 150,
  ...props
}) => {
  // const { name, currentStance } = playerState; // Already destructured from playerState
  const archetypeData = PLAYER_ARCHETYPES_DATA[playerState.archetype]; // Get archetype data

  // const playerColor = useMemo( // Unused
  //   () => archetypeData?.theme?.primary || KOREAN_COLORS.UI_STEEL_GRAY,
  //   [archetypeData]
  // );

  const nameTextStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.KOREAN_BATTLE,
        fontSize: KOREAN_TEXT_SIZES.medium, // Use KOREAN_TEXT_SIZES
        fill: archetypeData?.theme?.primary || KOREAN_COLORS.TEXT_ACCENT, // Use archetype theme color
        fontWeight:
          KOREAN_FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight, // Use KOREAN_FONT_WEIGHTS
        stroke: { color: KOREAN_COLORS.BLACK_SOLID, width: 2 },
      }),
    [archetypeData] // Add archetypeData to dependency array
  );

  const barHeight = 15;
  const barWidth = width * 0.8;
  const barSpacing = 5;

  const drawBar = (
    g: PIXI.Graphics,
    currentValue: number,
    maxValue: number,
    color: number,
    yOffset: number
  ) => {
    const ratio = currentValue / maxValue;

    // Background bar
    g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK);
    g.drawRect(10, yOffset, barWidth, barHeight);
    g.endFill();

    // Fill bar
    g.beginFill(color);
    g.drawRect(10, yOffset, barWidth * ratio, barHeight);
    g.endFill();

    // Border
    g.lineStyle(1, KOREAN_COLORS.UI_BORDER);
    g.drawRect(10, yOffset, barWidth, barHeight);
  };

  const drawPlayerInfo = React.useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Player background
      g.beginFill(getStanceColor(playerState.currentStance), 0.2); // Use playerState.currentStance
      g.lineStyle(2, getStanceColor(playerState.currentStance)); // Use playerState.currentStance
      g.drawRoundedRect(0, 0, width, height, 10);
      g.endFill();

      // Health bar
      drawBar(
        g,
        playerState.health,
        playerState.maxHealth,
        KOREAN_COLORS.POSITIVE_GREEN,
        30
      );

      // Ki bar
      drawBar(
        g,
        playerState.ki,
        playerState.maxKi,
        KOREAN_COLORS.PRIMARY_BLUE_LIGHT,
        30 + barHeight + barSpacing
      );

      // Stamina bar
      drawBar(
        g,
        playerState.stamina,
        playerState.maxStamina,
        KOREAN_COLORS.SECONDARY_YELLOW_LIGHT,
        30 + (barHeight + barSpacing) * 2
      );
    },
    [
      width,
      height,
      health,
      maxHealth,
      ki,
      maxKi,
      stamina,
      maxStamina,
      playerState.currentStance, // Use playerState.currentStance
      // drawBar, // drawBar is defined inside this callback's scope, no need to be a dependency
    ]
  );

  // Use onStateUpdate if provided (for test compatibility)
  React.useEffect(() => {
    if (onStateUpdate) {
      // Example of how onStateUpdate might be used
      // onStateUpdate(playerIndex, { ...playerState });
    }
  }, [onStateUpdate, playerIndex, playerState]);

  return (
    <Container x={x} y={y} {...props}>
      <Graphics draw={drawPlayerInfo} />

      <Text
        text={playerState.name.korean} // Use playerState.name.korean
        anchor={0.5}
        x={width / 2}
        y={15} // Adjusted y for better placement
        style={nameTextStyle}
      />

      <Text
        text={
          TRIGRAM_DATA[playerState.currentStance]?.name.korean ||
          playerState.currentStance
        } // Use playerState.currentStance
        anchor={0.5}
        x={width / 2}
        y={height - 25} // Adjusted y for better placement
        style={{
          ...nameTextStyle,
          fontSize: KOREAN_TEXT_SIZES.small, // Use KOREAN_TEXT_SIZES
          fill: getStanceColor(playerState.currentStance), // Use playerState.currentStance
        }}
      />

      {showVitalPoints && (
        <Graphics
          draw={(g: PIXI.Graphics) => {
            g.beginFill(KOREAN_COLORS.NEGATIVE_RED, 0.7);
            g.drawCircle(width / 2, height / 2, 3);
            g.endFill();
          }}
        />
      )}

      {showDebugInfo && (
        <Container>
          <Text
            text={`Archetype: ${archetype}`}
            x={10}
            y={height + 5}
            style={{
              ...nameTextStyle,
              fontSize: FONT_SIZES.xsmall,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
            }}
          />
          <Text
            text={`Position: ${position.x}, ${position.y}`}
            x={10}
            y={height + 15}
            style={{
              ...nameTextStyle,
              fontSize: FONT_SIZES.xsmall,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
            }}
          />
        </Container>
      )}
    </Container>
  );
};

export default Player;
