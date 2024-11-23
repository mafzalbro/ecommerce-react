import React from "react";
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
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TrashIcon, EyeIcon, MoreHorizontalIcon, Edit2 } from "lucide-react"; // Import icons from lucide-react or other source
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProductTable = ({ products, loading, deleteProduct }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="text-center">Image</TableHead>
        <TableHead className="text-left">Title</TableHead>
        <TableHead className="text-right">Price</TableHead>
        <TableHead className="text-center">Category</TableHead>
        <TableHead className="text-center">Sub Category</TableHead>
        <TableHead className="text-center">Discount</TableHead>
        <TableHead className="text-center">Rating</TableHead>
        <TableHead className="text-center">Colors</TableHead>
        <TableHead className="text-center">Size</TableHead>
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
            <TableCell className="text-right">
              <Skeleton className="w-16 h-4" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-24 h-4" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-24 h-4" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-24 h-4" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-24 h-4" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-24 h-4" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-28 h-4" />
            </TableCell>
          </TableRow>
        ))
      ) : products?.length > 0 ? (
        products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <img src={product.imgCover} className="w-20 h-20 rounded-md" />
            </TableCell>
            <TableCell>{product.title}</TableCell>
            <TableCell className="text-right">PRK{product.price}</TableCell>
            <TableCell className="text-center">
              {product.category ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to={`/products?category=${product.category.slug}`}>
                        {product.category.name}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="p-2">
                      <div className="flex items-center space-x-2">
                        <img
                          src={product.category.Image}
                          alt={product.category.name}
                          className="w-10 h-10 rounded-md"
                        />
                        <div>
                          <p className="font-medium">{product.category.name}</p>
                          <p className="text-xs">{product.category.slug}</p>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                "N/A"
              )}
            </TableCell>
            <TableCell className="text-center">
              {product.subcategory ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={`/products?category=${product.category?._id}&subCategory=${product.subcategory._id}`}
                      >
                        {product.subcategory.name}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="p-2">
                      <div className="flex items-center space-x-2">
                        <div>
                          <p className="font-medium">
                            {product.subcategory.name}
                          </p>
                          <p className="text-xs">{product.subcategory.slug}</p>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                "N/A"
              )}
            </TableCell>
            <TableCell className="text-center">{product.discount}%</TableCell>
            <TableCell className="text-center">
              {product.ratingAvg} ({product.ratingCount} ratings)
            </TableCell>
            <TableCell className="text-center">
              {product.color.join(", ")}
            </TableCell>
            <TableCell className="text-center">
              {product.size.join(", ")}
            </TableCell>
            <TableCell className="text-center">
              <div className="flex justify-center items-center space-x-2">
                {/* Dropdown for More Options */}
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
                      <Link to={`/seller/products/${product._id}`}>
                        Edit Product
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <EyeIcon className="w-4 h-4 mr-2" />
                      <Link to={`/products/${product._id}`}>View Product</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        deleteProduct(product.id); // Action for deleting product
                      }}
                    >
                      <TrashIcon className="w-4 h-4 mr-2" />
                      Delete Product
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan="10" className="text-center">
            No products found.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
);

export default ProductTable;
