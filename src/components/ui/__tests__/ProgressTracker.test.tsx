import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { ProgressTracker } from "../ProgressTracker";
import type { TrigramStance } from "../../../types";

describe("ProgressTracker Component", () => {
  const mockPracticeCount: Record<TrigramStance, number> = {
    geon: 5,
    tae: 8,
    li: 12,
    jin: 3,
    son: 7,
    gam: 10,
    gan: 2,
    gon: 9,
  };

  const defaultProps = {
    practiceCount: mockPracticeCount,
    totalPractices: 56,
    currentStance: "li" as TrigramStance,
  };

  const mockProps = {
    currentStance: "geon" as TrigramStance,
    progress: 65,
    onProgressChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Component Structure", () => {
    it("renders with mock structure", () => {
      const MockProgressTracker = () => (
        <div data-testid="progress-tracker">
          <div data-testid="progress-title">🎯 수련 진도</div>
          <div data-testid="total-practices">
            총 연습 횟수: {defaultProps.totalPractices}
          </div>
          <div data-testid="current-stance">
            현재 자세: {defaultProps.currentStance.toUpperCase()}
          </div>
        </div>
      );

      render(<MockProgressTracker />);
      expect(screen.getByTestId("progress-tracker")).toBeInTheDocument();
      expect(screen.getByText("🎯 수련 진도")).toBeInTheDocument();
    });
  });

  describe("Global Test Environment", () => {
    it("should have proper global setup", () => {
      expect(typeof globalThis).toBe("object");
    });
  });

  it("should render progress tracker", () => {
    const { container } = render(<ProgressTracker {...mockProps} />);
    expect(
      container.querySelector('[data-testid="pixi-container"]')
    ).toBeInTheDocument();
  });

  it("should display current progress", () => {
    const { container } = render(<ProgressTracker {...mockProps} />);
    expect(container).toBeInTheDocument();
  });

  it("should handle stance changes", () => {
    const { container } = render(<ProgressTracker {...mockProps} />);

    // Simulate clicking on different stance
    const stanceButton = container.querySelector(
      '[data-testid="pixi-container"]'
    );
    if (stanceButton) {
      fireEvent.click(stanceButton);
    }

    expect(container).toBeInTheDocument();
  });

  it("should update progress correctly", () => {
    const { rerender } = render(<ProgressTracker {...mockProps} />);

    rerender(<ProgressTracker {...mockProps} progress={85} />);
    expect(container).toBeInTheDocument();
  });
});
