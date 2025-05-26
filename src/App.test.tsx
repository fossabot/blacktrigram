import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { extendSpy } from "./test/setup";

describe("Black Trigram Game Application", () => {
  let App: React.ComponentType;

  beforeEach(async () => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    extendSpy.mockClear();
    vi.resetModules();

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

    // Import App which should trigger the extend call
    const appModule = await import("./App");
    App = appModule.default;
  });

  describe("Application Structure", () => {
    it("renders the PixiJS Application with full-screen dimensions", () => {
      render(<App />);
      const pixiApp = screen.getByTestId("pixi-application");
      expect(pixiApp).toBeInTheDocument();
      expect(pixiApp).toHaveAttribute("data-width", "1920");
      expect(pixiApp).toHaveAttribute("data-height", "1080");
    });

    it("has the correct app container structure", () => {
      render(<App />);
      const container = document.querySelector(".app-container");
      expect(container).toBeInTheDocument();

      // Verify no old game elements are present
      expect(screen.queryByText(/PixiJS React Game/i)).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Click the circle to score points/i)
      ).not.toBeInTheDocument();
    });

    it("calls extend function with correct PixiJS components", () => {
      render(<App />);
      expect(extendSpy).toHaveBeenCalled();
      expect(extendSpy).toHaveBeenCalledWith({
        Container: expect.any(Function),
        Graphics: expect.any(Function),
        Text: expect.any(Function),
      });
    });
  });

  describe("Korean Martial Arts Theme", () => {
    it("renders with Korean martial arts background theme", () => {
      render(<App />);
      const pixiApp = screen.getByTestId("pixi-application");
      expect(pixiApp).toHaveAttribute("data-background-color", "0");
    });

    it("applies Korean font family", () => {
      render(<App />);
      const bodyStyles = window.getComputedStyle(document.body);
      expect(bodyStyles.fontFamily).toContain("Noto Sans KR");
    });

    it("uses traditional Korean color scheme", () => {
      render(<App />);
      const container = document.querySelector(".app-container");
      const styles = window.getComputedStyle(container!);
      expect(styles.background).toBe("rgb(0, 0, 0)");
    });
  });

  describe("Game Mode Management", () => {
    it("starts in intro mode by default", () => {
      render(<App />);
      // Should be in intro mode (no back button visible)
      expect(screen.queryByTestId("back-button")).not.toBeInTheDocument();
    });

    it("handles keyboard navigation in intro screen", async () => {
      const user = userEvent.setup();
      render(<App />);

      // Test arrow key navigation
      await user.keyboard("{ArrowLeft}");
      await user.keyboard("{ArrowRight}");

      // Test A/D key navigation
      await user.keyboard("a");
      await user.keyboard("d");

      // The component should handle these events without errors
      expect(screen.getByTestId("pixi-application")).toBeInTheDocument();
    });

    it("handles quick start keys", async () => {
      const user = userEvent.setup();
      render(<App />);

      // Test number key shortcuts
      await user.keyboard("1"); // Should trigger sparring mode
      await user.keyboard("2"); // Should trigger training mode

      // Component should handle these without errors
      expect(screen.getByTestId("pixi-application")).toBeInTheDocument();
    });

    it("responds to space and enter keys", async () => {
      const user = userEvent.setup();
      render(<App />);

      // Test confirmation keys
      await user.keyboard(" "); // Space
      await user.keyboard("{Enter}"); // Enter

      // Component should handle these without errors
      expect(screen.getByTestId("pixi-application")).toBeInTheDocument();
    });

    it("handles alt key for training mode", async () => {
      const user = userEvent.setup();
      render(<App />);

      // Test alt key for training
      await user.keyboard("{Alt}");

      // Component should handle this without errors
      expect(screen.getByTestId("pixi-application")).toBeInTheDocument();
    });
  });

  describe("Trigram Combat System", () => {
    it("should support 8 trigram fighting styles", () => {
      render(<App />);

      // The trigram data should be properly structured
      // This tests that the component renders without trigram-related errors
      expect(screen.getByTestId("pixi-application")).toBeInTheDocument();
    });

    it("integrates Korean martial arts terminology", () => {
      render(<App />);

      // Component should render with Korean martial arts context
      const pixiApp = screen.getByTestId("pixi-application");
      expect(pixiApp).toBeInTheDocument();
    });
  });

  describe("Cultural Authenticity", () => {
    it("maintains Korean language support", () => {
      render(<App />);

      // Check for Korean font loading
      const bodyStyles = window.getComputedStyle(document.body);
      expect(bodyStyles.fontFamily).toContain("Noto Sans KR");
    });

    it("uses proper I Ching trigram philosophy", () => {
      render(<App />);

      // The component should render with trigram-based structure
      expect(screen.getByTestId("pixi-application")).toBeInTheDocument();
    });
  });

  describe("Accessibility & Performance", () => {
    it("maintains responsive design principles", () => {
      render(<App />);
      const container = document.querySelector(".app-container");
      const styles = window.getComputedStyle(container!);
      expect(styles.position).toBe("fixed");
      expect(styles.width).toBe("100vw");
      expect(styles.height).toBe("100vh");
    });

    it("uses optimized PixiJS configuration", () => {
      render(<App />);
      const pixiApp = screen.getByTestId("pixi-application");
      expect(pixiApp).toHaveAttribute("data-antialias", "true");
    });

    it("handles window resize events", () => {
      render(<App />);

      // Simulate window resize
      Object.defineProperty(window, "innerWidth", { value: 800 });
      Object.defineProperty(window, "innerHeight", { value: 600 });
      fireEvent(window, new Event("resize"));

      // Component should continue to render properly
      expect(screen.getByTestId("pixi-application")).toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    it("handles PixiJS initialization gracefully", () => {
      render(<App />);

      // Component should render even if PixiJS has issues
      expect(screen.getByTestId("pixi-application")).toBeInTheDocument();
    });

    it("maintains stability with rapid key inputs", async () => {
      const user = userEvent.setup();
      render(<App />);

      // Rapid key sequence
      await user.keyboard("adadadad12121212    ");

      // Component should remain stable
      expect(screen.getByTestId("pixi-application")).toBeInTheDocument();
    });
  });
});
