import React from "react";
import { usePixiExtensions } from "../../utils/pixiExtensions";
import { HealthBar } from "../ui/HealthBar";
import { StanceIndicator } from "../ui/StanceIndicator";
import { RoundTimer } from "../ui/RoundTimer";
import type { GameUIProps } from "../../types/components";

export const GameUI: React.FC<GameUIProps> = ({
  gameState,
  onStateChange, // Fix: Use this parameter
  onReturnToMenu,
  onPlayerUpdate,
  x = 0,
  y = 0,
  width = 800,
  height = 600,
}) => {
  usePixiExtensions();

  const handleReturnClick = () => {
    onReturnToMenu();
  };

  // Fix: Use onStateChange for any state changes
  React.useEffect(() => {
    if (gameState.players[0].health <= 0) {
      onStateChange({ winner: 1 });
      onPlayerUpdate({});
    }
  }, [gameState, onStateChange, onPlayerUpdate]);

  return (
    <pixiContainer x={x} y={y} data-testid="game-ui">
      {/* Player 1 Health Bar */}
      <HealthBar
        x={20}
        y={20}
        width={200}
        height={20}
        currentHealth={gameState.players[0].health}
        maxHealth={gameState.players[0].maxHealth}
      />

      {/* Round Timer */}
      <RoundTimer
        x={width / 2 - 50}
        y={20}
        timeRemaining={gameState.timeRemaining}
        totalTime={180} // Fix: Use totalTime instead of maxTime
      />

      {/* Player 2 Health Bar */}
      <HealthBar
        x={width - 220}
        y={20}
        width={200}
        height={20}
        currentHealth={gameState.players[1].health}
        maxHealth={gameState.players[1].maxHealth}
      />

      {/* Player 1 Stance Indicator */}
      <StanceIndicator
        x={20}
        y={height - 100}
        stance={gameState.players[0].currentStance}
        size={60}
      />

      {/* Player 2 Stance Indicator */}
      <StanceIndicator
        x={width - 80}
        y={height - 100}
        stance={gameState.players[1].currentStance}
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
    </pixiContainer>
  );
};

export default GameUI;
