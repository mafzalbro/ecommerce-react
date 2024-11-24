import { memo, useState, useEffect } from "react";
import ProductCard from "../../components/layout/products/card";
import { useProducts } from "../../hooks/useProducts";
import { Skeleton } from "../../components/ui/skeleton";
import Pagination from "./pagination";
// import { Button } from "../../components/ui/button";

// eslint-disable-next-line react/prop-types
const Products = ({ searchParams }) => {
  const { loadingProducts, products, totalResults, setLoadingProducts } =
    useProducts(searchParams);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleProducts, setVisibleProducts] = useState([]);
  // const [showLoadMore, setShowLoadMore] = useState(true);
  // const [loadingMore, setLoadingMore] = useState(false);

  const limit = 8; // Set your limit per page
  const totalPages = Math.floor(
    (products.length > 8 ? totalResults : 7) / limit
  );

  // Handle loading more products with a delay
  // const loadMoreProducts = () => {
  //   setLoadingMore(true); // Show loading state
  //   setLoadingProducts(true); // Set the global loading state to true for fetching more products

  //   // Simulate a 1-second delay before adding more products
  //   setTimeout(() => {
  //     setCurrentPage((prev) => {
  //       const nextPage = prev + 1;
  //       if (nextPage <= totalPages) {
  //         setShowLoadMore(nextPage < totalPages); // Hide 'Load More' on last page
  //         return nextPage;
  //       }
  //       return prev;
  //     });
  //     setLoadingMore(false); // Hide loading state after the delay
  //     setLoadingProducts(false); // Reset the global loading state once data is loaded
  //   }, 1000); // 1-second delay
  // };

  // Fetch limited products based on the currentPage
  useEffect(() => {
    if (products?.length > 0) {
      // Simulate a small delay before showing products
      const timer = setTimeout(() => {
        const startIndex = (currentPage - 1) * limit;
        const endIndex = startIndex + limit;
        setVisibleProducts(products.slice(startIndex, endIndex)); // Show the slice based on the current page
        setLoadingProducts(false);
      }, 300); // 500ms delay, you can adjust the time

      setLoadingProducts(true);
      // Clear the timer when the component is unmounted or products change
      return () => clearTimeout(timer);
    }
  }, [products, currentPage, setLoadingProducts]);

  // Display Skeleton while loading
  // if (loadingProducts && !loadingMore) {
  if (loadingProducts) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-2">
        {[...Array(8)].map((_, index) => (
          <Skeleton key={index} className="h-80 w-full" />
        ))}
      </div>
    );
  }

  // If no products, display message
  if (products?.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center">
        No products available.
      </div>
    );
  }

  // Once products are loaded, show the actual cards and Load More button
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-2">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination Component */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          searchParams={searchParams}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Load More Button */}
      {/* {showLoadMore && (
        <div className="flex justify-center mt-4">
          <Button onClick={loadMoreProducts} className="px-4 py-2 rounded">
            Load More
          </Button>
        </div>
      )} */}
    </div>
  );
};

export default memo(Products);
