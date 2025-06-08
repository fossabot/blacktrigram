import React, { useCallback, useState } from "react";
import { Container } from "@pixi/react";
import type { CombatArenaProps, Position, HitEffect } from "../../../types";
import { GAME_CONFIG } from "../../../types/constants";
import { Player } from "../../ui/Player";
import { HitEffectsLayer } from "../../game/HitEffectsLayer";

export const CombatArena: React.FC<CombatArenaProps> = ({
  player1,
  player2,
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
}) => {
  const [effects] = useState<HitEffect[]>([]);

  const player1Position: Position = { x: width * 0.25, y: height * 0.65 };
  const player2Position: Position = { x: width * 0.75, y: height * 0.65 };

  const handlePlayerClick = useCallback((playerIndex: number) => {
    console.log(`Player ${playerIndex + 1} clicked`);
  }, []);

  return (
    <Container width={width} height={height} data-testid="combat-arena">
      {/* Player 1 */}
      <Player
        playerState={player1}
        playerIndex={0}
        x={player1Position.x}
        y={player1Position.y}
        onStateUpdate={() => {}}
        onClick={() => handlePlayerClick(0)}
      />

      {/* Player 2 */}
      <Player
        playerState={player2}
        playerIndex={1}
        x={player2Position.x}
        y={player2Position.y}
        onStateUpdate={() => {}}
        onClick={() => handlePlayerClick(1)}
      />

      <HitEffectsLayer effects={effects} />
    </Container>
  );
};

export default CombatArena;
