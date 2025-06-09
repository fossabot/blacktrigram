// Complete game engine for Black Trigram Korean martial arts

import { useState, useMemo, useCallback, useEffect } from "react";
import * as PIXI from "pixi.js";
import { Graphics, Text, useTick } from "@pixi/react";
import { CombatSystem } from "../../systems/CombatSystem";
import { TrigramSystem } from "../../systems/TrigramSystem";
import type {
  PlayerState,
  CombatResult,
  HitEffect,
  TrigramStance,
} from "../../types";
import { GameMode } from "../../types/enums";
import { HitEffectType } from "../../types/effects";
import { KOREAN_COLORS } from "../../types/constants";

interface GameEngineProps {
  players: readonly [PlayerState, PlayerState];
  onPlayerUpdate: (playerIndex: 0 | 1, updates: Partial<PlayerState>) => void;
  onCombatResult: (result: CombatResult) => void;
  onGameEvent: (event: string, data?: any) => void;
  isPaused: boolean;
  gameMode?: GameMode; // Added gameMode prop
  gameTime?: number; // Added gameTime prop with default
}

// Define checkWinCondition outside or as a static method if it doesn't need component scope
// If it needs onGameEvent, it should be passed or defined within the component.
// For now, assuming it's a utility that can be called statically or needs onGameEvent passed.
const checkWinConditionAndUpdate = (
  currentPlayers: readonly [PlayerState, PlayerState],
  onGameEventCallback: (event: string, data?: any) => void
) => {
  const winner = CombatSystem.checkWinCondition(currentPlayers);
  if (winner === undefined) {
    onGameEventCallback("gameOver", { winner: null, reason: "Draw" });
  } else if (winner) {
    onGameEventCallback("gameOver", { winner, reason: "Knockout" });
  }
  // If winner is null, game continues
};

