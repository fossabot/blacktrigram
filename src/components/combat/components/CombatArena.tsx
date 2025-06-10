import React from "react";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import { Player } from "../../game/Player";
import type { PlayerState } from "../../../types/player";

interface CombatArenaProps {
  readonly players: PlayerState[];
  readonly onPlayerClick?: (playerIndex: number) => void;
  readonly width?: number;
  readonly height?: number;
}

export const CombatArena: React.FC<CombatArenaProps> = ({
  players,
  onPlayerClick,
  width = 800,
  height = 600,
}) => {
  usePixiExtensions();

  return (
    <pixiContainer data-testid="combat-arena">
      {/* Player 1 */}
      {players[0] && (
        <Player
          playerState={players[0]}
          playerIndex={0}
          x={100}
          y={height / 2}
          onClick={() => onPlayerClick?.(0)}
        />
      )}

      {/* Player 2 */}
      {players[1] && (
        <Player
          playerState={players[1]}
          playerIndex={1}
          x={width - 200}
          y={height / 2}
          onClick={() => onPlayerClick?.(1)}
        />
      )}
    </pixiContainer>
  );
};

export default CombatArena;
