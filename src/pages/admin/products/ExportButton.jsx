import React from "react";

const ExportButton = ({ products }) => {
  const handleExport = () => {
    const csvHeader = "ID,Title,Description,Price,Category\n";
    const csvRows = products.map((product) => {
      return `${product.id},${product.title},${product.description},${product.price},${product.category}`;
    });
    const csvData = csvHeader + csvRows.join("\n");

    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "products.csv";
    link.click();
  };

  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded-md"
      onClick={handleExport}
    >
      Export CSV
    </button>
  );
};

export default ExportButton;
