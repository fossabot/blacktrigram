import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgressTracker } from "../ProgressTracker";

// Mock PIXI components
vi.mock("@pixi/react", () => ({
  Text: ({ text, ...props }: any) => (
    <div data-testid="pixi-text" {...props}>
      {text}
    </div>
  ),
}));

describe("ProgressTracker", () => {
  const defaultProps = {
    label: "Health",
    value: 75,
    maxValue: 100,
  };

  it("renders without crashing", () => {
    render(<ProgressTracker {...defaultProps} />);
  });

  it("handles zero values", () => {
    const zeroProps = {
      label: "Empty",
      value: 0,
      maxValue: 100,
    };
    render(<ProgressTracker {...zeroProps} />);
  });

  it("supports max property for compatibility", () => {
    const compatProps = {
      label: "Health",
      value: 50,
      max: 100,
    };
    render(<ProgressTracker {...compatProps} />);
  });

  it("renders with Korean label", () => {
    render(
      <ProgressTracker label="체력" value={80} maxValue={100} showText={true} />
    );

    expect(screen.getByTestId("pixi-text")).toBeInTheDocument();
    expect(screen.getByText(/체력.*80.*100.*80%/)).toBeInTheDocument();
  });

  it("handles maxValue vs max prop compatibility", () => {
    render(
      <ProgressTracker label="기력" value={60} max={100} showText={true} />
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

    expect(screen.getByText(/50%/)).toBeInTheDocument();
  });

  it("handles zero max value safely", () => {
    render(
      <ProgressTracker label="테스트" value={10} maxValue={0} showText={true} />
    );

    expect(screen.getByTestId("pixi-text")).toBeInTheDocument();
  });

  it("renders basic progress tracker", () => {
    const { getByTestId } = render(
      <ProgressTracker label="Health" value={80} maxValue={100} />
    );

    expect(getByTestId("pixi-text")).toBeInTheDocument();
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
});
