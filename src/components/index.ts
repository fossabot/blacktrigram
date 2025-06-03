// Main component exports for Black Trigram
export * from "./ui";
export * from "./training";
export * from "./combat";

// Game components
export { GameEngine } from "./game/GameEngine";
export { GameUI } from "./game/GameUI";
export { Player } from "./game/Player";
export { PlayerVisuals } from "./game/PlayerVisuals";
export { HitEffectsLayer } from "./game/HitEffectsLayer";
export { DojangBackground } from "./game/DojangBackground";

// Intro components
export { IntroScreen } from "./intro/IntroScreen";
export { PhilosophySection } from "./intro/components/PhilosophySection";

// Audio components
export { useAudio } from "../audio/AudioManager";
