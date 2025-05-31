import { useCallback, useState } from "react";
import { useTick } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import {
  PixiContainerComponent,
  PixiGraphicsComponent,
  PixiTextComponent,
} from "../ui/base/PixiComponents";
import {
  type PlayerState,
  KOREAN_COLORS,
  KOREAN_FONT_FAMILY,
  TRIGRAM_DATA,
} from "../../types";

export interface PlayerProps {
  readonly playerState: PlayerState;
  readonly isPlayer1: boolean;
  readonly onAttack: (
    damage: number,
    position: { x: number; y: number }
  ) => void;
}

export function Player({
  playerState,
  isPlayer1,
  onAttack,
}: PlayerProps): React.ReactElement {
  const [animationTime, setAnimationTime] = useState(0);

  useTick(
    useCallback((delta: number) => {
      setAnimationTime((prev) => prev + delta);
    }, [])
  );

  const drawPlayer = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Player body (Korean martial arts uniform - dobok)
      g.setFillStyle({ color: KOREAN_COLORS.WHITE, alpha: 0.9 });
      g.rect(-25, -90, 50, 90);
      g.fill();

      // Belt color based on player
      const beltColor = isPlayer1
        ? KOREAN_COLORS.PLAYER_1_BLUE
        : KOREAN_COLORS.PLAYER_2_RED;
      g.setFillStyle({ color: beltColor });
      g.rect(-27, -25, 54, 10);
      g.fill();

      // Stance energy aura
      if (playerState.isAttacking) {
        const stanceColor = TRIGRAM_DATA[playerState.stance].color;
        const auraAlpha = Math.sin(animationTime * 0.3) * 0.4 + 0.6;

        g.setStrokeStyle({
          color: stanceColor,
          width: 8,
          alpha: auraAlpha,
        });
        g.circle(0, -45, 45 + Math.sin(animationTime * 0.5) * 5);
        g.stroke();
      }

      // Health indicator
      const healthPercent = playerState.health / playerState.maxHealth;
      const healthColor =
        healthPercent > 0.6
          ? KOREAN_COLORS.Green
          : healthPercent > 0.3
          ? KOREAN_COLORS.Orange
          : KOREAN_COLORS.Red;

      g.setFillStyle({ color: healthColor });
      g.rect(-25, -100, 50 * healthPercent, 5);
      g.fill();
    },
    [playerState, isPlayer1, animationTime]
  );

  const trigram = TRIGRAM_DATA[playerState.stance];

  return (
    <PixiContainerComponent
      x={playerState.position.x}
      y={playerState.position.y}
      interactive={true}
      onClick={() => {
        // Execute attack
        const damage = trigram.technique.damage;
        onAttack(damage, playerState.position);
      }}
    >
      <PixiGraphicsComponent draw={drawPlayer} />

      {/* Player name */}
      <PixiTextComponent
        text={isPlayer1 ? "플레이어 1" : "플레이어 2"}
        y={-120}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: KOREAN_FONT_FAMILY,
          fontSize: 12,
          fill: isPlayer1
            ? KOREAN_COLORS.PLAYER_1_BLUE
            : KOREAN_COLORS.PLAYER_2_RED,
          fontWeight: "bold",
        }}
      />

      {/* Current stance display */}
      <PixiTextComponent
        text={`${trigram.korean} ${trigram.symbol}`}
        y={20}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: KOREAN_FONT_FAMILY,
          fontSize: 14,
          fill: trigram.color,
          fontWeight: "bold",
        }}
      />

      {/* Health text */}
      <PixiTextComponent
        text={`체력: ${playerState.health}/${playerState.maxHealth}`}
        y={35}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: KOREAN_FONT_FAMILY,
          fontSize: 10,
          fill: KOREAN_COLORS.WHITE,
        }}
      />
    </PixiContainerComponent>
  );
}
