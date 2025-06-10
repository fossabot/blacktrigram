describe("Black Trigram PixiJS Integration Tests", () => {
  beforeEach(() => {
    cy.visitWithWebGLMock("/", { timeout: 15000 });
    cy.waitForCanvasReady();
  });

  describe("PixiJS Object Testing", () => {
    it("should render and interact with trigram stances", () => {
      cy.annotate("Testing PixiJS trigram stance rendering");

      // Enter training mode to access trigram wheel
      cy.enterTrainingMode();

      // Wait for trigram wheel to render in PixiJS
      cy.assertPixiObjectExists({ type: "trigram-wheel" });

      // Test each trigram stance
      const stances = ["geon", "tae", "li", "jin", "son", "gam", "gan", "gon"];

      stances.forEach((stance, index) => {
        cy.annotate(`Testing stance: ${stance} (${index + 1})`);

        // Click stance button via keyboard
        cy.get("body").type(`${index + 1}`);

        // Verify stance is active in PixiJS
        cy.assertPixiObjectExists({
          type: "trigram-stance",
          stance: stance,
          isActive: true,
        });

        // Verify stance text is displayed
        cy.assertPixiObjectExists({
          type: "trigram-stance-text",
          stance: stance,
        });
      });
    });

    it("should test player archetype rendering", () => {
      cy.annotate("Testing player archetype PixiJS rendering");

      // Test archetype selection
      cy.get('[data-testid="archetype-toggle"]').click();

      const archetypes = [
        "musa",
        "amsalja",
        "hacker",
        "jeongbo_yowon",
        "jojik_pokryeokbae",
      ];

      archetypes.forEach((archetype) => {
        cy.annotate(`Testing archetype: ${archetype}`);

        cy.get(`[data-testid="archetype-option-${archetype}"]`).click();

        // Verify archetype is reflected in PixiJS player object
        cy.assertPixiObjectExists({
          type: "player-archetype-label",
          archetype: archetype,
        });
      });
    });

    it("should test combat interactions via PixiJS", () => {
      cy.annotate("Testing combat PixiJS interactions");

      // Enter combat mode
      cy.enterCombatMode();

      // Wait for players to render
      cy.assertPixiObjectExists({ type: "player", playerId: "player1" });
      cy.assertPixiObjectExists({ type: "player", playerId: "player2" });

      // Test attacking by clicking on opponent
      cy.clickPixiObject({ type: "player", playerId: "player2" });

      // Verify hit effect is created
      cy.assertPixiObjectExists({ type: "hit-effect" });

      // Test stance changes during combat
      cy.get("body").type("2"); // Change to Tae stance
      cy.assertPixiObjectExists({
        type: "player",
        playerId: "player1",
        stance: "tae",
      });

      // Execute technique
      cy.get("body").type(" "); // Space to execute
      cy.assertPixiObjectExists({ type: "technique-effect" });
    });

    it("should test vital point targeting", () => {
      cy.annotate("Testing vital point PixiJS targeting");

      cy.enterTrainingMode();

      // Enter vital point mode
      cy.get("body").type("{ctrl}");

      // Wait for vital points to be displayed
      cy.assertPixiObjectExists({ type: "vital-point-overlay" });

      // Test clicking on specific vital points
      cy.getVitalPoint("baekhoehoel").should("exist");
      cy.clickPixiObject({ type: "vital-point", name: "baekhoehoel" });

      // Verify targeting feedback
      cy.assertPixiObjectExists({
        type: "vital-point-target",
        name: "baekhoehoel",
        isTargeted: true,
      });
    });

    it("should test Korean text rendering in PixiJS", () => {
      cy.annotate("Testing Korean text in PixiJS");

      // Korean text should be rendered correctly
      cy.assertPixiObjectExists({
        type: "korean-title",
        text: "흑괘",
      });

      cy.assertPixiObjectExists({
        type: "korean-subtitle",
        text: "한국 무술 시뮬레이터",
      });

      // Enter training mode
      cy.enterTrainingMode();

      // Check Korean stance names
      cy.assertPixiObjectExists({
        type: "trigram-stance-text",
        korean: "건",
      });
    });

    it("should test PixiJS performance during intense combat", () => {
      cy.annotate("Testing PixiJS performance metrics");

      cy.enterCombatMode();

      const startTime = Date.now();

      // Perform rapid combat actions
      for (let i = 0; i < 8; i++) {
        cy.get("body").type(`${i + 1}`); // Change stance
        cy.get("body").type(" "); // Execute technique

        // Verify objects are still being rendered correctly
        cy.assertPixiObjectExists({ type: "player", playerId: "player1" });
      }

      cy.wrap(null).then(() => {
        const duration = Date.now() - startTime;
        cy.task("logPerformance", {
          name: "PixiJS Rapid Combat",
          duration,
        });

        // Should complete in reasonable time even with PixiJS rendering
        expect(duration).to.be.lessThan(15000);
      });

      // Verify no PixiJS objects are corrupted
      cy.assertPixiObjectExists({ type: "combat-hud" });
      cy.assertNoPixiObjectExists({ type: "error-display" });
    });
  });

  describe("PixiJS State Synchronization", () => {
    it("should keep HTML and PixiJS state synchronized", () => {
      cy.annotate("Testing HTML/PixiJS state sync");

      cy.enterTrainingMode();

      // HTML state change should reflect in PixiJS
      cy.get('[data-testid="mode-techniques"]').click();
      cy.assertPixiObjectExists({
        type: "training-mode",
        mode: "techniques",
      });

      // PixiJS interaction should update HTML state
      cy.clickPixiObject({ type: "trigram-stance", stance: "li" });
      cy.get('[data-testid="stance-indicator"]').should("contain", "li");
    });
  });
});
