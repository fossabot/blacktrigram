import {
  Container,
  Graphics,
  Sprite,
  Text,
  AnimatedSprite,
  TilingSprite,
  ParticleContainer,
  BitmapText,
  NineSliceSprite,
  Mesh,
} from "pixi.js";

// PixiJS components to extend for Black Trigram (흑괘)
// Focuses on combat simulation and Korean martial arts UI
const PIXI_COMPONENTS = {
  Container,
  Graphics,
  Sprite,
  Text,
  AnimatedSprite,
  TilingSprite,
  ParticleContainer,
  BitmapText,
  NineSliceSprite,
  Mesh,
};

// Modern hook-based extension for React 19 compatibility
export const usePixiExtensions = () => {
  // For PixiJS React v8, components work with pixi prefixes without explicit extension
  // This hook exists for compatibility but may not be needed
  console.log("🎮 PixiJS extensions hook called for Black Trigram (흑괘)");
};

// Initialize extensions immediately for compatibility
let extensionsInitialized = false;

export const initializePixiExtensions = () => {
  if (extensionsInitialized) return;

  // PixiJS React v8 doesn't require explicit extension
  // Components work automatically with pixi prefixes
  extensionsInitialized = true;
  console.log("🎮 PixiJS components ready for Black Trigram (흑괘)");
};

// Export available component names for type safety
export const AVAILABLE_COMPONENTS = [
  "Container",
  "Graphics",
  "Sprite",
  "Text",
  "AnimatedSprite",
  "TilingSprite",
  "ParticleContainer",
  "BitmapText",
  "NineSliceSprite",
  "Mesh",
] as const;

// Type helper for component validation
export type AvailablePixiComponent = keyof typeof PIXI_COMPONENTS;

// Auto-initialize for immediate use
initializePixiExtensions();
