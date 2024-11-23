/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

function ShortProductCard({ product }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out bg-card w-[96vw] mx-auto sm:w-full sm:mx-0">
      <div className="relative">
        <img
          src={product?.imgCover}
          alt={product.title}
          className="w-full h-48 md:h-56 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-foreground hover:text-primary transition-colors duration-200 line-clamp-1">
          <Link to={`/products/${product._id}`}>{product?.title}</Link>
        </h3>

        {/* Price Section: Shows original and discounted price elegantly */}
        <div className="flex items-center mt-2">
          {product.price && product.priceAfterDiscount ? (
            <div className="flex items-baseline">
              <span className="text-xs font-medium text-muted-foreground line-through mr-2">
                PKR {product.price?.toFixed(2)}
              </span>
              <span className="text-sm font-bold text-foreground">
                PKR {product.priceAfterDiscount?.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-sm font-bold text-foreground">
              PKR {product.price?.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <div className="mt-4">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

export default ShortProductCard;
