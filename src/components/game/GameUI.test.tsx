import { render } from "@testing-library/react";
import { GameUI } from "./GameUI"; // Fix: Use relative path
import { Stage } from "@pixi/react";

describe("GameUI", () => {
  it("renders correctly with game state", () => {
    const mockGameState = {
      currentPhase: "combat",
      timeRemaining: 180,
      round: 1,
      score: { player1: 0, player2: 0 },
    };

    render(
      <Stage>
        <GameUI
          gameState={mockGameState}
          onStateChange={(newState) => console.log("State changed:", newState)}
        />
      </Stage>
    );
  });

  it("renders correctly without game state", () => {
    render(
      <Stage>
        <GameUI
          onStateChange={(newState) => console.log("State changed:", newState)}
        />
      </Stage>
    );
  });

  it("handles state changes properly", () => {
    let capturedState: any = null;
    const mockGameState = { phase: "training" };

    render(
      <Stage>
        <GameUI
          gameState={mockGameState}
          onStateChange={(newState) => {
            capturedState = newState;
          }}
        />
      </Stage>
    );

    // State should be handled in useEffect
    expect(capturedState).toBeNull(); // No immediate state change
  });
});