export function GameEngine({
  players,
  onPlayerUpdate,
  onCombatResult,
  onGameEvent,
  isPaused,
}: GameEngineProps) {
  const combatSystem = useMemo(() => new CombatSystem(), []);
  const trigramSystem = useMemo(() => new TrigramSystem(), []);

  const [activeHitEffects, setActiveHitEffects] = useState<HitEffect[]>([]);

  useTick(
    (deltaTicker) => {
      if (isPaused) return;
      const delta =
        deltaTicker / (PIXI.Ticker.targetFPMS || 16.667 / 1000) / 1000; // Convert delta to seconds, use static Ticker.targetFPMS

      // Update hit effects
      setActiveHitEffects((prevEffects) =>
        prevEffects
          .map((effect) => ({
            ...effect,
            lifespan: (effect.lifespan ?? 0) - delta * 1000,
            position: {
              x: (effect.position?.x ?? 0) + (effect.velocity?.x || 0) * delta,
              y: (effect.position?.y ?? 0) + (effect.velocity?.y || 0) * delta,
            },
          }))
          .filter((effect) => (effect.lifespan ?? 0) > 0)
      );

      // Update players (basic example: stamina regeneration)
      players.forEach((player, index) => {
        if (player.stamina < player.maxStamina) {
          onPlayerUpdate(index as 0 | 1, {
            stamina: Math.min(
              player.maxStamina,
              player.stamina + (player.maxStamina / 20) * delta // Regenerate 5% per second
            ),
          });
        }
      });
      checkWinConditionAndUpdate(players, onGameEvent); // Call with current players and callback
    }
    // Fix: Remove dependency array to fix useTick usage
  );

  const handlePlayerAction = useCallback(
    async (
      // Fix: Make async to handle await
      playerIndex: 0 | 1,
      actionType: "attack" | "defend" | "stance_change",
      data?: any
    ) => {
      if (isPaused) return;

      const attacker = players[playerIndex];
      const defender = players[playerIndex === 0 ? 1 : 0];

      if (actionType === "attack") {
        const currentStance = attacker.currentStance;
        const technique = trigramSystem.getTechniqueForStance(
          currentStance,
          attacker.archetype
        );

        if (technique) {
          try {
            // Fix: Properly await the async call
            const result = await CombatSystem.executeAttack(
              attacker,
              defender,
              technique
            );

            const newHitEffect: HitEffect = {
              id: `hit-${Date.now()}-${Math.random()}`,
              type: result.critical
                ? HitEffectType.CRITICAL_HIT
                : HitEffectType.GENERAL_DAMAGE,
              attackerId: attacker.id,
              defenderId: defender.id,
              timestamp: Date.now(),
              duration: 1000,
              position: { ...(defender.position || { x: 0, y: 0 }) },
              lifespan: 1000,
              velocity: {
                x: Math.random() * 100 - 50,
                y: -Math.random() * 100,
              },
              damageAmount: result.damage,
              color: result.critical
                ? KOREAN_COLORS.CRITICAL_HIT
                : KOREAN_COLORS.ACCENT_RED,
              size: result.damage > 50 ? 15 : result.damage > 20 ? 10 : 5,
              text: result.damage.toString(),
            };
            setActiveHitEffects((prev) => [...prev, newHitEffect]);

            onCombatResult(result);
            // Fix: Apply result effects using CombatSystem
            const { updatedAttacker, updatedDefender } =
              CombatSystem.applyCombatResult(result, attacker, defender);
            onPlayerUpdate(playerIndex, updatedAttacker);
            onPlayerUpdate(playerIndex === 0 ? 1 : 0, updatedDefender);
            onGameEvent("attack_resolved", { result });
          } catch (error) {
            console.error("Attack resolution failed:", error);
            onGameEvent("error", {
              message: "Attack resolution failed",
              details: error,
            });
          }
        } else {
          onGameEvent("action_fail", {
            playerId: attacker.id,
            action: "attack",
            reason: "No technique available for current stance",
          });
        }
      } else if (actionType === "stance_change" && data?.stance) {
        onPlayerUpdate(playerIndex, {
          currentStance: data.stance as TrigramStance,
        });
        onGameEvent("stance_changed", {
          playerId: attacker.id,
          newStance: data.stance,
        });
      }
      // Add defend logic if needed
    },
    [
      isPaused,
      players,
      onPlayerUpdate,
      trigramSystem,
      combatSystem,
      onCombatResult,
      onGameEvent,
    ] // Corrected dependencies
  );

  // useEffect to call handlePlayerAction for testing or AI
  useEffect(() => {
    // Example: Trigger an attack from player 0 after a delay if not paused
    // This is just for demonstration; real AI or input handling would go here.
    if (!isPaused && players[0] && players[1]) {
      // const timer = setTimeout(() => {
      //     handlePlayerAction(0, "attack");
      // }, 2000);
      // return () => clearTimeout(timer);
    }
  }, [isPaused, players, handlePlayerAction]);

  return (
    <>
      {activeHitEffects.map((effect, index) => (
        <Graphics
          key={`hit-effect-${effect.timestamp}-${index}`}
          x={effect.position?.x ?? 0}
          y={effect.position?.y ?? 0}
          draw={(g: PIXI.Graphics) => {
            // Typed g
            g.clear();
            g.beginFill(effect.color || 0xff0000, 0.8);
            g.drawCircle(
              0,
              0,
              (effect.damageAmount || 10) * 0.5 + (effect.size ?? 5)
            );
            g.endFill();
          }}
        />
      ))}
      {activeHitEffects.map((effect, index) =>
        effect.damageAmount && effect.type === HitEffectType.GENERAL_DAMAGE ? (
          <Text
            key={`hit-text-${effect.timestamp}-${index}`}
            text={effect.damageAmount.toString()}
            anchor={{ x: 0.5, y: 0.5 }}
            x={(effect.position?.x ?? 0) + 15}
            y={(effect.position?.y ?? 0) - 15}
            style={
              new PIXI.TextStyle({
                fill: KOREAN_COLORS.TEXT_PRIMARY,
                fontSize: 16,
                fontWeight: "bold",
              })
            }
          />
        ) : null
      )}
    </>
  );
}

export default GameEngine;
