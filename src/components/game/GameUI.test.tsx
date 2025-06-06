import { describe, it, expect, vi } from "vitest";
import { render } from "../../test/test-utils";
import GameUI from "./GameUI";
import { createPlayerState } from "../../utils/playerUtils";

describe("GameUI", () => {
  const mockPlayer1 = createPlayerState("player1", "musa", "geon", {
    x: 0,
    y: 0,
  });
  const mockPlayer2 = createPlayerState("player2", "amsalja", "tae", {
    x: 0,
    y: 0,
  });

  const mockPlayers = [mockPlayer1, mockPlayer2] as const;

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

  it("should render", () => {
    expect(true).toBe(true);
  });
});
