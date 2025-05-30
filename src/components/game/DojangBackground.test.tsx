import { describe, it, expect } from "vitest";
import { renderInStage } from "../../../test/test-utils";
import {
  DojangBackground,
  type DojangBackgroundProps,
} from "./DojangBackground";

// Mock KOREAN_COLORS if needed
// vi.mock('../../types', () => ({ KOREAN_COLORS: { /* ...mocked colors... */ } }));

describe("DojangBackground", () => {
  const defaultProps: DojangBackgroundProps = {
    variant: "traditional", // Add required prop
    lighting: "day", // Add required prop
    setting: "traditional",
    timeOfDay: "day",
  };

  it("renders without crashing with default props", () => {
    expect(() =>
      renderInStage(<DojangBackground {...defaultProps} />)
    ).not.toThrow();
  });

  it("should handle different settings", () => {
    const settings = ["dojang", "mountain", "temple"];
    settings.forEach((setting) => {
      renderInStage(
        <DojangBackground
          {...defaultProps}
          setting={setting || "traditional"} // Ensure string type
        />
      );
      expect(true).toBe(true);
    });
  });

  it("should handle different times of day", () => {
    const times = ["day", "night", "dawn", "evening"];
    times.forEach((time) => {
      renderInStage(
        <DojangBackground
          {...defaultProps}
          timeOfDay={time || "day"} // Ensure string type
        />
      );
      expect(true).toBe(true);
    });
  });

  // Fix all test cases to include required props
  it("should render with minimal props", () => {
    renderInStage(
      <DojangBackground
        variant="traditional"
        lighting="day"
        setting="dojang"
        timeOfDay="day"
      />
    );
  });
});
