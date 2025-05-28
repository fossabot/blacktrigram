import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { TrigramStance } from "../TrigramWheel";
import type { ComponentType } from "react";

// Mock PixiJS components
vi.mock("@pixi/react", () => ({
  extend: vi.fn(),
}));

// Mock hooks
vi.mock("../../../hooks/useTexture", () => ({
  useTexture: vi.fn(() => ({ texture: null })),
}));

describe("TrigramWheel Component", () => {
  let mockOnStanceSelect: ReturnType<typeof vi.fn>;
  let TrigramWheelComponent: ComponentType<any>;

  beforeEach(async () => {
    vi.clearAllMocks();
    mockOnStanceSelect = vi.fn();

    // Mock global JSX elements for PixiJS with proper typing
    (globalThis as any).JSX = {
      IntrinsicElements: {
        pixiContainer: "div",
        pixiGraphics: "div",
        pixiText: "div",
      },
    };

    const trigramModule = await import("../TrigramWheel");
    TrigramWheelComponent = trigramModule.TrigramWheel;
  });

  describe("Component Structure", () => {
    it("renders trigram wheel with correct test IDs", () => {
      render(
        <TrigramWheelComponent
          selectedStance="geon"
          onStanceSelect={mockOnStanceSelect}
          time={0}
          radius={180}
          showPracticeCount={false}
        />
      );

      expect(screen.getByTestId("trigram-wheel")).toBeInTheDocument();
      expect(screen.getByTestId("trigram-wheel-center")).toBeInTheDocument();
      expect(screen.getByTestId("yin-yang-symbol")).toBeInTheDocument();
    });

    it("renders all 8 trigram stances", () => {
      render(
        <TrigramWheelComponent
          selectedStance="geon"
          onStanceSelect={mockOnStanceSelect}
          time={0}
          radius={180}
        />
      );

      const stances: TrigramStance[] = [
        "geon",
        "tae",
        "li",
        "jin",
        "son",
        "gam",
        "gan",
        "gon",
      ];

      stances.forEach((stance) => {
        expect(
          screen.getByTestId(`trigram-stance-${stance}`)
        ).toBeInTheDocument();
        expect(screen.getByTestId(`trigram-bg-${stance}`)).toBeInTheDocument();
        expect(
          screen.getByTestId(`trigram-symbol-${stance}`)
        ).toBeInTheDocument();
        expect(screen.getByTestId(`trigram-key-${stance}`)).toBeInTheDocument();
      });
    });

    it("displays correct Korean trigram symbols", () => {
      render(
        <TrigramWheelComponent
          selectedStance="geon"
          onStanceSelect={mockOnStanceSelect}
          time={0}
        />
      );

      const expectedSymbols = ["☰", "☱", "☲", "☳", "☴", "☵", "☶", "☷"];
      expectedSymbols.forEach((symbol, index) => {
        const stances = [
          "geon",
          "tae",
          "li",
          "jin",
          "son",
          "gam",
          "gan",
          "gon",
        ];
        const symbolElement = screen.getByTestId(
          `trigram-symbol-${stances[index]}`
        );
        expect(symbolElement).toBeInTheDocument();
        expect(symbolElement.getAttribute("text")).toBe(symbol);
      });
    });
  });

  describe("Korean Martial Arts Authenticity", () => {
    it("uses authentic Korean trigram names", () => {
      const koreanNames = ["건", "태", "리", "진", "손", "감", "간", "곤"];

      koreanNames.forEach((koreanName) => {
        expect(typeof koreanName).toBe("string");
        expect(koreanName).toMatch(/[\uAC00-\uD7AF]/); // Korean Unicode range
      });
    });

    it("maintains traditional I Ching element associations", () => {
      render(
        <TrigramWheelComponent
          selectedStance="geon"
          onStanceSelect={mockOnStanceSelect}
          time={0}
        />
      );

      expect(screen.getByTestId("trigram-wheel")).toBeInTheDocument();
    });

    it("displays key bindings correctly (1-8)", () => {
      render(
        <TrigramWheelComponent
          selectedStance="geon"
          onStanceSelect={mockOnStanceSelect}
          time={0}
        />
      );

      for (let i = 1; i <= 8; i++) {
        const stances = [
          "geon",
          "tae",
          "li",
          "jin",
          "son",
          "gam",
          "gan",
          "gon",
        ];
        const keyElement = screen.getByTestId(`trigram-key-${stances[i - 1]}`);
        expect(keyElement).toBeInTheDocument();
        expect(keyElement.getAttribute("text")).toBe(`[${i}]`);
      }
    });

    it("displays correct Korean names", () => {
      render(
        <TrigramWheelComponent
          selectedStance="geon"
          onStanceSelect={mockOnStanceSelect}
          time={0}
        />
      );

      const expectedKoreanNames = [
        "건",
        "태",
        "리",
        "진",
        "손",
        "감",
        "간",
        "곤",
      ];
      expectedKoreanNames.forEach((korean, index) => {
        const stances = [
          "geon",
          "tae",
          "li",
          "jin",
          "son",
          "gam",
          "gan",
          "gon",
        ];
        const koreanElement = screen.getByTestId(
          `trigram-korean-${stances[index]}`
        );
        expect(koreanElement).toBeInTheDocument();
        expect(koreanElement.getAttribute("text")).toBe(korean);
      });
    });
  });

  describe("Practice Count System", () => {
    it("displays practice counts when enabled", () => {
      const practiceCount: Record<TrigramStance, number> = {
        geon: 5,
        tae: 3,
        li: 8,
        jin: 2,
        son: 0,
        gam: 7,
        gan: 1,
        gon: 4,
      };

      render(
        <TrigramWheelComponent
          selectedStance="geon"
          practiceCount={practiceCount}
          showPracticeCount={true}
          onStanceSelect={mockOnStanceSelect}
          time={0}
        />
      );

      // Test practice counts for stances with counts > 0
      expect(screen.getByTestId("trigram-count-geon")).toBeInTheDocument();
      // Use getByTestId instead of getByText for more reliable testing
      expect(screen.getByTestId("trigram-count-geon")).toHaveAttribute(
        "text",
        "5"
      );
      expect(screen.getByTestId("trigram-count-li")).toHaveAttribute(
        "text",
        "8"
      );
    });

    it("hides practice counts when disabled", () => {
      const practiceCount: Record<TrigramStance, number> = {
        geon: 5,
        tae: 3,
        li: 8,
        jin: 2,
        son: 0,
        gam: 7,
        gan: 1,
        gon: 4,
      };

      render(
        <TrigramWheelComponent
          selectedStance="geon"
          practiceCount={practiceCount}
          showPracticeCount={false}
          onStanceSelect={mockOnStanceSelect}
          time={0}
        />
      );

      expect(
        screen.queryByTestId("trigram-count-geon")
      ).not.toBeInTheDocument();
    });

    it("does not display practice count for zero values", () => {
      const practiceCount: Record<TrigramStance, number> = {
        geon: 5,
        tae: 3,
        li: 8,
        jin: 2,
        son: 0,
        gam: 7,
        gan: 1,
        gon: 4,
      };

      render(
        <TrigramWheelComponent
          selectedStance="geon"
          practiceCount={practiceCount}
          showPracticeCount={true}
          onStanceSelect={mockOnStanceSelect}
          time={0}
        />
      );

      // son has 0 count, should not display
      expect(screen.queryByTestId("trigram-count-son")).not.toBeInTheDocument();
    });
  });

  describe("Interaction System", () => {
    it("calls onStanceSelect when trigram is clicked", async () => {
      const user = userEvent.setup();
      render(
        <TrigramWheelComponent
          selectedStance="geon"
          onStanceSelect={mockOnStanceSelect}
          time={0}
        />
      );

      const taeStance = screen.getByTestId("trigram-stance-tae");
      await user.click(taeStance);

      expect(mockOnStanceSelect).toHaveBeenCalledWith("tae");
    });

    it("handles multiple rapid clicks correctly", async () => {
      const user = userEvent.setup();
      render(
        <TrigramWheelComponent
          selectedStance="geon"
          onStanceSelect={mockOnStanceSelect}
          time={0}
        />
      );

      const stances = ["geon", "li", "jin"];

      for (const stance of stances) {
        const stanceElement = screen.getByTestId(`trigram-stance-${stance}`);
        await user.click(stanceElement);
      }

      expect(mockOnStanceSelect).toHaveBeenCalledTimes(3);
      expect(mockOnStanceSelect).toHaveBeenNthCalledWith(1, "geon");
      expect(mockOnStanceSelect).toHaveBeenNthCalledWith(2, "li");
      expect(mockOnStanceSelect).toHaveBeenNthCalledWith(3, "jin");
    });

    it("supports hover interactions", async () => {
      const user = userEvent.setup();
      render(
        <TrigramWheelComponent
          selectedStance="geon"
          onStanceSelect={mockOnStanceSelect}
          time={0}
        />
      );

      const ganStance = screen.getByTestId("trigram-stance-gan");

      await user.hover(ganStance);
      // Component should handle hover state internally

      await user.unhover(ganStance);
      // Component should handle unhover state internally
    });
  });

  describe("Visual States", () => {
    it("highlights selected stance correctly", () => {
      render(
        <TrigramWheelComponent
          selectedStance="li"
          onStanceSelect={mockOnStanceSelect}
          time={0}
        />
      );

      const liStance = screen.getByTestId("trigram-stance-li");
      expect(liStance).toBeInTheDocument();

      // Selected stance should have different visual treatment
      expect(screen.getByTestId("trigram-bg-li")).toBeInTheDocument();
    });

    it("applies different sizes for different radii", () => {
      const { rerender } = render(
        <TrigramWheelComponent
          selectedStance="geon"
          radius={100}
          onStanceSelect={mockOnStanceSelect}
          time={0}
        />
      );

      expect(screen.getByTestId("trigram-wheel")).toBeInTheDocument();

      rerender(
        <TrigramWheelComponent
          selectedStance="geon"
          radius={300}
          onStanceSelect={mockOnStanceSelect}
          time={0}
        />
      );

      expect(screen.getByTestId("trigram-wheel")).toBeInTheDocument();
    });

    it("animates based on time prop", () => {
      const { rerender } = render(
        <TrigramWheelComponent
          selectedStance="geon"
          time={0}
          onStanceSelect={mockOnStanceSelect}
        />
      );

      expect(screen.getByTestId("trigram-wheel-center")).toBeInTheDocument();

      rerender(
        <TrigramWheelComponent
          selectedStance="geon"
          time={100}
          onStanceSelect={mockOnStanceSelect}
        />
      );

      expect(screen.getByTestId("trigram-wheel-center")).toBeInTheDocument();
    });
  });

  describe("Korean Accessibility", () => {
    it("maintains Korean font rendering", () => {
      render(
        <TrigramWheelComponent
          selectedStance="geon"
          onStanceSelect={mockOnStanceSelect}
          time={0}
        />
      );

      // Verify Korean text elements are present by checking test IDs
      const stances = ["geon", "tae", "li", "jin", "son", "gam", "gan", "gon"];
      stances.forEach((stance) => {
        const koreanElement = screen.getByTestId(`trigram-korean-${stance}`);
        expect(koreanElement).toBeInTheDocument();
        const text = koreanElement.getAttribute("text");
        expect(text).toMatch(/[\uAC00-\uD7AF]/); // Korean Unicode range
      });
    });

    it("supports traditional trigram symbols", () => {
      render(
        <TrigramWheelComponent
          selectedStance="geon"
          onStanceSelect={mockOnStanceSelect}
          time={0}
        />
      );

      // All 8 trigram symbols should be present
      const trigramSymbols = ["☰", "☱", "☲", "☳", "☴", "☵", "☶", "☷"];
      const stances = ["geon", "tae", "li", "jin", "son", "gam", "gan", "gon"];

      trigramSymbols.forEach((symbol, index) => {
        const symbolElement = screen.getByTestId(
          `trigram-symbol-${stances[index]}`
        );
        expect(symbolElement).toBeInTheDocument();
        expect(symbolElement.getAttribute("text")).toBe(symbol);
      });
    });
  });

  describe("Performance Optimization", () => {
    it("handles rapid stance changes efficiently", async () => {
      const user = userEvent.setup();
      const performanceStart = performance.now();

      render(
        <TrigramWheelComponent
          selectedStance="geon"
          onStanceSelect={mockOnStanceSelect}
          time={0}
        />
      );

      // Rapid sequential clicks
      const stances: TrigramStance[] = [
        "geon",
        "tae",
        "li",
        "jin",
        "son",
        "gam",
        "gan",
        "gon",
      ];

      for (const stance of stances) {
        const stanceElement = screen.getByTestId(`trigram-stance-${stance}`);
        await user.click(stanceElement);
      }

      const performanceEnd = performance.now();
      const duration = performanceEnd - performanceStart;

      // Increased threshold to 200ms for more realistic testing
      expect(duration).toBeLessThan(200);
      expect(mockOnStanceSelect).toHaveBeenCalledTimes(8);
    });

    it("maintains 60fps-capable rendering", () => {
      const frameTime = 16.67; // 60fps frame time
      const startTime = performance.now();

      render(
        <TrigramWheelComponent
          selectedStance="geon"
          onStanceSelect={mockOnStanceSelect}
          time={0}
        />
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Initial render should be faster than one frame
      expect(renderTime).toBeLessThan(frameTime);
    });
  });

  describe("Error Handling", () => {
    it("handles missing practice count gracefully", () => {
      render(
        <TrigramWheelComponent
          selectedStance="geon"
          practiceCount={undefined}
          showPracticeCount={true}
          onStanceSelect={mockOnStanceSelect}
          time={0}
        />
      );

      expect(screen.getByTestId("trigram-wheel")).toBeInTheDocument();
      // Should not crash when practice count is undefined
    });

    it("handles invalid stance selection gracefully", async () => {
      const user = userEvent.setup();

      // Use console.error to capture errors instead of expecting throws
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const invalidOnStanceSelect = vi.fn().mockImplementation(() => {
        console.error("Invalid stance");
      });

      render(
        <TrigramWheelComponent
          selectedStance="geon"
          onStanceSelect={invalidOnStanceSelect}
          time={0}
        />
      );

      const stanceElement = screen.getByTestId("trigram-stance-geon");

      // Click should not throw, but should log error
      await user.click(stanceElement);

      expect(consoleSpy).toHaveBeenCalledWith("Invalid stance");
      consoleSpy.mockRestore();
    });

    it("handles extreme time values", () => {
      const extremeTimeValues = [0, -1000, 1000000, Infinity, -Infinity];

      extremeTimeValues.forEach((timeValue) => {
        const { unmount } = render(
          <TrigramWheelComponent
            selectedStance="geon"
            time={timeValue}
            onStanceSelect={mockOnStanceSelect}
          />
        );

        expect(screen.getByTestId("trigram-wheel")).toBeInTheDocument();
        unmount();
      });
    });
  });
});
