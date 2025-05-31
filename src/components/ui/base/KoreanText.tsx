// Re-export everything from the refactored korean-text module
export * from "./korean-text";

// Maintain backward compatibility with existing imports
export { KoreanText as default } from "./korean-text";
