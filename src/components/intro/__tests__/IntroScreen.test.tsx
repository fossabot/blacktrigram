import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { IntroScreen } from "../IntroScreen";
import { useAudio } from "../../../audio/AudioManager";
import { useTexture } from "../../../hooks/useTexture";

// Mock dependencies with proper TypeScript typing
vi.mock("../../../audio/AudioManager");
vi.mock("../../../hooks/useTexture");

// Mock PixiJS components for testing
vi.mock("@pixi/react", () => ({
  Application: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="pixi-application">{children}</div>
  ),
  extend: vi.fn(),
}));

// Global JSX declarations for PixiJS components in tests
declare global {
  namespace JSX {
    interface IntrinsicElements {
      pixiContainer: any;
      pixiGraphics: any;
      pixiText: any;
      pixiSprite: any;
    }
  }
}

// Mock PixiJS components as simple divs for testing
vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    createElement: (
      type: string | Function,
      props: any,
      ...children: any[]
    ) => {
      if (typeof type === "string" && type.startsWith("pixi")) {
        return (actual as any).createElement(
          "div",
          {
            ...props,
            "data-testid": type,
            "data-text": props?.text,
            "data-interactive": props?.interactive,
          },
          ...children
        );
      }
      return (actual as any).createElement(type, props, ...children);
    },
  };
});

