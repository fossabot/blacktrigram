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

    // Enhanced traditional Korean dojang with intro screen colors
    // Deep black background like intro
    graphics.setFillStyle({ color: 0x000000 });
    graphics.rect(0, 0, window.innerWidth, window.innerHeight);
    graphics.fill();

    // Animated background particles for energy
    for (let i = 0; i < 20; i++) {
      const x =
        (Math.sin(gameTime * 0.01 + i) * 100 + window.innerWidth / 2) %
        window.innerWidth;
      const y =
        (Math.cos(gameTime * 0.008 + i * 0.5) * 100 + window.innerHeight / 2) %
        window.innerHeight;
      const alpha = Math.sin(gameTime * 0.02 + i) * 0.1 + 0.1;

      graphics.setFillStyle({ color: 0x8b0000, alpha });
      graphics.circle(x, y, 2 + Math.sin(gameTime * 0.03 + i) * 1);
      graphics.fill();
    }

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

    // Enhanced fighting area with traditional Korean border - centered with energy effects
    const arenaWidth = Math.min(600, window.innerWidth * 0.7);
    const arenaHeight = Math.min(300, window.innerHeight * 0.4);
    const arenaX = (window.innerWidth - arenaWidth) / 2;
    const arenaY = (window.innerHeight - arenaHeight) / 2;

    // Animated energy border
    const borderPulse = Math.sin(gameTime * 0.02) * 0.3 + 0.7;
    graphics.setStrokeStyle({ color: 0x8b0000, width: 6, alpha: borderPulse });
    graphics.rect(arenaX - 40, arenaY - 30, arenaWidth + 80, arenaHeight + 60);
    graphics.stroke();

    // Inner border with gold accent like intro screen with animation
    graphics.setStrokeStyle({
      color: 0xffd700,
      width: 2,
      alpha: borderPulse * 0.8,
    });
    graphics.rect(arenaX - 35, arenaY - 25, arenaWidth + 70, arenaHeight + 50);
    graphics.stroke();

    // Enhanced center circle with yin-yang inspiration from intro - centered with complex animation
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Rotating outer ring with energy
    graphics.setStrokeStyle({ color: 0x8b0000, width: 4, alpha: borderPulse });
    graphics.circle(centerX, centerY, 60 + Math.sin(gameTime * 0.015) * 5);
    graphics.stroke();

    // Middle ring with counter-rotation effect
    graphics.setStrokeStyle({
      color: 0xffffff,
      width: 2,
      alpha: borderPulse * 0.9,
    });
    graphics.circle(centerX, centerY, 45 + Math.cos(gameTime * 0.018) * 3);
    graphics.stroke();

    // Center with complex pulsing effect like intro
    const pulse = Math.sin(gameTime * 0.02) * 0.3 + 0.7;
    graphics.setFillStyle({ color: 0x8b0000, alpha: pulse });
    graphics.circle(centerX, centerY, 8 + Math.sin(gameTime * 0.025) * 2);
    graphics.fill();

    // Rotating energy cores around center
    for (let i = 0; i < 4; i++) {
      const angle = gameTime * 0.01 + (i * Math.PI) / 2;
      const orbitRadius = 30;
      const orbX = centerX + Math.cos(angle) * orbitRadius;
      const orbY = centerY + Math.sin(angle) * orbitRadius;

      graphics.setFillStyle({ color: 0xffd700, alpha: pulse * 0.6 });
      graphics.circle(orbX, orbY, 4);
      graphics.fill();
    }

    // Enhanced trigram symbols in corners with proper positioning - responsive and animated
    const margin = 120;
    const trigramPositions = [
      { x: margin, y: margin, symbol: "☰" }, // Heaven
      { x: window.innerWidth - margin, y: margin, symbol: "☲" }, // Fire
      { x: margin, y: window.innerHeight - margin, symbol: "☷" }, // Earth
      {
        x: window.innerWidth - margin,
        y: window.innerHeight - margin,
        symbol: "☵",
      }, // Water
    ];

    trigramPositions.forEach(({ x, y }, index) => {
      const symbolPulse =
        Math.sin(gameTime * 0.02 + (index * Math.PI) / 2) * 0.2 + 0.8;

      // Traditional Korean symbol background with glow
      graphics.setFillStyle({ color: 0x8b0000, alpha: symbolPulse * 0.8 });
      graphics.circle(x, y, 25 + Math.sin(gameTime * 0.015 + index) * 2);
      graphics.fill();

      graphics.setStrokeStyle({
        color: 0xffd700,
        width: 2,
        alpha: symbolPulse,
      });
      graphics.circle(x, y, 25 + Math.sin(gameTime * 0.015 + index) * 2);
      graphics.stroke();

      // Energy wisps around trigram symbols
      for (let j = 0; j < 3; j++) {
        const wispAngle = gameTime * 0.008 + j * ((Math.PI * 2) / 3);
        const wispRadius = 35 + Math.sin(gameTime * 0.012 + j) * 5;
        const wispX = x + Math.cos(wispAngle) * wispRadius;
        const wispY = y + Math.sin(wispAngle) * wispRadius;

        graphics.setFillStyle({
          color: 0xffffff,
          alpha: symbolPulse * 0.3 + Math.sin(gameTime * 0.02 + j) * 0.1,
        });
        graphics.circle(wispX, wispY, 1.5);
        graphics.fill();
      }
    });

    // Enhanced atmospheric effect with traditional colors and movement
    graphics.setFillStyle({ color: 0x8b0000, alpha: pulse * 0.03 });
    graphics.rect(0, 0, window.innerWidth, window.innerHeight);
    graphics.fill();

    // Add dynamic grid pattern like intro screen - responsive with energy flow
    graphics.setStrokeStyle({
      color: 0x333333,
      width: 1,
      alpha: 0.15 + Math.sin(gameTime * 0.01) * 0.05,
    });
    for (let x = 0; x < window.innerWidth; x += 40) {
      const lineAlpha = 0.2 + Math.sin(gameTime * 0.005 + x * 0.01) * 0.1;
      graphics.setStrokeStyle({ color: 0x333333, width: 1, alpha: lineAlpha });
      graphics.moveTo(x, 0);
      graphics.lineTo(x, window.innerHeight);
      graphics.stroke();
    }
    for (let y = 0; y < window.innerHeight; y += 40) {
      const lineAlpha = 0.2 + Math.sin(gameTime * 0.005 + y * 0.01) * 0.1;
      graphics.setStrokeStyle({ color: 0x333333, width: 1, alpha: lineAlpha });
      graphics.moveTo(0, y);
      graphics.lineTo(window.innerWidth, y);
      graphics.stroke();
    }

    // Add floating energy motes for ambiance
    for (let i = 0; i < 15; i++) {
      const moteX =
        (Math.sin(gameTime * 0.003 + i * 0.7) * window.innerWidth) / 3 +
        window.innerWidth / 2;
      const moteY =
        (Math.cos(gameTime * 0.004 + i * 0.9) * window.innerHeight) / 3 +
        window.innerHeight / 2;
      const moteAlpha = Math.sin(gameTime * 0.015 + i) * 0.15 + 0.15;
      const moteSize = 1 + Math.sin(gameTime * 0.02 + i * 0.3) * 0.5;

      graphics.setFillStyle({ color: 0xffd700, alpha: moteAlpha });
      graphics.circle(moteX, moteY, moteSize);
      graphics.fill();
    }
  };

  return <pixiGraphics draw={drawDojang} />;
}
