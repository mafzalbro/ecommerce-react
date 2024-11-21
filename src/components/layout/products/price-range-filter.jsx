import React, { useState } from "react";

const PriceFilter = ({ onPriceFilterChange }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleMinPriceChange = (e) => setMinPrice(e.target.value);
  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);

  const handleApplyFilter = () => {
    const filters = {
      price: {
        gte: minPrice,
        lte: maxPrice,
      },
    };
    onPriceFilterChange(filters);
  };

  return (
    <div>
      <label>Min Price: </label>
      <input
        type="number"
        value={minPrice}
        onChange={handleMinPriceChange}
        placeholder="Min Price"
      />
      <br />
      <label>Max Price: </label>
      <input
        type="number"
        value={maxPrice}
        onChange={handleMaxPriceChange}
        placeholder="Max Price"
      />
      <br />
      <button onClick={handleApplyFilter}>Apply Filter</button>
    </div>
  );
};

export default PriceFilter;
