import { useState, useEffect, useCallback } from "react";
import fetcher from "@/utils/fetcher";
import { setCache, getCache, removeCache } from "@/utils/caching"; // Ensure removeCache is implemented

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);

  // Fetch all categories with optional caching
  const getCategories = useCallback(async () => {
    if (loadingCategories) return;
    setLoadingCategories(true);

    // const cachedCategories = getCache("categories");
    // if (cachedCategories) {
    //   setCategories(cachedCategories);
    //   setLoadingCategories(false);
    //   return cachedCategories;
    // }

    try {
      const response = await fetcher.get(
        "/restorex/categories/getAllCategories"
      );
      const fetchedCategories = response.data.getAllCategories;

      setCategories(fetchedCategories);
      setCache("categories", fetchedCategories);
      return fetchedCategories;
    } catch (err) {
      setError("Error fetching categories");
      console.log(err);
    } finally {
      setLoadingCategories(false);
    }
  }, [loadingCategories]);

  // Fetch subcategories for a specific category with caching
  const getSubCategories = useCallback(
    async (categoryId) => {
      if (!categoryId || loadingSubCategories) return;
      setLoadingSubCategories(true);

      const cachedSubCategories = getCache(`subcategories_${categoryId}`);
      if (cachedSubCategories) {
        setSubCategories(cachedSubCategories);
        setLoadingSubCategories(false);
        return;
      }

      try {
        const response = await fetcher.get(
          `/restorex/categories/${categoryId}/subcategories/getAllSubCategories`
        );
        const fetchedSubCategories = response.data.getAllSubCategories;

        setSubCategories(fetchedSubCategories);
        setCache(`subcategories_${categoryId}`, fetchedSubCategories);
      } catch (err) {
        setError("Error fetching subcategories");
        console.log(err);
      } finally {
        setLoadingSubCategories(false);
      }
    },
    [loadingSubCategories]
  );

  // Add a new category
  const addCategory = useCallback(
    async (categoryData) => {
      try {
        const response = await fetcher.post(
          "/restorex/categories/addCategory",
          categoryData
        );
        const newCategory = response.data.addcategory;

        // Invalidate the cache and fetch categories again
        removeCache("/restorex/subcategories/getAllSubCategories");
        await getCategories();

        return newCategory;
      } catch (err) {
        setError("Error adding category");
        console.log(err);
        throw err;
      }
    },
    [getCategories]
  );

  // Fetch a single category by ID
  const getCategoryById = useCallback(async (categoryId) => {
    if (!categoryId) {
      setError("Category ID is required");
      return;
    }

    try {
      const cachedCategory = getCache(`category_${categoryId}`);
      if (cachedCategory) {
        return cachedCategory;
      }

      const response = await fetcher.get(
        `/restorex/categories/getCategory/${categoryId}`
      );
      const category = response.data.category;

      // Cache the result
      setCache(`category_${categoryId}`, category);

      return category;
    } catch (err) {
      setError("Error fetching category");
      console.log(err);
      throw err;
    }
  }, []);

  // Update an existing category
  const updateCategory = useCallback(
    async (categoryId, updatedData) => {
      try {
        const response = await fetcher.put(
          `/restorex/categories/updateCategory/${categoryId}`,
          updatedData
        );
        const updatedCategory = response.data.updateCategory;

        // Invalidate the cache and fetch categories again
        removeCache("categories");
        await getCategories();

        return updatedCategory;
      } catch (err) {
        setError("Error updating category");
        console.log(err);
        throw err;
      }
    },
    [getCategories]
  );

  // Delete a category
  const deleteCategory = useCallback(
    async (categoryId) => {
      try {
        await fetcher.delete(
          `/restorex/categories/deleteCategory/${categoryId}`
        );

        // Invalidate the cache and fetch categories again
        removeCache("categories");
        await getCategories();
      } catch (err) {
        setError("Error deleting category");
        console.log(err);
        throw err;
      }
    },
    [getCategories]
  );
  const getAllSubCategories = useCallback(async () => {

    setLoadingSubCategories(true);
    const subCategoriesKey = `/restorex/subcategories/getAllSubCategories`;
    const cachedSubCategory = getCache(subCategoriesKey);
    if (cachedSubCategory) {
      setSubCategories(cachedSubCategory)
      setLoadingSubCategories(false);
      return cachedSubCategory;
    }

    try {
      const response = await fetcher.get(subCategoriesKey);
      const allSubCategories = response.data.getAllSubCategories;

      // Cache the allSubCategories
      setCache(subCategoriesKey, allSubCategories);

      setSubCategories(allSubCategories);
    } catch (err) {
      setError("Error fetching all subcategories");
      console.log(err);
    } finally {
      setLoadingSubCategories(false);
    }
  }, []);

  // Add a new category
  const addSubCategory = useCallback(
    async (categoryData) => {
      try {
        const response = await fetcher.post(
          "/restorex/subcategories/addSubCategory",
          categoryData
        );
        const newCategory = response.data.addSubcategory;

        // Invalidate the cache and fetch categories again
        removeCache(`/restorex/subcategories/getAllSubCategories`);
        await getAllSubCategories();

        return newCategory;
      } catch (err) {
        setError("Error adding category");
        console.log(err);
        throw err;
      }
    },
    [getAllSubCategories]
  );
  // Fetch subcategory by ID
  const getSubCategoryById = useCallback(async (subCategoryId) => {
    if (!subCategoryId) {
      setError("SubCategory ID is required");
      return;
    }

    try {
      const cachedSubCategory = getCache(`subcategory_${subCategoryId}`);
      if (cachedSubCategory) {
        return cachedSubCategory;
      }

      const response = await fetcher.get(
        `/restorex/subcategories/getSubCategory/${subCategoryId}`
      );
      const subCategory = response.data.subCategory;

      // Cache the result
      setCache(`subcategory_${subCategoryId}`, subCategory);

      return subCategory;
    } catch (err) {
      setError("Error fetching subcategory");
      console.log(err);
      throw err;
    }
  }, []);

  // Update subcategory by ID
  const updateSubCategoryById = useCallback(
    async (subCategoryId, updatedData) => {
      try {
        const response = await fetcher.put(
          `/restorex/subcategories/updateSubCategory/${subCategoryId}`,
          updatedData
        );
        const updatedSubCategory = response.data.updateSubCategory;

        // Invalidate the cache
        removeCache(`/restorex/subcategories/getAllSubCategories`);
        await getAllSubCategories();

        return updatedSubCategory;
      } catch (err) {
        setError("Error updating subcategory");
        console.log(err);
        throw err;
      }
    },
    []
  );

  // Delete subcategory by ID
  const deleteSubCategoryById = useCallback(async (subCategoryId) => {
    try {
      await fetcher.delete(
        `/restorex/subcategories/deleteSubCategory/${subCategoryId}`
      );

      // Invalidate the cache
      removeCache(`/restorex/subcategories/getAllSubCategories`);
      await getAllSubCategories(); // Refresh subcategories
    } catch (err) {
      setError("Error deleting subcategory");
      console.log(err);
      throw err;
    }
  }, []);

  // Fetch categories on component mount
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    getAllSubCategories();
  }, [getAllSubCategories]);

  // Fetch subcategories when selected category changes
  useEffect(() => {
    if (selectedCategory) {
      getSubCategories(selectedCategory);
    }
  }, [selectedCategory, getSubCategories]);

  return {
    categories,
    subCategories,
    loadingCategories,
    loadingSubCategories,
    error,
    getCategories,
    getSubCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    fetchSubCategoriesForCategory: setSelectedCategory,
    getCategoryById,
    getAllSubCategories,
    subCategories,
    addSubCategory,
    getSubCategoryById,
    updateSubCategoryById,
    deleteSubCategoryById,
  };
}
