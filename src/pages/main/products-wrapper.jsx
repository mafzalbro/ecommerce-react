import { memo } from "react";
import Filter from "../../components/layout/products/search-filter";
import FilterMobile from "../../components/layout/products/search-filter-mobile";
import { useSearchParams } from "react-router-dom";
import Products from "./products";

const ProductsWrapper = () => {
  const [searchParams] = useSearchParams();

  // Directly use the searchParams from the URL
  const memoizedSearchParams = [...searchParams.entries()].reduce(
    (acc, [key, value]) => {
      if (value !== "") acc[key] = value;
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-col sm:flex-row my-4 mx-2 min-h-screen">
      <div className="sm:w-1/4 hidden sm:inline-block">
        <Filter />
      </div>
      <div className="sm:hidden">
        <FilterMobile />
      </div>
      <div className="sm:w-3/4">
        <Products searchParams={memoizedSearchParams} />
      </div>
    </div>
  );
};

export default memo(ProductsWrapper);
