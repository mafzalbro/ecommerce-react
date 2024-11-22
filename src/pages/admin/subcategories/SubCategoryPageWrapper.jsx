import { memo, useMemo, useState, useEffect } from "react";
import Pagination from "./Pagination";
import ExportButton from "./ExportButton";
import { Input } from "@/components/ui/input";
import SubCategoryTable from "./SubCategoryTable";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCategories } from "../../../hooks/useCategories";

const SubCategoryPageWrapper = () => {
  const navigate = useNavigate();
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const { subCategories, loadingSubCategories, error, deleteSubCategoryById } =
    useCategories();

  useEffect(() => {
    let filtered = subCategories;

    if (searchQuery) {
      filtered = filtered.filter((subCategory) =>
        subCategory?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredSubCategories(filtered);
  }, [searchQuery, subCategories]);

  const handlePageChange = (pageNumber) => {
    setLoading(true);
    setCurrentPage(pageNumber);

    // Simulate a 1-second loading delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const paginatedSubCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSubCategories?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSubCategories, currentPage, itemsPerPage]);

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-4xl my-10">Manage Subcategories</h1>
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          className="w-full max-w-md"
          placeholder="Search subcategories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row gap-2">
          <ExportButton subCategories={filteredSubCategories} />
          <Button
            onClick={() => {
              navigate("/admin/subcategories/new");
            }}
          >
            Add New
          </Button>
        </div>
      </div>

      {/* Table with Skeleton */}
      <div className="overflow-x-auto">
        <SubCategoryTable
          subCategories={paginatedSubCategories}
          loading={loading || loadingSubCategories}
          deleteSubCategory={deleteSubCategoryById}
        />
      </div>

      <p className="my-4 bg-secondary text-center py-2">
        Total Subcategories:
        <span className="font-bold mx-1">{subCategories?.length}</span>
      </p>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredSubCategories?.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default memo(SubCategoryPageWrapper);
