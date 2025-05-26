import type { JSX } from "react";

export interface HitEffect {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly damage: number;
  readonly technique: string;
  readonly life: number;
  readonly maxLife: number;
}

interface HitEffectsLayerProps {
  readonly hitEffects: readonly HitEffect[];
}

export function HitEffectsLayer({
  hitEffects,
}: HitEffectsLayerProps): JSX.Element {
  return (
    <>
      {hitEffects.map((effect) => {
        const alpha = effect.life / effect.maxLife;
        const scale = 1 + (1 - alpha) * 0.5;
        return (
          <pixiContainer key={effect.id} x={effect.x} y={effect.y}>
            <pixiText
              text={`-${effect.damage}`}
              anchor={{ x: 0.5, y: 0.5 }}
              scale={{ x: scale, y: scale }}
              alpha={alpha}
              style={{
                fontFamily: "Noto Sans KR",
                fontSize: 24,
                fill: 0xff4444,
                fontWeight: "bold",
                stroke: { color: 0x000000, width: 2 },
              }}
            />
            <pixiText
              text="급소!"
              anchor={{ x: 0.5, y: 0.5 }}
              y={-25}
              scale={{ x: scale * 0.8, y: scale * 0.8 }}
              alpha={alpha * 0.8}
              style={{
                fontFamily: "Noto Sans KR",
                fontSize: 16,
                fill: 0xffaaaa,
                fontWeight: "bold",
              }}
            />
          </pixiContainer>
        );
      })}
    </>
  );
}
