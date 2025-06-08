import React, { useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { GameUIProps } from "../../types/components";
import { KOREAN_COLORS, FONT_SIZES } from "../../types/constants";
import { createKoreanTextStyle } from "../ui/base/korean-text/components/KoreanPixiTextUtils";
import { HealthBar } from "../ui/HealthBar";
import { StanceIndicator } from "../ui/StanceIndicator";

export const GameUI: React.FC<GameUIProps> = ({
  player1,
  player2,
  timeRemaining,
  currentRound,
  maxRounds,
  combatEffects,
  width = 800,
  x = 0,
  y = 0,
}) => {
  const hudBackgroundDraw = useMemo(
    () => (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
      g.drawRect(0, 0, width, 100);
      g.endFill();

      // Accent border
      g.lineStyle(2, KOREAN_COLORS.PRIMARY_CYAN, 0.6);
      g.moveTo(0, 100);
      g.lineTo(width, 100);
    },
    [width]
  );

  const gameStatusStyle = useMemo(
    () =>
      createKoreanTextStyle({
        fontSize: FONT_SIZES.large,
        fill: KOREAN_COLORS.ACCENT_GOLD,
        fontWeight: "bold",
        align: "center",
        stroke: KOREAN_COLORS.BLACK_SOLID,
      }),
    []
  );

  const timeStyle = useMemo(
    () =>
      createKoreanTextStyle({
        fontSize: FONT_SIZES.xlarge,
        fill:
          timeRemaining < 10
            ? KOREAN_COLORS.WARNING_ORANGE
            : KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: "bold",
        align: "center",
        stroke: KOREAN_COLORS.BLACK_SOLID,
      }),
    [timeRemaining]
  );

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

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
        <Container anchor={0.5}>
          <Text
            text={formatTime(timeRemaining)}
            style={timeStyle}
            anchor={0.5}
          />
        </Container>

        {/* Round Info */}
        <Container y={FONT_SIZES.xlarge + 5} anchor={0.5}>
          <Text
            text={`Round ${currentRound} / ${maxRounds}`}
            style={gameStatusStyle}
            anchor={0.5}
          />
        </Container>
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

      {/* Combat Effects Display */}
      {combatEffects.map((effect) => (
        <Container key={effect.id} x={effect.position.x} y={effect.position.y}>
          <Text
            text={`-${effect.damage}`}
            style={createKoreanTextStyle({
              fontSize: FONT_SIZES.large,
              fill: KOREAN_COLORS.NEGATIVE_RED,
              fontWeight: "bold",
            })}
            anchor={0.5}
          />
        </Container>
      ))}
    </Container>
  );
};

export default GameUI;
