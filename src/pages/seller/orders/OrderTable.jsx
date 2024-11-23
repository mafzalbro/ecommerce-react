import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { TrashIcon, Edit2 } from "lucide-react";

const OrderTable = ({ orders, loading, deleteOrder, cancelOrder }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>User ID</TableHead>
        <TableHead>Cart ID</TableHead>
        <TableHead>Total Amount</TableHead>
        <TableHead>Payment Method</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {loading
        ? Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="w-24 h-4" />
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
              <TableCell>
                <Skeleton className="w-24 h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-24 h-4" />
              </TableCell>
            </TableRow>
          ))
        : orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order.userId}</TableCell>
              <TableCell>{order.cartId}</TableCell>
              <TableCell>{order.totalAmount}</TableCell>
              <TableCell>{order.paymentMethod}</TableCell>
              <TableCell>
                {order.isPaid ? "Paid" : "Pending"} |{" "}
                {order.isDelivered ? "Delivered" : "Not Delivered"}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link to={`/orders/${order._id}`}>
                    <Button variant="outline" size="sm">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteOrder(order._id)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => cancelOrder(order._id)}
                  >
                    Cancel
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
    </TableBody>
  </Table>
);

export default OrderTable;
