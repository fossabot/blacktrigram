// ***********************************************************
// This support/e2e.ts file is processed and loaded automatically
// before your test files.
//
// This is a great place to put global configuration and behavior
// that modifies Cypress.
// ***********************************************************

// Import commands using ES module syntax
import "./commands";

// You can read more here:
// https://on.cypress.io/configuration

// Add browser launch configuration
Cypress.on("before:browser:launch", (browser, launchOptions) => {
  if (browser.family === "chromium" && browser.name !== "electron") {
    // Add flags to suppress WebGL warnings and enable software rendering
    launchOptions.args.push("--enable-unsafe-swiftshader");
    launchOptions.args.push("--disable-web-security");
    launchOptions.args.push("--disable-features=VizDisplayCompositor");
    launchOptions.args.push("--disable-gpu");
    launchOptions.args.push("--no-sandbox");
    launchOptions.args.push("--disable-dev-shm-usage");
    // Suppress specific WebGL warnings
    launchOptions.args.push("--disable-logging");
    launchOptions.args.push("--silent");
    launchOptions.args.push("--log-level=3");
  }
  return launchOptions;
});

// Silence WebGL warnings at the browser console level
Cypress.on("console:error", (error) => {
  // Filter out WebGL warnings
  if (
    error.message?.includes("WebGL") ||
    error.message?.includes("GL_INVALID") ||
    error.message?.includes("GL Driver Message")
  ) {
    return false; // Don't log these errors
  }
  return true; // Log other errors
});

// Track test failures globally
let hasTestFailed = false;

// More efficient test abort implementation
Cypress.on("test:after:run", (test) => {
  if (test.state === "failed") {
    // Record failure with our custom task
    cy.task("recordFailure").then(() => {
      hasTestFailed = true;

      // Use custom approach to abort tests that's more efficient
      if (Cypress.env("FAIL_FAST") !== false) {
        cy.log("**Test failed, aborting remaining tests**");
        throw new Error("Aborting due to test failure");
      }
    });
  }
});

// Export the failure state for other modules to use
export { hasTestFailed };
