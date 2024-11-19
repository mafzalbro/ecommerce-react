import axios from "axios";
import { setup } from "axios-cache-adapter";

// Setting up the caching
const cache = setup({
  cache: {
    maxAge: 1 * 60 * 1000, // Cache for 1 minute
  },
});

// Function to get the token from localStorage
const getAuthToken = () => {
  return (
    JSON.parse(localStorage.getItem("user"))?.token ||
    localStorage.getItem("token")
  );
};

const fetcher = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: "https://my-fyp-restorex.vercel.app/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

// Set up caching for axios instance
fetcher.defaults.adapter = cache.adapter;

// Interceptor to modify cache configuration or skip cache for specific routes
fetcher.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  // Check if the route should skip cache or remove cache
  if (config.skip || config.remove) {
    // Skip cache by setting `cache: { enabled: false }`
    config.adapter = axios.defaults.adapter;
    delete config.headers["cache-control"]; // Clear cache control if it's set
  }

  return config;
});

// Interceptors for handling responses
fetcher.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Check if response has a status code
      const status = error.response.status;

      // Extract the exact error message from the server
      const errorMessage =
        error.response.data?.message ||
        error.response.data?.error ||
        "An error occurred. Please try again later.";

      // Log the full error details for debugging
      console.error("Error details:", {
        status,
        message: errorMessage,
        data: error.response.data,
        headers: error.response.headers,
      });

      // Handle different HTTP status codes
      if (status === 401) {
        console.error("Unauthorized request. Please login again.");
        localStorage.removeItem("token"); // Remove expired token
        console.error("Session expired. Please log in again.");
      } else if (status === 403) {
        console.error(errorMessage); // Forbidden error (using the message from server)
      } else if (status === 500) {
        console.error(errorMessage); // Internal server error (using the message from server)
      } else {
        console.error(errorMessage); // Generic error message (using the server error)
      }
    } else {
      // If there's no response (e.g., network error)
      console.error("Network error. Please check your internet connection.");
      console.error("Network error: ", error);
    }
    return Promise.reject(error);
  }
);

export default fetcher;
