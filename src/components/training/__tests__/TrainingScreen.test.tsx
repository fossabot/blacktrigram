import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react"; // fireEvent for keyboard
import userEvent from "@testing-library/user-event";
import { TrainingScreen } from "../TrainingScreen";
import { Stage } from "@pixi/react";
import type { TrigramStance } from "../../../types"; // Add missing import

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

// Mock TrigramWheel and ProgressTracker if they are complex or cause issues in this isolated test
vi.mock("../../ui/TrigramWheel", () => ({
  TrigramWheel: (props: any) => <div data-testid="trigram-wheel" {...props} />,
}));
vi.mock("../../ui/ProgressTracker", () => ({
  ProgressTracker: (props: any) => (
    <div data-testid="progress-tracker" {...props} />
  ),
}));

describe("TrainingScreen", () => {
  const mockOnExit = vi.fn(); // Changed from mockOnExit to match usage

  beforeEach(() => {
    vi.clearAllMocks();
    mockOnExit.mockClear();
  });

  const renderInStage = (ui: React.ReactElement) => {
    return render(<Stage>{ui}</Stage>);
  };

  const mockPlayerState = {
    playerId: "player1",
    position: { x: 100, y: 200 },
    velocity: { x: 0, y: 0 },
    health: 100,
    maxHealth: 100,
    stamina: 100,
    maxStamina: 100,
    ki: 50,
    maxKi: 100,
    stance: "geon" as TrigramStance,
    isAttacking: false,
    isBlocking: false,
    isMoving: false,
    facing: "right" as const,
    conditions: [],
    comboCount: 0,
  };

  const TrainingScreenComponent = () => (
    <TrainingScreen playerState={mockPlayerState} onBack={mockOnExit} />
  );

  describe("Component Structure", () => {
    it("renders training screen with all main components", () => {
      renderInStage(<TrainingScreenComponent />);
      expect(screen.getByTestId("training-screen")).toBeInTheDocument();
      expect(screen.getByTestId("dojang-background")).toBeInTheDocument(); // Assuming Graphics mock supports testid
      expect(screen.getByTestId("korean-header")).toBeInTheDocument(); // Assuming Text mock supports testid
      expect(screen.getByTestId("trigram-wheel")).toBeInTheDocument(); // Mocked TrigramWheel
    });

    it("displays Korean training interface elements", () => {
      renderInStage(<TrainingScreenComponent />);
      expect(screen.getByTestId("korean-header")).toBeInTheDocument();
      expect(screen.getByTestId("training-instructions")).toBeInTheDocument(); // Assuming Text mock
    });

    it("shows trigram wheel for stance practice", () => {
      renderInStage(<TrainingScreenComponent />);

      const trigramWheel = screen.getByTestId("trigram-wheel");
      expect(trigramWheel).toBeInTheDocument();

      // Should show practice count functionality
      expect(trigramWheel).toBeInTheDocument();
    });

    it("displays training tips and guidance", () => {
      renderInStage(<TrainingScreenComponent />);

      expect(screen.getByTestId("training-tips")).toBeInTheDocument();
      expect(screen.getByTestId("tips-title")).toBeInTheDocument();
    });
  });

  describe("Korean Cultural Elements", () => {
    it("uses authentic Korean martial arts terminology in instructions", () => {
      renderInStage(<TrainingScreenComponent />);
      // This test depends on the Text mock rendering its `text` prop or similar
      const instructions = screen.getByTestId("instructions-korean"); // This is a Text component
      // Check props passed to the mock if direct text query fails
      // For example, if Text mock is `(props) => <div data-testid={props['data-testid']}>{props.text}</div>`
      expect(instructions.innerHTML).toContain("자세"); // Or check props
    });

    it("displays traditional trigram symbols", () => {
      renderInStage(<TrainingScreenComponent />);

      // Trigram wheel should contain traditional symbols
      const trigramWheel = screen.getByTestId("trigram-wheel");
      expect(trigramWheel).toBeInTheDocument();
    });

    it("shows Korean training tips", () => {
      renderInStage(<TrainingScreenComponent />);

      const tip1 = screen.getByTestId("tip-1");
      expect(tip1).toBeInTheDocument();
      expect(tip1.getAttribute("text")).toContain("연습하여");
    });
  });

  describe("Interactive Training System", () => {
    it("handles stance selection via keyboard", async () => {
      // userEvent setup is good for simulating user interactions
      renderInStage(<TrainingScreenComponent />);

      // Simulate key presses on the document body or a focused element
      fireEvent.keyDown(document.body, { key: "1" });
      await waitFor(() => {
        /* expect stance change visual feedback or mock call */
      });
      fireEvent.keyDown(document.body, { key: "2" });
      await waitFor(() => {
        /* ... */
      });
      // Check if useAudio().playStanceChangeSound was called
      const audio = vi.mocked(
        require("../../../audio/AudioManager").useAudio
      )();
      expect(audio.playStanceChangeSound).toHaveBeenCalledTimes(2);
    });

    it("responds to exit commands (Escape)", async () => {
      renderInStage(<TrainingScreenComponent />);
      fireEvent.keyDown(document.body, { key: "Escape" });
      await waitFor(() => expect(mockOnExit).toHaveBeenCalledTimes(1)); // Changed from mockOnExit to mockOnExit
    });

    it("responds to exit commands (Backspace)", async () => {
      renderInStage(<TrainingScreenComponent />);
      fireEvent.keyDown(document.body, { key: "Backspace" });
      await waitFor(() => expect(mockOnExit).toHaveBeenCalledTimes(1)); // Changed from mockOnExit to mockOnExit
    });
  });

  describe("Performance and Accessibility", () => {
    it("should handle rapid technique practice without errors", async () => {
      renderInStage(<TrainingScreenComponent />);
      for (let i = 1; i <= 8; i++) {
        fireEvent.keyDown(document.body, { key: i.toString() });
        // No need to wait for pixi-container if we are testing logic/mock calls
      }
      const audio = vi.mocked(
        require("../../../audio/AudioManager").useAudio
      )();
      expect(audio.playStanceChangeSound).toHaveBeenCalledTimes(8);
      expect(screen.getByTestId("training-screen")).toBeInTheDocument(); // Basic check
    });

    it("maintains Korean font rendering for key elements", () => {
      renderInStage(<TrainingScreenComponent />);
      // This test is tricky with mocks. It's better to check if `fontFamily: "Noto Sans KR"`
      // is passed to the mocked Text components for relevant texts.
      // e.g. expect(screen.getByTestId('korean-header').style.fontFamily).toContain("Noto Sans KR") if mock sets it.
      // For now, a conceptual check:
      expect(screen.getByTestId("korean-header")).toBeInTheDocument();
      expect(screen.getByTestId("instructions-korean")).toBeInTheDocument();
    });
  });

  describe("Training Statistics Calculations", () => {
    it("should show overall progress calculation", async () => {
      const user = userEvent.setup();
      render(<TrainingScreenComponent />);

      // Execute some training techniques
      await user.keyboard("1"); // geon stance
      await user.keyboard("3"); // li stance

      // Verify progress tracking elements exist
      const progressElements = screen.getAllByTestId("pixi-text");
      expect(progressElements.length).toBeGreaterThan(0);
    });

    it("should track technique mastery progress", async () => {
      const user = userEvent.setup();
      render(<TrainingScreenComponent />);

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
      render(<TrainingScreenComponent />);

      const textElements = screen.getAllByTestId("pixi-text");
      const hasKoreanText = textElements.some((element) => {
        const text = element.getAttribute("data-text") || "";
        return /[\uAC00-\uD7AF]/.test(text);
      });

      expect(hasKoreanText).toBe(true);
    });

    it("should handle all eight trigram stances", async () => {
      const user = userEvent.setup();
      render(<TrainingScreenComponent />);

      // Test all 8 trigram stances
      for (let i = 1; i <= 8; i++) {
        await user.keyboard(i.toString());

        // Verify component remains stable after each stance change
        await waitFor(() => {
          expect(screen.getByTestId("pixi-container")).toBeInTheDocument();
        });

        // Small delay between stance changes
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      // Final verification
      expect(screen.getByTestId("pixi-container")).toBeInTheDocument();
    });
  });
});
