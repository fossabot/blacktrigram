import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Get root element with proper error handling
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error(
    "Root element not found. Make sure you have a div with id='root' in your HTML."
  );
}

// Create React root and render the Korean martial arts game
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
