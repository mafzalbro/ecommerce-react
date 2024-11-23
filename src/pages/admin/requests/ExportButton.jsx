import React from "react";
import { Button } from "@/components/ui/button";

const ExportButton = ({ data, filename = "requests.csv" }) => {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No data available to export.");
      return;
    }

    // Derive column headers dynamically from the first object in the data
    const headers = Object.keys(data[0]);

    // Build CSV content
    const csvContent = [
      headers, // Headers as the first row
      ...data.map((item) =>
        headers.map((header) => {
          // Escape double quotes and commas in data fields
          const value = item[header] ?? ""; // Handle undefined or null fields
          return `"${String(value).replace(/"/g, '""')}"`;
        })
      ),
    ]
      .map((row) => row.join(",")) // Join columns with commas
      .join("\n"); // Join rows with newlines

    // Create a Blob for CSV and trigger download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url); // Cleanup
  };

  return <Button onClick={handleExport}>Export</Button>;
};

export default ExportButton;
