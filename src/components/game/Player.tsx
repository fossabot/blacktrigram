import React, { useState, useCallback } from "react";
import { Container, Graphics, Text, useTick } from "@pixi/react";
import type { PlayerState, TrigramStance, TrigramData } from "../../types"; // Removed Position, PlayerAction
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../types";
// import { PlayerVisuals } from '../PlayerVisuals'; // Assuming this will be created
import type { Graphics as PixiGraphics, Ticker } from "pixi.js"; // Added Ticker for useTick type

// Define PlayerProps directly or ensure it's correctly exported if from another file
export interface PlayerProps {
  readonly playerState: PlayerState;
  readonly onAction: (action: { type: string; techniqueName?: string }) => void;
  readonly onStanceChange: (stance: TrigramStance) => void;
}

export function Player({
  playerState,
  onAction,
  onStanceChange, // This prop is part of the component's API, usage is up to the parent
}: PlayerProps): React.JSX.Element {
  const { x, y } = playerState.position;
  const currentStanceData: TrigramData = TRIGRAM_DATA[playerState.stance];

  const [animationTime, setAnimationTime] = useState(0);

  useTick(
    useCallback((delta: number, _ticker: Ticker) => {
      // Corrected signature: delta is number
      setAnimationTime((prev) => prev + delta);
    }, [])
  );

  const handleAttack = useCallback(() => {
    if (!playerState.isAttacking && playerState.stamina > 10) {
      // Example condition
      onAction({
        type: "attack",
        techniqueName: currentStanceData.technique.name,
      });
    }
  }, [playerState, onAction, currentStanceData]);

  // Example drawing logic, replace with PlayerVisuals or more complex graphics
  const drawPlayer = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      g.beginFill(
        playerState.playerId === "Player1"
          ? KOREAN_COLORS.DOJANG_BLUE
          : KOREAN_COLORS.TRADITIONAL_RED
      );
      g.drawCircle(0, 0, 30); // Simple circle representation
      g.endFill();

      // Aura for attacking state
      if (playerState.isAttacking) {
        // Assuming currentStanceData.color is a hex string like "#RRGGBB"
        const colorString = String(currentStanceData.color); // Ensure it's a string
        const auraColor = parseInt(
          colorString.startsWith("#") ? colorString.slice(1) : colorString,
          16
        );
        g.lineStyle(4, auraColor, Math.sin(animationTime * 0.2) * 0.5 + 0.5);
        g.drawCircle(0, 0, 35 + Math.sin(animationTime * 0.2) * 5);
      }
    },
    [playerState, currentStanceData, animationTime]
  );

  return (
    <Container x={x} y={y} interactive={true} pointertap={handleAttack}>
      <Graphics draw={drawPlayer} />
      {/* <PlayerVisuals playerState={playerState} visualState={visualState} /> */}
      <Text
        text={currentStanceData.koreanName} // Accessing koreanName directly
        anchor={{ x: 0.5, y: 0.5 }}
        y={-45}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 14,
          fill: KOREAN_COLORS.WHITE,
        }}
      />
      <Text
        text={currentStanceData.symbol}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-65}
        style={{
          fontFamily: "serif",
          fontSize: 20,
          fill: currentStanceData.color,
        }}
      />
    </Container>
  );
}
