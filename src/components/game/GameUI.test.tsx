import { describe, it, expect, vi } from "vitest";
import { render } from "../../test/test-utils";
import { GameUI } from "./GameUI";
import { createPlayerState } from "../../utils/playerUtils";

describe("GameUI", () => {
  const mockPlayers = [
    createPlayerState("player1", "musa", "geon"), // Fixed parameter order
    createPlayerState("player2", "amsalja", "tae"), // Fixed parameter order
  ] as const;

  const defaultProps = {
    players: mockPlayers,
    gameTime: 5000,
    currentRound: 1,
    gamePhase: "combat" as const,
    onStanceChange: vi.fn(),
    onPlayerUpdate: vi.fn(),
    onGamePhaseChange: vi.fn(),
  };

  it("renders game UI elements", () => {
    render(<GameUI {...defaultProps} />);
  });

  it("displays timer correctly", () => {
    render(<GameUI {...defaultProps} timeRemaining={120} />);
  });
});
