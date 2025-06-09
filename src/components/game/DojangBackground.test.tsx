import { render } from "@testing-library/react";
import DojangBackground from "../DojangBackground"; // Fix: Use default import

describe("DojangBackground", () => {
  it("renders without crashing", () => {
    expect(() => {
      render(<DojangBackground width={800} height={600} />);
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
        render(<DojangBackground width={width} height={height} />);
      }).not.toThrow();
    });
  });

  it("should accept custom dimensions", () => {
    const customWidth = 1024;
    const customHeight = 768;

    expect(() => {
      render(<DojangBackground width={customWidth} height={customHeight} />);
    }).not.toThrow();
  });

  it("should render consistently across multiple renders", () => {
    for (let i = 0; i < 3; i++) {
      expect(() => {
        render(<DojangBackground width={800} height={600} />);
      }).not.toThrow();
    }
  });
});
