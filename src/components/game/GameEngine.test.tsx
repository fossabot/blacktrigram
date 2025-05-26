import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GameEngine } from "./GameEngine";

// Mock PlayerContainer for isolation
vi.mock("./Player", () => ({
  PlayerContainer: (props: Record<string, unknown>) => (
    <div data-testid="player-container" {...props} />
  ),
}));

describe("GameEngine", () => {
  it("renders without crashing", () => {
    const { container } = render(<GameEngine />);
    expect(container).toBeTruthy();
  });

  it("renders both players", () => {
    const { getAllByTestId } = render(<GameEngine />);
    expect(getAllByTestId("player-container").length).toBe(2);
  });
});
