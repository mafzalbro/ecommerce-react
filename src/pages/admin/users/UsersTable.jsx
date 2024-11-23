import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Edit2, InfoIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserTable = ({ users, deleteUser, loading, deletingUserId }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="text-left">Avatar</TableHead>
        <TableHead className="text-left">Name</TableHead>
        <TableHead className="text-left">Email</TableHead>
        <TableHead className="text-center">Role</TableHead>
        {/* <TableHead className="text-center">Blocked</TableHead> */}
        <TableHead className="text-center">isActive</TableHead>
        <TableHead className="text-center">isVarified</TableHead>
        {/* <TableHead className="text-center">Wishlist</TableHead> */}
        <TableHead className="text-center">Addresses</TableHead>
        <TableHead className="text-center">Seller Info</TableHead>
        <TableHead className="text-center">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {loading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="w-32 h-4" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-40 h-4" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-20 h-4" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-10 h-4" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-16 h-4" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-24 h-4" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-24 h-4" />
            </TableCell>
          </TableRow>
        ))
      ) : users?.length > 0 ? (
        users.map((user) => (
          <TableRow key={user._id}>
            <TableCell>
              <Avatar className="w-14 h-14">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.name}`}
                  alt={user?.name}
                />
                <AvatarFallback>
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="text-center">{user.role}</TableCell>
            {/* <TableCell className="text-center">
              {user.blocked ? "Yes" : "No"}
            </TableCell> */}
            <TableCell className="text-center">
              {user.isActive ? "Yes" : "No"}
            </TableCell>
            <TableCell className="text-center">
              {user.verified ? "Yes" : "No"}
            </TableCell>
            {/* <TableCell className="text-center">
              {user.wishlist?.length || 0}
            </TableCell> */}
            <TableCell className="text-center">
              {user.addresses?.length > 0
                ? user.addresses.map((address, idx) => (
                    <div key={idx}>
                      {address.street}, {address.city} ({address.phone})
                    </div>
                  ))
                : "N/A"}
            </TableCell>
            <TableCell className="text-center">
              {user.sellerInfo ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2"
                        aria-label="View Seller Info"
                      >
                        <InfoIcon className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="p-2 max-w-md">
                      <div>
                        <p>
                          <strong>Business Name:</strong>{" "}
                          {user.sellerInfo.businessName}
                        </p>
                        <p>
                          <strong>Business Address:</strong>{" "}
                          {user.sellerInfo.businessAddress}
                        </p>
                        <p>
                          <strong>Tax ID:</strong>{" "}
                          {user.sellerInfo.taxIdNumber || "N/A"}
                        </p>
                        <p>
                          <strong>Bank Info:</strong> {user.sellerInfo.bankName}
                          , Account No: {user.sellerInfo.bankAccountNumber}
                        </p>
                        <p>
                          <strong>Documents:</strong>{" "}
                          {user.sellerInfo.documents?.idCardNumber || "N/A"}
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                "N/A"
              )}
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
                      <Link to={`/admin/users/${user._id}`}>Edit User</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      disabled={deletingUserId === user._id}
                      onClick={() => deleteUser(user._id)}
                    >
                      <TrashIcon className="w-4 h-4 mr-2" />

                      {deletingUserId === user._id ? "Deleting..." : "Delete"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan="8" className="text-center">
            No users found.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
);

export default UserTable;
