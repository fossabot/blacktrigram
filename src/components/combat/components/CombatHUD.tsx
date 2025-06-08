import React, { useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { CombatHUDProps } from "../../../types/components";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  GAME_CONFIG,
} from "../../../types/constants";
import { RoundTimer } from "../../ui/RoundTimer";
import { HealthBar } from "../../ui/HealthBar";

export const CombatHUD: React.FC<CombatHUDProps> = ({
  players,
  timeRemaining,
  currentRound,
  maxRounds,
  isPaused,
  isPlayerTurn,
  x = 0,
  y = 0,
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = 100,
}) => {
  const [player1, player2] = players;

  const roundTextStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        align: "center",
        fontWeight: "bold",
      }),
    []
  );

  const pauseTextStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.large,
        fill: KOREAN_COLORS.WARNING_YELLOW,
        align: "center",
        fontWeight: "bold",
      }),
    []
  );

  const hudBackgroundDraw = useMemo(
    () => (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK);
      g.drawRect(0, 0, width, height);
      g.endFill();
    },
    [width, height]
  );

  return (
    <Container x={x} y={y}>
      <Graphics draw={hudBackgroundDraw} />

      {/* Timer in center */}
      <Container x={width / 2} y={height / 2}>
        <RoundTimer
          timeRemaining={timeRemaining}
          currentRound={currentRound}
          maxRounds={maxRounds}
          x={GAME_CONFIG.CANVAS_WIDTH / 2 - 100}
          y={20}
        />

        {/* Round indicator */}
        <Text
          text={`Round ${currentRound}/${maxRounds}`}
          style={roundTextStyle}
          anchor={0.5}
          y={30}
        />
      </Container>

      {/* Player 1 Health Bar */}
      <HealthBar
        currentHealth={player1.health}
        maxHealth={player1.maxHealth}
        x={20}
        y={20}
        width={200}
        height={20}
        showText={true}
      />

      {/* Player 1 Name */}
      <Text text={player1.name.korean} style={roundTextStyle} x={20} y={0} />

      {/* Player 2 Health Bar */}
      <HealthBar
        currentHealth={player2.health}
        maxHealth={player2.maxHealth}
        x={width - 220}
        y={20}
        width={200}
        height={20}
        showText={true}
      />

      {/* Player 2 Name */}
      <Text
        text={player2.name.korean}
        style={roundTextStyle}
        x={width - 220}
        y={0}
      />

      {/* Pause Indicator */}
      {isPaused && (
        <Text
          text="일시정지 (PAUSED)"
          style={pauseTextStyle}
          anchor={0.5}
          x={width / 2}
          y={height - 20}
        />
      )}

      {/* Turn Indicator */}
      {isPlayerTurn !== undefined && (
        <Text
          text={isPlayerTurn ? "Your Turn" : "Opponent's Turn"}
          style={
            new PIXI.TextStyle({
              fontFamily: FONT_FAMILY.PRIMARY,
              fontSize: FONT_SIZES.small,
              fill: isPlayerTurn
                ? KOREAN_COLORS.POSITIVE_GREEN
                : KOREAN_COLORS.WARNING_ORANGE,
            })
          }
          anchor={0.5}
          x={width / 2}
          y={height - 40}
        />
      )}
    </Container>
  );
};

export default CombatHUD;
