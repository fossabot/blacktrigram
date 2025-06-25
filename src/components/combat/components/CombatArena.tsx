import { PlayerState } from "@/systems";
import React, { useCallback, useEffect, useState } from "react";
import type { Position } from "../../../types";
import { KOREAN_COLORS } from "../../../types/constants";
import { extendPixiComponents } from "../../../utils/pixiExtensions";

// Ensure PixiJS components are extended
extendPixiComponents();

export interface CombatArenaProps {
  readonly players: PlayerState[];
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
  readonly onPlayerClick?: (playerIndex: number) => void;
}

export const CombatArena: React.FC<CombatArenaProps> = ({
  players,
  width = 800,
  height = 600,
  x = 0,
  y = 0,
  onPlayerClick,
}) => {
  const [positions, setPositions] = useState<Position[]>([
    { x: width * 0.3, y: height * 0.6 },
    { x: width * 0.7, y: height * 0.6 },
  ]);

  // Initialize player positions
  useEffect(() => {
    setPositions([
      { x: width * 0.3, y: height * 0.6 },
      { x: width * 0.7, y: height * 0.6 },
    ]);
  }, [width, height]);

  const handlePlayerClick = useCallback(
    (playerIdx: number) => {
      onPlayerClick?.(playerIdx);
    },
    [onPlayerClick]
  );

  return (
    <pixiContainer x={x} y={y} data-testid="combat-arena">
      {/* Arena background */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.fill({ color: KOREAN_COLORS.ARENA_BACKGROUND, alpha: 0.6 });
          g.roundRect(0, 0, width, height, 16);
          g.fill();

          // Arena floor pattern
          g.stroke({ width: 2, color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.2 });
          const centerX = width / 2;
          const centerY = height / 2;
          const radius = Math.min(width, height) * 0.4;

          // Draw concentric circles
          for (let i = 1; i <= 4; i++) {
            g.circle(centerX, centerY, radius * (i / 4));
            g.stroke();
          }

          // Draw cardinal directions
          g.moveTo(centerX - radius, centerY);
          g.lineTo(centerX + radius, centerY);
          g.moveTo(centerX, centerY - radius);
          g.lineTo(centerX, centerY + radius);
          g.stroke();

          // Draw Chinese trigram symbols at the edges
        }}
      />

      {/* Player 1 */}
      <pixiContainer
        x={positions[0].x}
        y={positions[0].y}
        interactive={true}
        onPointerDown={() => handlePlayerClick(0)}
        data-testid="player-1-container"
      >
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.fill({ color: KOREAN_COLORS.PLAYER_1_COLOR, alpha: 0.8 });
            g.roundRect(-30, -80, 60, 160, 8);
            g.fill();
          }}
        />
        <pixiText
          text={players[0]?.name?.korean || "플레이어 1"}
          style={{
            fontSize: 16,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            align: "center",
          }}
          x={0}
          y={-90}
          anchor={0.5}
        />
      </pixiContainer>

      {/* Player 2 */}
      <pixiContainer
        x={positions[1].x}
        y={positions[1].y}
        interactive={true}
        onPointerDown={() => handlePlayerClick(1)}
        data-testid="player-2-container"
      >
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.fill({ color: KOREAN_COLORS.PLAYER_2_COLOR, alpha: 0.8 });
            g.roundRect(-30, -80, 60, 160, 8);
            g.fill();
          }}
        />
        <pixiText
          text={players[1]?.name?.korean || "AI"}
          style={{
            fontSize: 16,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            align: "center",
          }}
          x={0}
          y={-90}
          anchor={0.5}
        />
      </pixiContainer>

      {/* Combat area indicator */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.fill({ color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.1 });
          g.circle(width / 2, height / 2, 50);
          g.fill();
          g.stroke({ width: 2, color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.6 });
          g.circle(width / 2, height / 2, 50);
          g.stroke();
        }}
      />
    </pixiContainer>
  );
};

export default CombatArena;
