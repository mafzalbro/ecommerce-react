import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const NotFound = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check the current theme preference in localStorage (or fallback to light)
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
    } else {
      // Default to light mode if no preference is stored
      setIsDarkMode(false);
    }
  }, []);

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "light" : "dark"); // Store the preference in localStorage

    if (!isDarkMode) {
      document.documentElement.classList.add("dark"); // Add dark class to root element
    } else {
      document.documentElement.classList.remove("dark"); // Remove dark class to switch to light mode
    }
  };

  return (
    <div
      className={`my-24 flex items-center justify-center p-4`}
    >
      <motion.div
        className={`max-w-screen-md w-full rounded-lg overflow-hidden ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 sm:p-8 flex flex-col items-center text-center">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            404
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl font-semibold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Oops! Page Not Found
          </motion.p>
          <motion.p
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/" passHref>
              <Button className="w-full sm:w-auto">
                <Home className="mr-2 h-4 w-4" /> Go to Homepage
              </Button>
            </Link>
            <Link href="/products" passHref>
              <Button variant="outline" className="w-full sm:w-auto">
                <ShoppingBag className="mr-2 h-4 w-4" /> Browse Products
              </Button>
            </Link>
          </motion.div>
        </div>
        <motion.div
          className={`p-4 text-center text-sm ${
            isDarkMode
              ? "bg-gray-700 text-gray-300"
              : "bg-gray-100 text-gray-500"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Lost? Don't worry, we've got you covered. Choose a destination above.
          {/* Theme Toggle Button */}
          <div className="my-10">
            <Button variant="outline" onClick={toggleTheme}>
              {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
