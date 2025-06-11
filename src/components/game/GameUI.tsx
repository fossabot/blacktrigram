import React from "react";
import { usePixiExtensions } from "../../utils/pixiExtensions";
import { HealthBar } from "../ui/HealthBar";
import { StanceIndicator } from "../ui/StanceIndicator";
import { RoundTimer } from "../ui/RoundTimer";
import type { GameUIProps, PlayerState } from "../../types/components";
import { Application } from "pixi.js";

export interface GameUIProps {
  readonly players: readonly PlayerState[];
  readonly roundNumber: number;
  readonly timeRemaining: number;
  readonly isPaused: boolean;
  readonly onTogglePause: () => void;
  readonly onReturnToMenu: () => void;
  readonly width: number;
  readonly height: number;
}

export const GameUI: React.FC<GameUIProps> = ({
  players,
  roundNumber,
  timeRemaining,
  isPaused,
  onTogglePause,
  onReturnToMenu,
  width,
  height,
}) => {
  usePixiExtensions();

  const handleReturnClick = () => {
    onReturnToMenu();
  };

  return (
    <Application
      width={width}
      height={height}
      preference="webgl"
      data-testid="game-ui"
    >
      {/* Player 1 Health Bar */}
      <HealthBar
        x={20}
        y={20}
        width={200}
        height={20}
        current={players[0].health}
        max={players[0].maxHealth}
        position="left"
        playerName={players[0].name.korean}
        showText={true}
        screenWidth={800}
        screenHeight={600}
      />

      {/* Round Timer */}
      <RoundTimer
        x={300}
        y={20}
        currentRound={roundNumber}
        maxRounds={3}
        timeRemaining={timeRemaining}
        totalTime={180}
        width={200}
        height={40}
        isPaused={isPaused}
        screenWidth={800}
        screenHeight={600}
      />

      {/* Player 2 Health Bar */}
      <HealthBar
        x={580}
        y={20}
        width={200}
        height={20}
        current={players[1].health}
        max={players[1].maxHealth}
        position="right"
        playerName={players[1].name.korean}
        showText={true}
        screenWidth={800}
        screenHeight={600}
      />

      {/* Player 1 Stance Indicator */}
      <StanceIndicator
        x={20}
        y={height - 100}
        stance={players[0].currentStance}
        size={60}
      />

      {/* Player 2 Stance Indicator */}
      <StanceIndicator
        x={width - 80}
        y={height - 100}
        stance={players[1].currentStance}
        size={60}
      />

      {/* Return button */}
      <pixiContainer x={20} y={height - 50}>
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.beginFill(0x666666, 0.8);
            g.drawRoundedRect(0, 0, 80, 30, 5);
            g.endFill();
          }}
          interactive={true}
          onPointerDown={handleReturnClick}
        />
        <pixiText
          text="돌아가기"
          style={{ fontSize: 12, fill: 0xffffff }}
          x={40}
          y={15}
          anchor={0.5}
        />
      </pixiContainer>
    </Application>
  );
};

export default GameUI;
