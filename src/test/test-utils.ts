// Test utilities for Black Trigram Korean martial arts game

import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { AudioProvider } from "../audio/AudioProvider";
import { vi } from "vitest";

// Mock Application wrapper for testing
const MockApplication: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return React.createElement(
    "div",
    { "data-testid": "mock-pixi-app" },
    children
  );
};

// Custom render function for Korean martial arts components
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  withAudio?: boolean;
  withPixi?: boolean;
}

export function renderWithProviders(
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) {
  const { withAudio = true, withPixi = true, ...renderOptions } = options;

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    let content = children;

    if (withPixi) {
      content = React.createElement(MockApplication, { children: content });
    }

    if (withAudio) {
      content = React.createElement(AudioProvider, { children: content });
    }

    return content as React.ReactElement;
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Mock renderWithPixi function for TypeScript compatibility
export function renderWithPixi(component: any, options: any = {}) {
  // This is a simplified mock for TypeScript compatibility
  // The actual implementation is in test-utils.tsx
  console.log("Mock renderWithPixi called");
  return {
    getByTestId: vi.fn(),
    getByText: vi.fn(),
    findByTestId: vi.fn(),
    container: document.createElement("div"),
  };
}

// Enhanced mock for PixiJS React components
export const renderWithPixi = (ui: ReactElement, options?: RenderOptions) => {
  console.log("Mock renderWithPixi called");

  // Mock PixiJS components as div elements for testing
  const mockPixiComponents = {
    Application: ({ children, ...props }: any) => (
      <div data-testid="pixi-application" {...props}>
        {children}
      </div>
    ),
    Container: ({ children, ...props }: any) => (
      <div data-testid="pixi-container" {...props}>
        {children}
      </div>
    ),
    Graphics: (props: any) => <div data-testid="pixi-graphics" {...props} />,
    Text: ({ text, ...props }: any) => (
      <div data-testid="pixi-text" {...props}>
        {text}
      </div>
    ),
    Sprite: (props: any) => <div data-testid="pixi-sprite" {...props} />,
  };

  // Mock @pixi/react components globally
  vi.doMock("@pixi/react", () => ({
    ...mockPixiComponents,
    Stage: mockPixiComponents.Container,
    useApp: () => mockPixiApp,
  }));

  return render(ui, options);
};

// Korean martial arts specific test helpers
export const koreanTestHelpers = {
  mockPlayerState: {
    id: "test_player",
    name: { korean: "테스트", english: "Test" },
    health: 100,
    maxHealth: 100,
    ki: 100,
    maxKi: 100,
    stamina: 100,
    maxStamina: 100,
  },

  mockKoreanTechnique: {
    id: "test_technique",
    name: { korean: "테스트 기법", english: "Test Technique" },
    damage: 20,
    kiCost: 10,
    staminaCost: 15,
  },
};

// Re-export everything from @testing-library/react
export * from "@testing-library/react";
