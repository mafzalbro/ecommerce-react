/* eslint-disable react/prop-types */
// import { useState } from "react";
import // ShoppingCart,
//  Heart
"lucide-react";
// import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
// import { Badge } from "@/components/ui/badge";
import AddToCartButton from "./AddToCartButton";

function ProductCard({ product }) {
  // const [quantity, setQuantity] = useState(1);

  // const handleQuantityChange = (e) => {
  //   const value = parseInt(e.target.value);
  //   setQuantity(isNaN(value) || value < 1 ? 1 : value);
  // };

  return (
    <div className="max-w-full sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl overflow-hidden border rounded-lg p-4">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-600 dark:text-gray-300 mb-2 flex gap-2">
        {product?.category && (
          <Link
            to={`/products?category=${product?.category?._id}`}
            className="hover:text-blue-500"
          >
            {product.category.name}
          </Link>
        )}
        {product?.subcategory && (
          <>
            /
            <Link
              to={`/products?category=${product?.category?._id}&subCategory=${product.subcategory?._id}`}
              className="hover:text-blue-500"
            >
              {product.subcategory?.name}
            </Link>
          </>
        )}
      </div>

      <div className="relative">
        <img
          src={product?.imgCover}
          alt={product.title}
          className="w-full h-48 object-cover rounded-md"
        />
        <span className="absolute top-3 right-3 px-2 py-1 text-sm bg-white text-black rounded-md">
          {product?.category?.name}
        </span>
      </div>

      <div className="p-4">
        <Link
          to={`/products/${product._id}`}
          className="hover:text-blue-500 dark:hover:text-blue-300"
        >
          <h3 className="text-xl font-bold">{product?.title}</h3>
        </Link>

        <p className="text-sm mt-2">{product?.description}</p>

        {/* Rating */}
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">
            {"★".repeat(Math.round(product?.rating))}
          </span>
          {product?.reviewCount ? (
            <span className="ml-2 text-sm">
              ({product?.reviewCount} reviews)
            </span>
          ) : (
            ""
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          {product.price && product.priceAfterDiscount ? (
            <div className="flex items-center">
              <span className="text-base font-bold text-red-500 line-through mr-2">
                PKR {product.price?.toFixed(2)}
              </span>
              <span className="text-base font-bold">
                PKR {product.priceAfterDiscount?.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-base  font-bold">
              PKR {product.price?.toFixed(2)}
            </span>
          )}
        </div>

        {/* Badge */}
        {/* We will skip availability check */}
        <div className="flex justify-between items-center mt-4">
          {/* Optional: Badge logic can be added if needed */}
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
