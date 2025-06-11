describe("Black Trigram Training Mode", () => {
  beforeEach(() => {
    cy.visitWithWebGLMock("/", { timeout: 20000 });
    cy.waitForCanvasReady();
  });

  describe("Training Mode Navigation", () => {
    it("should enter training mode successfully", () => {
      cy.annotate("Testing training mode entry");

      cy.enterTrainingMode();

      // Verify training screen elements exist
      cy.get('[data-testid="training-screen"]').should("exist");
      cy.get('[data-testid="training-header"]').should("exist");
      cy.get('[data-testid="training-area"]').should("exist");

      cy.annotate("Training mode entry successful");
    });

    it("should display training UI elements", () => {
      cy.annotate("Testing training UI elements");

      cy.enterTrainingMode();

      // Check for essential training elements
      cy.get('[data-testid="training-player"]').should("exist");
      cy.get('[data-testid="training-dummy"]').should("exist");
      cy.get('[data-testid="stance-selection"]').should("exist");
      cy.get('[data-testid="current-stance-indicator"]').should("exist");

      cy.annotate("Training UI elements verified");
    });

    it("should handle training mode selection", () => {
      cy.annotate("Testing training mode selection");

      cy.enterTrainingMode();

      // Test training mode buttons
      cy.get('[data-testid="training-mode-stances"]')
        .should("exist")
        .click({ force: true });
      cy.get('[data-testid="training-mode-techniques"]')
        .should("exist")
        .click({ force: true });
      cy.get('[data-testid="training-mode-combinations"]')
        .should("exist")
        .click({ force: true });
      cy.get('[data-testid="training-mode-meditation"]')
        .should("exist")
        .click({ force: true });

      cy.annotate("Training mode selection working");
    });

    it("should support stance practice", () => {
      cy.annotate("Testing stance practice");

      cy.enterTrainingMode();

      // Practice different stances
      cy.get('[data-testid="training-trigram-wheel"]').should("exist");

      // Test stance selection via keyboard
      cy.practiceStance(1, 2); // Practice geon stance twice
      cy.practiceStance(2, 1); // Practice tae stance once
      cy.practiceStance(3, 1); // Practice li stance once

      // Verify stats updated
      cy.get('[data-testid="training-stats-panel"]').should("exist");

      cy.annotate("Stance practice completed");
    });

    it("should track training statistics", () => {
      cy.annotate("Testing training statistics");

      cy.enterTrainingMode();

      // Perform some training actions
      cy.practiceStance(1, 3);
      cy.practiceStance(2, 2);

      // Check if stats panel shows updates
      cy.get('[data-testid="training-stats-panel"]').should("exist");
      cy.get('[data-testid="training-progress"]').should("exist");

      cy.annotate("Training statistics verified");
    });

    it("should support dummy interaction", () => {
      cy.annotate("Testing dummy interaction");

      cy.enterTrainingMode();

      // Test dummy reset functionality
      cy.get('[data-testid="reset-dummy-button"]')
        .should("exist")
        .click({ force: true });

      // Test dummy targeting
      cy.get('[data-testid="training-dummy"]')
        .should("exist")
        .click({ force: true });

      cy.annotate("Dummy interaction working");
    });

    it("should display training controls", () => {
      cy.annotate("Testing training controls");

      cy.enterTrainingMode();

      // Verify control instructions
      cy.get('[data-testid="training-controls"]').should("exist");

      // Test action buttons
      cy.get('[data-testid="reset-dummy-button"]').should("exist");
      cy.get('[data-testid="return-menu-button"]').should("exist");

      cy.annotate("Training controls verified");
    });

    it("should return to menu from training", () => {
      cy.annotate("Testing return to menu");

      cy.enterTrainingMode();

      // Test return to menu
      cy.returnToIntro();

      // Verify we're back on intro screen
      cy.get('[data-testid="intro-screen"]').should("exist");
      cy.get('[data-testid="training-button"]').should("be.visible");

      cy.annotate("Return to menu successful");
    });
  });

  describe("Training Mode Responsive Design", () => {
    it("should adapt to different screen sizes", () => {
      cy.annotate("Testing responsive training mode");

      const viewports = [
        [1280, 720], // Desktop
        [768, 1024], // Tablet
        [375, 667], // Mobile
      ];

      viewports.forEach(([width, height]) => {
        cy.viewport(width, height);
        cy.wait(1000);

        cy.enterTrainingMode();

        // Check essential elements exist at all sizes
        cy.get('[data-testid="training-screen"]').should("exist");
        cy.get('[data-testid="training-area"]').should("exist");

        cy.returnToIntro();
      });

      cy.annotate("Responsive training mode verified");
    });
  });
});
