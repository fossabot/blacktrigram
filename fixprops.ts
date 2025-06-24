// 0. Imports and bootstrap
import * as fs from "fs";
import * as path from "path";
import {
  ImportDeclaration,
  InterfaceDeclaration,
  Project,
  SourceFile,
  TypeAliasDeclaration,
} from "ts-morph";

const project = new Project({ tsConfigFilePath: "tsconfig.json" });

// Enhanced configuration with validation
const CONFIG = {
  // All types files that contain Props
  propsTypeFiles: [
    "src/types/components.ts",
    "src/types/ui.ts",
    "src/types/combat.ts",
    "src/types/game.ts",
  ],

  // Base interfaces to keep in types (not Props themselves)
  keepInTypes: [
    "BaseComponentProps",
    "BaseUIProps",
    "UIComponentProps",
  ] as const,

  // Component mapping patterns with validation
  componentMapping: {
    // Screen components
    IntroScreenProps: "src/components/intro/IntroScreen.tsx",
    TrainingScreenProps: "src/components/training/TrainingScreen.tsx",
    CombatScreenProps: "src/components/combat/CombatScreen.tsx",
    EndScreenProps: "src/components/ui/EndScreen.tsx",
    LoadingScreenProps: "src/components/ui/LoadingScreen.tsx",
    MainMenuScreenProps: "src/components/ui/MainMenuScreen.tsx",
    SettingsScreenProps: "src/components/ui/SettingsScreen.tsx",

    // Combat components
    CombatArenaProps: "src/components/combat/components/CombatArena.tsx",
    CombatHUDProps: "src/components/combat/components/CombatHUD.tsx",
    CombatControlsProps: "src/components/combat/components/CombatControls.tsx",
    PlayerStatusPanelProps:
      "src/components/combat/components/PlayerStatusPanel.tsx",
    CombatStatsProps: "src/components/combat/components/CombatStats.tsx",

    // UI components
    HealthBarProps: "src/components/ui/HealthBar.tsx",
    StanceIndicatorProps: "src/components/ui/StanceIndicator.tsx",
    TrigramWheelProps: "src/components/ui/TrigramWheel.tsx",
    ProgressTrackerProps: "src/components/ui/ProgressTracker.tsx",
    ScoreDisplayProps: "src/components/ui/ScoreDisplay.tsx",
    RoundTimerProps: "src/components/ui/RoundTimer.tsx",
    KoreanHeaderProps: "src/components/ui/KoreanHeader.tsx",

    // Game components
    PlayerProps: "src/components/game/Player.tsx",
    PlayerVisualsProps: "src/components/game/PlayerVisuals.tsx",
    DojangBackgroundProps: "src/components/game/DojangBackground.tsx",
    HitEffectsLayerProps: "src/components/game/HitEffectsLayer.tsx",
    GameEngineProps: "src/components/game/GameEngine.tsx",

    // Intro components
    MenuSectionProps: "src/components/intro/components/MenuSection.tsx",
    ControlsSectionProps: "src/components/intro/components/ControlsSection.tsx",
    ArchetypeDisplayProps:
      "src/components/intro/components/ArchetypeDisplay.tsx",
    PhilosophySectionProps:
      "src/components/intro/components/PhilosophySection.tsx",

    // Audio
    AudioProviderProps: "src/audio/AudioProvider.tsx",

    // Specialized UI
    TrainingModeUIProps: "src/components/training/TrainingModeUI.tsx",
    VictoryPoseScreenProps: "src/components/ui/VictoryPoseScreen.tsx",
    VitalPointDisplayProps: "src/components/ui/VitalPointDisplay.tsx",
    ModalProps: "src/components/ui/base/Modal.tsx",
    BaseButtonProps: "src/components/ui/base/BaseButton.tsx",
    GameUIProps: "src/components/ui/GameUI.tsx",
  } as const,

  // Enhanced import detection patterns
  typePatterns: [
    // Korean martial arts types
    /\b(PlayerArchetype|TrigramStance|KoreanText|VitalPoint)\b/g,
    // Combat types
    /\b(CombatAttackType|DamageType|HitEffect|GameMode)\b/g,
    // UI types
    /\b(PlayerState|BaseComponentProps|BaseUIProps|UIComponentProps)\b/g,
    // Game types
    /\b(AudioSettings|GameSettings|ControlSettings)\b/g,
  ],

  // Backup settings
  createBackup: true,
  backupDir: ".backup-props",
  dryRun: false, // Set to true for testing
} as const;

