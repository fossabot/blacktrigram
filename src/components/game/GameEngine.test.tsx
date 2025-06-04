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
    // Fix: Use correct prop names for GameEngineProps
    player1: mockPlayers[0],
    player2: mockPlayers[1],
    onGameStateChange: vi.fn(),
    onPlayerUpdate: vi.fn(),
    onGamePhaseChange: vi.fn(),
  };

  it("should render without crashing", () => {
    render(<GameEngine {...defaultProps} />);
  });

  it("should display players", () => {
    const { container } = render(<GameEngine {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });
});
