import React, { useMemo } from "react";
import { Container, Graphics, Text as PixiText } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { GameUIProps, PlayerState } from "../../types";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  GAME_CONFIG,
  PIXI_FONT_WEIGHTS, // Use this for PIXI.TextStyle fontWeight
} from "../../types/constants";
import { HealthBar } from "../ui/HealthBar";
import { ArchetypeDisplay } from "../ui/ArchetypeDisplay";
import { StanceIndicator } from "../ui/StanceIndicator";

export const GameUI: React.FC<GameUIProps> = ({
  gameState,
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
}) => {
  const { player1, player2, currentRound, timeRemaining, isPaused, maxRounds } =
    gameState;

  const players: [PlayerState, PlayerState] = [player1, player2];

  const commonTextStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        stroke: KOREAN_COLORS.BLACK_SOLID,
        strokeThickness: 2, // Valid PIXI.TextStyle property
      }),
    []
  );

  const renderPlayerUI = (player: PlayerState, index: number) => {
    const isPlayerOne = index === 0;
    const xPos = isPlayerOne ? 50 : width - 350;
    const yPos = 50;
    const barWidth = 300;
    const barHeight = 20;
    const playerColor = isPlayerOne
      ? KOREAN_COLORS.PLAYER_1_COLOR
      : KOREAN_COLORS.PLAYER_2_COLOR;

    return (
      <Container key={player.id} x={xPos} y={yPos}>
        <PixiText
          text={`${player.name.korean} (${player.name.english})`}
          style={
            new PIXI.TextStyle({
              // Using PIXI.TextStyle directly
              ...commonTextStyle,
              fill: playerColor,
              fontSize: FONT_SIZES.large,
            })
          }
          y={-30}
        />
        <HealthBar
          currentHealth={player.health}
          maxHealth={player.maxHealth}
          width={barWidth}
          height={barHeight}
          x={0}
          y={0}
          color={playerColor} // Prop 'color' should exist on HealthBarProps
          backgroundColor={KOREAN_COLORS.UI_BACKGROUND_MEDIUM}
        />
        <PixiText
          text={`기: ${player.ki}/${player.maxKi}`}
          style={commonTextStyle} // Use the PIXI.TextStyle instance
          y={barHeight + 5}
        />
        <PixiText
          text={`체력: ${player.stamina}/${player.maxStamina}`}
          style={commonTextStyle} // Use the PIXI.TextStyle instance
          y={barHeight + 5 + FONT_SIZES.medium + 5}
        />
        <ArchetypeDisplay
          archetype={player.archetype}
          x={0}
          y={barHeight + 50}
        />
        <StanceIndicator
          stance={player.currentStance}
          x={150}
          y={barHeight + 50}
        />{" "}
        {/* Prop 'stance' should exist on StanceIndicatorProps */}
      </Container>
    );
  };

  const timerStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        // Using PIXI.TextStyle directly
        fontFamily: FONT_FAMILY.CYBER, // Ensure FONT_FAMILY.CYBER exists
        fontSize: FONT_SIZES.extraLarge, // Ensure FONT_SIZES.extraLarge exists
        fill: KOREAN_COLORS.ACCENT_GOLD,
        stroke: KOREAN_COLORS.BLACK_SOLID,
        strokeThickness: 3, // Valid PIXI.TextStyle property
        align: "center",
      }),
    []
  );

  return (
    <Container width={width} height={height}>
      {/* Top HUD Area */}
      <Container x={0} y={0} width={width}>
        {players.map((player, index) => renderPlayerUI(player, index))}
        {/* Timer and Round Info */}
        <PixiText
          text={`${Math.ceil(timeRemaining)}`}
          anchor={0.5}
          x={width / 2}
          y={50}
          style={timerStyle} // Use the PIXI.TextStyle instance
        />
        <PixiText
          text={`Round ${currentRound}/${maxRounds}`}
          anchor={0.5}
          x={width / 2}
          y={50 + FONT_SIZES.extraLarge + 5} // Ensure FONT_SIZES.extraLarge exists
          style={
            new PIXI.TextStyle({
              // Using PIXI.TextStyle directly
              ...commonTextStyle,
              fontSize: FONT_SIZES.large,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
            })
          }
        />
      </Container>

      {/* Pause Overlay */}
      {isPaused && (
        <Container>
          <Graphics
            draw={(g: PIXI.Graphics) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.OVERLAY_BACKGROUND, 0.7);
              g.drawRect(0, 0, width, height);
              g.endFill();
            }}
          />
          <PixiText
            text="일시정지 (Paused)"
            anchor={0.5}
            x={width / 2}
            y={height / 2 - 50}
            style={
              new PIXI.TextStyle({
                fontFamily: FONT_FAMILY.PRIMARY,
                fontSize: FONT_SIZES.title,
                fill: KOREAN_COLORS.TEXT_BRIGHT,
                fontWeight: PIXI_FONT_WEIGHTS.bold, // Use PIXI_FONT_WEIGHTS
                align: "center",
              })
            }
          />
        </Container>
      )}
    </Container>
  );
};

export default GameUI;
