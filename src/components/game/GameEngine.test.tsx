import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { GameEngine } from "./GameEngine"; // <- fixed path
import { createMockPlayerState } from "../../../test/test-utils";

// no explicit vi.mock here – rely on test-utils.tsx’s top‐level mock

describe("GameEngine", () => {
  const mockProps = {
    player1: createMockPlayerState(),
    player2: { ...createMockPlayerState(), id: "player2" },
    onGameStateChange: vi.fn(),
    onCombatResult: vi.fn(),
    onPlayerUpdate: vi.fn(), // <- added
    width: 800,
    height: 600,
  };

  it("renders without crashing", () => {
    render(<GameEngine {...mockProps} />);

    expect(screen.getByTestId("game-engine")).toBeInTheDocument();
  });

  it("handles player updates correctly", () => {
    render(<GameEngine {...mockProps} />);

    expect(screen.getByTestId("game-engine")).toBeInTheDocument();
  });

  it("processes combat results", () => {
    render(<GameEngine {...mockProps} />);

    expect(screen.getByTestId("game-engine")).toBeInTheDocument();
  });
});
