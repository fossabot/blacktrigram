/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  // Use relative paths for production builds (GitHub Pages)
  base: command === "build" ? "./" : "/",
  resolve: {
    alias: {
      "react-reconciler/constants": "react-reconciler/constants.js",
      // Add path aliases for better tree shaking
      "@": "/src",
      "@/components": "/src/components",
      "@/systems": "/src/systems",
      "@/types": "/src/types",
      "@/audio": "/src/audio",
      "@/utils": "/src/utils",
    },
  },
  optimizeDeps: {
    include: ["@pixi/react", "pixi.js", "react-reconciler", "howler"],
    // Exclude heavy dependencies from pre-bundling
    exclude: ["@pixi/sound"],
  },
  build: {
    target: "esnext",
    // Reduced chunk size warning limit for game assets
    chunkSizeWarningLimit: 500,
    // Force minification
    minify: "esbuild",
    // Enable CSS minification
    cssMinify: true,
    // Disable sourcemaps in production
    sourcemap: false,

    rollupOptions: {
      output: {
        // Aggressive chunking for better caching
        manualChunks: (id): string | undefined => {
          // Critical React libraries (smallest possible)
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/")
          ) {
            return "react-vendor";
          }

          // PixiJS core - split into smaller chunks
          if (id.includes("node_modules/pixi.js/")) {
            // Split PixiJS by functionality
            if (id.includes("/rendering/")) return "pixi-rendering";
            if (id.includes("/scene/")) return "pixi-scene";
            if (id.includes("/filters/")) return "pixi-filters";
            return "pixi-core";
          }

          // Audio system
          if (id.includes("node_modules/howler/") || id.includes("/src/audio/")) {
            return "audio";
          }

          // Lazy load large Korean data
          if (
            id.includes("/constants/techniques.ts") ||
            id.includes("/constants/combat.ts") ||
            id.includes("/placeholder-sounds.ts")
          ) {
            return "korean-data"; // Will be lazy loaded
          }

          // UI components - defer non-critical screens
          if (id.includes("/TrainingScreen") || id.includes("/EndScreen")) {
            return "screens"; // Lazy loaded
          }

          // Core game systems
          if (id.includes("/src/systems/") || id.includes("/src/utils/")) {
            return "game-core";
          }

          // All other vendor
          if (id.includes("node_modules/")) {
            return "vendor";
          }

          return undefined;
        },

        // Optimize chunk and asset naming for better caching
        chunkFileNames: "assets/[name]-[hash:6].js", // Shorter hashes
        entryFileNames: "assets/[name]-[hash:6].js",

        assetFileNames: (assetInfo): string => {
          // Organize Korean martial arts assets by type
          if (/\.(mp3|wav|ogg)$/i.test(assetInfo.name ?? "")) {
            return "assets/audio/[name]-[hash:6][extname]";
          }
          if (/\.(png|jpg|jpeg|svg|webp)$/i.test(assetInfo.name ?? "")) {
            return "assets/images/[name]-[hash:6][extname]";
          }
          return "assets/[name]-[hash:6][extname]";
        },
      },
    },

    // Aggressive asset optimization
    assetsInlineLimit: 2048, // Reduced from 4096
    reportCompressedSize: false, // Skip for faster builds

    // Tree shaking optimization
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      unknownGlobalSideEffects: false,
    },
  },

  esbuild: {
    target: "ES2020",
    // Remove console logs in production
    drop: mode === "production" ? ["console", "debugger"] : [],
    // Optimize for smaller bundle
    legalComments: "none",
    minifyIdentifiers: true,
    minifyWhitespace: true,
    minifySyntax: true,
    // Optimize for Korean text rendering
    charset: "utf8",
  },

  // Enhanced server configuration for Korean martial arts development
  server: {
    host: true,
    port: 5173,
    hmr: { overlay: false },
    // Enable compression for dev server
    middlewareMode: false,
  },

  // Preview server optimizations
  preview: {
    port: 4173,
    host: true,
    // Production preview optimizations
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Encoding": "gzip",
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      include: [
        "src/systems/**/*.ts",
        "src/components/**/*.{ts,tsx}",
        "src/audio/**/*.ts",
        "src/hooks/**/*.ts",
        "src/utils/**/*.ts",
        "src/types/**/*.ts",
      ],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts",
        "**/*.config.*",
        "dist/",
        "coverage/",
        "cypress/",
        "**/placeholder-sounds.ts",
        "**/DefaultSoundGenerator.ts",
        "**/__tests__/**",
        "**/mocks/**",
      ],
      thresholds: {
        global: {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85,
        },
        "src/systems/": {
          branches: 90,
          functions: 92,
          lines: 90,
          statements: 90,
        },
      },
    },
  },
}));
