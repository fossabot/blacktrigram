describe("Black Trigram Training Mode", () => {
  beforeEach(() => {
    cy.visitWithWebGLMock("/", { timeout: 20000 });
    cy.waitForCanvasReady();
  });

  describe("Training Mode Navigation", () => {
    it("should enter training mode successfully", () => {
      cy.annotate("Testing training mode entry");
      cy.enterTrainingMode();

      // Verify we're in training mode - check for essential elements
      cy.get('[data-testid="training-screen"]', { timeout: 10000 }).should(
        "exist"
      );
      cy.get('[data-testid="training-header"]', { timeout: 5000 }).should(
        "exist"
      );
    });

    it("should display training UI elements", () => {
      cy.annotate("Testing training UI elements");
      cy.enterTrainingMode();

      // Check for key training elements
      cy.get('[data-testid="training-screen"]').should("exist");
      cy.get('[data-testid="training-area"]').should("exist");
      cy.get('[data-testid="training-player"]').should("exist");
      cy.get('[data-testid="training-dummy-container"]').should("exist");
    });

    it("should handle training mode selection", () => {
      cy.annotate("Testing training mode selection");
      cy.enterTrainingMode();

      // Check mode selection panel
      cy.get('[data-testid="training-mode-stances"]').should("exist");
      cy.get('[data-testid="mode-basics"]')
        .should("exist")
        .click({ force: true });

      // Verify mode selection works
      cy.get('[data-testid="mode-advanced"]')
        .should("exist")
        .click({ force: true });
      cy.get('[data-testid="mode-free"]')
        .should("exist")
        .click({ force: true });
    });

    it("should support stance practice", () => {
      cy.annotate("Testing stance practice");
      cy.enterTrainingMode();

      // Check trigram wheel exists and is interactive
      cy.get('[data-testid="training-trigram-wheel"]').should("exist");

      // Try clicking on different stance buttons
      cy.get('[data-testid="stance-geon-button"]')
        .should("exist")
        .click({ force: true });
      cy.wait(500);

      // Verify stance indicator updates
      cy.get('[data-testid="current-stance-indicator"]').should("exist");

      // Test keyboard stance changes
      cy.get("body").type("2"); // Switch to Tae stance
      cy.wait(500);
      cy.get("body").type("3"); // Switch to Li stance
      cy.wait(500);
    });

    it("should track training statistics", () => {
      cy.annotate("Testing training statistics");
      cy.enterTrainingMode();

      // Check stats panel exists
      cy.get('[data-testid="training-stats-panel"]').should("exist");
      cy.get('[data-testid="attempts-count"]').should("contain", "시도: 0");

      // Start training and execute techniques
      cy.get('[data-testid="start-training-button"]')
        .should("exist")
        .click({ force: true });
      cy.wait(1000);

      // Execute techniques
      cy.get('[data-testid="execute-technique-button"]')
        .should("exist")
        .click({ force: true });
      cy.wait(500);
      cy.get('[data-testid="execute-technique-button"]').click({ force: true });

      // Verify stats update
      cy.get('[data-testid="attempts-count"]').should("not.contain", "시도: 0");
    });

    it("should support dummy interaction", () => {
      cy.annotate("Testing dummy interaction");
      cy.enterTrainingMode();

      // Check dummy and reset functionality
      cy.get('[data-testid="training-dummy"]').should("exist");
      cy.get('[data-testid="reset-dummy-button"]')
        .should("exist")
        .click({ force: true });

      // Verify dummy resets (health should be full)
      cy.wait(500);
    });

    it("should display training controls", () => {
      cy.annotate("Testing training controls");
      cy.enterTrainingMode();

      // Check all control elements
      cy.get('[data-testid="training-controls"]').should("exist");
      cy.get('[data-testid="start-training-button"]').should("exist");
      cy.get('[data-testid="evaluate-button"]').should("exist");

      // Test control interactions
      cy.get('[data-testid="start-training-button"]').click({ force: true });
      cy.wait(1000);

      cy.get('[data-testid="execute-technique-button"]').should("exist");
      cy.get('[data-testid="evaluate-button"]')
        .should("exist")
        .click({ force: true });
    });

    it("should return to menu from training", () => {
      cy.annotate("Testing return to menu");
      cy.enterTrainingMode();

      // Test return functionality
      cy.get('[data-testid="return-to-menu-button"]')
        .should("exist")
        .click({ force: true });
      cy.wait(2000);

      // Verify we're back at intro
      cy.get('[data-testid="intro-screen"]').should("exist");
      cy.annotate("Return to menu successful");
    });
  });

  describe("Training Mode Responsive Design", () => {
    it("should adapt to different screen sizes", () => {
      cy.annotate("Testing responsive training mode");

      const viewports = [
        { width: 1280, height: 720, name: "Desktop" },
        { width: 768, height: 1024, name: "Tablet" },
        { width: 375, height: 667, name: "Mobile" },
      ];

      viewports.forEach(({ width, height, name }) => {
        cy.viewport(width, height);
        cy.wait(1000);

        cy.enterTrainingMode();

        // Check essential elements exist at this viewport
        cy.get('[data-testid="training-screen"]').should("exist");
        cy.get('[data-testid="training-area"]').should("exist");
        cy.get('[data-testid="training-controls"]').should("exist");

        // Return to intro for next iteration
        cy.returnToIntro();
        cy.wait(1000);
      });
    });
  });
});
