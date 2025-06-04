import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { PlayerArchetype } from "../../../types";
import { IntroScreen } from "../IntroScreen";

// Mock PixiJS components by removing conflicting declarations
vi.mock("@pixi/react", () => ({
  Application: vi.fn(() => null),
  extend: vi.fn(),
  useExtend: vi.fn(),
  useApplication: vi.fn(() => ({ app: {} })),
  useTick: vi.fn(),
}));

describe("IntroScreen", () => {
  const mockOnStartTraining = vi.fn();
  const mockOnStartCombat = vi.fn();
  const mockOnArchetypeSelect = vi.fn();
  const defaultArchetype: PlayerArchetype = "musa";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  function renderIntroScreen() {
    render(
      <IntroScreen
        onStartTraining={mockOnStartTraining}
        onStartCombat={mockOnStartCombat}
        onArchetypeSelect={mockOnArchetypeSelect}
        selectedArchetype={defaultArchetype}
      />
    );
  }

  it("should render the main title correctly", () => {
    renderIntroScreen();

    expect(screen.getByText("흑괘 무술 도장")).toBeInTheDocument();
    expect(screen.getByText("Black Trigram Martial Arts")).toBeInTheDocument();
  });

  it("should render navigation buttons", () => {
    renderIntroScreen();

    expect(screen.getByText("메뉴 (Menu)")).toBeInTheDocument();
    expect(screen.getByText("조작법 (Controls)")).toBeInTheDocument();
    expect(screen.getByText("철학 (Philosophy)")).toBeInTheDocument();
  });

  it("should switch between sections correctly", () => {
    renderIntroScreen();

    // Click on Controls section
    fireEvent.click(screen.getByText("조작법 (Controls)"));
    expect(screen.getByText("조작법")).toBeInTheDocument();

    // Click on Philosophy section
    fireEvent.click(screen.getByText("철학 (Philosophy)"));
    expect(screen.getByText("팔괘 철학")).toBeInTheDocument();

    // Click back to Menu section
    fireEvent.click(screen.getByText("메뉴 (Menu)"));
    expect(screen.getByText("게임 모드 선택")).toBeInTheDocument();
  });

  it("should handle game phase changes from menu", () => {
    renderIntroScreen();

    // Should start in menu section by default
    const trainingButton = screen.getByText(/수련 모드/);
    fireEvent.click(trainingButton);

    expect(mockOnStartTraining).toHaveBeenCalled();
  });

  it("should show Korean martial arts terminology", () => {
    renderIntroScreen();

    // Switch to philosophy section
    fireEvent.click(screen.getByText("철학 (Philosophy)"));

    // Should show trigram symbols and Korean names
    expect(screen.getByText("☰")).toBeInTheDocument(); // Heaven trigram
    expect(screen.getByText(/건/)).toBeInTheDocument(); // Korean name for Heaven
  });
});
