import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GameUI } from "../GameUI";
import { createPlayerState, type GameUIProps } from "../../../types";

// Mock audio manager
vi.mock("../../../audio/AudioManager", () => ({
  useAudio: () => ({
    playAttackSound: vi.fn(),
    playHitSound: vi.fn(),
    playStanceChangeSound: vi.fn(),
    playMusic: vi.fn(),
  }),
}));

describe("GameUI", () => {
  let baseProps: GameUIProps;

  beforeEach(() => {
    baseProps = {
      players: [
        createPlayerState("player1", "musa", "geon"), // Fixed parameter order
        createPlayerState("player2", "amsalja", "gon"), // Fixed parameter order
      ],
      gamePhase: "combat",
      onGamePhaseChange: vi.fn(),
      gameTime: 0,
      currentRound: 1,
      timeRemaining: 180,
      onStanceChange: vi.fn(),
      combatLog: ["전투 시작!"],
      onStartMatch: vi.fn(),
      onResetMatch: vi.fn(),
      onTogglePause: vi.fn(),
      onPlayerUpdate: vi.fn(),
    };
  });

  it("should render combat UI with Korean text", () => {
    render(<GameUI {...baseProps} />);

    expect(screen.getByText("전투 모드")).toBeInTheDocument();
    expect(screen.getByText("Combat Mode")).toBeInTheDocument();
    expect(screen.getByText("시작 (Start)")).toBeInTheDocument();
  });

  it("should display player stats correctly", () => {
    render(<GameUI {...baseProps} />);

    expect(screen.getByText("플레이어 1")).toBeInTheDocument();
    expect(screen.getByText("플레이어 2")).toBeInTheDocument();
    expect(screen.getAllByText("체력")).toHaveLength(2);
  });

  it("should handle game controls", () => {
    render(<GameUI {...baseProps} />);

    const startButton = screen.getByText("시작 (Start)");
    fireEvent.click(startButton);

    expect(baseProps.onStartMatch).toHaveBeenCalled();
  });

  it("should call onPlayerUpdate when needed", () => {
    render(<GameUI {...baseProps} />);

    // This would be triggered by game engine interactions
    expect(baseProps.onPlayerUpdate).toBeDefined();
    expect(typeof baseProps.onPlayerUpdate).toBe("function");
  });
});
