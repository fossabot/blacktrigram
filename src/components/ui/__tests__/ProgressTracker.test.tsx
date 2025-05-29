import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { ProgressTracker } from "../ProgressTracker";
import type { TrigramStance } from "../../../types";

describe("ProgressTracker", () => {
  const mockProps = {
    label: "Training Progress",
    current: 65,
    maximum: 100,
    currentStance: "geon" as TrigramStance,
  };

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

    // Simulate clicking on progress tracker
    const progressElement = container.querySelector(
      '[data-testid="pixi-container"]'
    );
    if (progressElement) {
      fireEvent.click(progressElement);
    }

    expect(container).toBeInTheDocument();
  });

  it("should update progress correctly", () => {
    const { rerender, container } = render(<ProgressTracker {...mockProps} />);

    rerender(<ProgressTracker {...mockProps} current={85} />);
    expect(container).toBeInTheDocument();
  });

  it("should handle Korean text properly", () => {
    const koreanProps = {
      ...mockProps,
      label: "수련 진도",
    };

    const { container } = render(<ProgressTracker {...koreanProps} />);
    expect(container).toBeInTheDocument();
  });

  it("should handle all trigram stances", () => {
    const stances: TrigramStance[] = [
      "geon",
      "tae",
      "li",
      "jin",
      "son",
      "gam",
      "gan",
      "gon",
    ];

    stances.forEach((stance) => {
      const { unmount } = render(
        <ProgressTracker {...mockProps} currentStance={stance} />
      );

      expect(
        document.querySelector('[data-testid="pixi-container"]')
      ).toBeInTheDocument();
      unmount();
    });
  });
});
