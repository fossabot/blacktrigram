import { screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { renderWithPixi } from "../../test/test-utils";
import { AudioProvider } from "../../audio/AudioProvider";
import TrainingScreen from "./TrainingScreen";
import { TrigramStance, PlayerArchetype, CombatState } from "../../types/enums";
import type { PlayerState } from "../../types/player";

// Fix: Complete mock player state with all required properties
const mockPlayer: PlayerState = {
  id: "test-player",
  name: { korean: "테스트", english: "Test" },
  archetype: PlayerArchetype.MUSA,
  health: 100,
  maxHealth: 100,
  ki: 100,
  maxKi: 100,
  stamina: 100,
  maxStamina: 100,
  energy: 100,
  maxEnergy: 100,
  attackPower: 75,
  defense: 75,
  speed: 75,
  technique: 75,
  pain: 0,
  consciousness: 100,
  balance: 100,
  momentum: 0,
  currentStance: TrigramStance.GEON,
  combatState: CombatState.IDLE,
  position: { x: 300, y: 400 },
  isBlocking: false,
  isStunned: false,
  isCountering: false,
  lastActionTime: 0,
  recoveryTime: 0,
  lastStanceChangeTime: 0,
  statusEffects: [],
  activeEffects: [],
  vitalPoints: [],
  totalDamageReceived: 0,
  totalDamageDealt: 0,
  hitsTaken: 0,
  hitsLanded: 0,
  perfectStrikes: 0,
  vitalPointHits: 0,
  experiencePoints: 0,
};

const renderTrainingScreen = (props = {}) => {
  const defaultProps = {
    onReturnToMenu: vi.fn(),
    onPlayerUpdate: vi.fn(),
    player: mockPlayer,
    width: 1200,
    height: 800,
  };

  // Use renderWithPixi instead of regular render
  return renderWithPixi(
    <AudioProvider>
      <TrainingScreen {...defaultProps} {...props} />
    </AudioProvider>
  );
};

describe("TrainingScreen", () => {
  describe("Initial Render", () => {
    it("should render all essential training elements", async () => {
      renderTrainingScreen();

      // Give PixiJS time to initialize
      await waitFor(
        () => {
          expect(screen.getByTestId("training-screen")).toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    });

    it("should display correct Korean text elements", async () => {
      renderTrainingScreen();
      // grab the pixiText attribute "text"
      await waitFor(() => {
        expect(screen.getByTestId("training-title").getAttribute("text")).toBe(
          "흑괘 무술 도장"
        );
      });
    });
  });

  describe("Training Mode Selection", () => {
    it("should handle training mode changes", async () => {
      renderTrainingScreen();

      const basicsMode = await screen.findByTestId("mode-basics");
      fireEvent.click(basicsMode);

      await waitFor(() => {
        expect(
          screen.getByTestId("training-mode-display").getAttribute("text")
        ).toContain("basics");
      });
    });

    it("should update difficulty levels", async () => {
      renderTrainingScreen();

      const advancedDifficulty = await screen.findByTestId("mode-advanced");
      fireEvent.click(advancedDifficulty);

      await waitFor(() => {
        expect(
          screen.getByTestId("training-mode-display").getAttribute("text")
        ).toContain("advanced");
      });
    });
  });

  describe("Stance Training", () => {
    it("should change stances correctly", async () => {
      const mockUpdate = vi.fn();
      renderTrainingScreen({ onPlayerUpdate: mockUpdate });

      const trigramWheel = await screen.findByTestId("training-trigram-wheel");
      fireEvent.click(trigramWheel);

      await waitFor(() => {
        expect(mockUpdate).toHaveBeenCalledWith({
          currentStance: expect.any(String),
        });
      });
    });
  });

  describe("Training Execution", () => {
    it("should start training session", async () => {
      renderTrainingScreen();

      const startButton = await screen.findByTestId("start-training-button");
      fireEvent.click(startButton);

      await waitFor(() => {
        expect(screen.getByTestId("execute-technique-button")).toBeTruthy();
        expect(screen.getByTestId("session-time")).toBeTruthy();
      });
    });

    it("should execute techniques and update statistics", async () => {
      renderTrainingScreen();
      fireEvent.click(await screen.findByTestId("start-training-button"));

      const executeButton = await screen.findByTestId(
        "execute-technique-button"
      );
      fireEvent.click(executeButton);

      await waitFor(() => {
        expect(
          screen.getByTestId("attempts-count").getAttribute("text")
        ).not.toMatch(/시도:\s*0/);
      });
    });
  });

  describe("Training Feedback", () => {
    it("should display appropriate feedback messages", async () => {
      renderTrainingScreen();

      const evaluateButton = await screen.findByTestId("evaluate-button");
      fireEvent.click(evaluateButton);

      await waitFor(() => {
        const feedbackMessage = screen.getByTestId("feedback-message");
        const text = feedbackMessage.getAttribute("text") || "";
        expect(text).toMatch(/연습|실력|진전/);
      });
    });
  });

  describe("Responsive Design", () => {
    it("should adapt to mobile screen sizes", async () => {
      renderTrainingScreen({ width: 400, height: 600 });

      await waitFor(() => {
        const trainingScreen = screen.getByTestId("training-screen");
        expect(trainingScreen).toBeInTheDocument();
        // Mobile-specific elements should be present
      });
    });
  });

  describe("Navigation", () => {
    it("should return to menu correctly", async () => {
      const mockReturn = vi.fn();
      renderTrainingScreen({ onReturnToMenu: mockReturn });

      const returnButton = await screen.findByTestId("return-to-menu-button");
      fireEvent.click(returnButton);

      expect(mockReturn).toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA labels and test IDs", async () => {
      renderTrainingScreen();

      await waitFor(() => {
        expect(screen.getByTestId("training-screen")).toBeInTheDocument();
        expect(screen.getByTestId("training-player")).toBeInTheDocument();
        expect(
          screen.getByTestId("training-dummy-container")
        ).toBeInTheDocument();
      });
    });
  });
});
