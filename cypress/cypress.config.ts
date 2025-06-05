import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Register custom tasks for testing
      on("task", {
        // Log messages to console
        log(message) {
          console.log(message);
          return null;
        },

        // Silent task to suppress WebGL warnings
        silenceWebGLWarning() {
          return null;
        },
      });
    },
    baseUrl: "http://localhost:5173",
    supportFile: "cypress/support/e2e.ts",
    video: false,
    screenshotOnRunFailure: true,
  },
});
