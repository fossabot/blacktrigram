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

// Fix: Only register components once per React tree using a ref
let componentsRegistered = false;

export const usePixiExtensions = () => {
  if (!componentsRegistered) {
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
    componentsRegistered = true;
    console.log("🎮 PixiJS components registered for Black Trigram");
  }
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
