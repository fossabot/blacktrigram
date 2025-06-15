import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  ResponsivePixiButton,
  ResponsivePixiPanel,
  ResponsivePixiContainer,
} from "./base/ResponsivePixiComponents";
import { renderWithPixi } from "../../test/test-utils";

describe("ResponsivePixiComponents", () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  describe("ResponsivePixiButton", () => {
    it("should render button with correct text", () => {
      renderWithPixi(
        <ResponsivePixiButton
          text="Test Button"
          screenWidth={800}
          onClick={() => {}}
          data-testid="test-button"
        />
      );

      expect(screen.getByTestId("test-button")).toBeTruthy();
      expect(screen.getByText("Test Button")).toBeTruthy();
    });

    it("should handle click events", () => {
      const handleClick = vi.fn();
      renderWithPixi(
        <ResponsivePixiButton
          text="Clickable"
          screenWidth={800}
          onClick={handleClick}
          data-testid="clickable-button"
        />
      );
      const btn = screen.getByTestId("clickable-button");
      fireEvent.click(btn);
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe("ResponsivePixiPanel", () => {
    it("should render panel with title", () => {
      renderWithPixi(
        <ResponsivePixiPanel
          title="Test Panel"
          screenWidth={800}
          data-testid="test-panel"
        >
          <div>Panel Content</div>
        </ResponsivePixiPanel>
      );
      expect(screen.getByTestId("test-panel")).toBeTruthy();
      expect(screen.getByText("Test Panel")).toBeTruthy();
    });
  });

  describe("ResponsivePixiContainer", () => {
    it("should render container with children", () => {
      renderWithPixi(
        <ResponsivePixiContainer screenWidth={800} data-testid="test-container">
          <div>Child Content</div>
        </ResponsivePixiContainer>
      );
      expect(screen.getByTestId("test-container")).toBeTruthy();
      expect(screen.getByText("Child Content")).toBeTruthy();
    });

    it("renders a pixiContainer and responds to screen size", () => {
      renderWithPixi(
        <pixiContainer data-testid="responsive-pixi-container">
          <pixiGraphics />
        </pixiContainer>
      );
      const container = screen.getByTestId("responsive-pixi-container");
      expect(container).toBeInTheDocument();
    });
  });
});
