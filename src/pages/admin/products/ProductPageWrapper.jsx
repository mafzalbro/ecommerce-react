import { memo, useMemo, useState, useEffect } from "react";
import Pagination from "./Pagination";
import ExportButton from "./ExportButton";
import { Input } from "@/components/ui/input";
import { useProducts } from "../../../hooks/useProducts";
import ProductTable from "./ProductsTable";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ProductPageWrapper = () => {
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const { products, loadingProducts, totalResults, deleteProduct } =
    useProducts();

  useEffect(() => {
    let filtered = products;
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product?.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handlePageChange = (pageNumber) => {
    setLoading(true);
    setCurrentPage(pageNumber);

    // Simulate a 1-second loading delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-4xl my-10">Manage Products</h1>
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          className="w-full max-w-md"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row gap-2">
          <ExportButton products={filteredProducts} />
          <Button
            onClick={() => {
              navigate("/admin/products/new");
            }}
          >
            Add New
          </Button>
        </div>
      </div>

      {/* Table with Skeleton */}
      <div className="overflow-x-auto">
        <ProductTable
          products={paginatedProducts}
          deleteProduct={deleteProduct}
          loading={loading || loadingProducts}
        />
      </div>

      <p className="my-4 bg-secondary text-center py-2">
        Total Products:
        <span className="font-bold mx-1">{totalResults}</span>
      </p>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredProducts?.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default memo(ProductPageWrapper);
