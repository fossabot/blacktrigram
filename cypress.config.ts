import { defineConfig } from "cypress";

// Centralize report directories with proper typing
const REPORTS_BASE_DIR = "cypress";
const REPORTS = {
  junit: `${REPORTS_BASE_DIR}/junit`,
  mochawesome: `${REPORTS_BASE_DIR}/mochawesome`,
  videos: `${REPORTS_BASE_DIR}/videos`,
  screenshots: `${REPORTS_BASE_DIR}/screenshots`,
  artifacts: `${REPORTS_BASE_DIR}/artifacts`,
} as const;

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    testIsolation: true,
    retries: {
      runMode: 2,
      openMode: 1,
    },
    defaultCommandTimeout: 8000, // Enhanced type support
    requestTimeout: 10000, // Better error handling for PixiJS
    responseTimeout: 10000,
    pageLoadTimeout: 20000,
    chromeWebSecurity: false,
    video: true, // Enable video recording for failed tests
    videoCompression: 32, // Set video compression level
    videosFolder: "cypress/videos",
    screenshotsFolder: "cypress/screenshots",
    downloadsFolder: "cypress/downloads",
    fixturesFolder: "cypress/fixtures",
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 10, // Keep only one test in memory for performance
    experimentalRunAllSpecs: true, // Enable parallel test execution
    screenshotOnRunFailure: true, // Enable screenshots on failure
    env: {
      GAME_SPEED: 1.0,
      DISABLE_AUDIO: true,
      MOCK_WEBGL: true,
    },
    setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Cypress.PluginConfigOptions {
      // Register custom tasks for testing
      on("task", {
        // Log messages to console
        log(message) {
          console.log(message);
          return null;
        },

        // Performance logging for PixiJS tests
        logPerformance(metrics: { name: string; duration: number }) {
          console.log(
            `⚡ Performance: ${metrics.name} took ${metrics.duration}ms`
          );
          return null;
        },
      });

      // Suppress WebGL warnings in browser console
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.family === "chromium" && browser.name !== "electron") {
          launchOptions.args.push("--enable-unsafe-swiftshader");
          launchOptions.args.push("--disable-web-security");
          launchOptions.args.push("--disable-features=VizDisplayCompositor");
          launchOptions.args.push("--log-level=3"); // Suppress WebGL warnings
          launchOptions.args.push("--disable-logging");
          launchOptions.args.push("--silent");
        }
        return launchOptions;
      });

      return config;
    },
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: {
        optimizeDeps: {
          include: ["@pixi/react", "pixi.js"],
        },
      },
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/component.ts",
    experimentalMemoryManagement: true,
  },
});
