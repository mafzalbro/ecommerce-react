import fetcher from "@/utils/fetcher";
import { getCache, setCache, removeCache } from "@/utils/caching";

// Fetch all pending requests
export const getAllRequests = async () => {
  const cacheKey = "requests";
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    return cachedData; // Return cached data if available
  }

  try {
    const response = await fetcher.get("/restorex/request/getAllRequests");
    const data = response.data.getAllRequests;

    // Cache the fetched data
    setCache(cacheKey, data);

    return data;
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    throw error;
  }
};
export const fetchPendingRequests = async () => {
  const cacheKey = "pending-requests";
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    return cachedData; // Return cached data if available
  }

  try {
    const response = await fetcher.get("/restorex/request/pendingRequests");
    const data = response.data.requests;

    // Cache the fetched data
    setCache(cacheKey, data);

    return data;
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    throw error;
  }
};

// Create a new request
export const createRequest = async (requestData) => {
  try {
    const response = await fetcher.post(
      "/restorex/request/createRequest",
      requestData
    );
    removeCache("requests");
    removeCache("pending-requests");
    fetchPendingRequests();
    getAllRequests();

    const newRequest = response.data.request;

    // Optionally, update the cache for pending requests
    const cacheKey = "pending-requests";
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      setCache(cacheKey, [...cachedData, newRequest]);
    }

    return newRequest;
  } catch (error) {
    console.error("Error creating request:", error);
    throw error;
  }
};

// Respond to a request
export const respondToRequest = async (requestId, responseData) => {
  try {
    removeCache("pending-requests");
    const response = await fetcher.put(
      `/restorex/request/respondToRequest/${requestId}`,
      responseData
    );
    const updatedRequest = response.data.request;

    // Optionally, update the cache for pending requests
    const cacheKey = "pending-requests";
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      const updatedCache = cachedData.filter((req) => req._id !== requestId);
      setCache(cacheKey, updatedCache);
    }

    return updatedRequest;
  } catch (error) {
    console.error(`Error responding to request with ID ${requestId}:`, error);
    throw error;
  }
};

// Delete a request
export const deleteRequest = async (requestId) => {
  try {
    const response = await fetcher.delete(`/restorex/request/${requestId}`);
    const message = response.data.message;

    // Optionally, update the cache for pending requests
    const cacheKey = "pending-requests";
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      const updatedCache = cachedData.filter((req) => req._id !== requestId);
      setCache(cacheKey, updatedCache);
    }

    return message;
  } catch (error) {
    console.error(`Error deleting request with ID ${requestId}:`, error);
    throw error;
  }
};

// Fetch a specific request by ID
export const fetchRequestById = async (requestId) => {
  const cacheKey = `request-${requestId}`;
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    return cachedData; // Return cached data if available
  }

  try {
    const response = await fetcher.get(`/restorex/request/${requestId}`);
    const data = response.data.request;

    // Cache the fetched data
    setCache(cacheKey, data);

    return data;
  } catch (error) {
    console.error(`Error fetching request with ID ${requestId}:`, error);
    throw error;
  }
};
