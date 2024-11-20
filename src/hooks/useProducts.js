import { useState, useEffect, useCallback } from "react";
import fetcher from "@/utils/fetcher";
import { toast } from "@/hooks/use-toast";

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

  const getProductById = useCallback(async (id) => {
    if (!id) return;
    setLoadingProductById(true);

    try {
      const response = await fetcher.get(
        `/api/v1/products/getProductsById/${id}`
      );
      setProductById(response.data.getProductsById);
      return response.data.getProductsById;
    } catch (err) {
      console.log("Error fetching product by ID:", err);
    } finally {
      setLoadingProductById(false);
    }
  }, []);

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
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === id ? response.data.updateProduct : product
          )
        );

        // Show success toast
        toast({
          title: "Success",
          description: "Product updated successfully!",
          variant: "success",
        });
      }

      return response;
    } catch (err) {
      console.error("Error updating product:", err);

      // Show error toast
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
    getpopulatedProducts();
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
