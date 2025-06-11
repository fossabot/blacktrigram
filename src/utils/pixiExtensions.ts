// PIXI React v8 hook for component extensions
import { useExtend, extend } from "@pixi/react";
import {
  Container,
  Graphics,
  Text,
  Sprite,
  AnimatedSprite,
  TilingSprite,
  ParticleContainer,
  BitmapText,
} from "pixi.js";

// Extend PixiJS components for React usage
extend({
  Container,
  Graphics,
  Text,
  Sprite,
  AnimatedSprite,
});

/**
 * Hook to ensure PixiJS extensions are loaded
 */
export function usePixiExtensions() {
  // Extensions are loaded via the extend call above
  // This hook can be used to ensure proper loading order
  return true;
}

// Re-export useTick for convenience
export { useTick } from "@pixi/react";

// Available component list for reference
export const AVAILABLE_PIXI_COMPONENTS = [
  "pixiContainer",
  "pixiGraphics",
  "pixiText",
  "pixiSprite",
  "pixiAnimatedSprite",
  "pixiTilingSprite",
  "pixiParticleContainer",
  "pixiBitmapText",
] as const;

/**
 * PixiJS extension utilities for Black Trigram
 */
export const PixiExtensions = {
  /**
   * Check if PixiJS is properly initialized
   */
  isInitialized: () => {
    return typeof window !== "undefined" && window.PIXI !== undefined;
  },

  /**
   * Get PixiJS version information
   */
  getVersion: () => {
    if (typeof window !== "undefined" && window.PIXI) {
      return window.PIXI.VERSION;
    }
    return "Unknown";
  },
} as const;

export default {
  usePixiExtensions,
  PixiExtensions,
};
