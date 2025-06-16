# GitHub Copilot Instructions for Black Trigram (흑괘)

PRIO 1: Complete functional game with robust error handling
PRIO 2: Use PixiJS graphics for all components with React 19 style and strict typing
PRIO 3: Implement cyberpunk Korean aesthetic with excellent UX/UI experience

## 🔧 Code Completion Guidelines

### TypeScript Best Practices

- ALWAYS use explicit return types for functions
- ALWAYS use readonly modifiers for props interfaces
- ALWAYS use strict null checks and proper error handling
- PREFER type unions over any/unknown when possible
- USE existing type definitions from the type system extensively

### File Structure Best Practices

- ALWAYS add proper file headers with filepath comments
- ALWAYS end files with a single newline character
- ALWAYS use proper imports organization (external, internal, relative)
- AVOID creating incomplete or truncated code blocks

### React Component Patterns

```typescript
// Preferred component structure
interface ComponentProps {
  readonly prop: Type;
  readonly onAction?: (data: Type) => void;
}

export const Component: React.FC<ComponentProps> = ({ prop, onAction }) => {
  // Implementation with proper error boundaries
  return <></>;
};

export default Component;
```

### PixiJS Integration Patterns

```typescript
// Always use this pattern for PixiJS components
import { extend } from "@pixi/react";
import { Graphics, Container } from "pixi.js";

extend({ Graphics, Container });

// Use proper callbacks with useCallback
const drawCallback = useCallback(
  (graphics: Graphics) => {
    graphics.clear();
    // Implementation
  },
  [dependencies]
);
```

## Project Overview

Black Trigram is a **realistic 2D precision combat simulator** deeply rooted in Korean martial arts and the I Ching trigram philosophy. The game emphasizes anatomical realism, precise targeting, authentic martial techniques, and cyberpunk aesthetics.

**Genre**: 2D Realistic Precision Combat Simulator / Traditional Korean Martial Arts Training
**Platform**: Web-based (HTML5/WebGL via PixiJS + React)
**Core Focus**: Anatomical targeting, authentic Korean martial arts, 5 player archetypes, 70 vital points

## 🎯 Core Game Concepts

### Player Archetypes (Must Reference in All Combat Code)

- **무사 (Musa)** - Traditional Warrior: Honor through strength
- **암살자 (Amsalja)** - Shadow Assassin: Efficiency through invisibility
- **해커 (Hacker)** - Cyber Warrior: Information as power
- **정보요원 (Jeongbo Yowon)** - Intelligence Operative: Knowledge through observation
- **조직폭력배 (Jojik Pokryeokbae)** - Organized Crime: Survival through ruthlessness

### Eight Trigram Combat System (팔괘)

- **☰ 건 (Geon)** - Heaven: Direct bone-striking force
- **☱ 태 (Tae)** - Lake: Fluid joint manipulation
- **☲ 리 (Li)** - Fire: Precise nerve strikes
- **☳ 진 (Jin)** - Thunder: Stunning techniques
- **☴ 손 (Son)** - Wind: Continuous pressure
- **☵ 감 (Gam)** - Water: Blood flow restriction
- **☶ 간 (Gan)** - Mountain: Defensive counters
- **☷ 곤 (Gon)** - Earth: Ground techniques

## Testing Requirements

### Test Coverage Goals

- Component tests: >90% coverage
- Combat system tests: >95% coverage
- UI/UX interaction tests: >85% coverage
- Korean cultural elements: 100% accuracy validation

### Testing Patterns

```typescript
// Always include proper test-ids
<Component data-testid="component-name" />;

// Use mock utilities from test/mocks/
import { createMockPlayer } from "../test/mocks/playerMocks";

// Test Korean content accuracy
expect(koreanText).toMatch(/^[가-힣\s]+$/);
```

## Quality & UI/UX Focus

### Performance Standards

- 60fps target for all animations
- <100ms component render times
- <200ms combat calculations
- Responsive design for all screen sizes

