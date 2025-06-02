// Complete game engine for Black Trigram Korean martial arts

import React, { useRef, useCallback, useEffect } from "react";
import { Stage, Container } from "@pixi/react";
import * as PIXI from "pixi.js"; // Import PIXI properly
import type {
  PlayerState,
  GamePhase,
  CombatResult,
  GameEngineProps,
} from "../../types";
import { Player } from "./Player";
import { DojangBackground } from "./DojangBackground";
import { HitEffectsLayer } from "./HitEffectsLayer";

interface GameEngineProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly gamePhase: GamePhase;
  readonly onGamePhaseChange: (phase: GamePhase) => void;
  readonly gameTime: number;
  readonly onPlayerUpdate: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
}

export function GameEngine({
  players,
  gamePhase,
  gameTime,
  onPlayerUpdate,
}: GameEngineProps): React.ReactElement {
  const appRef = useRef<PIXI.Application | null>(null);

  const handleAppMount = useCallback((app: PIXI.Application) => {
    appRef.current = app;

    // Configure app for Korean martial arts visuals
    app.renderer.background.color = 0x1a1a1a; // Dark dojang background
    app.stage.interactive = true;
    app.stage.eventMode = "static";

    console.log("🥋 Game engine initialized for Korean martial arts");
  }, []);

  const handleCombatResult = useCallback(
    (attackerIndex: number, damage: number, isVitalPoint: boolean = false) => {
      const defenderIndex = attackerIndex === 0 ? 1 : 0;
      const defender = players[defenderIndex];

      const newHealth = Math.max(0, defender.health - damage);
      const newPain = Math.min(100, defender.pain + damage * 0.8);

      onPlayerUpdate(defenderIndex, {
        health: newHealth,
        pain: newPain,
        isAttacking: false,
      });
    },
    [players, onPlayerUpdate]
  );

  return (
    <Stage
      width={800}
      height={600}
      options={{
        backgroundColor: 0x1a1a1a,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
      }}
      onMount={handleAppMount}
    >
      <Container>
        <DojangBackground />
        <Player
          playerState={players[0]}
          playerIndex={0}
          onStateUpdate={(updates) => onPlayerUpdate(0, updates)}
          isActive={gamePhase === "combat"}
        />
        <Player
          playerState={players[1]}
          playerIndex={1}
          onStateUpdate={(updates) => onPlayerUpdate(1, updates)}
          isActive={gamePhase === "combat"}
        />
        <HitEffectsLayer effects={[]} />{" "}
        {/* Will be populated by combat system */}
      </Container>
    </Stage>
  );
}
