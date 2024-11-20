import { useState, useEffect } from "react";
import fetcher from "@/utils/fetcher";

const useOrder = () => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch orders when the component mounts (or when the order state is empty)
  useEffect(() => {
    if (order.length === 0) {
      getOrders();
    }
  }, [order.length]); // This ensures the request happens only if the order is empty

  const createOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetcher.post("/restorex/orders/createOrder");
      console.log(response.data.orderItem);
      setOrder(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetcher.get("/restorex/orders/getAllOrders");
      console.log(response.data.orders);
      setOrder(response.data.orders); // Assuming getAllOrders is an array
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetcher.delete(
        `/restorex/orders/deleteOrder/${id}`
      );
      console.log(response.data);
      setOrder((prevOrders) => prevOrders.filter((order) => order._id !== id));
      return response.data;
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const updateOrder = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetcher.put(
        `/restorex/orders/updateOrder/${id}`,
        data
      );
      console.log(response.data);
      setOrder((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, ...data } : order
        )
      );
      return response.data;
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    order,
    loading,
    error,
    createOrders,
    getOrders,
    deleteOrder,
    updateOrder,
  };
};

export default useOrder;
