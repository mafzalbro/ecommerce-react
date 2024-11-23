import React, { useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useCategories } from "@/hooks/useCategories";

const CategorySelection = ({
  onCategoryChange,
  onSubCategoryChange,
  selectedSubCategory,
  selectedCategory,
}) => {
  const {
    categories,
    subCategories,
    loadingCategories,
    loadingSubCategories,
    fetchSubCategoriesForCategory,
  } = useCategories();

  const handleCategoryChange = (categoryId) => {
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
    if (categoryId) {
      fetchSubCategoriesForCategory(categoryId);
    }
  };

  const handleSubCategoryChange = (subCategoryId) => {
    if (onSubCategoryChange) {
      onSubCategoryChange(subCategoryId);
    }
  };

  return (
    <div>
      <div className="space-y-4">
        {/* Category Selection */}
        <div>
          <Label
            htmlFor="category-select"
            className="block text-sm font-medium"
          >
            Select Category
          </Label>
          <Select
            id="category-select"
            value={selectedCategory}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
              </SelectGroup>
              {loadingCategories ? (
                <SelectItem value="loading">Loading...</SelectItem>
              ) : (
                categories
                  ?.filter((category) => category !== "")
                  ?.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Subcategory Selection */}
        {subCategories.length > 0 && (
          <div>
            <Label
              htmlFor="subcategory-select"
              className="block text-sm font-medium"
            >
              Select Subcategory
            </Label>
            <Select
              id="subcategory-select"
              value={selectedSubCategory}
              onValueChange={handleSubCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Subcategory" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Subcategories</SelectLabel>
                </SelectGroup>
                {loadingSubCategories ? (
                  <SelectItem value="loading">Loading...</SelectItem>
                ) : (
                  subCategories
                    ?.filter((category) => category !== "")
                    ?.map((subCategory) => (
                      <SelectItem key={subCategory._id} value={subCategory._id}>
                        {subCategory.name}
                      </SelectItem>
                    ))
                )}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySelection;
