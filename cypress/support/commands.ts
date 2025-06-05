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
    }
  }
}

// Custom command implementation
Cypress.Commands.add("dataCy", (value: string) => {
  return cy.get(`[data-cy=${value}]`);
});

// Wait for canvas to be fully rendered and ready
Cypress.Commands.add("waitForCanvasReady", () => {
  cy.get("canvas", { timeout: 10000 }).should("be.visible");
});

// Improved Training mode helpers with better waiting strategy
Cypress.Commands.add("enterTrainingMode", () => {
  cy.get('[data-testid="training-button"]').click();
  cy.get('[data-testid="training-screen"]').should("be.visible");
});

// Enter combat mode from intro screen
Cypress.Commands.add("enterCombatMode", () => {
  cy.get('[data-testid="combat-button"]').click();
  cy.get('[data-testid="combat-screen"]').should("exist");
});

// Return to intro screen from anywhere
Cypress.Commands.add("returnToIntro", () => {
  // Try finding the return button first
  cy.get("body").then(($body) => {
    // Check if we're in training mode
    if ($body.find('[data-testid="return-to-menu-button"]').length) {
      cy.get('[data-testid="return-to-menu-button"]').click();
    }
    // Check if we're in combat mode
    else if ($body.find('[data-testid="combat-screen"]').length) {
      cy.get("body").type("{esc}");
    }
    // If we can't find a specific button, try ESC key as fallback
    else {
      cy.get("body").type("{esc}");
    }
  });

  cy.get('[data-testid="intro-screen"]', { timeout: 5000 }).should(
    "be.visible"
  );
});

// Optimized practice stance command
Cypress.Commands.add(
  "practiceStance",
  (stanceNumber: number, repetitions: number = 1) => {
    // Ensure we're in basics mode
    cy.get('[data-testid="mode-basics"]').click();

    // Select the stance
    cy.get("body").type(`${stanceNumber}`);
    cy.wait(300); // Wait for stance change

    // Switch to technique mode
    cy.get('[data-testid="mode-techniques"]').click();

    // Execute technique multiple times
    for (let i = 0; i < repetitions; i++) {
      cy.contains("기법 실행").click();
      cy.wait(500); // Wait for technique execution
    }

    // Return to basics
    cy.get('[data-testid="mode-basics"]').click();
  }
);

// Execute a sequence of game actions with reliable typing
Cypress.Commands.add("gameActions", (actions: string[]) => {
  actions.forEach((action) => {
    // Type the action with minimal delay
    cy.get("body").type(action, { delay: 0 });
    cy.wait(100); // Small wait between actions for game to process
  });
});

// Add annotation to test for better test documentation
Cypress.Commands.add("annotate", (message: string) => {
  cy.log(`**${message}**`);
  // Could integrate with a visual testing tool here
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
      cy.log(`WebGL mocking error: ${error.message}`);
      // If it's already wrapped, just continue
      if (error.message.includes("already wrapped")) {
        isWebGLMocked = true;
      }
    }
  });
});

// Combined visit with WebGL mocking for better test setup
Cypress.Commands.add(
  "visitWithWebGLMock",
  (url: string, options?: Partial<Cypress.VisitOptions>) => {
    // Reset the WebGL mocking state on a new page visit
    isWebGLMocked = false;

    // First visit the URL (don't apply WebGL mocks yet)
    return cy.visit(url, options).then(() => {
      // Now apply WebGL mocks after the page has loaded
      cy.mockWebGL();
      // Return the window object to maintain chainability
      return cy.window();
    });
  }
);

export {};
