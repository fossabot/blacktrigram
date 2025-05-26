import type { JSX } from "react";
import type { Graphics as PixiGraphics } from "pixi.js";

interface DojoBackgroundProps {
  readonly gameTime: number;
}

export function DojoBackground({ gameTime }: DojoBackgroundProps): JSX.Element {
  const drawDojo = (graphics: PixiGraphics): void => {
    graphics.clear();

    // Enhanced traditional Korean dojo with intro screen colors
    // Deep black background like intro
    graphics.setFillStyle({ color: 0x000000 });
    graphics.rect(0, 0, window.innerWidth, window.innerHeight);
    graphics.fill();

    // Traditional Korean flooring with enhanced wood grain
    const floorHeight = window.innerHeight * 0.3;
    graphics.setFillStyle({ color: 0x4a3728 }); // Darker wood tone
    graphics.rect(
      0,
      window.innerHeight - floorHeight,
      window.innerWidth,
      floorHeight
    );
    graphics.fill();

    // Enhanced wood grain pattern with Korean aesthetic
    graphics.setStrokeStyle({ color: 0x654321, width: 1, alpha: 0.8 });
    for (let x = 0; x < window.innerWidth; x += 60) {
      graphics.moveTo(x, window.innerHeight - floorHeight);
      graphics.lineTo(x, window.innerHeight);
      graphics.stroke();

      // Add traditional Korean wood joining details
      graphics.setFillStyle({ color: 0x2a1f1a, alpha: 0.6 });
      graphics.rect(x - 2, window.innerHeight - floorHeight, 4, floorHeight);
      graphics.fill();
    }

    // Enhanced fighting area with traditional Korean border - centered
    const arenaWidth = Math.min(600, window.innerWidth * 0.7);
    const arenaHeight = Math.min(300, window.innerHeight * 0.4);
    const arenaX = (window.innerWidth - arenaWidth) / 2;
    const arenaY = (window.innerHeight - arenaHeight) / 2;

    graphics.setStrokeStyle({ color: 0x8b0000, width: 6 }); // Thicker traditional red
    graphics.rect(arenaX - 40, arenaY - 30, arenaWidth + 80, arenaHeight + 60);
    graphics.stroke();

    // Inner border with gold accent like intro screen
    graphics.setStrokeStyle({ color: 0xffd700, width: 2 });
    graphics.rect(arenaX - 35, arenaY - 25, arenaWidth + 70, arenaHeight + 50);
    graphics.stroke();

    // Enhanced center circle with yin-yang inspiration from intro - centered
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Outer ring
    graphics.setStrokeStyle({ color: 0x8b0000, width: 4 });
    graphics.circle(centerX, centerY, 60);
    graphics.stroke();

    // Middle ring
    graphics.setStrokeStyle({ color: 0xffffff, width: 2 });
    graphics.circle(centerX, centerY, 45);
    graphics.stroke();

    // Center with pulsing effect like intro
    const pulse = Math.sin(gameTime * 0.02) * 0.3 + 0.7;
    graphics.setFillStyle({ color: 0x8b0000, alpha: pulse });
    graphics.circle(centerX, centerY, 8);
    graphics.fill();

    // Enhanced trigram symbols in corners with proper positioning - responsive
    const margin = 120;
    const trigramPositions = [
      { x: margin, y: margin }, // Heaven
      { x: window.innerWidth - margin, y: margin }, // Fire
      { x: margin, y: window.innerHeight - margin }, // Earth
      { x: window.innerWidth - margin, y: window.innerHeight - margin }, // Water
    ];

    trigramPositions.forEach(({ x, y }) => {
      // Traditional Korean symbol background
      graphics.setFillStyle({ color: 0x8b0000, alpha: 0.8 });
      graphics.circle(x, y, 25);
      graphics.fill();

      graphics.setStrokeStyle({ color: 0xffd700, width: 2 });
      graphics.circle(x, y, 25);
      graphics.stroke();
    });

    // Enhanced atmospheric effect with traditional colors
    graphics.setFillStyle({ color: 0x8b0000, alpha: pulse * 0.05 });
    graphics.rect(0, 0, window.innerWidth, window.innerHeight);
    graphics.fill();

    // Add subtle grid pattern like intro screen - responsive
    graphics.setStrokeStyle({ color: 0x333333, width: 1, alpha: 0.2 });
    for (let x = 0; x < window.innerWidth; x += 40) {
      graphics.moveTo(x, 0);
      graphics.lineTo(x, window.innerHeight);
      graphics.stroke();
    }
    for (let y = 0; y < window.innerHeight; y += 40) {
      graphics.moveTo(0, y);
      graphics.lineTo(window.innerWidth, y);
      graphics.stroke();
    }
  };

  return <pixiGraphics draw={drawDojo} />;
}
