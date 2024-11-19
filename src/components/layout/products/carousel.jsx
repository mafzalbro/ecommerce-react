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
        <div className="flex flex-wrap justify-center gap-4">
          {displayedProducts.map((product) => (
            <div key={product._id}>
              <ShortProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    );
}
