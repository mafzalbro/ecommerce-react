import { Input } from "@/components/ui/input";
import { AiOutlineClose } from "react-icons/ai";

const SearchInput = ({ query, setQuery }) => {
  return (
    <div className="relative my-8">
      <Input
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-6 rounded-full border !border-primary focus:ring focus:border-blue-500 placeholder-gray-400 text-base"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600 transition-colors"
        >
          <AiOutlineClose className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
