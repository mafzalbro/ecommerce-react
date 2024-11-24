import { useEffect } from "react";
import { useOrder } from "@/hooks/useOrder";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "react-router-dom";
// import useAuth from "../../hooks/AuthProvider";

const OrdersPage = () => {
  const { orders, loading, error, getAllOrders } = useOrder();
  // const { role, user } = useAuth();

  // Fetch orders when the component mounts
  useEffect(() => {
    getAllOrders();
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
    return (
      <div className="mt-8 flex justify-center items-center">
        <AlertCircle className="mr-2 h-6 w-6 text-red-600" />
        <span className="text-lg text-red-600">{error}</span>
      </div>
    );
  }

  return (
    <div className="container overflow-x-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">All Orders</h1>

      {/* Check if there are orders */}
      {orders?.length === 0 ? (
        <div className="text-center text-lg">No orders found.</div>
      ) : (
        <Table>
          <TableRow>
            <TableHead className="w-[120px]">Order ID</TableHead>
            <TableHead className="w-[200px]">Customer Name</TableHead>
            <TableHead className="w-[200px]">Products</TableHead>
            <TableHead className="w-[300px]">Shipping Address</TableHead>
            <TableHead className="w-[150px]">Payment Method</TableHead>
            <TableHead className="w-[150px]">Total Amount</TableHead>
            <TableHead className="w-[100px]">Paid</TableHead>
            <TableHead className="w-[100px]">Delivered</TableHead>
            {/* {role !== "seller" && (
              <TableHead className="w-[100px]">Confirm Order</TableHead>
            )} */}
          </TableRow>
          <TableBody>
            {orders?.map((orderItem) => (
              <TableRow key={orderItem._id}>
                <TableCell>{orderItem._id}</TableCell>
                <TableCell>{orderItem.userId.name}</TableCell>
                <TableCell>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="link">View Products</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        {orderItem.products.map((product) => (
                          <div
                            key={product.productId}
                            className="flex justify-between space-x-4"
                          >
                            <div className="space-y-1">
                              <h4 className="text-sm font-semibold">
                                Product ID:{" "}
                                <Link to={`/products/${product.productId}`}>
                                  {product.productId}
                                </Link>
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                Price: PKR{product.price}
                              </p>
                              <p className="text-xs">
                                Quantity: {product.quantity}
                              </p>
                              {product.title && (
                                <p className="text-xs">
                                  Title: {product.title}
                                </p>
                              )}
                              {product.color && (
                                <p className="text-xs">
                                  Color: {product.color}
                                </p>
                              )}
                              {product.size && (
                                <p className="text-xs">Size: {product.size}</p>
                              )}
                              {product.totalProductDiscount && (
                                <p className="text-xs">
                                  Discount: PKR {product.totalProductDiscount}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </TableCell>
                <TableCell>
                  {orderItem.shippingAddress.street},{" "}
                  {orderItem.shippingAddress.address},{" "}
                  {orderItem.shippingAddress.city} -{" "}
                  {orderItem.shippingAddress.phone}
                </TableCell>
                <TableCell>{orderItem.paymentMethod}</TableCell>
                <TableCell>{orderItem.totalAmount}</TableCell>
                <TableCell>{orderItem.isPaid ? "Yes" : "No"}</TableCell>
                <TableCell>{orderItem.isDelivered ? "Yes" : "No"}</TableCell>
                {/* {!orderItem.isDelivered &&
                  orderItem.isPaid &&
                  role !== "seller" && (
                    <TableCell>
                      {
                        <Button
                          onClick={() => {
                            createOrder({
                              delivered: "success",
                              orderId: orderItem._id,
                              userId: user._id,
                            });
                          }}
                        >
                          Comfirm Delivered
                        </Button>
                      }
                    </TableCell>
                  )} */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Button for additional actions */}
      <div className="text-center mt-6">
        <Button variant="outline" onClick={() => getAllOrders()}>
          Refresh Orders
        </Button>
      </div>
    </div>
  );
};

export default OrdersPage;
