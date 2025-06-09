import { render } from "@testing-library/react"; // Remove unused React import
import "@testing-library/jest-dom";
import { Stage } from "@pixi/react";
import { vi } from "vitest";
import { EndScreen } from "../EndScreen";
import { ProgressTracker } from "../ProgressTracker";
import { TrigramWheel } from "../TrigramWheel";
import type { MatchStatistics } from "../../../types";
import { createPlayerState } from "../../../utils/playerUtils";
import { PlayerArchetype, TrigramStance } from "../../../types/enums";

const mockMatchStatistics: MatchStatistics = {
  roundsWon: { player1: 2, player2: 1 },
  totalDamageDealt: { player1: 150, player2: 120 },
  techniquesUsed: { player1: 8, player2: 6 },
  vitalPointsHit: { player1: 3, player2: 2 },
};

describe("UI Components", () => {
  it("renders EndScreen", () => {
    const player1 = createPlayerState(
      "player1",
      { korean: "플레이어1", english: "Player 1" }, // Fix: Use KoreanText object
      PlayerArchetype.MUSA,
      TrigramStance.GEON,
      { x: 100, y: 300 } // Add missing position parameter
    );

    render(
      <Stage>
        <EndScreen
          winner={player1}
          matchStatistics={mockMatchStatistics}
          onReturnToMenu={vi.fn()}
          onRestart={vi.fn()}
        />
      </Stage>
    );
  });

  it("renders ProgressTracker", () => {
    render(
      <Stage>
        <ProgressTracker currentValue={60} maxValue={100} x={0} y={0} />
      </Stage>
    );
  });

  it("renders TrigramWheel", () => {
    render(
      <Stage>
        <TrigramWheel
          currentStance={TrigramStance.GEON}
          onStanceChange={vi.fn()}
        />
      </Stage>
    );
  });
});
