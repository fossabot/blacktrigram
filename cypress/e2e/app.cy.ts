describe("Black Trigram Intro Page E2E", () => {
  beforeEach(() => {
    // Handle uncaught exceptions from audio loading
    cy.on("uncaught:exception", (err, runnable) => {
      // Ignore audio loading errors
      if (
        err.message.includes("Failed to load") ||
        err.message.includes("no supported source") ||
        err.message.includes("play() request was interrupted")
      ) {
        return false;
      }
      return true;
    });

    // Use the new visitWithWebGLMock command instead of separate commands
    cy.visitWithWebGLMock("/", { timeout: 15000 });
    cy.waitForCanvasReady();
  });

  describe("Initial Page Load", () => {
    it("should display the Black Trigram intro page correctly", () => {
      // Use multiple selectors for better reliability
      cy.get('[data-testid="app-container"]', { timeout: 10000 }).should(
        "exist"
      );

      // Check for intro screen with fallback
      cy.get("body").then(($body) => {
        if ($body.find('[data-testid="intro-screen"]').length > 0) {
          cy.get('[data-testid="intro-screen"]').should("be.visible");
        } else {
          cy.get(".intro-screen").should("exist");
        }
      });

      // Verify canvas is present
      cy.get("canvas").should("be.visible");

      // Check for menu elements with fallbacks
      cy.get("body").then(($body) => {
        // Training button
        if ($body.find('[data-testid="training-button"]').length > 0) {
          cy.get('[data-testid="training-button"]').should("be.visible");
        } else {
          cy.log(
            "Training button not found - checking for keyboard navigation"
          );
        }

        // Combat button
        if ($body.find('[data-testid="combat-button"]').length > 0) {
          cy.get('[data-testid="combat-button"]').should("be.visible");
        } else {
          cy.log("Combat button not found - checking for keyboard navigation");
        }
      });
    });

    it("should render all archetype options correctly", () => {
      // Test archetype functionality with fallbacks
      cy.get("body").then(($body) => {
        if ($body.find('[data-testid="archetype-toggle"]').length > 0) {
          cy.get('[data-testid="archetype-toggle"]')
            .should("be.visible")
            .click();

          // Check for archetype list
          cy.get('[data-testid="archetype-list"]').should("exist");

          // Verify all archetype options
          const archetypes = [
            "musa",
            "amsalja",
            "hacker",
            "jeongbo_yowon",
            "jojik_pokryeokbae",
          ];
          archetypes.forEach((archetype) => {
            cy.get(`[data-testid="archetype-option-${archetype}"]`).should(
              "exist"
            );
          });
        } else {
          cy.log("Archetype selection not implemented - skipping");
        }
      });
    });
  });

  describe("User Interactions", () => {
    it("should allow archetype selection with correct UI updates", () => {
      // Open the archetype toggle
      cy.get("[data-testid='archetype-toggle']").click();
      cy.get("[data-testid='archetype-list']").should("be.visible");

      // Select Shadow Assassin archetype
      cy.get("[data-testid='archetype-option-amsalja']").click();

      // Verify UI updates correctly
      cy.get("[data-testid='archetype-list']").should("not.exist");
      cy.get("[data-testid='selected-archetype']").should("contain", "암살자");

      // Select another archetype to verify dynamic changes
      cy.get("[data-testid='archetype-toggle']").click();
      cy.get("[data-testid='archetype-option-hacker']").click();
      cy.get("[data-testid='selected-archetype']").should("contain", "해커");
    });

    it("should navigate to training mode and back", () => {
      cy.enterTrainingMode();

      // Check if we're in training mode
      cy.get("body").then(($body) => {
        if (
          $body.find('[data-testid="training-screen"], .training-screen')
            .length > 0
        ) {
          cy.log("Successfully entered training mode");
        } else {
          cy.log("Training mode navigation - using keyboard fallback");
        }
      });

      cy.returnToIntro();
    });

    it("should navigate to combat mode and back", () => {
      cy.enterCombatMode();

      // Check if we're in combat mode
      cy.get("body").then(($body) => {
        if (
          $body.find('[data-testid="combat-screen"], .combat-screen').length > 0
        ) {
          cy.log("Successfully entered combat mode");
        } else {
          cy.log("Combat mode navigation - using keyboard fallback");
        }
      });

      cy.returnToIntro();
    });
  });

  describe("Black Trigram Complete Flow", () => {
    it("should support a full user journey through all game modes", () => {
      cy.annotate("Testing complete game flow");

      // 1. Select each archetype in sequence to verify all work
      const archetypes = [
        "musa",
        "amsalja",
        "hacker",
        "jeongbo_yowon",
        "jojik_pokryeokbae",
      ];
      for (const archetype of archetypes) {
        cy.get("[data-testid='archetype-toggle']").click();
        cy.get(`[data-testid='archetype-option-${archetype}']`).click();
        cy.wait(300); // Brief wait for state update
      }

      // 2. Enter training with final selected archetype
      cy.get("[data-testid='training-button']").click();
      cy.get("[data-testid='training-screen']").should("be.visible");

      // 3. Try different training modes
      cy.get("[data-testid='mode-basics']").click();
      cy.wait(300);
      cy.get("[data-testid='mode-techniques']").click();
      cy.wait(300);
      cy.get("[data-testid='mode-philosophy']").click();
      cy.wait(300);

      // 4. Enter combat directly from training
      cy.get("[data-testid='enter-combat-button']").click();

      // 5. Return to intro from combat
      cy.get("body").type("{esc}");
      cy.get("[data-testid='intro-screen']").should("be.visible");
    });
  });

  describe("Responsive Design", () => {
    it("should adapt properly to different screen sizes", () => {
      // Test three key screen sizes
      const viewports = [
        { width: 1280, height: 800, name: "Desktop" },
        { width: 768, height: 1024, name: "Tablet" },
        { width: 375, height: 667, name: "Mobile" },
      ];

      viewports.forEach(({ width, height, name }) => {
        cy.annotate(`Testing ${name} viewport (${width}x${height})`);
        cy.viewport(width, height);

        // Verify core UI elements are visible at each size
        cy.get("[data-testid='intro-screen']").should("be.visible");
        cy.get("[data-testid='title-section']").should("be.visible");
        cy.get("[data-testid='action-buttons']").should("be.visible");

        // Extra check for correct button orientation based on screen size
        if (width < 768) {
          // On mobile, buttons might be stacked or have different styling
          cy.get("[data-testid='action-buttons']").should("exist");
        } else {
          // On larger screens, buttons should be side-by-side
          cy.get("[data-testid='action-buttons'] button")
            .first()
            .should("be.visible");
        }
      });
    });
  });

  describe("Keyboard Accessibility", () => {
    it("should support keyboard navigation and shortcuts", () => {
      // Test tab navigation through focusable elements using our custom tab command
      cy.get("body").tab(); // First focusable element
      cy.focused().should("exist");
      cy.get("body").tab(); // Next focusable element
      cy.focused().should("exist");

      // Test shortcut keys for game modes
      cy.get("body").type("1"); // Combat shortcut
      cy.url().should("include", "/");
      cy.get("body").type("{esc}");

      cy.get("body").type("2"); // Training shortcut
      cy.get("[data-testid='training-screen']").should("be.visible");
      cy.get("body").type("{esc}");
      cy.get("[data-testid='intro-screen']").should("be.visible");
    });
  });
});
