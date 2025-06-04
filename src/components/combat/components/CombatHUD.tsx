import React from "react";
import { Container, Text, Graphics } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import { ProgressTracker } from "../../ui/ProgressTracker";
import { KoreanTrigramDisplay } from "../../ui/base/KoreanPixiComponents";
import type { PlayerState } from "../../../types";
import {
  KOREAN_COLORS,
  KOREAN_FONT_FAMILY_PRIMARY,
} from "../../../types/constants";

export interface CombatHUDProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly timeRemaining: number;
  readonly currentRound: number;
  readonly isPaused: boolean;
  readonly width?: number;
  readonly height?: number;
}

export function CombatHUD({
  players,
  timeRemaining,
  currentRound,
  isPaused,
  width = 800,
  height = 600,
}: CombatHUDProps): React.ReactElement {
  const [player1, player2] = players;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Draw HUD background
  const drawHUDBackground = (g: PixiGraphics) => {
    g.clear();

    // Top HUD bar
    g.setFillStyle({ color: KOREAN_COLORS.BLACK, alpha: 0.8 });
    g.roundRect(0, 0, width, 80, 8);
    g.fill();

    g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 2 });
    g.roundRect(0, 0, width, 80, 8);
    g.stroke();
  };

  return (
    <Container>
      {/* Top HUD Background */}
      <Graphics draw={drawHUDBackground} />

      {/* Timer and Round Info */}
      <Container x={width / 2} y={25}>
        <Text
          text={`라운드 ${currentRound}`}
          anchor={0.5}
          style={{
            fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
            fontSize: 16,
            fill: KOREAN_COLORS.GOLD,
            fontWeight: "bold",
          }}
        />
        <Text
          text={formatTime(timeRemaining)}
          anchor={0.5}
          y={20}
          style={{
            fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
            fontSize: 24,
            fill: timeRemaining < 30 ? KOREAN_COLORS.RED : KOREAN_COLORS.WHITE,
            fontWeight: "bold",
            stroke: KOREAN_COLORS.BLACK,
            strokeThickness: 1,
          }}
        />
        {isPaused && (
          <Text
            text="일시정지"
            anchor={0.5}
            y={45}
            style={{
              fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
              fontSize: 14,
              fill: KOREAN_COLORS.YELLOW,
              fontWeight: "bold",
            }}
          />
        )}
      </Container>

      {/* Player 1 HUD - Left Side */}
      <Container x={20} y={10}>
        {/* Player name and archetype */}
        <Text
          text={`${player1.name} (${getArchetypeKorean(player1.archetype)})`}
          style={{
            fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
            fontSize: 14,
            fill: KOREAN_COLORS.CYAN,
            fontWeight: "bold",
          }}
        />

        {/* Progress bars */}
        <ProgressTracker
          health={{ current: player1.health, maximum: player1.maxHealth }}
          ki={{ current: player1.ki, maximum: player1.maxKi }}
          stamina={{ current: player1.stamina, maximum: player1.maxStamina }}
          x={0}
          y={20}
          width={150}
          showLabels={false}
        />

        {/* Current stance */}
        <KoreanTrigramDisplay
          stance={player1.stance}
          x={170}
          y={35}
          size={30}
          showKorean={true}
        />
      </Container>

      {/* Player 2 HUD - Right Side */}
      <Container x={width - 220} y={10}>
        {/* Player name and archetype */}
        <Text
          text={`${player2.name} (${getArchetypeKorean(player2.archetype)})`}
          anchor={{ x: 1, y: 0 }}
          x={200}
          style={{
            fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
            fontSize: 14,
            fill: KOREAN_COLORS.TRADITIONAL_RED,
            fontWeight: "bold",
          }}
        />

        {/* Progress bars */}
        <ProgressTracker
          health={{ current: player2.health, maximum: player2.maxHealth }}
          ki={{ current: player2.ki, maximum: player2.maxKi }}
          stamina={{ current: player2.stamina, maximum: player2.maxStamina }}
          x={50}
          y={20}
          width={150}
          showLabels={false}
        />

        {/* Current stance */}
        <KoreanTrigramDisplay
          stance={player2.stance}
          x={30}
          y={35}
          size={30}
          showKorean={true}
        />
      </Container>

      {/* Combat State Indicators */}
      {player1.isAttacking && (
        <Text
          text="공격!"
          anchor={0.5}
          x={width * 0.25}
          y={height - 50}
          style={{
            fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
            fontSize: 18,
            fill: KOREAN_COLORS.CRITICAL_HIT,
            fontWeight: "bold",
            stroke: KOREAN_COLORS.BLACK,
            strokeThickness: 2,
          }}
        />
      )}

      {player2.isAttacking && (
        <Text
          text="공격!"
          anchor={0.5}
          x={width * 0.75}
          y={height - 50}
          style={{
            fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
            fontSize: 18,
            fill: KOREAN_COLORS.CRITICAL_HIT,
            fontWeight: "bold",
            stroke: KOREAN_COLORS.BLACK,
            strokeThickness: 2,
          }}
        />
      )}
    </Container>
  );
}

function getArchetypeKorean(archetype: string): string {
  const korean = {
    musa: "무사",
    amsalja: "암살자",
    hacker: "해커",
    jeongbo: "정보요원",
    jojik: "조직폭력배",
  };
  return korean[archetype as keyof typeof korean] || archetype;
}
