/* eslint-disable react/prop-types */
import ShortProductCard from "@/components/layout/products/short-card";

// eslint-disable-next-line react/prop-types
export default function ProductGrid({ products }) {
  // Limit the products to the first 8 items
  const displayedProducts = products.slice(0, 10);

  if (products.length !== 0)
    return (
      <div className="">
        {/* First Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mx-2">
          {displayedProducts.map((product) => (
            <ShortProductCard product={product} />
          ))}
        </div>
      </div>
    );
}
