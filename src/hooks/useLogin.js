import { useState, useEffect } from "react";
import fetcher from "../utils/fetcher";
import useAuth from "./AuthProvider";

export function useLogin() {
  const { setIsAuthenticated, setUser, setRole } = useAuth();

  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null); // State to store error messages

  // Check if the user is already logged in (from localStorage) on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.user); // Set the user state if there's data in localStorage
      setRole(parsedUser?.user?.role); // Set the role state if there's data in localStorage
    } else {
      localStorage.clear();
    }
  }, [setRole, setUser]); // Empty dependency array means this runs only once when the component mounts

  // Function to handle login
  const login = async (email, password) => {
    try {
      setLoading(true); // Set loading to true before API call
      setError(null); // Reset error state before new login attempt

      const response = await fetcher.post("/api/v1/auth/signin", {
        email,
        password,
      });

      const data = response.data;

      if (data?.message === "success") {
        // Assign user and role separately from the data
        const { user } = data; // Extract user and role from the response data
        setUser(user); // Set the user data in state
        setRole(user?.role); // Set the role data in state
        setIsAuthenticated(true); // Set authentication state to true
        // window.location.reload();
        localStorage.setItem("user", JSON.stringify(data)); // Save user and role data in local storage
      }

      return data;
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      ); // Set error message
      console.error(err); // Log the error for debugging
      throw new Error(err);
    } finally {
      setLoading(false); // Stop the loading indicator
    }
  };

  // Function to handle signup
  const signup = async (user) => {
    try {
      setLoading(true); // Set loading to true before API call
      setError(null); // Reset error state before new signup attempt

      const response = await fetcher.post("/api/v1/auth/signup", {
        ...user,
      });

      const data = response.data;

      // Save user and role data in local storage
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", JSON.stringify(data?.token));
      setUser(data.user); // Set the user data in state
      setRole(data.user?.role); // Set the role data in state
      setIsAuthenticated(true);
      
      return data;
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      ); // Set error message
      console.error(err); // Log the error for debugging
      throw new Error(err);
    } finally {
      setLoading(false); // Stop the loading indicator
    }
  };

  // Function to handle logout
  const logout = () => {
    setUser(null); // Clear the user state
    setRole(null); // Clear the role state
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("token");
    window.location.reload();
  };

  // Function to update user information
  const updateProfile = async (id, userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetcher.put(
        `/api/v1/users/updateUser/${id}`,
        userData
      );

      if (response.data?.message === "success") {
        return response.data;
      }

      return response.data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update user. Please try again."
      );
      console.error(err);
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to change user password
  const changePassword = async (id, passwordData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetcher.patch(
        `/api/v1/users/changeUserPassword/${id}`,
        passwordData
      );

      if (response.data?.message === "success") {
        return response.data;
      }

      return response.data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to change password. Please try again."
      );
      console.error(err);
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  };

  // Check if the user is already logged in (from localStorage) on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.user);
      setRole(parsedUser.user?.role);
    } else {
      localStorage.clear();
    }
  }, [setRole, setUser]);

  return {
    loading,
    error,
    login,
    changePassword,
    updateProfile,
    signup,
    logout,
  };
}

export default useLogin;
