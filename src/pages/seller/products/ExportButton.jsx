import React from "react";
import { Button } from "@/components/ui/button";

const ExportButton = ({ products }) => {
  const handleExport = () => {
    const csvHeader =
      "ID,CoverImage,Images,Title,Description,Price,Category,SubCategory\n";
    const csvRows = products.map((product) => {
      return `${product.id},${product.imgCover},${product.images},${product.title},${product.description},${product.price},${product.category.name},${product.subcategory.name}`;
    });
    const csvData = csvHeader + csvRows.join("\n");

    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "products.csv";
    link.click();
  };

  return (
    <Button
      variant="outline"
      className="px-4 py-2 rounded-md"
      onClick={handleExport}
    >
      Export CSV
    </Button>
  );
};

export default ExportButton;
