import type { JSX } from "react";
import type { Graphics as PixiGraphics } from "pixi.js";

interface DojangBackgroundProps {
  readonly gameTime: number;
}

export function DojangBackground({
  gameTime,
}: DojangBackgroundProps): JSX.Element {
  const drawDojang = (graphics: PixiGraphics): void => {
    graphics.clear();

    // Enhanced traditional Korean dojang with better visual hierarchy
    graphics.setFillStyle({ color: 0x000000 });
    graphics.rect(0, 0, window.innerWidth, window.innerHeight);
    graphics.fill();

    // Improved animated background particles with icon-like shapes
    for (let i = 0; i < 15; i++) {
      const x =
        (Math.sin(gameTime * 0.01 + i) * 150 + window.innerWidth / 2) %
        window.innerWidth;
      const y =
        (Math.cos(gameTime * 0.008 + i * 0.5) * 150 + window.innerHeight / 2) %
        window.innerHeight;
      const alpha = Math.sin(gameTime * 0.02 + i) * 0.08 + 0.08;

      // Create star-like particles representing martial energy
      graphics.setFillStyle({ color: 0x8b0000, alpha });
      const size = 3 + Math.sin(gameTime * 0.03 + i) * 2;
      graphics.circle(x, y, size);
      graphics.fill();

      // Add cross-shaped energy markers
      graphics.setStrokeStyle({
        color: 0xffd700,
        width: 1,
        alpha: alpha * 0.6,
      });
      graphics.moveTo(x - size, y);
      graphics.lineTo(x + size, y);
      graphics.moveTo(x, y - size);
      graphics.lineTo(x, y + size);
      graphics.stroke();
    }

    // Enhanced traditional Korean flooring with geometric patterns
    const floorHeight = window.innerHeight * 0.35;
    graphics.setFillStyle({ color: 0x4a3728 }); // Darker wood tone
    graphics.rect(
      0,
      window.innerHeight - floorHeight,
      window.innerWidth,
      floorHeight
    );
    graphics.fill();

    // Enhanced wood grain pattern with Korean aesthetic and subtle animation
    graphics.setStrokeStyle({ color: 0x654321, width: 1, alpha: 0.8 });
    for (let x = 0; x < window.innerWidth; x += 60) {
      const wobble = Math.sin(gameTime * 0.01 + x * 0.01) * 2;
      graphics.moveTo(x + wobble, window.innerHeight - floorHeight);
      graphics.lineTo(x + wobble, window.innerHeight);
      graphics.stroke();

      // Add traditional Korean wood joining details with subtle glow
      graphics.setFillStyle({
        color: 0x2a1f1a,
        alpha: 0.6 + Math.sin(gameTime * 0.005 + x) * 0.1,
      });
      graphics.rect(
        x - 2 + wobble,
        window.innerHeight - floorHeight,
        4,
        floorHeight
      );
      graphics.fill();
    }

    // Enhanced fighting arena with iconic Korean border patterns
    const arenaWidth = Math.min(700, window.innerWidth * 0.8);
    const arenaHeight = Math.min(400, window.innerHeight * 0.5);
    const arenaX = (window.innerWidth - arenaWidth) / 2;
    const arenaY = (window.innerHeight - arenaHeight) / 2;

    // Traditional Korean taeguk-inspired border design
    const borderPulse = Math.sin(gameTime * 0.02) * 0.2 + 0.8;

    // Outer ceremonial border with traditional patterns
    graphics.setStrokeStyle({ color: 0x8b0000, width: 8, alpha: borderPulse });
    graphics.rect(arenaX - 50, arenaY - 40, arenaWidth + 100, arenaHeight + 80);
    graphics.stroke();

    // Traditional Korean decorative corners (icon-like elements)
    const cornerPositions: Array<[number, number]> = [
      [arenaX - 50, arenaY - 40],
      [arenaX + arenaWidth + 50, arenaY - 40],
      [arenaX - 50, arenaY + arenaHeight + 40],
      [arenaX + arenaWidth + 50, arenaY + arenaHeight + 40],
    ];

    cornerPositions.forEach(([x, y]) => {
      // Traditional Korean corner decoration (resembling 태극 symbol elements)
      graphics.setFillStyle({ color: 0xffd700, alpha: borderPulse * 0.8 });
      graphics.circle(x, y, 12);
      graphics.fill();

      graphics.setFillStyle({ color: 0x8b0000, alpha: borderPulse });
      graphics.circle(x + 3, y, 6);
      graphics.fill();
    });

    // Enhanced center yin-yang inspired design with iconic elements
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Main ceremonial circle with traditional Korean colors
    graphics.setStrokeStyle({ color: 0x8b0000, width: 6, alpha: borderPulse });
    graphics.circle(centerX, centerY, 80 + Math.sin(gameTime * 0.015) * 8);
    graphics.stroke();

    // Secondary ring with decorative elements
    graphics.setStrokeStyle({
      color: 0xffd700,
      width: 3,
      alpha: borderPulse * 0.9,
    });
    graphics.circle(centerX, centerY, 60 + Math.cos(gameTime * 0.018) * 5);
    graphics.stroke();

    // Central energy core with pulsing effect
    const corePulse = Math.sin(gameTime * 0.025) * 0.4 + 0.7;
    graphics.setFillStyle({ color: 0x8b0000, alpha: corePulse });
    graphics.circle(centerX, centerY, 12 + Math.sin(gameTime * 0.03) * 3);
    graphics.fill();

    // Traditional Korean trigram-inspired orbital elements
    for (let i = 0; i < 8; i++) {
      const angle = gameTime * 0.008 + (i * Math.PI) / 4;
      const orbitRadius = 100 + Math.sin(gameTime * 0.01 + i) * 15;
      const orbX = centerX + Math.cos(angle) * orbitRadius;
      const orbY = centerY + Math.sin(angle) * orbitRadius;

      // Create trigram-line inspired orbital markers
      graphics.setStrokeStyle({
        color: 0xffd700,
        width: 4,
        alpha: corePulse * 0.7,
      });
      const lineLength = 8;
      graphics.moveTo(orbX - lineLength, orbY);
      graphics.lineTo(orbX + lineLength, orbY);
      graphics.stroke();

      // Add small decorative dots
      graphics.setFillStyle({ color: 0xffffff, alpha: corePulse * 0.5 });
      graphics.circle(orbX, orbY - 3, 2);
      graphics.circle(orbX, orbY + 3, 2);
      graphics.fill();
    }

    // Enhanced trigram symbol corners with better iconic representation
    const enhancedTrigramPositions = [
      { x: 150, y: 150, symbol: "☰", meaning: "Heaven", color: 0xffd700 },
      {
        x: window.innerWidth - 150,
        y: 150,
        symbol: "☲",
        meaning: "Fire",
        color: 0xff4500,
      },
      {
        x: 150,
        y: window.innerHeight - 150,
        symbol: "☷",
        meaning: "Earth",
        color: 0x654321,
      },
      {
        x: window.innerWidth - 150,
        y: window.innerHeight - 150,
        symbol: "☵",
        meaning: "Water",
        color: 0x4169e1,
      },
    ];

    enhancedTrigramPositions.forEach(({ x, y, color }, index) => {
      const symbolPulse =
        Math.sin(gameTime * 0.02 + (index * Math.PI) / 2) * 0.3 + 0.7;

      // Enhanced trigram symbol background with iconic design
      graphics.setFillStyle({ color: 0x000000, alpha: 0.8 });
      graphics.circle(x, y, 35);
      graphics.fill();

      graphics.setStrokeStyle({ color, width: 3, alpha: symbolPulse });
      graphics.circle(x, y, 35);
      graphics.stroke();

      // Inner decorative ring
      graphics.setStrokeStyle({
        color: 0xffd700,
        width: 1,
        alpha: symbolPulse * 0.6,
      });
      graphics.circle(x, y, 25);
      graphics.stroke();

      // Enhanced energy wisps with more iconic movement
      for (let j = 0; j < 4; j++) {
        const wispAngle = gameTime * 0.01 + j * ((Math.PI * 2) / 4);
        const wispRadius = 45 + Math.sin(gameTime * 0.015 + j) * 8;
        const wispX = x + Math.cos(wispAngle) * wispRadius;
        const wispY = y + Math.sin(wispAngle) * wispRadius;

        graphics.setFillStyle({ color, alpha: symbolPulse * 0.4 });
        graphics.circle(wispX, wispY, 3);
        graphics.fill();
      }
    });

    // Enhanced atmospheric grid with better visual hierarchy
    graphics.setStrokeStyle({
      color: 0x333333,
      width: 1,
      alpha: 0.1 + Math.sin(gameTime * 0.005) * 0.05,
    });
    const gridSize = 60;
    for (let x = 0; x < window.innerWidth; x += gridSize) {
      const lineAlpha = 0.15 + Math.sin(gameTime * 0.003 + x * 0.01) * 0.08;
      graphics.setStrokeStyle({ color: 0x444444, width: 1, alpha: lineAlpha });
      graphics.moveTo(x, 0);
      graphics.lineTo(x, window.innerHeight);
      graphics.stroke();
    }
    for (let y = 0; y < window.innerHeight; y += gridSize) {
      const lineAlpha = 0.15 + Math.sin(gameTime * 0.003 + y * 0.01) * 0.08;
      graphics.setStrokeStyle({ color: 0x444444, width: 1, alpha: lineAlpha });
      graphics.moveTo(0, y);
      graphics.lineTo(window.innerWidth, y);
      graphics.stroke();
    }

    // Enhanced floating energy motes with iconic shapes
    for (let i = 0; i < 20; i++) {
      const moteX =
        (Math.sin(gameTime * 0.002 + i * 0.8) * window.innerWidth) / 2.5 +
        window.innerWidth / 2;
      const moteY =
        (Math.cos(gameTime * 0.003 + i * 1.2) * window.innerHeight) / 2.5 +
        window.innerHeight / 2;
      const moteAlpha = Math.sin(gameTime * 0.02 + i) * 0.2 + 0.2;
      const moteSize = 2 + Math.sin(gameTime * 0.025 + i * 0.4) * 1;

      // Create diamond-shaped energy motes
      graphics.setFillStyle({ color: 0xffd700, alpha: moteAlpha });
      graphics.moveTo(moteX, moteY - moteSize);
      graphics.lineTo(moteX + moteSize, moteY);
      graphics.lineTo(moteX, moteY + moteSize);
      graphics.lineTo(moteX - moteSize, moteY);
      graphics.lineTo(moteX, moteY - moteSize);
      graphics.fill();
    }
  };

  return <pixiGraphics draw={drawDojang} />;
}
