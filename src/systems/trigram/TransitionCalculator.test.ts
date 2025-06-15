import { describe, it, expect } from "vitest";
import { TransitionCalculator } from "./TransitionCalculator";

describe("TransitionCalculator", () => {
  it("should export a TransitionCalculator class", () => {
    expect(typeof TransitionCalculator).toBe("function");
  });
});
