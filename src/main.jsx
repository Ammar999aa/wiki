import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.scss";
import "katex/dist/katex.min.css";
import App from "./App.jsx";
import { LanguageProvider } from "./i18n/LanguageContext.jsx";
import { initPerfMode } from "./utils/perfMode.js";

// Before the first render, so a remembered low-performance result is
// already on <html> when the first page paints (see utils/perfMode.js).
initPerfMode();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
);
