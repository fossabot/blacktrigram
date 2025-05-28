// ***********************************************************
// This support/e2e.ts file is processed and loaded automatically
// before your test files.
//
// This is a great place to put global configuration and behavior
// that modifies Cypress.
// ***********************************************************

// Import commands using ES module syntax
import "./commands";

// Add CSS for animations and annotations
const style = document.createElement("style");
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .cypress-annotation {
    position: fixed;
    top: 10px;
    right: 10px;
    padding: 8px 12px;
    background: rgba(0, 0, 0, 0.7);
    color: #00ffd0;
    border: 1px solid #00ffd0;
    border-radius: 4px;
    font-family: monospace;
    font-size: 14px;
    z-index: 9999;
    pointer-events: none;
    box-shadow: 0 0 10px rgba(0, 255, 208, 0.5);
    animation: fadeIn 0.3s ease-in-out;
  }
`;
document.head.appendChild(style);

// Add type declaration for cleanLog command
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to log messages without WebGL warnings
       * @param message The message to log
       * @example cy.cleanLog('Testing Korean martial arts interactions')
       */
      cleanLog(message: string): Chainable<void>;

      // Add other custom commands types here...
    }
  }
}

// Enhanced WebGL warning suppression
const suppressWebGLPattern =
  /(WebGL|GL_|GPU stall|swiftshader|GPU|RENDER WARNING)/i;

// Aggressively silence all WebGL warnings
Cypress.on("console:log", (message) => {
  if (suppressWebGLPattern.test(message.message)) {
    return false;
  }
  return true;
});

Cypress.on("console:info", (message) => {
  if (suppressWebGLPattern.test(message.message)) {
    return false;
  }
  return true;
});

Cypress.on("console:warn", (message) => {
  if (suppressWebGLPattern.test(message.message)) {
    return false;
  }
  return true;
});

// Silence WebGL errors more aggressively
Cypress.on("console:error", (error) => {
  if (suppressWebGLPattern.test(error.message || "")) {
    return false;
  }
  return true;
});

// Create a custom command for logging without WebGL spam
Cypress.Commands.add("cleanLog", (message: string) => {
  cy.task("silenceWebGLWarning");
  cy.log(message);
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

// Speed up tests by setting configuration to abort quickly on failure
Cypress.on("fail", (error) => {
  // Clean up the error message by removing WebGL warnings
  const cleanError = error.message.replace(/WebGL.*\n/g, "");
  throw new Error(cleanError);
});

// Export the failure state for other modules to use
export { hasTestFailed };
