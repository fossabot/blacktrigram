// Complete game engine for Black Trigram Korean martial arts

import React, { useRef, useCallback, useEffect, useState } from "react";
import { Stage, Container } from "@pixi/react";
import * as PIXI from "pixi.js";
import { Player } from "./Player";
import { DojangBackground } from "./DojangBackground";
import { HitEffectsLayer } from "./HitEffectsLayer";
import type { GameEngineProps } from "../../types/components";

export function GameEngine({
  players,
  gamePhase,
  onPlayerUpdate,
}: GameEngineProps): React.ReactElement {
  const appRef = useRef<PIXI.Application | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [hitEffects, setHitEffects] = useState<any[]>([]); // TODO: type HitEffect[]

  // Main game loop (60fps)
  const gameLoop = useCallback(() => {
    if (gamePhase === "combat") {
      setHitEffects((effects) =>
        effects.filter((e) => Date.now() - e.startTime < e.duration)
      );
    }
    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [gamePhase]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameLoop]);

  // Mount Pixi app and configure visuals
  const handleAppMount = useCallback((app: PIXI.Application) => {
    appRef.current = app;
    app.renderer.background.color = 0x1a1a1a;
    app.stage.interactive = true;
    app.stage.eventMode = "static";
    // Future: add resize, input listeners
    console.log("🥋 Game engine initialized for Korean martial arts");
  }, []);

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
      <Container data-testid="game-container">
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
        <HitEffectsLayer effects={hitEffects} />
      </Container>
    </Stage>
  );
}
