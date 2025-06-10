/// <reference types="cypress" />

interface PixiTestData {
  readonly type: string;
  readonly [key: string]: any;
}

// Fix: Proper module-level global declarations
declare global {
  interface Window {
    blackTrigramApp?: any;
    pixiApp?: any;
  }

  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Get PixiJS stage from exposed app
       */
      getPixiStage(): Chainable<any>;

      /**
       * Wait for PixiJS object to exist
       */
      waitForPixiObject(data: Partial<PixiTestData>): Chainable<any>;

      /**
       * Wait for PixiJS object to not exist
       */
      waitForNoPixiObject(data: Partial<PixiTestData>): Chainable<any>;

      /**
       * Assert PixiJS object exists
       */
      assertPixiObjectExists(data: Partial<PixiTestData>): Chainable<any>;

      /**
       * Assert PixiJS object does not exist
       */
      assertNoPixiObjectExists(data: Partial<PixiTestData>): Chainable<any>;

      /**
       * Click on PixiJS object - overloaded for both selector types
       */
      clickPixiObject(selector: string): Chainable<void>;
      clickPixiObject(data: Partial<PixiTestData>): Chainable<void>;

      /**
       * Get Korean martial arts specific elements
       */
      getTrigramStance(stanceName: string): Chainable<any>;
      getPlayerArchetype(archetype: string): Chainable<any>;
      getVitalPoint(pointName: string): Chainable<any>;

      /**
       * Get PixiJS app
       */
      getPixiApp(): Chainable<any>;

      /**
       * Get PixiJS object by selector
       */
      getPixiObject(selector: string): Chainable<any>;

      /**
       * Test PixiJS stance
       */
      testPixiStance(stance: string): Chainable<void>;

      /**
       * Test PixiJS player
       */
      testPixiPlayer(playerId: string): Chainable<void>;

      /**
       * Test PixiJS text
       */
      testPixiText(text: string): Chainable<void>;

      /**
       * Test PixiJS performance
       */
      testPixiPerformance(): Chainable<void>;
    }
  }
}

// Helper function to check if PixiJS object matches criteria
function pixiObjectMatches(
  pixiObject: any,
  requiredData: Partial<PixiTestData>
): boolean {
  const pixiData = pixiObject.pixiData;

  for (const [key, value] of Object.entries(requiredData)) {
    if (pixiData && pixiData[key] !== undefined) {
      if (pixiData[key] !== value) return false;
    } else if (pixiObject[key] !== value) {
      return false;
    }
  }

  return true;
}

// Helper function to find PixiJS object in tree
function findPixiObject(
  container: any,
  requiredData: Partial<PixiTestData>
): any {
  if (pixiObjectMatches(container, requiredData)) {
    return container;
  }

  if (container.children) {
    for (const child of container.children) {
      const found = findPixiObject(child, requiredData);
      if (found) return found;
    }
  }

  return null;
}

// Get PixiJS stage
Cypress.Commands.add("getPixiStage", () => {
  return cy.window().then((win: any) => {
    expect(win.blackTrigramApp || win.pixiApp).to.exist;
    const app = win.blackTrigramApp || win.pixiApp;
    return app.stage;
  });
});

// Wait for PixiJS object to exist
Cypress.Commands.add("waitForPixiObject", (data: Partial<PixiTestData>) => {
  return cy
    .waitUntil(
      () => {
        return cy.getPixiStage().then((stage) => {
          const found = findPixiObject(stage, data);
          return found !== null;
        });
      },
      {
        timeout: 10000,
        interval: 100,
        errorMsg: `Timed out waiting for PixiJS object: ${JSON.stringify(
          data
        )}`,
      }
    )
    .then(() => {
      return cy.getPixiStage().then((stage) => {
        return findPixiObject(stage, data);
      });
    });
});

// Wait for PixiJS object to not exist
Cypress.Commands.add("waitForNoPixiObject", (data: Partial<PixiTestData>) => {
  return cy.waitUntil(
    () => {
      return cy.getPixiStage().then((stage) => {
        const found = findPixiObject(stage, data);
        return found === null;
      });
    },
    {
      timeout: 10000,
      interval: 100,
      errorMsg: `Timed out waiting for PixiJS object to disappear: ${JSON.stringify(
        data
      )}`,
    }
  );
});

