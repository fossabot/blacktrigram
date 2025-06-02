import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ProgressTracker } from "../ProgressTracker";
import type { ProgressTrackerProps } from "../../../types/ui";

describe("ProgressTracker", () => {
  const defaultProps: ProgressTrackerProps = {
    label: "Health",
    value: 75,
    maxValue: 100,
  };

  it("renders without crashing", () => {
    render(<ProgressTracker {...defaultProps} />);
  });

  it("handles zero values", () => {
    const zeroProps: ProgressTrackerProps = {
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
    } as ProgressTrackerProps;
    render(<ProgressTracker {...compatProps} />);
  });
});
