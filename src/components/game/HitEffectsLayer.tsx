import { useCallback, useEffect, useState } from "react";
import type { HitEffect } from "../../types";
import type { Graphics as PixiGraphics } from "pixi.js";

export interface HitEffectsLayerProps {
  readonly effects: HitEffect[]; // Fixed prop name
}

interface Particle {
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly life: number;
  readonly maxLife: number;
  readonly color: number;
  readonly size: number;
}

interface ScreenShake {
  readonly intensity: number;
  readonly duration: number;
  readonly timeRemaining: number;
}

export function HitEffectsLayer({
  effects,
}: HitEffectsLayerProps): JSX.Element {
  const [particles, setParticles] = useState<readonly Particle[]>([]);
  const [screenShake, setScreenShake] = useState<ScreenShake | null>(null);

  // Generate particles for hit effects
  const generateHitParticles = useCallback((effect: HitEffect): Particle[] => {
    const particleCount = effect.type === "critical" ? 25 : 12;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
      const speed =
        effect.type === "critical"
          ? 3 + Math.random() * 4
          : 2 + Math.random() * 2;

      newParticles.push({
        x: effect.position.x,
        y: effect.position.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 30,
        maxLife: 30,
        color:
          effect.type === "critical"
            ? 0xff0080
            : effect.type === "heavy"
            ? 0xff4500
            : 0xffffff,
        size: effect.type === "critical" ? 4 : 2,
      });
    }

    return newParticles;
  }, []);

  // Generate screen shake for hit effects
  const generateScreenShake = useCallback((effect: HitEffect): void => {
    const intensity =
      effect.type === "critical" ? 15 : Math.min(effect.damage / 2, 8);

    setScreenShake({
      intensity,
      duration: 10,
      timeRemaining: 10,
    });
  }, []);

  // Process new effects
  useEffect(() => {
    effects.forEach((effect) => {
      const newParticles = generateHitParticles(effect);
      setParticles((prev) => [...prev, ...newParticles]);

      generateScreenShake(effect);
    });
  }, [effects, generateHitParticles, generateScreenShake]);

  // Update particles
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vx: particle.vx * 0.98, // Air resistance
            vy: particle.vy * 0.98 + 0.1, // Gravity
            life: particle.life - 1,
          }))
          .filter((particle) => particle.life > 0)
      );

      setScreenShake((prev) =>
        prev && prev.timeRemaining > 0
          ? { ...prev, timeRemaining: prev.timeRemaining - 1 }
          : null
      );
    }, 16);

    return () => clearInterval(updateInterval);
  }, []);

  const drawParticles = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      particles.forEach((particle) => {
        const alpha = particle.life / particle.maxLife;
        const size = particle.size * alpha;

        g.setFillStyle({ color: particle.color, alpha });
        g.circle(particle.x, particle.y, size);
        g.fill();
      });
    },
    [particles]
  );

  const getShakeOffset = useCallback((): { x: number; y: number } => {
    if (!screenShake) return { x: 0, y: 0 };

    const intensity =
      screenShake.intensity *
      (screenShake.timeRemaining / screenShake.duration);
    return {
      x: (Math.random() - 0.5) * intensity,
      y: (Math.random() - 0.5) * intensity,
    };
  }, [screenShake]);

  const shakeOffset = getShakeOffset();

  const renderHitEffect = useCallback(
    (effect: HitEffect) => {
      const effectAlpha = 1.0;
      const effectScale = effect.type === "critical" ? 1.5 : 1.0;

      return (
        <pixiContainer
          x={effect.position.x}
          y={effect.position.y}
          scale={{ x: effectScale, y: effectScale }}
        >
          {/* Impact flash */}
          <pixiGraphics
            draw={(g: PixiGraphics) => {
              g.clear();

              const flashColor =
                effect.type === "critical"
                  ? 0xff0080
                  : effect.type === "heavy"
                  ? 0xff4500
                  : 0xffffff;

              g.setFillStyle({ color: flashColor, alpha: effectAlpha * 0.6 });
              g.circle(0, 0, 20);
              g.fill();

              g.setStrokeStyle({
                color: flashColor,
                width: 3,
                alpha: effectAlpha,
              });
              g.circle(0, 0, 30);
              g.stroke();
            }}
          />

          {/* Damage text */}
          <pixiText
            text={`${effect.damage}`}
            anchor={{ x: 0.5, y: 0.5 }}
            y={-40}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: effect.type === "critical" ? 24 : 18,
              fill: effect.type === "critical" ? 0xff0080 : 0xffffff,
              fontWeight: "bold",
            }}
          />

          {/* Critical hit indicator */}
          {effect.type === "critical" && (
            <pixiGraphics
              draw={(g: PixiGraphics) => {
                g.clear();

                // Draw energy burst lines
                for (let i = 0; i < 8; i++) {
                  const angle = (Math.PI * 2 * i) / 8;
                  const startX = Math.cos(angle) * 25;
                  const startY = Math.sin(angle) * 25;
                  const endX = Math.cos(angle) * 45;
                  const endY = Math.sin(angle) * 45;

                  g.setStrokeStyle({
                    color: 0xff0080,
                    width: 2,
                    alpha: effectAlpha,
                  });
                  g.moveTo(startX, startY);
                  g.lineTo(endX, endY);
                  g.stroke();
                }
              }}
            />
          )}

          {/* Hit type indicator */}
          {effect.type !== "light" && (
            <pixiText
              text={
                effect.type === "critical"
                  ? "급소!"
                  : effect.type === "heavy"
                  ? "강타!"
                  : "명중!"
              }
              anchor={{ x: 0.5, y: 0.5 }}
              y={-60}
              style={{
                fontFamily: "Noto Sans KR",
                fontSize: 14,
                fill: 0xffd700,
                fontWeight: "bold",
              }}
            />
          )}
        </pixiContainer>
      );
    },
    [effects]
  );

  return (
    <pixiContainer x={shakeOffset.x} y={shakeOffset.y}>
      {/* Particle effects */}
      <pixiGraphics draw={drawParticles} />

      {/* Hit effect visualization */}
      {effects.map((effect, index) => renderHitEffect(effect))}
    </pixiContainer>
  );
}