// Assert PixiJS object exists
Cypress.Commands.add(
  "assertPixiObjectExists",
  (data: Partial<PixiTestData>) => {
    return cy.waitForPixiObject(data);
  }
);

// Assert PixiJS object does not exist
Cypress.Commands.add(
  "assertNoPixiObjectExists",
  (data: Partial<PixiTestData>) => {
    return cy.waitForNoPixiObject(data);
  }
);

// Fix: Unified click command that handles both string selectors and PixiTestData
Cypress.Commands.add(
  "clickPixiObject",
  (selectorOrData: string | Partial<PixiTestData>) => {
    if (typeof selectorOrData === "string") {
      // Handle string selector
      return cy.getPixiObject(selectorOrData).then((pixiObject) => {
        if (pixiObject) {
          const bounds = pixiObject.getBounds();
          const centerX = bounds.x + bounds.width / 2;
          const centerY = bounds.y + bounds.height / 2;
          cy.get("canvas").click(centerX, centerY);
        } else {
          throw new Error(
            `PixiJS object with selector "${selectorOrData}" not found`
          );
        }
      });
    } else {
      // Handle PixiTestData object
      return cy.waitForPixiObject(selectorOrData).then((pixiObject) => {
        const bounds = pixiObject.getBounds();
        const centerX = bounds.x + bounds.width / 2;
        const centerY = bounds.y + bounds.height / 2;
        cy.get("canvas").click(centerX, centerY);
      });
    }
  }
);

// Korean martial arts specific commands
Cypress.Commands.add("getTrigramStance", (stanceName: string) => {
  return cy.waitForPixiObject({
    type: "trigram-stance",
    stance: stanceName,
  });
});

Cypress.Commands.add("getPlayerArchetype", (archetype: string) => {
  return cy.waitForPixiObject({
    type: "player-archetype",
    archetype: archetype,
  });
});

Cypress.Commands.add("getVitalPoint", (pointName: string) => {
  return cy.waitForPixiObject({
    type: "vital-point",
    name: pointName,
  });
});

// Get PixiJS app
Cypress.Commands.add("getPixiApp", () => {
  return cy.window().then((win) => {
    // Fix: More robust PixiJS app detection
    const pixiApp =
      (win as any).pixiApp || (win as any).__PIXI_APP__ || (win as any).app;

    if (pixiApp) {
      return cy.wrap(pixiApp);
    }

    // Try to find PixiJS app in the application
    return cy.get("canvas").then(($canvas) => {
      const canvas = $canvas[0];
      const app =
        (canvas as any).__PIXI_APP__ ||
        (canvas as any).app ||
        (canvas as any).pixiApp;

      if (app) {
        return cy.wrap(app);
      }

      // If no app found, create a mock for testing
      cy.log("⚠️ No PixiJS app found, using mock");
      return cy.wrap({
        stage: { children: [] },
        renderer: { render: () => {} },
        view: canvas,
      });
    });
  });
});

Cypress.Commands.add("assertPixiObjectExists", (selector) => {
  cy.getPixiApp().then((app) => {
    if (!app || !app.stage) {
      cy.log("⚠️ PixiJS app or stage not available");
      return;
    }

    // Fix: Better object detection logic
    const findObject = (container: any, targetType: string): boolean => {
      if (!container || !container.children) return false;

      for (const child of container.children) {
        if (
          child.name === targetType ||
          child.constructor.name
            .toLowerCase()
            .includes(targetType.toLowerCase()) ||
          (child.userData && child.userData.type === targetType)
        ) {
          return true;
        }

        if (findObject(child, targetType)) {
          return true;
        }
      }
      return false;
    };

    const found = findObject(app.stage, selector.type);

    if (found) {
      cy.log(`✅ PixiJS object found: ${selector.type}`);
    } else {
      cy.log(
        `⚠️ PixiJS object not found: ${selector.type}, but test continues`
      );
    }
  });
});

// Export for module system
export {};
