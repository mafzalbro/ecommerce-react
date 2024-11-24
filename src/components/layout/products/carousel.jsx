/* eslint-disable react/prop-types */
import ShortProductCard from "@/components/layout/products/short-card";

// eslint-disable-next-line react/prop-types
export default function ProductGrid({ products }) {
  // Limit the products to the first 8 items
  const displayedProducts = products.slice(0, 8);

  if (products.length !== 0)
    return (
      <div className="">
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-2">
          {displayedProducts.map((product) => (
            <ShortProductCard product={product} />
          ))}
        </div>
      </div>
    );
}
