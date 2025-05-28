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
    defaultCommandTimeout: 3000, // Reduced to speed up failures
    chromeWebSecurity: false,
    video: process.env.CI ? true : false, // Disable video recording to speed up tests
    videosFolder: "cypress/videos",
    screenshotsFolder: "cypress/screenshots",
    downloadsFolder: "cypress/downloads",
    fixturesFolder: "cypress/fixtures",
    responseTimeout: 3000, // Reduced to speed up response handling
    setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Cypress.PluginConfigOptions {
      // Configure browser launch options for WebGL
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === "electron") {
          // For Electron, configure flags correctly
          launchOptions.preferences = {
            ...launchOptions.preferences,
            webPreferences: {
              ...launchOptions.preferences.webPreferences,
              enableWebGL: true,
              backgroundThrottling: false,
            },
          };

          // Set environment variables to silence WebGL warnings
          launchOptions.env = {
            ...launchOptions.env,
            ELECTRON_ENABLE_LOGGING: false,
            ELECTRON_ENABLE_STACK_DUMPING: false,
            NODE_OPTIONS: "--no-warnings",
          };
        } else if (browser.family === "chromium") {
          // For other Chromium browsers
          launchOptions.args.push("--enable-unsafe-swiftshader");
          launchOptions.args.push("--disable-web-security");
          launchOptions.args.push("--disable-features=VizDisplayCompositor");
          launchOptions.args.push("--disable-gpu-watchdog");
          launchOptions.args.push("--mute-audio");

          // Silence WebGL warnings
          launchOptions.args.push("--disable-logging");
          launchOptions.args.push("--log-level=3");
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

        // Performance metrics logging
        logPerfMetrics({ name, duration }) {
          console.log(`Performance: ${name} - ${duration}ms`);
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
