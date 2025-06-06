// Complete Player component with Korean martial arts character rendering

import React from "react";
import * as PIXI from "pixi.js";
import { Container, Text } from "@pixi/react";
import type { PlayerProps } from "../../types";
import { PlayerVisuals } from "./PlayerVisuals"; // Ensure named import
import { KOREAN_COLORS, KOREAN_FONT_FAMILY } from "../../types/constants";

const Player: React.FC<PlayerProps> = ({
  playerState,
  playerIndex,
  // onStateUpdate, // Currently unused, but part of props
  // onAttack, // Currently unused
  showVitalPoints,
}) => {
  const { x, y } = playerState.position;
  const nameStyle = new PIXI.TextStyle({
    fontFamily: KOREAN_FONT_FAMILY,
    fontSize: 18,
    fill: KOREAN_COLORS.WHITE,
    stroke: KOREAN_COLORS.BLACK,
    strokeThickness: 2,
    align: "center",
  } as Partial<PIXI.TextStyle>); // Cast to Partial<PIXI.TextStyle>

  const healthStyle = new PIXI.TextStyle({
    fontFamily: KOREAN_FONT_FAMILY,
    fontSize: 14,
    fill:
      playerState.health > 30 ? KOREAN_COLORS.GREEN : KOREAN_COLORS.NEON_RED,
    stroke: KOREAN_COLORS.BLACK,
    strokeThickness: 3,
    align: "center",
  } as Partial<PIXI.TextStyle>); // Cast to Partial<PIXI.TextStyle>

  // const handlePlayerClick = () => {
  //   onStateUpdate(playerIndex, { ...playerState, health: playerState.health - 10 });
  // };

  return (
    <Container x={x} y={y}>
      <PlayerVisuals
        playerState={playerState}
        playerIndex={playerIndex}
        showVitalPoints={showVitalPoints}
        x={0}
        y={0}
      />
      <Text
        text={`${playerState.name.korean} (${playerState.name.english})`}
        anchor={{ x: 0.5, y: 0 }}
        position={{ x: 0, y: -80 }}
        style={nameStyle}
      />
      <Text
        text={`체력: ${playerState.health}/${playerState.maxHealth} | 기: ${playerState.ki}/${playerState.maxKi} | 지구력: ${playerState.stamina}/${playerState.maxStamina}`}
        anchor={{ x: 0.5, y: 0 }}
        position={{ x: 0, y: -50 }}
        style={healthStyle}
      />
      {/* Add more visual elements like stance indicator, effects, etc. */}
    </Container>
  );
};

export default Player;
