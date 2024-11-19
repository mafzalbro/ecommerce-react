import { Input } from "@/components/ui/input";
import { AiOutlineClose } from "react-icons/ai";

// eslint-disable-next-line react/prop-types
const SearchInput = ({ query, setQuery }) => {
  return (
    <div className="relative w-full mx-auto mb-10">
      <Input
        placeholder="Search products..."
        value={query}
        autoFocus={true}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-12 py-8 text-white bg-gradient-to-r from-blue-500 to-indigo-00 rounded-full shadow-lg focus:ring-1 focus:ring-offset-1 focus:ring-indigo-300 transition-all duration-300 ease-in-out placeholder-gray-300 outline-none placeholder:text-white text-base"
      />

      {/* Clear Icon */}
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-700 rounded-full p-1 hover:bg-red-500 hover:scale-110 transition-transform duration-200 ease-in-out"
        >
          <AiOutlineClose className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
