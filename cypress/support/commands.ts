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
      annotate(message: string): void;

      /**
       * Mock WebGL context for testing WebGL applications
       */
      mockWebGL(): void;

      /**
       * Log performance metrics
       */
      logPerformance(metrics: { name: string; duration: number }): void;

      /**
       * Custom tab command
       * @param options Tab options with shift key flag
       */
      tab(options?: { shift?: boolean }): void;

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
       * Find element by test ID with fallback
       */
      findByTestIdOrFallback(
        testId: string,
        fallbackSelector?: string
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}

// Custom command implementation
Cypress.Commands.add("dataCy", (value: string) => {
  return cy.get(`[data-cy=${value}]`);
});

// Wait for canvas to be fully rendered and ready
Cypress.Commands.add("waitForCanvasReady", () => {
  // Wait for the app container
  cy.get('[data-testid="app-container"]', { timeout: 10000 }).should("exist");

  // Wait for canvas to be present and have some dimensions
  cy.get("canvas", { timeout: 10000 })
    .should("exist")
    .and("be.visible")
    .and(($canvas) => {
      const canvas = $canvas[0] as HTMLCanvasElement;
      expect(canvas.width).to.be.greaterThan(0);
      expect(canvas.height).to.be.greaterThan(0);
    });

  // Wait for intro screen to be ready
  cy.get('[data-testid="intro-screen"]', { timeout: 8000 }).should("exist");

  // Small delay for initialization
  cy.wait(500);
});

// Enhanced Training mode helpers with better waiting strategy
Cypress.Commands.add("enterTrainingMode", () => {
  // Method 1: Try clicking visible button
  cy.get("body").then(($body) => {
    if ($body.find('[data-testid="training-button"]:visible').length > 0) {
      cy.get('[data-testid="training-button"]').click();
    } else {
      // Method 2: Use keyboard shortcut
      cy.get("body").type("2", { delay: 100 });
    }
  });

  cy.waitForCanvasReady();
});

// Enter combat mode from intro screen
Cypress.Commands.add("enterCombatMode", () => {
  // Method 1: Try clicking visible button
  cy.get("body").then(($body) => {
    if ($body.find('[data-testid="combat-button"]:visible').length > 0) {
      cy.get('[data-testid="combat-button"]').click();
    } else {
      // Method 2: Use keyboard shortcut
      cy.get("body").type("1", { delay: 100 });
    }
  });

  cy.waitForCanvasReady();
});

// Return to intro screen from anywhere
Cypress.Commands.add("returnToIntro", () => {
  // Try multiple methods to return to intro
  cy.get("body").then(($body) => {
    if (
      $body.find('[data-testid="return-to-menu-button"]:visible').length > 0
    ) {
      cy.get('[data-testid="return-to-menu-button"]').click();
    } else {
      // Use ESC key as fallback
      cy.get("body").type("{esc}", { delay: 100 });
    }
  });

  // Verify we're back at intro
  cy.get('[data-testid="intro-screen"]', { timeout: 5000 }).should("exist");
});

// Optimized practice stance command
Cypress.Commands.add(
  "practiceStance",
  (stanceNumber: number, repetitions: number = 1) => {
    for (let i = 0; i < repetitions; i++) {
      cy.get("body").type(stanceNumber.toString(), { delay: 200 });
      cy.get("body").type(" ", { delay: 300 }); // Execute technique
      cy.wait(400); // Wait for technique to complete
    }
  }
);

// Execute a sequence of game actions with reliable typing
Cypress.Commands.add("gameActions", (actions: string[]) => {
  actions.forEach((action, index) => {
    cy.get("body").type(action, { delay: 100 });
    // Add small delay between actions for game processing
    if (index < actions.length - 1) {
      cy.wait(150);
    }
  });
});

// Add annotation to test for better test documentation
Cypress.Commands.add("annotate", (message: string) => {
  cy.log(`🎯 ${message}`);
  cy.task("log", `[${new Date().toISOString()}] ${message}`, { log: false });
});

// Custom tab implementation - fixed type errors
Cypress.Commands.add(
  "tab",
  { prevSubject: ["optional", "element", "document"] },
  (subject, tabOptions?: { shift?: boolean }) => {
    const shiftKey = tabOptions?.shift || false;

    if (subject) {
      cy.wrap(subject).trigger("keydown", {
        keyCode: 9,
        which: 9,
        key: "Tab",
        shiftKey: shiftKey,
      });
    } else {
      cy.focused().trigger("keydown", {
        keyCode: 9,
        which: 9,
        key: "Tab",
        shiftKey: shiftKey,
      });
    }

    cy.document().trigger("keyup", {
      keyCode: 9,
      which: 9,
      key: "Tab",
      shiftKey: shiftKey,
    });
  }
);

