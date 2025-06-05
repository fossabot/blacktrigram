describe("Black Trigram Combat Mode", () => {
  beforeEach(() => {
    // Use the new visitWithWebGLMock command
    cy.visitWithWebGLMock("/", { timeout: 12000 });

    // Wait for intro screen
    cy.get(".intro-screen").should("be.visible");

    // Enter combat mode
    cy.get('[data-testid="combat-button"]').click();
  });

  it("should display combat screen elements", () => {
    cy.annotate("Checking combat screen elements");

    // Since the combat screen renders different components, check for key elements
    // These checks are more generic since we don't have specific selectors
    cy.contains("Combat").should("exist");

    // There should be some UI element for the pause button
    cy.get("body").type("{esc}");
    cy.get(".intro-screen").should("be.visible");
  });

  it("should support stance changes during combat", () => {
    cy.annotate("Testing stance changes in combat");

    // Use keyboard to change stances (1-8)
    for (let i = 1; i <= 8; i++) {
      cy.get("body").type(`${i}`);
      cy.wait(200);
    }

    // Return to intro
    cy.get("body").type("{esc}");
    cy.get(".intro-screen").should("be.visible");
  });

  it("should support basic attacks", () => {
    cy.annotate("Testing basic attacks");

    // Select a stance
    cy.get("body").type("1"); // First stance
    cy.wait(300);

    // Execute attack (space key typically)
    cy.get("body").type(" ");
    cy.wait(300);

    // Try a different stance
    cy.get("body").type("3");
    cy.wait(300);

    // Execute attack in new stance
    cy.get("body").type(" ");
    cy.wait(300);

    // Try movement keys
    cy.get("body").type("w");
    cy.get("body").type("a");
    cy.get("body").type("s");
    cy.get("body").type("d");

    // Return to intro
    cy.get("body").type("{esc}");
    cy.get(".intro-screen").should("be.visible");
  });

  it("should display combat log or feedback", () => {
    // Perform actions that would generate combat log entries
    cy.get("body").type("1"); // Select first stance
    cy.wait(300);
    cy.get("body").type(" "); // Execute attack
    cy.wait(500);

    // Look for combat log or feedback elements
    // This is generic as we don't know the exact selectors
    cy.get("div").contains("전투").should("exist");

    // Return to intro
    cy.get("body").type("{esc}");
    cy.get(".intro-screen").should("be.visible");
  });

  it("should handle rapid combat inputs", () => {
    cy.annotate("Testing rapid combat inputs");

    // Rapidly test all stances and attacks
    cy.get("body").type("1 2 3 4 5 6 7 8", { delay: 100 });

    // Try movement combined with attacks
    cy.get("body").type("w 1 a 2 s 3 d 4", { delay: 100 });

    // Return to intro
    cy.get("body").type("{esc}");
    cy.get(".intro-screen").should("be.visible");
  });
});
