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

      /**
       * Take a screenshot with a timestamp for debugging
       * @param name Name of the screenshot
       */
      debugScreenshot(name: string): Chainable<void>;

      /**
       * Add a visible annotation to the video recording
       * @param message The message to display
       */
      annotate(message: string): Chainable<void>;
    }
  }
}

// Custom command implementation
Cypress.Commands.add("dataCy", (value: string) => {
  return cy.get(`[data-cy=${value}]`);
});

// Improved Training mode helpers with better waiting strategy
Cypress.Commands.add("enterTrainingMode", () => {
  cy.get("body").type("2", { delay: 0 });
  // Wait for canvas to be ready instead of fixed timeout
  return cy.waitForCanvasReady();
});

// Optimized practice stance command
Cypress.Commands.add(
  "practiceStance",
  (stanceNumber: number, repetitions: number) => {
    // Select stance
    cy.get("body").type(stanceNumber.toString(), { delay: 0 });
    cy.waitForCanvasReady();

    // Use a more efficient approach for repetitions
    for (let i = 0; i < repetitions; i++) {
      cy.get("body").type(" ", { delay: 0 });
      if (i < repetitions - 1) {
        cy.wait(100); // Short wait between repetitions
      }
    }
    return cy.waitForCanvasReady();
  }
);

Cypress.Commands.add("returnToIntro", () => {
  cy.get("body").type("{esc}", { delay: 0 });
  return cy.waitForCanvasReady();
});

// Wait for canvas to be ready with assertions instead of fixed timeouts
Cypress.Commands.add("waitForCanvasReady", () => {
  // Optimized canvas waiting strategy
  return cy
    .get("canvas", { timeout: 5000 })
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
  if (actions.length === 1 && actions[0].length <= 5) {
    // For small action sets, execute as one command
    cy.get("body").type(actions[0], { delay: 0 });
  } else if (actions.length <= 5) {
    // For small action sets, execute sequentially with minimal delay
    actions.forEach((action) => {
      cy.get("body").type(action, { delay: 0 });
    });
  } else {
    // For larger sets, batch in groups of 10
    const batches = [];
    for (let i = 0; i < actions.length; i += 10) {
      batches.push(actions.slice(i, i + 10).join(""));
    }

    // Execute batches with minimal waiting
    batches.forEach((batch) => {
      cy.get("body").type(batch, { delay: 0 });
      // Reduce wait between batches
      cy.wait(30); // Reduced from 50
    });
  }

  return cy.get("canvas");
});

// Fast check with limited attempts
Cypress.Commands.add(
  "fastCheck",
  (selector: string, maxAttempts: number = 3) => {
    return cy.get(selector, {
      timeout: 1000 * maxAttempts, // Scale timeout with max attempts
    });
  }
);

// Take a screenshot for debugging with timestamp
Cypress.Commands.add("debugScreenshot", (name: string) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  cy.screenshot(`${name}-${timestamp}`, { capture: "viewport" });
});

// Add visual annotation to the video recording
Cypress.Commands.add("annotate", (message: string) => {
  cy.log(`**${message}**`);

  // Fix: Use cy.then() instead of Cypress.$.then()
  cy.then(() => {
    const $body = Cypress.$("body");
    const $annotation = Cypress.$('<div class="cypress-annotation"></div>')
      .css({
        position: "fixed",
        top: "10px",
        right: "10px",
        padding: "8px 12px",
        background: "rgba(0, 0, 0, 0.7)",
        color: "#00ffd0",
        border: "1px solid #00ffd0",
        borderRadius: "4px",
        fontFamily: "monospace",
        fontSize: "14px",
        zIndex: 9999,
        pointerEvents: "none",
        boxShadow: "0 0 10px rgba(0, 255, 208, 0.5)",
        animation: "fadeIn 0.3s ease-in-out",
      })
      .text(message);

    $body.append($annotation);

    // Remove after 3 seconds
    setTimeout(() => {
      $annotation.fadeOut(500, () => $annotation.remove());
    }, 3000);
  });
});

export {};
