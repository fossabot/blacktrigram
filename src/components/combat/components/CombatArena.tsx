import React, { useCallback } from "react";
import { Container, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { CombatArenaProps } from "../../../types/components";
import { KOREAN_COLORS } from "../../../types/constants";
import { Player } from "../../game/Player";
import { DojangBackground } from "../../game/DojangBackground";

export const CombatArena: React.FC<CombatArenaProps> = ({
  players,
  onPlayerClick,
  width = 800,
  height = 600,
  x = 0,
  y = 0,
}) => {
  const drawArenaFloor = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.ARENA_BACKGROUND, 0.3);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Arena boundaries
      g.lineStyle(2, KOREAN_COLORS.PRIMARY_CYAN, 0.8);
      g.drawRect(0, 0, width, height);
    },
    [width, height]
  );

  return (
    <Container x={x} y={y}>
      {/* Background */}
      <DojangBackground width={width} height={height} />

      {/* Arena floor */}
      <Graphics draw={drawArenaFloor} />

      {/* Players */}
      <Player
        playerState={players[0]}
        x={players[0].position.x}
        y={players[0].position.y}
        onClick={() => onPlayerClick?.(0)}
        interactive={!!onPlayerClick}
      />

      <Player
        playerState={players[1]}
        x={players[1].position.x}
        y={players[1].position.y}
        onClick={() => onPlayerClick?.(1)}
        interactive={!!onPlayerClick}
      />
    </Container>
  );
};

export default CombatArena;
