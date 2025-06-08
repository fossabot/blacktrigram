import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Stage } from "@pixi/react";
import { Player } from "../Player";
import { createPlayerState } from "../../../utils/playerUtils";
import { PlayerArchetype } from "../../../types/enums";
import type { PlayerState } from "../../../types";

const mockPlayer1InitialState: PlayerState = createPlayerState(
  "Player 1",
  PlayerArchetype.MUSA,
  { korean: "플레이어 1", english: "Player 1" },
  { x: 100, y: 300 }
);

describe("Player Component", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <Stage>
        <Player playerState={mockPlayer1InitialState} />
      </Stage>
    );
    expect(container).toBeInTheDocument();
  });

  it("displays player name", () => {
    const { getByText } = render(
      <Stage>
        <Player playerState={mockPlayer1InitialState} />
      </Stage>
    );
    expect(
      getByText(mockPlayer1InitialState.name.korean, { exact: false })
    ).toBeInTheDocument();
  });

  it("displays player health", () => {
    const { getByText } = render(
      <Stage>
        <Player playerState={mockPlayer1InitialState} />
      </Stage>
    );
    expect(
      getByText(
        `체력: ${mockPlayer1InitialState.health}/${mockPlayer1InitialState.maxHealth}`
      )
    ).toBeInTheDocument();
  });
});
