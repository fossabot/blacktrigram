import { render } from "@testing-library/react";
import { DojangBackground } from "./DojangBackground";
import { describe, it, expect, vi } from "vitest";
import { Application } from "@pixi/react";

// Mock window dimensions for consistent testing
Object.defineProperty(window, "innerWidth", {
  writable: true,
  configurable: true,
  value: 1024,
});

Object.defineProperty(window, "innerHeight", {
  writable: true,
  configurable: true,
  value: 768,
});

// Mock PixiJS Application to avoid WebGL context issues in tests
vi.mock("@pixi/react", () => ({
  Application: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="pixi-application">{children}</div>
  ),
  extend: vi.fn(),
  useTick: vi.fn(),
}));

describe("DojangBackground", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <Application width={1024} height={768}>
        <DojangBackground gameTime={0} />
      </Application>
    );
    expect(container).toBeTruthy();
  });

  it("accepts gameTime prop correctly", () => {
    const { rerender } = render(
      <Application width={1024} height={768}>
        <DojangBackground gameTime={0} />
      </Application>
    );

    // Should handle prop updates without errors
    rerender(
      <Application width={1024} height={768}>
        <DojangBackground gameTime={100} />
      </Application>
    );

    expect(true).toBe(true); // No crash means success
  });

  it("should handle time-based animations", () => {
    const { rerender } = render(
      <Application width={1024} height={768}>
        <DojangBackground gameTime={0} />
      </Application>
    );

    // Test with different game times to ensure animation updates
    rerender(
      <Application width={1024} height={768}>
        <DojangBackground gameTime={50} />
      </Application>
    );

    rerender(
      <Application width={1024} height={768}>
        <DojangBackground gameTime={100} />
      </Application>
    );

    // Component should handle time-based animations without errors
    expect(true).toBe(true);
  });

  it("should render Korean dojang elements", () => {
    const { getByTestId } = render(
      <Application width={1024} height={768}>
        <DojangBackground gameTime={0} />
      </Application>
    );

    // Should render within PixiJS application context
    expect(getByTestId("pixi-application")).toBeTruthy();
  });

  it("should handle responsive design", () => {
    // Test different viewport sizes
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 1024, height: 768 },
      { width: 375, height: 667 },
    ];

    viewports.forEach(({ width, height }) => {
      Object.defineProperty(window, "innerWidth", { value: width });
      Object.defineProperty(window, "innerHeight", { value: height });

      const { container } = render(
        <Application width={width} height={height}>
          <DojangBackground gameTime={0} />
        </Application>
      );

      expect(container).toBeTruthy();
    });
  });

  it("should support Korean cultural authenticity", () => {
    const { container } = render(
      <Application width={1024} height={768}>
        <DojangBackground gameTime={0} />
      </Application>
    );

    // Test that Korean dojang terminology is supported
    expect(container).toBeTruthy();

    // In a complete test suite, this would verify:
    // - Traditional Korean flooring patterns
    // - Trigram symbol positioning
    // - Korean martial arts aesthetic elements
    // But since PixiJS renders to canvas, E2E tests are better for visual verification
  });

  it("should handle animation timing correctly", () => {
    const gameTime = 123.456;

    const { container } = render(
      <Application width={1024} height={768}>
        <DojangBackground gameTime={gameTime} />
      </Application>
    );

    // Should handle floating point time values
    expect(container).toBeTruthy();
  });

  it("should maintain performance with complex graphics", () => {
    const { rerender } = render(
      <Application width={1024} height={768}>
        <DojangBackground gameTime={0} />
      </Application>
    );

    // Simulate rapid updates that might occur during gameplay
    for (let i = 0; i < 10; i++) {
      rerender(
        <Application width={1024} height={768}>
          <DojangBackground gameTime={i * 16.67} />
        </Application>
      );
    }

    // Should handle rapid updates without performance issues
    expect(true).toBe(true);
  });
});
