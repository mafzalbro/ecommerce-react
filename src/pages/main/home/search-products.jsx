import { useState, useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "use-debounce";
import SearchDropdown from "./search-dropdown";
import SearchInput from "./search-input";

const SearchProducts = () => {
  const [query, setQuery] = useState("");

  // Use use-debounce package to debounce the query
  const [debouncedQuery] = useDebounce(query, 500);

  // Memoize the search object to avoid unnecessary re-renders
  const searchParams = useMemo(
    () => ({ searchTerm: debouncedQuery }),
    [debouncedQuery]
  );

  // Fetch products based on debounced query
  const { loadingProducts, products } = useProducts(searchParams);

  // Memoize the filtered products
  const filterProducts = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    return products;
  }, [debouncedQuery, products]);

  return (
    <div className="relative">
      {/* Pass query and setQuery to the child component */}
      <SearchInput query={query} setQuery={setQuery} />

      {debouncedQuery && (
        <div className="absolute left-0 top-16 w-full shadow-lg z-50 mt-2 rounded-lg overflow-y-auto">
            {loadingProducts ? (
              // Show skeleton loader in place of dropdown content
              <Skeleton className="h-40 w-full" />
            ) : (
              // Show the dropdown if products are available
              filterProducts.length > 0 &&
              debouncedQuery !== "" && (
                <SearchDropdown products={filterProducts} />
              )
            )}
        </div>
      )}
    </div>
  );
};

export default SearchProducts;
