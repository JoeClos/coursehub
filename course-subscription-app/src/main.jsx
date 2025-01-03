import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { CartProvider } from "./store/CartContext";
import { AuthProvider } from "./store/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { CourseProvider } from "./store/CourseContext.jsx";
import { UserProvider } from "./store/UserContext.jsx";

let theme = createTheme({
  typography: {
    fontFamily: "Ubuntu, sans-serif",
  },
});

theme = responsiveFontSizes(theme);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <UserProvider>
        <CourseProvider>
          <CartProvider>
            <AuthProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
              </ThemeProvider>
            </AuthProvider>
          </CartProvider>
        </CourseProvider>
      </UserProvider>
    </ErrorBoundary>
  </StrictMode>
);
