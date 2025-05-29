import { useCallback, useState } from "react";
import { useTick } from "@pixi/react";
import type { Ticker } from "pixi.js";
import type { PlayerState, Position, TrigramStance } from "../../types";
import { PlayerVisuals } from "./PlayerVisuals";

interface PlayerProps {
  readonly playerState: PlayerState;
  readonly opponentPosition: Position;
  readonly onAttack?: (damage: number, technique: string) => void;
  readonly onStanceChange?: (stance: TrigramStance) => void;
}

export function Player({
  playerState,
  opponentPosition,
  onAttack,
  onStanceChange,
}: PlayerProps): JSX.Element {
  const [animationTime, setAnimationTime] = useState<number>(0);

  useTick(
    useCallback((ticker: Ticker) => {
      setAnimationTime((prev) => prev + ticker.deltaTime * 0.016); // Convert to seconds
    }, [])
  );

  const handleAttack = useCallback(
    (damage: number, technique: string) => {
      onAttack?.(damage, technique);
    },
    [onAttack]
  );

  const handleStanceChange = useCallback(
    (stance: TrigramStance) => {
      onStanceChange?.(stance);
    },
    [onStanceChange]
  );

  return (
    <PlayerVisuals
      playerState={playerState}
      opponentPosition={opponentPosition}
      animationTime={animationTime}
      onAttack={handleAttack}
      onStanceChange={handleStanceChange}
    />
  );
}
