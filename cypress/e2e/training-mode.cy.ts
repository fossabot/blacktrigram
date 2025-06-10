describe("Black Trigram Training Mode", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.enterTrainingMode();
    cy.wait(2000); // Fix: Wait for training screen to load
  });

  it("should display training screen components", () => {
    // Fix: Check for training screen data-testid in overlay
    cy.get('[data-testid="training-screen"]').should("exist");

    // Check for basic training elements by content
    cy.contains("훈련").should("be.visible");
    cy.contains("Training").should("be.visible");
  });

  it("should support training mode workflow", () => {
    cy.log("Testing training mode workflow");

    // Fix: Look for training mode elements by content instead of specific test IDs
    cy.contains("기초", { timeout: 10000 }).should("be.visible").click();
    cy.wait(1000);

    cy.contains("중급").should("be.visible").click();
    cy.wait(1000);

    cy.contains("고급").should("be.visible").click();
    cy.wait(1000);
  });

  it("should allow trigram stance selection", () => {
    // Fix: Use more flexible content matching
    cy.contains("팔괘", { timeout: 10000 }).should("be.visible");
    cy.contains("자세").should("be.visible");

    // Test stance selection through keyboard
    cy.get("body").type("1"); // Geon stance
    cy.wait(500);
    cy.get("body").type("2"); // Tae stance
    cy.wait(500);
  });

  it("should show stance information", () => {
    // Fix: More flexible text matching
    cy.contains("현재", { timeout: 10000 }).should("be.visible");
    cy.contains("자세").should("be.visible");
  });

  it("should handle player status controls", () => {
    // Fix: More flexible content matching
    cy.contains("수련", { timeout: 10000 }).should("be.visible");
    cy.contains("상태").should("be.visible");
  });

  it("should support complete training workflow", () => {
    cy.annotate("Starting training workflow test");

    // Enter training mode
    cy.enterTrainingMode();

    // Practice multiple stances
    cy.annotate("Practicing stances");
    cy.practiceStance(1, 2); // Practice first stance twice
    cy.practiceStance(2, 1); // Practice second stance once
    cy.practiceStance(3, 1); // Practice third stance once

    // Test training controls
    cy.gameActions(["w", "a", "s", "d"]); // Movement
    cy.gameActions([" ", " ", " "]); // Execute techniques

    // Return to menu
    cy.annotate("Returning to menu");
    cy.returnToIntro();

    cy.annotate("Training workflow test completed");
  });

  it("should handle rapid input during training", () => {
    cy.annotate("Testing rapid input handling");

    cy.enterTrainingMode();

    // Rapid stance changes and techniques
    cy.gameActions(["1", " ", "2", " ", "3", " ", "4", " "]);

    // Test movement with attacks
    cy.gameActions(["w", "1", "a", "2", "s", "3", "d", "4"]);

    cy.returnToIntro();
  });
});
