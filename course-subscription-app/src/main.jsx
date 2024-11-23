import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import { CartProvider } from "./store/CartContext";
import { AuthProvider } from "./store/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <AuthProvider>
        <CssBaseline />
        <App />
      </AuthProvider>
    </CartProvider>
  </StrictMode>
);
