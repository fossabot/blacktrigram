// Complete game engine for Black Trigram Korean martial arts

import React, { useRef, useCallback, useEffect, useState } from "react";
import { Player } from "./Player";
import { DojangBackground } from "./DojangBackground";
import { HitEffectsLayer } from "./HitEffectsLayer";
import type { GameEngineProps } from "../../types/components";
import type { TrigramStance } from "../../types/enums";
import { Container } from "@pixi/react";
import { useAudio } from "../../audio/AudioManager";

export function GameEngine({
  players,
  gamePhase,
  onPlayerUpdate,
  onGamePhaseChange,
  width = 800,
  height = 600,
}: GameEngineProps): JSX.Element {
  const audio = useAudio();
  const animationFrameRef = useRef<number | null>(null);
  const [combatEffects, setCombatEffects] = useState<any[]>([]); // TODO: type HitEffect[]
  const [gameTime, setGameTime] = useState(0);

  // Main game loop (60fps)
  const gameLoop = useCallback(() => {
    if (gamePhase === "combat") {
      setCombatEffects((effects) =>
        effects.filter((e) => Date.now() - e.createdAt < 1000)
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

  // Game loop for updates
  useEffect(() => {
    if (gamePhase !== "combat") return;

    const gameLoop = setInterval(() => {
      setGameTime((prev) => prev + 16); // ~60fps
    }, 16);

    return () => clearInterval(gameLoop);
  }, [gamePhase]);

  // Handle stance changes
  const handleStanceChange = useCallback(
    (playerIndex: number, stance: TrigramStance) => {
      audio.playStanceChangeSound();

      const now = Date.now();
      onPlayerUpdate(playerIndex, {
        stance,
        lastStanceChangeTime: now,
      });
    },
    [audio, onPlayerUpdate]
  );

  // Handle combat events
  const handleCombatEvent = useCallback((effect: any) => {
    setCombatEffects((prev) => [
      ...prev,
      {
        ...effect,
        createdAt: Date.now(),
      },
    ]);
  }, []);

  return (
    <Container>
      {/* Background environment */}
      <DojangBackground
        timeOfDay="night"
        weather="clear"
        width={width}
        height={height}
      />

      {/* Players */}
      {players.map((player, index) => (
        <Player
          key={player.id}
          playerState={player}
          playerIndex={index}
          onStateUpdate={(updates) => onPlayerUpdate(index, updates)}
          x={index === 0 ? width * 0.25 : width * 0.75}
          y={height * 0.75}
        />
      ))}

      {/* Combat effects overlay */}
      <HitEffectsLayer effects={combatEffects} />
    </Container>
  );
}
