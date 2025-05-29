import { useState, useCallback } from "react";
import { useTick, type Ticker } from "@pixi/react";
import type { PlayerState, Position, TrigramStance } from "../../types";
import { PlayerVisuals } from "./PlayerVisuals";

export interface PlayerProps {
  readonly playerState: PlayerState;
  readonly opponentPosition: Position;
  readonly onStateChange?: (newState: Partial<PlayerState>) => void;
}

export function Player({
  playerState,
  opponentPosition,
}: PlayerProps): React.JSX.Element {
  const [animationTime, setAnimationTime] = useState<number>(0);

  const tickerCallback = useCallback((ticker: Ticker) => {
    setAnimationTime((prev) => prev + ticker.deltaTime);
  }, []);

  useTick(tickerCallback);

  return (
    <PlayerVisuals
      playerState={playerState}
      opponentPosition={opponentPosition}
      animationTime={animationTime}
    />
  );
}
