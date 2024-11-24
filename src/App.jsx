import AppRoutes from "./routes/AppRoutes";

import { ThemeProvider } from "./components/theme/theme-provider";
import { CartProvider } from "./hooks/CartContext";
import { AuthProvider } from "./hooks/AuthProvider";
import { NetworkErrorDialog } from "./routes/errors/NetworkError";
import { useEffect, useState } from "react";

// import { Loader2 } from "lucide-react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Remove loader after 2 seconds
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black z-50">
        <div className="flex flex-col items-center space-y-4">
          <img
            src="/loader.png"
            alt="Loading..."
            className="w-full animate-pulse object-contain"
          />
          {/* <div className="flex gap-4">
            <Loader2 className="animate-spin" />
            <div className="animate-pulse text-gray-500 dark:text-gray-200 font-medium">
              Loading, please wait...
            </div>
          </div> */}
        </div>
      </div>
    );
  }

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
