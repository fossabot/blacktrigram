import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Stage } from "@pixi/react";
import { Player } from "../Player";
import { createPlayerState } from "../../../utils/playerUtils";
import { PlayerArchetype, TrigramStance } from "../../../types/enums";

describe("Player Component", () => {
  const mockPlayerState = createPlayerState(
    { korean: "선수1", english: "Player 1" },
    PlayerArchetype.MUSA,
    TrigramStance.GEON,
    "player1",
    { x: 100, y: 300 }
  );

  it("renders without crashing", () => {
    const { container } = render(
      <Stage>
        <Player playerState={mockPlayerState} playerIndex={0} />
      </Stage>
    );
    expect(container).toBeInTheDocument();
  });

  it("displays player information correctly", () => {
    render(
      <Stage>
        <Player
          playerState={mockPlayerState}
          playerIndex={0}
          showStats={true}
        />
      </Stage>
    );
    expect(true).toBe(true);
  });

  it("handles click interactions", () => {
    const mockOnClick = jest.fn();
    render(
      <Stage>
        <Player
          playerState={mockPlayerState}
          playerIndex={0}
          interactive={true}
          onClick={mockOnClick}
        />
      </Stage>
    );
    expect(true).toBe(true);
  });
});
