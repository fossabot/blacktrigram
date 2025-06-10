import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Initialize PixiJS extensions before React app starts
import "./utils/pixiExtensions";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Set document title with Korean martial arts theme
document.title = "흑괘 무술 도장 - Black Trigram Martial Arts";
