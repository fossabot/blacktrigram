import React, { useEffect, useState, useRef } from "react"; // Removed useMemo
import { Sprite, Graphics as PixiGraphics } from "@pixi/react"; // Use PixiGraphics, removed useApp, removed Text
import * as PIXI from "pixi.js"; // Import PIXI for types
import type { PlayerVisualsProps, PlayerState, VitalPoint } from "../../types";
import { KOREAN_COLORS, VITAL_POINTS_DATA } from "../../types/constants";

// Function to generate a texture for the player
// This should be outside the component or memoized if it's complex
const generatePlayerTexture = async (
  playerState: PlayerState,
  showVitalPoints?: boolean
): Promise<PIXI.Texture | undefined> => {
  if (typeof window === "undefined") return undefined; // Ensure PixiJS runs in browser

  const graphics = new PIXI.Graphics();
  const playerSize = 50; // Example size

  // Draw player body
  graphics.beginFill(KOREAN_COLORS.DOJANG_BLUE); // Using DOJANG_BLUE
  graphics.drawEllipse(0, 0, playerSize / 2, playerSize); // Simplified player shape
  graphics.endFill();

  // Draw facing direction indicator (e.g., a small line)
  graphics.lineStyle(2, KOREAN_COLORS.WHITE);
  if (playerState.facing === "right") {
    graphics.moveTo(playerSize / 2 - 5, -playerSize / 2 + 10);
    graphics.lineTo(playerSize / 2 + 5, -playerSize / 2 + 10);
  } else {
    graphics.moveTo(-playerSize / 2 + 5, -playerSize / 2 + 10);
    graphics.lineTo(-playerSize / 2 - 5, -playerSize / 2 + 10);
  }

  // Draw stance indicator (e.g., colored circle at feet)
  const stanceColor =
    KOREAN_COLORS[playerState.currentStance] || KOREAN_COLORS.WHITE;
  graphics.beginFill(stanceColor);
  graphics.drawCircle(0, playerSize / 2 + 10, 8);
  graphics.endFill();

  if (showVitalPoints) {
    VITAL_POINTS_DATA.forEach((vp: VitalPoint) => {
      // Approximate VP position on the ellipse
      // This is highly simplified; a proper mapping is needed
      const rX = playerSize / 2;
      const rY = playerSize;
      const vpX = (vp.location.x / 100 - 0.5) * rX * 0.8; // Scale and center
      const vpY = (vp.location.y / 100 - 0.5) * rY * 0.8; // Scale and center

      let vpColor: number = KOREAN_COLORS.WHITE; // Explicitly type vpColor
      if (vp.severity === "critical" || vp.severity === "lethal") {
        vpColor = KOREAN_COLORS.TRADITIONAL_RED;
      }
      graphics.beginFill(vpColor, 0.7);
      graphics.drawCircle(vpX, vpY, 3); // Smaller circles for vital points
      graphics.endFill();
    });
  }

  // Generate texture (this needs a renderer)
  // If useApp() is available, use app.renderer. Otherwise, create a temporary one.
  // This part is tricky outside a Pixi Application context.
  // For components, it's better to draw directly using <Graphics />
  // or get renderer from useApp() hook.

  // Temporary renderer for texture generation (not ideal for performance in components)
  const renderer = await PIXI.autoDetectRenderer({
    width: playerSize * 2,
    height: playerSize * 3,
    backgroundAlpha: 0,
  });
  const texture = renderer.generateTexture(graphics);
  renderer.destroy(); // Clean up temporary renderer
  graphics.destroy();

  return texture;
};

export const PlayerVisuals: React.FC<PlayerVisualsProps> = ({
  playerState,
  texture: propTexture,
  showVitalPoints,
  x = 0,
  y = 0,
}) => {
  const [generatedTexture, setGeneratedTexture] = useState<
    PIXI.Texture | undefined
  >(propTexture);
  const graphicsRef = useRef<PIXI.Graphics>(null);

  useEffect(() => {
    if (!propTexture) {
      generatePlayerTexture(playerState, showVitalPoints).then(
        setGeneratedTexture
      );
    } else {
      setGeneratedTexture(propTexture);
    }
  }, [playerState, showVitalPoints, propTexture]);

  // Fallback if texture is not ready
  if (!generatedTexture && !graphicsRef.current) {
    // Draw directly using PixiGraphics if no texture
    return (
      <PixiGraphics
        ref={graphicsRef}
        x={x}
        y={y}
        draw={(g: PIXI.Graphics) => {
          g.clear();
          const playerSize = 50;
          g.beginFill(KOREAN_COLORS.DOJANG_BLUE); // Placeholder color
          g.drawEllipse(0, 0, playerSize / 2, playerSize);
          g.endFill();

          if (showVitalPoints) {
            VITAL_POINTS_DATA.forEach((vp: VitalPoint) => {
              const rX = playerSize / 2;
              const rY = playerSize;
              const vpX = (vp.location.x / 100 - 0.5) * rX * 0.8;
              const vpY = (vp.location.y / 100 - 0.5) * rY * 0.8;
              let vpColor: number = KOREAN_COLORS.WHITE;
              if (vp.severity === "critical" || vp.severity === "lethal") {
                vpColor = KOREAN_COLORS.TRADITIONAL_RED;
              }
              g.beginFill(vpColor, 0.7);
              g.drawCircle(vpX, vpY, 3);
              g.endFill();
            });
          }
        }}
      />
    );
  }

  if (!generatedTexture) return null;

  return (
    <Sprite
      texture={generatedTexture}
      anchor={0.5} // Center the sprite
      x={x}
      y={y}
      // scale={playerState.combatState === "hit" ? 1.2 : 1} // Example: scale on hit
    />
  );
};
