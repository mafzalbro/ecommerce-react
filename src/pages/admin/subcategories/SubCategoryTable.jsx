import React, { useEffect } from "react";
import { format } from "date-fns"; // For date formatting
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TrashIcon, EyeIcon, Edit2, MoreHorizontalIcon } from "lucide-react";

const SubCategoryTable = ({ subCategories, loading, deleteSubCategory }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Name</TableHead>
          <TableHead className="text-left">Slug</TableHead>
          <TableHead className="text-left">Category</TableHead>
          <TableHead className="text-left">Created At</TableHead>
          <TableHead className="text-left">Updated At</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="w-40 h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-40 h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-40 h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-24 h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-24 h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-24 h-4" />
              </TableCell>
            </TableRow>
          ))
        ) : subCategories?.length > 0 ? (
          subCategories.map((subCategory) => (
            <TableRow key={subCategory._id}>
              <TableCell>{subCategory.name || "N/A"}</TableCell>
              <TableCell>{subCategory.slug || "N/A"}</TableCell>
              <TableCell>
                <Link
                  to={`/admin/categories/${subCategory.category}`}
                  className="text-blue-500 hover:underline"
                >
                  Visit
                </Link>
              </TableCell>
              <TableCell>
                {subCategory.createdAt
                  ? format(new Date(subCategory.createdAt), "PPP")
                  : "N/A"}
              </TableCell>
              <TableCell>
                {subCategory.updatedAt
                  ? format(new Date(subCategory.updatedAt), "PPP")
                  : "N/A"}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center items-center space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="p-2">
                        <MoreHorizontalIcon className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit2 className="w-4 h-4 mr-2" />
                        <Link to={`/admin/subcategories/${subCategory._id}`}>
                          Edit Subcategory
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => deleteSubCategory(subCategory._id)}
                      >
                        <TrashIcon className="w-4 h-4 mr-2" />
                        Delete Subcategory
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan="6" className="text-center">
              No subcategories found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default SubCategoryTable;
