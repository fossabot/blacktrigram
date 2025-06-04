import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgressTracker } from "../ProgressTracker";

// Mock PIXI components
vi.mock("@pixi/react", () => ({
  Application: ({ children, ...props }: any) => (
    <div data-testid="pixi-application" {...props}>
      {children}
    </div>
  ),
  extend: vi.fn(),
  useApplication: vi.fn(() => ({ app: {} })),
}));

// Mock PIXI elements as globals
(global as any).pixiContainer = ({ children, ...props }: any) => (
  <div data-testid="pixi-container" {...props}>
    {children}
  </div>
);
(global as any).pixiGraphics = ({ draw, ...props }: any) => {
  if (draw) {
    const mockGraphics = {
      clear: vi.fn(),
      setFillStyle: vi.fn(),
      setStrokeStyle: vi.fn(),
      circle: vi.fn(),
      rect: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
    };
    draw(mockGraphics);
  }
  return <div data-testid="pixi-graphics" {...props} />;
};
(global as any).pixiText = ({ text, children, ...props }: any) => (
  <div data-testid="pixi-text" {...props}>
    {text || children}
  </div>
);

describe("ProgressTracker", () => {
  const defaultProps = {
    label: "Health",
    value: 75,
    maxValue: 100,
  };

  it("renders without crashing", () => {
    const { container } = render(<ProgressTracker {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it("handles zero values", () => {
    const zeroProps = {
      label: "Empty",
      value: 0,
      maxValue: 100,
    };
    const { container } = render(<ProgressTracker {...zeroProps} />);
    expect(container).toBeInTheDocument();
  });

  it("renders with Korean label", () => {
    render(
      <ProgressTracker label="체력" value={80} maxValue={100} showText={true} />
    );

    expect(screen.getByTestId("pixi-text")).toBeInTheDocument();
  });

  it("calculates percentage correctly", () => {
    render(
      <ProgressTracker
        label="스태미나"
        value={25}
        maxValue={50}
        showText={true}
      />
    );

    expect(screen.getByTestId("pixi-text")).toBeInTheDocument();
  });

  it("handles zero max value safely", () => {
    render(
      <ProgressTracker label="테스트" value={10} maxValue={0} showText={true} />
    );

    expect(screen.getByTestId("pixi-text")).toBeInTheDocument();
  });

  it("renders with custom text display", () => {
    const { getByTestId } = render(
      <ProgressTracker
        label="Ki Energy"
        value={60}
        maxValue={100}
        showText={true}
      />
    );

    expect(getByTestId("pixi-text")).toBeInTheDocument();
  });

  it("supports custom width and height", () => {
    const { container } = render(
      <ProgressTracker
        label="기력"
        value={60}
        maxValue={100}
        width={300}
        height={30}
        showText={true}
      />
    );

    expect(container).toBeInTheDocument();
  });

  it("handles maximum value properly", () => {
    const { container } = render(
      <ProgressTracker
        label="Full Health"
        value={100}
        maxValue={100}
        showText={true}
      />
    );

    expect(container).toBeInTheDocument();
  });
});
