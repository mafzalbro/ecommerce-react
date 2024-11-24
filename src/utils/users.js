import fetcher from "@/utils/fetcher";
import { getCache, setCache, removeCache } from "@/utils/caching";

// Fetch all users with optional query parameters
export const fetchAllUsers = async (query = {}) => {
  const cacheKey = JSON.stringify(query); // Using query as the cache key
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    return cachedData; // Return cached data if available
  }

  try {
    const response = await fetcher.get("/api/v1/users/getAllUsers", {
      params: query,
    });
    const data = response.data.data;

    // Cache the fetched data
    setCache(cacheKey, data);

    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Fetch a single user by ID
export const fetchUserById = async (userId) => {
  const cacheKey = `user-${userId}`; // Unique cache key for each user
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    return cachedData; // Return cached data if available
  }

  try {
    const response = await fetcher.get(`/api/v1/users/getUserById/${userId}`);
    const data = response.data.data;

    // Cache the fetched data
    setCache(cacheKey, data);

    return data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
};
// Add a new user
export const addUser = async (userData) => {
  try {
    window.sessionStorage.clear();
    const response = await fetcher.post("/api/v1/users/addUser", userData);
    return response.data.user;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

// Update a user
export const updateUser = async (userId, userData) => {
  try {
    const response = await fetcher.put(
      `/api/v1/users/updateUser/${userId}`,
      userData
    );
    window.sessionStorage.clear();
    return response.data.updateUser;
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (userId) => {
  try {
    const response = await fetcher.delete(`/api/v1/users/deleteUser/${userId}`);
    window.sessionStorage.clear();
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};

// Change user password
export const changeUserPassword = async (userId, passwordData) => {
  try {
    const response = await fetcher.patch(
      `/api/v1/users/changeUserPassword/${userId}`,
      passwordData
    );

    window.sessionStorage.clear();
    // Invalidate cache for this user
    removeCache(`user-${userId}`);

    return response.data.changeUserPassword;
  } catch (error) {
    console.error(`Error changing password for user ID ${userId}:`, error);
    throw error;
  }
};
