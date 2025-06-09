// Complete Player component with Korean martial arts character rendering

import React, { useMemo, useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { PlayerState } from "../../types";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  FONT_WEIGHTS,
} from "../../types/constants";

export interface PlayerProps {
  readonly playerState: PlayerState;
  readonly playerIndex: number;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly showStats?: boolean;
  readonly showVitalPoints?: boolean;
  readonly interactive?: boolean;
  readonly onClick?: (playerIndex: number) => void;
}

// Utility function to get archetype color
const getArchetypeColor = (archetype: string): number => {
  const colors: Record<string, number> = {
    musa: KOREAN_COLORS.ACCENT_GOLD,
    amsalja: KOREAN_COLORS.ACCENT_PURPLE,
    hacker: KOREAN_COLORS.PRIMARY_CYAN,
    jeongbo_yowon: KOREAN_COLORS.PRIMARY_BLUE,
    jojik_pokryeokbae: KOREAN_COLORS.ACCENT_RED,
  };
  return colors[archetype] || KOREAN_COLORS.TEXT_PRIMARY;
};

const BAR_COLORS = {
  health: KOREAN_COLORS.POSITIVE_GREEN,
  ki: KOREAN_COLORS.PRIMARY_BLUE,
  stamina: KOREAN_COLORS.SECONDARY_YELLOW,
  guard: KOREAN_COLORS.ACCENT_GOLD,
  focus: KOREAN_COLORS.ACCENT_PURPLE,
};

export const Player: React.FC<PlayerProps> = ({
  playerState,
  playerIndex,
  x = 0,
  y = 0,
  width = 200,
  height = 150,
  showStats = true,
  showVitalPoints = false,
  interactive = false,
  onClick,
}) => {
  const {
    name,
    archetype: playerArchetype,
    health,
    maxHealth,
    ki,
    maxKi,
    stamina,
    maxStamina,
    currentStance,
  } = playerState;

  const headerStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: FONT_WEIGHTS.bold.toString() as any,
        align: "center",
      }),
    []
  );

  const drawBackground = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
      g.lineStyle(2, getArchetypeColor(playerArchetype));
      g.drawRoundedRect(0, 0, width, height, 10);
      g.endFill();
    },
    [playerArchetype, width, height]
  );

  const drawHealthBars = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      const barWidth = width - 40;
      const barHeight = 8;
      const startY = 35;
      const spacing = 15;

      // Health bar
      const healthPercent = health / maxHealth;
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK);
      g.drawRoundedRect(20, startY, barWidth, barHeight, 3);
      g.endFill();
      g.beginFill(BAR_COLORS.health);
      g.drawRoundedRect(20, startY, barWidth * healthPercent, barHeight, 3);
      g.endFill();

      // Ki bar
      const kiPercent = ki / maxKi;
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK);
      g.drawRoundedRect(20, startY + spacing, barWidth, barHeight, 3);
      g.endFill();
      g.beginFill(BAR_COLORS.ki);
      g.drawRoundedRect(
        20,
        startY + spacing,
        barWidth * kiPercent,
        barHeight,
        3
      );
      g.endFill();

      // Stamina bar
      const staminaPercent = stamina / maxStamina;
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK);
      g.drawRoundedRect(20, startY + spacing * 2, barWidth, barHeight, 3);
      g.endFill();
      g.beginFill(BAR_COLORS.stamina);
      g.drawRoundedRect(
        20,
        startY + spacing * 2,
        barWidth * staminaPercent,
        barHeight,
        3
      );
      g.endFill();
    },
    [width, health, maxHealth, ki, maxKi, stamina, maxStamina]
  );

  const handleClick = () => {
    onClick?.(playerIndex);
  };

  return (
    <Container
      x={x}
      y={y}
      width={width}
      height={height}
      interactive={interactive}
      buttonMode={interactive}
      pointertap={handleClick}
    >
      <Graphics draw={drawBackground} />
      {showStats && <Graphics draw={drawHealthBars} />}

      {/* Player Name */}
      <Text
        text={name.korean}
        anchor={0.5}
        x={width / 2}
        y={10}
        style={headerStyle}
      />

      {/* Health Display */}
      {showStats && (
        <Container y={70}>
          <Text
            text={`${health}/${maxHealth} 체력 | ${ki}/${maxKi} 기력`}
            style={{
              ...headerStyle,
              fontSize: FONT_SIZES.small,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
            }}
            anchor={0.5}
            x={width / 2}
            y={0}
          />
        </Container>
      )}

      {/* Stance Display */}
      <Container y={90}>
        <Text
          text={
            currentStance === "geon"
              ? "건 ☰"
              : currentStance === "tae"
              ? "태 ☱"
              : currentStance === "li"
              ? "리 ☲"
              : currentStance === "jin"
              ? "진 ☳"
              : currentStance === "son"
              ? "손 ☴"
              : currentStance === "gam"
              ? "감 ☵"
              : currentStance === "gan"
              ? "간 ☶"
              : "곤 ☷"
          }
          anchor={0.5}
          x={width / 2}
          y={height - 15}
          style={{
            ...headerStyle,
            fontSize: FONT_SIZES.large,
            fill: getArchetypeColor(playerArchetype),
          }}
        />
      </Container>
    </Container>
  );
};

export default Player;
