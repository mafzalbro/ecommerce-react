import { useState, useEffect, useCallback, useMemo } from "react";
import fetcher from "@/utils/fetcher";

export function useProducts(searchParams) {
  const [products, setProducts] = useState([]);
  const [totalResults, setTotalResults] = useState([]);
  const [heavyProducts, setHeavyProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingHeavyProducts, setLoadingHeavyProducts] = useState(true);
  const [productById, setProductById] = useState(null);
  const [loadingProductById, setLoadingProductById] = useState(false);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loadingNewArrivals, setLoadingNewArrivals] = useState(true);

  const getProducts = useCallback(async () => {
    setLoadingProducts(true);
    try {
      let query = "";
      if (searchParams?.category) query += `category=${searchParams.category}&`;
      if (searchParams?.searchTerm)
        query += `keyword=${searchParams.searchTerm}&`;
      if (searchParams?.subCategory)
        query += `subcategory=${searchParams.subCategory}&`;

      if (query?.endsWith("&")) {
        query = query.slice(0, -1);
      }

      const response = await fetcher.get(
        `/api/v1/products/getAllProducts?${query}`
      );
      setProducts(response.data.getAllProducts);
      setTotalResults(response.data.totalResults);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoadingProducts(false);
    }
  }, [searchParams]);

  // Function to get populated products
  const getpopulatedProducts = useCallback(async () => {
    setLoadingHeavyProducts(true);
    try {
      const response = await fetcher.get("/api/v1/products/getProducts");
      setHeavyProducts(response.data.getProducts);
    } catch (err) {
      console.log("Error fetching populated products:", err);
    } finally {
      setLoadingHeavyProducts(false);
    }
  }, []);

  // Function to get a product by its ID
  const getProductById = useCallback(async (id) => {
    if (!id) return;
    setLoadingProductById(true);

    try {
      const response = await fetcher.get(
        `/api/v1/products/getProductsById/${id}`
      );
      setProductById(response.data.getProductsById);
    } catch (err) {
      console.log("Error fetching product by ID:", err);
    } finally {
      setLoadingProductById(false);
    }
  }, []);

  // Function to get new arrivals
  const getNewArrivals = useCallback(async () => {
    setLoadingNewArrivals(true);
    try {
      const response = await fetcher.get("/api/v1/products/newArrivals");
      setNewArrivals(response.data.newArrivals);
    } catch (err) {
      console.log("Error fetching new arrivals:", err);
    } finally {
      setLoadingNewArrivals(false);
    }
  }, []);

  // Function to delete a product by its ID
  const deleteProduct = useCallback(async (productId) => {
    try {
      setLoadingProducts(true);
      const response = await fetcher.delete(
        `/api/v1/products/deleteProduct/${productId}`
      );
      if (response.status === 200) {
        // Update products list by removing the deleted product
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      }
    } catch (err) {
      console.log("Error deleting product:", err);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  // Initial fetch for all products and populated products
  useEffect(() => {
    getProducts();
    getpopulatedProducts();
    getNewArrivals(); // Fetch new arrivals
  }, [getProducts]);

  // Separate effect for fetching a product by ID
  const someProductId = null; // Replace with your logic to get an ID
  useEffect(() => {
    if (someProductId) {
      getProductById(someProductId);
    }
  }, [getProductById]);

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
  };
}
