// Combat-focused game engine moved from game package

import React, { useCallback, useReducer, useEffect } from "react";
import { extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import type { PlayerState } from "../../../types/player";
import type { KoreanTechnique } from "../../../types/combat";
import type { GameEngineProps } from "../../../types/components";
import { CombatSystem } from "../../../systems/CombatSystem";
import { TrigramSystem } from "../../../systems/TrigramSystem";
import { VitalPointSystem } from "../../../systems/VitalPointSystem";

// Extend PixiJS components
extend({ Container, Graphics, Text });

// Combat-specific game state
interface CombatGameState {
  readonly isActive: boolean;
  readonly currentTurn: number;
  readonly combatPhase: "preparation" | "execution" | "recovery" | "finished";
  readonly lastAction: KoreanTechnique | null;
  readonly combatHistory: readonly KoreanTechnique[];
}

type CombatGameAction = 
  | { type: "START_COMBAT" }
  | { type: "EXECUTE_TECHNIQUE"; payload: KoreanTechnique }
  | { type: "END_TURN" }
  | { type: "FINISH_COMBAT" };

function combatGameReducer(
  state: CombatGameState, 
  action: CombatGameAction
): CombatGameState {
  switch (action.type) {
    case "START_COMBAT":
      return { ...state, isActive: true, combatPhase: "execution" };
    
    case "EXECUTE_TECHNIQUE":
      return {
        ...state,
        combatPhase: "recovery",
        lastAction: action.payload,
        combatHistory: [...state.combatHistory, action.payload],
      };
    
    case "END_TURN":
      return {
        ...state,
        currentTurn: state.currentTurn + 1,
        combatPhase: "execution",
        lastAction: null,
      };
    
    case "FINISH_COMBAT":
      return { ...state, isActive: false, combatPhase: "finished" };
    
    default:
      return state;
  }
}

export const GameEngine: React.FC<GameEngineProps> = ({
  players,
  onPlayerUpdate,
  onCombatResult,
  onGameEvent,
  isPaused = false,
  gameMode = "versus",
  width = 1200,
  height = 800,
}) => {
  // Combat systems
  const [combatSystem] = React.useState(() => new CombatSystem());
  const [trigramSystem] = React.useState(() => new TrigramSystem());
  const [vitalPointSystem] = React.useState(() => new VitalPointSystem());

  // Combat state management
  const [gameState, dispatch] = useReducer(combatGameReducer, {
    isActive: false,
    currentTurn: 0,
    combatPhase: "preparation",
    lastAction: null,
    combatHistory: [],
  });

  // Initialize combat systems
  useEffect(() => {
    onGameEvent("engine_initialized", { 
      mode: gameMode, 
      playerCount: players.length 
    });
  }, [gameMode, players.length, onGameEvent]);

  // Combat action processing
  const processCombatAction = useCallback(
    (playerId: string, technique: KoreanTechnique) => {
      const playerIndex = players.findIndex(p => p.id === playerId);
      if (playerIndex === -1) return;

      const attacker = players[playerIndex];
      const defender = players[1 - playerIndex];

      // Execute technique through combat system
      const result = combatSystem.executeTechnique(
        attacker,
        defender,
        technique
      );

      // Update player states based on combat result
      if (result.success) {
        onPlayerUpdate(1 - playerIndex, {
          health: Math.max(0, defender.health - result.damage),
          lastHitTime: Date.now(),
        });

        onPlayerUpdate(playerIndex, {
          stamina: Math.max(0, attacker.stamina - technique.staminaCost),
          ki: Math.max(0, attacker.ki - technique.kiCost),
          lastActionTime: Date.now(),
        });
      }

      // Dispatch to game state
      dispatch({ type: "EXECUTE_TECHNIQUE", payload: technique });

      // Notify combat result
      onCombatResult(result);

      // Game event for technique execution
      onGameEvent("technique_executed", {
        attacker: playerId,
        technique: technique.name.korean,
        success: result.success,
        damage: result.damage,
      });
    },
    [players, combatSystem, onPlayerUpdate, onCombatResult, onGameEvent]
  );

  // Enhanced arena rendering with combat state
  const renderCombatArena = useCallback(
    (g: any) => {
      g.clear();
      
      // Arena background with combat state colors
      const backgroundColor = gameState.isActive ? 0x1a2040 : 0x1a1a2e;
      g.fill({ color: backgroundColor, alpha: 0.8 });
      g.rect(0, 0, width, height);
      g.fill();

      // Combat phase indicator
      if (gameState.isActive) {
        const phaseColor = gameState.combatPhase === "execution" ? 0x00ff00 : 0xffaa00;
        g.stroke({ width: 3, color: phaseColor, alpha: 0.6 });
        g.rect(10, 10, width - 20, height - 20);
        g.stroke();
      }

      // Center combat circle
      g.stroke({ width: 2, color: 0x00ffff, alpha: 0.5 });
      g.circle(width / 2, height / 2, Math.min(width, height) * 0.3);
      g.stroke();

      // Turn indicator
      if (gameState.isActive) {
        const turnIndicatorY = 20;
        g.fill({ color: 0xffd700, alpha: 0.8 });
        g.rect(width / 2 - 50, turnIndicatorY, 100, 20);
        g.fill();
      }
    },
    [width, height, gameState]
  );

  // Enhanced player rendering with combat integration
  const renderCombatPlayer = useCallback(
    (player: PlayerState, index: number) => {
      const x = index === 0 ? width * 0.25 : width * 0.75;
      const y = height * 0.5;
      
      return (
        <pixiContainer key={player.id} x={x} y={y}>
          {/* Player visual representation */}
          <pixiGraphics
            draw={(g) => {
              g.clear();
              
              // Player body with archetype colors
              const bodyColor = index === 0 ? 0x00ccff : 0xff6600;
              const isActive = gameState.currentTurn % 2 === index;
              const alpha = isActive ? 1.0 : 0.7;
              
              g.fill({ color: bodyColor, alpha });
              g.circle(0, -40, 15); // Head
              g.rect(-8, -25, 16, 40); // Body
              g.rect(-6, 15, 5, 25); // Left leg
              g.rect(1, 15, 5, 25); // Right leg
              g.rect(-15, -20, 10, 5); // Left arm
              g.rect(5, -20, 10, 5); // Right arm
              g.fill();

              // Combat readiness indicator
              if (gameState.isActive && isActive) {
                g.stroke({ width: 2, color: 0xffd700, alpha: 0.8 });
                g.circle(0, 0, 50);
                g.stroke();
              }

              // Health visualization
              const healthPercent = player.health / player.maxHealth;
              const healthColor = healthPercent > 0.5 ? 0x00ff00 : 
                                healthPercent > 0.25 ? 0xffaa00 : 0xff0000;
              g.fill({ color: healthColor, alpha: 0.8 });
              g.rect(-30, -60, 60 * healthPercent, 5);
              g.fill();
            }}
            interactive={true}
            onPointerDown={() => {
              if (gameState.isActive && gameState.combatPhase === "execution") {
                // Execute basic attack
                const basicTechnique: KoreanTechnique = {
                  id: "basic_attack",
                  name: { korean: "기본공격", english: "Basic Attack", romanized: "gibon_gonggyeok" },
                  koreanName: "기본공격",
                  englishName: "Basic Attack", 
                  romanized: "gibon_gonggyeok",
                  description: { korean: "기본적인 공격", english: "Basic attack" },
                  stance: player.currentStance,
                  type: "strike" as any,
                  damageType: "blunt" as any,
                  damage: 15,
                  kiCost: 5,
                  staminaCost: 8,
                  accuracy: 0.85,
                  range: 1.0,
                  executionTime: 400,
                  recoveryTime: 200,
                  critChance: 0.1,
                  critMultiplier: 1.5,
                  effects: [],
                };
                
                processCombatAction(player.id, basicTechnique);
              }
            }}
          />

          {/* Enhanced player info display */}
          <pixiText
            text={player.name.korean}
            style={{
              fontSize: 14,
              fill: 0xffffff,
              align: "center",
              fontWeight: "bold",
            }}
            x={0}
            y={-80}
            anchor={0.5}
          />
          
          {/* Current stance display */}
          <pixiText
            text={`자세: ${player.currentStance}`}
            style={{
              fontSize: 10,
              fill: 0xffd700,
              align: "center",
            }}
            x={0}
            y={-65}
            anchor={0.5}
          />
        </pixiContainer>
      );
    },
    [width, height, gameState, processCombatAction]
  );

  // Combat state UI overlay
  const renderCombatUI = useCallback(() => {
    if (!gameState.isActive) return null;

    return (
      <pixiContainer x={width / 2} y={30}>
        <pixiText
          text={`턴 ${gameState.currentTurn + 1} - ${gameState.combatPhase}`}
          style={{
            fontSize: 16,
            fill: 0xffd700,
            align: "center",
            fontWeight: "bold",
          }}
          anchor={0.5}
        />
        
        {gameState.lastAction && (
          <pixiText
            text={`마지막 기술: ${gameState.lastAction.name.korean}`}
            style={{
              fontSize: 12,
              fill: 0x00ffff,
              align: "center",
            }}
            y={20}
            anchor={0.5}
          />
        )}
      </pixiContainer>
    );
  }, [gameState, width]);

  // Auto-start combat after brief delay
  useEffect(() => {
    if (!gameState.isActive && players.length >= 2) {
      const timer = setTimeout(() => {
        dispatch({ type: "START_COMBAT" });
        onGameEvent("combat_started", { players: players.length });
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [gameState.isActive, players.length, onGameEvent]);

  // Auto-advance turns
  useEffect(() => {
    if (gameState.combatPhase === "recovery") {
      const timer = setTimeout(() => {
        dispatch({ type: "END_TURN" });
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [gameState.combatPhase]);

  return (
    <pixiContainer
      data-testid="combat-game-engine"
      x={0}
      y={0}
      width={width}
      height={height}
    >
      {/* Enhanced arena background */}
      <pixiGraphics draw={renderCombatArena} />

      {/* Combat players */}
      {players.map(renderCombatPlayer)}

      {/* Combat UI overlay */}
      {renderCombatUI()}

      {/* Pause overlay */}
      {isPaused && (
        <pixiContainer x={width / 2} y={height / 2}>
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.fill({ color: 0x000000, alpha: 0.7 });
              g.rect(-100, -30, 200, 60);
              g.fill();
            }}
          />
          <pixiText
            text="일시정지 - PAUSED"
            style={{
              fontSize: 18,
              fill: 0xffffff,
              align: "center",
              fontWeight: "bold",
            }}
            anchor={0.5}
          />
        </pixiContainer>
      )}
    </pixiContainer>
  );
};

export default GameEngine;
