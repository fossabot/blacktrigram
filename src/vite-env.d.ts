/// <reference types="vite/client" />
/// <reference types="react" />

// Extend global JSX namespace for PixiJS React components
declare global {
  namespace JSX {
    interface IntrinsicElements {
      pixiContainer: any;
      pixiGraphics: any;
      pixiText: any;
      pixiSprite: any;
    }

    // Use React's JSX.Element
    type Element = React.ReactElement<any, any> | null;
  }
}

// Environment variables for Korean martial arts game
interface ImportMetaEnv {
  readonly VITE_GAME_VERSION: string;
  readonly VITE_DOJANG_NAME: string;
  readonly VITE_ENABLE_DEBUG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
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
