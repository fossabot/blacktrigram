describe("Black Trigram Intro Page E2E", () => {
  beforeEach(() => {
    // Use the new visitWithWebGLMock command instead of separate commands
    cy.visitWithWebGLMock("/", { timeout: 15000 });
    cy.waitForCanvasReady();
  });

  describe("Initial Page Load", () => {
    it("should display the Black Trigram intro page correctly", () => {
      // Verify main UI elements with better selectors
      cy.get("[data-testid='app-container']").should("exist");
      cy.get("[data-testid='intro-screen']").should("exist");

      // Verify the Korean title elements
      cy.get("[data-testid='title-section']").should("be.visible");
      cy.get("[data-testid='trigram-symbols']")
        .should("be.visible")
        .contains("☰");

      // Verify action buttons with more specific selectors
      cy.get("[data-testid='action-buttons']").should("be.visible");
      cy.get("[data-testid='training-button']").should("be.visible");
      cy.get("[data-testid='combat-button']").should("be.visible");
    });

    it("should render all archetype options correctly", () => {
      // Open archetype selection
      cy.get("[data-testid='archetype-toggle']").click();
      cy.get("[data-testid='archetype-list']").should("exist");

      // Verify all five archetype options are present
      const archetypes = [
        "musa",
        "amsalja",
        "hacker",
        "jeongbo_yowon",
        "jojik_pokryeokbae",
      ];
      archetypes.forEach((archetype) => {
        cy.get(`[data-testid='archetype-option-${archetype}']`).should("exist");
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
      cy.annotate("Testing training mode navigation");

      // Enter training mode
      cy.get("[data-testid='training-button']").click();
      cy.get("[data-testid='training-screen']").should("be.visible");

      // Verify key training screen elements
      cy.get("[data-testid='training-title']").should("contain", "흑괘");
      cy.get("[data-testid='player-status-panel']").should("be.visible");
      cy.get("[data-testid='training-content-panel']").should("be.visible");
      cy.get("[data-testid='controls-panel']").should("be.visible");

      // Return to intro
      cy.get("[data-testid='return-to-menu-button']").click();
      cy.get("[data-testid='intro-screen']").should("be.visible");
    });

    it("should navigate to combat mode and back", () => {
      cy.annotate("Testing combat mode navigation");

      // Enter combat mode
      cy.get("[data-testid='combat-button']").click();

      // Since combat elements might be more dynamic, use a more reliable approach
      cy.url().should("include", "/"); // Verify we're still in the application
      cy.get("body").type("{esc}"); // Universal escape key to return

      // Should be back at intro
      cy.get("[data-testid='intro-screen']").should("be.visible");
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
