import { useState, useEffect, useCallback, useMemo } from "react";
import fetcher from "@/utils/fetcher";
import { setCache, getCache } from "@/utils/caching";
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

  // Memoize searchParams to prevent unnecessary re-renders
  const memoizedSearchParams = useMemo(() => searchParams, [searchParams]);

  const getProducts = useCallback(async () => {
    const user = JSON.parse(window.localStorage.getItem("user"));

    if (!user || user.user.role === "seller") return;

    setLoadingProducts(true);

    try {
      // Check if data exists in sessionStorage
      const cachedData = sessionStorage.getItem("getAllProductsCache");
      if (cachedData) {
        // console.log("Using cached products from sessionStorage");
        const parsedData = JSON.parse(cachedData);
        applyFilters(parsedData); // Apply filters to cached data
        return;
      }

      // If cache is not available, fetch from API
      const response = await fetcher.get("/api/v1/products/getAllProducts");
      const productData = response.data.getAllProducts;

      // Store products in sessionStorage
      sessionStorage.setItem(
        "getAllProductsCache",
        JSON.stringify(productData)
      );

      applyFilters(productData); // Apply filters to newly fetched data
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoadingProducts(false);
    }
  }, [memoizedSearchParams]);

  // Filter and search products from cache or fetched data
  const applyFilters = (productData) => {
    const { category, subCategory, searchTerm, priceGte, priceLte } =
      memoizedSearchParams || {};

    // Apply filters
    const filteredProducts = productData.filter((product) => {
      // Category filter

      if (category && product.category?._id !== category) return false;

      // Subcategory filter
      if (subCategory && product.subcategory?._id !== subCategory) return false;

      // Keyword search (title or description)
      if (
        searchTerm &&
        !(
          product?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product?.description?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ) {
        return false;
      }

      // Price range filter
      const price = product.price;
      if (priceGte && price < priceGte) return false;
      if (priceLte && price > priceLte) return false;

      return true; // Include the product if all conditions are met
    });

    // Update state with filtered products
    setProducts(filteredProducts);
    setTotalResults(filteredProducts.length);
  };

  // Function to add a new product
  const addProduct = useCallback(
    async (productData) => {
      try {
        const response = await fetcher.post(
          "/api/v1/products/addProduct",
          productData
        );

        if (response.status === 201) {
          const newProduct = response.data.product;

          // Update products list with the new product
          setProducts((prevProducts) => [newProduct, ...prevProducts]);

          sessionStorage.removeItem("getAllProductsCache");

          // Clear and update cache
          const cacheKey = "/api/v1/products/getAllProducts";
          setCache(cacheKey, {
            products: [newProduct, ...products],
            totalResults: totalResults + 1,
          });

          toast({
            title: "Success",
            description: "Product added successfully!",
            variant: "success",
          });

          return newProduct;
        }
      } catch (err) {
        console.error("Error adding product:", err);
        toast({
          title: "Error",
          description: "Failed to add the product. Please try again.",
          variant: "destructive",
        });
        throw err;
      }
    },
    [products, totalResults]
  );

  // Fetch populated (heavy) products with cache
  const getPopulatedProducts = useCallback(async () => {
    setLoadingHeavyProducts(true);
    const cacheKey = "getProducts";
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      setHeavyProducts(cachedData);
      setLoadingHeavyProducts(false);
      return cachedData;
    } else {
      try {
        const response = await fetcher.get("/api/v1/products/getProducts");
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
      return cachedData;
    } else {
      try {
        const response = await fetcher.get(cacheKey);
        const product = response.data.getProductsById;
        setProductById(product);
        setCache(cacheKey, product);
        return product;
      } catch (err) {
        console.log("Error fetching product by ID:", err);
      } finally {
        setLoadingProductById(false);
      }
    }
  }, []);
  // Fetch new arrivals with sessionStorage caching
  const getNewArrivals = useCallback(async () => {
    setLoadingNewArrivals(true);

    const cacheKey = "newArrivalsCache"; // Key for sessionStorage

    // Check if data exists in sessionStorage
    const cachedData = sessionStorage.getItem(cacheKey);
    if (cachedData) {
      // console.log("Using cached new arrivals from sessionStorage");
      setNewArrivals(JSON.parse(cachedData)); // Parse and set the cached data
      setLoadingNewArrivals(false); // Loading is complete
      return;
    }

    // If no cache, fetch data from the API
    try {
      const response = await fetcher.get("/api/v1/products/newArrivals");
      const newArrivalsData = response.data.newArrivals;

      // Update state and cache
      setNewArrivals(newArrivalsData);
      sessionStorage.setItem(cacheKey, JSON.stringify(newArrivalsData)); // Store in sessionStorage
    } catch (err) {
      console.error("Error fetching new arrivals:", err);
    } finally {
      setLoadingNewArrivals(false); // Loading is complete
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
        removeCache(`/api/v1/products/deleteProduct/${productId}`);
      }

      sessionStorage.removeItem("getAllProductsCache");
      getProducts();
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

        getProducts();
        sessionStorage.removeItem("getAllProductsCache");

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

  // Fetch seller-specific products
  const getSellerProducts = useCallback(async () => {
    const user = JSON.parse(window.localStorage.getItem("user")); // Get user details from localStorage
    if (!user || user.user.role !== "seller") return; // Exit if user is not a seller

    setLoadingProducts(true);

    try {
      const response = await fetcher.get(`/api/v1/products/getSellerProducts`);
      const sellerProducts = response.data.products;

      // Cache the seller products locally (if required)
      const cacheKey = "getSellerProductsCache";
      sessionStorage.setItem(cacheKey, JSON.stringify(sellerProducts));

      // Update the state with seller's products
      setProducts(sellerProducts);
      setTotalResults(sellerProducts?.length);
    } catch (err) {
      console.error("Error fetching seller's products:", err);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  const updateSellerProduct = useCallback(async (id, updatedProduct) => {
    try {
      const response = await fetcher.put(
        `/api/v1/products/updateSellerProduct/${id}`,
        updatedProduct
      );

      if (response.status === 201) {
        const updatedData = response.data.updateProduct;

        // Update the product list with the updated product
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === id ? updatedData : product
          )
        );

        sessionStorage.removeItem("getAllProductsCache"); // Clear cache

        toast({
          title: "Success",
          description: "Seller product updated successfully!",
          variant: "success",
        });
      }
    } catch (err) {
      console.error("Error updating seller product:", err);
      toast({
        title: "Error",
        description: "Failed to update the product. Please try again.",
        variant: "destructive",
      });
      throw err;
    }
  }, []);

  const deleteSellerProduct = useCallback(async (productId) => {
    try {
      const response = await fetcher.delete(
        `/api/v1/products/deleteSellerProduct/${productId}`
      );

      if (response.status === 200) {
        // Remove the product from the local state
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );

        sessionStorage.removeItem("getAllProductsCache"); // Clear cache

        toast({
          title: "Success",
          description: "Seller product deleted successfully!",
          variant: "success",
        });
      }
    } catch (err) {
      console.error("Error deleting seller product:", err);
      toast({
        title: "Error",
        description: "Failed to delete the product. Please try again.",
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
    getNewArrivals();
  }, [getNewArrivals]);

  useEffect(() => {
    getSellerProducts();
  }, [getSellerProducts]);

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
    addProduct,
    getSellerProducts,
    updateSellerProduct,
    deleteSellerProduct,
  };
}
