describe("Black Trigram Core Features", () => {
  beforeEach(() => {
    // Start fresh for each test with optimized loading
    cy.visit("/", { timeout: 10000 });
    cy.waitForCanvasReady();
    cy.task("silenceWebGLWarning", null, { log: false });
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
      cy.get("body").type("1", { delay: 0 });
      cy.waitForCanvasReady();

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
        cy.get("canvas").should(($canvas) => {
          const rect = $canvas[0].getBoundingClientRect();
          expect(rect.width).to.be.at.least(width * 0.9);
          expect(rect.height).to.be.at.least(height * 0.9);
        });
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

  // New section for performance benchmarking
  describe("Performance", () => {
    it("should maintain rendering performance", () => {
      cy.annotate("Testing performance");
      cy.get("body").type("1", { delay: 0 }); // Enter combat mode
      cy.waitForCanvasReady();

      // Record performance during action sequence
      const start = Date.now();

      // Execute a sequence of actions quickly
      cy.annotate("Executing action sequence");
      cy.gameActions(["w", "a", "s", "d", "1", "2", "3", "4"]);

      // Check time taken with a more realistic threshold
      // Adjusted for video recording overhead
      cy.wrap(null).then(() => {
        const duration = Date.now() - start;
        cy.task("logPerformance", { name: "Combat Action Sequence", duration });
        cy.annotate(`Sequence completed in ${duration}ms`);
        // Increased threshold from 5000ms to 8000ms to accommodate video recording
        expect(duration).to.be.lessThan(8000);
      });

      cy.annotate("Returning to intro");
      cy.returnToIntro();
    });
  });
});
