describe("Black Trigram Training Mode", () => {
  beforeEach(() => {
    cy.visit("/", { timeout: 10000 });
    cy.waitForCanvasReady();
    cy.task("silenceWebGLWarning", null, { log: false });

    // Enter training mode once before each test
    cy.gameActions(["2"]);
    cy.waitForCanvasReady();
  });

  it("should support complete training workflow", () => {
    // Test all 8 stances in sequence with practice
    cy.annotate("Testing all 8 trigram stances");

    // Loop through all 8 stances
    for (let stance = 1; stance <= 8; stance++) {
      // Select stance
      cy.annotate(`Testing stance ${stance}`);
      cy.gameActions([stance.toString()]);
      cy.waitForCanvasReady();

      // Practice stance twice
      cy.gameActions([" ", " "]);
      cy.waitForCanvasReady();
    }

    // Test keyboard navigation
    cy.annotate("Testing training mode keyboard navigation");
    cy.gameActions(["{leftarrow}", "{rightarrow}"]);
    cy.waitForCanvasReady();

    // Return to intro screen
    cy.annotate("Returning to intro");
    cy.gameActions(["{esc}"]);
    cy.waitForCanvasReady();
  });

  it("should handle rapid stance transitions", () => {
    // Test rapid input
    cy.annotate("Testing rapid stance selection");

    // Select stances rapidly
    cy.gameActions(["12345678"]);
    cy.waitForCanvasReady();

    // Practice current stance
    cy.annotate("Practicing current stance");
    cy.gameActions([" "]);
    cy.waitForCanvasReady();

    // Return to intro
    cy.annotate("Returning to intro");
    cy.gameActions(["{esc}"]);
    cy.waitForCanvasReady();
  });

  it("should track stance practice progress", () => {
    // Select first stance
    cy.annotate("Testing stance practice counter");
    cy.gameActions(["1"]);
    cy.waitForCanvasReady();

    // Practice multiple times to test counter
    cy.annotate("Practicing stance 5 times");

    // Practice 5 times
    for (let i = 0; i < 5; i++) {
      cy.gameActions([" "]);
      cy.waitForCanvasReady();
    }

    // Return to intro
    cy.annotate("Returning to intro");
    cy.gameActions(["{esc}"]);
    cy.waitForCanvasReady();
  });

  it("should support mobile touch interactions", () => {
    // Test on mobile viewport
    cy.annotate("Testing mobile interactions");
    cy.viewport(375, 667);
    cy.waitForCanvasReady();

    // Click to interact with training mode
    cy.annotate("Testing back button click");
    cy.get("canvas").click(50, 50); // Click back button
    cy.waitForCanvasReady();

    // Should be back at intro screen
    cy.annotate("Re-entering training mode");
    cy.gameActions(["2"]); // Re-enter training
    cy.waitForCanvasReady();

    // Practice via click
    cy.annotate("Testing practice via click");
    cy.get("canvas").click(187, 333); // Click to practice
    cy.waitForCanvasReady();

    // Return to intro
    cy.annotate("Returning to intro");
    cy.gameActions(["{esc}"]);
    cy.waitForCanvasReady();
  });
});
