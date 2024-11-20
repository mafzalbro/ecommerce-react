// context/AuthContext.js
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext); // Custom hook to access AuthContext
};

export default useAuth;

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("user"); // role could be 'user', 'seller', or 'admin'
  const [user, setUser] = useState(null); // Store user data

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("token");
    setUser(null);
    setRole("");
    setIsAuthenticated(false);
    window.location.href = "/signin";
  };

  // Get the user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setIsAuthenticated(false);
      setRole(null);
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser?.user);

    // Set authentication status to true
    setIsAuthenticated(true);

    // Set the role from the user data (assuming the user data contains the role)
    setRole(parsedUser?.user?.role || null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        setRole,
        setUser,
        role,
        user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
