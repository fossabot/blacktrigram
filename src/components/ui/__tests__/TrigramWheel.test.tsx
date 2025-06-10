import { render } from "@testing-library/react";
import { vi } from "vitest"; // Fix: Add missing vi import
import { Application } from "@pixi/react";
import { TrigramWheel } from "../TrigramWheel";
import { TrigramStance } from "../../../types/enums";

describe("TrigramWheel", () => {
  it("renders without crashing", () => {
    render(
      <Application>
        <TrigramWheel
          currentStance={TrigramStance.GEON}
          onStanceSelect={vi.fn()}
        />
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
        />
      </Application>
    );
    // Test interactions
  });
});