// Helper type for the keepInTypes array
type KeepInTypesType = (typeof CONFIG.keepInTypes)[number];

interface PropsInfo {
  readonly name: string;
  readonly filePath: string;
  readonly targetPath: string;
  readonly definition: InterfaceDeclaration | TypeAliasDeclaration;
  readonly extends: readonly string[];
  readonly imports: readonly string[];
  readonly hasJSDoc: boolean;
  readonly complexity: number;
}

interface MigrationStats {
  found: number;
  moved: number;
  deleted: number;
  filesUpdated: number;
  errors: string[];
  warnings: string[];
}

class PropsMigrator {
  private stats: MigrationStats = {
    found: 0,
    moved: 0,
    deleted: 0,
    filesUpdated: 0,
    errors: [],
    warnings: [],
  };

  private readonly project: Project;

  constructor(project: Project) {
    this.project = project;
  }

  async migrate(): Promise<MigrationStats> {
    console.log("🚀 Starting Props migration with enhanced validation...\n");

    try {
      // Validate configuration
      await this.validateConfiguration();

      // Create backup if enabled
      if (CONFIG.createBackup) {
        await this.createBackup();
      }

      // Main migration steps
      const propsMap = await this.scanPropsInterfaces();
      await this.validateTargetFiles(propsMap);
      await this.movePropsToComponents(propsMap);
      await this.updateImportsGlobally(propsMap);
      await this.cleanupTypeFiles();
      await this.validateMigration();

      this.printSummary();
      return this.stats;
    } catch (error) {
      console.error(`❌ Migration failed: ${error.message}`);
      this.stats.errors.push(error.message);
      throw error;
    }
  }

  private async validateConfiguration(): Promise<void> {
    console.log("🔍 Validating configuration...");

    // Check if type files exist
    for (const filePath of CONFIG.propsTypeFiles) {
      if (!fs.existsSync(filePath)) {
        const error = `Type file not found: ${filePath}`;
        this.stats.errors.push(error);
        throw new Error(error);
      }
    }

    // Validate component mapping paths
    const invalidPaths: string[] = [];
    for (const [propsName, componentPath] of Object.entries(
      CONFIG.componentMapping
    )) {
      if (!fs.existsSync(componentPath)) {
        invalidPaths.push(`${propsName} → ${componentPath}`);
        this.stats.warnings.push(`Component file not found: ${componentPath}`);
      }
    }

    if (invalidPaths.length > 0) {
      console.warn(
        `   ⚠️  Found ${invalidPaths.length} invalid component paths:`
      );
      invalidPaths.forEach((path) => console.warn(`      ${path}`));
    }

    console.log("   ✅ Configuration validated\n");
  }

