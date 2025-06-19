import React from "react";
import { KOREAN_COLORS } from "../../../types/constants";
import type { PlayerState } from "../../../types/player";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import { Player } from "../../game/Player";

export interface CombatArenaProps {
  readonly players: readonly PlayerState[]; // now readonly
  readonly onPlayerClick?: (idx: number) => void;
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
}

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
    <pixiContainer x={x} y={y}>
      {/* Arena Floor - Fixed deprecated graphics methods */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          // Fix: Use fill() instead of beginFill and endFill
          g.fill({ color: KOREAN_COLORS.ARENA_BACKGROUND, alpha: 0.3 });
          // Fix: Use rect() instead of drawRect
          g.rect(0, 0, width, height);
          g.fill();

          // Center line
          g.stroke({
            width: 2,
            color: KOREAN_COLORS.UI_BORDER,
            alpha: 0.5,
          });
          g.moveTo(width / 2, 0);
          g.lineTo(width / 2, height);
          g.stroke();
        }}
        data-testid="arena-floor"
      />

      {players.map((player, index) => (
        <Player
          key={player.id}
          player={player}
          x={index === 0 ? width * 0.25 : width * 0.75}
          y={height * 0.7}
          onClick={() => onPlayerClick?.(index)} // non-null
          data-testid={`player-${index}`}
        />
      ))}

      {/* Arena Boundaries - Fixed stroke styles */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.stroke({
            width: 3,
            color: KOREAN_COLORS.ACCENT_GOLD,
            alpha: 0.8,
          });
          g.rect(50, 100, width - 100, height - 200);
          g.stroke();
        }}
        data-testid="arena-boundaries"
      />

      {/* Corner Markers - Fixed fill method */}
      {[
        [75, 125],
        [width - 75, 125],
        [75, height - 125],
        [width - 75, height - 125],
      ].map(([cornerX, cornerY], index) => (
        <pixiGraphics
          key={index}
          draw={(g) => {
            g.clear();
            g.fill({ color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.6 });
            g.circle(cornerX, cornerY, 8);
            g.fill();
          }}
          data-testid={`corner-marker-${index}`}
        />
      ))}
    </pixiContainer>
  );
};

export default CombatArena;
