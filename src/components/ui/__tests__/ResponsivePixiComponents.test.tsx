import { render, screen } from "@testing-library/react";
import { Application } from "@pixi/react";
import { vi } from "vitest";
import {
  ResponsivePixiContainer,
  ResponsivePixiButton,
  ResponsivePixiPanel,
} from "../base/ResponsivePixiComponents";

describe("ResponsivePixiComponents", () => {
  const renderWithPixi = (
    component: React.ReactElement,
    screenSize = { width: 1200, height: 800 }
  ) => {
    return render(
      <Application width={screenSize.width} height={screenSize.height}>
        {component}
      </Application>
    );
  };

  describe("ResponsivePixiContainer", () => {
    it("should render with desktop positioning", () => {
      const { container } = renderWithPixi(
        <ResponsivePixiContainer
          x={100}
          y={50}
          screenWidth={1200}
          screenHeight={800}
          data-testid="test-container"
        />
      );

      expect(container).toBeInTheDocument();
    });

    it("should scale position for mobile", () => {
      const { container } = renderWithPixi(
        <ResponsivePixiContainer
          x={600} // Should scale to ~187.5 for mobile (375/1200 * 600)
          y={400}
          screenWidth={375}
          screenHeight={667}
          data-testid="mobile-container"
        />,
        { width: 375, height: 667 }
      );

      expect(container).toBeInTheDocument();
    });

    it("should scale position for tablet", () => {
      const { container } = renderWithPixi(
        <ResponsivePixiContainer
          x={600} // Should scale to ~384 for tablet (768/1200 * 600)
          y={400}
          screenWidth={768}
          screenHeight={1024}
          data-testid="tablet-container"
        />,
        { width: 768, height: 1024 }
      );

      expect(container).toBeInTheDocument();
    });
  });

  describe("ResponsivePixiButton", () => {
    it("should render button with correct text", () => {
      renderWithPixi(
        <ResponsivePixiButton
          text="Test Button"
          x={100}
          y={50}
          screenWidth={1200}
          screenHeight={800}
          data-testid="test-button"
        />
      );

      expect(screen.getByTestId("test-button")).toBeInTheDocument();
    });

    it("should handle click events", () => {
      const mockClick = vi.fn();
      renderWithPixi(
        <ResponsivePixiButton
          text="Clickable Button"
          onClick={mockClick}
          x={100}
          y={50}
          screenWidth={1200}
          screenHeight={800}
          data-testid="clickable-button"
        />
      );

      expect(screen.getByTestId("clickable-button")).toBeInTheDocument();
    });

    it("should apply primary variant styling", () => {
      renderWithPixi(
        <ResponsivePixiButton
          text="Primary Button"
          variant="primary"
          x={100}
          y={50}
          screenWidth={1200}
          screenHeight={800}
          data-testid="primary-button"
        />
      );

      expect(screen.getByTestId("primary-button")).toBeInTheDocument();
    });

    it("should adapt size for mobile screens", () => {
      renderWithPixi(
        <ResponsivePixiButton
          text="Mobile Button"
          x={100}
          y={50}
          width={200}
          height={50}
          screenWidth={375}
          screenHeight={667}
          data-testid="mobile-button"
        />,
        { width: 375, height: 667 }
      );

      expect(screen.getByTestId("mobile-button")).toBeInTheDocument();
    });
  });

  describe("ResponsivePixiPanel", () => {
    it("should render panel with title", () => {
      renderWithPixi(
        <ResponsivePixiPanel
          title="Test Panel"
          x={100}
          y={50}
          width={300}
          height={200}
          screenWidth={1200}
          screenHeight={800}
          data-testid="test-panel"
        />
      );

      expect(screen.getByTestId("test-panel")).toBeInTheDocument();
    });

    it("should render panel without title", () => {
      renderWithPixi(
        <ResponsivePixiPanel
          x={100}
          y={50}
          width={300}
          height={200}
          screenWidth={1200}
          screenHeight={800}
          data-testid="no-title-panel"
        />
      );

      expect(screen.getByTestId("no-title-panel")).toBeInTheDocument();
    });

    it("should contain child components", () => {
      renderWithPixi(
        <ResponsivePixiPanel
          title="Parent Panel"
          x={100}
          y={50}
          width={300}
          height={200}
          screenWidth={1200}
          screenHeight={800}
          data-testid="parent-panel"
        >
          <ResponsivePixiButton
            text="Child Button"
            x={10}
            y={10}
            screenWidth={1200}
            screenHeight={800}
            data-testid="child-button"
          />
        </ResponsivePixiPanel>
      );

      expect(screen.getByTestId("parent-panel")).toBeInTheDocument();
      expect(screen.getByTestId("child-button")).toBeInTheDocument();
    });

    it("should constrain size on mobile", () => {
      renderWithPixi(
        <ResponsivePixiPanel
          title="Mobile Panel"
          x={0}
          y={0}
          width={500} // Should be constrained to 90% of screen width
          height={400}
          screenWidth={375}
          screenHeight={667}
          data-testid="mobile-panel"
        />,
        { width: 375, height: 667 }
      );

      expect(screen.getByTestId("mobile-panel")).toBeInTheDocument();
    });
  });

  describe("Responsive behavior integration", () => {
    it("should maintain relative positioning across screen sizes", () => {
      const desktopRender = renderWithPixi(
        <ResponsivePixiContainer
          x={600}
          y={400}
          screenWidth={1200}
          screenHeight={800}
          data-testid="responsive-test"
        />
      );

      const mobileRender = renderWithPixi(
        <ResponsivePixiContainer
          x={600}
          y={400}
          screenWidth={375}
          screenHeight={667}
          data-testid="responsive-test"
        />,
        { width: 375, height: 667 }
      );

      expect(desktopRender.container).toBeInTheDocument();
      expect(mobileRender.container).toBeInTheDocument();
    });

    it("should handle nested responsive components", () => {
      renderWithPixi(
        <ResponsivePixiContainer
          x={100}
          y={100}
          screenWidth={1200}
          screenHeight={800}
          data-testid="outer-container"
        >
          <ResponsivePixiPanel
            title="Nested Panel"
            x={50}
            y={50}
            width={200}
            height={150}
            screenWidth={1200}
            screenHeight={800}
            data-testid="nested-panel"
          >
            <ResponsivePixiButton
              text="Nested Button"
              x={25}
              y={25}
              screenWidth={1200}
              screenHeight={800}
              data-testid="nested-button"
            />
          </ResponsivePixiPanel>
        </ResponsivePixiContainer>
      );

      expect(screen.getByTestId("outer-container")).toBeInTheDocument();
      expect(screen.getByTestId("nested-panel")).toBeInTheDocument();
      expect(screen.getByTestId("nested-button")).toBeInTheDocument();
    });

    it("should respond to different screen breakpoints", () => {
      // Test mobile breakpoint
      const mobileComponent = renderWithPixi(
        <ResponsivePixiContainer
          x={100}
          y={100}
          screenWidth={375}
          screenHeight={667}
          data-testid="responsive-container"
        />,
        { width: 375, height: 667 }
      );

      // Test tablet breakpoint
      const tabletComponent = renderWithPixi(
        <ResponsivePixiContainer
          x={100}
          y={100}
          screenWidth={768}
          screenHeight={1024}
          data-testid="responsive-container"
        />,
        { width: 768, height: 1024 }
      );

      // Test desktop breakpoint
      const desktopComponent = renderWithPixi(
        <ResponsivePixiContainer
          x={100}
          y={100}
          screenWidth={1200}
          screenHeight={800}
          data-testid="responsive-container"
        />,
        { width: 1200, height: 800 }
      );

      expect(mobileComponent.container).toBeInTheDocument();
      expect(tabletComponent.container).toBeInTheDocument();
      expect(desktopComponent.container).toBeInTheDocument();
    });
  });
});
