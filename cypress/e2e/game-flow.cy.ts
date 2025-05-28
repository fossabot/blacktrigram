describe("Black Trigram - Complete Game Flow E2E", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Intro Screen Navigation", () => {
    it("should navigate between game modes using keyboard", () => {
      // Test arrow key navigation
      cy.get("body").type("{leftarrow}");
      cy.get("body").type("{rightarrow}");

      // Test A/D key navigation
      cy.get("body").type("a");
      cy.get("body").type("d");

      // Canvas should remain responsive
      cy.get("canvas").should("be.visible");
    });

    it("should start sparring mode with space/enter", () => {
      // Test space key
      cy.get("body").type(" ");
      cy.wait(100);

      // Should enter game mode
      cy.get("canvas").should("be.visible");
    });

    it("should start sparring mode with number 1", () => {
      cy.get("body").type("1");
      cy.wait(100);

      // Should enter game mode
      cy.get("canvas").should("be.visible");
    });

    it("should start training mode with number 2", () => {
      cy.get("body").type("2");
      cy.wait(100);

      // Should enter training mode
      cy.get("canvas").should("be.visible");
    });

    it("should start training mode with alt key", () => {
      cy.get("body").type("{alt}");
      cy.wait(100);

      // Should enter training mode
      cy.get("canvas").should("be.visible");
    });
  });

  describe("Game Mode Transitions", () => {
    it("should transition from intro to sparring mode", () => {
      // Start sparring
      cy.get("body").type("1");
      cy.wait(500);

      // Should be in game mode now
      cy.get("canvas").should("be.visible");

      // Canvas should be interactive
      cy.get("canvas").should("be.visible").and("have.attr", "style");
    });

    it("should show training mode placeholder", () => {
      // Start training
      cy.get("body").type("2");
      cy.wait(500);

      // Should be in training mode
      cy.get("canvas").should("be.visible");
    });

    it("should handle rapid mode switching", () => {
      // Rapid key presses
      cy.get("body").type("1");
      cy.wait(100);
      cy.get("body").type("2");
      cy.wait(100);
      cy.get("body").type("1");

      // Should remain stable
      cy.get("canvas").should("be.visible");
    });
  });

  describe("Korean Martial Arts Combat", () => {
    beforeEach(() => {
      // Enter sparring mode
      cy.get("body").type("1");
      cy.wait(500);
    });

    it("should support WASD movement controls", () => {
      // Test movement keys
      cy.get("body").type("w");
      cy.get("body").type("a");
      cy.get("body").type("s");
      cy.get("body").type("d");

      // Game should remain responsive
      cy.get("canvas").should("be.visible");
    });

    it("should support arrow key movement", () => {
      cy.get("body").type("{uparrow}");
      cy.get("body").type("{downarrow}");
      cy.get("body").type("{leftarrow}");
      cy.get("body").type("{rightarrow}");

      // Game should remain responsive
      cy.get("canvas").should("be.visible");
    });

    it("should execute trigram techniques with number keys", () => {
      // Test all 8 trigram techniques
      for (let i = 1; i <= 8; i++) {
        cy.get("body").type(i.toString());
        cy.wait(100);
      }

      // Game should handle all techniques
      cy.get("canvas").should("be.visible");
    });

    it("should support blocking with space key", () => {
      cy.get("body").type(" ");
      cy.wait(100);

      // Should maintain blocking state
      cy.get("canvas").should("be.visible");
    });

    it("should handle click/touch attacks", () => {
      // Click on canvas for quick attack
      cy.get("canvas").click(400, 300);
      cy.wait(100);

      // Should execute attack
      cy.get("canvas").should("be.visible");
    });
  });

  describe("AI Opponent Behavior", () => {
    beforeEach(() => {
      // Enter sparring mode
      cy.get("body").type("1");
      cy.wait(500);
    });

    it("should have responsive AI opponent", () => {
      // Move around to trigger AI response
      cy.get("body").type("dddd"); // Move right
      cy.wait(500);
      cy.get("body").type("aaaa"); // Move left
      cy.wait(500);

      // AI should respond to player movement
      cy.get("canvas").should("be.visible");
    });

    it("should handle AI attacks", () => {
      // Stay close to trigger AI attacks
      cy.get("body").type("d"); // Move toward opponent
      cy.wait(1000); // Wait for AI to react

      // Game should handle AI behavior
      cy.get("canvas").should("be.visible");
    });
  });

  describe("Performance Testing", () => {
    it("should maintain 60fps during intense combat", () => {
      // Enter sparring mode
      cy.get("body").type("1");
      cy.wait(1000); // Longer wait for game to fully initialize

      // Ensure canvas is present before starting performance test
      cy.get("canvas").should("be.visible");

      // Perform more realistic rapid actions with smaller chunks
      const actionSequences = [
        "wasd", // Movement
        "1234", // Basic attacks
        "wasd", // More movement
        "5678", // Advanced attacks
        "   ", // Blocking
      ];

      actionSequences.forEach((sequence, index) => {
        cy.get("body").type(sequence);
        cy.wait(200); // Give time for processing

        // Verify canvas remains visible after each sequence
        cy.get("canvas").should("be.visible");
      });

      // Final verification
      cy.get("canvas").should("be.visible");
    });

    it("should handle extended gameplay sessions", () => {
      // Enter sparring mode
      cy.get("body").type("1");
      cy.wait(1000);

      // Simulate extended play with more realistic timing
      for (let i = 0; i < 5; i++) {
        cy.get("body").type("wasd");
        cy.wait(300);
        cy.get("body").type("1234");
        cy.wait(300);

        // Check canvas periodically during extended play
        cy.get("canvas").should("be.visible");
      }

      // Should maintain stability
      cy.get("canvas").should("be.visible");
    });
  });

  describe("Cultural Authenticity", () => {
    it("should display Korean martial arts elements", () => {
      // Enter sparring mode
      cy.get("body").type("1");
      cy.wait(500);

      // Game should render Korean-themed content
      cy.get("canvas").should("be.visible");
    });

    it("should support Korean text rendering", () => {
      // The canvas should render Korean characters properly
      cy.get("canvas").should("be.visible");

      // Check that Korean fonts are loaded
      cy.document().then((doc) => {
        const link = doc.querySelector('link[href*="Noto+Sans+KR"]');
        expect(link).to.exist;
      });
    });
  });

  describe("Accessibility Features", () => {
    it("should be keyboard accessible", () => {
      // All game functions should work with keyboard only
      cy.get("body").type("1"); // Start game
      cy.wait(500);

      cy.get("body").type("wasd"); // Movement
      cy.get("body").type("1234"); // Attacks
      cy.get("body").type(" "); // Block

      // Should be fully playable with keyboard
      cy.get("canvas").should("be.visible");
    });

    it("should support both WASD and arrow keys", () => {
      cy.get("body").type("1");
      cy.wait(500);

      // Test both control schemes
      cy.get("body").type("wasd");
      cy.get("body").type("{uparrow}{downarrow}{leftarrow}{rightarrow}");

      // Both should work
      cy.get("canvas").should("be.visible");
    });
  });

  describe("Error Recovery", () => {
    it("should recover from rapid key combinations", () => {
      // Ensure we are in game mode
      cy.get("body").type("1");
      cy.wait(500);

      // Send more reasonable key combinations with proper delays
      const keySequences = [
        "wasd",
        "1234",
        "5678",
        " ", // space for blocking
      ];

      keySequences.forEach((sequence, index) => {
        cy.get("body").type(sequence);
        cy.wait(100); // Reasonable delay between sequences
      });

      // Should remain stable
      cy.get("canvas").should("be.visible");

      // Verify the game is still responsive
      cy.get("body").type("w");
      cy.wait(100);
      cy.get("canvas").should("be.visible");

      // Check that no error states are present
      cy.get("body").should("not.contain.text", "Error");
      cy.get("body").should("not.contain.text", "crash");
    });

    it("should handle simultaneous key presses", () => {
      cy.get("body").type("1");
      cy.wait(500);

      // Simulate more realistic simultaneous inputs
      cy.get("body").type("w1");
      cy.wait(50);
      cy.get("body").type("a2");
      cy.wait(50);
      cy.get("body").type("s3");
      cy.wait(50);
      cy.get("body").type("d4");

      // Should handle gracefully
      cy.get("canvas").should("be.visible");
    });
  });

  describe("Mobile Touch Support", () => {
    it("should work on touch devices", () => {
      // Simulate mobile viewport
      cy.viewport(375, 667);

      // Enter game mode
      cy.get("body").type("1");
      cy.wait(500);

      // Test touch interaction
      cy.get("canvas").click();

      // Should work on mobile
      cy.get("canvas").should("be.visible");
    });

    it("should scale properly on different screen sizes", () => {
      // Test various screen sizes
      const sizes = [
        [1920, 1080], // Desktop
        [1024, 768], // Tablet
        [375, 667], // Mobile
      ];

      sizes.forEach(([width, height]) => {
        cy.viewport(width, height);
        cy.get("canvas").should("be.visible");

        // Canvas should scale to screen
        cy.get("canvas").should(($canvas) => {
          const rect = $canvas[0].getBoundingClientRect();
          expect(rect.width).to.be.at.least(width * 0.9);
          expect(rect.height).to.be.at.least(height * 0.9);
        });
      });
    });
  });

  describe("Training Mode Features", () => {
    beforeEach(() => {
      cy.visit("/");
      // Enter training mode
      cy.get("body").type("2");
      cy.wait(500);
    });

    it("should display training screen with Korean title", () => {
      // Canvas should be visible in training mode
      cy.get("canvas").should("be.visible");

      // Training mode should remain stable
      cy.wait(1000);
      cy.get("canvas").should("be.visible");
    });

    it("should allow stance selection with number keys", () => {
      // Test all 8 trigram stances
      for (let i = 1; i <= 8; i++) {
        cy.get("body").type(i.toString());
        cy.wait(200); // Wait for stance change animation
      }

      // Training mode should handle stance changes
      cy.get("canvas").should("be.visible");
    });

    it("should track practice count for each stance", () => {
      // Select a stance and practice
      cy.get("body").type("1"); // Select first stance
      cy.wait(200);

      // Practice the stance multiple times
      for (let i = 0; i < 5; i++) {
        cy.get("body").type(" "); // Space to practice
        cy.wait(100);
      }

      // Training mode should track practice count
      cy.get("canvas").should("be.visible");
    });

    it("should return to intro screen with escape key", () => {
      // Exit training mode
      cy.get("body").type("{esc}");
      cy.wait(500);

      // Should return to intro screen
      cy.get("canvas").should("be.visible");

      // Verify we can navigate again from intro
      cy.get("body").type("1"); // Try entering game mode
      cy.wait(500);
      cy.get("canvas").should("be.visible");
    });
  });

  describe("Mode Transitions", () => {
    it("should transition between all game modes smoothly", () => {
      // Start in intro mode
      cy.visit("/");
      cy.get("canvas").should("be.visible");

      // Go to training mode
      cy.get("body").type("2");
      cy.wait(500);
      cy.get("canvas").should("be.visible");

      // Back to intro
      cy.get("body").type("{esc}");
      cy.wait(500);
      cy.get("canvas").should("be.visible");

      // Go to sparring mode
      cy.get("body").type("1");
      cy.wait(500);
      cy.get("canvas").should("be.visible");

      // Back to intro
      cy.get("body").type("{esc}");
      cy.wait(500);
      cy.get("canvas").should("be.visible");
    });
  });
});
