import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Assuming this is using Shadcn UI
import { ShoppingBag, Package, Percent, Star, ArrowDown } from "lucide-react"; // Import scroll-down icon
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SearchProducts from "./search-products";
import { AiFillShopping } from "react-icons/ai";

const AmazingHero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900">
      {/* Backdrop blur layer */}
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <SearchProducts />
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="block">Shop Smarter, Live Better</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
            Your One-Stop Shop
          </span>
        </motion.h1>
        <motion.p
          className="mt-2 max-w-lg mx-auto text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover exclusive deals, top-rated products, and a seamless shopping
          experience. All you need, right at your fingertips.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link to={"/products"}>
            <Button
              size="lg"
              className="text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-5 bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white"
            >
              Start Shopping
              <ShoppingBag className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to={"/become-a-seller"}>
            <Button
              variant="outline"
              size="lg"
              className="text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-5 bg-white/10 text-white hover:bg-white/20 backdrop-blur-lg"
            >
              Become a Seller!
              <AiFillShopping className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-sm">
        {/* Parallax floating icons for added visual interest */}
        <motion.div
          className="absolute left-10 top-1/4 text-yellow-400"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <Star className="h-10 w-10" />
        </motion.div>
        <motion.div
          className="absolute right-10 top-1/3 text-green-400"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          <Package className="h-12 w-12" />
        </motion.div>
        <motion.div
          className="absolute left-1/4 bottom-16 text-pink-300"
          style={{ transform: `translateY(${scrollY * 0.25}px)` }}
        >
          <Percent className="h-8 w-8" />
        </motion.div>
      </div>
    </div>
  );
};

export default AmazingHero;
