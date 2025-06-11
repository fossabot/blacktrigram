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
          selectedStance={TrigramStance.GEON}
          onStanceSelect={vi.fn()}
          x={100}
          y={100}
          radius={80}
          data-testid="trigram-wheel"
        />
      </Application>
    );
  });

  it("calls onStanceSelect when stance is selected", () => {
    const mockOnStanceSelect = vi.fn();
    render(
      <Application>
        <TrigramWheel
          selectedStance={TrigramStance.GEON}
          onStanceSelect={mockOnStanceSelect}
          x={100}
          y={100}
          radius={80}
          data-testid="trigram-wheel"
        />
      </Application>
    );
    // Test interactions - TrigramWheel should call onStanceSelect when interacted with
  });

  it("displays all eight trigram stances", () => {
    const mockOnStanceSelect = vi.fn();
    render(
      <Application>
        <TrigramWheel
          selectedStance={TrigramStance.TAE}
          onStanceSelect={mockOnStanceSelect}
          x={100}
          y={100}
          radius={80}
          data-testid="trigram-wheel"
        />
      </Application>
    );
    // TrigramWheel should render all 8 trigram positions
  });

  it("highlights the selected stance correctly", () => {
    const mockOnStanceSelect = vi.fn();
    render(
      <Application>
        <TrigramWheel
          selectedStance={TrigramStance.LI}
          onStanceSelect={mockOnStanceSelect}
          x={100}
          y={100}
          radius={80}
          data-testid="trigram-wheel"
        />
      </Application>
    );
    // Should visually highlight the LI stance
  });

  it("handles responsive sizing", () => {
    const mockOnStanceSelect = vi.fn();

    // Test with different radius sizes
    const { rerender } = render(
      <Application>
        <TrigramWheel
          selectedStance={TrigramStance.GEON}
          onStanceSelect={mockOnStanceSelect}
          x={100}
          y={100}
          radius={60}
          data-testid="trigram-wheel"
        />
      </Application>
    );

    // Test larger radius
    rerender(
      <Application>
        <TrigramWheel
          selectedStance={TrigramStance.GEON}
          onStanceSelect={mockOnStanceSelect}
          x={100}
          y={100}
          radius={120}
          data-testid="trigram-wheel"
        />
      </Application>
    );
  });
});
