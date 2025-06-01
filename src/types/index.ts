// Core Korean martial arts game types - UNIFIED SOURCE OF TRUTH
// Re-export all types from their respective modules.

export * from "./common";
export * from "./constants";
export * from "./enums";
export * from "./effects";
export * from "./anatomy";
export * from "./player";
export * from "./combat";
export * from "./trigram";
export * from "./game";
export * from "./ui";
export * from "./audio";
export * from "./components";
export * from "./korean-text";
export * from "./systems";

// Re-export PixiReactElementProps from @pixi/react, assuming pixi-react.d.ts has augmented it.
export type { PixiReactElementProps } from "@pixi/react";
