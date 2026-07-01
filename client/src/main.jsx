import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./assets/styles/global.css";

import { Toaster } from "react-hot-toast";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <App />

      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={12}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#ffffff",
            color: "#0f172a",
            borderRadius: "12px",
            padding: "16px",
            fontSize: "14px",
            boxShadow: "0 10px 30px rgba(0,0,0,.12)",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </>
  </React.StrictMode>,
);
