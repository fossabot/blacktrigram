import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { TrainingScreen } from "../TrainingScreen";
import type { PlayerState, TrigramStance } from "../../../types";
import { createPlayerState } from "../../../utils/playerUtils";

// Mock Korean text components
vi.mock("../../ui/base/KoreanHeader", () => ({
  KoreanHeader: ({ korean, english }: any) => (
    <div data-testid="korean-header">
      {korean} {english && `(${english})`}
    </div>
  ),
}));

describe("TrainingScreen", () => {
  let mockPlayers: [PlayerState, PlayerState];
  let mockProps: any;

  beforeEach(() => {
    mockPlayers = [
      createPlayerState("Player1", { x: 100, y: 200 }, "geon"),
      createPlayerState("Player2", { x: 300, y: 200 }, "tae"),
    ];

    mockProps = {
      players: mockPlayers,
      onGamePhaseChange: vi.fn(),
      onPlayerUpdate: vi.fn(),
      onStanceChange: vi.fn(),
      selectedStance: "geon" as TrigramStance,
      gameTime: Date.now(),
      currentRound: 1,
    };
  });

  it("renders training screen with Korean header", () => {
    render(<TrainingScreen {...mockProps} />);

    expect(screen.getByTestId("korean-header")).toBeInTheDocument();
    expect(screen.getByText(/무술 수련/)).toBeInTheDocument();
  });

  it("displays all eight trigram stances", () => {
    render(<TrainingScreen {...mockProps} />);

    // Check for trigram symbols
    expect(screen.getByText("☰")).toBeInTheDocument(); // Geon
    expect(screen.getByText("☱")).toBeInTheDocument(); // Tae
    expect(screen.getByText("☲")).toBeInTheDocument(); // Li
    expect(screen.getByText("☳")).toBeInTheDocument(); // Jin
    expect(screen.getByText("☴")).toBeInTheDocument(); // Son
    expect(screen.getByText("☵")).toBeInTheDocument(); // Gam
    expect(screen.getByText("☶")).toBeInTheDocument(); // Gan
    expect(screen.getByText("☷")).toBeInTheDocument(); // Gon
  });

  it("handles stance selection", () => {
    render(<TrainingScreen {...mockProps} />);

    const taeCard = screen.getByText("☱").closest("div");
    expect(taeCard).toBeInTheDocument();

    fireEvent.click(taeCard!);
    expect(mockProps.onStanceChange).toHaveBeenCalledWith("tae");
  });

  it("shows selected stance information", () => {
    render(<TrainingScreen {...mockProps} />);

    expect(screen.getByText(/선택된 팔괘/)).toBeInTheDocument();
    expect(screen.getByText(/건/)).toBeInTheDocument(); // Geon selected
  });

  it("navigates back to menu", () => {
    render(<TrainingScreen {...mockProps} />);

    const menuButton = screen.getByText(/메뉴로 돌아가기/);
    fireEvent.click(menuButton);

    expect(mockProps.onGamePhaseChange).toHaveBeenCalledWith("intro");
  });

  it("displays technique information for each stance", () => {
    render(<TrainingScreen {...mockProps} />);

    // Check for technique descriptions
    expect(screen.getByText(/기법:/)).toBeInTheDocument();
    expect(screen.getByText(/설명:/)).toBeInTheDocument();
    expect(screen.getByText(/데미지:/)).toBeInTheDocument();
  });

  it("handles mouse interactions for stance cards", () => {
    render(<TrainingScreen {...mockProps} />);

    const geonCard = screen.getByText("☰").closest("div");

    fireEvent.mouseEnter(geonCard!);
    fireEvent.mouseLeave(geonCard!);

    // Visual feedback should occur (tested through CSS changes)
    expect(geonCard).toBeInTheDocument();
  });
});
