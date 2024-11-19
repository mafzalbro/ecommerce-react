/* eslint-disable react/prop-types */
import {
  Command,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const SearchDropdown = ({ products }) => {
  return (
    <Command className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <CommandList className="max-h-72 overflow-y-auto">
        {products.length === 0 ? (
          <CommandEmpty className="p-4 text-center text-gray-500 dark:text-gray-400">
            No products found.
          </CommandEmpty>
        ) : (
          <>
            {products.map((product) => (
              <Link to={`/products/${product.id}`} key={product.id}>
                <CommandItem
                  onSelect={() => {
                    // Handle product selection
                  }}
                  className="flex items-center p-4 transition-colors duration-150 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {/* Product Image */}
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="h-10 w-10 rounded-lg object-cover"
                  />

                  {/* Product Details */}
                  <div className="flex-1 ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {product.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {product?.category?.name}
                    </p>
                  </div>

                  {/* Price Badge */}
                  <Badge
                    variant="outline"
                    className="ml-2 bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-800 dark:text-indigo-100 dark:border-indigo-700"
                  >
                    <span className="text-xs font-semibold">
                      PKR {product.price?.toFixed(2)}
                    </span>
                  </Badge>
                </CommandItem>
              </Link>
            ))}
          </>
        )}
      </CommandList>
    </Command>
  );
};

export default SearchDropdown;
