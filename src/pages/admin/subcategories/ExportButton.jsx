import React from "react";
import { Button } from "@/components/ui/button";

const ExportButton = ({ subCategories }) => {
  const handleExport = () => {
    const csvHeader = "ID,Name,Slug,Category,Created At,Updated At\n";
    const csvRows = subCategories.map((subCategory) => {
      return `${subCategory._id},${subCategory.name},${subCategory.slug},${subCategory.category},${subCategory.createdAt},${subCategory.updatedAt}`;
    });
    const csvData = csvHeader + csvRows.join("\n");

    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "subcategories.csv";
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
