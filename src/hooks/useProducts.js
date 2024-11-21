import { useState, useEffect, useCallback, useMemo } from "react";
import fetcher from "@/utils/fetcher";
import { toast } from "@/hooks/use-toast";

// Cache expiration time (5 seconds)
const CACHE_EXPIRATION_TIME = 15000;

function setCache(key, data) {
  const cacheData = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(cacheData));
}

function getCache(key) {
  const cacheData = JSON.parse(localStorage.getItem(key));
  if (!cacheData) return null;

  // Check if the cache has expired
  if (Date.now() - cacheData.timestamp > CACHE_EXPIRATION_TIME) {
    localStorage.removeItem(key); // Remove expired cache
    return null;
  }

  return cacheData.data;
}

export function useProducts(searchParams) {
  const [products, setProducts] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [heavyProducts, setHeavyProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingHeavyProducts, setLoadingHeavyProducts] = useState(true);
  const [productById, setProductById] = useState(null);
  const [loadingProductById, setLoadingProductById] = useState(false);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loadingNewArrivals, setLoadingNewArrivals] = useState(true);

  // Memoize searchParams to prevent unnecessary re-renders
  const memoizedSearchParams = useMemo(() => searchParams, [searchParams]);

  // Fetch products with caching mechanism
  const getProducts = useCallback(async () => {
    setLoadingProducts(true);
    try {
      let query = new URLSearchParams();

      // Add existing filters
      if (memoizedSearchParams?.category)
        query.set("category", memoizedSearchParams.category);
      if (memoizedSearchParams?.searchTerm)
        query.set("keyword", memoizedSearchParams.searchTerm);
      if (memoizedSearchParams?.subCategory)
        query.set("subcategory", memoizedSearchParams.subCategory);

      // Add price filters (mapped to price[gte] and price[lte])
      if (
        memoizedSearchParams?.priceGte &&
        !isNaN(memoizedSearchParams.priceGte)
      ) {
        query.set("price[gte]", memoizedSearchParams.priceGte);
      }
      if (
        memoizedSearchParams?.priceLte &&
        !isNaN(memoizedSearchParams.priceLte)
      ) {
        query.set("price[lte]", memoizedSearchParams.priceLte);
      }

      const queryString = query.toString();
      const cacheKey = `/api/v1/products/getAllProducts?${queryString}`;

      const cachedData = getCache(cacheKey);
      if (cachedData) {
        setProducts(cachedData.products);
        setTotalResults(cachedData.totalResults);
      } else {
        const response = await fetcher.get(cacheKey);
        const data = {
          products: response.data.getAllProducts,
          totalResults: response.data.totalResults,
        };
        setProducts(data.products);
        setTotalResults(data.totalResults);
        setCache(cacheKey, data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoadingProducts(false);
    }
  }, [memoizedSearchParams]);

  // Fetch populated (heavy) products with cache
  const getPopulatedProducts = useCallback(async () => {
    setLoadingHeavyProducts(true);
    const cacheKey = "/api/v1/products/getProducts";
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      setHeavyProducts(cachedData);
    } else {
      try {
        const response = await fetcher.get(cacheKey);
        setHeavyProducts(response.data.getProducts);
        setCache(cacheKey, response.data.getProducts);
      } catch (err) {
        console.log("Error fetching populated products:", err);
      } finally {
        setLoadingHeavyProducts(false);
      }
    }
  }, []);

  // Fetch product by ID with cache
  const getProductById = useCallback(async (id) => {
    if (!id) return;
    setLoadingProductById(true);
    const cacheKey = `/api/v1/products/getProductsById/${id}`;
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      setProductById(cachedData);
    } else {
      try {
        const response = await fetcher.get(cacheKey);
        const product = response.data.getProductsById;
        setProductById(product);
        setCache(cacheKey, product);
      } catch (err) {
        console.log("Error fetching product by ID:", err);
      } finally {
        setLoadingProductById(false);
      }
    }
  }, []);

  // Fetch new arrivals with cache
  const getNewArrivals = useCallback(async () => {
    setLoadingNewArrivals(true);
    const cacheKey = "/api/v1/products/newArrivals";
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      setNewArrivals(cachedData);
    } else {
      try {
        const response = await fetcher.get(cacheKey);
        setNewArrivals(response.data.newArrivals);
        setCache(cacheKey, response.data.newArrivals);
      } catch (err) {
        console.log("Error fetching new arrivals:", err);
      } finally {
        setLoadingNewArrivals(false);
      }
    }
  }, []);

  // Delete product with cache update
  const deleteProduct = useCallback(async (productId) => {
    try {
      setLoadingProducts(true);
      const response = await fetcher.delete(
        `/api/v1/products/deleteProduct/${productId}`
      );
      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        // Clear caches related to this product
        Object.keys(localStorage).forEach((key) => {
          if (key.includes(productId)) localStorage.removeItem(key);
        });
      }
    } catch (err) {
      console.log("Error deleting product:", err);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  // Update product and cache
  const updateProduct = useCallback(async (id, updatedProduct) => {
    try {
      const response = await fetcher.put(
        `/api/v1/products/updateProduct/${id}`,
        updatedProduct
      );
      if (response.status === 201) {
        const updatedData = response.data.updateProduct;
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === id ? updatedData : product
          )
        );
        setCache(
          `/api/v1/products/getAllProducts?category=${updatedProduct.category}`,
          updatedData
        ); // Update cache with new product data
        toast({
          title: "Success",
          description: "Product updated successfully!",
          variant: "success",
        });
      }
    } catch (err) {
      console.error("Error updating product:", err);
      toast({
        title: "Error",
        description: "Failed to update the product. Please try again.",
        variant: "destructive",
      });
      throw err;
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);
  
  useEffect(() => {
    getPopulatedProducts();
  }, [getPopulatedProducts]);

  useEffect(() => {
    getPopulatedProducts();
  }, [getNewArrivals]);

  return {
    products,
    heavyProducts,
    newArrivals,
    productById,
    loadingProducts,
    loadingHeavyProducts,
    loadingProductById,
    loadingNewArrivals,
    getProductById,
    totalResults,
    setLoadingProducts,
    deleteProduct,
    updateProduct,
  };
}
