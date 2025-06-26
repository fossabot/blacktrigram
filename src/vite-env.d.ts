/// <reference types="vite/client" />
/// <reference types="react" />

import type { Application, Container, Graphics, Sprite, Text } from "pixi.js";

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_API_URL: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly APP_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const APP_VERSION: string;

// Global JSX declarations for PixiJS components
declare global {
  namespace JSX {
    interface IntrinsicElements {
      pixiContainer: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      pixiGraphics: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        draw?: (graphics: Graphics) => void;
      };
      pixiText: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      pixiSprite: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }

    // Fix JSX.Element for React 18
    interface Element
      extends React.ReactElement<React.ComponentProps<any>, any> {}
  }

  // Fix PIXI global namespace
  namespace PIXI {
    export { Graphics, Container, Text, Sprite, Application };
  }
}

// Declare module for @pixi/react compatibility
declare module "@pixi/react" {
  export * from "@pixi/react/lib/index";
}

// Game asset type declarations
declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.mp3" {
  const src: string;
  export default src;
}

declare module "*.wav" {
  const src: string;
  export default src;
}
