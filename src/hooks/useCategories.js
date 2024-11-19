import { useState, useEffect, useCallback } from "react";
import fetcher from "@/utils/fetcher";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const [error, setError] = useState(null);

  // Function to fetch categories with optional filters
  const getCategories = useCallback(async () => {
    if (loadingCategories) return; // Skip if already loading categories
    setLoadingCategories(true);
    try {
      const response = await fetcher.get(
        "/restorex/categories/getAllCategories"
      );

      setCategories(response.data.getAllCategories); // Always update categories
    } catch (err) {
      setError("Error fetching categories");
      console.log(err);
    } finally {
      setLoadingCategories(false);
    }
  }, [loadingCategories]);

  // Function to fetch subcategories for a specific category with optional filters
  const getSubCategories = useCallback(
    async (categoryId) => {
      if (!categoryId || loadingSubCategories) return; // Skip if no categoryId or already loading
      setLoadingSubCategories(true);
      try {
        const response = await fetcher.get(
          `/restorex/categories/${categoryId}/subcategories/getAllSubCategories`
        );

        setSubCategories(response.data.getAllSubCategories); // Always update subcategories
      } catch (err) {
        setError("Error fetching subcategories");
        console.log(err);
      } finally {
        setLoadingSubCategories(false);
      }
    },
    [loadingSubCategories]
  );

  // Fetch categories when the component mounts or queryParams change
  useEffect(() => {
    getCategories(); // Fetch categories
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch subcategories when the selected category changes
  useEffect(() => {
    if (selectedCategory) {
      getSubCategories(selectedCategory); // Fetch subcategories for the selected category
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  // Function to set selected category and trigger subcategory fetch
  const fetchSubCategoriesForCategory = (categoryId) => {
    if (categoryId !== selectedCategory) {
      setSelectedCategory(categoryId); // Update selected category
    }
  };

  return {
    categories,
    subCategories,
    loadingCategories,
    loadingSubCategories,
    error,
    fetchSubCategoriesForCategory,
  };
}
