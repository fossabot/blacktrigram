/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
    // Enhanced coverage for Korean martial arts game
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "node_modules/",
        "src/test/setup.ts",
        "**/*.d.ts",
        "**/*.config.*",
        "dist/",
        "coverage/",
        "cypress/",
        // Exclude placeholder/fallback files during development
        "**/placeholder-sounds.ts",
        "**/DefaultSoundGenerator.ts",
      ],
      thresholds: {
        global: {
          branches: 85, // Increased for Korean martial arts precision
          functions: 85,
          lines: 85,
          statements: 85,
        },
        // Specific thresholds for critical Korean martial arts systems
        "src/audio/": {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90,
        },
        "src/components/game/": {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
    // Test timeout for Korean martial arts audio loading
    testTimeout: 10000,
    // Enhanced test patterns
    include: [
      "src/**/*.{test,spec}.{js,ts,tsx}",
      "src/**/__tests__/**/*.{js,ts,tsx}",
    ],
    // Mock Korean font loading
    mockReset: true,
    clearMocks: true,
    restoreMocks: true,
  },
});
