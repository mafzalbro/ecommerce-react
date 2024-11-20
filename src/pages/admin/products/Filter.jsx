import React from "react";

const Filter = ({ onFilterChange }) => {
  const handleCategoryChange = (e) => {
    onFilterChange({ category: e.target.value });
  };

  const handlePriceRangeChange = (e) => {
    onFilterChange({ priceRange: e.target.value });
  };

  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <div>
        <label className="block text-gray-700">Category:</label>
        <select
          className="w-full px-4 py-2 border rounded-md"
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          {/* Add more categories here */}
        </select>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="block text-gray-700">Price Range:</label>
        <select
          className="w-full px-4 py-2 border rounded-md"
          onChange={handlePriceRangeChange}
        >
          <option value="">All Prices</option>
          <option value="0-50">0 - 50</option>
          <option value="51-100">51 - 100</option>
          <option value="101-200">101 - 200</option>
          {/* Add more ranges */}
        </select>
      </div>

      {/* Add more filters as needed */}
    </div>
  );
};

export default Filter;
