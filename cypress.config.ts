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
  screenshotsFolder: REPORTS.screenshots,
  videosFolder: REPORTS.videos,
  experimentalMemoryManagement: true,
  video: true,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  viewportWidth: 1280,
  viewportHeight: 800,
  waitForAnimations: false,
  pageLoadTimeout: 10000,
  requestTimeout: 5000,
  retries: {
    runMode: 2,
    openMode: 1,
  },
  // Simplified reporter configuration to avoid CommonJS conflicts
  reporter: "spec",
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    testIsolation: true,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    defaultCommandTimeout: 4000,
    chromeWebSecurity: false,
    video: true,
    videosFolder: "cypress/videos",
    screenshotsFolder: "cypress/screenshots",
    downloadsFolder: "cypress/downloads",
    fixturesFolder: "cypress/fixtures",
    responseTimeout: 5000,
    setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Cypress.PluginConfigOptions {
      // Configure browser launch options for WebGL
      on("before:browser:launch", (browser, launchOptions) => {
        // Add flags to improve WebGL performance
        if (browser.family === "chromium") {
          launchOptions.args.push("--enable-unsafe-webgl");
          launchOptions.args.push("--enable-webgl-draft-extensions");
          launchOptions.args.push("--enable-unsafe-swiftshader");
          launchOptions.args.push("--disable-web-security");
          launchOptions.args.push("--disable-features=VizDisplayCompositor");

          // Silence WebGL warnings
          launchOptions.args.push("--disable-logging");
          launchOptions.args.push("--silent");
          launchOptions.args.push("--log-level=3");

          // Performance improvements
          launchOptions.args.push("--js-flags=--expose-gc");
          launchOptions.args.push("--disable-dev-shm-usage");
          launchOptions.args.push("--no-sandbox");
        }
        return launchOptions;
      });

      // Custom task for aborting tests early (fail-fast pattern)
      let shouldAbortTests = false;

      on("task", {
        // Task to record test failures
        recordFailure() {
          shouldAbortTests = true;
          return null;
        },

        // Task to check if we should abort the run
        shouldAbort() {
          return shouldAbortTests;
        },

        // Task to reset the abort flag (for test cleanup)
        resetAbortFlag() {
          shouldAbortTests = false;
          return null;
        },
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
    experimentalMemoryManagement: true,
  },
});
