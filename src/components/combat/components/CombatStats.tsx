import React from "react";
import { KOREAN_COLORS } from "../../../types/constants";
import type { PlayerState } from "../../../types/player";

// Ensure PixiJS components are extended
import { extendPixiComponents } from "../../../utils/pixiExtensions";
extendPixiComponents();

export interface CombatStatsProps {
  readonly players: PlayerState[];
  readonly combatLog: string[];
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
}

export const CombatStats: React.FC<CombatStatsProps> = ({
  players,
  combatLog,
  x = 0,
  y = 0,
  width = 280,
  height = 140,
}) => {
  const isMobile = width < 300;

  return (
    <pixiContainer x={x} y={y} data-testid="combat-stats">
      {/* Stats Grid */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_MEDIUM, alpha: 0.6 });
          g.roundRect(0, 0, width, height, 8); // Use height parameter
          g.fill();
        }}
      />

      {/* Stats Title */}
      <pixiText
        text="전투 통계"
        style={{
          fontSize: isMobile ? 10 : 14,
          fill: KOREAN_COLORS.ACCENT_GOLD,
          fontWeight: "bold",
        }}
        x={10}
        y={10}
      />

      {/* Combat Log */}
      <pixiContainer x={10} y={30}>
        {combatLog.length > 0 ? (
          combatLog.slice(0, 4).map((log, index) => (
            <pixiText
              key={index}
              text={log}
              style={{
                fontSize: isMobile ? 9 : 12,
                fill: KOREAN_COLORS.TEXT_SECONDARY,
              }}
              x={0}
              y={index * (isMobile ? 15 : 20)}
            />
          ))
        ) : (
          <pixiText
            text="전투 기록이 없습니다"
            style={{
              fontSize: isMobile ? 9 : 12,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
              fontStyle: "italic",
            }}
            x={0}
            y={0}
          />
        )}
      </pixiContainer>

      {/* Stats Grid */}
      <pixiContainer x={10} y={height - 60}>
        {" "}
        {/* Use height parameter here */}
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.stroke({
              width: 1,
              color: KOREAN_COLORS.ACCENT_GOLD,
              alpha: 0.4,
            });
            g.rect(0, 0, width - 20, 50);
            g.moveTo(0, 25);
            g.lineTo(width - 20, 25);
            g.moveTo((width - 20) / 2, 0);
            g.lineTo((width - 20) / 2, 50);
            g.stroke();
          }}
        />
        {/* Player 1 Stats */}
        <pixiText
          text={players[0].name.korean}
          style={{
            fontSize: isMobile ? 9 : 12,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
          }}
          x={(width - 20) / 4}
          y={12.5}
          anchor={0.5}
        />
        <pixiText
          text={`${players[0].wins || 0}승`}
          style={{
            fontSize: isMobile ? 9 : 12,
            fill: KOREAN_COLORS.ACCENT_GREEN,
          }}
          x={(width - 20) / 4}
          y={37.5}
          anchor={0.5}
        />
        {/* Player 2 Stats */}
        <pixiText
          text={players[1].name.korean}
          style={{
            fontSize: isMobile ? 9 : 12,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
          }}
          x={((width - 20) * 3) / 4}
          y={12.5}
          anchor={0.5}
        />
        <pixiText
          text={`${players[1].wins || 0}승`}
          style={{
            fontSize: isMobile ? 9 : 12,
            fill: KOREAN_COLORS.ACCENT_GREEN,
          }}
          x={((width - 20) * 3) / 4}
          y={37.5}
          anchor={0.5}
        />
      </pixiContainer>
    </pixiContainer>
  );
};

export default CombatStats;
