import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./pages/Layout.jsx";
import { ContextProvider } from "./store/appContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <Layout />
    </ContextProvider>
  </React.StrictMode>
);
