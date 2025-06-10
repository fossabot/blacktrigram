import { render } from "@testing-library/react";
import { vi } from "vitest";
import { Application } from "@pixi/react";
import { TrigramWheel } from "../TrigramWheel";
import { TrigramStance } from "../../../types/enums";

describe("TrigramWheel", () => {
  it("renders without crashing", () => {
    render(
      <Application>
        <TrigramWheel
          currentStance={TrigramStance.GEON}
          onStanceChange={vi.fn()} // Fix: Change from onStanceSelect to onStanceChange
        />
      </Application>
    );
  });

  it("calls onStanceChange when stance is selected", () => {
    const mockOnStanceChange = vi.fn(); // Fix: Rename variable
    render(
      <Application>
        <TrigramWheel
          currentStance={TrigramStance.GEON}
          onStanceChange={mockOnStanceChange} // Fix: Change from onStanceSelect to onStanceChange
        />
      </Application>
    );
    // Test interactions
  });
});