  private async createBackup(): Promise<void> {
    console.log("💾 Creating backup...");

    if (!fs.existsSync(CONFIG.backupDir)) {
      fs.mkdirSync(CONFIG.backupDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupPath = path.join(CONFIG.backupDir, `backup-${timestamp}`);
    fs.mkdirSync(backupPath, { recursive: true });

    // Backup type files
    for (const filePath of CONFIG.propsTypeFiles) {
      if (fs.existsSync(filePath)) {
        const backupFile = path.join(backupPath, path.basename(filePath));
        fs.copyFileSync(filePath, backupFile);
      }
    }

    console.log(`   ✅ Backup created at ${backupPath}\n`);
  }

  private async scanPropsInterfaces(): Promise<Map<string, PropsInfo>> {
    console.log("📋 Scanning Props interfaces with enhanced analysis...");
    const propsMap = new Map<string, PropsInfo>();

    for (const filePath of CONFIG.propsTypeFiles) {
      const file = this.project.getSourceFile(filePath);
      if (!file) continue;

      console.log(`   Scanning ${filePath}...`);

      // Scan interfaces
      for (const intf of file.getInterfaces()) {
        const info = this.analyzePropsInterface(intf, filePath);
        if (info) {
          propsMap.set(info.name, info);
          console.log(
            `     Found interface: ${info.name} (complexity: ${info.complexity})`
          );
        }
      }

      // Scan type aliases
      for (const alias of file.getTypeAliases()) {
        const info = this.analyzePropsTypeAlias(alias, filePath);
        if (info) {
          propsMap.set(info.name, info);
          console.log(
            `     Found type alias: ${info.name} (complexity: ${info.complexity})`
          );
        }
      }
    }

    this.stats.found = propsMap.size;
    console.log(`   ✅ Found ${propsMap.size} Props definitions\n`);
    return propsMap;
  }

  private analyzePropsInterface(
    intf: InterfaceDeclaration,
    filePath: string
  ): PropsInfo | null {
    const name = intf.getName();

    if (!name.endsWith("Props") || this.isKeepInTypes(name)) {
      return null;
    }

    const targetPath =
      CONFIG.componentMapping[name as keyof typeof CONFIG.componentMapping];
    if (!targetPath) {
      this.stats.warnings.push(`No mapping found for ${name}`);
      return null;
    }

    const definitionText = intf.getFullText();
    const imports = this.extractRequiredImports(definitionText);
    const complexity = this.calculateComplexity(intf);

    return {
      name,
      filePath,
      targetPath,
      definition: intf,
      extends: intf.getExtends().map((e) => e.getText()),
      imports,
      hasJSDoc: intf.getJsDocs().length > 0,
      complexity,
    };
  }

  private analyzePropsTypeAlias(
    alias: TypeAliasDeclaration,
    filePath: string
  ): PropsInfo | null {
    const name = alias.getName();

    if (!name.endsWith("Props") || this.isKeepInTypes(name)) {
      return null;
    }

    const targetPath =
      CONFIG.componentMapping[name as keyof typeof CONFIG.componentMapping];
    if (!targetPath) {
      this.stats.warnings.push(`No mapping found for ${name}`);
      return null;
    }

    const definitionText = alias.getFullText();
    const imports = this.extractRequiredImports(definitionText);
    const complexity = this.calculateComplexity(alias);

    return {
      name,
      filePath,
      targetPath,
      definition: alias,
      extends: [],
      imports,
      hasJSDoc: alias.getJsDocs().length > 0,
      complexity,
    };
  }

  // Helper method to check if a type should be kept in types
  private isKeepInTypes(name: string): name is KeepInTypesType {
    return (CONFIG.keepInTypes as readonly string[]).includes(name);
  }

  private extractRequiredImports(definitionText: string): string[] {
    const imports = new Set<string>();

    // Apply all type patterns to find imports
    for (const pattern of CONFIG.typePatterns) {
      const matches = definitionText.match(pattern);
      if (matches) {
        matches.forEach((match) => imports.add(match));
      }
    }

    return Array.from(imports);
  }

  private calculateComplexity(
    node: InterfaceDeclaration | TypeAliasDeclaration
  ): number {
    // Simple complexity calculation based on:
    // - Number of properties/type complexity
    // - Number of extends/unions
    // - Presence of generics
    // - JSDoc comments

    let complexity = 1;

    if (node instanceof InterfaceDeclaration) {
      complexity += node.getProperties().length;
      complexity += node.getExtends().length * 2;
      complexity += node.getTypeParameters().length;
    } else {
      const typeText = node.getTypeNode()?.getText() || "";
      complexity += (typeText.match(/[&|]/g) || []).length; // Union/intersection types
      complexity += (typeText.match(/</g) || []).length; // Generics
    }

    complexity += node.getJsDocs().length;
    return complexity;
  }

  private async validateTargetFiles(
    propsMap: Map<string, PropsInfo>
  ): Promise<void> {
    console.log("🔍 Validating target component files...");

    for (const [propsName, info] of propsMap) {
      const targetFile = this.project.getSourceFile(info.targetPath);

      if (!targetFile) {
        this.stats.warnings.push(`Target file not found: ${info.targetPath}`);
        continue;
      }

      // Check if Props already exists
      const existing =
        targetFile.getInterface(propsName) ||
        targetFile.getTypeAlias(propsName);
      if (existing) {
        console.log(`   ✅ ${propsName} already exists in ${info.targetPath}`);
      }
    }

    console.log("   ✅ Target file validation complete\n");
  }

  private async movePropsToComponents(
    propsMap: Map<string, PropsInfo>
  ): Promise<void> {
    console.log(
      "🚚 Moving Props to component files with enhanced import handling..."
    );

    for (const [propsName, info] of propsMap) {
      if (CONFIG.dryRun) {
        console.log(
          `   [DRY RUN] Would move ${propsName} to ${info.targetPath}`
        );
        continue;
      }

      try {
        const success = await this.movePropsToFile(info);
        if (success) {
          this.stats.moved++;
          console.log(`   ✅ Moved ${propsName} to ${info.targetPath}`);
        } else {
          this.stats.warnings.push(`Failed to move ${propsName}`);
        }
      } catch (error) {
        const errorMsg = `Failed to move ${propsName}: ${error.message}`;
        this.stats.errors.push(errorMsg);
        console.error(`   ❌ ${errorMsg}`);
      }
    }

    console.log(`   ✅ Moved ${this.stats.moved} Props definitions\n`);
  }

  private async movePropsToFile(info: PropsInfo): Promise<boolean> {
    const targetFile = this.project.getSourceFile(info.targetPath);
    if (!targetFile) return false;

    // Check if already exists
    const existing =
      targetFile.getInterface(info.name) || targetFile.getTypeAlias(info.name);
    if (existing) return true;

    // Add required imports
    await this.addRequiredImports(targetFile, info.imports);

    // Add the definition
    if (info.definition instanceof InterfaceDeclaration) {
      await this.addInterfaceToFile(targetFile, info.definition);
    } else {
      await this.addTypeAliasToFile(targetFile, info.definition);
    }

    targetFile.saveSync();
    return true;
  }

  private async addRequiredImports(
    targetFile: SourceFile,
    requiredImports: readonly string[]
  ): Promise<void> {
    if (requiredImports.length === 0) return;

    // Find existing types import
    const existingTypesImport = targetFile.getImportDeclaration((decl) =>
      decl.getModuleSpecifierValue().includes("/types")
    );

    if (existingTypesImport) {
      // Add to existing import
      const currentImports = existingTypesImport
        .getNamedImports()
        .map((imp) => imp.getName());
      const newImports = requiredImports.filter(
        (imp) => !currentImports.includes(imp)
      );

      if (newImports.length > 0) {
        existingTypesImport.addNamedImports(newImports);
      }
    } else {
      // Create new import
      const relativePath = this.calculateRelativePath(
        targetFile.getFilePath(),
        "src/types"
      );
      targetFile.addImportDeclaration({
        isTypeOnly: true,
        moduleSpecifier: relativePath,
        namedImports: Array.from(requiredImports),
      });
    }
  }

  private async addInterfaceToFile(
    targetFile: SourceFile,
    intf: InterfaceDeclaration
  ): Promise<void> {
    targetFile.addInterface({
      isExported: true,
      name: intf.getName(),
      extends: intf.getExtends().map((e) => e.getText()),
      properties: intf.getProperties().map((prop) => ({
        name: prop.getName(),
        type: prop.getTypeNode()?.getText() || "any",
        hasQuestionToken: prop.hasQuestionToken(),
        docs: prop.getJsDocs().map((doc) => doc.getDescription()),
      })),
      docs: intf.getJsDocs().map((doc) => doc.getDescription()),
      typeParameters: intf.getTypeParameters().map((tp) => ({
        name: tp.getName(),
        constraint: tp.getConstraint()?.getText(),
        default: tp.getDefault()?.getText(),
      })),
    });
  }

  private async addTypeAliasToFile(
    targetFile: SourceFile,
    alias: TypeAliasDeclaration
  ): Promise<void> {
    targetFile.addTypeAlias({
      isExported: true,
      name: alias.getName(),
      type: alias.getTypeNode()?.getText() || "any",
      docs: alias.getJsDocs().map((doc) => doc.getDescription()),
      typeParameters: alias.getTypeParameters().map((tp) => ({
        name: tp.getName(),
        constraint: tp.getConstraint()?.getText(),
        default: tp.getDefault()?.getText(),
      })),
    });
  }

  private calculateRelativePath(fromFile: string, toDir: string): string {
    const relativePath = path
      .relative(path.dirname(fromFile), toDir)
      .replace(/\\/g, "/");

    return relativePath.startsWith(".") ? relativePath : `./${relativePath}`;
  }

  private async updateImportsGlobally(
    propsMap: Map<string, PropsInfo>
  ): Promise<void> {
    console.log("🔗 Updating imports throughout codebase...");

    const allFiles = this.project.getSourceFiles("src/**/*.{ts,tsx}");

    for (const file of allFiles) {
      let changed = false;

      for (const importDecl of file.getImportDeclarations()) {
        const moduleSpecifier = importDecl.getModuleSpecifierValue();
        if (!moduleSpecifier.includes("/types")) continue;

        const namedImports = importDecl.getNamedImports();
        const propsImports = namedImports.filter((imp) => {
          const name = imp.getName();
          return name.endsWith("Props") && propsMap.has(name);
        });

        if (propsImports.length === 0) continue;

        // Create new imports for each Props
        for (const propsImport of propsImports) {
          const propsName = propsImport.getName();
          const propsInfo = propsMap.get(propsName);
          if (!propsInfo) continue;

          const relativePath = this.calculateRelativePath(
            file.getFilePath(),
            propsInfo.targetPath.replace(/\.(tsx?)$/, "")
          );

          // Add new import
          file.addImportDeclaration({
            isTypeOnly: true,
            moduleSpecifier: relativePath,
            namedImports: [propsName],
          });

          propsImport.remove();
          changed = true;
        }

        // Remove empty import declarations
        if (this.isEmptyImport(importDecl)) {
          importDecl.remove();
          changed = true;
        }
      }

      if (changed) {
        if (!CONFIG.dryRun) {
          file.saveSync();
        }
        this.stats.filesUpdated++;
      }
    }

    console.log(`   ✅ Updated imports in ${this.stats.filesUpdated} files\n`);
  }

  private isEmptyImport(importDecl: ImportDeclaration): boolean {
    return (
      importDecl.getNamedImports().length === 0 &&
      !importDecl.getDefaultImport() &&
      !importDecl.getNamespaceImport()
    );
  }

  private async cleanupTypeFiles(): Promise<void> {
    console.log("🧹 Cleaning up type files...");

    // Delete moved Props from type files
    for (const filePath of CONFIG.propsTypeFiles) {
      const file = this.project.getSourceFile(filePath);
      if (!file) continue;

      let deletedCount = 0;

      // Delete interfaces
      for (const intf of file.getInterfaces()) {
        const name = intf.getName();
        if (name.endsWith("Props") && !this.isKeepInTypes(name)) {
          if (!CONFIG.dryRun) {
            intf.remove();
          }
          deletedCount++;
        }
      }

      // Delete type aliases
      for (const alias of file.getTypeAliases()) {
        const name = alias.getName();
        if (name.endsWith("Props") && !this.isKeepInTypes(name)) {
          if (!CONFIG.dryRun) {
            alias.remove();
          }
          deletedCount++;
        }
      }

      if (deletedCount > 0) {
        if (!CONFIG.dryRun) {
          file.saveSync();
        }
        this.stats.deleted += deletedCount;
        console.log(`   🗑️  Cleaned up ${deletedCount} Props from ${filePath}`);
      }
    }

    // Clean up barrel exports
    await this.cleanupBarrelExports();

    console.log(`   ✅ Deleted ${this.stats.deleted} Props from type files\n`);
  }

  private async cleanupBarrelExports(): Promise<void> {
    const indexBarrel = this.project.getSourceFile("src/types/index.ts");
    if (!indexBarrel) return;

    let cleaned = false;

    for (const exportDecl of indexBarrel.getExportDeclarations()) {
      const namedExports = exportDecl.getNamedExports();
      const propsExports = namedExports.filter(
        (e) => e.getName().endsWith("Props") && !this.isKeepInTypes(e.getName())
      );

      if (
        propsExports.length === namedExports.length &&
        propsExports.length > 0
      ) {
        // Remove entire export if only Props
        if (!CONFIG.dryRun) {
          exportDecl.remove();
        }
        cleaned = true;
      } else if (propsExports.length > 0) {
        // Remove only Props exports
        if (!CONFIG.dryRun) {
          propsExports.forEach((e) => e.remove());
        }
        cleaned = true;
      }
    }

    if (cleaned && !CONFIG.dryRun) {
      indexBarrel.saveSync();
    }
  }

  private async validateMigration(): Promise<void> {
    console.log("✅ Validating migration results...");

    // Check that all moved Props can be imported from their new locations
    for (const [propsName, targetPath] of Object.entries(
      CONFIG.componentMapping
    )) {
      const targetFile = this.project.getSourceFile(targetPath);
      if (!targetFile) continue;

      const hasInterface = !!targetFile.getInterface(propsName);
      const hasTypeAlias = !!targetFile.getTypeAlias(propsName);

      if (!hasInterface && !hasTypeAlias) {
        this.stats.warnings.push(
          `${propsName} not found in ${targetPath} after migration`
        );
      }
    }

    console.log("   ✅ Migration validation complete\n");
  }

  private printSummary(): void {
    console.log("📊 Enhanced Migration Summary:");
    console.log(`   • Props interfaces found: ${this.stats.found}`);
    console.log(`   • Props interfaces moved: ${this.stats.moved}`);
    console.log(`   • Props interfaces deleted: ${this.stats.deleted}`);
    console.log(`   • Files with updated imports: ${this.stats.filesUpdated}`);
    console.log(`   • Type files processed: ${CONFIG.propsTypeFiles.length}`);
    console.log(`   • Errors encountered: ${this.stats.errors.length}`);
    console.log(`   • Warnings generated: ${this.stats.warnings.length}`);

    if (this.stats.errors.length > 0) {
      console.log("\n❌ Errors:");
      this.stats.errors.forEach((error) => console.log(`   • ${error}`));
    }

    if (this.stats.warnings.length > 0) {
      console.log("\n⚠️  Warnings:");
      this.stats.warnings.forEach((warning) => console.log(`   • ${warning}`));
    }

    if (CONFIG.dryRun) {
      console.log("\n🧪 DRY RUN MODE - No files were actually modified");
    }

    const success =
      this.stats.errors.length === 0 && this.stats.moved === this.stats.found;
    console.log(
      `\n${success ? "✅" : "⚠️"} Enhanced fixprops.ts completed ${
        success ? "successfully" : "with issues"
      }!`
    );
  }
}

// Execute the migration
async function main(): Promise<void> {
  const migrator = new PropsMigrator(project);

  try {
    await migrator.migrate();
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

// Run if this file is executed directly (ES module compatible)
const isMainModule = process.argv[1] === new URL(import.meta.url).pathname;
if (isMainModule) {
  main().catch(console.error);
}

export { CONFIG, PropsMigrator };
