/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useDebounce } from "use-debounce";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineClearAll } from "react-icons/md";
import { useCategories } from "@/hooks/useCategories";

const Filter = () => {
  const [searchParams] = useState(new URLSearchParams(window.location.search));
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Debounced states for search and price
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [debouncedMinPrice] = useDebounce(minPrice, 500);
  const [debouncedMaxPrice] = useDebounce(maxPrice, 500);

  const navigate = useNavigate(); // Use navigate to push query params

  const {
    categories,
    subCategories,
    loadingCategories,
    loadingSubCategories,
    fetchSubCategoriesForCategory,
    errorCategories,
    errorSubCategories,
  } = useCategories();

  useEffect(() => {
    const categoryId = searchParams.get("category");
    const subCategoryId = searchParams.get("subCategory");

    if (categoryId && categories.length > 0) {
      const category = categories.find((cat) => cat._id === categoryId);
      if (category) setSelectedCategory(category._id);
    }

    if (subCategoryId && subCategories.length > 0) {
      const subCategory = subCategories.find(
        (sub) => sub._id === subCategoryId
      );
      if (subCategory) setSelectedSubCategory(subCategory._id);
    }
  }, [searchParams, categories, subCategories]);

  useEffect(() => {
    if (selectedCategory) {
      fetchSubCategoriesForCategory(selectedCategory);
    }
  }, [selectedCategory, fetchSubCategoriesForCategory]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedSubCategory(""); // Reset subcategory when category changes
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (name === "minPrice") {
      setMinPrice(value);
    } else if (name === "maxPrice") {
      setMaxPrice(value);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedSubCategory("");
    setMinPrice("");
    setMaxPrice("");
    // Reset URL parameters to default (without filters)
    navigate("/products");
  };

  // Function to update the URL query params
  const updateUrlParams = () => {
    const params = new URLSearchParams();

    if (debouncedSearchTerm) params.set("search", debouncedSearchTerm);
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedSubCategory) params.set("subCategory", selectedSubCategory);
    if (debouncedMinPrice) params.set("priceGte", debouncedMinPrice);
    if (debouncedMaxPrice) params.set("priceLte", debouncedMaxPrice);

    navigate(`/products?${params.toString()}`);
  };

  useEffect(() => {
    // Update the URL when filters change
    updateUrlParams();
  }, [
    debouncedSearchTerm,
    selectedCategory,
    selectedSubCategory,
    debouncedMinPrice,
    debouncedMaxPrice,
    navigate,
  ]);

  return (
    <div className="filter flex flex-col p-4 md:p-6 border rounded-md shadow-md">
      {/* Clear Filters Button */}
      {window.location.search && (
        <div className="w-full text-right">
          <Button
            className="!my-0 !py-0 text-xs"
            variant="ghost"
            onClick={handleClearFilters}
          >
            <MdOutlineClearAll className="mr-2 inline" /> Clear Filters
          </Button>
        </div>
      )}

      {/* Search Input */}
      <div className="w-full">
        <Label htmlFor="search" className="block mb-2 text-sm font-medium">
          Search
        </Label>
        <Input
          id="search"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search products"
          className="w-full"
        />
      </div>

      {/* Price Range Inputs */}
      <Label className="block mb-2 text-sm font-medium">Price Range</Label>
      <div className="w-full flex gap-2 items-center justify-center">
        <input
          id="minPrice"
          name="minPrice"
          type="number"
          value={minPrice}
          onChange={handlePriceChange}
          placeholder="Min Price"
          className="w-full bg-transparent p-1 rounded-md text-sm"
        />
        <input
          id="maxPrice"
          name="maxPrice"
          type="number"
          value={maxPrice}
          onChange={handlePriceChange}
          placeholder="Max Price"
          className="w-full bg-transparent p-1 rounded-md text-sm"
        />
      </div>

      {/* Category Select */}
      <div className="w-full">
        <Label htmlFor="category" className="block mb-2 text-sm font-medium">
          Category
        </Label>
        <Select
          value={selectedCategory}
          onValueChange={handleCategoryChange}
          disabled={loadingCategories || errorCategories}
        >
          <SelectTrigger id="category" className="w-full">
            <SelectValue
              placeholder={
                categories.find((cat) => cat._id === selectedCategory)?.name ||
                "Select Category"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {loadingCategories ? (
              <SelectItem>Loading...</SelectItem>
            ) : errorCategories ? (
              <SelectItem>Error loading categories</SelectItem>
            ) : (
              categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  <Link to={`/products?category=${category._id}`}>
                    {category.name}
                  </Link>
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Subcategory Buttons */}
      <div className="w-full">
        <Label className="block my-2 text-sm font-medium">Subcategory</Label>
        {loadingSubCategories ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : errorSubCategories ? (
          <p className="text-sm text-red-500">Error loading subcategories</p>
        ) : selectedCategory && subCategories.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {subCategories.map((subCategory) => (
              <div
                key={subCategory._id}
                className={`text-xs border rounded-lg py-1 px-3 cursor-pointer ${
                  selectedSubCategory === subCategory._id
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
                onClick={() => setSelectedSubCategory(subCategory._id)}
              >
                <Link
                  to={`/products?category=${subCategory.category}&subCategory=${subCategory._id}`}
                >
                  {subCategory.name}
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Select a category first</p>
        )}
      </div>
    </div>
  );
};

export default Filter;