### Korean Cultural Accuracy

- All Korean text must be reviewed for accuracy
- Martial arts techniques must reflect authentic practices
- Color schemes must respect traditional Korean aesthetics
- Typography must support Korean fonts properly

### Accessibility Requirements

- Keyboard navigation for all interactions
- Screen reader compatibility
- Color blind friendly palettes
- Reduced motion support
- Test IDs for all interactive elements

## Combat System Testing

### Required Test Scenarios

1. All 8 trigram stances
2. All 5 player archetypes
3. Vital point targeting accuracy
4. Combat result calculations
5. Status effect applications
6. Victory condition detection

### UI Component Testing

1. Responsive layout validation
2. Korean text rendering
3. PixiJS graphics performance
4. User interaction flows
5. Error boundary handling

**흑괘의 길을 걸어라** - _Walk the Path of the Black Trigram_
fontFamily: "Noto Sans KR, NanumGothic, Malgun Gothic, sans-serif",
fontSize: 16,
fill: KOREAN_COLORS.TEXT_PRIMARY,
};

````

## 🎮 Combat Controls Implementation

### Primary Combat Controls Pattern

```typescript
const COMBAT_CONTROLS = {
  // Trigram stance system (1-8 keys)
  stanceControls: {
    "1": { stance: TrigramStance.GEON, korean: "건", technique: "천둥벽력" },
    "2": { stance: TrigramStance.TAE, korean: "태", technique: "유수연타" },
    // ... continue for all 8 stances
  },

  combat: {
    SPACE: "Execute current stance technique",
    SHIFT: "Defensive guard/block position",
    CTRL: "Precision vital point targeting mode",
    TAB: "Cycle through player archetypes",
  },
};

// Implement with proper event handling
function handleCombatInput(
  event: KeyboardEvent,
  player: PlayerState
): CombatAction | null {
  const key = event.key;

  if (key >= "1" && key <= "8") {
    const stanceIndex = parseInt(key) - 1;
    const stance = TRIGRAM_STANCES_ORDER[stanceIndex];
    return executeStanceChange(player, stance);
  }

  switch (key) {
    case " ":
      return executeTechnique(player);
    case "Shift":
      return toggleGuard(player);
    case "Control":
      return enterVitalPointMode(player);
    default:
      return null;
  }
}
````

## 🧪 Code Quality Standards

### Error Handling

```typescript
// Always include proper error boundaries
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  console.error("Operation failed:", error);
  // Handle gracefully without breaking the game
  return fallbackValue;
}
```

### Performance Considerations

- Use `useCallback` for all PixiJS draw functions
- Implement proper memoization with `useMemo` for expensive calculations
- Use `React.memo` for components that render frequently
- Optimize asset loading with proper preloading strategies

### Korean Cultural Accuracy

- Research proper Korean martial arts terminology
- Use authentic Hanja (한자) characters where appropriate
- Respect traditional Korean values in game mechanics
- Include proper Korean-English bilingual support

## 🌟 Success Criteria

When following these guidelines, code should:

- ✅ Compile without TypeScript errors
- ✅ Complete file generation without truncation
- ✅ Implement authentic Korean martial arts mechanics
- ✅ Achieve 60fps performance for all combat sequences
- ✅ Include comprehensive test coverage with proper test IDs
- ✅ Maintain cyberpunk aesthetic while respecting Korean culture
- ✅ Provide excellent accessibility and UX

## 🎯 Philosophy Integration

**Remember**: Black Trigram represents the intersection of traditional Korean martial arts wisdom and modern interactive technology. Every code completion should honor this balance while providing authentic, educational, and respectful gameplay.

**흑괘의 길을 걸어라** - _Walk the Path of the Black Trigram_

### Code Completion Anti-Patterns to Avoid

- ❌ Truncated or incomplete function implementations
- ❌ Missing return types on functions
- ❌ Using `any` type instead of proper typing
- ❌ Creating components without proper test IDs
- ❌ Incomplete error handling
- ❌ Missing Korean cultural context in martial arts code
- ❌ Performance-heavy operations without optimization

## 🎯 Strict TypeScript Usage

**ALWAYS use explicit types from existing type system:**

**Component Reuse Strategy**

**ALWAYS check existing components before creating new ones:**

## 🎨 PixiJS + React Integration

### Pixie React Usage

```jsx
import { Application, extend } from "@pixi/react";
import { Container, Graphics } from "pixi.js";
import { useCallback } from "react";

