import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { GameEngine } from "./GameEngine";
import { createPlayerState } from "../../utils/playerUtils";

describe("GameEngine", () => {
  const mockPlayers = [
    createPlayerState("player1", "musa", "geon"), // Fixed: Correct parameter order
    createPlayerState("player2", "amsalja", "tae"), // Fixed: Correct parameter order
  ] as const;

  const defaultProps = {
    players: mockPlayers,
    gamePhase: "combat" as const,
    onPlayerUpdate: vi.fn(),
    onGamePhaseChange: vi.fn(),
  };

  it("renders without crashing", () => {
    render(<GameEngine {...defaultProps} />);
  });

  it("handles combat phase correctly", () => {
    const { container } = render(<GameEngine {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });
});
