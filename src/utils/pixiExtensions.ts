// PIXI React v8 hook for component extensions
import { useExtend } from "@pixi/react";
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

// Note: @pixi/react v8 doesn't use extend API - components are automatically available
// This is a compatibility layer for our codebase

export const usePixiExtensions = () => {
  // Use the useExtend hook to register PIXI components
  useExtend({
    Container,
    Graphics,
    Text,
    Sprite,
    AnimatedSprite,
    TilingSprite,
    ParticleContainer,
    BitmapText,
  });

  return true;
};

// Re-export useTick for convenience - Fix: Import from correct location
export { useTick } from "@pixi/react";

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
