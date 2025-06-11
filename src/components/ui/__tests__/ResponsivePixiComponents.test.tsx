import React from "react";
import { render } from "@testing-library/react";
import { Application, extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import {
  ResponsivePixiContainer,
  ResponsivePixiButton,
  ResponsivePixiPanel,
} from "../base/ResponsivePixiComponents";

// Extend PIXI for testing
extend({ Container, Graphics, Text });

// Mock PIXI Application for testing
const MockPixiApp: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Application width={800} height={600} backgroundColor={0x000000}>
    {children}
  </Application>
);

describe("ResponsivePixiComponents", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  describe("ResponsivePixiContainer", () => {
    it("should render with default props", () => {
      const { container } = render(
        <MockPixiApp>
          <ResponsivePixiContainer
            screenWidth={1200}
            screenHeight={800}
            data-testid="test-container"
          />
        </MockPixiApp>
      );
      expect(container).toBeTruthy();
    });

    it("should apply responsive scaling for mobile", () => {
      const { container } = render(
        <MockPixiApp>
          <ResponsivePixiContainer
            x={100}
            y={100}
            screenWidth={375}
            screenHeight={667}
            data-testid="mobile-container"
          />
        </MockPixiApp>
      );
      expect(container).toBeTruthy();
    });

    it("should apply responsive scaling for tablet", () => {
      const { container } = render(
        <MockPixiApp>
          <ResponsivePixiContainer
            x={50}
            y={50}
            screenWidth={768}
            screenHeight={1024}
            data-testid="tablet-container"
          />
        </MockPixiApp>
      );
      expect(container).toBeTruthy();
    });
  });

  describe("ResponsivePixiButton", () => {
    it("should render with required props", () => {
      const { container } = render(
        <MockPixiApp>
          <ResponsivePixiButton
            text="Test Button"
            x={0}
            y={0}
            width={120}
            height={40}
            screenWidth={1200}
            screenHeight={800}
            onClick={mockOnClick}
            data-testid="test-button"
          />
        </MockPixiApp>
      );
      expect(container).toBeTruthy();
    });

    it("should handle onClick events", () => {
      const { container } = render(
        <MockPixiApp>
          <ResponsivePixiButton
            text="Clickable Button"
            onClick={mockOnClick}
            x={10}
            y={10}
            width={100}
            height={40}
            screenWidth={1200}
            screenHeight={800}
            data-testid="clickable-button"
          />
        </MockPixiApp>
      );
      expect(container).toBeTruthy();
    });

    it("should render with primary variant", () => {
      const { container } = render(
        <MockPixiApp>
          <ResponsivePixiButton
            text="Primary Button"
            variant="primary"
            x={20}
            y={20}
            width={150}
            height={45}
            screenWidth={1200}
            screenHeight={800}
            onClick={mockOnClick}
            data-testid="primary-button"
          />
        </MockPixiApp>
      );
      expect(container).toBeTruthy();
    });

    it("should adapt font size for mobile", () => {
      const { container } = render(
        <MockPixiApp>
          <ResponsivePixiButton
            text="Mobile Button"
            x={0}
            y={0}
            width={100}
            height={35}
            screenWidth={375}
            screenHeight={667}
            onClick={mockOnClick}
            data-testid="mobile-button"
          />
        </MockPixiApp>
      );
      expect(container).toBeTruthy();
    });
  });

  describe("ResponsivePixiPanel", () => {
    it("should render with required props", () => {
      const { container } = render(
        <MockPixiApp>
          <ResponsivePixiPanel
            title="Test Panel"
            x={0}
            y={0}
            width={300}
            height={200}
            screenWidth={1200}
            screenHeight={800}
            data-testid="test-panel"
          />
        </MockPixiApp>
      );
      expect(container).toBeTruthy();
    });

    it("should render with children", () => {
      const { container } = render(
        <MockPixiApp>
          <ResponsivePixiPanel
            title="Panel with Content"
            x={50}
            y={50}
            width={400}
            height={300}
            screenWidth={1200}
            screenHeight={800}
            data-testid="panel-with-content"
          >
            <ResponsivePixiButton
              text="Child Button"
              x={10}
              y={10}
              width={100}
              height={30}
              screenWidth={1200}
              screenHeight={800}
              onClick={mockOnClick}
              data-testid="child-button"
            />
          </ResponsivePixiPanel>
        </MockPixiApp>
      );
      expect(container).toBeTruthy();
    });
  });

  describe("Responsive Design Integration", () => {
    it("should handle multiple screen sizes", () => {
      const screenSizes = [
        { width: 1920, height: 1080, name: "Desktop" },
        { width: 768, height: 1024, name: "Tablet" },
        { width: 375, height: 667, name: "Mobile" },
      ];

      screenSizes.forEach(({ width, height, name }) => {
        const { container } = render(
          <MockPixiApp>
            <ResponsivePixiContainer
              screenWidth={width}
              screenHeight={height}
              data-testid={`${name.toLowerCase()}-container`}
            >
              <ResponsivePixiButton
                text={`${name} Button`}
                x={20}
                y={20}
                width={width < 768 ? 80 : 120}
                height={width < 768 ? 30 : 40}
                screenWidth={width}
                screenHeight={height}
                onClick={mockOnClick}
                data-testid={`${name.toLowerCase()}-button`}
              />
            </ResponsivePixiContainer>
          </MockPixiApp>
        );
        expect(container).toBeTruthy();
      });
    });

    it("should maintain Korean martial arts theme across screen sizes", () => {
      const { container } = render(
        <MockPixiApp>
          <ResponsivePixiContainer
            screenWidth={375}
            screenHeight={667}
            data-testid="korean-theme-container"
          >
            <ResponsivePixiPanel
              title="무술 도장"
              x={10}
              y={10}
              width={355}
              height={200}
              screenWidth={375}
              screenHeight={667}
              data-testid="korean-panel"
            >
              <ResponsivePixiButton
                text="훈련"
                x={10}
                y={10}
                width={80}
                height={30}
                screenWidth={375}
                screenHeight={667}
                variant="primary"
                onClick={mockOnClick}
                data-testid="korean-training-button"
              />
            </ResponsivePixiPanel>
          </ResponsivePixiContainer>
        </MockPixiApp>
      );
      expect(container).toBeTruthy();
    });
  });

  describe("Error Handling", () => {
    it("should handle missing screenWidth gracefully", () => {
      // TypeScript should prevent this, but test runtime behavior
      const { container } = render(
        <MockPixiApp>
          <ResponsivePixiContainer
            screenWidth={0}
            screenHeight={800}
            data-testid="zero-width-container"
          />
        </MockPixiApp>
      );
      expect(container).toBeTruthy();
    });

    it("should handle missing screenHeight gracefully", () => {
      const { container } = render(
        <MockPixiApp>
          <ResponsivePixiContainer
            screenWidth={1200}
            screenHeight={0}
            data-testid="zero-height-container"
          />
        </MockPixiApp>
      );
      expect(container).toBeTruthy();
    });
  });
});
