import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import ProductCarousel from "@/components/layout/products/carousel";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
// import HeroSection from "./hero";
import SaleOfferCard from "./arrivals";
import Categories from "./categories";
import AmazingHero from "./main-hero";
import TestimonialsCard from "./testimonials-contact";

const Home = () => {
  const { products, loadingProducts } = useProducts();
  return (
    <main>
      <AmazingHero />
      {/* <HeroSection /> */}
      <Categories />
      <SaleOfferCard />
      <div className="gap-4 mx-auto flex flex-col-reverse sm:flex-col">
        {!loadingProducts ? (
          <>
            <Link to={"/products"} className="flex justify-end mx-2">
              <Button variant={"ghost"} className="flex">
                See All <ArrowRightIcon />
              </Button>
            </Link>
            <ProductCarousel products={products} />
          </>
        ) : (
          <Spinner />
        )}
      </div>

      <TestimonialsCard />
    </main>
  );
};

export default Home;
