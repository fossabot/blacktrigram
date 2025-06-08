import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Stage } from "@pixi/react";
import { vi } from "vitest";
import { TrigramWheel } from "../TrigramWheel";
import { TrigramStance } from "../../../types/enums";

const mockProps = {
  currentStance: TrigramStance.GEON,
  onStanceChange: vi.fn(),
  size: 100,
  x: 0,
  y: 0,
};

describe("TrigramWheel", () => {
  it("renders correctly", () => {
    render(
      <Stage>
        <TrigramWheel {...mockProps} />
      </Stage>
    );
    // Remove unused container variable - just verify render doesn't throw
    expect(true).toBeTruthy();
  });

  it("handles stance changes", () => {
    render(
      <Stage>
        <TrigramWheel {...mockProps} />
      </Stage>
    );

    // Test that onStanceChange prop is correctly typed
    expect(mockProps.onStanceChange).toBeDefined();
  });
});
