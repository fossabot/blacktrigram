# Black Trigram Refactoring Plan

## Executive Summary

This refactoring plan addresses code duplication (28 clones found), improves type organization, and breaks down large files into smaller, more maintainable components while maintaining strict TypeScript standards and Korean martial arts authenticity.

## 🎯 Goals

1. **Eliminate Code Duplication** - Reduce from 28 clones to <5
2. **Centralize Type Definitions** - Move all types to `src/types/` structure
3. **Decompose Large Files** - Break down files >500 lines into logical components
4. **Improve Maintainability** - Create reusable utility functions and components
5. **Enhance Testing Structure** - Standardize test utilities and mocks

## 📊 Current Issues Analysis

### Code Duplication Hotspots

1. **BaseButton.tsx** - 3 clones (7-11 lines each)

   - Button variant rendering logic duplicated
   - Event handler patterns repeated

2. **PlayerVisuals.tsx** - 4 clones (23-27 lines each)

   - Player rendering logic duplicated across different visual states
   - Korean martial arts styling patterns repeated

3. **Type Definitions** - 8 clones in trigram types

   - Korean technique definitions duplicated between types and systems
   - Stance data repeated across multiple files

4. **Test Utilities** - 3 clones in test setup
   - Mock configurations duplicated
   - Setup patterns repeated

### Large File Analysis

| File                  | Lines | Issues                             | Priority |
| --------------------- | ----- | ---------------------------------- | -------- |
| `PlayerVisuals.tsx`   | 350+  | Rendering logic, duplication       | High     |
| `KoreanTechniques.ts` | 800+  | Data definitions, type duplication | High     |
| `TrigramSystem.ts`    | 400+  | Business logic, mixed concerns     | Medium   |
| `CombatSystem.ts`     | 300+  | Combat calculations, validation    | Medium   |

## 🏗️ Refactoring Strategy

### Phase 1: Type System Consolidation

#### 1.1 Centralize All Types in `src/types/`

```
src/types/
├── index.ts                 # Main type exports
├── core/
│   ├── common.ts           # Basic shared types
│   ├── enums.ts            # String literal unions
│   └── constants.ts        # Type-safe constants
├── game/
│   ├── player.ts           # Player state and actions
│   ├── combat.ts           # Combat mechanics
│   ├── anatomy.ts          # Vital points and regions
│   └── effects.ts          # Status effects
├── korean-martial-arts/
│   ├── trigram.ts          # Trigram stances and data
│   ├── techniques.ts       # Korean techniques
│   └── culture.ts          # Cultural elements
├── ui/
│   ├── components.ts       # UI component props
│   ├── pixi.ts            # PixiJS-specific types
│   └── styling.ts         # Theme and styling
└── testing/
    ├── mocks.ts           # Test mock types
    └── fixtures.ts        # Test data types
```

#### 1.2 Eliminate Type Duplication

- Move Korean technique definitions from `systems/` to `types/korean-martial-arts/techniques.ts`
- Consolidate TRIGRAM_DATA into single source of truth
- Create type-safe constants for Korean martial arts data

### Phase 2: Component Decomposition

#### 2.1 BaseButton Refactoring

```
src/components/ui/base/button/
├── BaseButton.tsx          # Main button component
├── ButtonVariants.tsx      # Variant-specific rendering
├── ButtonStyles.ts         # Styling utilities
└── __tests__/
    └── BaseButton.test.tsx
```

**Fixes:**

- Extract variant rendering into separate functions
- Create reusable style utilities
- Eliminate 3 code clones

#### 2.2 PlayerVisuals Decomposition

```
src/components/game/player/
├── PlayerVisuals.tsx       # Main visual coordinator
├── PlayerRenderer.tsx      # Core rendering logic
├── PlayerStates.tsx        # State-based visual changes
├── KoreanMartialArtist.tsx # Korean martial arts specific visuals
├── PlayerAnimations.tsx    # Animation handling
└── __tests__/
    ├── PlayerVisuals.test.tsx
    └── PlayerRenderer.test.tsx
```

**Fixes:**

- Extract common rendering patterns
- Separate animation logic
- Create reusable visual state functions
- Eliminate 4 code clones

#### 2.3 Korean Techniques System

```
src/systems/korean-martial-arts/
├── TechniqueRegistry.ts    # Technique definitions
├── TechniqueValidator.ts   # Validation logic
├── StanceTransitions.ts    # Stance change logic
├── KoreanCulture.ts        # Cultural authenticity
└── __tests__/
    └── techniques.test.ts
```

**Fixes:**

- Centralize technique data
- Create validation utilities
- Eliminate 8 type duplications

### Phase 3: Utility Functions Extraction

#### 3.1 Common Utilities

```
src/utils/
├── korean-martial-arts/
│   ├── stance-calculations.ts
│   ├── technique-helpers.ts
│   └── cultural-validation.ts
├── combat/
│   ├── damage-calculations.ts
│   ├── hit-detection.ts
│   └── vital-points.ts
├── ui/
│   ├── pixi-helpers.ts
│   ├── korean-text.ts
│   └── responsive.ts
└── testing/
    ├── setup-helpers.ts
    ├── mock-factories.ts
    └── data-generators.ts
```

#### 3.2 Test Utilities Consolidation

```
src/test/
├── setup.ts               # Global test setup
├── utils/
│   ├── component-utils.ts  # Component testing helpers
│   ├── audio-mocks.ts     # Audio system mocks
│   ├── game-mocks.ts      # Game state mocks
│   └── korean-test-data.ts # Korean martial arts test data
└── fixtures/
    ├── player-states.ts   # Player state fixtures
    ├── techniques.ts      # Technique test data
    └── ui-props.ts        # UI component props
```

## 🔧 Implementation Plan

