import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import DateDisplay from "@/components/layout/items/DateDisplay";
import { useProducts } from "../../hooks/useProducts";
import React, { useState } from "react";
import AddToCartButton from "../../components/layout/products/AddToCartButton";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const {
    getProductById,
    productById: product,
    loadingProductById,
  } = useProducts();

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(product?.size || ""); // Track selected size
  const [selectedColor, setSelectedColor] = useState(product?.color?.[0] || ""); // Track selected color

  // Fetch the product details using the provided productId
  React.useEffect(() => {
    getProductById(productId);
  }, [productId, getProductById]);

  console.log(product);

  if (loadingProductById) {
    return (
      <div className="p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-4">
            <Skeleton className="aspect-w-1 aspect-h-1 rounded-lg" />
            <Skeleton className=" h-80" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="aspect-square rounded-lg" />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-10" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-xl font-bold p-4 my-40">
        <div className="text-4xl font-semibold text-red-600">
          Product Not Found
        </div>
        <div className="text-gray-500">
          The product you&apos;re looking for does not exist.
        </div>
      </div>
    );
  }

  const handleSizeChange = (size) => {
    setSelectedSize(size); // Update selected size
  };

  const handleColorChange = (color) => {
    setSelectedColor(color); // Update selected color
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8">
        {/* Product Images Section */}
        <div className="flex flex-col space-y-4">
          {/* Main Product Image */}
          <Dialog>
            <DialogTrigger asChild>
              <div className="aspect-w-1 aspect-h-1 border-2 border-indigo-500 rounded-lg overflow-hidden shadow-lg cursor-pointer">
                <img
                  src={product?.imgCover}
                  // srcSet={"/placeholder.png"}
                  alt="Product Image"
                  className="object-cover w-full h-80"
                  onClick={() => setSelectedImage(product?.imgCover || null)}
                />
              </div>
            </DialogTrigger>
            <DialogContent className="p-4">
              <DialogHeader>
                <DialogTitle>Product Image</DialogTitle>
                <DialogDescription>
                  Click outside to close the image.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center items-center">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Full Product Image"
                    className="object-contain rounded-md "
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>

          <div className="text-gray-500">
            <DateDisplay dateString={product.createdAt} />
          </div>

          {/* Additional Product Images */}
          <div className="grid grid-cols-4 gap-2">
            {product?.images?.map((image, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <img
                    src={image}
                    alt={`Product Image Thumbnail ${index + 1}`}
                    className="aspect-square border-2 border-gray-300 rounded-lg overflow-hidden cursor-pointer transition transform hover:scale-105"
                    onClick={() => setSelectedImage(image)}
                  />
                </DialogTrigger>
                <DialogContent className="sm:max- sm:max-h-full p-0">
                  <DialogHeader>
                    <DialogTitle className="p-4">Product Image</DialogTitle>
                  </DialogHeader>
                  <div className=" h-full flex justify-center items-center">
                    {selectedImage && (
                      <img
                        src={selectedImage}
                        alt={`Full Product Image ${index + 1}`}
                        className="object-contain max- max-h-full"
                      />
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            {product.title}
          </h1>
          <h2 className="text-xl text-gray-600 dark:text-gray-300">
            {product?.subtitle}
          </h2>

          <div className="flex items-baseline space-x-4">
            <span className="text-3xl font-bold text-blue-600">
              PKR {product?.price}
            </span>
            {product?.quantity > 0 ? (
              <Badge className="bg-green-500 text-white rounded-full py-1 px-4">
                In Stock
              </Badge>
            ) : (
              <Badge variant="destructive" className="rounded-full py-1 px-4">
                Out of stock
              </Badge>
            )}
          </div>

          {/* Quantity, Sold, and Stock */}
          <div className="flex space-x-4 mt-4 text-gray-700 dark:text-gray-300">
            <div>
              <span className="font-semibold">Stock:</span> {product?.quantity}{" "}
              Pcs
            </div>
            <div>
              <span className="font-semibold">Sold:</span> {product?.sold || 0}{" "}
              Pcs
            </div>
          </div>

          {/* Sizes and Colors */}
          <div className="flex flex-wrap sm:flex-col gap-4 space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl text-gray-700 dark:text-gray-300">
                Size:
              </span>
              <div className="flex space-x-2">
                {product?.size?.map((size, index) => (
                  <button
                    key={index}
                    className={`px-3 py-1 border rounded-md ${
                      selectedSize === size ? "bg-blue-500 text-white" : ""
                    }`}
                    onClick={() => handleSizeChange(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl text-gray-700 dark:text-gray-300">
                Color:
              </span>
              <div className="flex space-x-2">
                {product?.color?.map((color, index) => (
                  <div key={index} className="flex flex-col items-center">
                    {/* Color button */}
                    <button
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color
                          ? "border-2 border-blue-500 dark:border-blue-300 ring-1 ring-black dark:ring-white"
                          : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange(color)}
                      aria-label={`Select color ${color}`} // Optional: for accessibility
                    ></button>
                    {/* Label for the color */}
                    <span className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      {color}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Description */}
          <p className="text-gray-700 dark:text-gray-300">
            {product?.description}
          </p>

          {/* Add to Cart Button */}
          <AddToCartButton
            product={product}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
          />
        </div>
      </div>

      {/* Product Reviews Section */}
      <div className="mt-8 space-y-6 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Reviews
        </h3>
        <div className="space-y-4">
          {product.reviews?.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className="border-b pb-4">
                <p className="font-semibold">{review.user}</p>
                <p className="text-gray-600 dark:text-gray-300">
                  {review.comment}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-500">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    ({review.rating}/5)
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No reviews yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
