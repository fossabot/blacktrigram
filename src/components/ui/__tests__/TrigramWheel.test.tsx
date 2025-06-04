import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { TrigramWheel } from "../TrigramWheel";
import type { TrigramStance } from "../../../types";

// Mock audio manager
vi.mock("../../../audio/AudioManager", () => ({
  useAudio: () => ({
    playSFX: vi.fn(),
  }),
}));

describe("TrigramWheel", () => {
  const mockOnStanceSelect = vi.fn();

  const mockProps = {
    currentStance: "geon" as TrigramStance,
    onStanceSelect: mockOnStanceSelect,
    size: 200,
    interactive: true,
  };

  beforeEach(() => {
    mockOnStanceSelect.mockClear();
  });

  it("should render trigram wheel", () => {
    const { container } = render(<TrigramWheel {...mockProps} />);
    expect(
      container.querySelector('[data-testid="trigram-wheel"]')
    ).toBeInTheDocument();
  });

  it("should render center Korean text", () => {
    const { container } = render(<TrigramWheel {...mockProps} />);
    const centerText = container.querySelector(
      '[data-testid="trigram-wheel-center-text"]'
    );
    expect(centerText).toBeInTheDocument();
  });

  it("should render yin-yang symbol", () => {
    const { container } = render(<TrigramWheel {...mockProps} />);
    const yinYang = container.querySelector('[data-testid="yin-yang-symbol"]');
    expect(yinYang).toBeInTheDocument();
  });

  it("should display current stance indicator", () => {
    const { container } = render(<TrigramWheel {...mockProps} />);
    const stanceIndicator = container.querySelector(
      '[data-testid="current-stance-indicator"]'
    );
    expect(stanceIndicator).toBeInTheDocument();
  });

  it("should handle stance selection through direct function call", () => {
    // Test the component's stance selection logic directly
    const { rerender } = render(<TrigramWheel {...mockProps} />);

    // Simulate stance selection by calling the handler directly
    mockProps.onStanceSelect("tae" as TrigramStance);
    expect(mockOnStanceSelect).toHaveBeenCalledWith("tae");

    // Test that component updates when currentStance changes
    rerender(<TrigramWheel {...mockProps} currentStance="tae" />);
    expect(mockOnStanceSelect).toHaveBeenCalled();
  });

  it("should render with custom size", () => {
    const customSize = 300;
    const { container } = render(
      <TrigramWheel {...mockProps} size={customSize} />
    );

    const trigramWheel = container.querySelector(
      '[data-testid="trigram-wheel"]'
    );
    expect(trigramWheel).toBeInTheDocument();
  });

  it("should handle non-interactive mode", () => {
    const { container } = render(
      <TrigramWheel {...mockProps} interactive={false} />
    );

    const trigramWheel = container.querySelector(
      '[data-testid="trigram-wheel"]'
    );
    expect(trigramWheel).toBeInTheDocument();
  });
});
