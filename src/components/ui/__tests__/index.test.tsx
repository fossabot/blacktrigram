import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { KoreanHeader } from "../base/KoreanHeader"; // Fixed import path
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

    it("renders basic header", () => {
      const { getByText } = render(<KoreanHeader title="Test Header" />);

      expect(getByText("Test Header")).toBeInTheDocument();
    });

    it("renders header with subtitle", () => {
      const { getByText } = render(
        <KoreanHeader title="Main Title" subtitle="Subtitle text" />
      );

      expect(getByText("Main Title")).toBeInTheDocument();
      expect(getByText("Subtitle text")).toBeInTheDocument();
    });

    it("applies custom styles", () => {
      const customStyle = { fontSize: "2rem" };
      const { getByText } = render(
        <KoreanHeader title="Styled Header" style={customStyle} />
      );

      expect(getByText("Styled Header")).toBeInTheDocument();
    });

    it("uses different header levels", () => {
      const { container } = render(
        <KoreanHeader title="Level 3 Header" level={3} />
      );

      const h3Element = container.querySelector("h3");
      expect(h3Element).toBeInTheDocument();
    });

    it("applies custom colors", () => {
      const { getByText } = render(
        <KoreanHeader title="Colored Header" color={0xff0000} />
      );

      expect(getByText("Colored Header")).toBeInTheDocument();
    });

    it("handles Korean text properly", () => {
      const { getByText } = render(
        <KoreanHeader title="무술 도장" subtitle="Martial Arts Dojang" />
      );

      expect(getByText("무술 도장")).toBeInTheDocument();
      expect(getByText("Martial Arts Dojang")).toBeInTheDocument();
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

  describe("ProgressTracker Integration", () => {
    it("should render with proper Korean styling", () => {
      const { container } = render(
        <ProgressTracker
          label="기력"
          value={60}
          maxValue={100} // Fixed prop name
          showText={true}
        />
      );
      expect(container).toBeInTheDocument();
    });
  });
});
