import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";

const SearchFilter = ({ categories, onFilterChange }) => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced search term
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    const categoryId = searchParams.get("category");

    if (categoryId && categories.length > 0) {
      const category = categories.find((cat) => cat._id === categoryId);
      if (category) {
        setSelectedCategory(category._id);
      }
    }
  }, [searchParams, categories]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  // Update filters when any change happens
  useMemo(() => {
    onFilterChange({
      searchTerm: debouncedSearchTerm,
    });
  }, [debouncedSearchTerm, selectedCategory, onFilterChange]);

  return (
    <div className="filter mx-10 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search categories"
        />
      </div>
    </div>
  );
};

export default SearchFilter;
