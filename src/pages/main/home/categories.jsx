"use client";

import { useCategories } from "../../../hooks/useCategories";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

export default function Categories() {
  const { categories, loadingCategories } = useCategories();

  if (loadingCategories) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Explore Categories
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
            perPage: 6,
          }}
          className="w-full max-w-5xl mx-auto relative"
        >
          <CarouselContent>
            {[...Array(5)].map((_, index) => (
              <CarouselItem
                key={index}
                className="basis-1/3 sm:md:basis-1/4 md:basis-1/6"
              >
                <div className="p-1">
                  <Card className="overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out relative group rounded-full">
                    <CardContent className="p-0">
                      <div className="relative w-full h-full aspect-square">
                        {/* Skeleton for the image */}
                        <Skeleton className="w-full h-full rounded-full" />
                        {/* Skeleton for the overlay */}
                        <div />
                        {/* Skeleton for the text */}
                        <h3>
                          <Skeleton className="w-1/2 h-6" />
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2",
              "shadow-[-8px_0_16px_rgba(0,0,0,0.2)]"
            )}
          />
          <CarouselNext
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2",
              "shadow-[8px_0_16px_rgba(0,0,0,0.2)]"
            )}
          />
        </Carousel>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8" id="categories">
        Explore Categories
      </h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
          perPage: 6, // Show 3 items at once
        }}
        className="w-full max-w-5xl mx-auto relative"
      >
        <CarouselContent>
          {categories.map((category) => (
            <CarouselItem
              key={category._id}
              className="basis-1/3 sm:md:basis-1/4 md:basis-1/6"
            >
              <div className="p-1">
                <Link to={`/products?category=${category._id}`}>
                  <Card className="overflow-hidden rounded-full cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out relative group">
                    <CardContent className="p-0">
                      <div className="relative w-full h-full aspect-square">
                        <img
                          src={category.Image}
                          alt={category.name}
                          className="object-cover w-full h-full rounded-full transition-all duration-300 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent opacity-80 group-hover:opacity-100 transition-all duration-300 ease-in-out" />
                        <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-base font-semibold text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex justify-center items-center text-center">
                          {category.name}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2",
            "shadow-[-8px_0_16px_rgba(0,0,0,0.2)]"
          )}
        />
        <CarouselNext
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2",
            "shadow-[8px_0_16px_rgba(0,0,0,0.2)]"
          )}
        />
      </Carousel>
    </div>
  );
}
