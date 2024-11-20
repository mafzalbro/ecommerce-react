import { memo, useMemo } from "react";
import Filter from "../../components/layout/products/search-filter";
import FilterMobile from "../../components/layout/products/search-filter-mobile";
import { useSearchParams } from "react-router-dom";
import Products from "./products";

const ProductsWrapper = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Convert the searchParams into an object
  let params;
  if (Object.values(searchParams).every((value) => value === "")) {
    params = useMemo(
      () => Object.fromEntries(searchParams.entries()),
      [searchParams]
    );
  }

  // Memoize the params to avoid unnecessary re-renders
  const memoized = useMemo(() => params, [params]);

  // Update the search params whenever filters change
  const handleFilterChange = (newFilters) => {
    // Merge existing params with new filters
    let updatedParams;
    if (Object.values(newFilters).every((value) => value === "")) {
      updatedParams = { ...params };
    } else {
      updatedParams = { ...params, ...newFilters };
    }

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
    <div className="flex flex-col sm:flex-row my-4 mx-2">
      <div className="sm:w-1/4 hidden sm:inline-block">
        <Filter onFilterChange={handleFilterChange} />
      </div>
      <div className="sm:hidden">
        <FilterMobile onFilterChange={handleFilterChange} />
      </div>
      <div className="sm:w-3/4">
        <Products searchParams={memoized} />
      </div>
    </div>
  );
};

export default memo(ProductsWrapper);
