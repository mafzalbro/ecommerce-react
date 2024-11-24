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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CustomersTable = ({ users, loading }) => (
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
            <TableCell className="text-center">
              {user.isActive ? "Yes" : "No"}
            </TableCell>
            <TableCell className="text-center">
              {user.verified ? "Yes" : "No"}
            </TableCell>
            <TableCell className="text-center">
              {user.addresses?.length > 0
                ? user.addresses.map((address, idx) => (
                    <div key={idx}>
                      {address.street}, {address.city} ({address.phone})
                    </div>
                  ))
                : "N/A"}
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

export default CustomersTable;
