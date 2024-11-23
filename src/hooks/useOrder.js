import { useState } from "react";
import fetcher from "@/utils/fetcher";

export const useOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleError = (err) => {
    console.error(err);
    setError(err.response?.data?.message || "Something went wrong");
  };

  const createOrder = async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetcher.post(
        "/restorex/orders/createOrder",
        orderData
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const getAllOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetcher.get("/restorex/orders/getAllOrders");
      console.log(response.data.orders);
      setOrders(response.data.orders);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const getOrderById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetcher.get(`/restorex/orders/getOrderById/${id}`);
      console.log(response.data.order);
      return response.data.order;
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetcher.put(`/restorex/orders/cancelOrder/${id}`);
      console.log(response.data);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
      return response.data;
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const getOrdersForSeller = async (sellerId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetcher.get(
        `/restorex/orders/getOrdersForSeller/${sellerId}`
      );
      console.log(response.data.orders);
      return response.data.orders;
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const getCustomersBySellerId = async (sellerId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetcher.get(
        `/restorex/orders/getCustomersBySellerId/${sellerId}`
      );
      console.log(response.data.customers);
      return response.data.customers;
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // const getAccessToken = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetcher.post("/restorex/orders/getAccessToken");
  //     console.log(response.data);
  //     return response.data;
  //   } catch (err) {
  //     handleError(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const processPayment = async (paymentData) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetcher.post("/restorex/orders/processPayment", paymentData);
  //     console.log(response.data);
  //     return response.data;
  //   } catch (err) {
  //     handleError(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const paymentWebhook = async (webhookData) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetcher.post("/restorex/orders/paymentWebhook", webhookData);
  //     console.log(response.data);
  //     return response.data;
  //   } catch (err) {
  //     handleError(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const paymentCallback = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetcher.get("/restorex/orders/paymentCallback");
  //     console.log(response.data);
  //     return response.data;
  //   } catch (err) {
  //     handleError(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const validatePayment = async (token) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetcher.get(`/restorex/orders/validatePayment/${token}`);
  //     console.log(response.data);
  //     return response.data;
  //   } catch (err) {
  //     handleError(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return {
    orders,
    loading,
    error,
    createOrder,
    getAllOrders,
    getOrderById,
    cancelOrder,
    getOrdersForSeller,
    getCustomersBySellerId,
    // getAccessToken,
    // processPayment,
    // paymentWebhook,
    // paymentCallback,
    // validatePayment,
  };
};
