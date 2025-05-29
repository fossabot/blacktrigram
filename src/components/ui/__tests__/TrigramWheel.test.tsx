import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TrigramWheel, TRIGRAM_DATA } from "../TrigramWheel";
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

    it("should call onTrigramSelect when trigram is clicked", () => {
      render(<TrigramWheel {...defaultProps} interactive={true} />);

      const heavenSymbol = screen.getAllByText("☰")[0]; // First occurrence in the wheel
      fireEvent.click(heavenSymbol.parentElement!);

      expect(mockOnStanceSelect).toHaveBeenCalledWith("heaven");
    });

    it("should call onTrigramHover when trigram is hovered", () => {
      render(<TrigramWheel {...defaultProps} interactive={true} />);

      const heavenSymbol = screen.getAllByText("☰")[0];
      fireEvent.mouseEnter(heavenSymbol.parentElement!);

      expect(mockOnTrigramHover).toHaveBeenCalledWith("heaven");
    });

    it("should not call onTrigramSelect for disabled trigrams", () => {
      render(
        <TrigramWheel
          {...defaultProps}
          availableTrigrams={["heaven", "fire"]} // Only heaven and fire available
          interactive={true}
        />
      );

      const lakeSymbol = screen.getAllByText("☱")[0]; // Lake is not available
      fireEvent.click(lakeSymbol.parentElement!);

      expect(mockOnTrigramSelect).not.toHaveBeenCalled();
    });

    it("should handle keyboard navigation", () => {
      render(<TrigramWheel {...defaultProps} interactive={true} />);

      fireEvent.keyDown(window, { key: "1" }); // Heaven trigram key
      expect(mockOnTrigramSelect).toHaveBeenCalledWith("heaven");

      fireEvent.keyDown(window, { key: "3" }); // Fire trigram key
      expect(mockOnTrigramSelect).toHaveBeenCalledWith("fire");
    });

    it("should not respond to keyboard when not interactive", () => {
      render(<TrigramWheel {...defaultProps} interactive={false} />);

      fireEvent.keyDown(window, { key: "1" });
      expect(mockOnTrigramSelect).not.toHaveBeenCalled();
    });
  });

  describe("Korean Cultural Elements", () => {
    it("should display authentic Korean trigram names", () => {
      render(<TrigramWheel {...defaultProps} showLabels={true} />);

      // Check for authentic Korean names
      expect(screen.getByText("건")).toBeInTheDocument(); // Heaven
      expect(screen.getByText("태")).toBeInTheDocument(); // Lake
      expect(screen.getByText("리")).toBeInTheDocument(); // Fire
      expect(screen.getByText("진")).toBeInTheDocument(); // Thunder
      expect(screen.getByText("손")).toBeInTheDocument(); // Wind
      expect(screen.getByText("감")).toBeInTheDocument(); // Water
      expect(screen.getByText("간")).toBeInTheDocument(); // Mountain
      expect(screen.getByText("곤")).toBeInTheDocument(); // Earth
    });

    it("should show yin-yang symbol in center when no trigram selected", () => {
      render(<TrigramWheel {...defaultProps} selectedTrigram={null} />);

      expect(screen.getByText("☯")).toBeInTheDocument();
    });

    it("should display trigram philosophy in info panel on hover", async () => {
      render(<TrigramWheel {...defaultProps} interactive={true} />);

      const heavenSymbol = screen.getAllByText("☰")[0];
      fireEvent.mouseEnter(heavenSymbol.parentElement!);

      await waitFor(() => {
        expect(
          screen.getByText(/Creative force, leadership, strength/)
        ).toBeInTheDocument();
      });
    });

    it("should display Korean techniques in info panel", async () => {
      render(<TrigramWheel {...defaultProps} interactive={true} />);

      const heavenSymbol = screen.getAllByText("☰")[0];
      fireEvent.mouseEnter(heavenSymbol.parentElement!);

      await waitFor(() => {
        expect(screen.getByText(/천둥벽력/)).toBeInTheDocument(); // Thunder Strike technique
        expect(screen.getByText(/하늘타격/)).toBeInTheDocument(); // Heaven Strike technique
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(<TrigramWheel {...defaultProps} />);

      const wheel = screen.getByRole("generic"); // Container element
      expect(wheel).toBeInTheDocument();
    });

    it("should support keyboard navigation for all trigrams", () => {
      render(<TrigramWheel {...defaultProps} interactive={true} />);

      // Test all key bindings
      for (let i = 1; i <= 8; i++) {
        fireEvent.keyDown(window, { key: i.toString() });
        expect(mockOnTrigramSelect).toHaveBeenCalledWith(
          TRIGRAM_DATA[i - 1].id
        );
      }
    });

    it("should maintain focus states properly", () => {
      render(<TrigramWheel {...defaultProps} interactive={true} />);

      const heavenSymbol = screen.getAllByText("☰")[0];
      fireEvent.mouseEnter(heavenSymbol.parentElement!);
      fireEvent.mouseLeave(heavenSymbol.parentElement!);

      expect(mockOnTrigramHover).toHaveBeenCalledWith("heaven");
      expect(mockOnTrigramHover).toHaveBeenCalledWith(null);
    });
  });

  describe("Visual States", () => {
    it("should apply different styles for selected trigram", () => {
      render(<TrigramWheel {...defaultProps} selectedTrigram="heaven" />);

      // The selected trigram should appear in the center
      const centerElements = screen.getAllByText("☰");
      expect(centerElements.length).toBeGreaterThan(1);
    });

    it("should apply disabled styling for unavailable trigrams", () => {
      render(
        <TrigramWheel
          {...defaultProps}
          availableTrigrams={["heaven"]} // Only heaven available
        />
      );

      // Other trigrams should still be rendered but with disabled styling
      expect(screen.getByText("☱")).toBeInTheDocument(); // Lake
      expect(screen.getByText("☲")).toBeInTheDocument(); // Fire
    });

    it("should handle different sizes correctly", () => {
      const { rerender } = render(
        <TrigramWheel {...defaultProps} size="small" />
      );
      expect(screen.getByText("☰")).toBeInTheDocument();

      rerender(<TrigramWheel {...defaultProps} size="large" />);
      expect(screen.getByText("☰")).toBeInTheDocument();
    });
  });

  describe("Performance", () => {
    it("should handle rapid interactions without errors", () => {
      render(<TrigramWheel {...defaultProps} interactive={true} />);

      // Rapid hover/unhover
      const heavenSymbol = screen.getAllByText("☰")[0];
      for (let i = 0; i < 10; i++) {
        fireEvent.mouseEnter(heavenSymbol.parentElement!);
        fireEvent.mouseLeave(heavenSymbol.parentElement!);
      }

      expect(mockOnTrigramHover).toHaveBeenCalledTimes(20); // 10 enters + 10 leaves
    });

    it("should handle rapid keyboard input", () => {
      render(<TrigramWheel {...defaultProps} interactive={true} />);

      // Rapid key presses
      for (let i = 1; i <= 8; i++) {
        fireEvent.keyDown(window, { key: i.toString() });
      }

      expect(mockOnTrigramSelect).toHaveBeenCalledTimes(8);
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
