import React, { useCallback } from "react";
import { Container } from "@pixi/react";
import type { CombatScreenProps } from "../../types/components";
import { CombatArena } from "./components/CombatArena";
import { CombatHUD } from "./components/CombatHUD";
import { CombatControls } from "./components/CombatControls";
import { DojangBackground } from "../game/DojangBackground";
import { GameEngine } from "../game/GameEngine";
import { GAME_CONFIG } from "../../types/constants";
import { BaseButton } from "../ui/base/BaseButton";
import { GameMode } from "../../types/enums";

export const CombatScreen: React.FC<CombatScreenProps> = ({
  players,
  currentRound,
  timeRemaining,
  isPaused,
  onPlayerUpdate,
  onReturnToMenu,
  onGameEnd, // Use this parameter
  gameMode = GameMode.VERSUS,
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
}) => {
  const handleCombatResult = useCallback((result: any) => {
    console.log("Combat result:", result);
    // Handle combat result processing
  }, []);

  const handleGameEvent = useCallback((event: string, data?: any) => {
    console.log("Game event:", event, data);
    // Handle game events like win conditions, round changes, etc.
  }, []);

  const handleGameEnd = useCallback(
    (winner?: PlayerState | null) => {
      console.log("Game ended. Winner:", winner?.name.english);
      onGameEnd(winner); // Use the onGameEnd prop
    },
    [onGameEnd]
  );

  return (
    <Container width={width} height={height}>
      {/* Background */}
      <DojangBackground
        width={width}
        height={height}
        animate={true}
        lighting="cyberpunk"
      />

      {/* Game Engine */}
      <GameEngine
        players={players}
        onPlayerUpdate={onPlayerUpdate}
        onCombatResult={handleCombatResult}
        onGameEvent={handleGameEvent}
        isPaused={isPaused}
        gameMode={gameMode}
      />

      {/* Combat Arena */}
      <CombatArena
        players={players}
        onPlayerClick={(playerIndex) => {
          console.log(`Player ${playerIndex + 1} clicked`);
        }}
      />

      {/* Combat HUD */}
      <CombatHUD
        players={players}
        player1={players[0]}
        player2={players[1]}
        timeRemaining={timeRemaining}
        currentRound={currentRound}
        maxRounds={3}
        isPaused={isPaused}
        onPauseToggle={() => {
          console.log("Pause toggle requested");
        }}
      />

      {/* Combat Controls */}
      <CombatControls
        onAttack={() => console.log("Attack")}
        onDefend={() => console.log("Defend")}
        onSwitchStance={() => console.log("Switch stance")}
        onPauseToggle={() => console.log("Pause toggle")}
        isPaused={isPaused}
        player={players[0]}
      />

      {/* Return to menu button */}
      <Container x={width - 150} y={20}>
        <BaseButton
          text="Menu"
          onClick={onReturnToMenu}
          variant="secondary"
          width={120}
          height={40}
        />
      </Container>
    </Container>
  );
};

export default CombatScreen;
