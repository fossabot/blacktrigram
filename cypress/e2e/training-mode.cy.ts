describe("Black Trigram Training Mode", () => {
  beforeEach(() => {
    cy.visitWithWebGLMock("/", { timeout: 15000 });
    cy.waitForCanvasReady();
    cy.enterTrainingMode();
    cy.wait(2000); // Wait for training screen to load
  });

  it("should display training screen components", () => {
    // Check for training screen data-testid
    cy.get('[data-testid="training-screen"]', { timeout: 10000 }).should(
      "exist"
    );

    // Check for essential training elements
    cy.get('[data-testid="training-title"]').should("exist");
    cy.get('[data-testid="training-mode-selection"]').should("exist");
    cy.get('[data-testid="stance-selection"]').should("exist");
  });

  it("should support training mode workflow", () => {
    cy.log("Testing training mode workflow");

    // Check for training mode buttons
    cy.get('[data-testid="training-mode-basic"]', { timeout: 10000 }).should(
      "exist"
    );
    cy.get('[data-testid="mode-button-basic"]').click({ force: true });
    cy.wait(500);

    cy.get('[data-testid="training-mode-intermediate"]').should("exist");
    cy.get('[data-testid="mode-button-intermediate"]').click({ force: true });
    cy.wait(500);

    cy.get('[data-testid="training-mode-advanced"]').should("exist");
    cy.get('[data-testid="mode-button-advanced"]').click({ force: true });
    cy.wait(500);
  });

  it("should allow trigram stance selection", () => {
    // Check for trigram wheel and stance selection
    cy.get('[data-testid="trigram-wheel"]', { timeout: 10000 }).should("exist");
    cy.get('[data-testid="stance-selection-title"]').should("exist");

    // Test stance selection through keyboard
    cy.get("body").type("1"); // Geon stance
    cy.wait(500);
    cy.get("body").type("2"); // Tae stance
    cy.wait(500);
    cy.get("body").type("3"); // Li stance
    cy.wait(500);
  });

  it("should show stance information", () => {
    // Check for current stance display
    cy.get('[data-testid="current-stance-display"]', { timeout: 10000 }).should(
      "exist"
    );
    cy.get('[data-testid="stance-indicator"]').should("exist");
  });

  it("should handle player status controls", () => {
    // Check for training stats and progress
    cy.get('[data-testid="training-stats"]', { timeout: 10000 }).should(
      "exist"
    );
    cy.get('[data-testid="stats-title"]').should("exist");
    cy.get('[data-testid="techniques-count"]').should("exist");
    cy.get('[data-testid="accuracy-display"]').should("exist");
  });

  it("should support complete training workflow", () => {
    cy.annotate("Starting training workflow test");

    // Verify we're in training mode
    cy.get('[data-testid="training-screen"]', { timeout: 10000 }).should(
      "exist"
    );

    // Practice multiple stances
    cy.annotate("Practicing stances");
    cy.practiceStance(1, 2); // Practice first stance twice
    cy.practiceStance(2, 1); // Practice second stance once
    cy.practiceStance(3, 1); // Practice third stance once

    // Test training controls
    cy.gameActions(["w", "a", "s", "d"]); // Movement
    cy.gameActions([" ", " ", " "]); // Execute techniques

    // Check that stats updated
    cy.get('[data-testid="techniques-count"]').should("contain", "기법 실행");

    // Return to menu
    cy.annotate("Returning to menu");
    cy.returnToIntro();

    cy.annotate("Training workflow test completed");
  });

  it("should handle rapid input during training", () => {
    cy.annotate("Testing rapid input handling");

    cy.get('[data-testid="training-screen"]', { timeout: 10000 }).should(
      "exist"
    );

    // Rapid stance changes and techniques
    cy.gameActions(["1", " ", "2", " ", "3", " ", "4", " "]);

    // Test movement with attacks
    cy.gameActions(["w", "1", "a", "2", "s", "3", "d", "4"]);

    // Verify stats updated
    cy.get('[data-testid="techniques-count"]').should("exist");

    cy.returnToIntro();
  });

  it("should display training controls help", () => {
    cy.get('[data-testid="training-controls"]', { timeout: 10000 }).should(
      "exist"
    );
    cy.get('[data-testid="controls-title"]').should("contain", "조작법");
    cy.get('[data-testid="stance-controls"]').should("contain", "1-8");
    cy.get('[data-testid="technique-controls"]').should("contain", "Space");
    cy.get('[data-testid="menu-controls"]').should("contain", "ESC");
  });
});
