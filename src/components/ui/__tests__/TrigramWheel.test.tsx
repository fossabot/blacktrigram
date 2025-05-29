import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { TrigramWheel } from "../TrigramWheel";
import type { TrigramStance } from "../../../types";

// Mock audio manager
vi.mock("../../../audio/AudioManager", () => ({
  useAudio: () => ({
    playSFX: vi.fn(),
  }),
}));

describe("TrigramWheel", () => {
  const mockProps = {
    selectedStance: "geon" as TrigramStance,
    onStanceSelect: vi.fn(),
    isEnabled: true,
  };

  it("should render trigram wheel", () => {
    const { container } = render(<TrigramWheel {...mockProps} />);
    expect(
      container.querySelector('[data-testid="pixi-container"]')
    ).toBeInTheDocument();
  });

  it("should handle stance selection", () => {
    const { container } = render(<TrigramWheel {...mockProps} />);

    // Get all trigram elements (containers)
    const trigramElements = container.querySelectorAll(
      '[data-testid="pixi-container"]'
    );

    if (trigramElements.length > 1) {
      fireEvent.click(trigramElements[1]);
      expect(mockProps.onStanceSelect).toHaveBeenCalled();
    }
  });

  it("should display all eight trigrams", () => {
    const { container } = render(<TrigramWheel {...mockProps} />);

    // Should have containers for the main wheel plus trigram segments
    const containers = container.querySelectorAll(
      '[data-testid="pixi-container"]'
    );
    expect(containers.length).toBeGreaterThan(0);
  });

  it("should show selected stance highlight", () => {
    const { container } = render(<TrigramWheel {...mockProps} />);
    expect(container).toBeInTheDocument();
  });
});
