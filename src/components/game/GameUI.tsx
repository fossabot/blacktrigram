import React, { useCallback } from "react";
import { Container, Text, Graphics } from "@pixi/react";
import type {
  GameState,
  TrigramStance, // Add this import
} from "../../types";
import { TRIGRAM_DATA, KOREAN_COLORS } from "../../types";
import type { Graphics as PixiGraphics } from "pixi.js";
import type { TextStyle } from "pixi.js";
import { ProgressTracker } from "../ui/ProgressTracker";
import { TrigramWheel } from "../ui/TrigramWheel";

export interface GameUIProps {
  gameState: GameState;
  onPauseToggle?: () => void;
  width?: number;
  height?: number;
}

export function GameUI({
  gameState,
  onPauseToggle,
  width = 800,
  height = 600,
}: GameUIProps): React.JSX.Element {
  const player1 = gameState.players[0];
  const player2 = gameState.players[1];

  const handleStanceClick = useCallback(
    (_stance: TrigramStance) => {
      // Mark parameter as intentionally unused
      onPauseToggle?.();
    },
    [onPauseToggle]
  );

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const roundTimerText =
    gameState.timeRemaining !== undefined
      ? formatTime(gameState.timeRemaining)
      : "0:00";

  return (
    <Container>
      {/* Player 1 HUD */}
      <Container x={20} y={20}>
        <Text
          text={`P1: ${TRIGRAM_DATA[player1.stance].koreanName}`}
          x={10}
          y={10}
          style={{
            fill: KOREAN_COLORS.PLAYER_1_BLUE,
            fontSize: 18,
            fontFamily: "Noto Sans KR",
          }}
        />
        <ProgressTracker
          label={`${player1.playerId} HP`}
          current={player1.health}
          maximum={player1.maxHealth}
          currentStance={player1.stance}
        />
        <Text
          text={`Ki: ${player1.ki}/${player1.maxKi}`}
          y={50} // Relative to this container
          style={{ fill: KOREAN_COLORS.CYAN, fontSize: 18 } as TextStyle}
        />
        <Text
          text={`Stamina: ${player1.stamina}/${player1.maxStamina}`}
          y={75} // Relative to this container
          style={{ fill: KOREAN_COLORS.Green, fontSize: 18 } as TextStyle}
        />
        <Text
          text={`Stance: ${TRIGRAM_DATA[player1.stance].koreanName}`}
          y={100} // Relative to this container
          style={{ fill: KOREAN_COLORS.WHITE, fontSize: 18 } as TextStyle}
        />
      </Container>

      {/* Player 2 HUD */}
      <Container x={500} y={20}>
        <Text
          text={`P2: ${TRIGRAM_DATA[player2.stance].koreanName}`}
          x={500 - 10}
          y={10}
          anchor={{ x: 1, y: 0 }}
          style={{
            fill: KOREAN_COLORS.PLAYER_2_RED,
            fontSize: 18,
            fontFamily: "Noto Sans KR",
          }}
        />
        <ProgressTracker
          label={`${player2.playerId} HP`}
          current={player2.health}
          maximum={player2.maxHealth}
          currentStance={player2.stance}
        />
        {/* Position P2 HUD to the right */}
        <Text
          text={`Ki: ${player2.ki}/${player2.maxKi}`}
          y={50}
          style={{ fill: KOREAN_COLORS.CYAN, fontSize: 18 } as TextStyle}
        />
        <Text
          text={`Stamina: ${player2.stamina}/${player2.maxStamina}`}
          y={75}
          style={{ fill: KOREAN_COLORS.Green, fontSize: 18 } as TextStyle}
        />
        <Text
          text={`Stance: ${TRIGRAM_DATA[player2.stance].koreanName}`}
          y={100}
          style={{ fill: KOREAN_COLORS.WHITE, fontSize: 18 } as TextStyle}
        />
      </Container>

      {/* Round Timer */}
      <Text
        text={`Round: ${gameState.currentRound}`}
        x={350}
        y={20}
        style={{ fill: KOREAN_COLORS.WHITE, fontSize: 24 } as TextStyle}
      />
      <Text
        text={roundTimerText}
        x={370}
        y={50}
        style={{ fill: KOREAN_COLORS.YELLOW, fontSize: 30 } as TextStyle}
      />

      {/* Pause Button */}
      <Graphics
        x={750}
        y={20}
        draw={(g: PixiGraphics) => {
          // Explicitly type 'g'
          g.clear();
          g.beginFill(KOREAN_COLORS.GRAY_LIGHT, 0.8); // Use beginFill
          g.drawRect(0, 0, 30, 30);
          g.endFill();
          g.beginFill(KOREAN_COLORS.BLACK);
          if (gameState.isPaused) {
            g.moveTo(10, 5).lineTo(10, 25).lineTo(20, 15).closePath();
            g.fill(); // Ensure fill is called
          } else {
            g.drawRect(8, 5, 5, 20);
            g.drawRect(17, 5, 5, 20);
            g.endFill(); // Ensure fill is called
          }
        }}
        interactive={true}
        pointertap={onPauseToggle}
      />

      {/* Trigram Wheel for Player 1 (example) */}
      <TrigramWheel
        selectedStance={player1.stance}
        onStanceChange={handleStanceClick}
        x={100}
        y={500}
        radius={80}
        interactive={!gameState.isPaused}
        isEnabled={!gameState.isPaused}
        playerKi={player1.ki}
        playerMaxKi={player1.maxKi}
      />

      {/* Combat Log - very basic */}
      {gameState.combatLog && gameState.combatLog.length > 0 && (
        <Container x={10} y={height - 100}>
          {(gameState.combatLog as string[]).slice(-3).map(
            (
              logEntry: string,
              index: number // Typed logEntry and index
            ) => (
              <Text
                key={index}
                text={logEntry}
                y={index * 15}
                style={{
                  fill: KOREAN_COLORS.WHITE,
                  fontSize: 12,
                  fontFamily: "Noto Sans KR",
                }}
              />
            )
          )}
        </Container>
      )}

      {/* Pause/Game Over Messages */}
      {gameState.phase === "paused" && ( // Access phase
        <Text
          text="일시정지 (Paused)"
          anchor={0.5}
          x={width / 2}
          y={height / 2 - 50}
          style={{
            fill: KOREAN_COLORS.GOLD,
            fontSize: 48,
            fontFamily: "Noto Sans KR",
            stroke: {
              color: KOREAN_COLORS.BLACK,
              width: 4,
            },
          }}
        />
      )}
      {gameState.phase === "post-round" &&
        gameState.winner !== null &&
        gameState.winner !== undefined && (
          <Text
            text={`${
              gameState.players[gameState.winner]?.playerId || "Unknown"
            } 승리! (Wins!)`}
            anchor={0.5}
            x={width / 2}
            y={height / 2 - 50}
            style={{
              fill: KOREAN_COLORS.GOLD,
              fontSize: 48,
              fontFamily: "Noto Sans KR",
              stroke: {
                color: KOREAN_COLORS.BLACK,
                width: 4,
              },
            }}
          />
        )}
      {gameState.phase === "victory" && ( // Use valid GamePhase value
        <Text
          text="게임 종료 (Game Over)"
          anchor={0.5}
          x={width / 2}
          y={height / 2 - 50}
          style={{
            fill: KOREAN_COLORS.GOLD,
            fontSize: 48,
            fontFamily: "Noto Sans KR",
            stroke: {
              color: KOREAN_COLORS.BLACK,
              width: 4,
            },
          }}
        />
      )}
    </Container>
  );
}
