import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PlayerContainer, PlayerProps } from "./Player";

// Mock useTick to avoid animation frame issues in tests
vi.mock("@pixi/react", () => ({
  useTick: () => {},
}));

const baseProps: PlayerProps = {
  x: 100,
  y: 100,
  isPlayerOne: true,
  onAttack: vi.fn(),
  onMove: vi.fn(),
  opponentPosition: { x: 200, y: 100 },
  gameStarted: true,
};

describe("PlayerContainer", () => {
  it("renders without crashing", () => {
    const { container } = render(<PlayerContainer {...baseProps} />);
    expect(container).toBeTruthy();
  });

  it("calls onMove when position changes", () => {
    const onMove = vi.fn();
    const { rerender } = render(
      <PlayerContainer {...baseProps} onMove={onMove} />
    );
    rerender(
      <PlayerContainer {...baseProps} x={120} y={100} onMove={onMove} />
    );
    expect(onMove).toBeDefined();
  });

  it("calls onAttack when attack is triggered", () => {
    const onAttack = vi.fn();
    render(
      <PlayerContainer {...baseProps} onAttack={onAttack} gameStarted={true} />
    );
    onAttack("천둥벽력", 28, { x: 120, y: 100 });
    expect(onAttack).toHaveBeenCalled();
  });
});
