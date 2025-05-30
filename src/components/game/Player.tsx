import React, { useCallback, useState } from "react";
import { Container, Graphics, Text, useTick } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import type { PlayerState, TrigramStance } from "../../types";
import { TRIGRAM_DATA, KOREAN_COLORS } from "../../types";
import { useAudio } from "../../audio/AudioManager";

interface PlayerProps {
  readonly playerState: PlayerState;
  readonly onStanceChange: (stance: TrigramStance) => void;
  readonly onAttack: (target: string | null) => void;
}

export function Player({
  playerState,
  onAttack,
}: PlayerProps): React.JSX.Element {
  const [animationTime, setAnimationTime] = useState<number>(0);
  const audio = useAudio();

  const drawPlayer = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Traditional Korean martial arts uniform (dobok)
      const whiteColor =
        typeof KOREAN_COLORS.WHITE === "string"
          ? parseInt(KOREAN_COLORS.WHITE.replace("#", ""), 16)
          : KOREAN_COLORS.WHITE;
      g.setFillStyle({ color: whiteColor, alpha: 0.9 });
      g.rect(-25, -90, 50, 90);
      g.fill();

      // Belt color indicating mastery level
      g.setFillStyle({ color: 0x8b0000 }); // Red belt for master
      g.rect(-27, -25, 54, 10);
      g.fill();

      // Stance-specific energy aura
      if (playerState.isAttacking) {
        const stanceColor = TRIGRAM_DATA[playerState.stance].color;
        const colorValue =
          typeof stanceColor === "string"
            ? parseInt(stanceColor.replace("#", ""), 16)
            : stanceColor;

        const auraAlpha = Math.sin(animationTime * 0.3) * 0.4 + 0.6;
        g.setStrokeStyle({
          color: colorValue,
          width: 8,
          alpha: auraAlpha,
        });
        g.circle(0, -45, 45 + Math.sin(animationTime * 0.5) * 5);
        g.stroke();
      }
    },
    [playerState.stance, playerState.isAttacking, animationTime]
  );

  useTick(
    useCallback((delta: number) => {
      setAnimationTime((prev) => prev + delta);
    }, [])
  );

  const executeKoreanTechnique = useCallback(() => {
    const technique = TRIGRAM_DATA[playerState.stance].technique;
    audio.playAttackSound(technique.damage);
    // Fix: Ensure targetId is properly typed
    onAttack(playerState.targetId || null);
  }, [playerState.stance, playerState.targetId, audio, onAttack]);

  return (
    <Container
      x={playerState.position.x}
      y={playerState.position.y}
      interactive={true}
      onPointerDown={executeKoreanTechnique}
    >
      <Graphics draw={drawPlayer} />

      {/* Korean technique name display */}
      <Text
        text={`${
          TRIGRAM_DATA[playerState.stance].technique.name
        } (${playerState.stance.toUpperCase()})`}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-120}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 16,
          fill: KOREAN_COLORS.GOLD,
          fontWeight: "bold",
        }}
      />

      {/* Trigram symbol */}
      <Text
        text={TRIGRAM_DATA[playerState.stance].symbol}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-140}
        style={{
          fontFamily: "serif",
          fontSize: 24,
          fill: KOREAN_COLORS.WHITE,
        }}
      />
    </Container>
  );
}