### Week 1: Type System Foundation

- [ ] Create new type structure in `src/types/`
- [ ] Move all types from components and systems
- [ ] Update all imports across codebase
- [ ] Verify TypeScript compilation

### Week 2: Component Decomposition

- [ ] Refactor BaseButton component
- [ ] Decompose PlayerVisuals into logical modules
- [ ] Extract Korean martial arts rendering logic
- [ ] Update component tests

### Week 3: System Refactoring

- [ ] Refactor Korean techniques system
- [ ] Consolidate trigram calculations
- [ ] Extract combat utilities
- [ ] Create reusable validation functions

### Week 4: Testing & Utilities

- [ ] Consolidate test utilities
- [ ] Create mock factories
- [ ] Standardize test patterns
- [ ] Performance optimization

### Week 5: Integration & Validation

- [ ] Integration testing
- [ ] Performance benchmarking
- [ ] Korean martial arts authenticity review
- [ ] Documentation updates

## 🎯 Success Metrics

### Code Quality

- [ ] Reduce code duplication from 28 clones to <5
- [ ] Maintain 90%+ test coverage
- [ ] Zero TypeScript errors
- [ ] Pass all existing E2E tests

### Performance

- [ ] Maintain 60 FPS in combat mode
- [ ] Bundle size increase <5%
- [ ] Load time improvement >10%

### Maintainability

- [ ] Average file size <200 lines
- [ ] Clear separation of concerns
- [ ] Reusable utility functions
- [ ] Consistent Korean martial arts patterns

## 🛡️ Risk Mitigation

### Breaking Changes

- **Risk**: Type refactoring breaks existing components
- **Mitigation**: Incremental migration with compatibility layer

### Performance Impact

- **Risk**: Component decomposition affects rendering performance
- **Mitigation**: Performance benchmarking at each step

### Korean Authenticity

- **Risk**: Refactoring loses cultural authenticity
- **Mitigation**: Korean martial arts expert review at each phase

### Testing Stability

- **Risk**: Test refactoring introduces flaky tests
- **Mitigation**: Parallel test suite during transition

## 📝 Detailed Refactoring Tasks

### High Priority (Week 1-2)

#### Task 1: Consolidate Korean Technique Types

```typescript
// Before: Duplicated across 8 files
// After: Single source of truth in src/types/korean-martial-arts/techniques.ts

export interface KoreanTechnique {
  readonly id: string;
  readonly koreanName: string;
  readonly englishName: string;
  readonly stance: TrigramStance;
  readonly damage: number;
  readonly kiCost: number;
  readonly description: TrilingualDescription;
  readonly properties: TechniqueProperties;
}
```

#### Task 2: Extract BaseButton Variants

```typescript
// Before: 3 clones in BaseButton.tsx
// After: Variant-specific rendering functions

export const ButtonVariantRenderer = {
  primary: (props: ButtonProps) => renderPrimaryButton(props),
  secondary: (props: ButtonProps) => renderSecondaryButton(props),
  danger: (props: ButtonProps) => renderDangerButton(props),
} as const;
```

#### Task 3: Decompose PlayerVisuals

```typescript
// Before: 350+ lines with 4 clones
// After: Modular components

export function PlayerVisuals({ player, ...props }: PlayerVisualsProps) {
  return (
    <Container>
      <PlayerRenderer player={player} />
      <KoreanMartialArtist stance={player.stance} />
      <PlayerAnimations animations={player.animations} />
    </Container>
  );
}
```

### Medium Priority (Week 3-4)

#### Task 4: Create Korean Text Utilities

```typescript
// Consolidate Korean text handling
export const KoreanTextUtils = {
  formatTechniqueName: (technique: KoreanTechnique) => string,
  formatStanceName: (stance: TrigramStance) => string,
  validateKoreanText: (text: string) => boolean,
} as const;
```

#### Task 5: Standardize Test Mocks

```typescript
// Eliminate test setup duplication
export const createMockAudioManager = (): MockAudioManager => ({
  playAttackSound: vi.fn(),
  playHitSound: vi.fn(),
  playStanceChangeSound: vi.fn(),
  // ... other mock methods
});
```

### Low Priority (Week 5)

#### Task 6: Performance Optimization

- Bundle splitting for Korean martial arts modules
- Lazy loading for training components
- Memoization for expensive calculations

#### Task 7: Documentation Updates

- Update component documentation
- Create type definition guides
- Korean martial arts authenticity guidelines

## 🧪 Testing Strategy

### Unit Tests

- Test each decomposed component independently
- Verify type safety with strict TypeScript checks
- Korean martial arts accuracy validation

### Integration Tests

- Component interaction testing
- System-wide type compatibility
- Audio-visual synchronization

### E2E Tests

- Complete user journeys still work
- Performance regression prevention
- Korean martial arts functionality preservation

## 📋 Acceptance Criteria

### Phase 1 Complete

- [ ] All types moved to `src/types/` structure
- [ ] Zero TypeScript compilation errors
- [ ] All existing tests pass
- [ ] Performance benchmarks maintained

### Phase 2 Complete

- [ ] BaseButton duplication eliminated
- [ ] PlayerVisuals decomposed successfully
- [ ] Component tests updated and passing
- [ ] Korean martial arts visuals preserved

### Phase 3 Complete

- [ ] Korean techniques system refactored
- [ ] Utility functions extracted
- [ ] Test utilities consolidated
- [ ] Documentation updated

### Final Completion

- [ ] <5 code clones remaining
- [ ] All success metrics achieved
- [ ] Korean martial arts authenticity verified
- [ ] Performance improvements documented

---

_This refactoring plan maintains the cultural authenticity of Korean martial arts while improving code quality and maintainability. Each phase includes validation checkpoints to ensure the game's core experience remains intact._
