import React from "react";
// Fix: Remove direct PIXI React imports
import type { EndScreenProps } from "../../types/components";
import { KOREAN_COLORS } from "../../types/constants";

export const EndScreen: React.FC<EndScreenProps> = ({
  winner,
  matchStatistics,
  onReturnToMenu,
  onRestart,
  width = 1200,
  height = 800,
  x = 0,
  y = 0,
}) => {
  return (
    <pixiContainer x={x} y={y} data-testid="end-screen">
      {/* Background */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.9);
          g.drawRect(0, 0, width, height);
          g.endFill();
        }}
      />

      {/* Winner Text */}
      <pixiText
        text={winner ? `승자: ${winner.name.korean}` : "무승부"}
        style={{
          fontSize: 32,
          fill: KOREAN_COLORS.ACCENT_GOLD,
          fontWeight: "bold",
          align: "center",
        }}
        x={width / 2}
        y={100}
        anchor={0.5}
      />

      {/* Statistics */}
      <pixiContainer x={width / 2 - 200} y={200}>
        <pixiText
          text="경기 통계"
          style={{
            fontSize: 24,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            fontWeight: "bold",
          }}
          y={0}
        />

        <pixiText
          text={`총 라운드: ${matchStatistics.totalRounds}`}
          style={{
            fontSize: 16,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          }}
          y={40}
        />

        <pixiText
          text={`경기 시간: ${Math.floor(
            matchStatistics.matchDuration / 60
          )}분`}
          style={{
            fontSize: 16,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          }}
          y={65}
        />
      </pixiContainer>

      {/* Buttons */}
      <pixiContainer x={width / 2 - 100} y={height - 150}>
        {onRestart && (
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.ACCENT_GOLD, 0.8);
              g.drawRoundedRect(0, 0, 200, 50, 8);
              g.endFill();
            }}
            interactive={true}
            onPointerDown={onRestart}
          />
        )}

        <pixiText
          text="다시 시작"
          style={{
            fontSize: 16,
            fill: KOREAN_COLORS.BLACK_SOLID,
            align: "center",
          }}
          x={100}
          y={25}
          anchor={0.5}
        />
      </pixiContainer>

      <pixiContainer x={width / 2 - 100} y={height - 90}>
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.beginFill(KOREAN_COLORS.UI_STEEL_GRAY, 0.8);
            g.drawRoundedRect(0, 0, 200, 50, 8);
            g.endFill();
          }}
          interactive={true}
          onPointerDown={onReturnToMenu}
        />

        <pixiText
          text="메인 메뉴"
          style={{
            fontSize: 16,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            align: "center",
          }}
          x={100}
          y={25}
          anchor={0.5}
        />
      </pixiContainer>
    </pixiContainer>
  );
};

export default EndScreen;
