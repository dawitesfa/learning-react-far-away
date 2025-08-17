import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";

const rootEelement = document.getElementById("root");

const root = createRoot(rootEelement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