// Performance logging for monitoring test execution
Cypress.Commands.add(
  "logPerformance",
  (metrics: { name: string; duration: number }) => {
    cy.task("log", `[Performance] ${metrics.name}: ${metrics.duration}ms`);
  }
);

// Store a flag to track if WebGL mocking has been applied
let isWebGLMocked = false;

// Mock WebGL context for reliable testing across environments
Cypress.Commands.add("mockWebGL", () => {
  // Only mock if not already mocked to prevent "already wrapped" errors
  if (isWebGLMocked) {
    cy.log("WebGL already mocked - skipping");
    return;
  }

  cy.window().then((win) => {
    try {
      // Create WebGL context mock
      const getContextStub = cy.stub(HTMLCanvasElement.prototype, "getContext");

      // Mock WebGL methods
      const mockWebGLContext = {
        viewport: cy.stub(),
        clear: cy.stub(),
        enable: cy.stub(),
        createShader: cy.stub().returns({}),
        createBuffer: cy.stub().returns({}),
        bindBuffer: cy.stub(),
        bufferData: cy.stub(),
        getAttribLocation: cy.stub().returns(0),
        getUniformLocation: cy.stub().returns(0),
        vertexAttribPointer: cy.stub(),
        enableVertexAttribArray: cy.stub(),
        useProgram: cy.stub(),
        uniformMatrix4fv: cy.stub(),
        drawElements: cy.stub(),
        shaderSource: cy.stub(),
        compileShader: cy.stub(),
        getShaderParameter: cy.stub().returns(true),
        createProgram: cy.stub().returns({}),
        attachShader: cy.stub(),
        linkProgram: cy.stub(),
        getProgramParameter: cy.stub().returns(true),
        deleteShader: cy.stub(),
        getParameter: cy.stub().returns(8),
        clearColor: cy.stub(),
        clearDepth: cy.stub(),
        depthFunc: cy.stub(),
        blendFunc: cy.stub(),
        activeTexture: cy.stub(),
        bindTexture: cy.stub(),
        pixelStorei: cy.stub(),
        texParameteri: cy.stub(),
        texImage2D: cy.stub(),
        uniform1i: cy.stub(),
        uniform1f: cy.stub(),
        uniform2f: cy.stub(),
        uniform3f: cy.stub(),
        uniform4f: cy.stub(),
        uniform1fv: cy.stub(),
        uniform2fv: cy.stub(),
        uniform3fv: cy.stub(),
        uniform4fv: cy.stub(),
      };

      // Return mock for webgl contexts
      getContextStub.withArgs("webgl").returns(mockWebGLContext);
      getContextStub.withArgs("webgl2").returns(mockWebGLContext);
      getContextStub.withArgs("experimental-webgl").returns(mockWebGLContext);

      // Allow real 2D context to work
      getContextStub.callThrough();

      // Set flag to indicate WebGL has been mocked
      isWebGLMocked = true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      cy.log(`WebGL mocking error: ${errorMessage}`);
      // If it's already wrapped, just continue
      if (errorMessage.includes("already wrapped")) {
        cy.log("Canvas already stubbed, continuing...");
        isWebGLMocked = true;
      }
    }
  });
});

// Enhanced visit with audio error handling
Cypress.Commands.add(
  "visitWithWebGLMock",
  (url: string, options?: Partial<Cypress.VisitOptions>) => {
    // Reset the WebGL mocking state on a new page visit
    isWebGLMocked = false;

    // Handle audio loading errors globally
    cy.window().then((win) => {
      win.addEventListener("unhandledrejection", (e) => {
        if (
          e.reason?.message?.includes("Failed to load") ||
          e.reason?.message?.includes("no supported source") ||
          e.reason?.message?.includes("play() request was interrupted")
        ) {
          cy.log("Audio error handled:", e.reason.message);
          e.preventDefault();
        }
      });
    });

    // First visit the URL (don't apply WebGL mocks yet)
    return cy.visit(url, options).then(() => {
      // Now apply WebGL mocks after the page has loaded
      cy.mockWebGL();
      // Return the window object to maintain chainability
      return cy.window();
    });
  }
);

// Fix: Properly implement findByTestIdOrFallback command
Cypress.Commands.add(
  "findByTestIdOrFallback",
  (testId: string, fallbackSelector?: string) => {
    return cy.get("body").then(($body) => {
      if ($body.find(`[data-testid="${testId}"]`).length > 0) {
        return cy.get(`[data-testid="${testId}"]`);
      } else if (fallbackSelector && $body.find(fallbackSelector).length > 0) {
        return cy.get(fallbackSelector);
      } else {
        throw new Error(
          `Neither test ID "${testId}" nor fallback "${fallbackSelector}" found`
        );
      }
    });
  }
);

export {};
