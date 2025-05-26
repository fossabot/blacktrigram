import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { extendSpy } from "./test/setup";

describe("Black Trigram Intro Page", () => {
  let App: React.ComponentType;

  beforeEach(async () => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Clear the extend spy call history
    extendSpy.mockClear();

    // Reset module cache to ensure fresh import
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

  it("renders the PixiJS Application with full-screen dimensions", () => {
    render(<App />);
    const pixiApp = screen.getByTestId("pixi-application");
    expect(pixiApp).toBeInTheDocument();
    expect(pixiApp).toHaveAttribute("data-width", "1920");
    expect(pixiApp).toHaveAttribute("data-height", "1080");
  });

  it("has the correct app container structure", () => {
    render(<App />);

    // Check for main container with full-screen styling
    const container = document.querySelector(".app-container");
    expect(container).toBeInTheDocument();

    // Verify no old game elements are present
    expect(screen.queryByText(/PixiJS React Game/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Click the circle to score points/i)
    ).not.toBeInTheDocument();
  });

  it("calls extend function with correct PixiJS components", () => {
    // The extend function should have been called when App.tsx was imported
    expect(extendSpy).toHaveBeenCalled();
    expect(extendSpy).toHaveBeenCalledWith({
      Container: expect.any(Function),
      Graphics: expect.any(Function),
      Text: expect.any(Function),
    });
  });

  it("renders with black background theme", () => {
    render(<App />);
    const pixiApp = screen.getByTestId("pixi-application");
    expect(pixiApp).toHaveAttribute("data-background-color", "0");
  });

  it("applies full-screen styling", () => {
    render(<App />);
    const container = document.querySelector(".app-container");

    // Verify container has full-screen positioning
    const styles = window.getComputedStyle(container!);
    expect(styles.position).toBe("fixed");
    expect(styles.width).toBe("100vw");
    expect(styles.height).toBe("100vh");
  });

  it("has Korean font family applied", () => {
    render(<App />);

    // Check if Korean font is applied to body
    const bodyStyles = window.getComputedStyle(document.body);
    expect(bodyStyles.fontFamily).toContain("Noto Sans KR");
  });

  it("maintains component structure for game content", () => {
    render(<App />);

    // Verify the app renders without errors
    const pixiApp = screen.getByTestId("pixi-application");
    expect(pixiApp).toBeInTheDocument();

    // The actual game content is rendered via PixiJS, so we mainly test
    // that the container structure is correct
    expect(document.querySelector(".app-container")).toBeInTheDocument();
  });

  it("uses correct PixiJS Application configuration", () => {
    render(<App />);
    const pixiApp = screen.getByTestId("pixi-application");

    // Verify the application is configured correctly
    expect(pixiApp).toHaveAttribute("data-antialias", "true");
    // Note: resizeTo prop doesn't create a data attribute, so we don't test for it
    // The resizeTo={window} prop is handled internally by PixiJS
  });
});
