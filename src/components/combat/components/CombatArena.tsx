import React, { useCallback, useEffect, useRef } from "react";
import { Stage, Container } from "@pixi/react";
import type { PlayerState, Position } from "../../../types";
import { KOREAN_COLORS } from "../../../types/constants";
import { GameEngine } from "../../game/GameEngine";
import { PlayerVisuals } from "../../game/PlayerVisuals";
import { DojangBackground } from "../../game/DojangBackground";
import { HitEffectsLayer } from "../../game/HitEffectsLayer";

interface CombatArenaProps {
  readonly width: number;
  readonly height: number;
  readonly player1: PlayerState;
  readonly player2: PlayerState;
  readonly hitEffects: readonly any[];
  readonly onPlayerClick?: (playerId: string, position: Position) => void;
}

export function CombatArena({
  width,
  height,
  player1,
  player2,
  hitEffects,
  onPlayerClick,
}: CombatArenaProps): React.JSX.Element {
  const stageRef = useRef<any>(null);

  useEffect(() => {
    // Setup arena physics and animations
    console.log("🥋 Korean martial arts arena initialized");
  }, []);

  const handleStageClick = (event: any) => {
    if (onPlayerClick) {
      const bounds = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;

      // Determine which player was clicked based on position
      const clickPosition = { x, y };
      if (x < width / 2) {
        onPlayerClick(player1.id, clickPosition);
      } else {
        onPlayerClick(player2.id, clickPosition);
      }
    }
  };

  const handlePlayerAttack = useCallback(
    (playerIndex: number) => {
      // Simple attack - in full game this would be more complex
      const currentPlayer = playerIndex === 0 ? player1 : player2;
      const opponent = playerIndex === 0 ? player2 : player1;

      // Basic damage calculation
      const damage = Math.floor(Math.random() * 20) + 10;
      const newHealth = Math.max(0, opponent.health - damage);

      // Update player states
      if (playerIndex === 0) {
        onPlayerClick(1, { health: newHealth });
      } else {
        onPlayerClick(0, { health: newHealth });
      }
    },
    [player1, player2, onPlayerClick]
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(135deg, #${KOREAN_COLORS.BLACK.toString(
          16
        )} 0%, #${KOREAN_COLORS.TRADITIONAL_BLUE.toString(16)} 100%)`,
      }}
    >
      <Stage
        ref={stageRef}
        width={width}
        height={height}
        options={{
          backgroundColor: KOREAN_COLORS.BLACK,
          antialias: true,
          resolution: window.devicePixelRatio || 1,
        }}
        onPointerDown={handleStageClick}
      >
        {/* Traditional Korean dojang background */}
        <DojangBackground width={width} height={height} />

        {/* Main combat container */}
        <Container>
          {/* Player visual representations */}
          <PlayerVisuals
            player={player1}
            isActive={true}
            showStance={true}
            showEffects={true}
          />

          <PlayerVisuals
            player={player2}
            isActive={true}
            showStance={true}
            showEffects={true}
          />

          {/* Combat hit effects */}
          <HitEffectsLayer effects={hitEffects} />
        </Container>

        {/* Arena boundaries visualization */}
        <Container>
          {/* Traditional Korean martial arts mat boundaries */}
          {/* Add visual elements for arena bounds */}
        </Container>
      </Stage>

      {/* Overlay for additional Korean aesthetic elements */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          background:
            "radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.3) 100%)",
        }}
      />
    </div>
  );
}
