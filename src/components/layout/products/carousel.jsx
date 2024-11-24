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
        <div className="flex flex-wrap justify-center gap-4 max-w-screen-xl mx-auto">
          {displayedProducts.map((product) => (
            <div key={product._id} className="w-1/2 sm:1/3 md:h-1/4 lg:w-1/5">
              <ShortProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    );
}
