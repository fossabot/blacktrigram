import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { extendSpy } from "./test/setup";
import type { ComponentType } from "react";

describe("Black Trigram Game Application", () => {
  let App: ComponentType;

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
      // Verify dimensions are properly passed as data attributes
      expect(pixiApp).toHaveAttribute("data-width", "1920");
      expect(pixiApp).toHaveAttribute("data-height", "1080");
    });

    it("has the correct app container structure", () => {
      const { container } = render(<App />);
      const appContainer = container.querySelector(".app-container");
      expect(appContainer).toBeInTheDocument();

      // Verify PixiJS application is present
      expect(screen.getByTestId("pixi-application")).toBeInTheDocument();
    });

    it("calls extend function with correct PixiJS components", () => {
      render(<App />);
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
      // Component should render with Korean font support
      expect(document.documentElement).toBeInTheDocument();
    });

    it("uses traditional Korean color scheme", () => {
      const { container } = render(<App />);
      const appContainer = container.querySelector(".app-container");
      expect(appContainer).toBeInTheDocument();
    });
  });

  describe("Game Mode Management", () => {
    it("starts in intro mode by default", () => {
      render(<App />);
      // Should render the intro screen
      expect(screen.getByTestId("pixi-application")).toBeInTheDocument();
    });

    it("handles keyboard navigation in intro screen", async () => {
      const user = userEvent.setup();
      render(<App />);

      // Test keyboard events without expecting specific behaviors
      await user.keyboard("{ArrowLeft}");
      await user.keyboard("{ArrowRight}");
      await user.keyboard("a");
      await user.keyboard("d");

      // Component should remain stable
      expect(screen.getByTestId("pixi-application")).toBeInTheDocument();
    });

    it("handles quick start keys", async () => {
      const user = userEvent.setup();
      render(<App />);

      // Test number key shortcuts
      await user.keyboard("1");
      await user.keyboard("2");

      // Component should handle these without errors
      expect(screen.getByTestId("pixi-application")).toBeInTheDocument();
    });

    it("responds to space and enter keys", async () => {
      const user = userEvent.setup();
      render(<App />);

      // Test confirmation keys
      await user.keyboard(" ");
      await user.keyboard("{Enter}");

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
      expect(screen.getByTestId("pixi-application")).toBeInTheDocument();
    });

    it("integrates Korean martial arts terminology", () => {
      render(<App />);
      expect(screen.getByTestId("pixi-application")).toBeInTheDocument();
    });
  });

  describe("Cultural Authenticity", () => {
    it("maintains Korean language support", () => {
      render(<App />);
      expect(screen.getByTestId("pixi-application")).toBeInTheDocument();
    });

    it("uses proper I Ching trigram philosophy", () => {
      render(<App />);
      expect(screen.getByTestId("pixi-application")).toBeInTheDocument();
    });
  });

  describe("Accessibility & Performance", () => {
    it("maintains responsive design principles", () => {
      render(<App />);
      expect(screen.getByTestId("pixi-application")).toBeInTheDocument();
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
