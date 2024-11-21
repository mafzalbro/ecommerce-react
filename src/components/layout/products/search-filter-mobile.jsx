/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useSearchParams } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { FilterIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { MdOutlineClearAll } from "react-icons/md";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/useCategories";
import { Link } from "react-router-dom";

const FilterMobile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    searchParams.get("subCategory") || ""
  );

  const {
    categories,
    subCategories,
    loadingCategories,
    fetchSubCategoriesForCategory,
    errorCategories,
    loadingSubCategories,
    errorSubCategories,
  } = useCategories();

  useEffect(() => {
    if (selectedCategory) {
      fetchSubCategoriesForCategory(selectedCategory);
    }
  }, [selectedCategory, fetchSubCategoriesForCategory]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchParams((prevParams) => {
      if (e.target.value) {
        return { ...prevParams, searchTerm: e.target.value };
      } else {
        const { searchTerm, ...rest } = Object.fromEntries(
          prevParams.entries()
        );
        return rest;
      }
    });
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSearchParams((prevParams) => {
      return { ...prevParams, category: value };
    });
  };

  const handleSubCategoryChange = (value) => {
    setSelectedSubCategory(value);
    setSearchParams((prevParams) => {
      return { ...prevParams, subCategory: value };
    });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedSubCategory("");
    setSearchParams({});
  };

  return (
    <div className="filter flex justify-between items-center">
      <div className="flex items-center gap-2">
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
                          <Link
                            to={`/products?category=${subCategory.category}&subCategory=${subCategory._id}`}
                          >
                            {subCategory.name}
                          </Link>
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

export default FilterMobile;
