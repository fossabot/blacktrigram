describe("Black Trigram Core Features", () => {
  beforeEach(() => {
    // Use the enhanced visitWithWebGLMock command
    cy.visitWithWebGLMock("/", { timeout: 20000 });
    cy.waitForCanvasReady();
  });

  // Test complete user flows rather than individual elements
  describe("Essential User Journeys", () => {
    it("should support the complete game cycle", () => {
      // Starting screen verification
      cy.title().should("contain", "흑괘");
      cy.get("canvas").should("be.visible");
      cy.annotate("Starting Game Cycle Test");

      // Enter Training -> Practice -> Return to Intro -> Combat -> Return
      cy.annotate("1. Entering Training Mode");
      cy.enterTrainingMode();

      cy.annotate("2. Practicing Techniques");
      cy.practiceStance(1, 2); // Practice first stance twice
      cy.practiceStance(2, 1); // Practice second stance once

      cy.annotate("3. Returning to Intro");
      cy.returnToIntro();

      cy.annotate("4. Entering Combat Mode");
      cy.enterCombatMode();

      cy.annotate("5. Testing Combat Actions");
      cy.gameActions(["w", "a", "s", "d", "1", "2", " "]);

      cy.annotate("6. Returning to Intro");
      cy.returnToIntro();

      cy.annotate("Game Cycle Test Complete");
    });
  });

  describe("Responsive Design", () => {
    it("should render properly across screen sizes", () => {
      cy.annotate("Testing responsive design");
      // Test key screen sizes efficiently in one test
      [
        [1280, 720], // Desktop
        [768, 1024], // Tablet
        [375, 667], // Mobile
      ].forEach(([width, height]) => {
        cy.annotate(`Testing viewport ${width}x${height}`);
        cy.viewport(width, height);
        cy.waitForCanvasReady();

        // Check that essential UI elements are present
        cy.get('[data-testid="app-container"]').should("be.visible");
        cy.get("canvas").should("be.visible");

        // Check that buttons are accessible
        cy.get('[data-testid="training-button"]').should("be.visible");
        cy.get('[data-testid="combat-button"]').should("be.visible");
      });
    });
  });

  describe("Game Input Handling", () => {
    it("should handle various input combinations", () => {
      // Test keyboard input handling
      cy.annotate("Testing input handling");
      cy.enterTrainingMode();

      // Test rapid sequential inputs
      cy.annotate("Testing rapid sequential inputs");
      cy.gameActions(["1", "2", "3", "4", "5"]);

      // Test key combinations
      cy.annotate("Testing key combinations");
      cy.get("body").type("{leftarrow}{rightarrow}", { delay: 0 });

      cy.annotate("Returning to intro");
      cy.returnToIntro();
    });
  });

  // Enhanced performance section with better thresholds
  describe("Performance", () => {
    it("should maintain rendering performance", () => {
      cy.annotate("Testing performance");
      cy.enterCombatMode();

      // Record performance during action sequence
      const start = Date.now();

      // Execute a sequence of actions quickly
      cy.annotate("Executing action sequence");
      cy.gameActions(["w", "a", "s", "d", "1", "2", "3", "4"]);

      // Check time taken with realistic threshold for CI environment
      cy.wrap(null).then(() => {
        const duration = Date.now() - start;
        cy.task("logPerformance", { name: "Combat Action Sequence", duration });
        cy.annotate(`Sequence completed in ${duration}ms`);
        // Realistic threshold for CI environment with WebGL software rendering
        expect(duration).to.be.lessThan(15000);
      });

      cy.annotate("Returning to intro");
      cy.returnToIntro();
    });
  });

  describe("Error Resilience", () => {
    it("should handle missing components gracefully", () => {
      cy.annotate("Testing error resilience");

      // Test what happens when we try to access non-existent features
      cy.get("body").then(($body) => {
        // Try to access philosophy section (might not be implemented)
        cy.get("body").type("4");
        cy.wait(1000);

        // Return to main screen regardless
        cy.get("body").type("{esc}");
        cy.wait(1000);

        cy.annotate("Error resilience test completed");
      });
    });
  });
});
