import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { TrainingScreen } from "../TrainingScreen";
import type { PlayerState } from "../../../types";
import { createPlayerState } from "../../../utils/playerUtils";

// Mock Korean text components
vi.mock("../../ui/base/korean-text/KoreanText", () => ({
  KoreanText: ({ korean, english }: any) => (
    <div data-testid="korean-text">
      <span className="korean-text__korean">{korean}</span>
      {english && <span className="korean-text__english">{english}</span>}
    </div>
  ),
}));

// Mock TrigramWheel
vi.mock("../../ui/TrigramWheel", () => ({
  TrigramWheel: ({ onStanceSelect }: any) => (
    <div data-testid="trigram-wheel">
      {["geon", "tae", "li", "jin", "son", "gam", "gan", "gon"].map(
        (stance) => (
          <div
            key={stance}
            data-testid={`trigram-${stance}`}
            onClick={() => onStanceSelect(stance)}
            style={{ cursor: "pointer" }}
          >
            <span data-testid={`trigram-symbol-${stance}`}>
              {stance === "geon"
                ? "☰"
                : stance === "tae"
                ? "☱"
                : stance === "li"
                ? "☲"
                : stance === "jin"
                ? "☳"
                : stance === "son"
                ? "☴"
                : stance === "gam"
                ? "☵"
                : stance === "gan"
                ? "☶"
                : "☷"}
            </span>
          </div>
        )
      )}
    </div>
  ),
}));

// Mock ProgressTracker
vi.mock("../../ui/ProgressTracker", () => ({
  ProgressTracker: ({ label, value, maxValue }: any) => (
    <div data-testid="progress-tracker">
      <span>{label}</span>
      <span>{Math.round((value / maxValue) * 100)}%</span>
    </div>
  ),
}));

describe("TrainingScreen", () => {
  let mockPlayers: [PlayerState, PlayerState];
  let mockProps: any;

  beforeEach(() => {
    mockPlayers = [
      createPlayerState("Player1", "musa", "geon"),
      createPlayerState("Player2", "amsalja", "tae"),
    ];

    mockProps = {
      players: mockPlayers,
      onPlayerUpdate: vi.fn(),
      onStanceChange: vi.fn(),
      gameTime: Date.now(),
      onReturnToMenu: vi.fn(),
      onStartCombat: vi.fn(),
    };
  });

  it("renders training screen with Korean header", () => {
    render(<TrainingScreen {...mockProps} />);

    expect(screen.getByTestId("training-screen")).toBeInTheDocument();
    expect(screen.getByText("흑괘 무술 수련")).toBeInTheDocument();
  });

  it("displays all eight trigram stances in basics mode", () => {
    render(<TrainingScreen {...mockProps} />);

    // Should be in basics mode by default, which shows the TrigramWheel
    expect(screen.getByTestId("trigram-wheel")).toBeInTheDocument();

    // Check for trigram symbols
    expect(screen.getByTestId("trigram-symbol-geon")).toHaveTextContent("☰");
    expect(screen.getByTestId("trigram-symbol-tae")).toHaveTextContent("☱");
    expect(screen.getByTestId("trigram-symbol-li")).toHaveTextContent("☲");
    expect(screen.getByTestId("trigram-symbol-jin")).toHaveTextContent("☳");
    expect(screen.getByTestId("trigram-symbol-son")).toHaveTextContent("☴");
    expect(screen.getByTestId("trigram-symbol-gam")).toHaveTextContent("☵");
    expect(screen.getByTestId("trigram-symbol-gan")).toHaveTextContent("☶");
    expect(screen.getByTestId("trigram-symbol-gon")).toHaveTextContent("☷");
  });

  it("handles stance selection", () => {
    render(<TrainingScreen {...mockProps} />);

    const taeElement = screen.getByTestId("trigram-tae");
    fireEvent.click(taeElement);

    expect(mockProps.onStanceChange).toHaveBeenCalledWith("tae");
  });

  it("shows selected stance information", () => {
    render(<TrainingScreen {...mockProps} />);

    expect(screen.getByText("선택된 팔괘")).toBeInTheDocument();
    expect(screen.getByText(/건/)).toBeInTheDocument(); // Geon selected by default
  });

  it("navigates back to menu", () => {
    render(<TrainingScreen {...mockProps} />);

    const menuButton = screen.getByText("메뉴로 돌아가기");
    fireEvent.click(menuButton);

    expect(mockProps.onReturnToMenu).toHaveBeenCalled();
  });

  it("displays technique information for current stance", () => {
    render(<TrainingScreen {...mockProps} />);

    // Check for technique descriptions in basics mode
    expect(screen.getByText("기법")).toBeInTheDocument();
    expect(screen.getByText(/기법:/)).toBeInTheDocument();
    expect(screen.getByText(/설명:/)).toBeInTheDocument();
    expect(screen.getByText(/데미지:/)).toBeInTheDocument();
  });

  it("switches between training modes", () => {
    render(<TrainingScreen {...mockProps} />);

    // Switch to techniques mode
    const techniquesButton = screen.getByText("기법");
    fireEvent.click(techniquesButton);

    // Should show technique training content
    expect(screen.getByText("기법 수련")).toBeInTheDocument();

    // Switch to philosophy mode
    const philosophyButton = screen.getByText("철학");
    fireEvent.click(philosophyButton);

    // Should show philosophy content
    expect(screen.getByText("무술 철학")).toBeInTheDocument();
  });

  it("handles technique execution", () => {
    render(<TrainingScreen {...mockProps} />);

    // Switch to techniques mode
    const techniquesButton = screen.getByText("기법");
    fireEvent.click(techniquesButton);

    // Find and click execute technique button
    const executeButton = screen.getByText("기법 실행");
    fireEvent.click(executeButton);

    expect(mockProps.onPlayerUpdate).toHaveBeenCalled();
  });

  it("handles player restoration", () => {
    render(<TrainingScreen {...mockProps} />);

    const restoreButton = screen.getByText("회복");
    fireEvent.click(restoreButton);

    expect(mockProps.onPlayerUpdate).toHaveBeenCalledWith(0, {
      health: mockPlayers[0].maxHealth,
      ki: mockPlayers[0].maxKi,
      stamina: mockPlayers[0].maxStamina,
    });
  });
});
