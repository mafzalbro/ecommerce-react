import fetcher from "@/utils/fetcher";
import { getCache, setCache, removeCache } from "@/utils/caching";

// Upload file to Pinata
export const pinataUpload = async (file) => {
  const cacheKey = `pinata-upload-${file.originalname}`; // Cache key based on file name
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    return cachedData; // Return cached data if available
  }

  try {
    // Create form data for the file upload
    const formData = new FormData();
    formData.append("file", file);

    // Make API request to Pinata
    const response = await fetcher.post("/pinata-upload", formData);

    // Ensure the response structure is correct
    const fileUrl = response.data?.fileUrl;

    if (!fileUrl) {
      throw new Error("File URL not found in the response");
    }

    // Cache the response (file URL)
    setCache(cacheKey, fileUrl);

    return fileUrl;
  } catch (error) {
    console.error("Error uploading file to Pinata:", error);
    throw error;
  }
};

// Invalidate cache for specific file upload
export const invalidatePinataCache = (file) => {
  const cacheKey = `pinata-upload-${file.originalname}`;
  removeCache(cacheKey); // Remove cached file URL
};

// Example usage of uploading a file
export const uploadFileExample = async (file) => {
  try {
    const fileUrl = await pinataUpload(file);
    console.log("File uploaded successfully:", fileUrl);
  } catch (error) {
    console.error("Error in file upload:", error);
  }
};
