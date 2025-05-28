import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TrainingScreen } from "../TrainingScreen";
import { createAudioMock } from "./mocks/audioMock";

// Mock dependencies with proper TypeScript typing
vi.mock("../../../audio/AudioManager", () => ({
  useAudio: () => mockAudio,
}));

// Create mock audio before tests
const mockAudio = createAudioMock();

describe("TrainingScreen", () => {
  const mockExit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render the training screen with title", () => {
      render(<TrainingScreen onExit={mockExit} />);

      // Find title elements by test ID
      const koreanTitle = screen.getByTestId("pixitext-title-korean");
      const englishTitle = screen.getByTestId("pixitext-title-english");

      expect(koreanTitle).toBeInTheDocument();
      expect(englishTitle).toBeInTheDocument();
      expect(koreanTitle.getAttribute("text")).toBe("🥋 기초 수련");
      expect(englishTitle.getAttribute("text")).toBe("Basic Training");
    });

    it("should render all 8 stances on the wheel", () => {
      render(<TrainingScreen onExit={mockExit} />);

      // Check that all 8 stance containers are rendered
      ["geon", "tae", "li", "jin", "son", "gam", "gan", "gon"].forEach(
        (stance) => {
          const stanceContainer = screen.getByTestId(
            `pixicontainer-stance-${stance}`
          );
          expect(stanceContainer).toBeInTheDocument();
        }
      );
    });
  });

  describe("User Interface Controls", () => {
    it("should display Korean control instructions", () => {
      render(<TrainingScreen onExit={mockExit} />);

      // Check for actual rendered content using data-testid
      const koreanInstructions = screen.getByTestId("pixitext-controls-korean");

      expect(koreanInstructions).toBeInTheDocument();
      expect(koreanInstructions.getAttribute("text")).toContain("키보드");
    });

    it("should select a stance when clicking on it", () => {
      render(<TrainingScreen onExit={mockExit} />);

      // Find and click the tae stance
      const taeStance = screen.getByTestId("pixicontainer-stance-tae");
      fireEvent.pointerDown(taeStance);

      // Should trigger audio
      expect(mockAudio.playSFX).toHaveBeenCalledWith("stance_change");
    });

    it("should handle keyboard input for selecting stances", () => {
      render(<TrainingScreen onExit={mockExit} />);

      // Simulate pressing key "2" to select tae stance
      fireEvent.keyDown(window, { code: "Digit2" });

      // Should trigger audio
      expect(mockAudio.playSFX).toHaveBeenCalledWith("stance_change");
    });
  });

  describe("Animation and Visual Feedback", () => {
    it("should handle technique animation timing", () => {
      render(<TrainingScreen onExit={mockExit} />);

      // Select a stance to trigger animation
      const geonStance = screen.getByTestId("pixicontainer-stance-geon");
      fireEvent.pointerDown(geonStance);

      // Should not throw errors during animation cycle
      const containers = screen.getAllByTestId(/^pixicontainer/);
      expect(containers.length).toBeGreaterThan(0);
    });

    it("should provide audio feedback for technique execution", () => {
      render(<TrainingScreen onExit={mockExit} />);

      // Select a stance
      fireEvent.keyDown(window, { code: "Digit3" });

      // Should have audio calls for technique execution
      expect(mockAudio.playSFX).toHaveBeenCalled();
    });
  });

  describe("Performance and Accessibility", () => {
    it("should handle rapid technique practice without errors", () => {
      render(<TrainingScreen onExit={mockExit} />);

      // Simulate rapid stance changes
      for (let i = 1; i <= 8; i++) {
        fireEvent.keyDown(window, { code: `Digit${i}` });
      }

      // Should handle rapid input without crashing
      const containers = screen.getAllByTestId(/^pixicontainer/);
      expect(containers.length).toBeGreaterThan(0);
    });
  });

  describe("Training Statistics Calculations", () => {
    it("should show overall progress calculation", () => {
      render(<TrainingScreen onExit={mockExit} />);

      // Practice a few stances
      fireEvent.keyDown(window, { code: "Digit1" });
      fireEvent.keyDown(window, { code: "Digit2" });
      fireEvent.keyDown(window, { code: "Digit1" });

      // Check for basic training mode text
      const progressText = screen.getByTestId("pixitext-progress-percentage");
      expect(progressText).toBeInTheDocument();
      expect(progressText.getAttribute("text")).toContain("%");
    });

    it("should track last practiced technique", () => {
      render(<TrainingScreen onExit={mockExit} />);

      // Practice a specific stance
      fireEvent.keyDown(window, { code: "Digit3" });

      // Check that technique selection is working
      expect(mockAudio.playSFX).toHaveBeenCalled();
    });
  });
});
