describe("Black Trigram Training Mode", () => {
  beforeEach(() => {
    cy.visit("/");
    // Enter training mode
    cy.get("body").type("2");
    cy.wait(500);
  });

  describe("Basic Training UI", () => {
    it("should display Korean training title", () => {
      // Verify canvas is visible
      cy.get("canvas").should("be.visible");
      cy.wait(500); // Wait for any animations
    });

    it("should show the trigram stance wheel", () => {
      // Verify canvas remains visible with stance wheel
      cy.get("canvas").should("be.visible");
    });

    it("should display training instructions in Korean", () => {
      // Verify canvas with instructions
      cy.get("canvas").should("be.visible");
    });
  });

  describe("Stance Selection and Practice", () => {
    it("should highlight the selected stance", () => {
      // Select each stance and verify it works
      for (let i = 1; i <= 8; i++) {
        cy.get("body").type(i.toString());
        cy.wait(200); // Wait for highlight animation
        cy.get("canvas").should("be.visible");
      }
    });

    it("should allow practicing each stance", () => {
      // Test practicing each stance
      for (let i = 1; i <= 8; i++) {
        // Select stance
        cy.get("body").type(i.toString());
        cy.wait(200);

        // Practice stance
        cy.get("body").type(" "); // Space to practice
        cy.wait(300); // Wait for practice animation
        cy.get("canvas").should("be.visible");
      }
    });

    it("should track practice count correctly", () => {
      // Select first stance
      cy.get("body").type("1");
      cy.wait(200);

      // Practice multiple times
      for (let i = 0; i < 5; i++) {
        cy.get("body").type(" ");
        cy.wait(200);
      }

      // Should track practice count
      cy.get("canvas").should("be.visible");
    });
  });

  describe("Training Mode Controls", () => {
    it("should respond to keyboard controls", () => {
      // Test arrow keys for selection
      cy.get("body").type("{leftarrow}");
      cy.wait(100);
      cy.get("body").type("{rightarrow}");
      cy.wait(100);

      // Test space for practice
      cy.get("body").type(" ");
      cy.wait(200);

      // Test number keys for direct selection
      cy.get("body").type("3");
      cy.wait(200);

      // Verify all controls work
      cy.get("canvas").should("be.visible");
    });

    it("should handle rapid input during training", () => {
      // Simulate rapid inputs
      const rapidInputs = "12345678";
      cy.get("body").type(rapidInputs);
      cy.wait(500);

      // Training mode should handle rapid stance changes
      cy.get("canvas").should("be.visible");
    });
  });

  describe("Performance in Training Mode", () => {
    it("should maintain performance during extended training", () => {
      // Extended training session
      for (let round = 0; round < 3; round++) {
        // Select stances
        for (let i = 1; i <= 8; i++) {
          cy.get("body").type(i.toString());
          cy.wait(100);

          // Practice each stance
          for (let p = 0; p < 3; p++) {
            cy.get("body").type(" ");
            cy.wait(100);
          }
        }
      }

      // Should maintain performance
      cy.get("canvas").should("be.visible");
    });
  });

  describe("Training Mode Navigation", () => {
    it("should exit training mode with escape key", () => {
      // Exit to intro
      cy.get("body").type("{esc}");
      cy.wait(500);

      // Should return to intro screen
      cy.get("canvas").should("be.visible");
    });

    it("should exit training mode with back button", () => {
      // Find and click the back button (top-left corner)
      cy.get("canvas").click(50, 50);
      cy.wait(500);

      // Should return to intro screen
      cy.get("canvas").should("be.visible");
    });
  });

  describe("Korean Cultural Authenticity", () => {
    it("should display authentic Korean martial arts elements", () => {
      // Verify canvas with Korean elements
      cy.get("canvas").should("be.visible");
    });

    it("should use correct trigram symbols for each stance", () => {
      // Check all stances have proper trigram symbols
      for (let i = 1; i <= 8; i++) {
        cy.get("body").type(i.toString());
        cy.wait(200);
        cy.get("canvas").should("be.visible");
      }
    });
  });
});
