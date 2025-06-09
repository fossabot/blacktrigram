import React, { useCallback, useState } from "react";
import { Container } from "@pixi/react";
import type { CombatScreenProps, PlayerState } from "../../types";
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
  onGameEnd,
  gameMode = GameMode.VERSUS,
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
}) => {
  const [isExecutingTechnique, setIsExecutingTechnique] = useState(false);

  const handleCombatResult = useCallback(
    (result: any) => {
      console.log("Combat result:", result);
      // Check for win conditions
      if (result.winner) {
        onGameEnd(result.winner);
      }
    },
    [onGameEnd]
  );

  const handleGameEvent = useCallback(
    (event: string, data?: any) => {
      console.log("Game event:", event, data);
      // Handle game events like win conditions, round changes, etc.
      if (event === "player_defeated") {
        onGameEnd(data.winner);
      }
    },
    [onGameEnd]
  );

  const handlePlayerAction = useCallback(
    (playerIndex: 0 | 1, action: string) => {
      console.log(`Player ${playerIndex + 1} performed: ${action}`);
      setIsExecutingTechnique(true);

      // Reset technique execution after animation
      setTimeout(() => {
        setIsExecutingTechnique(false);
      }, 500);
    },
    []
  );

  const handlePauseToggle = useCallback(() => {
    // Pause logic would be handled by parent component (App.tsx)
    console.log("Pause toggle requested");
  }, []);

  const handleStanceSwitch = useCallback(
    (stance: any) => {
      if (players[0]) {
        onPlayerUpdate(0, { currentStance: stance });
      }
    },
    [onPlayerUpdate, players]
  );

  const handleTechniqueExecute = useCallback(
    (technique: any) => {
      console.log("Executing technique:", technique);
      handlePlayerAction(0, `technique_${technique.id}`);
    },
    [handlePlayerAction]
  );

  // Fix: Create a wrapper function that matches GameEngineProps signature
  const handlePlayerUpdateForEngine = useCallback(
    (playerIndex: number, updates: Partial<PlayerState>) => {
      // Convert number to 0 | 1 for CombatScreenProps
      if (playerIndex === 0 || playerIndex === 1) {
        onPlayerUpdate(playerIndex as 0 | 1, updates as PlayerState);
      }
    },
    [onPlayerUpdate]
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
        onPlayerUpdate={handlePlayerUpdateForEngine} // Fix: Use wrapper function
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
        width={width}
        height={height - 200} // Leave space for HUD and controls
        y={100}
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
        onPauseToggle={handlePauseToggle}
        width={width}
        height={100}
        y={0}
      />

      {/* Combat Controls */}
      <CombatControls
        onAttack={() => handlePlayerAction(0, "attack")}
        onDefend={() => handlePlayerAction(0, "defend")}
        onSwitchStance={handleStanceSwitch}
        onPauseToggle={handlePauseToggle}
        isPaused={isPaused}
        player={players[0]}
        onTechniqueExecute={handleTechniqueExecute}
        onGuard={() => handlePlayerAction(0, "guard")}
        isExecutingTechnique={isExecutingTechnique}
        width={width}
        height={120}
        y={height - 120}
      />

      {/* Return to menu button */}
      <Container x={width - 150} y={20}>
        <BaseButton
          text="메뉴 (Menu)"
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
