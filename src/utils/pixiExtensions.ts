// Note: @pixi/react v8 doesn't use extend API - components are automatically available
// This is a compatibility layer for our codebase

export const usePixiExtensions = () => {
  // Components are automatically available in @pixi/react v8
  return true;
};

export const initializePixiExtensions = () => {
  console.log("🎮 PixiJS components ready for Black Trigram (흑괘)");
};

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

// Fix: Remove unused imports by not importing anything
// PixiJS React v8 automatically provides components
