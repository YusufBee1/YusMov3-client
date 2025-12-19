import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MainView } from "./components/main-view/main-view";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const App = () => (
  <BrowserRouter>
    <MainView />
  </BrowserRouter>
);

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(<App />);
