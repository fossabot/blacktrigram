describe("Black Trigram Training Mode", () => {
  beforeEach(() => {
    // Use the new visitWithWebGLMock command
    cy.visitWithWebGLMock("/", { timeout: 12000 });

    // Wait for the intro screen to appear
    cy.get(".intro-screen").should("be.visible");

    // Enter training mode
    cy.get('[data-testid="training-button"]').click();

    // Wait for training screen
    cy.get("[data-testid='training-screen']").should("be.visible");
  });

  it("should display training screen components", () => {
    // Check basic components are present
    cy.get("[data-testid='training-screen']").within(() => {
      // Check for Korean text headers
      cy.contains("흑괘").should("be.visible");
      cy.contains("무술").should("be.visible");

      // Check for stance selection
      cy.contains("팔괘").should("be.visible");

      // Check for control buttons
      cy.contains("돌아가기").should("be.visible");
    });
  });

  it("should support training mode workflow", () => {
    cy.annotate("Testing training mode workflow");

    // Check training mode sections
    cy.contains("기초").should("be.visible").click();
    cy.contains("기법").should("be.visible").click();
    cy.contains("철학").should("be.visible").click();

    // Return to basics
    cy.contains("기초").click();

    // Try a technique execution if available
    cy.contains("기법").click();
    cy.get("button").contains("기법 실행").should("be.visible");

    // Return to intro screen
    cy.contains("메뉴로 돌아가기").click();
    cy.get(".intro-screen").should("be.visible");
  });

  it("should allow trigram stance selection", () => {
    // The TrigramWheel component might not be directly clickable in tests,
    // but we can check it exists and then simulate stance changes via UI or keyboard

    cy.contains("팔괘 자세 수련").should("be.visible");

    // Use keyboard for stance changes (1-8 keys correspond to trigram stances)
    cy.get("body").type("1");
    cy.wait(300);
    cy.get("body").type("2");
    cy.wait(300);
    cy.get("body").type("3");
    cy.wait(300);

    // Check the technique execution button in technique mode
    cy.contains("기법").click();
    cy.get("button").contains("기법 실행").should("exist");

    // Return to basics
    cy.contains("기초").click();
  });

  it("should show stance information", () => {
    // Verify the stance information section exists
    cy.contains("현재 자세").should("be.visible");

    // Change stance and verify info updates
    cy.get("body").type("2"); // Select second stance
    cy.wait(500);

    // Go to philosophy mode
    cy.contains("철학").click();
    cy.contains("무술 철학").should("be.visible");
  });

  it("should handle player status controls", () => {
    // Check player status section
    cy.contains("수련자 상태").should("be.visible");

    // Try combat mode button
    cy.contains("실전 모드").should("be.visible");

    // Try restore button
    cy.contains("회복").click();

    // Return to intro
    cy.contains("메뉴로 돌아가기").click();
    cy.get(".intro-screen").should("be.visible");
  });
});
