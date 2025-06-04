import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgressTracker } from "../ProgressTracker";
import { KOREAN_COLORS } from "../../../types/constants";

// Mock @pixi/react for Korean martial arts testing
vi.mock("@pixi/react", () => ({
  Container: vi.fn(({ children, ...props }) => {
    const React = require("react");
    return React.createElement(
      "div",
      { "data-testid": "pixi-container", ...props },
      children
    );
  }),
  Graphics: vi.fn(({ draw, ...props }) => {
    const React = require("react");
    if (draw) {
      const mockGraphics = {
        clear: vi.fn(),
        setFillStyle: vi.fn(),
        setStrokeStyle: vi.fn(),
        roundRect: vi.fn(),
        fill: vi.fn(),
        stroke: vi.fn(),
      };
      draw(mockGraphics);
    }
    return React.createElement("div", {
      "data-testid": "pixi-graphics",
      ...props,
    });
  }),
  Text: vi.fn(({ text, children, ...props }) => {
    const React = require("react");
    return React.createElement(
      "div",
      { "data-testid": "pixi-text", ...props },
      text || children
    );
  }),
}));

describe("ProgressTracker", () => {
  describe("Basic Rendering", () => {
    it("renders Korean martial arts progress tracker", () => {
      const { container } = render(
        <ProgressTracker
          value={80}
          maxValue={100}
          label="체력 (Health)"
          showPercentage={true}
        />
      );

      expect(container).toBeInTheDocument();
      expect(
        screen.getByTestId("progress-tracker-container pixi-container")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("progress-tracker-bar pixi-graphics")
      ).toBeInTheDocument();
    });

    it("renders with Korean label", () => {
      render(
        <ProgressTracker
          value={80}
          maxValue={100}
          label="기력 (Ki Energy)"
          showPercentage={true}
        />
      );

      // Check for percentage text using space-separated test ID
      expect(
        screen.getByTestId("progress-tracker-percentage-text pixi-text")
      ).toHaveTextContent("80%");
    });

    it("calculates percentage correctly", () => {
      render(
        <ProgressTracker value={25} maxValue={50} showPercentage={true} />
      );

      // Check for calculated percentage (25/50 = 50%)
      expect(
        screen.getByTestId("progress-tracker-percentage-text pixi-text")
      ).toHaveTextContent("50%");
    });

    it("handles zero max value safely", () => {
      render(<ProgressTracker value={10} maxValue={0} showPercentage={true} />);

      // Should show 100% when maxValue is 0 (safety fallback)
      expect(
        screen.getByTestId("progress-tracker-percentage-text pixi-text")
      ).toHaveTextContent("100%");
    });
  });

  describe("Korean Martial Arts Integration", () => {
    it("renders with custom text display", () => {
      render(
        <ProgressTracker
          value={60}
          maxValue={100}
          label="스태미나 (Stamina)"
          showText={true}
        />
      );

      expect(
        screen.getByTestId("progress-tracker-percentage-text pixi-text")
      ).toHaveTextContent("60%");
    });

    it("supports custom width and height", () => {
      const { container } = render(
        <ProgressTracker
          value={60}
          maxValue={100}
          width={250}
          height={35}
          showPercentage={true}
        />
      );

      expect(container).toBeInTheDocument();
      expect(
        screen.getByTestId("progress-tracker-percentage-text pixi-text")
      ).toHaveTextContent("60%");
    });

    it("handles maximum value properly", () => {
      render(
        <ProgressTracker
          value={100}
          maxValue={100}
          label="건강 (Health)"
          showPercentage={true}
        />
      );

      expect(
        screen.getByTestId("progress-tracker-percentage-text pixi-text")
      ).toHaveTextContent("100%");
    });
  });

  describe("Legacy Compatibility", () => {
    it("supports showPercentage prop", () => {
      render(
        <ProgressTracker value={75} maxValue={100} showPercentage={true} />
      );

      expect(
        screen.getByTestId("progress-tracker-percentage-text pixi-text")
      ).toHaveTextContent("75%");
    });

    it("supports progress/total props for backward compatibility", () => {
      render(
        <ProgressTracker progress={45} total={90} showPercentage={true} />
      );

      expect(
        screen.getByTestId("progress-tracker-percentage-text pixi-text")
      ).toHaveTextContent("50%");
    });

    it("supports color and barColor props", () => {
      const { container } = render(
        <ProgressTracker
          value={70}
          maxValue={100}
          color={KOREAN_COLORS.GOLD}
          backgroundColor={KOREAN_COLORS.GRAY_DARK}
          showPercentage={true}
        />
      );

      expect(container).toBeInTheDocument();
      expect(
        screen.getByTestId("progress-tracker-percentage-text pixi-text")
      ).toHaveTextContent("70%");
    });
  });

  describe("Korean Typography and Styling", () => {
    it("renders with Korean label text", () => {
      render(
        <ProgressTracker
          value={85}
          maxValue={100}
          label="무사의 체력"
          showLabel={true}
          showPercentage={true}
        />
      );

      expect(
        screen.getByTestId("progress-tracker-label-text")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("progress-tracker-percentage-text pixi-text")
      ).toHaveTextContent("85%");
    });

    it("handles trigram-based health display", () => {
      render(
        <ProgressTracker
          value={42}
          maxValue={100}
          label="☰ 건괘 에너지"
          showLabel={true}
          showPercentage={true}
        />
      );

      expect(
        screen.getByTestId("progress-tracker-percentage-text pixi-text")
      ).toHaveTextContent("42%");
    });

    it("displays Korean martial arts status correctly", () => {
      render(
        <ProgressTracker
          value={95}
          maxValue={100}
          label="수련도 (Training Level)"
          showPercentage={true}
        />
      );

      expect(
        screen.getByTestId("progress-tracker-percentage-text pixi-text")
      ).toHaveTextContent("95%");
    });
  });

  describe("Edge Cases and Error Handling", () => {
    it("handles negative values gracefully", () => {
      render(
        <ProgressTracker value={-10} maxValue={100} showPercentage={true} />
      );

      expect(
        screen.getByTestId("progress-tracker-percentage-text pixi-text")
      ).toHaveTextContent("0%");
    });

    it("handles values exceeding maximum", () => {
      render(
        <ProgressTracker value={120} maxValue={100} showPercentage={true} />
      );

      expect(
        screen.getByTestId("progress-tracker-percentage-text pixi-text")
      ).toHaveTextContent("100%");
    });

    it("renders without percentage text when disabled", () => {
      const { container } = render(
        <ProgressTracker
          value={50}
          maxValue={100}
          showPercentage={false}
          showText={false}
        />
      );

      expect(container).toBeInTheDocument();
      expect(
        screen.queryByTestId("progress-tracker-percentage-text pixi-text")
      ).not.toBeInTheDocument();
    });

    it("handles zero value correctly", () => {
      render(
        <ProgressTracker value={0} maxValue={100} showPercentage={true} />
      );

      expect(
        screen.getByTestId("progress-tracker-percentage-text pixi-text")
      ).toHaveTextContent("0%");
    });
  });

  describe("Korean Color Integration", () => {
    it("uses Korean martial arts color scheme", () => {
      const { container } = render(
        <ProgressTracker
          value={88}
          maxValue={100}
          barColor={KOREAN_COLORS.CYAN}
          backgroundColor={KOREAN_COLORS.BLACK}
          borderColor={KOREAN_COLORS.GOLD}
          showPercentage={true}
        />
      );

      expect(container).toBeInTheDocument();
      expect(
        screen.getByTestId("progress-tracker-percentage-text pixi-text")
      ).toHaveTextContent("88%");
    });

    it("supports trigram stance colors", () => {
      const { container } = render(
        <ProgressTracker
          value={65}
          maxValue={100}
          color={KOREAN_COLORS.TRADITIONAL_RED}
          label="☲ 리괘 화염력"
          showPercentage={true}
        />
      );

      expect(container).toBeInTheDocument();
      expect(
        screen.getByTestId("progress-tracker-percentage-text pixi-text")
      ).toHaveTextContent("65%");
    });
  });
});
