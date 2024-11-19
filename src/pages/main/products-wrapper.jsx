import { memo, useMemo } from "react";
import Filter from "../../components/layout/products/search-filter";
import { useSearchParams } from "react-router-dom";
import Products from "./products";

const ProductsWrapper = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Convert the searchParams into an object
  const params = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  // Memoize the params to avoid unnecessary re-renders
  const memoized = useMemo(() => params, [params]);

  // Update the search params whenever filters change
  const handleFilterChange = (newFilters) => {
    // Merge existing params with new filters
    const updatedParams = { ...params, ...newFilters };

    // Remove any parameters that are empty or falsy
    Object.keys(updatedParams).forEach((key) => {
      if (!updatedParams[key] && updatedParams[key] !== 0) {
        delete updatedParams[key];
      }
    });

    // Update the search params in the URL
    setSearchParams(updatedParams);
  };

  return (
    <div>
      <Filter onFilterChange={handleFilterChange} />{" "}
      {/* Render the filter component */}
      <Products searchParams={memoized} />
    </div>
  );
};

export default memo(ProductsWrapper);
