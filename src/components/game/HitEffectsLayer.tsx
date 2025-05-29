import React, { useCallback, useEffect, useState } from "react";
import { Container, Graphics } from "@pixi/react";
import type { JSX } from "react";
import type { Vector2D } from "../../types/GameTypes";
import { Particle } from "pixi.js";
import { useTexture } from "../../hooks/useTexture";

// Dark Trigram theme constants
const DARK_TRIGRAM_THEME = {
  PRIMARY_CYAN: 0x00ffd0,
  VITAL_ORANGE: 0xff4400,
  CRITICAL_RED: 0xff3030,
  WHITE: 0xffffff,
  DARK_BG: 0x0a0e12,
  ENERGY_BLUE: 0x4169e1,
  LIGHTNING_YELLOW: 0xffd700,
} as const;

export interface HitEffect {
  readonly id: string;
  readonly position: Vector2D;
  readonly type: string;
  readonly intensity: number;
  readonly timestamp: number;
}

export interface HitEffectsLayerProps {
  readonly effects: readonly HitEffect[];
}

export function HitEffectsLayer({
  effects,
}: HitEffectsLayerProps): JSX.Element {
  const [particles, setParticles] = useState<readonly Particle[]>([]);
  const [screenShake, setScreenShake] = useState({ x: 0, y: 0, intensity: 0 });
  const { texture: logoTexture } = useTexture("/dark-trigram-256.png");

  // Generate explosive particles for vital hits
  const generateHitParticles = useCallback((effect: HitEffect): Particle[] => {
    const particleCount = effect.isVitalHit ? 25 : 12;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const speed = effect.isVitalHit
        ? 3 + Math.random() * 2
        : 1.5 + Math.random();
      const life = 60 + Math.random() * 30;

      particles.push({
        id: `particle_${effect.id}_${i}`,
        x: effect.x,
        y: effect.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life,
        maxLife: life,
        color: effect.isVitalHit
          ? DARK_TRIGRAM_THEME.VITAL_ORANGE
          : DARK_TRIGRAM_THEME.PRIMARY_CYAN,
        size: effect.isVitalHit ? 4 : 2,
      });
    }

    return particles;
  }, []);

  // Generate screen shake for powerful hits
  const generateScreenShake = useCallback((effect: HitEffect): void => {
    const intensity = effect.isVitalHit ? 15 : Math.min(effect.damage / 2, 8);
    setScreenShake({
      x: (Math.random() - 0.5) * intensity,
      y: (Math.random() - 0.5) * intensity,
      intensity,
    });
  }, []);

  // Handle new hit effects
  useEffect(() => {
    hitEffects.forEach((effect) => {
      // Generate particles for new effects
      if (effect.life === effect.maxLife) {
        const newParticles = generateHitParticles(effect);
        setParticles((prev) => [...prev, ...newParticles]);
        generateScreenShake(effect);
      }
    });
  }, [hitEffects, generateHitParticles, generateScreenShake]);

  // Update particles and screen shake
  useEffect(() => {
    const interval = setInterval(() => {
      // Update particles
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

      // Decay screen shake
      setScreenShake((prev) => ({
        x: prev.x * 0.9,
        y: prev.y * 0.9,
        intensity: prev.intensity * 0.9,
      }));
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  const drawParticles = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      particles.forEach((particle) => {
        const alpha = particle.life / particle.maxLife;
        const size = particle.size * alpha;

        // Energy particles with glow effect
        g.setFillStyle({ color: particle.color, alpha: alpha * 0.8 });
        g.circle(particle.x, particle.y, size);
        g.fill();

        // Outer glow
        g.setFillStyle({ color: particle.color, alpha: alpha * 0.3 });
        g.circle(particle.x, particle.y, size * 2);
        g.fill();
      });
    },
    [particles]
  );

  const drawEffect = useCallback(
    (effect: HitEffect) => (g: any) => {
      const age = Date.now() - effect.timestamp;
      const maxAge = 1000; // 1 second
      const progress = Math.min(age / maxAge, 1);
      const alpha = 1 - progress;

      if (alpha <= 0) return;

      g.clear();

      const radius = 20 + progress * 30;
      const color = effect.type === "critical" ? 0xff1493 : 0xffff00;

      // Outer ring
      g.setStrokeStyle({
        color,
        width: 4 * effect.intensity,
        alpha: alpha * 0.8,
      });
      g.circle(0, 0, radius);
      g.stroke();

      // Inner flash
      g.setFillStyle({ color, alpha: alpha * 0.4 });
      g.circle(0, 0, radius * 0.5);
      g.fill();

      // Spark effects for critical hits
      if (effect.type === "critical") {
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const sparkLength = 15 + progress * 25;
          const x1 = Math.cos(angle) * radius * 0.8;
          const y1 = Math.sin(angle) * radius * 0.8;
          const x2 = Math.cos(angle) * (radius * 0.8 + sparkLength);
          const y2 = Math.sin(angle) * (radius * 0.8 + sparkLength);

          g.setStrokeStyle({
            color: 0xffffff,
            width: 2,
            alpha: alpha * 0.9,
          });
          g.moveTo(x1, y1);
          g.lineTo(x2, y2);
          g.stroke();
        }
      }
    },
    []
  );

  return (
    <pixiContainer x={screenShake.x} y={screenShake.y}>
      {/* Particle effects */}
      <pixiGraphics draw={drawParticles} />

      {/* Enhanced hit effects with Korean aesthetics */}
      {hitEffects.map((effect) => {
        const alpha = effect.life / effect.maxLife;
        const scale = 1 + (1 - alpha) * 0.8;
        const isVitalHit = effect.damage > 25;

        return (
          <pixiContainer key={effect.id} x={effect.x} y={effect.y}>
            {/* Background explosion ring for vital hits */}
            {isVitalHit && (
              <pixiGraphics
                draw={(g: PixiGraphics) => {
                  g.clear();
                  const ringSize = (1 - alpha) * 100;

                  // Outer explosion ring
                  g.setStrokeStyle({
                    color: DARK_TRIGRAM_THEME.VITAL_ORANGE,
                    width: 3,
                    alpha: alpha * 0.6,
                  });
                  g.circle(0, 0, ringSize);
                  g.stroke();

                  // Inner energy ring
                  g.setStrokeStyle({
                    color: DARK_TRIGRAM_THEME.LIGHTNING_YELLOW,
                    width: 1,
                    alpha: alpha * 0.8,
                  });
                  g.circle(0, 0, ringSize * 0.7);
                  g.stroke();

                  // Lightning effect for vital hits
                  if (alpha > 0.7) {
                    for (let i = 0; i < 8; i++) {
                      const angle = (Math.PI * 2 * i) / 8;
                      const length = 30 + Math.random() * 20;
                      g.setStrokeStyle({
                        color: DARK_TRIGRAM_THEME.LIGHTNING_YELLOW,
                        width: 2,
                        alpha: alpha * 0.5,
                      });
                      g.moveTo(0, 0);
                      g.lineTo(
                        Math.cos(angle) * length + (Math.random() - 0.5) * 10,
                        Math.sin(angle) * length + (Math.random() - 0.5) * 10
                      );
                      g.stroke();
                    }
                  }
                }}
              />
            )}

            {/* Dark Trigram logo for critical hits */}
            {isVitalHit && logoTexture && alpha > 0.5 && (
              <pixiSprite
                texture={logoTexture}
                anchor={{ x: 0.5, y: 0.5 }}
                scale={{ x: 0.15 * scale, y: 0.15 * scale }}
                alpha={alpha * 0.7}
                y={-80}
              />
            )}

            {/* Enhanced damage number with Korean style */}
            <pixiContainer>
              <pixiGraphics
                draw={(g: PixiGraphics) => {
                  g.clear();
                  // Background panel for damage number
                  g.setFillStyle({
                    color: DARK_TRIGRAM_THEME.DARK_BG,
                    alpha: alpha * 0.8,
                  });
                  g.roundRect(-40, -15, 80, 30, 8);
                  g.fill();

                  // Border with trigram colors
                  g.setStrokeStyle({
                    color: isVitalHit
                      ? DARK_TRIGRAM_THEME.VITAL_ORANGE
                      : DARK_TRIGRAM_THEME.PRIMARY_CYAN,
                    width: 2,
                    alpha: alpha,
                  });
                  g.roundRect(-40, -15, 80, 30, 8);
                  g.stroke();
                }}
              />

              <pixiText
                text={`${effect.damage}`}
                anchor={{ x: 0.5, y: 0.5 }}
                scale={{ x: scale, y: scale }}
                alpha={alpha}
                style={{
                  fontFamily: "Orbitron, Noto Sans KR",
                  fontSize: isVitalHit ? 32 : 24,
                  fill: isVitalHit
                    ? DARK_TRIGRAM_THEME.VITAL_ORANGE
                    : DARK_TRIGRAM_THEME.PRIMARY_CYAN,
                  fontWeight: "bold",
                  stroke: { color: DARK_TRIGRAM_THEME.DARK_BG, width: 3 },
                  dropShadow: {
                    color: isVitalHit
                      ? DARK_TRIGRAM_THEME.VITAL_ORANGE
                      : DARK_TRIGRAM_THEME.PRIMARY_CYAN,
                    blur: 8,
                    distance: 0,
                  },
                }}
              />
            </pixiContainer>

            {/* Vital hit indicator with Korean text and effects */}
            {isVitalHit && (
              <pixiContainer y={-50}>
                <pixiGraphics
                  draw={(g: PixiGraphics) => {
                    g.clear();
                    // Energy burst background
                    g.setFillStyle({
                      color: DARK_TRIGRAM_THEME.VITAL_ORANGE,
                      alpha: alpha * 0.3,
                    });
                    g.roundRect(-60, -20, 120, 40, 12);
                    g.fill();

                    // Pulsing border
                    g.setStrokeStyle({
                      color: DARK_TRIGRAM_THEME.WHITE,
                      width: 2,
                      alpha: alpha * 0.9,
                    });
                    g.roundRect(-60, -20, 120, 40, 12);
                    g.stroke();
                  }}
                />

                <pixiText
                  text="급소격!"
                  anchor={{ x: 0.5, y: 0.5 }}
                  scale={{ x: scale * 0.8, y: scale * 0.8 }}
                  alpha={alpha}
                  style={{
                    fontFamily: "Noto Sans KR",
                    fontSize: 20,
                    fill: DARK_TRIGRAM_THEME.WHITE,
                    fontWeight: "bold",
                    dropShadow: {
                      color: DARK_TRIGRAM_THEME.VITAL_ORANGE,
                      blur: 6,
                      distance: 0,
                    },
                  }}
                />
              </pixiContainer>
            )}

            {/* Technique name with enhanced Korean typography */}
            <pixiContainer y={40}>
              <pixiGraphics
                draw={(g: PixiGraphics) => {
                  g.clear();
                  // Traditional Korean panel background
                  g.setFillStyle({ color: 0x000000, alpha: alpha * 0.7 });
                  g.roundRect(-80, -12, 160, 24, 6);
                  g.fill();

                  // Traditional red border
                  g.setStrokeStyle({
                    color: 0x8b0000,
                    width: 1,
                    alpha: alpha * 0.8,
                  });
                  g.roundRect(-80, -12, 160, 24, 6);
                  g.stroke();
                }}
              />

              <pixiText
                text={effect.technique}
                anchor={{ x: 0.5, y: 0.5 }}
                scale={{ x: scale * 0.7, y: scale * 0.7 }}
                alpha={alpha * 0.9}
                style={{
                  fontFamily: "Noto Sans KR",
                  fontSize: 14,
                  fill: DARK_TRIGRAM_THEME.WHITE,
                  fontWeight: "400",
                  dropShadow: {
                    color: 0x8b0000,
                    blur: 3,
                    distance: 0,
                  },
                }}
              />
            </pixiContainer>

            {/* Trigram symbol for technique classification */}
            {effect.trigram && (
              <pixiContainer y={-100}>
                <pixiGraphics
                  draw={(g: PixiGraphics) => {
                    g.clear();
                    // Circular background for trigram
                    g.setFillStyle({
                      color: DARK_TRIGRAM_THEME.PRIMARY_CYAN,
                      alpha: alpha * 0.2,
                    });
                    g.circle(0, 0, 25);
                    g.fill();

                    g.setStrokeStyle({
                      color: DARK_TRIGRAM_THEME.PRIMARY_CYAN,
                      width: 2,
                      alpha: alpha * 0.6,
                    });
                    g.circle(0, 0, 25);
                    g.stroke();
                  }}
                />

                <pixiText
                  text={effect.trigram}
                  anchor={{ x: 0.5, y: 0.5 }}
                  scale={{ x: scale, y: scale }}
                  alpha={alpha * 0.8}
                  style={{
                    fontFamily: "serif",
                    fontSize: 28,
                    fill: DARK_TRIGRAM_THEME.WHITE,
                    fontWeight: "bold",
                  }}
                />
              </pixiContainer>
            )}
          </pixiContainer>
        );
      })}

      <Container>
        {effects.map((effect) => (
          <Container
            key={effect.id}
            x={effect.position.x}
            y={effect.position.y}
          >
            <Graphics draw={drawEffect(effect)} />
          </Container>
        ))}
      </Container>
    </pixiContainer>
  );
}
