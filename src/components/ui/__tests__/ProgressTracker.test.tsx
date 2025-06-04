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

// Mock PIXI elements as globals with proper text rendering and test IDs
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
      roundRect: vi.fn(),
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

    // Check for percentage text using legacy data-testid
    expect(screen.getByTestId("pixi-text")).toHaveTextContent("80%");
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

    // Check for calculated percentage (25/50 = 50%)
    expect(screen.getByTestId("pixi-text")).toHaveTextContent("50%");
  });

  it("handles zero max value safely", () => {
    render(
      <ProgressTracker label="테스트" value={10} maxValue={0} showText={true} />
    );

    // Should show 100% when maxValue is 0 (safety fallback)
    expect(screen.getByTestId("pixi-text")).toHaveTextContent("100%");
  });

  it("renders with custom text display", () => {
    render(
      <ProgressTracker
        label="Ki Energy"
        value={60}
        maxValue={100}
        showText={true}
      />
    );

    expect(screen.getByTestId("pixi-text")).toHaveTextContent("60%");
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
    expect(screen.getByTestId("pixi-text")).toHaveTextContent("60%");
  });

  it("handles maximum value properly", () => {
    render(
      <ProgressTracker
        label="Full Health"
        value={100}
        maxValue={100}
        showText={true}
      />
    );

    expect(screen.getByTestId("pixi-text")).toHaveTextContent("100%");
  });

  it("renders PIXI components correctly", () => {
    render(<ProgressTracker {...defaultProps} showText={true} />);

    expect(screen.getByTestId("pixi-container")).toBeInTheDocument();
    expect(screen.getByTestId("pixi-graphics")).toBeInTheDocument();
    expect(screen.getByTestId("pixi-text")).toBeInTheDocument();
  });

  it("supports showPercentage prop", () => {
    render(<ProgressTracker value={75} maxValue={100} showPercentage={true} />);

    expect(screen.getByTestId("pixi-text")).toHaveTextContent("75%");
  });
});
