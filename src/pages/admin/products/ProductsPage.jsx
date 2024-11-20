import { memo, useState, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "./Pagination";

// eslint-disable-next-line react/prop-types
const Products = ({ searchParams }) => {
  const { loadingProducts, products, totalResults, setLoadingProducts } =
    useProducts(searchParams);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleProducts, setVisibleProducts] = useState([]);

  const limit = 8; // Set your limit per page
  const totalPages = Math.ceil(totalResults / limit);

  // Fetch limited products based on the currentPage
  useEffect(() => {
    if (products?.length > 0) {
      // Simulate a small delay before showing products
      const timer = setTimeout(() => {
        const startIndex = (currentPage - 1) * limit;
        const endIndex = startIndex + limit;
        setVisibleProducts(products.slice(startIndex, endIndex)); // Show the slice based on the current page
        setLoadingProducts(false);
      }, 1000); // 1-second delay, you can adjust the time

      setLoadingProducts(true);
      // Clear the timer when the component is unmounted or products change
      return () => clearTimeout(timer);
    }
  }, [products, currentPage, setLoadingProducts]);

  // Display Skeleton while loading
  if (loadingProducts) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {[...Array(8)].map((_, index) => (
          <Skeleton key={index} className="h-10 w-full" />
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

  // Once products are loaded, show the actual table and Pagination component
  return (
    <div>
      {/* Shad Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>A list of products in your inventory.</TableCaption>
          <TableHeader>
            <TableRow>
              {/* <TableHead>ID</TableHead> */}
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Sub Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleProducts.map((product) => (
              <TableRow key={product.id}>
                {/* <TableCell>{product.id}</TableCell> */}
                <TableCell>{product.title}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product?.category?.name}</TableCell>
                <TableCell>{product?.subcategory?.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total Products</TableCell>
              <TableCell className="text-right">{totalResults}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
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
    </div>
  );
};

export default memo(Products);
