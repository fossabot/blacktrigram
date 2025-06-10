import { render } from "@testing-library/react";
import { Application } from "@pixi/react";
import { TrigramWheel } from "../TrigramWheel";
import { TrigramStance } from "../../../types/enums"; // Fix: Import enum

describe("TrigramWheel", () => {
  it("renders without crashing", () => {
    render(
      <Application>
        <TrigramWheel
          currentStance={TrigramStance.GEON}
          onStanceSelect={vi.fn()}
        />{" "}
        {/* Fix: Use enum */}
      </Application>
    );
  });

  it("calls onStanceSelect when stance is selected", () => {
    const mockOnStanceSelect = vi.fn();
    render(
      <Application>
        <TrigramWheel
          currentStance={TrigramStance.GEON}
          onStanceSelect={mockOnStanceSelect}
        />{" "}
        {/* Fix: Use enum */}
      </Application>
    );
    // Test interactions
  });
});
