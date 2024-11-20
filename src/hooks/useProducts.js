import { useState, useEffect, useCallback, useRef } from "react";
import fetcher from "@/utils/fetcher";
import { toast } from "@/hooks/use-toast";

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

  // Caching Maps
  const productsCache = useRef(new Map());
  const productByIdCache = useRef(new Map());
  const newArrivalsCache = useRef(null);
  const heavyProductsCache = useRef(null);

  // Fetch all products
  const getProducts = useCallback(async () => {
    setLoadingProducts(true);
    try {
      let query = "";
      if (searchParams?.category) query += `category=${searchParams.category}&`;
      if (searchParams?.searchTerm)
        query += `keyword=${searchParams.searchTerm}&`;
      if (searchParams?.subCategory)
        query += `subcategory=${searchParams.subCategory}&`;

      if (query?.endsWith("&")) query = query.slice(0, -1);

      const cacheKey = `/api/v1/products/getAllProducts?${query}`;
      if (productsCache.current.has(cacheKey)) {
        // Use cached data if available
        const cachedData = productsCache.current.get(cacheKey);
        setProducts(cachedData.products);
        setTotalResults(cachedData.totalResults);
      } else {
        const response = await fetcher.get(cacheKey);
        const data = {
          products: response.data.getAllProducts,
          totalResults: response.data.totalResults,
        };
        // Cache response
        productsCache.current.set(cacheKey, data);
        setProducts(data.products);
        setTotalResults(data.totalResults);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoadingProducts(false);
    }
  }, [searchParams]);

  // Fetch populated (heavy) products
  const getPopulatedProducts = useCallback(async () => {
    setLoadingHeavyProducts(true);
    const cacheKey = "/api/v1/products/getProducts";
    if (heavyProductsCache.current) {
      // Use cached data if available
      setHeavyProducts(heavyProductsCache.current);
    } else {
      try {
        const response = await fetcher.get(cacheKey);
        setHeavyProducts(response.data.getProducts);
        // Cache response
        heavyProductsCache.current = response.data.getProducts;
      } catch (err) {
        console.log("Error fetching populated products:", err);
      } finally {
        setLoadingHeavyProducts(false);
      }
    }
  }, []);

  // Fetch product by ID
  const getProductById = useCallback(async (id) => {
    if (!id) return;
    setLoadingProductById(true);
    if (productByIdCache.current.has(id)) {
      // Use cached data if available
      setProductById(productByIdCache.current.get(id));
    } else {
      try {
        const response = await fetcher.get(
          `/api/v1/products/getProductsById/${id}`
        );
        const product = response.data.getProductsById;
        setProductById(product);
        // Cache response
        productByIdCache.current.set(id, product);
        return product;
      } catch (err) {
        console.log("Error fetching product by ID:", err);
      } finally {
        setLoadingProductById(false);
      }
    }
  }, []);

  // Fetch new arrivals
  const getNewArrivals = useCallback(async () => {
    setLoadingNewArrivals(true);
    if (newArrivalsCache.current) {
      // Use cached data if available
      setNewArrivals(newArrivalsCache.current);
    } else {
      try {
        const response = await fetcher.get("/api/v1/products/newArrivals");
        setNewArrivals(response.data.newArrivals);
        // Cache response
        newArrivalsCache.current = response.data.newArrivals;
      } catch (err) {
        console.log("Error fetching new arrivals:", err);
      } finally {
        setLoadingNewArrivals(false);
      }
    }
  }, []);

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
        // Remove from cache
        productsCache.current.forEach((data, key) => {
          data.products = data.products.filter(
            (product) => product._id !== productId
          );
          productsCache.current.set(key, data);
        });
      }
    } catch (err) {
      console.log("Error deleting product:", err);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

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
        // Update cache
        productsCache.current.forEach((data, key) => {
          data.products = data.products.map((product) =>
            product._id === id ? updatedData : product
          );
          productsCache.current.set(key, data);
        });
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
    getPopulatedProducts();
    getNewArrivals();
  }, [getProducts]);

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
