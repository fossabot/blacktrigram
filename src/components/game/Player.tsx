// Complete Player component with Korean martial arts character rendering

import React, { useState, useCallback, useEffect } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type {
  PlayerState,
  PlayerArchetype,
  TrigramStance,
  Position,
} from "../../types";
import {
  KOREAN_COLORS,
  TRIGRAM_DATA,
  ARCHETYPE_NAMES,
} from "../../types/constants";
import { useAudio } from "../../audio/AudioManager";
import type { Graphics as PixiGraphics } from "pixi.js";

export interface PlayerProps {
  readonly playerState: PlayerState;
  readonly playerIndex: number;
  readonly onStateUpdate: (updates: Partial<PlayerState>) => void;
  readonly position: Position;
  readonly isActive?: boolean;
  readonly showDebugInfo?: boolean;
}

export function Player({
  playerState,
  position,
  isActive = true,
  showDebugInfo = false,
}: PlayerProps): React.JSX.Element {
  const audio = useAudio();
  const [animationState, setAnimationState] = useState<
    "idle" | "attacking" | "hit" | "stance_change"
  >("idle");

  // Get current stance data
  const currentStanceData = TRIGRAM_DATA[playerState.stance];
  const stanceColor = KOREAN_COLORS[playerState.stance];

  // Get archetype display name
  const archetypeDisplayName =
    ARCHETYPE_NAMES[playerState.archetype] || playerState.archetype;

  // Health bar component
  const HealthBar = useCallback(
    () => (
      <Graphics
        draw={(g: PixiGraphics) => {
          g.clear();

          // Background
          g.beginFill(0x330000);
          g.drawRect(0, 0, 100, 8);
          g.endFill();

          // Health fill
          const healthPercent = playerState.health / playerState.maxHealth;
          const barColor =
            healthPercent > 0.6
              ? 0x00ff00
              : healthPercent > 0.3
              ? 0xffff00
              : 0xff0000;

          g.beginFill(barColor);
          g.drawRect(2, 2, (100 - 4) * healthPercent, 4);
          g.endFill();
        }}
      />
    ),
    [playerState.health, playerState.maxHealth]
  );

  // Ki bar component
  const KiBar = useCallback(
    () => (
      <Graphics
        draw={(g: PixiGraphics) => {
          g.clear();

          // Background
          g.beginFill(0x000033);
          g.drawRect(0, 0, 100, 6);
          g.endFill();

          // Ki fill
          const kiPercent = playerState.ki / playerState.maxKi;
          g.beginFill(0x00aaff);
          g.drawRect(1, 1, (100 - 2) * kiPercent, 4);
          g.endFill();
        }}
      />
    ),
    [playerState.ki, playerState.maxKi]
  );

  // Main player body visualization
  const PlayerBody = useCallback(
    () => (
      <Graphics
        draw={(g: PixiGraphics) => {
          g.clear();
          g.beginFill(stanceColor);
          g.drawCircle(0, 0, 20);
          g.endFill();
        }}
        x={playerState.position.x}
        y={playerState.position.y}
      />
    ),
    [playerState.position, stanceColor]
  );

  // Stance indicator visualization
  const StanceIndicator = useCallback(
    () => (
      <Graphics
        draw={(g: PixiGraphics) => {
          g.clear();
          g.lineStyle(2, stanceColor);
          g.drawCircle(0, 0, 25);
        }}
        x={playerState.position.x}
        y={playerState.position.y}
      />
    ),
    [playerState.position, stanceColor]
  );

  // Health bar visualization
  const HealthBarVisual = useCallback(
    () => (
      <Graphics
        draw={(g: PixiGraphics) => {
          g.clear();
          g.beginFill(0x330000);
          g.drawRect(-20, -35, 60, 8);
          g.endFill();

          const healthPercent = playerState.health / playerState.maxHealth;
          const healthColor =
            healthPercent > 0.6
              ? 0x00ff00
              : healthPercent > 0.3
              ? 0xffff00
              : 0xff0000;

          g.beginFill(healthColor);
          g.drawRect(-18, -33, 56 * healthPercent, 4);
          g.endFill();
        }}
        x={playerState.position.x}
        y={playerState.position.y}
      />
    ),
    [playerState.health, playerState.maxHealth]
  );

  // Ki bar visualization
  const KiBarVisual = useCallback(
    () => (
      <Graphics
        draw={(g: PixiGraphics) => {
          g.clear();
          g.beginFill(0x000033);
          g.drawRect(-20, -25, 60, 6);
          g.endFill();

          const kiPercent = playerState.ki / playerState.maxKi;
          g.beginFill(0x00aaff);
          g.drawRect(-19, -24, 58 * kiPercent, 4);
          g.endFill();
        }}
        x={playerState.position.x}
        y={playerState.position.y}
      />
    ),
    [playerState.ki, playerState.maxKi]
  );

  // Main attack animation
  const AttackAnimation = useCallback(() => {
    if (!playerState.isAttacking) return null;

    return (
      <Graphics
        draw={(g: PixiGraphics) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.CRITICAL_HIT, 0.6);
          g.drawCircle(0, 0, 35);
          g.endFill();
        }}
        x={playerState.position.x}
        y={playerState.position.y}
      />
    );
  }, [playerState.isAttacking, playerState.position]);

  // Stance change effect
  useEffect(() => {
    if (
      playerState.lastStanceChangeTime &&
      Date.now() - playerState.lastStanceChangeTime < 1000
    ) {
      setAnimationState("stance_change");
      audio.playSFX("stance_change");

      const timer = setTimeout(() => setAnimationState("idle"), 500);
      return () => clearTimeout(timer);
    }
  }, [playerState.lastStanceChangeTime, audio]);

  return (
    <Container x={position.x} y={position.y} alpha={isActive ? 1.0 : 0.7}>
      {/* Main player body */}
      <PlayerBody />

      {/* Health bar */}
      <Container y={-40}>
        <HealthBar />
      </Container>

      {/* Ki bar */}
      <Container y={-30}>
        <KiBar />
      </Container>

      {/* Player name and archetype */}
      <Text
        text={`${playerState.name} (${archetypeDisplayName})`}
        style={{
          fontFamily: "Noto Sans KR, Arial, sans-serif",
          fontSize: 12,
          fill: KOREAN_COLORS.WHITE,
          align: "center",
        }}
        anchor={0.5}
        y={-55}
      />

      {/* Current stance display */}
      <Text
        text={`${currentStanceData.symbol} ${currentStanceData.name.korean}`}
        style={{
          fontFamily: "Noto Sans KR, Arial, sans-serif",
          fontSize: 10,
          fill: stanceColor,
          align: "center",
        }}
        anchor={0.5}
        y={35}
      />

      {/* Debug information */}
      {showDebugInfo && (
        <Container y={50}>
          <Text
            text={`Health: ${playerState.health}/${playerState.maxHealth}`}
            style={{ fontSize: 8, fill: 0xffffff }}
            y={0}
          />
          <Text
            text={`Ki: ${playerState.ki}/${playerState.maxKi}`}
            style={{ fontSize: 8, fill: 0xffffff }}
            y={12}
          />
          <Text
            text={`Stamina: ${playerState.stamina}/${playerState.maxStamina}`}
            style={{ fontSize: 8, fill: 0xffffff }}
            y={24}
          />
          <Text
            text={`Pain: ${playerState.pain}`}
            style={{ fontSize: 8, fill: 0xffffff }}
            y={36}
          />
        </Container>
      )}

      {/* Animation effects */}
      {animationState === "stance_change" && (
        <Graphics
          draw={(g) => {
            g.clear();
            g.lineStyle(2, stanceColor, 0.7);

            // Rotating energy rings
            for (let i = 0; i < 3; i++) {
              const radius = 30 + i * 10;
              g.drawCircle(0, 0, radius);
            }
          }}
        />
      )}

      {/* Critical hit effect */}
      <AttackAnimation />
    </Container>
  );
}
