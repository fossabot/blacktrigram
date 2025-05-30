import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Stage } from "@pixi/react";
import { DojangBackground } from "./DojangBackground";

describe("DojangBackground", () => {
  it("should render without crashing", () => {
    expect(() => {
      render(
        <Stage>
          <DojangBackground width={800} height={600} />
        </Stage>
      );
    }).not.toThrow();
  });

  it("should handle different dimensions", () => {
    const testDimensions = [
      { width: 1024, height: 768 },
      { width: 1920, height: 1080 },
      { width: 800, height: 600 },
    ];

    testDimensions.forEach(({ width, height }) => {
      expect(() => {
        render(
          <Stage>
            <DojangBackground width={width} height={height} />
          </Stage>
        );
      }).not.toThrow();
    });
  });

  it("should accept custom dimensions", () => {
    const customWidth = 1024;
    const customHeight = 768;

    expect(() => {
      render(
        <Stage>
          <DojangBackground width={customWidth} height={customHeight} />
        </Stage>
      );
    }).not.toThrow();
  });

  it("should render consistently across multiple renders", () => {
    for (let i = 0; i < 3; i++) {
      expect(() => {
        render(
          <Stage>
            <DojangBackground width={800} height={600} />
          </Stage>
        );
      }).not.toThrow();
    }
  });
});
