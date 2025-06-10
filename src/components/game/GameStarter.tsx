import React, { useState, useCallback } from "react";
import * as PIXI from "pixi.js";
import { GameEngine } from "./GameEngine";
import { CombatHUD } from "../combat/components/CombatHUD";
import { CombatArena } from "../combat/components/CombatArena";
import { TrigramWheel } from "../ui/TrigramWheel";
import { DojangBackground } from "./DojangBackground";
import { GameMode } from "../../types/enums";
import type { PlayerState } from "../../types/player";
import type { TrigramStance } from "../../types/trigram";

export interface GameStarterProps {
  readonly gameMode: GameMode;
  readonly onGameEnd?: () => void;
}

export const GameStarter: React.FC<GameStarterProps> = ({
  gameMode,
  onGameEnd,
}) => {
  // Initialize players with complete PlayerState properties
  const [players, setPlayers] = useState<PlayerState[]>([
    {
      id: "player1",
      name: { korean: "플레이어 1", english: "Player 1" },
      archetype: "MUSA" as any,
      health: 100,
      maxHealth: 100,
      ki: 50,
      maxKi: 100,
      stamina: 100,
      maxStamina: 100,
      energy: 100,
      maxEnergy: 100,
      attackPower: 50,
      defense: 30,
      speed: 40,
      technique: 75,
      pain: 0,
      consciousness: 100,
      balance: 100,
      momentum: 0,
      combatState: "idle" as any,
      isBlocking: false,
      isStunned: false,
      isCountering: false,
      lastActionTime: 0,
      recoveryTime: 0,
      lastStanceChangeTime: 0,
      statusEffects: [],
      activeEffects: [],
      vitalPoints: [],
      totalDamageReceived: 0,
      totalDamageDealt: 0,
      hitsTaken: 0,
      hitsLanded: 0,
      perfectStrikes: 0,
      vitalPointHits: 0,
      currentStance: "geon" as TrigramStance,
      position: { x: 100, y: 300 },
    },
    {
      id: "player2",
      name: { korean: "플레이어 2", english: "Player 2" },
      archetype: "AMSALJA" as any,
      health: 100,
      maxHealth: 100,
      ki: 50,
      maxKi: 100,
      stamina: 100,
      maxStamina: 100,
      energy: 100,
      maxEnergy: 100,
      attackPower: 60,
      defense: 25,
      speed: 55,
      technique: 85,
      pain: 0,
      consciousness: 100,
      balance: 100,
      momentum: 0,
      combatState: "idle" as any,
      isBlocking: false,
      isStunned: false,
      isCountering: false,
      lastActionTime: 0,
      recoveryTime: 0,
      lastStanceChangeTime: 0,
      statusEffects: [],
      activeEffects: [],
      vitalPoints: [],
      totalDamageReceived: 0,
      totalDamageDealt: 0,
      hitsTaken: 0,
      hitsLanded: 0,
      perfectStrikes: 0,
      vitalPointHits: 0,
      currentStance: "tae" as TrigramStance,
      position: { x: 600, y: 300 },
    },
  ]);

  const [currentRound] = useState(1);
  const [timeRemaining] = useState(60);

  const handlePlayerUpdate = useCallback(
    (playerIndex: number, updates: Partial<PlayerState>) => {
      setPlayers((prev) => {
        const newPlayers = [...prev];
        newPlayers[playerIndex] = { ...newPlayers[playerIndex], ...updates };
        return newPlayers;
      });
    },
    []
  );

  const handleStanceSelect = useCallback(
    (stance: TrigramStance) => {
      // Apply stance change to player 1 (player can control)
      handlePlayerUpdate(0, {
        ...players[0],
        currentStance: stance,
        ki: Math.min(players[0].ki + 5, players[0].maxKi),
      });
    },
    [players, handlePlayerUpdate]
  );

  const handleCombatResult = useCallback(
    (result: any) => {
      console.log("Combat result:", result);
      // Check for game end conditions
      if (players.some((p) => p.health <= 0)) {
        onGameEnd?.();
      }
    },
    [players, onGameEnd]
  );

  const handleGameEvent = useCallback((event: any) => {
    console.log("Game event:", event);
    // Handle various game events
  }, []);

  return (
    <pixiContainer data-testid="game-starter">
      {/* Background */}
      <DojangBackground
        width={800}
        height={600}
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
      />

      {/* Combat Arena */}
      <CombatArena
        players={
          players.slice(0, 2) as unknown as readonly [PlayerState, PlayerState]
        } // Fix: Safe conversion
        width={800}
        height={600}
      />

      {/* Combat HUD */}
      <CombatHUD
        player1={players[0]}
        player2={players[1]}
        currentRound={currentRound}
        timeRemaining={timeRemaining}
        maxRounds={3}
        isPaused={false}
        width={800}
      />

      {/* Trigram Wheel for stance selection */}
      <pixiContainer x={50} y={450}>
        <TrigramWheel
          currentStance={players[0].currentStance}
          onStanceSelect={handleStanceSelect}
          radius={80}
        />
      </pixiContainer>

      {/* Game controls info */}
      <pixiContainer x={650} y={450}>
        <pixiText
          text="조작법 (Controls):"
          style={
            new PIXI.TextStyle({
              fontSize: 14,
              fill: 0xffffff,
              fontWeight: "bold",
            })
          }
          y={0}
        />
        <pixiText
          text="1-8: 팔괘 자세"
          style={
            new PIXI.TextStyle({
              fontSize: 12,
              fill: 0xcccccc,
            })
          }
          y={20}
        />
        <pixiText
          text="SPACE: 기술 실행"
          style={
            new PIXI.TextStyle({
              fontSize: 12,
              fill: 0xcccccc,
            })
          }
          y={35}
        />
        <pixiText
          text="ESC: 일시정지"
          style={
            new PIXI.TextStyle({
              fontSize: 12,
              fill: 0xcccccc,
            })
          }
          y={50}
        />
      </pixiContainer>
    </pixiContainer>
  );
};

export default GameStarter;
