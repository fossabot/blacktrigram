/// <reference types="cypress" />

// This file is a great place to define custom commands and overwrite existing ones.

// Define custom command types
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Enter training mode from intro screen
       */
      enterTrainingMode(): Chainable<JQuery<HTMLCanvasElement>>;

      /**
       * Practice a specific stance in training mode
       * @param stanceNumber Stance number (1-8)
       * @param repetitions Number of practice repetitions
       */
      practiceStance(
        stanceNumber: number,
        repetitions: number
      ): Chainable<JQuery<HTMLCanvasElement>>;

      /**
       * Exit current mode and return to intro screen
       */
      returnToIntro(): Chainable<JQuery<HTMLCanvasElement>>;

      /**
       * Wait for canvas to be ready and interact with it
       * Uses assertive waiting instead of fixed timeouts
       */
      waitForCanvasReady(): Chainable<JQuery<HTMLCanvasElement>>;

      /**
       * Perform game actions with optimal timing
       * @param actions Array of keys to press sequentially
       */
      gameActions(actions: string[]): Chainable<JQuery<HTMLCanvasElement>>;

      /**
       * Check for an element with optimized retry strategy
       * @param selector Element selector
       * @param maxAttempts Maximum retry attempts (default: 3)
       */
      fastCheck(
        selector: string,
        maxAttempts?: number
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}

// Custom command implementation
Cypress.Commands.add("dataCy", (value: string) => {
  return cy.get(`[data-cy=${value}]`);
});

// Improved Training mode helpers with better waiting strategy
Cypress.Commands.add("enterTrainingMode", () => {
  cy.get("body").type("2");
  // Wait for canvas to be ready instead of fixed timeout
  return cy.waitForCanvasReady();
});

// Optimized practice stance command
Cypress.Commands.add(
  "practiceStance",
  (stanceNumber: number, repetitions: number) => {
    // Select stance
    cy.get("body").type(stanceNumber.toString());

    // Use a more efficient approach for repetitions
    const actions = Array(repetitions).fill(" ");
    return cy.gameActions(actions);
  }
);

Cypress.Commands.add("returnToIntro", () => {
  cy.get("body").type("{esc}");
  return cy.waitForCanvasReady();
});

// New optimized commands for faster tests

// Wait for canvas to be ready with assertions instead of fixed timeouts
Cypress.Commands.add("waitForCanvasReady", () => {
  // Optimized canvas waiting strategy
  return cy
    .get("canvas", { timeout: 2000 })
    .should("be.visible")
    .and(($canvas) => {
      // Additional check to ensure canvas is fully rendered
      const canvas = $canvas[0];
      expect(canvas.width).to.be.at.least(100);
      expect(canvas.height).to.be.at.least(100);
    });
});

// Optimized game actions with batched execution
Cypress.Commands.add("gameActions", (actions: string[]) => {
  // Group actions for faster execution
  if (actions.length <= 5) {
    // For small action sets, execute as one command
    cy.get("body").type(actions.join(""), { delay: 10 }); // Reduce delay
  } else {
    // For larger sets, batch in groups of 10 (increased from 5)
    const batches = [];
    for (let i = 0; i < actions.length; i += 10) {
      batches.push(actions.slice(i, i + 10).join(""));
    }

    // Execute batches with minimal waiting
    batches.forEach((batch) => {
      cy.get("body").type(batch, { delay: 10 });
      // Reduce wait between batches
      cy.wait(30); // Reduced from 50
    });
  }

  return cy.get("canvas");
});

// Fast check with limited attempts and timeout
Cypress.Commands.add(
  "fastCheck",
  (selector: string, maxAttempts: number = 3) => {
    // Use timeout option which is valid in Cypress types
    // Remove the 'retries' property which is causing the TypeScript error
    return cy.get(selector, {
      timeout: 1000 * maxAttempts, // Scale timeout with max attempts
    });
  }
);

// For more comprehensive examples of custom commands:
// https://on.cypress.io/custom-commands

export {};
