import { memo, useMemo, useState, useEffect } from "react";
import Pagination from "./Pagination";
import ExportButton from "./ExportButton";
import { Input } from "@/components/ui/input";
import { useCategories } from "../../../hooks/useCategories";
import CategoryTable from "./CategoryTable";

const CategoryPageWrapper = () => {
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const {
    categories,
    subCategories,
    loadingCategories,
    loadingSubCategories,
    error,
    fetchSubCategoriesForCategory,
  } = useCategories();

  useEffect(() => {
    let filtered = categories;

    if (searchQuery) {
      filtered = filtered.filter((category) =>
        category?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCategories(filtered);
  }, [searchQuery, categories]);

  const handlePageChange = (pageNumber) => {
    setLoading(true);
    setCurrentPage(pageNumber);

    // Simulate a 1-second loading delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCategories.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCategories, currentPage, itemsPerPage]);

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-4xl my-10">Manage Categories</h1>
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          className="w-full max-w-md"
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row gap-2">
          <ExportButton categories={filteredCategories} />
        </div>
      </div>

      {/* Table with Skeleton */}
      <div className="overflow-x-auto">
        <CategoryTable
          categories={paginatedCategories}
          subCategories={subCategories}
          loading={loading || loadingCategories || loadingSubCategories}
          fetchSubCategories={fetchSubCategoriesForCategory}
        />
      </div>

      <p className="my-4 bg-secondary text-center py-2">
        Total Categories:
        <span className="font-bold mx-1">{categories.length}</span>
      </p>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredCategories.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default memo(CategoryPageWrapper);
