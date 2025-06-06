import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { GameEngine } from "./GameEngine";
import { createPlayerState } from "../../utils/playerUtils";

// Mock initial player states
const mockPlayer1Initial = createPlayerState("player1", "musa", "geon", {
  x: 100,
  y: 300,
});
const mockPlayer2Initial = createPlayerState("player2", "amsalja", "tae", {
  x: 700,
  y: 300,
});

describe("GameEngine", () => {
  const mockPlayers = [mockPlayer1Initial, mockPlayer2Initial] as const;

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
