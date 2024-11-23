import { memo, useMemo, useState, useEffect } from "react";
import Pagination from "./Pagination";
import { Input } from "@/components/ui/input";
import OrderTable from "./OrderTable";
import { useOrder } from "../../../hooks/useOrder";

const OrderPageWrapper = () => {
  // , createOrder, getCustomersBySellerId, getOrdersForSeller, getOrderById
  const {
    getOrdersForSeller,
    loading,
    totalResults,
    deleteOrder,
    cancelOrder,
  } = useOrder();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    async function fetchOrders() {
      const orders = await getOrdersForSeller();
      let filtered = orders;
      if (searchQuery) {
        filtered = filtered.filter(
          (order) =>
            order.userId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.cartId?.toLowerCase().includes(searchQuery.toLowerCase())
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
      <div className="overflow-x-auto my-4">
        <OrderTable
          orders={paginatedOrders}
          loading={loading}
          deleteOrder={deleteOrder}
          cancelOrder={cancelOrder}
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
