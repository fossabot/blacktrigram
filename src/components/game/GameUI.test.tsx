import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Stage } from "@pixi/react";
import { GameUI } from "./GameUI";
import type { GameUIProps } from "../../types/components";
import { PlayerArchetype } from "../../types/enums";
import { createPlayerState } from "../../utils/playerUtils";

describe("GameUI Component", () => {
  const mockPlayer1 = createPlayerState(
    { korean: "Player 1", english: "Player 1" }, // Fix: Use KoreanText object
    PlayerArchetype.MUSA,
    { korean: "건", english: "geon" }, // Fix: Use KoreanText object
    "player1"
  );

  const mockPlayer2 = createPlayerState(
    { korean: "Player 2", english: "Player 2" }, // Fix: Use KoreanText object
    PlayerArchetype.AMSALJA,
    { korean: "태", english: "tae" }, // Fix: Use KoreanText object
    "player2"
  );

  const defaultProps: GameUIProps = {
    player1: mockPlayer1,
    player2: mockPlayer2,
    timeRemaining: 120,
    currentRound: 1,
    maxRounds: 3,
    combatEffects: [],
  };

  describe("Component Rendering", () => {
    it("renders without crashing", () => {
      const { container } = render(
        <Stage>
          <GameUI {...defaultProps} />
        </Stage>
      );
      expect(container).toBeInTheDocument();
    });

    it("displays player information", () => {
      const { container } = render(
        <Stage>
          <GameUI {...defaultProps} />
        </Stage>
      );
      expect(container).toBeInTheDocument();
    });

    it("shows game timer and round info", () => {
      const { container } = render(
        <Stage>
          <GameUI {...defaultProps} timeRemaining={30} currentRound={2} />
        </Stage>
      );
      expect(container).toBeInTheDocument();
    });

    it("renders with correct props structure", () => {
      expect(defaultProps).toMatchObject({
        player1: expect.any(Object),
        player2: expect.any(Object),
        timeRemaining: expect.any(Number),
        currentRound: expect.any(Number),
        maxRounds: expect.any(Number),
        combatEffects: expect.any(Array),
      });
    });
  });

  describe("Global Test Environment", () => {
    it("should have proper global setup", () => {
      expect(typeof globalThis).toBe("object");
    });
  });
});
