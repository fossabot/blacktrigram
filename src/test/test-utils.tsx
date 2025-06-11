import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Application, extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import { AudioProvider } from "../audio/AudioProvider";

// Extend PIXI React with necessary components
extend({
  Container,
  Graphics,
  Text,
});

// Custom render function for components that need PixiJS
export function renderWithPixi(
  ui: React.ReactElement,
  options: RenderOptions = {}
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <AudioProvider>
      <Application
        width={800}
        height={600}
        preference="webgl"
        data-testid="mock-pixi-app"
      >
        {children}
      </Application>
    </AudioProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
}

// Re-export everything from testing library
export * from "@testing-library/react";
export { render } from "@testing-library/react";
