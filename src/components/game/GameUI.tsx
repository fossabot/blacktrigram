import React from "react";
import { Container, Text } from "@pixi/react";
import type { GameUIProps } from "../../types";
import { KOREAN_COLORS, KOREAN_FONT_FAMILY } from "../../types/constants";

export const GameUI: React.FC<GameUIProps> = ({
  // players,
  gamePhase,
  // onGamePhaseChange,
  gameTime,
  currentRound,
  timeRemaining,
  // onStanceChange,
  combatLog,
  // onTogglePause,
  // onPlayerUpdate,
  isPaused,
  players: playerStates, // Renamed to avoid conflict if players was used
}) => {
  const player1 = playerStates[0];
  const player2 = playerStates[1];

  if (!player1 || !player2) {
    return null; // or some fallback UI
  }

  return (
    <Container>
      <Text
        text={`Phase: ${gamePhase}`}
        x={20}
        y={20}
        style={{
          fill: KOREAN_COLORS.WHITE,
          fontFamily: KOREAN_FONT_FAMILY,
          fontSize: 18,
        }}
      />
      <Text
        text={`Time: ${gameTime}s`}
        x={20}
        y={50}
        style={{
          fill: KOREAN_COLORS.WHITE,
          fontFamily: KOREAN_FONT_FAMILY,
          fontSize: 18,
        }}
      />
      <Text
        text={`Round: ${currentRound}`}
        x={20}
        y={80}
        style={{
          fill: KOREAN_COLORS.WHITE,
          fontFamily: KOREAN_FONT_FAMILY,
          fontSize: 18,
        }}
      />
      <Text
        text={`Time Remaining: ${timeRemaining}s`}
        x={200}
        y={20}
        style={{
          fill: KOREAN_COLORS.WHITE,
          fontFamily: KOREAN_FONT_FAMILY,
          fontSize: 18,
        }}
      />
      {isPaused && (
        <Text
          text="PAUSED"
          x={300}
          y={300}
          anchor={0.5}
          style={{
            fill: KOREAN_COLORS.NEON_RED,
            fontFamily: KOREAN_FONT_FAMILY,
            fontSize: 48,
            fontWeight: "bold",
          }}
        />
      )}
      {/* Display Combat Log */}
      <Container y={600}>
        {(combatLog || []).slice(-5).map((logEntry, index) => (
          <Text
            key={index}
            text={
              typeof logEntry === "string"
                ? logEntry
                : `${logEntry.korean} (${logEntry.english})`
            }
            x={20}
            y={index * 20}
            style={{
              fill: KOREAN_COLORS.CYAN,
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 14,
            }}
          />
        ))}
      </Container>

      {/* Placeholder for actual HUD and Controls if GameUI is the main combat UI view */}
      {/* <CombatHUD players={players} timeRemaining={timeRemaining} currentRound={currentRound} isPaused={isPaused} gameTime={gameTime} /> */}
      {/* <CombatControls player={players[0]} onStanceChange={(stance) => handleStanceChange(0, stance)} isPaused={isPaused} players={players} isExecutingTechnique={false} /> */}
    </Container>
  );
};

export default GameUI;
