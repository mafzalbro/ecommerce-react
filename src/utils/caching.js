// Cache expiration time (5 seconds)
const CACHE_EXPIRATION_TIME = 1000;

export function setCache(key, data) {
  const cacheData = {
    data,
    timestamp: Date.now(),
  };
  sessionStorage.setItem(key, JSON.stringify(cacheData));
}

export function getCache(key) {
  const cacheData = JSON.parse(sessionStorage.getItem(key));
  if (!cacheData) return null;

  // Check if the cache has expired
  if (Date.now() - cacheData.timestamp > CACHE_EXPIRATION_TIME) {
    sessionStorage.removeItem(key); // Remove expired cache
    return null;
  }

  return cacheData.data;
}

export function removeCache(key) {
  sessionStorage.removeItem(key);
}
