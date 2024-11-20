import { memo, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductPage from "./ProductsPage";
import Pagination from "./Pagination";
import ExportButton from "./ExportButton";
import Filter from "./SearchFilter";

const ProductPageWrapper = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Store the search query
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/products"); // Replace with actual API endpoint
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initially, set all products
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply search and filters
  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          className="px-4 py-2 border rounded-md"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ExportButton products={filteredProducts} /> {/* Export button */}
      </div>

      {/* Filters */}
      <Filter /> {/* Your filter component */}
      
      {/* Product List */}
      {paginatedProducts.map((product) => (
        <ProductPage key={product.id} product={product} />
      ))}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredProducts.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default memo(ProductPageWrapper);
