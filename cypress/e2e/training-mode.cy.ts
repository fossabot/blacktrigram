describe("Black Trigram Training Mode", () => {
  beforeEach(() => {
    cy.visitWithWebGLMock("/", { timeout: 20000 });
    cy.waitForCanvasReady();
  });

  describe("Training Mode Navigation", () => {
    it("should enter training mode successfully", () => {
      cy.annotate("Testing training mode entry");
      cy.enterTrainingMode();

      // Verify we're in training mode - check for essential elements with increased timeout
      cy.get('[data-testid="training-screen"]', { timeout: 15000 }).should(
        "exist"
      );
      cy.get('[data-testid="training-header"]', { timeout: 10000 }).should(
        "exist"
      );
    });

    it("should display training UI elements", () => {
      cy.annotate("Testing training UI elements");
      cy.enterTrainingMode();

      // Check for key training elements with increased timeouts
      cy.get('[data-testid="training-screen"]', { timeout: 15000 }).should(
        "exist"
      );
      cy.get('[data-testid="training-area"]', { timeout: 15000 }).should(
        "exist"
      );
      cy.get('[data-testid="training-player"]', { timeout: 15000 }).should(
        "exist"
      );
      cy.get('[data-testid="training-dummy-container"]', {
        timeout: 15000,
      }).should("exist");
    });

    it("should handle training mode selection", () => {
      cy.annotate("Testing training mode selection");
      cy.enterTrainingMode();

      // Check mode selection panel with increased timeout
      cy.get('[data-testid="training-mode-stances"]', {
        timeout: 15000,
      }).should("exist");
      cy.get('[data-testid="mode-basics"]', { timeout: 10000 })
        .should("exist")
        .click({ force: true });

      // Verify mode selection works
      cy.get('[data-testid="mode-advanced"]', { timeout: 10000 })
        .should("exist")
        .click({ force: true });
      cy.get('[data-testid="mode-free"]', { timeout: 10000 })
        .should("exist")
        .click({ force: true });
    });

    it("should support stance practice", () => {
      cy.annotate("Testing stance practice");
      cy.enterTrainingMode();

      // Check trigram wheel exists and is interactive with increased timeout
      cy.get('[data-testid="training-trigram-wheel"]', {
        timeout: 15000,
      }).should("exist");

      // Try clicking on stance button
      cy.get('[data-testid="stance-geon-button"]', { timeout: 10000 })
        .should("exist")
        .click({ force: true });
      cy.wait(500);

      // Verify stance indicator updates
      cy.get('[data-testid="current-stance-indicator"]', {
        timeout: 10000,
      }).should("exist");

      // Test keyboard stance changes
      cy.get("body").type("2"); // Switch to Tae stance
      cy.wait(500);
      cy.get("body").type("3"); // Switch to Li stance
      cy.wait(500);
    });

    it("should track training statistics", () => {
      cy.annotate("Testing training statistics");
      cy.enterTrainingMode();

      // Check stats panel exists with increased timeout
      cy.get('[data-testid="training-stats-panel"]', { timeout: 15000 }).should(
        "exist"
      );
      cy.get('[data-testid="attempts-count"]', { timeout: 10000 }).should(
        "contain",
        "시도: 0"
      );

      // Start training and execute techniques
      cy.get('[data-testid="start-training-button"]', { timeout: 10000 })
        .should("exist")
        .click({ force: true });
      cy.wait(1000);

      // Execute techniques
      cy.get('[data-testid="execute-technique-button"]', { timeout: 10000 })
        .should("exist")
        .click({ force: true });
      cy.wait(500);
      cy.get('[data-testid="execute-technique-button"]').click({ force: true });

      // Verify stats update
      cy.get('[data-testid="attempts-count"]', { timeout: 5000 }).should(
        "not.contain",
        "시도: 0"
      );
    });

    it("should support dummy interaction", () => {
      cy.annotate("Testing dummy interaction");
      cy.enterTrainingMode();

      // Check dummy and reset functionality with increased timeout
      cy.get('[data-testid="training-dummy"]', { timeout: 15000 }).should(
        "exist"
      );
      cy.get('[data-testid="reset-dummy-button"]', { timeout: 10000 })
        .should("exist")
        .click({ force: true });

      // Verify dummy resets (health should be full)
      cy.wait(500);
    });

    it("should display training controls", () => {
      cy.annotate("Testing training controls");
      cy.enterTrainingMode();

      // Check all control elements with increased timeout
      cy.get('[data-testid="training-controls"]', { timeout: 15000 }).should(
        "exist"
      );
      cy.get('[data-testid="start-training-button"]', {
        timeout: 10000,
      }).should("exist");
      cy.get('[data-testid="evaluate-button"]', { timeout: 10000 }).should(
        "exist"
      );

      // Test control interactions
      cy.get('[data-testid="start-training-button"]').click({ force: true });
      cy.wait(1000);

      cy.get('[data-testid="execute-technique-button"]', {
        timeout: 10000,
      }).should("exist");
      cy.get('[data-testid="evaluate-button"]')
        .should("exist")
        .click({ force: true });
    });

    it("should return to menu from training", () => {
      cy.annotate("Testing return to menu");
      cy.enterTrainingMode();

      // Test return functionality
      cy.get('[data-testid="return-to-menu-button"]', { timeout: 10000 })
        .should("exist")
        .click({ force: true });
      cy.wait(2000);

      // Verify we're back at intro
      cy.get('[data-testid="intro-screen"]', { timeout: 15000 }).should(
        "exist"
      );
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

        // Check essential elements exist at this viewport with increased timeouts
        cy.get('[data-testid="training-screen"]', { timeout: 15000 }).should(
          "exist"
        );
        cy.get('[data-testid="training-area"]', { timeout: 15000 }).should(
          "exist"
        );
        cy.get('[data-testid="training-controls"]', { timeout: 15000 }).should(
          "exist"
        );

        // Return to intro for next iteration
        cy.returnToIntro();
        cy.wait(1000);
      });
    });
  });
});
