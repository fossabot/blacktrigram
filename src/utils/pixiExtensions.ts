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

// Only call this inside a React component!
export const usePixiExtensions = () => {
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
