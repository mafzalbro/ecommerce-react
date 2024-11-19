import AppRoutes from "./routes/AppRoutes";

import { ThemeProvider } from "./components/theme/theme-provider";
import { CartProvider } from "./hooks/CartContext";
import { AuthProvider } from "./hooks/AuthProvider";
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <CartProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </CartProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
