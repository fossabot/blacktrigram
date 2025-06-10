// Test utilities for Black Trigram Korean martial arts game

import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { AudioProvider } from "../audio/AudioProvider";

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
