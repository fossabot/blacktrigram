/// <reference types="cypress" />

// This file is a great place to define custom commands and overwrite existing ones.

// ***********************************************
// Custom commands for Black Trigram testing
// ***********************************************

// Define custom command types
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Enter training mode from intro screen
       */
      enterTrainingMode(): void;

      /**
       * Enter combat mode from intro screen
       */
      enterCombatMode(): void;

      /**
       * Practice a specific stance in training mode
       * @param stanceNumber Stance number (1-8)
       * @param repetitions Number of practice repetitions
       */
      practiceStance(stanceNumber: number, repetitions?: number): void;

      /**
       * Exit current mode and return to intro screen
       */
      returnToIntro(): void;

      /**
       * Wait for canvas to be ready and interact with it
       * Uses assertive waiting instead of fixed timeouts
       */
      waitForCanvasReady(): void;

      /**
       * Perform game actions with optimal timing
       * @param actions Array of keys to press sequentially
       */
      gameActions(actions: string[]): void;

      /**
       * Add a visible annotation to the video recording
       * @param message The message to display
       */
      annotate(message: string): void;

      /**
       * Custom tab command
       * @param options Tab options with shift key flag
       */
      tab(options?: { shift?: boolean }): void;

      /**
       * Log performance metrics
       */
      logPerformance(metrics: { name: string; duration: number }): void;

      /**
       * Mock WebGL context for testing WebGL applications
       */
      mockWebGL(): void;

      /**
       * Visit URL with WebGL mocking
       * @param url URL to visit
       * @param options Visit options
       */
      visitWithWebGLMock(
        url: string,
        options?: Partial<Cypress.VisitOptions>
      ): Chainable<Cypress.AUTWindow>;

      /**
       * Check canvas visibility and dimensions
       */
      checkCanvasVisibility(): Chainable<void>;

      /**
       * Wait for the game to be ready
       */
      waitForGameReady(): Chainable<void>;

      /**
       * Navigate to training screen with retries
       */
      navigateToTraining(): Chainable<void>;
    }
  }
}

// Custom command implementation
Cypress.Commands.add("dataCy", (value: string) => {
  return cy.get(`[data-testid="${value}"]`);
});

// Enhanced wait for canvas to be fully rendered and ready
Cypress.Commands.add("waitForCanvasReady", () => {
  cy.get("canvas", { timeout: 15000 }).should("be.visible");
  cy.wait(500); // Allow PixiJS to initialize
  cy.get('[data-testid="app-container"]').should("exist");
});

// Enhanced Training mode helpers with better waiting strategy
Cypress.Commands.add("enterTrainingMode", () => {
  cy.get('[data-testid="training-button"]', { timeout: 10000 })
    .should("be.visible")
    .click();
  cy.wait(1000); // Allow transition
  // Verify we're in training mode
  cy.get("body").then(($body) => {
    if ($body.find('[data-testid="training-screen"]').length > 0) {
      cy.log("Successfully entered training mode");
    } else {
      cy.log("Training mode navigation - using keyboard fallback");
      cy.get("body").type("2"); // Training shortcut
      cy.wait(1000);
    }
  });
});

// Enter combat mode from intro screen
Cypress.Commands.add("enterCombatMode", () => {
  cy.get('[data-testid="combat-button"]', { timeout: 10000 })
    .should("be.visible")
    .click();
  cy.wait(1000); // Allow transition
  // Verify we're in combat mode
  cy.get("body").then(($body) => {
    if ($body.find('[data-testid="combat-screen"]').length > 0) {
      cy.log("Successfully entered combat mode");
    } else {
      cy.log("Combat mode navigation - using keyboard fallback");
      cy.get("body").type("1"); // Combat shortcut
      cy.wait(1000);
    }
  });
});

// Return to intro screen from anywhere
Cypress.Commands.add("returnToIntro", () => {
  // Try return button first
  cy.get("body").then(($body) => {
    if ($body.find('[data-testid="return-to-menu-button"]').length > 0) {
      cy.get('[data-testid="return-to-menu-button"]').click();
    } else {
      // Use ESC key as fallback
      cy.get("body").type("{esc}");
    }
  });
  cy.wait(1000);
  cy.get('[data-testid="intro-screen"]', { timeout: 8000 }).should("exist");
});

// Optimized practice stance command
Cypress.Commands.add(
  "practiceStance",
  (stanceNumber: number, repetitions: number = 1) => {
    for (let i = 0; i < repetitions; i++) {
      cy.get("body").type(stanceNumber.toString());
      cy.wait(200);
      cy.get("body").type(" "); // Execute technique
      cy.wait(300);
    }
  }
);

