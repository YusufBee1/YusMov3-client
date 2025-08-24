import React from "react";
import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import "./index.scss";

// Root container (matches <div id="root"></div> in index.html)
const container = document.getElementById("root");
const root = createRoot(container);

// Render MainView inside the root
root.render(<MainView />);
