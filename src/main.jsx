import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SharedStoreProvider } from "./contexts/AlertContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SharedStoreProvider>
      <App />
    </SharedStoreProvider>
  </React.StrictMode>
);