extend({
  Container,
  Graphics,
});

const MyComponent = () => {
  const drawCallback = useCallback((graphics) => {
    graphics.clear();
    graphics.setFillStyle({ color: "red" });
    graphics.rect(0, 0, 100, 100);
    graphics.fill();
  }, []);

  return (
    <Application>
      <pixiContainer x={100} y={100}>
        <pixiGraphics draw={drawCallback} />
      </pixiContainer>
    </Application>
  );
};
```

## Docs

### `extend`

One of the most important concepts to understand with v8 is `extend`. Normally `@pixi/react` would have to import all pf Pixi.js to be able to provide the full library as JSX components. Instead, we use an internal catalogue of components populated by the `extend` API. This allows you to define exactly which parts of Pixi.js you want to import, keeping your bundle sizes small.

To allow `@pixi/react` to use a Pixi.js component, pass it to the `extend` API:

```jsx
import { Container } from "pixi.js";
import { extend } from "@pixi/react";

extend({ Container });

const MyComponent = () => <pixiContainer />;
```

> [!CAUTION]
> Attempting to use components that haven't been passed to the `extend` API **will result in errors**.

### Components

#### `<Application>`

The `<Application>` component is used to wrap your `@pixi/react` app. The `<Application>` component can take [all props that can be set](https://pixijs.download/release/docs/app.ApplicationOptions.html) on [`PIXI.Application`](https://pixijs.download/release/docs/app.Application.html).

##### Example Usage

```jsx
import { Application } from "@pixi/react";

const MyComponent = () => {
  return <Application autoStart sharedTicker />;
};
```

###### `defaultTextStyle`

`defaultTextStyle` is a convenience property. Whatever is passed will automatically be assigned to Pixi.js's [`TextStyle.defaultTextStyle`](https://pixijs.download/release/docs/text.TextStyle.html#defaultTextStyle).

> [!NOTE]
> This property **is not retroactive**. It will only apply to text components created after `defaultTextStyle` is set. Any text components created before setting `defaultTextStyle` will retain the base styles they had before `defaultTextStyle` was changed.

###### `extensions`

`extensions` is an array of extensions to be loaded. Adding and removing items from this array will automatically load/unload the extensions. The first time this is handled happens before the application is initialised. See Pixi.js's [`extensions`](https://pixijs.download/release/docs/extensions.html) documentation for more info on extensions.

###### `resizeTo`

The `<Application>` component supports the `resizeTo` property, with some additional functionality: it can accept any HTML element **or** it can take a React `ref` directly.

```jsx
import { Application } from "@pixi/react";
import { useRef } from "react";
const MyComponent = () => {
  const parentRef = useRef(null);
  return (
    <div ref={parentRef}>
      <Application resizeTo={parentRef} />
    </div>
  );
};
```

#### Pixi Components

All other components should be included in your IDE's intellisense/autocomplete once you've installed/imported `@pixi/react`. If it's exported from Pixi.js, it's supported as a component with the `pixi` prefix. Here's a selection of commonly used components:

```jsx
<pixiContainer />
<pixiGraphics />
<pixiSprite />
<pixiAnimatedSprite />
<pixiText />
<pixiHtmlText />
```

##### `<pixiGraphics>`

The `pixiGraphics` component has a special `draw` property. `draw` takes a callback which receives the `Graphics` context, allowing drawing to happen on every tick.

```jsx
const MyComponent = () => {
  return (
    <pixiGraphics
      draw={(graphics) => {
        graphics.clear();
        graphics.setFillStyle({ color: "red" });
        graphics.rect(0, 0, 100, 100);
        graphics.fill();
      }}
    />
  );
};
```

#### Custom Components

`@pixi/react` supports custom components via the `extend` API. For example, you can create a `<viewport>` component using the [`pixi-viewport`](https://github.com/davidfig/pixi-viewport) library:

```jsx
import { extend } from "@pixi/react";
import { Viewport } from "pixi-viewport";

