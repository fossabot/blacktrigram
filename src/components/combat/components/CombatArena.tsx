import React from "react";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import { Player } from "./Player"; // Fix: Use local Player component
import type { PlayerState } from "../../../types/player";
import { KOREAN_COLORS } from "../../../types/constants";

/**
 * @interface CombatArenaProps
 * @description Combat arena component props for Korean martial arts combat visualization
 */
export interface CombatArenaProps {
  readonly players: readonly PlayerState[];
  readonly onPlayerClick?: (idx: number) => void;
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
}

/**
 * CombatArena Component
 *
 * @description Renders the main combat arena with Korean martial arts aesthetics,
 * including traditional octagonal boundaries and player positioning
 *
 * @param props - Arena configuration and player data
 * @returns JSX element representing the combat arena
 *
 * @example
 * ```tsx
 * <CombatArena
 *   players={[player1, player2]}
 *   onPlayerClick={(idx) => selectPlayer(idx)}
 *   width={1200}
 *   height={800}
 * />
 * ```
 */
export const CombatArena: React.FC<CombatArenaProps> = ({
  players,
  onPlayerClick,
  width = 1200,
  height = 800,
  x = 0,
  y = 0,
}) => {
  usePixiExtensions();

  return (
    <pixiContainer x={x} y={y} data-testid="combat-arena">
      {/* Arena Floor with Korean Traditional Pattern */}
      <pixiGraphics
        draw={(g) => {
          g.clear();

          // Main arena background
          g.fill({ color: KOREAN_COLORS.ARENA_BACKGROUND, alpha: 0.3 });
          g.rect(0, 0, width, height);
          g.fill();

          // Traditional Korean floor pattern
          g.stroke({ width: 1, color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.2 });
          const patternSize = 40;
          for (let i = 0; i < width; i += patternSize) {
            for (let j = 0; j < height; j += patternSize) {
              g.moveTo(i, j);
              g.lineTo(i + patternSize / 2, j + patternSize / 2);
              g.lineTo(i, j + patternSize);
              g.lineTo(i - patternSize / 2, j + patternSize / 2);
              g.lineTo(i, j);
            }
          }
          g.stroke();

          // Center dividing line with Korean aesthetics
          g.stroke({ width: 3, color: KOREAN_COLORS.UI_BORDER, alpha: 0.6 });
          g.moveTo(width / 2, height * 0.1);
          g.lineTo(width / 2, height * 0.9);
          g.stroke();
        }}
        data-testid="arena-floor"
      />

      {/* Player Rendering */}
      {players.map((player, index) => (
        <Player
          key={player.id}
          playerState={player}
          playerIndex={index}
          x={index === 0 ? width * 0.25 : width * 0.75}
          y={height * 0.7}
          onClick={() => onPlayerClick?.(index)}
          data-testid={`arena-player-${index}`}
        />
      ))}

      {/* Octagonal Arena Boundaries (Korean Martial Arts Style) */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.stroke({ width: 4, color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.9 });

          // Octagonal boundary for traditional Korean martial arts
          const centerX = width / 2;
          const centerY = height / 2;
          const radius = Math.min(width, height) * 0.35;
          const sides = 8;

          const points: [number, number][] = [];
          for (let i = 0; i < sides; i++) {
            const angle = (i * 2 * Math.PI) / sides;
            points.push([
              centerX + radius * Math.cos(angle),
              centerY + radius * Math.sin(angle),
            ]);
          }

          g.moveTo(points[0][0], points[0][1]);
          for (let i = 1; i < points.length; i++) {
            g.lineTo(points[i][0], points[i][1]);
          }
          g.lineTo(points[0][0], points[0][1]); // Close the octagon
          g.stroke();
        }}
        data-testid="arena-boundaries"
      />

      {/* Traditional Korean Corner Markers with Trigram Symbols */}
      {[
        { x: 75, y: 125, symbol: "☰" },
        { x: width - 75, y: 125, symbol: "☱" },
        { x: 75, y: height - 125, symbol: "☷" },
        { x: width - 75, y: height - 125, symbol: "☶" },
      ].map(({ x: cornerX, y: cornerY, symbol }, index) => (
        <pixiContainer
          key={index}
          x={cornerX}
          y={cornerY}
          data-testid={`corner-marker-${index}`}
        >
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.fill({ color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.8 });
              g.circle(0, 0, 12);
              g.fill();

              g.stroke({
                width: 2,
                color: KOREAN_COLORS.UI_BORDER,
                alpha: 0.6,
              });
              g.circle(0, 0, 12);
              g.stroke();
            }}
          />
          <pixiText
            text={symbol}
            style={{
              fontSize: 14,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              fontWeight: "bold",
              align: "center",
            }}
            anchor={0.5}
          />
        </pixiContainer>
      ))}

      {/* Central Taegeuk Symbol */}
      <pixiContainer x={width / 2} y={height / 2} data-testid="central-taegeuk">
        <pixiGraphics
          draw={(g) => {
            g.clear();

            // Taegeuk background circle
            g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_LIGHT, alpha: 0.3 });
            g.circle(0, 0, 30);
            g.fill();

            // Yin-Yang pattern
            g.fill({ color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.6 });
            g.arc(0, 0, 30, 0, Math.PI);
            g.arc(0, -15, 15, Math.PI, 0, true);
            g.arc(0, 15, 15, 0, Math.PI, true);
            g.fill();

            // Small circles
            g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.8 });
            g.circle(0, -15, 5);
            g.fill();

            g.fill({ color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.8 });
            g.circle(0, 15, 5);
            g.fill();
          }}
        />
      </pixiContainer>
    </pixiContainer>
  );
};

export default CombatArena;
