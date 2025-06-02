import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { KoreanHeader } from "../KoreanHeader";
import { ProgressTracker } from "../ProgressTracker";
import { TrigramWheel } from "../TrigramWheel";

// Mock PIXI React components
vi.mock("@pixi/react", () => ({
  Container: ({ children, ...props }: any) => (
    <div data-testid="pixi-container" {...props}>
      {children}
    </div>
  ),
  Graphics: ({ children, ...props }: any) => (
    <div data-testid="pixi-graphics" {...props}>
      {children}
    </div>
  ),
  Text: ({ text, children, ...props }: any) => (
    <div data-testid="pixi-text" {...props}>
      {text || children}
    </div>
  ),
}));

describe("UI Components", () => {
  describe("KoreanHeader", () => {
    it("renders Korean title correctly", () => {
      const { getByText } = render(
        <KoreanHeader
          title="흑괘 무술 도장"
          subtitle="Black Trigram Dojang"
          level={1}
        />
      );

      expect(getByText("흑괘 무술 도장")).toBeInTheDocument();
      expect(getByText("Black Trigram Dojang")).toBeInTheDocument();
    });

    it("renders with string title", () => {
      const { getByText } = render(
        <KoreanHeader title="Test Title" level={2} />
      );

      expect(getByText("Test Title")).toBeInTheDocument();
    });
  });

  describe("ProgressTracker", () => {
    it("renders progress bar correctly", () => {
      const { getByText } = render(
        <ProgressTracker
          label="Health"
          value={75}
          maxValue={100}
          showText={true}
        />
      );

      expect(getByText("Health: 75/100 (75%)")).toBeInTheDocument();
    });

    it("handles max prop for compatibility", () => {
      const { getByText } = render(
        <ProgressTracker
          label="Ki"
          value={50}
          maxValue={100}
          max={100}
          showText={true}
        />
      );

      expect(getByText("Ki: 50/100 (50%)")).toBeInTheDocument();
    });
  });

  describe("TrigramWheel", () => {
    it("renders trigram wheel", () => {
      const mockOnStanceChange = vi.fn();

      const { getByTestId } = render(
        <TrigramWheel
          size={200}
          position={{ x: 0, y: 0 }}
          interactive={true}
          selectedStance="geon"
          onStanceChange={mockOnStanceChange}
        />
      );

      expect(getByTestId("pixi-container")).toBeInTheDocument();
    });
  });
});
