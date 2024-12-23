import React from "react";
import { Button } from "@/components/ui/button";

const ExportButton = ({ categories }) => {
  const handleExport = () => {
    const csvHeader = "ID,Name,Slug,Image\n";
    const csvRows = categories.map((category) => {
      return `${category._id},${category.name},${category.slug},${category.Image}`;
    });
    const csvData = csvHeader + csvRows.join("\n");

    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "categories.csv";
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
