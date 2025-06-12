import React from "react";
import { Application } from "@pixi/react";
import type { PlayerState } from "../../types/player";

// Fix: Define proper GameUIProps interface locally
interface GameUIProps {
  readonly players: PlayerState[];
  readonly roundNumber: number;
  readonly timeRemaining: number;
  readonly isPaused: boolean;
  readonly onTogglePause: () => void;
  readonly onReturnToMenu: () => void;
  readonly width?: number;
  readonly height?: number;
}

export const GameUI: React.FC<GameUIProps> = ({
  players,
  roundNumber,
  timeRemaining,
  isPaused,
  // Remove unused variables to fix warnings
  // onTogglePause,
  // onReturnToMenu,
  width = 1200,
  height = 800,
}) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ width, height, position: "relative" }}>
      <Application
        width={width}
        height={height}
        // Fix: Use backgroundColor instead of background
        backgroundColor={0x000000}
        data-testid="game-ui"
      >
        {/* Player 1 Health Bar */}
        <pixiContainer x={20} y={20}>
          <pixiGraphics
            draw={(g) => {
              g.clear();
              if (players[0]) {
                const healthPercent = players[0].health / players[0].maxHealth;
                g.fill({ color: 0x00ff00, alpha: 0.8 });
                g.rect(0, 0, 200 * healthPercent, 20);
                g.fill();

                g.stroke({ width: 2, color: 0xffffff, alpha: 0.8 });
                g.rect(0, 0, 200, 20);
                g.stroke();
              }
            }}
          />

          <pixiText
            text={players[0]?.name.korean || "Player 1"}
            style={{
              fontSize: 16,
              fill: 0xffffff,
              fontWeight: "bold",
            }}
            x={0}
            y={-25}
          />
        </pixiContainer>

        {/* Player 2 Health Bar */}
        <pixiContainer x={width - 220} y={20}>
          <pixiGraphics
            draw={(g) => {
              g.clear();
              if (players[1]) {
                const healthPercent = players[1].health / players[1].maxHealth;
                g.fill({ color: 0xff6600, alpha: 0.8 });
                g.rect(0, 0, 200 * healthPercent, 20);
                g.fill();

                g.stroke({ width: 2, color: 0xffffff, alpha: 0.8 });
                g.rect(0, 0, 200, 20);
                g.stroke();
              }
            }}
          />

          <pixiText
            text={players[1]?.name.korean || "Player 2"}
            style={{
              fontSize: 16,
              fill: 0xffffff,
              fontWeight: "bold",
            }}
            x={0}
            y={-25}
          />
        </pixiContainer>

        {/* Round and Timer */}
        <pixiContainer x={width / 2} y={30}>
          <pixiText
            text={`Round ${roundNumber} - ${formatTime(timeRemaining)}`}
            style={{
              fontSize: 20,
              fill: 0x00ffff,
              fontWeight: "bold",
              align: "center",
            }}
            anchor={0.5}
          />
        </pixiContainer>

        {/* Pause indicator */}
        {isPaused && (
          <pixiContainer x={width / 2} y={height / 2}>
            <pixiText
              text="PAUSED"
              style={{
                fontSize: 48,
                fill: 0xff0000,
                fontWeight: "bold",
                align: "center",
              }}
              anchor={0.5}
            />
          </pixiContainer>
        )}

        {/* Control hints */}
        <pixiContainer x={20} y={height - 50}>
          <pixiText
            text="ESC: Pause | M: Menu"
            style={{
              fontSize: 14,
              fill: 0xcccccc,
            }}
          />
        </pixiContainer>
      </Application>
    </div>
  );
};

export default GameUI;
