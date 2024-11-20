import AppRoutes from "./routes/AppRoutes";

import { ThemeProvider } from "./components/theme/theme-provider";
import { CartProvider } from "./hooks/CartContext";
import { AuthProvider } from "./hooks/AuthProvider";
import { NetworkErrorDialog } from "./routes/errors/NetworkError";
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <CartProvider>
          <AuthProvider>
            <AppRoutes />
            <NetworkErrorDialog />
          </AuthProvider>
        </CartProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
