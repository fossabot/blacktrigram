// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Task to silence WebGL warnings
Cypress.on("window:before:load", (win) => {
  // Silence console errors related to WebGL
  const originalConsoleError = win.console.error;
  win.console.error = (...args) => {
    // Don't log errors about WebGL context to keep test output clean
    if (
      args[0]?.includes &&
      (args[0].includes("WebGL") ||
        args[0].includes("browser does not support WebGL"))
    ) {
      return;
    }
    originalConsoleError(...args);
  };
});

// Don't automatically apply WebGL mocking in before each hook
// This avoids double-mocking when using visitWithWebGLMock
// beforeEach(() => {
//   cy.mockWebGL();
// });
