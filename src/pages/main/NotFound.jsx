import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home, ShoppingBag, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../components/theme/theme-provider";
import useAuth from "../../hooks/AuthProvider";

const NotFound = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const { role } = useAuth();
  const navigate = useNavigate();
  const pathname = location.pathname;

  // Function to toggle between "dark" and "light" themes
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Function to navigate to specific paths
  const handleNavigate = (path) => {
    navigate(path);
  };

  // Message based on pathname
  // const renderRoleMessage = () => {

  //   return null;
  // };
  if (pathname.startsWith("/admin") && role !== "admin") {
    return (
      <motion.div
        className="min-h-96 my-20 p-4 mb-4 text-center text-red-600 dark:text-red-400 font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        This route is restricted. Please log in as an{" "}
        <Link to={"/signin"} className="underline">
          Admin
        </Link>{" "}
        to access admin features.
      </motion.div>
    );
  }
  if (pathname.startsWith("/seller") && role !== "seller") {
    return (
      <motion.div
        className="min-h-96 my-20 mb-4 text-center text-blue-600 dark:text-blue-400 font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        This route is restricted. Please log in as a{" "}
        <Link to={"/signin"} className="underline">
          Seller
        </Link>{" "}
        to access seller features.
      </motion.div>
    );
  }

  return (
    <div className="my-24 flex items-center justify-center p-4">
      <motion.div
        className="max-w-screen-md w-full rounded-lg overflow-hidden bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Role-Specific Message */}
        {/* {renderRoleMessage()} */}

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
            <Button
              className="w-full sm:w-auto"
              onClick={() => handleNavigate("/")}
            >
              <Home className="mr-2 h-4 w-4" /> Go to Homepage
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => handleNavigate("/products")}
            >
              <ShoppingBag className="mr-2 h-4 w-4" /> Browse Products
            </Button>
          </motion.div>
        </div>
        <motion.div
          className="p-4 text-center text-sm dark:bg-gray-700 dark:text-gray-300 bg-gray-100 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Lost? Don't worry, we've got you covered. Choose a destination above.
          {/* Theme Toggle Button */}
          {/* <div className="my-10">
            <Button variant="outline" onClick={toggleTheme}>
              {theme === "dark"
                ? "Switch to Light Mode"
                : "Switch to Dark Mode"}
            </Button>
          </div> */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
