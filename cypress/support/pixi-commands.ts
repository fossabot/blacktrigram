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
       * Click on PixiJS object
       */
      clickPixiObject(data: Partial<PixiTestData>): Chainable<void>;

      /**
       * Get Korean martial arts specific elements
       */
      getTrigramStance(stanceName: string): Chainable<any>;
      getPlayerArchetype(archetype: string): Chainable<any>;
      getVitalPoint(pointName: string): Chainable<any>;
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

// Click on PixiJS object
Cypress.Commands.add("clickPixiObject", (data: Partial<PixiTestData>) => {
  return cy.waitForPixiObject(data).then((pixiObject) => {
    // Get object's world position and click on canvas
    const bounds = pixiObject.getBounds();
    const centerX = bounds.x + bounds.width / 2;
    const centerY = bounds.y + bounds.height / 2;

    cy.get("canvas").click(centerX, centerY);
  });
});

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

// Export for module system
export {};
