import React, { useState, useEffect, useCallback } from "react";
import { Container, Graphics, Text, useTick } from "@pixi/react";
import type { CombatEvent, Position } from "../../types";
import { KOREAN_COLORS } from "../../types";
import type { Graphics as PixiGraphics, Ticker } from "pixi.js";

interface HitEffect {
  id: string;
  position: Position;
  text: string;
  color: number;
  life: number;
  type: "damage" | "crit" | "block" | "miss" | "technique";
  timestamp: number; // Added timestamp
  techniqueName?: string; // Added techniqueName
  damageAmount?: number; // Added damageAmount
}

const EFFECT_LIFE_TIME = 60; // frames (approx 1 second at 60fps)

export function HitEffectsLayer({
  combatEvents,
}: {
  readonly combatEvents: CombatEvent[];
}): React.JSX.Element {
  const [effects, setEffects] = useState<HitEffect[]>([]);
  const lastEvent =
    combatEvents.length > 0 ? combatEvents[combatEvents.length - 1] : undefined;

  useEffect(() => {
    if (!lastEvent || !lastEvent.attackerId) return; // Ensure lastEvent and attackerId exist

    const attackerPosition = {
      x: Math.random() * 700 + 50,
      y: Math.random() * 200 + 350,
    }; // Placeholder position

    let newEffect: HitEffect | null = null;

    if (lastEvent.type === "attack_result") {
      const damage = lastEvent.damage !== undefined ? lastEvent.damage : 0;
      const isCrit = "isCritical" in lastEvent ? lastEvent.isCritical : false; // Check for isCritical

      newEffect = {
        id: `${Date.now()}-${Math.random()}`,
        position: attackerPosition, // Position should ideally come from defender
        text: isCrit ? `치명타! ${damage}` : `${damage}`,
        color: isCrit
          ? KOREAN_COLORS.CRITICAL_RED
          : KOREAN_COLORS.DAMAGE_YELLOW,
        life: EFFECT_LIFE_TIME,
        type: isCrit ? "crit" : "damage",
        timestamp: lastEvent.timestamp, // Use timestamp from CombatEvent
        damageAmount: damage, // Add damageAmount
        techniqueName: lastEvent.technique, // Use technique from CombatEvent
      };
    } else if (lastEvent.type === "action_fail") {
      // Could add an effect for failed actions
    }

    if (newEffect) {
      setEffects((prevEffects) =>
        [...prevEffects, newEffect as HitEffect].slice(-10)
      ); // Keep last 10 effects
    }
  }, [lastEvent]); // Depend on lastEvent

  useTick(
    useCallback((delta: number, _ticker: Ticker) => {
      setEffects((prevEffects) =>
        prevEffects
          .map((effect) => ({ ...effect, life: effect.life - delta }))
          .filter((effect) => effect.life > 0)
      );
    }, [])
  );

  const drawEffect = useCallback((g: PixiGraphics, effect: HitEffect) => {
    g.clear();
    const alpha =
      EFFECT_LIFE_TIME > 0 ? Math.max(0, effect.life / EFFECT_LIFE_TIME) : 1; // Ensure EFFECT_LIFE_TIME is not zero

    if (effect.type === "damage" || effect.type === "crit") {
      // Floating damage text
    } else if (effect.type === "technique" && effect.techniqueName) {
      // Display technique name
    }
    // Other effect types like block, miss can be drawn here
  }, []);

  return (
    <Container>
      {effects.map((effect) => (
        <Container
          key={effect.id}
          x={effect.position.x}
          y={effect.position.y - (EFFECT_LIFE_TIME - effect.life)}
        >
          <Text
            text={effect.text}
            anchor={0.5}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: effect.type === "crit" ? 24 : 18,
              fill: effect.color,
              stroke: KOREAN_COLORS.BLACK,
              strokeThickness: 2,
              fontWeight: effect.type === "crit" ? "bold" : "normal",
              alpha:
                EFFECT_LIFE_TIME > 0
                  ? Math.max(0, effect.life / EFFECT_LIFE_TIME)
                  : 1,
            }}
          />
          {effect.type === "technique" && effect.techniqueName && (
            <Text
              text={effect.techniqueName} // Use techniqueName
              anchor={{ x: 0.5, y: 1.2 }} // Position below damage/crit text
              style={{
                fontFamily: "Noto Sans KR",
                fontSize: 14,
                fill: KOREAN_COLORS.WHITE,
                alpha:
                  EFFECT_LIFE_TIME > 0
                    ? Math.max(0, effect.life / EFFECT_LIFE_TIME)
                    : 1,
              }}
            />
          )}
        </Container>
      ))}
    </Container>
  );
}