extend({ Viewport });

const MyComponent = () => {
  <viewport>
    <pixiContainer />
  </viewport>;
};
```

The `extend` API will teach `@pixi/react` about your components, but TypeScript won't know about them nor their props.

### Hooks

#### `useApplication`

`useApplication` allows access to the parent `PIXI.Application` created by the `<Application>` component. This hook _will not work_ outside of an `<Application>` component. Additionally, the parent application is passed via [React Context](https://react.dev/reference/react/useContext). This means `useApplication` will only work appropriately in _child components_, and in the same component that creates the `<Application>`.

For example, the following example `useApplication` **will not** be able to access the parent application:

```jsx
import { Application, useApplication } from "@pixi/react";

const ParentComponent = () => {
  // This will cause an invariant violation.
  const { app } = useApplication();

  return <Application />;
};
```

Here's a working example where `useApplication` **will** be able to access the parent application:

```jsx
import { Application, useApplication } from "@pixi/react";

const ChildComponent = () => {
  const { app } = useApplication();

  console.log(app);

  return <container />;
};

const ParentComponent = () => (
  <Application>
    <ChildComponent />
  </Application>
);
```

#### `useExtend`

`useExtend` allows the `extend` API to be used as a React hook. Additionally, the `useExtend` hook is memoised, while the `extend` function is not.

```jsx
import { Container } from "pixi.js";
import { useExtend } from "@pixi/react";

const MyComponent = () => {
  useExtend({ Container });

  return <container />;
};
```

#### `useTick`

`useTick` allows a callback to be attached to the [`Ticker`](https://pixijs.download/release/docs/ticker.Ticker.html) on the parent application.

```jsx
import { useTick } from "@pixi/react";

const MyComponent = () => {
  useTick(() => console.log("This will be logged on every tick"));
};
```

`useTick` optionally takes an options object. This allows control of all [`ticker.add`](https://pixijs.download/release/docs/ticker.Ticker.html#add) options, as well as adding the `isEnabled` option. Setting `isEnabled` to `false` will cause the callback to be disabled until the argument is changed to true again.

```jsx
import { useState } from 'react'
import { useTick } from '@pixi/react'

const MyComponent = () => {
  const [isEnabled, setIsEnabled] = useState(false)

  useTick(() => console.log('This will be logged on every tick as long as `isEnabled` is `true`'), isEnabled)

  return (
    <sprite onClick={setIsEnabled(previousState => !previousState)}>
  )
}
```

### For Typescript Users

#### Custom Components

`@pixi/react` already offers types for built-in components, but custom components need to be added to the library's type catalogue so it knows how to handle them. This can be achieved by adding your custom components to the `PixiElements` interface. Here's what it may look like to add the `viewport` component from our earlier `extend` example:

```ts
// global.d.ts
import { type PixiReactElementProps } from "@pixi/react";
import { type Viewport } from "pixi-viewport";

