/* eslint-disable react/prop-types */
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import AddToCartButton from "../../../components/layout/products/AddToCartButton";
import { useProducts } from "../../../hooks/useProducts";
import { Skeleton } from "../../../components/ui/skeleton";
import { Link } from "react-router-dom";

function NewArrivalCard({ product }) {
  const { title, discription, imgCover, price, discount, rating } = product;

  const salePrice = price - (price * discount) / 100; // Apply discount to the price

  return (
    <Card className="w-full overflow-hidden bg-white dark:bg-primary-foreground shadow-md dark:shadow-lg border-gray-300 dark:border-gray-700">
      <div className="relative">
        <img
          src={imgCover}
          alt={title}
          width={384}
          height={200}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-red-500 text-white">
          {discount}% OFF
        </Badge>
      </div>
      <CardContent className="p-4">
        <Link
          to={`/products/${product._id}`}
          className="hover:text-blue-500 dark:hover:text-blue-300"
        >
          <h3 className="text-lg font-semibold mb-2 text-primary dark:text-primary">
            {title?.length < 30 ? title : title?.slice(0, 30) + "..."}

            {/* {title} */}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {discription}
        </p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-green-600">
              PKR {salePrice.toFixed(2)}
            </span>
            <span className="ml-2 text-sm line-through text-gray-500 dark:text-gray-400">
              PKR {price.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
        {/* Optional: You can add a time left functionality if relevant */}
        {/* <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Clock className="w-4 h-4 mr-1" />
          <span>Sale ends soon</span>
        </div> */}
        <AddToCartButton product={product} />
      </CardContent>
    </Card>
  );
}

export default function NewArrivalCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { newArrivals, loadingNewArrivals } = useProducts();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % newArrivals.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [newArrivals]);

  return (
    <div className="min-h-screen py-12 bg-white dark:bg-primary-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-primary dark:text-primary mb-8">
          New Arrivals
        </h2>
        <p className="text-xl text-center text-primary dark:text-primary mb-12">
          Check out our latest products!
        </p>
        {loadingNewArrivals ? (
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-4">
              <Skeleton className="h-96"></Skeleton>
              <Skeleton className="h-96"></Skeleton>
              <Skeleton className="h-96"></Skeleton>
            </div>
          </div>
        ) : (
          <Carousel
            className="w-full max-w-4xl mx-auto"
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
            opts={{
              align: "center",
              loop: true,
              perPage: 3,
            }}
          >
            <CarouselContent>
              {newArrivals.map((product, index) => (
                <CarouselItem
                  key={index}
                  className="sm:md:basis-1/2 md:basis-1/3"
                >
                  <div className="flex justify-center">
                    <NewArrivalCard product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </div>
  );
}
