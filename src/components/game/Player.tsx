import { useCallback, useState } from "react";
import { useTick } from "@pixi/react";
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
    useCallback((ticker) => {
      setAnimationTime((prev) => prev + ticker.deltaTime * 0.016); // Convert to seconds
    }, [])
  );

  return (
    <PlayerVisuals
      playerState={playerState}
      opponentPosition={opponentPosition}
      animationTime={animationTime}
    />
  );
}
