import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { TrainingScreen } from "../TrainingScreen";
import type { TrainingScreenProps } from "../../../types";
import { createPlayerState } from "../../../utils/playerUtils";

describe("TrainingScreen", () => {
  const defaultProps: TrainingScreenProps = {
    players: [
      createPlayerState("Player1", { x: 100, y: 200 }, "geon"),
      createPlayerState("Player2", { x: 300, y: 200 }, "li"),
    ],
    onGamePhaseChange: vi.fn(),
    onPlayerUpdate: vi.fn(),
    onStanceChange: vi.fn(),
    selectedStance: "geon",
    gameTime: 0,
    currentRound: 1,
  };

  it("renders without crashing", () => {
    render(<TrainingScreen {...defaultProps} />);
  });

  it("displays Korean and English text", () => {
    const { getByText } = render(<TrainingScreen {...defaultProps} />);
    expect(getByText(/무술 수련/)).toBeInTheDocument();
    expect(getByText(/Martial Training/)).toBeInTheDocument();
  });
});
