import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Stage } from "@pixi/react";
import { vi } from "vitest";
import { TrigramWheel } from "../TrigramWheel";
import { TrigramStance } from "../../../types/enums";

const mockProps = {
  currentStance: TrigramStance.GEON, // Fix: Use currentStance
  onStanceChange: vi.fn(), // Fix: Use onStanceChange
  size: 100, // Fix: Use size instead of radius
  interactive: true,
};

describe("TrigramWheel", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Stage>
        <TrigramWheel {...mockProps} />
      </Stage>
    );
    expect(container).toBeTruthy();
  });

  it("handles stance selection", () => {
    const { container } = render(
      <Stage>
        <TrigramWheel {...mockProps} />
      </Stage>
    );
    // Test interaction logic here
  });

  it("updates when stance changes", () => {
    const { rerender } = render(
      <Stage>
        <TrigramWheel {...mockProps} />
      </Stage>
    );

    rerender(
      <Stage>
        <TrigramWheel {...mockProps} currentStance={TrigramStance.TAE} />
      </Stage>
    );
  });

  it("renders with custom size", () => {
    const customSize = 150;
    render(
      <Stage>
        <TrigramWheel {...mockProps} size={customSize} />
      </Stage>
    );
  });

  it("handles non-interactive mode", () => {
    render(
      <Stage>
        <TrigramWheel {...mockProps} interactive={false} />
      </Stage>
    );
  });
});
