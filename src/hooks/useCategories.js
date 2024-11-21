import { useState, useEffect, useCallback } from "react";
import fetcher from "@/utils/fetcher";
import { setCache, getCache } from "@/utils/caching";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch categories with optional filters and caching
  const getCategories = useCallback(async () => {
    if (loadingCategories) return; // Skip if already loading categories
    setLoadingCategories(true);

    // Check if categories are in cache
    const cachedCategories = getCache("categories");
    if (cachedCategories) {
      setCategories(cachedCategories);
      setLoadingCategories(false); // No need to load again if cached
      return;
    }

    try {
      const response = await fetcher.get(
        "/restorex/categories/getAllCategories"
      );
      const fetchedCategories = response.data.getAllCategories;

      setCategories(fetchedCategories);
      setCache("categories", fetchedCategories); // Cache the fetched categories
    } catch (err) {
      setError("Error fetching categories");
      console.log(err);
    } finally {
      setLoadingCategories(false);
    }
  }, [loadingCategories]);

  // Function to fetch subcategories for a specific category with caching
  const getSubCategories = useCallback(
    async (categoryId) => {
      if (!categoryId || loadingSubCategories) return; // Skip if no categoryId or already loading
      setLoadingSubCategories(true);

      // Check if subcategories for this category are in cache
      const cachedSubCategories = getCache(`subcategories_${categoryId}`);
      if (cachedSubCategories) {
        setSubCategories(cachedSubCategories);
        setLoadingSubCategories(false); // No need to load again if cached
        return;
      }

      try {
        const response = await fetcher.get(
          `/restorex/categories/${categoryId}/subcategories/getAllSubCategories`
        );
        const fetchedSubCategories = response.data.getAllSubCategories;

        setSubCategories(fetchedSubCategories);
        setCache(`subcategories_${categoryId}`, fetchedSubCategories); // Cache the subcategories for the category
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