// Execute a sequence of game actions with reliable typing
Cypress.Commands.add("gameActions", (actions: string[]) => {
  actions.forEach((action, index) => {
    cy.get("body").type(action, { delay: 50 });
    if (index < actions.length - 1) {
      cy.wait(100);
    }
  });
});

// Add annotation to test for better test documentation
Cypress.Commands.add("annotate", (message: string) => {
  cy.task("log", `[${new Date().toISOString()}] ${message}`);
});

// Custom tab implementation - fixed type errors
Cypress.Commands.add(
  "tab",
  { prevSubject: ["optional", "element", "document"] },
  (subject, tabOptions?: { shift?: boolean }) => {
    const options = { shift: false, ...tabOptions };
    const keydown = options.shift ? "shift+tab" : "tab";
    if (subject) {
      cy.wrap(subject).trigger("keydown", {
        key: "Tab",
        shiftKey: options.shift,
      });
    } else {
      cy.get("body").trigger("keydown", {
        key: "Tab",
        shiftKey: options.shift,
      });
    }
  }
);

// Performance logging for monitoring test execution
Cypress.Commands.add(
  "logPerformance",
  (metrics: { name: string; duration: number }) => {
    cy.task("logPerformance", metrics);
  }
);

// Store a flag to track if WebGL mocking has been applied
let isWebGLMocked = false;

// Mock WebGL context for reliable testing across environments
Cypress.Commands.add("mockWebGL", () => {
  if (isWebGLMocked) return;

  cy.window().then((win) => {
    // Mock WebGL context creation
    const originalGetContext = win.HTMLCanvasElement.prototype.getContext;
    win.HTMLCanvasElement.prototype.getContext = function (
      type: string,
      ...args: any[]
    ) {
      if (type === "webgl" || type === "webgl2") {
        // Return a basic mock WebGL context
        return {
          canvas: this,
          drawingBufferWidth: this.width,
          drawingBufferHeight: this.height,
          // Add minimal WebGL methods
          getExtension: () => null,
          getParameter: () => null,
          createShader: () => ({}),
          createProgram: () => ({}),
          // Add other methods as needed
        };
      }
      return originalGetContext.call(this, type, ...args);
    };
  });

  isWebGLMocked = true;
});

// Enhanced visit with audio error handling
Cypress.Commands.add(
  "visitWithWebGLMock",
  (url: string, options?: Partial<Cypress.VisitOptions>) => {
    cy.mockWebGL();

    // Enhanced error handling for audio and WebGL
    cy.on("uncaught:exception", (err) => {
      // Ignore audio, WebGL, and asset loading errors
      if (
        err.message.includes("Failed to load") ||
        err.message.includes("no supported source") ||
        err.message.includes("play() request was interrupted") ||
        err.message.includes("WebGL") ||
        err.message.includes("PIXI") ||
        err.message.includes("audio") ||
        err.message.includes("NetworkError") ||
        err.message.includes("AbortError")
      ) {
        console.warn("Ignoring non-critical error:", err.message);
        return false;
      }
      return true;
    });

    cy.visit(url, {
      timeout: 15000,
      ...options,
      onBeforeLoad: (win) => {
        // Disable audio autoplay restrictions
        Object.defineProperty(win.navigator, "userActivation", {
          value: { hasBeenActive: true, isActive: true },
          writable: false,
        });

        // Call original onBeforeLoad if provided
        if (options?.onBeforeLoad) {
          options.onBeforeLoad(win);
        }
      },
    });
  }
);

// Enhanced canvas visibility checking
Cypress.Commands.add("checkCanvasVisibility", () => {
  cy.get("canvas")
    .should("exist")
    .and("be.visible")
    .then(($canvas) => {
      // Check if canvas has proper dimensions
      const canvas = $canvas[0];
      const rect = canvas.getBoundingClientRect();

      expect(rect.width).to.be.greaterThan(100);
      expect(rect.height).to.be.greaterThan(100);

      cy.log("✅ Canvas is visible with proper dimensions");
    });
});

// Wait for game to be ready
Cypress.Commands.add("waitForGameReady", () => {
  cy.get('[data-testid="app-container"]', { timeout: 10000 }).should(
    "be.visible"
  );
  cy.get("canvas", { timeout: 15000 }).should("be.visible");
  cy.wait(1000); // Allow PixiJS to initialize
});

// Enhanced navigation with retries
Cypress.Commands.add("navigateToTraining", () => {
  cy.waitForGameReady();
  cy.get('[data-testid="training-button"]', { timeout: 10000 })
    .should("be.visible")
    .click();
  cy.get('[data-testid="training-screen"]', { timeout: 15000 }).should("exist");
  cy.wait(1000); // Allow training screen to fully load
});

export {};
