/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/useCategories";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useDebounce } from "use-debounce";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { FilterIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { Link, useSearchParams } from "react-router-dom";
import { MdOutlineClearAll } from "react-icons/md";

const Filter = ({ onFilterChange }) => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  // Debounced search term
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

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
      if (category) {
        setSelectedCategory(category._id);
      }
    }

    if (subCategoryId && subCategories.length > 0) {
      const subCategory = subCategories.find(
        (sub) => sub._id === subCategoryId
      );
      if (subCategory) {
        setSelectedSubCategory(subCategory._id);
      }
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
  };

  const handleSubCategoryChange = (value) => {
    setSelectedSubCategory(value);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedSubCategory("");
    onFilterChange({});
  };

  // Update filters when any change happens
  useMemo(() => {
    onFilterChange({
      searchTerm: debouncedSearchTerm,
      category: selectedCategory,
      subCategory: selectedSubCategory,
    });
  }, [
    debouncedSearchTerm,
    onFilterChange,
    selectedCategory,
    selectedSubCategory,
  ]);

  return (
    <div className="filter mx-10 flex justify-between items-center">
      <div className="flex flex-row sm:flex-col items-center gap-2">
        <Input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search products"
        />
      </div>

      <div className="flex items-center gap-2">
        {window.location.search ? (
          <Link to={"/products"}>
            <Button variant={"ghost"} onClick={handleClearFilters}>
              <MdOutlineClearAll /> clear{" "}
            </Button>
          </Link>
        ) : (
          ""
        )}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"secondary"}>
              <FilterIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-4 w-80">
            <div className="flex flex-col justify-center">
              {/* Category Select */}
              <div className="mb-4">
                <Label>Category: </Label>
                <Select
                  value={selectedCategory}
                  onValueChange={handleCategoryChange}
                  disabled={loadingCategories || errorCategories}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        categories.find((cat) => cat._id === selectedCategory)
                          ?.name || "Select Category"
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
                          {category.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Subcategory Select */}
              <div>
                <Label>Subcategory: </Label>
                <Select
                  value={selectedSubCategory}
                  onValueChange={handleSubCategoryChange}
                  disabled={loadingSubCategories || !selectedCategory}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        subCategories.find(
                          (sub) => sub._id === selectedSubCategory
                        )?.name || "Select Subcategory"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingSubCategories ? (
                      <SelectItem>Loading...</SelectItem>
                    ) : errorSubCategories ? (
                      <SelectItem>Error loading subcategories</SelectItem>
                    ) : (
                      subCategories.map((subCategory) => (
                        <SelectItem
                          key={subCategory._id}
                          value={subCategory._id}
                        >
                          {subCategory.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className="mt-4">
              <Button variant="secondary" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Filter;
