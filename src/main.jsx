import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/routes.jsx";
import AuthProvider from "./auth/AuthProvider.jsx";
import { DarkModeProvider } from "./context/DarkModeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DarkModeProvider>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </DarkModeProvider>
  </StrictMode>
);
