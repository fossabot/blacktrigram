import React, { useState, useCallback } from "react";
import { Container, Graphics, Text, useTick } from "@pixi/react"; // useTick from @pixi/react
import type { PlayerState, TrigramData } from "../../types";
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../types";
import type { Graphics as PixiGraphics, Ticker } from "pixi.js";

// Define a default visual config or import it
const DEFAULT_VISUAL_CONFIG = {
  bodyColor: KOREAN_COLORS.WHITE,
  auraIntensity: 0.5,
  // ... other visual properties
};

export interface PlayerVisualsProps {
  readonly playerState: PlayerState;
  readonly visualConfig?: Partial<typeof DEFAULT_VISUAL_CONFIG>; // Use defined type
  readonly showTrigramSymbol?: boolean;
  readonly showAura?: boolean;
  readonly showPlayerId?: boolean;
  readonly showDebugInfo?: boolean;
  // readonly onAttack?: () => void; // Define if used
}

export function PlayerVisuals({
  playerState,
  visualConfig = DEFAULT_VISUAL_CONFIG, // Use defined default
  showTrigramSymbol = true,
  showAura = true,
  showPlayerId = false, // Keep, might be used
  showDebugInfo = false,
}: PlayerVisualsProps): React.JSX.Element {
  // Correct JSX.Element
  // const { x, y } = playerState.position; // Unused, remove if not needed for positioning Container
  const currentStanceData: TrigramData = TRIGRAM_DATA[playerState.stance];
  const [animationTime, setAnimationTime] = useState(0);

  useTick(
    useCallback((delta: number, _ticker: Ticker) => {
      setAnimationTime((prev) => prev + delta);
    }, [])
  );

  const drawCharacter = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      // Main body
      g.beginFill(visualConfig.bodyColor || KOREAN_COLORS.WHITE);
      g.drawRect(-15, -30, 30, 60); // Simple rectangle body
      g.endFill();

      // Head
      g.beginFill(KOREAN_COLORS.SKIN_TONE_LIGHT);
      g.drawCircle(0, -40, 15);
      g.endFill();

      // Stance Aura
      if (showAura && playerState.isAttacking) {
        const auraColor = parseInt(
          String(currentStanceData.color).slice(1),
          16
        );
        const auraAlpha =
          (Math.sin(animationTime * 0.2) * 0.5 + 0.5) *
          (visualConfig.auraIntensity || 0.5);
        g.lineStyle(4, auraColor, auraAlpha);
        g.drawCircle(0, 0, 40 + Math.sin(animationTime * 0.2) * 5);
      }

      // Debug Info
      if (showDebugInfo) {
        // Placeholder for debug text
      }
    },
    [
      playerState,
      currentStanceData,
      animationTime,
      visualConfig,
      showAura,
      showDebugInfo,
    ]
  );

  // const handleAttack = useCallback(() => { // Define onAttack or remove
  //   if (onAttack) onAttack();
  // }, [onAttack]);

  return (
    <Container
      x={playerState.position.x}
      y={playerState.position.y}
      /* interactive={!!onAttack} pointertap={handleAttack} */
    >
      <Graphics draw={drawCharacter} />
      {showTrigramSymbol && (
        <Text
          text={currentStanceData.symbol}
          anchor={{ x: 0.5, y: 1 }}
          y={-60} // Position above head
          style={{
            fontFamily: "serif",
            fontSize: 24,
            fill: currentStanceData.color,
          }}
        />
      )}
      {showPlayerId &&
        playerState.playerId && ( // Check if playerId exists
          <Text
            text={playerState.playerId}
            anchor={{ x: 0.5, y: 0 }}
            y={35} // Position below character
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 12,
              fill: KOREAN_COLORS.WHITE,
            }}
          />
        )}
    </Container>
  );
}
