import { useEffect } from "react";
import useOrder from "@/hooks/useOrder";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const OrdersPage = () => {
  const { order, loading, error, getOrders } = useOrder();

  // Fetch orders when the component mounts
  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle loading and error states
  if (loading) {
    return (
      <div className="flex justify-center items-center mt-8">
        <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
        <span className="ml-4 text-xl">Loading Orders...</span>
      </div>
    );
  }

  if (error) {
    toast.error(error); // Displaying error toast
    return (
      <div className="mt-8 flex justify-center items-center">
        <AlertCircle className="mr-2 h-6 w-6 text-red-600" />
        <span className="text-lg text-red-600">{error}</span>
      </div>
    );
  }

  console.log();
  
  return (
    <div className="container overflow-x-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">All Orders</h1>

      {/* Check if there are orders */}
      {order.length === 0 ? (
        <div className="text-center text-lg">No orders found.</div>
      ) : (
        <Table>
          <TableRow>
            <TableHead className="w-[120px]">Order ID</TableHead>
            <TableHead className="w-[200px]">Customer Name</TableHead>
            <TableHead className="w-[300px]">Shipping Address</TableHead>
            <TableHead className="w-[150px]">Payment Method</TableHead>
            <TableHead className="w-[150px]">Total Amount</TableHead>
            <TableHead className="w-[100px]">Paid</TableHead>
            <TableHead className="w-[100px]">Delivered</TableHead>
          </TableRow>
          <TableBody>
            {order.map((orderItem) => (
              <TableRow key={orderItem._id}>
                <TableCell>{orderItem._id}</TableCell>
                <TableCell>{orderItem.userId.name}</TableCell>
                <TableCell>
                  {orderItem.shippingAddress.street},{" "}
                  {orderItem.shippingAddress.city} -{" "}
                  {orderItem.shippingAddress.phone}
                </TableCell>
                <TableCell>{orderItem.paymentMethod}</TableCell>
                <TableCell>{orderItem.totalAmount}</TableCell>
                <TableCell>{orderItem.isPaid ? "Yes" : "No"}</TableCell>
                <TableCell>{orderItem.isDelivered ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Button for additional actions */}
      <div className="text-center mt-6">
        <Button variant="outline" onClick={() => getOrders()}>
          Refresh Orders
        </Button>
      </div>
    </div>
  );
};

export default OrdersPage;
