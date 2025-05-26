import type { JSX } from "react";
import type { Graphics as PixiGraphics } from "pixi.js";

interface DojoBackgroundProps {
  readonly gameTime: number;
}

const GAME_CONFIG = {
  ARENA_WIDTH: 800,
  ARENA_HEIGHT: 600,
} as const;

const ARENA_BOUNDS = {
  MIN_X: 80,
  MAX_X: 720,
  MIN_Y: 220,
  MAX_Y: 420,
} as const;

export function DojoBackground({ gameTime }: DojoBackgroundProps): JSX.Element {
  const drawDojo = (graphics: PixiGraphics): void => {
    graphics.clear();

    // Traditional Korean dojo floor
    graphics.setFillStyle({ color: 0x8b4513 });
    graphics.rect(0, 450, GAME_CONFIG.ARENA_WIDTH, 150);
    graphics.fill();

    // Wood grain pattern
    graphics.setStrokeStyle({ color: 0x654321, width: 1 });
    for (let x = 0; x < GAME_CONFIG.ARENA_WIDTH; x += 80) {
      graphics.moveTo(x, 450);
      graphics.lineTo(x, GAME_CONFIG.ARENA_HEIGHT);
      graphics.stroke();
    }

    // Fighting area boundary
    graphics.setStrokeStyle({ color: 0x8b0000, width: 4 });
    graphics.rect(
      ARENA_BOUNDS.MIN_X - 30,
      ARENA_BOUNDS.MIN_Y - 20,
      ARENA_BOUNDS.MAX_X - ARENA_BOUNDS.MIN_X + 60,
      ARENA_BOUNDS.MAX_Y - ARENA_BOUNDS.MIN_Y + 40
    );
    graphics.stroke();

    // Center circle
    graphics.setStrokeStyle({ color: 0xffffff, width: 3 });
    graphics.circle(GAME_CONFIG.ARENA_WIDTH / 2, 325, 50);
    graphics.stroke();

    // Trigram symbols in corners
    graphics.setFillStyle({ color: 0x8b0000 });
    const symbolPositions = [
      { x: 100, y: 250 },
      { x: 700, y: 250 },
      { x: 100, y: 400 },
      { x: 700, y: 400 },
    ];

    symbolPositions.forEach(({ x, y }) => {
      graphics.circle(x, y, 15);
      graphics.fill();
    });

    // Atmospheric effect
    const pulse = Math.sin(gameTime * 0.02) * 0.3 + 0.7;
    graphics.setFillStyle({ color: 0x8b0000, alpha: pulse * 0.1 });
    graphics.rect(0, 0, GAME_CONFIG.ARENA_WIDTH, GAME_CONFIG.ARENA_HEIGHT);
    graphics.fill();
  };

  return <pixiGraphics draw={drawDojo} />;
}
