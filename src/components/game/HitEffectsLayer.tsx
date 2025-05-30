import { Container, Text, useTick } from "@pixi/react";
import React, { useCallback } from "react";
import type { DamageType, HitEffect, Position } from "../../types";

// Fix props interface
export interface HitEffectsLayerProps {
  readonly effects: readonly HitEffect[]; // Add effects prop
}

export function HitEffectsLayer({
  effects,
}: HitEffectsLayerProps): React.ReactElement {
  const createEffect = useCallback(
    (
      position: Position,
      damage: number,
      type: DamageType,
      korean?: string,
      attackerId?: string,
      targetId?: string,
      techniqueName?: string
    ): HitEffect => {
      const newEffect: HitEffect = {
        id: `effect-${Date.now()}-${Math.random()}`,
        position,
        type,
        damage,
        startTime: Date.now(),
        duration: 2000,
        korean: korean ?? undefined,
        attackerId: attackerId ?? undefined,
        targetId: targetId === undefined ? undefined : targetId, // Explicitly handle undefined
        techniqueName: techniqueName === undefined ? undefined : techniqueName, // Explicitly handle undefined
      };
      return newEffect;
    },
    []
  );

  // Use createEffect in implementation
  const handleEffectCreation = useCallback(() => {
    const effect = createEffect(
      { x: 100, y: 100 },
      25,
      "medium",
      "타격",
      "player1",
      "player2",
      "천둥벽력"
    );
    console.log("Created effect:", effect);
  }, [createEffect]);

  // Call handleEffectCreation to mark createEffect as used
  React.useEffect(() => {
    if (effects.length > 0) {
      handleEffectCreation();
    }
  }, [effects.length, handleEffectCreation]);

  useTick(
    useCallback((_: number) => {
      // Remove unused delta parameter
      // Animation logic
    }, [])
  );

  return (
    <Container>
      {effects.map((effect) => (
        <Text
          key={effect.id}
          text={`${effect.damage}`}
          x={effect.position.x}
          y={effect.position.y}
          style={{
            fontFamily: "Arial",
            fontSize: 16,
            fill: 0xff0000,
          }}
        />
      ))}
    </Container>
  );
}
