import { useState, useEffect } from "react";
import fetcher from "../utils/fetcher";
import useAuth from "./AuthProvider";

export function useLogin() {
  const { setIsAuthenticated, setUser, setRole } = useAuth();

  const [loading, setLoading] = useState(false); // Manage loading state
  const [error, setError] = useState(null); // Manage error messages

  // Check if the user is already logged in (from localStorage) on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser?.user || null);
      setRole(parsedUser?.user?.role || null);
      setIsAuthenticated(true);
    } else {
      localStorage.clear();
      setIsAuthenticated(false);
    }
  }, [setRole, setUser, setIsAuthenticated]);

  // Function to handle login
  const login = async (email, password) => {
    setLoading(true);
    setError(null); // Reset errors before starting a new request
    try {
      const response = await fetcher.post("/api/v1/auth/signin", { email, password });
      const data = response.data;

      if (data?.message === "success") {
        const { user } = data;
        setUser(user); // Update user context
        setRole(user?.role || null); // Update role context
        setIsAuthenticated(true); // Mark user as authenticated
        localStorage.setItem("user", JSON.stringify(data)); // Persist user data
        return data; // Return for further handling
      } else {
        throw new Error("Unexpected response structure.");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      console.error("Login error:", err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Function to handle signup
  const signup = async (user) => {
    setLoading(true);
    setError(null); // Reset errors before starting a new request
    try {
      const response = await fetcher.post("/api/v1/auth/signup", user);
      const data = response.data;

      if (data?.message === "success") {
        setUser(data.user);
        setRole(data.user?.role || null);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data?.token || "");
        return data;
      } else {
        throw new Error("Unexpected response structure.");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Signup failed. Please try again.";
      setError(errorMessage);
      console.error("Signup error:", err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Function to update user profile
  const updateProfile = async (id, userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetcher.put(`/api/v1/users/updateUser/${id}`, userData);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to update profile. Please try again.";
      setError(errorMessage);
      console.error("Update profile error:", err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Function to change user password
  const changePassword = async (id, passwordData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetcher.patch(`/api/v1/users/changeUserPassword/${id}`, passwordData);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to change password. Please try again.";
      setError(errorMessage);
      console.error("Change password error:", err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Function to logout
  const logout = () => {
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("token");
    // window.location.href = "/"; // Redirect to home
  };

  return {
    loading,
    error,
    login,
    signup,
    updateProfile,
    changePassword,
    logout,
  };
}

export default useLogin;
