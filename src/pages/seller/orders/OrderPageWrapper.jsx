import { memo, useMemo, useState, useEffect } from "react";
import Pagination from "./Pagination";
import { Input } from "@/components/ui/input";
import OrderTable from "./OrderTable";
import { useOrder } from "../../../hooks/useOrder";

const OrderPageWrapper = () => {
  const {
    getOrdersForSeller,
    loading,
    // totalResults,
    // deleteOrder,
    cancelOrder,
    createOrder,
  } = useOrder();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      const orders = await getOrdersForSeller();
      // console.log(orders);

      let filtered = orders || [];
      if (searchQuery) {
        filtered = filtered.filter((order) =>
          JSON.stringify(order.products)
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
      }
      setFilteredOrders(filtered);
    }
    fetchOrders();
  }, [searchQuery]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredOrders?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Handle order action results and show message
  const handleOrderAction = async (orderData) => {
    const response = await createOrder(orderData);
    if (response.status === "placed") {
      setMessage("Order created successfully. Complete payment to proceed.");
    } else if (response.status === "paymentSuccess") {
      setMessage(`Your payment for order ${response.message} was successful.`);
    } else if (response.status === "deliveredSuccess") {
      setMessage(
        `Your order ${response.message} has been successfully delivered.`
      );
    } else {
      setMessage(`Error: ${response.message}`);
    }
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-4xl my-10">Manage Orders</h1>
      <Input
        type="text"
        className="w-full max-w-md"
        placeholder="Search orders..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {message && <p className="text-green-500">{message}</p>}
      <div className="overflow-x-auto my-4">
        <OrderTable
          orders={paginatedOrders}
          loading={loading}
          cancelOrder={cancelOrder}
          handleOrderAction={handleOrderAction} // Pass action handler to table
        />
      </div>
      {filteredOrders?.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={filteredOrders?.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default memo(OrderPageWrapper);
