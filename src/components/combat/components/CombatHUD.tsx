import React, { useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { CombatHUDProps } from "../../../types/components";
import {
  KOREAN_COLORS,
  FONT_SIZES,
  FONT_FAMILY,
} from "../../../types/constants";
import { HealthBar } from "../../ui/HealthBar";
import { StanceIndicator } from "../../ui/StanceIndicator";

export const CombatHUD: React.FC<CombatHUDProps> = ({
  player1,
  player2,
  timeRemaining,
  currentRound,
  maxRounds,
  isPaused = false,
  width = 800,
  height = 100,
  x = 0,
  y = 0,
}) => {
  const hudBackgroundDraw = useMemo(
    () => (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Accent border
      g.lineStyle(2, KOREAN_COLORS.PRIMARY_CYAN, 0.6);
      g.moveTo(0, height);
      g.lineTo(width, height);
    },
    [width, height]
  );

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const timeStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontSize: FONT_SIZES.xlarge,
        fill:
          timeRemaining < 10
            ? KOREAN_COLORS.WARNING_ORANGE
            : KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: "bold",
        align: "center",
        stroke: { color: KOREAN_COLORS.BLACK, width: 2 },
      }),
    [timeRemaining]
  );

  const gameStatusStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.large,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: "bold",
        stroke: { color: KOREAN_COLORS.BLACK, width: 2 },
      }),
    []
  );

  return (
    <Container x={x} y={y}>
      {/* HUD Background */}
      <Graphics draw={hudBackgroundDraw} />

      {/* Player 1 Info */}
      <Container x={20} y={10}>
        <HealthBar
          currentHealth={player1.health}
          maxHealth={player1.maxHealth}
          width={200}
          height={20}
          showText={true}
        />

        <StanceIndicator
          stance={player1.currentStance}
          size={40}
          showText={false}
          y={30}
        />
      </Container>

      {/* Center Game Info */}
      <Container x={width / 2} y={10}>
        {/* Timer */}
        <Text text={formatTime(timeRemaining)} style={timeStyle} anchor={0.5} />

        {/* Round Info */}
        <Text
          text={`Round ${currentRound} / ${maxRounds}`}
          style={gameStatusStyle}
          anchor={0.5}
          y={FONT_SIZES.xlarge + 5}
        />

        {/* Pause indicator */}
        {isPaused && (
          <Text
            text="일시정지 (PAUSED)"
            style={gameStatusStyle}
            anchor={0.5}
            y={FONT_SIZES.xlarge + FONT_SIZES.large + 10}
          />
        )}
      </Container>

      {/* Player 2 Info */}
      <Container x={width - 240} y={10}>
        <HealthBar
          currentHealth={player2.health}
          maxHealth={player2.maxHealth}
          width={200}
          height={20}
          showText={true}
        />

        <StanceIndicator
          stance={player2.currentStance}
          size={40}
          showText={false}
          y={30}
        />
      </Container>
    </Container>
  );
};

export default CombatHUD;
