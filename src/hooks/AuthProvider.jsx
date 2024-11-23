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
  const [approved, setSellerApproved] = useState(false);
  const [sellerStatus, setSellerStatus] = useState("");
  const [role, setRole] = useState(null); // role could be 'user', 'seller', or 'admin'
  const [user, setUser] = useState(null); // Store user data
  const [userLoading, setUserLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("token");
    setUser(null);
    setRole("");
    setIsAuthenticated(false);
    // window.location.href = "/";
  };

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        setUser(parsedUser?.user || null);
        setRole(parsedUser?.user?.role || null);
        setSellerApproved(parsedUser?.user?.seller_approved || false);
        setSellerStatus(parsedUser?.user?.seller_status || "");
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Failed to load user data:", err);
      logout(); // Clear invalid data
    } finally {
      setUserLoading(false);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        userLoading,
        isAuthenticated,
        setIsAuthenticated,
        setRole,
        setUser,
        approved,
        sellerStatus,
        setSellerStatus,
        setSellerApproved,
        role,
        user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
