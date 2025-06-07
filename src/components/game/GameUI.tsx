import React from "react";
import { Container, Text, Graphics } from "@pixi/react";
import type { GameUIProps } from "../../types";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  GAME_CONFIG,
  FONT_SIZES,
} from "../../types/constants";
import * as PIXI from "pixi.js";

export const GameUI: React.FC<GameUIProps> = ({
  players,
  currentRound,
  gamePhase: currentGamePhase,
  timeRemaining,
  isPaused,
  onStanceChange,
  onPlayerUpdate,
  onGamePhaseChange,
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
  ...props
}) => {
  const headerStyle = React.useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        stroke: KOREAN_COLORS.BLACK_SOLID,
        align: "center",
      }),
    []
  );

  const roundTextStyle = React.useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.large,
        fill: KOREAN_COLORS.ACCENT_PRIMARY,
        stroke: KOREAN_COLORS.BLACK_SOLID,
        align: "center",
      }),
    []
  );

  const renderPlayerUI = (playerState: (typeof players)[0], index: number) => {
    if (!playerState) return null;

    return (
      <Container
        key={`player-${index}`}
        x={index === 0 ? 20 : width - 220}
        y={20}
      >
        <Text text={playerState.name.korean} style={headerStyle} x={0} y={0} />
        <Text
          text={`체력: ${playerState.health}/${playerState.maxHealth}`}
          style={headerStyle}
          x={0}
          y={25}
        />
        <Text
          text={`기력: ${playerState.ki}/${playerState.maxKi}`}
          style={headerStyle}
          x={0}
          y={50}
        />
      </Container>
    );
  };

  return (
    <Container width={width} height={height} {...props}>
      <Graphics
        draw={(g: PIXI.Graphics) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
          g.drawRect(0, 0, width, height);
          g.endFill();
        }}
      />

      <Text
        text={`라운드 ${currentRound} (Round ${currentRound})`}
        anchor={0.5}
        x={width / 2}
        y={20}
        style={roundTextStyle}
      />

      <Text
        text={`남은 시간: ${Math.max(0, timeRemaining ?? 0)}초`}
        anchor={0.5}
        x={width / 2}
        y={50}
        style={headerStyle}
      />

      {players.map((player, index) => renderPlayerUI(player, index))}

      {isPaused && (
        <Container>
          <Graphics
            draw={(g: PIXI.Graphics) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.BLACK_SOLID, 0.7);
              g.drawRect(0, 0, width, height);
              g.endFill();
            }}
          />
          <Text
            text="일시정지 (Paused)"
            anchor={0.5}
            x={width / 2}
            y={height / 2}
            style={roundTextStyle}
          />
        </Container>
      )}
    </Container>
  );
};

export default GameUI;
