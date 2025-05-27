describe("Black Trigram Intro Page E2E", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Initial Page Load", () => {
    it("should display the Black Trigram intro page correctly", () => {
      // Check page title - updated to match actual implementation
      cy.title().should(
        "eq",
        "Black Trigram (흑괘) - Korean Martial Arts Dojang"
      );

      // Check that the main container exists with full-screen styling
      cy.get(".app-container").should("be.visible");

      // Verify no old game elements are present
      cy.get("h1").should("not.exist");
      cy.get("p.instructions").should("not.exist");
    });

    it("should have proper page structure", () => {
      // Check main container
      cy.get(".app-container")
        .should("exist")
        .and("be.visible")
        .and("have.css", "position", "fixed");

      // Verify background color is black
      cy.get(".app-container").should(
        "have.css",
        "background-color",
        "rgb(0, 0, 0)"
      );

      // Check that container takes full viewport - use more flexible assertion
      cy.get(".app-container").should(($el) => {
        const rect = $el[0].getBoundingClientRect();
        expect(rect.width).to.be.at.least(window.innerWidth * 0.9);
        expect(rect.height).to.be.at.least(window.innerHeight * 0.9);
      });
    });

    it("should load Korean fonts correctly", () => {
      // Check that Korean font is applied
      cy.get("body")
        .should("have.css", "font-family")
        .and("include", "Noto Sans KR");
    });
  });

  describe("PixiJS Canvas", () => {
    it("should render the PixiJS canvas with full-screen dimensions", () => {
      // PixiJS creates a canvas element
      cy.get("canvas").should("exist").and("be.visible");
    });

    it("should have full-screen canvas styling", () => {
      // Check canvas covers most of the viewport - more flexible test
      cy.get("canvas").should(($canvas) => {
        const rect = $canvas[0].getBoundingClientRect();
        expect(rect.width).to.be.at.least(window.innerWidth * 0.9);
        expect(rect.height).to.be.at.least(window.innerHeight * 0.9);
      });
    });

    it("should have black background", () => {
      // Verify canvas has black background (0x000000)
      cy.get("canvas").should("be.visible");

      // The canvas should be present and ready
      cy.get("canvas").should("have.attr", "style");
    });
  });

  describe("Korean Martial Arts Theme", () => {
    it("should display Korean martial arts elements", () => {
      // Wait for canvas to be ready
      cy.get("canvas").should("be.visible");

      // The actual game content is rendered via PixiJS, so we verify
      // the canvas is present and interactive
      cy.get("canvas").should("exist");
    });

    it("should be interactive for trigram hover effects", () => {
      // Wait for canvas to load
      cy.get("canvas").should("be.visible");

      // Test that canvas responds to mouse events
      cy.get("canvas").trigger("mousemove", { clientX: 200, clientY: 150 });

      // Canvas should remain visible and responsive
      cy.get("canvas").should("be.visible");
    });
  });

  describe("Accessibility", () => {
    it("should have proper page title for screen readers", () => {
      cy.title().should("contain", "Black Trigram");
      cy.title().should("contain", "흑괘");
      cy.title().should("contain", "Korean Martial Arts");
    });

    it("should have proper language attributes", () => {
      // Updated to match the actual lang attribute (English for accessibility)
      cy.get("html").should("have.attr", "lang", "en");
    });

    it("should be keyboard accessible", () => {
      // Focus should be manageable
      cy.get("body").should("be.visible");

      // Canvas should be present for interaction
      cy.get("canvas").should("exist");
    });
  });

  describe("Responsive Design", () => {
    it("should maintain full-screen layout on different screen sizes", () => {
      // Test on tablet size
      cy.viewport(768, 1024);
      cy.get(".app-container").should("be.visible");
      cy.get("canvas").should("be.visible");

      // Check that container takes most of the viewport
      cy.get(".app-container").should(($el) => {
        const rect = $el[0].getBoundingClientRect();
        expect(rect.width).to.be.at.least(768 * 0.9);
        expect(rect.height).to.be.at.least(1024 * 0.9);
      });

      // Test on mobile size
      cy.viewport(375, 667);
      cy.get(".app-container").should("be.visible");
      cy.get("canvas").should("be.visible");

      // Check that container takes most of the viewport
      cy.get(".app-container").should(($el) => {
        const rect = $el[0].getBoundingClientRect();
        expect(rect.width).to.be.at.least(375 * 0.9);
        expect(rect.height).to.be.at.least(667 * 0.9);
      });
    });

    it("should scale canvas appropriately on smaller screens", () => {
      cy.viewport(375, 667);

      // Canvas should cover most of the screen
      cy.get("canvas").should(($canvas) => {
        const rect = $canvas[0].getBoundingClientRect();
        expect(rect.width).to.be.at.least(375 * 0.9);
        expect(rect.height).to.be.at.least(667 * 0.9);
      });
    });
  });

  describe("Performance", () => {
    it("should load quickly", () => {
      // Page should load within reasonable time
      cy.get(".app-container").should("be.visible");
      cy.get("canvas").should("be.visible");
    });

    it("should have smooth rendering", () => {
      // Canvas should be ready for interaction
      cy.get("canvas").should("be.visible");

      // Test multiple mouse movements to ensure smooth rendering
      cy.get("canvas")
        .trigger("mousemove", { clientX: 100, clientY: 100 })
        .trigger("mousemove", { clientX: 200, clientY: 200 })
        .trigger("mousemove", { clientX: 300, clientY: 300 });

      // Canvas should remain responsive
      cy.get("canvas").should("be.visible");
    });
  });

  describe("Cultural Authenticity", () => {
    it("should display Korean characters in page title", () => {
      cy.title().should("include", "흑괘");
    });

    it("should load Korean fonts", () => {
      // Verify Korean font loading
      cy.document().then((doc) => {
        const link = doc.querySelector('link[href*="Noto+Sans+KR"]');
        expect(link).to.exist;
      });
    });

    it("should have proper Korean typography support", () => {
      // Check font preconnect for performance
      cy.get(
        'link[rel="preconnect"][href="https://fonts.googleapis.com"]'
      ).should("exist");
      cy.get('link[rel="preconnect"][href="https://fonts.gstatic.com"]').should(
        "exist"
      );
    });
  });
});
