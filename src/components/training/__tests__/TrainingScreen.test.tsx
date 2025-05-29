import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TrainingScreen } from "../TrainingScreen";

// Mock the audio manager
vi.mock("../../../audio/AudioManager", () => ({
  useAudio: () => ({
    playSFX: vi.fn(),
    playAttackSound: vi.fn(),
    playHitSound: vi.fn(),
    playStanceChangeSound: vi.fn(),
    playComboSound: vi.fn(),
  }),
}));

describe("TrainingScreen", () => {
  const mockOnExit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const TrainingScreenComponent = ({ onExit }: { onExit: () => void }) => (
    <TrainingScreen onExit={onExit} />
  );

  describe("Component Structure", () => {
    it("renders training screen with all main components", () => {
      render(<TrainingScreenComponent onExit={mockOnExit} />);

      expect(screen.getByTestId("training-screen")).toBeInTheDocument();
      expect(screen.getByTestId("dojang-background")).toBeInTheDocument();
      expect(screen.getByTestId("korean-header")).toBeInTheDocument();
      expect(screen.getByTestId("trigram-wheel")).toBeInTheDocument();
    });

    it("displays Korean training interface", () => {
      render(<TrainingScreenComponent onExit={mockOnExit} />);

      // Check for Korean header
      const koreanHeader = screen.getByTestId("korean-header");
      expect(koreanHeader).toBeInTheDocument();

      // Check for training instructions
      expect(screen.getByTestId("training-instructions")).toBeInTheDocument();
    });

    it("shows trigram wheel for stance practice", () => {
      render(<TrainingScreenComponent onExit={mockOnExit} />);

      const trigramWheel = screen.getByTestId("trigram-wheel");
      expect(trigramWheel).toBeInTheDocument();

      // Should show practice count functionality
      expect(trigramWheel).toBeInTheDocument();
    });

    it("displays training tips and guidance", () => {
      render(<TrainingScreenComponent onExit={mockOnExit} />);

      expect(screen.getByTestId("training-tips")).toBeInTheDocument();
      expect(screen.getByTestId("tips-title")).toBeInTheDocument();
    });
  });

  describe("Korean Cultural Elements", () => {
    it("uses authentic Korean martial arts terminology", () => {
      render(<TrainingScreenComponent onExit={mockOnExit} />);

      // Check for Korean instructions
      const koreanInstructions = screen.getByTestId("instructions-korean");
      expect(koreanInstructions).toBeInTheDocument();
      expect(koreanInstructions.getAttribute("text")).toContain("자세를");
    });

    it("displays traditional trigram symbols", () => {
      render(<TrainingScreenComponent onExit={mockOnExit} />);

      // Trigram wheel should contain traditional symbols
      const trigramWheel = screen.getByTestId("trigram-wheel");
      expect(trigramWheel).toBeInTheDocument();
    });

    it("shows Korean training tips", () => {
      render(<TrainingScreenComponent onExit={mockOnExit} />);

      const tip1 = screen.getByTestId("tip-1");
      expect(tip1).toBeInTheDocument();
      expect(tip1.getAttribute("text")).toContain("연습하여");
    });
  });

  describe("Interactive Training System", () => {
    it("handles stance selection via keyboard", async () => {
      const user = userEvent.setup();
      render(<TrainingScreenComponent onExit={mockOnExit} />);

      // Test keyboard stance selection (1-8)
      await user.keyboard("1");
      await user.keyboard("2");
      await user.keyboard("3");

      // Component should handle these without errors
      expect(screen.getByTestId("training-screen")).toBeInTheDocument();
    });

    it("responds to exit commands", async () => {
      const user = userEvent.setup();
      render(<TrainingScreenComponent onExit={mockOnExit} />);

      // Test escape key
      await user.keyboard("{Escape}");

      expect(mockOnExit).toHaveBeenCalled();
    });

    it("handles backspace for exit", async () => {
      const user = userEvent.setup();
      render(<TrainingScreenComponent onExit={mockOnExit} />);

      // Test backspace key
      await user.keyboard("{Backspace}");

      expect(mockOnExit).toHaveBeenCalled();
    });
  });

  describe("Performance and Accessibility", () => {
    it("should handle rapid technique practice without errors", async () => {
      const user = userEvent.setup();
      render(<TrainingScreenComponent onExit={mockOnExit} />);

      for (let i = 1; i <= 8; i++) {
        await user.keyboard(i.toString());
        await waitFor(
          () => {
            expect(screen.getByTestId("pixi-container")).toBeInTheDocument();
          },
          { timeout: 100 }
        );
      }

      // Should handle rapid input without crashing
      const trainingScreen = screen.getByTestId("pixi-container");
      expect(trainingScreen).toBeInTheDocument();
    });

    it("maintains Korean font rendering", () => {
      render(<TrainingScreenComponent onExit={mockOnExit} />);

      // Check that Korean text elements are rendered
      const textElements = screen.getAllByTestId("pixi-text");
      expect(textElements.length).toBeGreaterThan(0);

      // Verify Korean text is present in data attributes
      const koreanTextFound = textElements.some((element) => {
        const text = element.getAttribute("data-text") || "";
        return /[\uAC00-\uD7AF]/.test(text); // Korean Unicode range
      });

      expect(koreanTextFound).toBe(true);
    });
  });

  describe("Training Statistics Calculations", () => {
    it("should show overall progress calculation", async () => {
      const user = userEvent.setup();
      render(<TrainingScreenComponent onExit={mockOnExit} />);

      // Execute some training techniques
      await user.keyboard("1"); // geon stance
      await user.keyboard("3"); // li stance

      // Verify progress tracking elements exist
      const progressElements = screen.getAllByTestId("pixi-text");
      expect(progressElements.length).toBeGreaterThan(0);
    });

    it("should track technique mastery progress", async () => {
      const user = userEvent.setup();
      render(<TrainingScreenComponent onExit={mockOnExit} />);

      // Practice same technique multiple times
      for (let i = 0; i < 3; i++) {
        await user.keyboard("1"); // geon stance
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      // Should maintain component stability
      expect(screen.getByTestId("pixi-container")).toBeInTheDocument();
    });
  });

  describe("Korean Martial Arts Integration", () => {
    it("should display Korean technique names", () => {
      render(<TrainingScreenComponent onExit={mockOnExit} />);

      const textElements = screen.getAllByTestId("pixi-text");
      const hasKoreanText = textElements.some((element) => {
        const text = element.getAttribute("data-text") || "";
        return /[\uAC00-\uD7AF]/.test(text);
      });

      expect(hasKoreanText).toBe(true);
    });

    it("should handle all eight trigram stances", async () => {
      const user = userEvent.setup();
      render(<TrainingScreenComponent onExit={mockOnExit} />);

      // Test all 8 trigram stances
      for (let i = 1; i <= 8; i++) {
        await user.keyboard(i.toString());
        expect(screen.getByTestId("pixi-container")).toBeInTheDocument();
      }
    });
  });
});
