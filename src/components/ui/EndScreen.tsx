import React, { useMemo } from "react";
import { Container, Graphics, Text as PixiText } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { EndScreenProps } from "../../types";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  PIXI_FONT_WEIGHTS, // Use this for PIXI.TextStyle fontWeight
  GAME_CONFIG,
  FONT_WEIGHTS,
} from "../../types/constants";

export const EndScreen: React.FC<EndScreenProps> = ({
  winner,
  draw,
  onRestart,
  onMenu,
  playerStats,
}) => {
  const titleContent = useMemo(() => {
    if (draw) return { korean: "무승부", english: "Draw" };
    if (winner)
      return {
        korean: `${winner.name.korean} 승리!`,
        english: `${winner.name.english} Wins!`,
      };
    return { korean: "경기 종료", english: "Match Over" }; // Fallback
  }, [winner, draw]);

  const titleStyle = useMemo(
    () =>
      new PIXI.TextStyle({ // Using PIXI.TextStyle directly
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.title,
        fill: winner
          ? KOREAN_COLORS.ACCENT_GOLD
          : draw
          ? KOREAN_COLORS.TEXT_SECONDARY
          : KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: PIXI_FONT_WEIGHTS.bold,
        align: "center",
        stroke: KOREAN_COLORS.BLACK_SOLID,
        strokeThickness: 4, // This is valid for PIXI.TextStyle
      }),
    [winner, draw]
  );

  const statsStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY, // Fix: use PRIMARY instead of KOREAN_UI
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: FONT_WEIGHTS.regular.toString() as PIXI.TextStyleFontWeight,
        align: "left",
      }),
    []
  );

  return (
    <Container
      width={GAME_CONFIG.CANVAS_WIDTH}
      height={GAME_CONFIG.CANVAS_HEIGHT}
    >
      {/* Background */}
      <Graphics
        draw={(g: PIXI.Graphics) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.95);
          g.drawRect(0, 0, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT);
          g.endFill();
        }}
      />

      {/* Title */}
      <PixiText
        text={`${titleContent.korean} (${titleContent.english})`}
        style={titleStyle}
        x={GAME_CONFIG.CANVAS_WIDTH / 2}
        y={100}
        anchor={0.5}
      />

      {/* Winner Display */}
      {winner && (
        <PixiText
          text={`${winner.name.korean} (${winner.name.english}) 승리!`}
          style={statsStyle}
          x={GAME_CONFIG.CANVAS_WIDTH / 2}
          y={160}
          anchor={0.5}
        />
      )}

      {/* Match Stats */}
      <Container x={GAME_CONFIG.CANVAS_WIDTH / 2 - 150} y={220}>
        <PixiText
          text="경기 통계 (Match Statistics)"
          style={titleStyle}
          x={150}
          y={0}
          anchor={0.5}
        />

        {playerStats?.matchDuration && (
          <PixiText
            text={`경기 시간: ${Math.floor(playerStats.matchDuration / 60)}:${(
              playerStats.matchDuration % 60
            )
              .toString()
              .padStart(2, "0")}`}
            style={statsStyle}
            x={0}
            y={40}
          />
        )}

        {playerStats?.roundsPlayed && (
          <PixiText
            text={`라운드: ${playerStats.roundsPlayed}`}
            style={statsStyle}
            x={0}
            y={70}
          />
        )}
      </Container>

      {/* Action Buttons */}
      <Container
        x={GAME_CONFIG.CANVAS_WIDTH / 2}
        y={GAME_CONFIG.CANVAS_HEIGHT - 150}
      >
        {/* Restart Button */}
        <Container
          x={-120}
          y={0}
          interactive={true}
          buttonMode={true}
          pointertap={onRestart}
        >
          <Graphics
            draw={(g: PIXI.Graphics) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.ACCENT_PRIMARY, 0.8);
              g.lineStyle(2, KOREAN_COLORS.UI_BORDER);
              g.drawRoundedRect(0, 0, 100, 40, 8);
              g.endFill();
            }}
          />
          <PixiText
            text="다시 시작"
            style={statsStyle}
            x={50}
            y={20}
            anchor={0.5}
          />
        </Container>

        {/* Menu Button */}
        <Container
          x={20}
          y={0}
          interactive={true}
          buttonMode={true}
          pointertap={onMenu}
        >
          <Graphics
            draw={(g: PIXI.Graphics) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
              g.lineStyle(2, KOREAN_COLORS.UI_BORDER);
              g.drawRoundedRect(0, 0, 100, 40, 8);
              g.endFill();
            }}
          />
          <PixiText
            text="메뉴로"
            style={statsStyle}
            x={50}
            y={20}
            anchor={0.5}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default EndScreen;
