import React, { useCallback, useState, useEffect } from "react";
import { Container, Stage } from "@pixi/react";
import { Player } from "./Player";
import { GameUI } from "./GameUI";
import { DojangBackground } from "./DojangBackground";
import { HitEffectsLayer } from "./HitEffectsLayer";
import { CombatSystem } from "../../systems/CombatSystem";
import type {
  PlayerState,
  GamePhase,
  HitEffect,
  KoreanTechnique,
  TrigramStance,
} from "../../types";

interface GameEngineProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly gamePhase: GamePhase;
  readonly onPlayersChange: (players: [PlayerState, PlayerState]) => void;
  readonly onGamePhaseChange: (phase: GamePhase) => void;
  readonly onExit?: () => void;
}

export function GameEngine({
  players,
  gamePhase,
  onPlayersChange,
  onGamePhaseChange,
}: GameEngineProps): React.ReactElement {
  const [hitEffects, setHitEffects] = useState<HitEffect[]>([]);
  const [gameTime, setGameTime] = useState<number>(Date.now());
  const [roundTimer, setRoundTimer] = useState<number>(60);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [combatLog, setCombatLog] = useState<string[]>([]);

  // Game timer and round management
  useEffect(() => {
    if (gamePhase !== "combat") return;

    const interval = setInterval(() => {
      const now = Date.now();
      setGameTime(now);

      // Update round timer
      setRoundTimer((prev) => {
        const newTime = Math.max(0, prev - 1);
        if (newTime === 0) {
          onGamePhaseChange("result");
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gamePhase, onGamePhaseChange]);

  // Handle player attacks
  const handlePlayerAttack = useCallback(
    (attackerIndex: 0 | 1, technique: KoreanTechnique) => {
      if (gamePhase !== "combat") return;

      const attacker = players[attackerIndex];
      const defender = players[attackerIndex === 0 ? 1 : 0];

      // Resolve attack using combat system
      const result = CombatSystem.resolveAttack(
        attacker,
        defender,
        technique,
        []
      );

      // Create hit effect if attack landed
      if (result.hit) {
        const newHitEffect: HitEffect = {
          id: `hit-${Date.now()}-${Math.random()}`,
          position: {
            x: defender.position.x + (Math.random() - 0.5) * 20,
            y: defender.position.y - 30 + (Math.random() - 0.5) * 20,
          },
          type: result.critical
            ? "critical"
            : result.damage > 25
            ? "heavy"
            : result.damage > 15
            ? "medium"
            : "light",
          damage: result.damage,
          startTime: Date.now(),
          duration: result.critical ? 2000 : 1500,
          korean: result.critical ? "치명타!" : "타격",
          color: result.critical
            ? 0xff0000
            : result.damage > 25
            ? 0xff6600
            : result.damage > 15
            ? 0xffaa00
            : 0xffff00,
          createdAt: Date.now(),
        };

        setHitEffects((prev) => [...prev, newHitEffect]);

        // Add to combat log
        const logEntry = `${attacker.playerId}: ${technique.koreanName} → ${result.damage} 피해`;
        setCombatLog((prev) => [...prev.slice(-9), logEntry]);
      } else {
        // Miss effect
        const missEffect: HitEffect = {
          id: `miss-${Date.now()}-${Math.random()}`,
          position: {
            x: defender.position.x + (Math.random() - 0.5) * 40,
            y: defender.position.y - 20,
          },
          type: "miss",
          damage: 0,
          startTime: Date.now(),
          duration: 1000,
          korean: "빗나감",
          color: 0x888888,
          createdAt: Date.now(),
        };

        setHitEffects((prev) => [...prev, missEffect]);
        setCombatLog((prev) => [
          ...prev.slice(-9),
          `${attacker.playerId}: ${technique.koreanName} → 빗나감`,
        ]);
      }

      // Update player states - convert readonly to mutable
      const updatedPlayers: [PlayerState, PlayerState] = [
        attackerIndex === 0 ? result.attackerState : result.defenderState,
        attackerIndex === 1 ? result.attackerState : result.defenderState,
      ];

      onPlayersChange(updatedPlayers);

      // Check for victory conditions
      if (result.defenderState.health <= 0) {
        onGamePhaseChange("victory");
        setCombatLog((prev) => [...prev, `${attacker.playerId} 승리!`]);
      }
    },
    [players, gamePhase, onPlayersChange, onGamePhaseChange]
  );

  // Handle stance changes
  const handleStanceChange = useCallback(
    (playerIndex: 0 | 1, newStance: TrigramStance) => {
      if (gamePhase !== "combat") return;

      const updatedPlayers: [PlayerState, PlayerState] = [
        playerIndex === 0 ? { ...players[0], stance: newStance } : players[0],
        playerIndex === 1 ? { ...players[1], stance: newStance } : players[1],
      ];

      onPlayersChange(updatedPlayers);

      // Add stance change to combat log
      const player = updatedPlayers[playerIndex];
      setCombatLog((prev) => [
        ...prev.slice(-9),
        `${player.playerId}: ${newStance} 자세 변경`,
      ]);
    },
    [players, gamePhase, onPlayersChange]
  );

  // Handle player death
  const handlePlayerDeath = useCallback(() => {
    onGamePhaseChange("defeat");
  }, [onGamePhaseChange]);

  // Remove completed hit effects
  const handleEffectComplete = useCallback((effectId: string) => {
    setHitEffects((prev) => prev.filter((effect) => effect.id !== effectId));
  }, []);

  // Game control handlers
  const handleStartMatch = useCallback(() => {
    setRoundTimer(60);
    setCurrentRound(1);
    setCombatLog([]);
    setHitEffects([]);
    onGamePhaseChange("combat");
  }, [onGamePhaseChange]);

  const handleResetMatch = useCallback(() => {
    // Reset players to full health and ki
    const resetPlayers: [PlayerState, PlayerState] = [
      {
        ...players[0],
        health: players[0].maxHealth,
        ki: players[0].maxKi,
        stamina: players[0].maxStamina,
        conditions: [],
        isAttacking: false,
        isBlocking: false,
      },
      {
        ...players[1],
        health: players[1].maxHealth,
        ki: players[1].maxKi,
        stamina: players[1].maxStamina,
        conditions: [],
        isAttacking: false,
        isBlocking: false,
      },
    ];

    onPlayersChange(resetPlayers);
    setRoundTimer(60);
    setCurrentRound(1);
    setCombatLog([]);
    setHitEffects([]);
    onGamePhaseChange("combat");
  }, [players, onPlayersChange, onGamePhaseChange]);

  const handleTogglePause = useCallback(() => {
    if (gamePhase === "combat") {
      onGamePhaseChange("result");
    } else if (gamePhase === "result") {
      onGamePhaseChange("combat");
    }
  }, [gamePhase, onGamePhaseChange]);

  // Handle UI stance changes with proper typing
  const handleUIStanceChange = useCallback(
    (playerIndex: number, stance: TrigramStance) => {
      if (playerIndex === 0 || playerIndex === 1) {
        handleStanceChange(playerIndex as 0 | 1, stance);
      }
    },
    [handleStanceChange]
  );

  return (
    <Stage
      width={1200}
      height={800}
      options={{
        backgroundColor: 0x1a1a2e,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
      }}
      data-testid="game-engine"
    >
      <Container>
        {/* Dojang background with required props */}
        <DojangBackground width={1200} height={800} />

        {/* Player 1 */}
        <Player
          player={players[0]}
          onAttack={(technique) => handlePlayerAttack(0, technique)}
          onStanceChange={(stance) => handleStanceChange(0, stance)}
          onDeath={handlePlayerDeath}
          scale={1.0}
          debug={gamePhase === "combat"}
        />

        {/* Player 2 */}
        <Player
          player={players[1]}
          onAttack={(technique) => handlePlayerAttack(1, technique)}
          onStanceChange={(stance) => handleStanceChange(1, stance)}
          onDeath={handlePlayerDeath}
          scale={1.0}
          debug={gamePhase === "combat"}
        />

        {/* Hit effects layer */}
        <HitEffectsLayer
          effects={hitEffects}
          onEffectComplete={handleEffectComplete}
        />

        {/* Game UI overlay - convert readonly to mutable for props */}
        <GameUI
          players={[...players] as [PlayerState, PlayerState]}
          gamePhase={gamePhase}
          onGamePhaseChange={onGamePhaseChange}
          gameTime={gameTime}
          currentRound={currentRound}
          timeRemaining={roundTimer}
          onStanceChange={handleUIStanceChange}
          combatLog={combatLog}
          onStartMatch={handleStartMatch}
          onResetMatch={handleResetMatch}
          onTogglePause={handleTogglePause}
        />
      </Container>
    </Stage>
  );
}
