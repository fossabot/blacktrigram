// Complete game engine for Black Trigram Korean martial arts

import React, { useRef, useCallback, useEffect, useState } from "react";
import { Player } from "./Player";
import { DojangBackground } from "./DojangBackground";
import { HitEffectsLayer } from "./HitEffectsLayer";
import type { GameEngineProps } from "../../types/components";

export function GameEngine({
  players,
  gamePhase,
  onPlayerUpdate,
}: GameEngineProps): React.ReactElement {
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

  return (
    <pixiContainer data-testid="game-container">
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
    </pixiContainer>
  );
}
