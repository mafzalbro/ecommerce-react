import { useState, useEffect } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useNavigate } from "react-router-dom";
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
import { useDebounce } from "use-debounce"; // Import useDebounce

const FilterMobile = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const {
    categories,
    subCategories,
    loadingCategories,
    fetchSubCategoriesForCategory,
    errorCategories,
    loadingSubCategories,
    errorSubCategories,
  } = useCategories();

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // Apply debounce on searchTerm

  useEffect(() => {
    if (selectedCategory) {
      fetchSubCategoriesForCategory(selectedCategory);
    }
  }, [selectedCategory, fetchSubCategoriesForCategory]);

  useEffect(() => {
    if (debouncedSearchTerm !== "") {
      const params = new URLSearchParams(window.location.search);
      params.set("searchTerm", debouncedSearchTerm);
      navigate(`/products?${params.toString()}`);
    } else {
      const params = new URLSearchParams(window.location.search);
      params.delete("searchTerm");
      navigate(`/products?${params.toString()}`);
    }
  }, [debouncedSearchTerm, navigate]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // This will trigger debounce effect
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedSubCategory(""); // Reset subcategory when category changes
    // Update the category parameter in the URL
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    navigate(`/products?${params.toString()}`);
  };

  const handleSubCategoryChange = (value) => {
    setSelectedSubCategory(value);
    // Update the subcategory parameter in the URL
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("subCategory", value);
    } else {
      params.delete("subCategory");
    }
    navigate(`/products?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedSubCategory("");
    // Reset all filters in the URL
    navigate("/products");
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

export default FilterMobile;
