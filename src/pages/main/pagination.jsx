/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button"; // Adjust your button import path
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page); // Update the currentPage state
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          variant={currentPage === i ? "solid" : "outline"}
          disabled={currentPage === i}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  return (
    <div className="flex justify-center space-x-2 mt-8">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <MdOutlineNavigateBefore />
      </Button>

      {renderPageNumbers()}

      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <MdOutlineNavigateNext />
      </Button>
    </div>
  );
};

export default Pagination;
