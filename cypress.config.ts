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
      openMode: 0,
    },
    defaultCommandTimeout: 10000, // Enhanced type support
    requestTimeout: 15000, // Better error handling for PixiJS
    responseTimeout: 15000,
    pageLoadTimeout: 15000,
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
      // Suppress WebGL warnings
      on("task", {
        silenceWebGLWarning() {
          return null;
        },
        logPerformance({ name, duration }) {
          console.log(`⚡ Performance: ${name} took ${duration}ms`);
          return null;
        },
        log(message) {
          console.log(message);
          return null;
        },
      });

      // Configure browser launch options for WebGL
      on("before:browser:launch", (browser, launchOptions) => {
        // Add flags to suppress WebGL warnings
        if (browser.name === "electron" || browser.name === "chrome") {
          launchOptions.args = [
            ...(launchOptions.args || []),
            "--enable-unsafe-swiftshader",
            "--disable-gpu",
            "--disable-gpu-vsync",
            "--disable-web-security",
            "--ignore-gpu-blacklist",
            "--disable-site-isolation-trials",
            "--disable-features=VizDisplayCompositor",
            "--disable-logging",
            "--log-level=3",
            "--mute-audio",
          ];
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
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/component.ts",
    experimentalMemoryManagement: true,
  },
});
