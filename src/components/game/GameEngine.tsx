import { useCallback, useState } from "react";
import { Player } from "./Player";
import { DojangBackground } from "./DojangBackground";
import { HitEffectsLayer } from "./HitEffectsLayer";
import {
  PixiContainerComponent,
  PixiTextComponent,
} from "../ui/base/PixiComponents";
import {
  type GameEngineProps,
  type HitEffect,
  KOREAN_COLORS,
  KOREAN_FONT_FAMILY,
} from "../../types";

export function GameEngine({
  players,
  gamePhase,
}: GameEngineProps): React.ReactElement {
  const [hitEffects, setHitEffects] = useState<HitEffect[]>([]);

  const handlePlayerAttack = useCallback(
    (damage: number, position: { x: number; y: number }): void => {
      // Create hit effect with proper typing
      const effect: HitEffect = {
        id: `hit-${Date.now()}`,
        position,
        damage,
        startTime: Date.now(),
        duration: 1000,
        type: damage > 20 ? "heavy" : "light",
        color: damage > 20 ? KOREAN_COLORS.Red : KOREAN_COLORS.DAMAGE_YELLOW,
        createdAt: Date.now(),
      };

      setHitEffects((prev) => [...prev, effect]);

      // Remove effect after duration
      setTimeout(() => {
        setHitEffects((prev) => prev.filter((e) => e.id !== effect.id));
      }, effect.duration);
    },
    []
  );

  // Non-combat phases use simple text display
  if (gamePhase !== "combat") {
    return (
      <PixiContainerComponent>
        <PixiTextComponent
          text="게임 엔진은 전투 중에만 활성화됩니다"
          x={400}
          y={300}
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: KOREAN_FONT_FAMILY,
            fontSize: 18,
            fill: KOREAN_COLORS.WHITE,
          }}
        />
      </PixiContainerComponent>
    );
  }

  return (
    <PixiContainerComponent>
      {/* Dojang background */}
      <DojangBackground width={800} height={600} />

      {/* Players */}
      {players.map((playerState, index) => (
        <Player
          key={`player-${index}`}
          playerState={playerState}
          isPlayer1={index === 0}
          onAttack={handlePlayerAttack}
        />
      ))}

      {/* Hit effects layer */}
      <HitEffectsLayer effects={hitEffects} />
    </PixiContainerComponent>
  );
}
