import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import NihongoVertex from "./NihongoVertex.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NihongoVertex />
  </React.StrictMode>
);
