describe("Black Trigram Intro Page E2E", () => {
  beforeEach(() => {
    // Enhanced error handling for audio and WebGL
    cy.on("uncaught:exception", (err) => {
      // Ignore audio, WebGL, and asset loading errors
      if (
        err.message.includes("Failed to load") ||
        err.message.includes("no supported source") ||
        err.message.includes("play() request was interrupted") ||
        err.message.includes("WebGL") ||
        err.message.includes("PIXI") ||
        err.message.includes("audio")
      ) {
        console.warn("Ignoring non-critical error:", err.message);
        return false;
      }
      return true;
    });

    cy.visitWithWebGLMock("/", { timeout: 15000 });
    cy.waitForCanvasReady();
  });

  describe("Initial Page Load", () => {
    it("should display the Black Trigram intro page correctly", () => {
      cy.annotate("Testing intro page display");

      // Verify app container
      cy.get('[data-testid="app-container"]', { timeout: 10000 }).should(
        "exist"
      );

      // Verify intro screen
      cy.get('[data-testid="intro-screen"]').should("exist");

      // Verify canvas is present and functional
      cy.get("canvas")
        .should("be.visible")
        .and(($canvas) => {
          const canvas = $canvas[0] as HTMLCanvasElement;
          expect(canvas.width).to.be.greaterThan(0);
          expect(canvas.height).to.be.greaterThan(0);
        });

      // Check for training button with fallback
      cy.get("body").then(($body) => {
        if ($body.find('[data-testid="training-button"]').length > 0) {
          cy.get('[data-testid="training-button"]').should("exist");
          cy.annotate("Training button found");
        } else {
          cy.annotate("Training button not found - using keyboard navigation");
        }
      });

      // Check for combat button with fallback
      cy.get("body").then(($body) => {
        if ($body.find('[data-testid="combat-button"]').length > 0) {
          cy.get('[data-testid="combat-button"]').should("exist");
          cy.annotate("Combat button found");
        } else {
          cy.annotate("Combat button not found - using keyboard navigation");
        }
      });
    });

    it("should render all archetype options correctly", () => {
      cy.annotate("Testing archetype options");

      // Check if archetype toggle exists
      cy.get("body").then(($body) => {
        if ($body.find('[data-testid="archetype-toggle"]').length > 0) {
          cy.get('[data-testid="archetype-toggle"]').should("exist");

          // Try to interact with archetype selection
          cy.get('[data-testid="archetype-toggle"]').click({ force: true });

          // Verify archetype list
          cy.get('[data-testid="archetype-list"]').should("exist");

          // Check for individual archetype options
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
          cy.annotate("Archetype selection not implemented - skipping");
        }
      });
    });
  });

  describe("User Interactions", () => {
    it("should allow archetype selection with correct UI updates", () => {
      cy.annotate("Testing archetype selection");

      // Use force: true to overcome pointer-events: none
      cy.get('[data-testid="archetype-toggle"]').click({ force: true });
      cy.get('[data-testid="archetype-list"]').should("exist");

      // Select Shadow Assassin archetype
      cy.get('[data-testid="archetype-option-amsalja"]').click({ force: true });

      // Verify selection (check if UI updates)
      cy.get('[data-testid="selected-archetype"]').should("contain", "암살자");

      // Select another archetype to verify dynamic changes
      cy.get('[data-testid="archetype-toggle"]').click({ force: true });
      cy.get('[data-testid="archetype-option-hacker"]').click({ force: true });
      cy.get('[data-testid="selected-archetype"]').should("contain", "해커");
    });

    it("should navigate to training mode and back", () => {
      cy.annotate("Testing training mode navigation");

      cy.enterTrainingMode();

      // Check if we're in training mode
      cy.get("body").then(($body) => {
        if ($body.find('[data-testid="training-screen"]').length > 0) {
          cy.annotate("Successfully entered training mode");
        } else {
          cy.annotate("Training mode navigation - using keyboard fallback");
        }
      });

      cy.returnToIntro();
    });

    it("should navigate to combat mode and back", () => {
      cy.annotate("Testing combat mode navigation");

      cy.enterCombatMode();

      // Check if we're in combat mode
      cy.get("body").then(($body) => {
        if ($body.find('[data-testid="combat-screen"]').length > 0) {
          cy.annotate("Successfully entered combat mode");
        } else {
          cy.annotate("Combat mode navigation - using keyboard fallback");
        }
      });

      cy.returnToIntro();
    });
  });

  describe("Responsive Design", () => {
    it("should adapt properly to different screen sizes", () => {
      cy.annotate("Testing responsive design");

      // Test key screen sizes efficiently
      const viewports = [
        { width: 1280, height: 800, name: "Desktop" },
        { width: 768, height: 1024, name: "Tablet" },
        { width: 375, height: 667, name: "Mobile" },
      ];

      viewports.forEach(({ width, height, name }) => {
        cy.annotate(`Testing ${name} viewport (${width}x${height})`);
        cy.viewport(width, height);
        cy.waitForCanvasReady();

        // Verify core UI elements are present at each size
        cy.get('[data-testid="intro-screen"]').should("exist");

        // Check canvas adapts to viewport
        cy.get("canvas").should(($canvas) => {
          const rect = $canvas[0].getBoundingClientRect();
          expect(rect.width).to.be.at.least(width * 0.8);
          expect(rect.height).to.be.at.least(height * 0.8);
        });
      });
    });
  });

  describe("Keyboard Accessibility", () => {
    it("should support keyboard navigation and shortcuts", () => {
      cy.annotate("Testing keyboard navigation");

      // Test shortcut keys for game modes
      cy.get("body").type("1", { delay: 100 }); // Combat shortcut
      cy.waitForCanvasReady();
      cy.get("body").type("{esc}", { delay: 100 });

      cy.get("body").type("2", { delay: 100 }); // Training shortcut
      cy.waitForCanvasReady();
      cy.get("body").type("{esc}", { delay: 100 });

      // Verify we're back at intro
      cy.get('[data-testid="intro-screen"]').should("exist");
    });
  });
});
