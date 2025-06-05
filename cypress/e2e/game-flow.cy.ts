describe("Black Trigram - Game Flow", () => {
  beforeEach(() => {
    // Use the new visitWithWebGLMock command
    cy.visitWithWebGLMock("/", { timeout: 12000 });
    cy.waitForCanvasReady();
  });

  describe("Core Game Navigation", () => {
    it("should support all critical game navigation paths", () => {
      // Test arrow key and space navigation in one test
      cy.annotate("Testing intro screen navigation");
      // Test all navigation controls at once
      cy.gameActions(["a", "d", "{leftarrow}", "{rightarrow}"]);
      cy.get("canvas").should("be.visible");

      // Test game mode entry/exit cycles
      cy.annotate("Testing game mode entry and exit");
      // 1. Sparring mode via #1 key
      cy.annotate("Entering Sparring Mode via #1 key");
      cy.gameActions(["1"]);
      cy.waitForCanvasReady();
      cy.gameActions(["{esc}"]);
      cy.waitForCanvasReady();

      // 2. Training mode via #2 key
      cy.annotate("Entering Training Mode via #2 key");
      cy.gameActions(["2"]);
      cy.waitForCanvasReady();
      cy.gameActions(["{esc}"]);
      cy.waitForCanvasReady();

      // 3. Sparring mode via Space key
      cy.annotate("Entering Sparring Mode via Space key");
      cy.gameActions([" "]);
      cy.waitForCanvasReady();
      cy.gameActions(["{esc}"]);
      cy.waitForCanvasReady();

      // 4. Training mode via Alt key
      cy.annotate("Entering Training Mode via Alt key");
      cy.gameActions(["{alt}"]);
      cy.waitForCanvasReady();
      cy.gameActions(["{esc}"]);
      cy.waitForCanvasReady();
    });
  });

  describe("Combat Mechanics", () => {
    it("should support all core combat interactions", () => {
      // Enter combat mode once
      cy.annotate("Testing combat mechanics");
      cy.gameActions(["1"]);
      cy.waitForCanvasReady();

      // Test movement controls in batches
      cy.annotate("Testing movement controls");
      cy.gameActions(["w", "a", "s", "d"]);
      cy.gameActions([
        "{uparrow}",
        "{leftarrow}",
        "{downarrow}",
        "{rightarrow}",
      ]);

      // Test attacking with all 8 trigram techniques
      cy.annotate("Testing trigram techniques");
      cy.gameActions(["1", "2", "3", "4", "5", "6", "7", "8"]);

      // Test blocking
      cy.annotate("Testing blocking");
      cy.gameActions([" "]);

      // Test mouse interaction
      cy.annotate("Testing mouse attacks");
      cy.get("canvas").click(400, 300);

      // Exit combat mode
      cy.annotate("Exiting combat mode");
      cy.gameActions(["{esc}"]);
      cy.waitForCanvasReady();
    });

    it("should handle AI interactions", () => {
      // Enter combat mode
      cy.annotate("Testing AI interactions");
      cy.gameActions(["1"]);
      cy.waitForCanvasReady();

      // Test AI response to player movement
      cy.annotate("Testing AI response to movement");
      // Move toward AI then away
      cy.gameActions(["d", "d", "d", "d"]);
      cy.waitForCanvasReady();
      cy.gameActions(["a", "a", "a", "a"]);
      cy.waitForCanvasReady();

      // Exit combat mode
      cy.annotate("Exiting combat mode");
      cy.gameActions(["{esc}"]);
      cy.waitForCanvasReady();
    });
  });

  describe("Performance & Input Handling", () => {
    it("should maintain performance during intense combat", () => {
      // Enter combat mode
      cy.annotate("Testing intense combat performance");
      cy.gameActions(["1"]);
      cy.waitForCanvasReady();

      // Record start time for performance measurement
      const startTime = Date.now();

      // Execute combat sequence
      const combatSequence = [
        "wasd", // Movement
        "1234", // Attacks
        "wasd", // More movement
        "5678", // More attacks
        " ", // Block
      ];

      // Execute all actions with minimal delay
      cy.annotate("Executing combat sequence");
      combatSequence.forEach((actions) => {
        cy.gameActions([actions]);
      });

      // Verify performance with optimized threshold for CI/WebGL software rendering
      cy.wrap(null).then(() => {
        const duration = Date.now() - startTime;
        cy.task("logPerformance", {
          name: "Intense Combat Sequence",
          duration,
        });
        cy.annotate(`Combat sequence completed in ${duration}ms`);
        // Optimized threshold for CI environment with software WebGL
        expect(duration).to.be.lessThan(20000);
      });

      // Exit combat mode
      cy.annotate("Exiting combat mode");
      cy.gameActions(["{esc}"]);
      cy.waitForCanvasReady();
    });

    it("should handle complex input sequences", () => {
      // Enter combat mode
      cy.annotate("Testing complex input sequences");
      cy.gameActions(["1"]);
      cy.waitForCanvasReady();

      // Test rapid sequential inputs
      cy.annotate("Testing rapid input combinations");
      cy.gameActions(["w1", "a2", "s3", "d4"]);
      cy.waitForCanvasReady();

      // Exit combat mode
      cy.annotate("Exiting combat mode");
      cy.gameActions(["{esc}"]);
      cy.waitForCanvasReady();
    });
  });

  describe("Responsiveness", () => {
    it("should work on different screen sizes", () => {
      // Test 3 key screen sizes in one test
      cy.annotate("Testing responsive design");
      [
        [1280, 720], // Desktop
        [768, 1024], // Tablet
        [375, 667], // Mobile
      ].forEach(([width, height]) => {
        cy.annotate(`Testing viewport ${width}x${height}`);
        cy.viewport(width, height);
        cy.waitForCanvasReady();

        // Enter and exit combat mode at each size
        cy.gameActions(["1"]);
        cy.waitForCanvasReady();
        cy.gameActions(["{esc}"]);
        cy.waitForCanvasReady();
      });
    });
  });
});