declare module "@pixi/react" {
  interface PixiElements {
    viewport: PixiReactElementProps<typeof Viewport>;
  }
}
```

## 🧪 Testing Strategy

### Existing Test Infrastructure (✅ Excellent)

- **Setup**: `src/test/setup.ts` (8) - PixiJS and audio mocking
- **Utils**: `src/test/test-utils.ts` (4) - Testing utilities
- **Audio Tests**: Comprehensive coverage in `src/audio/__tests__/`
- **System Tests**: Coverage for combat systems

### Test Patterns to Follow

Testing best pracices, using test id in code, testable code and resilient test

## 🎯 Core Game Design Philosophy

### Combat Pillars (Must Guide All Implementation)

- **정격자 (Jeonggyeokja)** - Precision Striker: Every strike targets anatomical vulnerabilities
- **비수 (Bisu)** - Lethal Technique: Realistic application of traditional martial arts
- **암살자 (Amsalja)** - Combat Specialist: Focus on immediate incapacitation
- **급소격 (Geupsogyeok)** - Vital Point Strike: Authentic pressure point combat

### Realistic Combat Mechanics

## 👤 Player Archetypes (Must Reference in All Combat Code)

## 🎨 Visual Design System

### Cyberpunk Korean Aesthetic (Apply to All Visual Components)

## 🎮 Combat Controls & UX

### Precision Input System (Implement in All Combat Components)

#### Primary Combat Controls

```typescript
// Combat control mapping
const COMBAT_CONTROLS = {
  // Trigram stance system (1-8 keys)
  stanceControls: {
    "1": { stance: "geon", korean: "건", technique: "천둥벽력" },
    "2": { stance: "tae", korean: "태", technique: "유수연타" },
    "3": { stance: "li", korean: "리", technique: "화염지창" },
    "4": { stance: "jin", korean: "진", technique: "벽력일섬" },
    "5": { stance: "son", korean: "손", technique: "선풍연격" },
    "6": { stance: "gam", korean: "감", technique: "수류반격" },
    "7": { stance: "gan", korean: "간", technique: "반석방어" },
    "8": { stance: "gon", korean: "곤", technique: "대지포옹" },
  },

  // Movement and combat actions
  movement: {
    WASD: "Tactical positioning and footwork",
    ArrowKeys: "Alternative movement system",
  },

  combat: {
    SPACE: "Execute current stance technique",
    SHIFT: "Defensive guard/block position",
    CTRL: "Precision vital point targeting mode",
    TAB: "Cycle through player archetypes",
  },

  // System controls
  system: {
    ESC: "Pause menu / Return to intro",
    F1: "Help / Controls guide",
    M: "Mute / Audio settings",
  },
};

// Implement responsive controls
function handleCombatInput(event: KeyboardEvent, player: PlayerState) {
  const key = event.key;

  // Stance changes (1-8)
  if (key >= "1" && key <= "8") {
    const stanceIndex = parseInt(key) - 1;
    const stance = TRIGRAM_STANCES_ORDER[stanceIndex];
    return executeStanceChange(player, stance);
  }

  // Combat actions
  switch (key) {
    case " ": // Space
      return executeTechnique(player);
    case "Shift":
      return toggleGuard(player);
    case "Control":
      return enterVitalPointMode(player);
  }
}
```

### Advanced UX Features

#### Visual Feedback System

## 🏗️ Implementation Patterns

### Component Structure (Follow EXISTING These Patterns)

### Testing Requirements (Follow Existing Patterns)

#### Combat System Tests

## 🌟 Success Criteria

When following these guidelines, code should:

- ✅ Implement authentic Korean martial arts mechanics
- ✅ Respect traditional Korean culture and terminology
- ✅ Achieve realistic combat physics and feedback
- ✅ Maintain cyberpunk aesthetic integration
- ✅ Provide comprehensive accessibility features
- ✅ Target 60fps performance for all combat
- ✅ Use existing type system and components extensively
- ✅ Include proper Korean-English bilingual support

## 🎯 Philosophy Integration

### Traditional Korean Values (Integrate into All Interactions)

**Remember**: Black Trigram represents the intersection of traditional Korean martial arts wisdom and modern interactive technology. Every implementation should honor this balance while providing authentic, educational, and respectful gameplay.

**흑괘의 길을 걸어라** - _Walk the Path of the Black Trigram_