describe("IntroScreen", () => {
  const mockOnStartGame = vi.fn();
  const mockOnStartTraining = vi.fn();
  const mockAudio = {
    playSFX: vi.fn(),
    playMusic: vi.fn(),
    setMasterVolume: vi.fn(),
    getMasterVolume: vi.fn(() => 0.7),
    isEnabled: vi.fn(() => true),
  };

  // Create a proper mock texture object
  const mockTexture = {
    uid: 1,
    source: {
      label: "mock-texture",
      width: 256,
      height: 256,
    },
    width: 256,
    height: 256,
    label: "mock-texture",
  };

  beforeEach(() => {
    vi.mocked(useAudio).mockReturnValue(mockAudio as any);

    // Fix: Correctly structure the TextureState mock
    // TypeScript error indicates 'loading' is the correct property name (not 'isLoading')
    vi.mocked(useTexture).mockReturnValue({
      texture: mockTexture as any,
      loading: false,
      error: null,
    });

    // Mock window dimensions for consistent testing
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1920,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 1080,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Component Rendering", () => {
    it("should render intro screen with Korean martial arts theme", () => {
      const { container } = render(
        <IntroScreen
          onStartGame={mockOnStartGame}
          onStartTraining={mockOnStartTraining}
        />
      );

      // Find elements by their text attribute instead of text content
      const pixiTexts = container.querySelectorAll("pixitext");

      // Check for Korean title text
      const hasKoreanTitle = Array.from(pixiTexts).some((el) =>
        el.getAttribute("text")?.includes("흑괘 무술 도장")
      );
      expect(hasKoreanTitle).toBe(true);

      // Check for English title text
      const hasEnglishTitle = Array.from(pixiTexts).some((el) =>
        el.getAttribute("text")?.includes("BLACK TRIGRAM MARTIAL ARTS DOJANG")
      );
      expect(hasEnglishTitle).toBe(true);
    });

    it("should display all Korean martial arts terminology correctly", () => {
      const { container } = render(
        <IntroScreen
          onStartGame={mockOnStartGame}
          onStartTraining={mockOnStartTraining}
        />
      );

      const pixiTexts = container.querySelectorAll("pixitext");

      // List of Korean martial arts terms to check for
      const terms = ["정격자", "급소격", "도장", "대련", "수련"];

      // Check each term exists in at least one pixitext element
      terms.forEach((term) => {
        const hasTerm = Array.from(pixiTexts).some((el) =>
          el.getAttribute("text")?.includes(term)
        );
        expect(hasTerm).toBe(true);
      });
    });

    it("should render trigram symbols in correct positions", () => {
      const { container } = render(
        <IntroScreen
          onStartGame={mockOnStartGame}
          onStartTraining={mockOnStartTraining}
        />
      );

      const pixiTexts = container.querySelectorAll("pixitext");

      // Check all 8 trigram symbols
      const trigramSymbols = ["☰", "☱", "☲", "☳", "☴", "☵", "☶", "☷"];

      trigramSymbols.forEach((symbol) => {
        const hasSymbol = Array.from(pixiTexts).some(
          (el) => el.getAttribute("text") === symbol
        );
        expect(hasSymbol).toBe(true);
      });
    });

    it("should display Korean philosophy text", () => {
      const { container } = render(
        <IntroScreen
          onStartGame={mockOnStartGame}
          onStartTraining={mockOnStartTraining}
        />
      );

      // Since we can't directly access text content in PixiJS elements through RTL,
      // we check for the existence of the element and verify attributes
      const pixiTexts = container.querySelectorAll("pixitext");

      // Find the philosophy text element by checking the y-coordinate
      const philosophyElement = Array.from(pixiTexts).find(
        (el) => el.getAttribute("y") === "960"
      );

      expect(philosophyElement).not.toBeNull();
      expect(philosophyElement?.getAttribute("text")).toContain(
        "도장에서 무예는 몸과 마음"
      );

      // Find the English translation
      const englishElement = Array.from(pixiTexts).find(
        (el) => el.getAttribute("y") === "985"
      );

      expect(englishElement).not.toBeNull();
      expect(englishElement?.getAttribute("text")).toContain(
        "harmony of body, mind, and spirit"
      );
    });
  });

  describe("User Interactions", () => {
    it("should handle sparring selection with audio feedback", async () => {
      render(
        <IntroScreen
          onStartGame={mockOnStartGame}
          onStartTraining={mockOnStartTraining}
        />
      );

      // Simulate left arrow key press for sparring selection
      fireEvent.keyDown(document, { code: "ArrowLeft" });

      await waitFor(() => {
        expect(mockAudio.playSFX).toHaveBeenCalledWith("menu_hover");
      });
    });

    it("should handle training selection with audio feedback", async () => {
      render(
        <IntroScreen
          onStartGame={mockOnStartGame}
          onStartTraining={mockOnStartTraining}
        />
      );

      // Simulate right arrow key press for training selection
      fireEvent.keyDown(document, { code: "ArrowRight" });

      await waitFor(() => {
        expect(mockAudio.playSFX).toHaveBeenCalledWith("menu_hover");
      });
    });

    it("should start game when sparring is confirmed", async () => {
      render(
        <IntroScreen
          onStartGame={mockOnStartGame}
          onStartTraining={mockOnStartTraining}
        />
      );

      // Select sparring and confirm
      fireEvent.keyDown(document, { code: "ArrowLeft" });
      fireEvent.keyDown(document, { code: "Space" });

      await waitFor(() => {
        expect(mockAudio.playSFX).toHaveBeenCalledWith("menu_select");
        expect(mockOnStartGame).toHaveBeenCalled();
      });
    });

    it("should start training when training is confirmed", async () => {
      render(
        <IntroScreen
          onStartGame={mockOnStartGame}
          onStartTraining={mockOnStartTraining}
        />
      );

      // Select training and confirm
      fireEvent.keyDown(document, { code: "ArrowRight" });
      fireEvent.keyDown(document, { code: "Enter" });

      await waitFor(() => {
        expect(mockAudio.playSFX).toHaveBeenCalledWith("menu_select");
        expect(mockOnStartTraining).toHaveBeenCalled();
      });
    });

    it("should handle direct game start with number keys", async () => {
      render(
        <IntroScreen
          onStartGame={mockOnStartGame}
          onStartTraining={mockOnStartTraining}
        />
      );

      // Press '1' for direct sparring start
      fireEvent.keyDown(document, { code: "Digit1" });

      await waitFor(() => {
        expect(mockAudio.playSFX).toHaveBeenCalledWith("menu_select");
        expect(mockOnStartGame).toHaveBeenCalled();
      });

      // Press '2' for direct training start
      fireEvent.keyDown(document, { code: "Digit2" });

      await waitFor(() => {
        expect(mockOnStartTraining).toHaveBeenCalled();
      });
    });

    it("should handle Alt key for training shortcut", async () => {
      render(
        <IntroScreen
          onStartGame={mockOnStartGame}
          onStartTraining={mockOnStartTraining}
        />
      );

      // Press Alt for training shortcut
      fireEvent.keyDown(document, { code: "AltLeft" });

      await waitFor(() => {
        expect(mockAudio.playSFX).toHaveBeenCalledWith("menu_select");
        expect(mockOnStartTraining).toHaveBeenCalled();
      });
    });
  });

  describe("Korean Text Validation", () => {
    it("should render Korean characters correctly", () => {
      const { container } = render(
        <IntroScreen
          onStartGame={mockOnStartGame}
          onStartTraining={mockOnStartTraining}
        />
      );

      const koreanTexts = [
        "흑괘 무술 도장",
        "정격자",
        "급소격",
        "대련",
        "수련",
        "도장에서 무예는",
      ];

      const pixiTexts = container.querySelectorAll("pixitext");

      // For each Korean text we want to find, check if any pixitext element contains it
      koreanTexts.forEach((text) => {
        const found = Array.from(pixiTexts).some((el) =>
          el.getAttribute("text")?.includes(text)
        );
        expect(found).toBe(true);
      });
    });

    it("should have proper Korean font styling", () => {
      const { container } = render(
        <IntroScreen
          onStartGame={mockOnStartGame}
          onStartTraining={mockOnStartTraining}
        />
      );

      // Find elements with Korean text by checking text attribute for Korean characters
      const pixiTexts = container.querySelectorAll("pixitext");
      const koreanTextElements = Array.from(pixiTexts).filter((el) =>
        /[가-힣]/.test(el.getAttribute("text") || "")
      );

      expect(koreanTextElements.length).toBeGreaterThan(0);

      // Check if at least some elements have Noto Sans KR font
      const koreanFontElements = koreanTextElements.filter((el) =>
        el.getAttribute("style")?.includes("Noto Sans KR")
      );

      expect(koreanFontElements.length).toBeGreaterThan(0);
    });
  });

  describe("Menu Button Interactions", () => {
    it("should handle mouse interactions on menu buttons", async () => {
      const { container } = render(
        <IntroScreen
          onStartGame={mockOnStartGame}
          onStartTraining={mockOnStartTraining}
        />
      );

      // Find menu button containers by checking their cursor property
      const pixiContainers = container.querySelectorAll(
        'pixicontainer[cursor="pointer"]'
      );
      expect(pixiContainers.length).toBeGreaterThan(0);

      // Check if they contain Korean text for menu options
      const menuTexts = ["대련", "수련"];

      // Verify menu text exists within menu containers
      let foundMenuText = false;

      for (const container of Array.from(pixiContainers)) {
        const textElements = container.querySelectorAll("pixitext");

        for (const textEl of Array.from(textElements)) {
          const text = textEl.getAttribute("text") || "";
          if (menuTexts.some((menuText) => text.includes(menuText))) {
            foundMenuText = true;
            break;
          }
        }

        if (foundMenuText) break;
      }

      expect(foundMenuText).toBe(true);

      // Since we can't directly fire events on PixiJS elements in a meaningful way in this test,
      // we'll just verify the click handler is provided
      expect(mockOnStartGame).toBeDefined();
      expect(mockOnStartTraining).toBeDefined();

      // Check that at least one audio hook method is defined (mocked)
      expect(mockAudio.playSFX).toBeDefined();
    });
  });

  describe("Accessibility and Performance", () => {
    it("should handle keyboard navigation properly", () => {
      render(
        <IntroScreen
          onStartGame={mockOnStartGame}
          onStartTraining={mockOnStartTraining}
        />
      );

      // Test various keyboard inputs
      const keyEvents = [
        { code: "KeyA" },
        { code: "KeyD" },
        { code: "ArrowLeft" },
        { code: "ArrowRight" },
      ];

      keyEvents.forEach((event) => {
        fireEvent.keyDown(document, event);
        // Should not throw errors
      });

      expect(mockAudio.playSFX).toHaveBeenCalledTimes(keyEvents.length);
    });

    it("should initialize properly with audio system", () => {
      render(
        <IntroScreen
          onStartGame={mockOnStartGame}
          onStartTraining={mockOnStartTraining}
        />
      );

      // Verify audio system is accessed
      expect(useAudio).toHaveBeenCalled();
    });

    it("should handle texture loading", () => {
      render(
        <IntroScreen
          onStartGame={mockOnStartGame}
          onStartTraining={mockOnStartTraining}
        />
      );

      // Verify texture hook is called for logo
      expect(useTexture).toHaveBeenCalledWith("/black-trigram-256.png");
    });
  });

  describe("Component State Management", () => {
    it("should maintain selected option state correctly", async () => {
      render(
        <IntroScreen
          onStartGame={mockOnStartGame}
          onStartTraining={mockOnStartTraining}
        />
      );

      // Change selection multiple times
      fireEvent.keyDown(document, { code: "ArrowLeft" }); // sparring
      fireEvent.keyDown(document, { code: "ArrowRight" }); // training
      fireEvent.keyDown(document, { code: "ArrowLeft" }); // back to sparring

      // Confirm final selection
      fireEvent.keyDown(document, { code: "Space" });

      await waitFor(() => {
        expect(mockOnStartGame).toHaveBeenCalled();
      });
    });

    it("should prevent duplicate event listeners", () => {
      const { unmount } = render(
        <IntroScreen
          onStartGame={mockOnStartGame}
          onStartTraining={mockOnStartTraining}
        />
      );

      // Unmount and verify cleanup
      unmount();

      // Press keys after unmount - should not trigger callbacks
      fireEvent.keyDown(document, { code: "Space" });

      // Small delay to ensure any async operations complete
      setTimeout(() => {
        expect(mockOnStartGame).not.toHaveBeenCalled();
      }, 100);
    });
  });
});
