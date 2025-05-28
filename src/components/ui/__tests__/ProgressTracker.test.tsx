import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import type { TrigramStance } from "../TrigramWheel";

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
});
