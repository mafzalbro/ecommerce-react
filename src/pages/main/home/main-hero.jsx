import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Assuming this is using Shadcn UI
import SearchProducts from "./search-products";
import { ShoppingBag, UserPlus } from "lucide-react";

const SimpleHero = () => {
  return (
    <div className="py-10 border-b">
      {/* Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content Section */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          {/* Left Section: Text */}
          <div className="text-center md:text-left">
            {/* Search Bar */}
            <div>
              <SearchProducts />
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Welcome to Our Shop
            </h1>
            <p className="mt-2">
              Browse thousands of products at the best prices. Shop with
              confidence and convenience.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  Shop Now
                  <ShoppingBag className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/become-a-seller">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Become a Seller
                  <UserPlus className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Section: Image */}
          <div className="w-full md:w-2/3">
            <img
              src="/hero.png"
              alt="Shop Hero"
              className="w-full rounded-md shadow-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleHero;
