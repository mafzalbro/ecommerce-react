import React, { useEffect } from "react";
import { format } from "date-fns"; // Install date-fns for date formatting
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
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { TrashIcon, EyeIcon, Edit2, MoreHorizontalIcon } from "lucide-react";

const CategoryTable = ({
  categories,
  subCategories,
  loading,
  deleteCategory,
}) => {
  const navigate = useNavigate();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Image</TableHead>
          <TableHead className="text-left">Name</TableHead>
          <TableHead className="text-left">Slug</TableHead>
          <TableHead className="text-left">Subcategories</TableHead>
          <TableHead className="text-left">Created At</TableHead>
          <TableHead className="text-left">Updated At</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          // Render skeletons for loading state
          Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="w-20 h-20 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-32 h-4" />
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
        ) : categories?.length > 0 ? (
          categories.map((category) => (
            <TableRow key={category._id}>
              <TableCell>
                <img
                  src={category.Image || "/placeholder.png"}
                  alt={category.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </TableCell>
              <TableCell>{category.name || "N/A"}</TableCell>
              <TableCell>{category.slug || "N/A"}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {subCategories
                    ?.filter(
                      (subCategory) => subCategory.category === category._id
                    )
                    ?.map((subCategory) => (
                      <HoverCard key={subCategory._id}>
                        <HoverCardTrigger asChild>
                          <span className="border rounded-lg cursor-pointer py-1 px-4">
                            {subCategory.name}
                          </span>
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <div>
                            <p className="font-medium">{subCategory.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                              Slug: {subCategory.slug}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                              ID: {subCategory._id}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                              Created At:{" "}
                              {format(new Date(subCategory.createdAt), "PPP")}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                              Updated At:{" "}
                              {format(new Date(subCategory.updatedAt), "PPP")}
                            </p>
                            <Button
                              variant="outline"
                              onClick={() =>
                                navigate(
                                  `/admin/subcategories/${subCategory._id}`
                                )
                              }
                            >
                              Edit
                            </Button>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    )) || (
                    <span className="text-gray-500 text-sm">
                      No subcategories available
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {category.createdAt
                  ? format(new Date(category.createdAt), "PPP")
                  : "N/A"}
              </TableCell>
              <TableCell>
                {category.updatedAt
                  ? format(new Date(category.updatedAt), "PPP")
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
                        <Link to={`/admin/categories/${category._id}`}>
                          Edit Category
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <EyeIcon className="w-4 h-4 mr-2" />
                        <Link to={`/products?category=${category._id}`}>
                          View Category
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => deleteCategory(category._id)}
                      >
                        <TrashIcon className="w-4 h-4 mr-2" />
                        Delete Category
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan="7" className="text-center">
              No categories found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
