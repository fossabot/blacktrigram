import React, { useState, useCallback } from "react";
import { usePixiExtensions } from "../../utils/pixiExtensions";
import { GameEngine } from "./GameEngine";
import { CombatHUD } from "../combat/components/CombatHUD";
import { CombatArena } from "../combat/components/CombatArena";
import { DojangBackground } from "./DojangBackground";
import { createPlayerFromArchetype } from "../../utils/playerUtils";
import { PlayerArchetype, GameMode } from "../../types/enums";
import type { PlayerState } from "../../types/player";
import type { CombatResult } from "../../types/combat";
import * as PIXI from "pixi.js";

export interface GameStarterProps {
  readonly gameMode: GameMode;
  readonly onGameEnd?: () => void;
  readonly onReturnToMenu?: () => void;
}

export const GameStarter: React.FC<GameStarterProps> = ({
  gameMode,
  onGameEnd,
  onReturnToMenu,
}) => {
  usePixiExtensions();

  // Initialize players
  const [players, setPlayers] = useState<[PlayerState, PlayerState]>(() => [
    createPlayerFromArchetype(PlayerArchetype.MUSA, 0),
    createPlayerFromArchetype(PlayerArchetype.AMSALJA, 1),
  ]);

  const [currentRound, setCurrentRound] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(180);
  const [isPaused, setIsPaused] = useState(false);

  const handlePlayerUpdate = useCallback(
    (playerIndex: number, updates: Partial<PlayerState>) => {
      setPlayers((prev) => {
        const newPlayers = [...prev] as [PlayerState, PlayerState];
        newPlayers[playerIndex] = { ...newPlayers[playerIndex], ...updates };
        return newPlayers;
      });
    },
    []
  );

  const handleCombatResult = useCallback(
    (result: CombatResult) => {
      console.log("Combat result:", result);

      // Update players based on combat result
      if (result.updatedAttacker && result.updatedDefender) {
        setPlayers([result.updatedAttacker, result.updatedDefender]);
      }

      // Check for game end conditions
      if (players.some((p) => p.health <= 0)) {
        onGameEnd?.();
      }
    },
    [players, onGameEnd]
  );

  const handleGameEvent = useCallback(
    (event: string, data?: any) => {
      console.log("Game event:", event, data);

      switch (event) {
        case "pause_toggle":
          setIsPaused(!isPaused);
          break;
        case "round_end":
          setCurrentRound((prev) => prev + 1);
          setTimeRemaining(180);
          break;
        case "return_to_menu":
          onReturnToMenu?.();
          break;
      }
    },
    [isPaused, onReturnToMenu]
  );

  return (
    <pixiContainer data-testid="game-starter">
      {/* Background */}
      <DojangBackground
        width={1200}
        height={800}
        lighting="cyberpunk"
        animate={true}
      />

      {/* Game Engine */}
      <GameEngine
        gameMode={gameMode}
        players={players}
        onPlayerUpdate={handlePlayerUpdate}
        onCombatResult={handleCombatResult}
        onGameEvent={handleGameEvent}
        isPaused={isPaused}
      />

      {/* Combat Arena */}
      <CombatArena
        players={players}
        width={1200}
        height={800}
        onPlayerClick={(index) => console.log(`Player ${index} clicked`)}
      />

      {/* Combat HUD */}
      <CombatHUD
        player1={players[0]}
        player2={players[1]}
        currentRound={currentRound}
        timeRemaining={timeRemaining}
        maxRounds={3}
        isPaused={isPaused}
        onPauseToggle={() => handleGameEvent("pause_toggle")}
        width={1200}
        height={80}
        y={0}
      />

      {/* Controls guide */}
      <pixiContainer x={50} y={720}>
        <pixiText
          text="조작법: 1-8(팔괘), SPACE(공격), ESC(일시정지)"
          style={
            new PIXI.TextStyle({
              fontSize: 14,
              fill: 0xffffff,
              fontFamily: "Arial, sans-serif",
            })
          }
        />
      </pixiContainer>
    </pixiContainer>
  );
};

export default GameStarter;
