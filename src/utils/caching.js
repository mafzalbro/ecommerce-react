// Cache expiration time (5 seconds)
const CACHE_EXPIRATION_TIME = 15000;

export function setCache(key, data) {
  const cacheData = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(cacheData));
}

export function getCache(key) {
  const cacheData = JSON.parse(localStorage.getItem(key));
  if (!cacheData) return null;

  // Check if the cache has expired
  if (Date.now() - cacheData.timestamp > CACHE_EXPIRATION_TIME) {
    localStorage.removeItem(key); // Remove expired cache
    return null;
  }

  return cacheData.data;
}
