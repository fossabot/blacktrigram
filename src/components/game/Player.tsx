import { PixiContainerComponent } from "../ui/base/PixiComponents";
import { PlayerVisuals } from "./PlayerVisuals";
import type { PlayerState } from "../../types";

export interface PlayerProps {
  readonly playerState: PlayerState;
  readonly isPlayer1: boolean;
  readonly onAttack: (position: { x: number; y: number }) => void;
}

export function Player({
  playerState,
  isPlayer1,
  onAttack,
}: PlayerProps): React.ReactElement {
  return (
    <PixiContainerComponent
      x={playerState.position.x}
      y={playerState.position.y}
      interactive={true}
      onClick={() => {
        // Execute attack without damage calculation (handled in GameEngine)
        onAttack(playerState.position);
      }}
    >
      {/* Delegate all visual rendering to PlayerVisuals */}
      <PlayerVisuals playerState={playerState} isPlayer1={isPlayer1} />
    </PixiContainerComponent>
  );
}
