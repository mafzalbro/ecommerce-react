import { createContext, useState, useContext, useEffect } from "react";
import fetcher from "@/utils/fetcher";

const CartContext = createContext();

export const useCartContext = () => {
  return useContext(CartContext);
};

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ cartItem: [], totalPrice: 0, _id: "" });
  const [isProcessing, setIsProcessing] = useState(false);

  // Add item to cart
  const addCart = async (item) => {
    setIsProcessing(true);

    try {
      const cartData = {
        cartItem: [
          {
            productId: item._id,
            quantity: item.quantity || 1,
            price: item.price,
            totalProductDiscount: item.totalProductDiscount || 0,
          },
        ],
      };

      const newCart = { ...cart };
      const existingItemIndex = newCart.cartItem.findIndex(
        (cartItem) => cartItem.productId === item._id
      );

      if (existingItemIndex >= 0) {
        newCart.cartItem[existingItemIndex].quantity += item.quantity || 1;
      } else {
        newCart.cartItem.push({
          productId: item._id,
          quantity: item.quantity || 1,
          price: item.price,
          totalProductDiscount: item.totalProductDiscount || 0,
        });
      }

      // Recalculate totalPrice after adding item
      newCart.totalPrice = newCart.cartItem.reduce(
        (acc, curr) =>
          acc + (curr.price - curr.totalProductDiscount) * curr.quantity,
        0
      );

      const response = await fetcher.post(
        "/restorex/carts/addProductToCart",
        cartData
      );

      if (response?.data) {
        setCart(newCart);
        console.log("Item added to cart:", response.data);
        return newCart; // Return the updated cart on success
      } else {
        console.error("Failed to update cart on the server");
        throw new Error("Failed to add item to cart");
      }
    } catch (err) {
      console.error("Error adding item to cart:", err.message);
      throw err; // Throw error if something goes wrong
    } finally {
      setIsProcessing(false);
    }
  };

  // Remove item from cart
  const removeCart = async (id) => {
    setIsProcessing(true);
    try {
      const response = await fetcher.delete(
        `/restorex/carts/removeProductFromCart/${id}`
      );
      if (response?.data) {
        const newCart = { ...cart };
        newCart.cartItem = newCart.cartItem.filter(
          (item) => item.productId !== id
        );

        // Recalculate totalPrice after removing item
        newCart.totalPrice = newCart.cartItem.reduce(
          (acc, curr) =>
            acc + (curr.price - curr.totalProductDiscount) * curr.quantity,
          0
        );

        setCart(newCart);
        return true; // Return success if the item was removed
      } else {
        console.error("Failed to remove item from cart on the server");
        throw new Error("Failed to remove item from cart");
      }
    } catch (err) {
      console.error("Error removing item from cart:", err);
      throw err; // Throw error if something goes wrong
    } finally {
      setIsProcessing(false);
    }
  };
  const updateCartItemQuantity = async (item, quantity) => {
    setIsProcessing(true);
    try {
      // Make the API call to update the product quantity in the backend
      const response = await fetcher.put(
        `/restorex/carts/updateProductQuantity/${item.productId}`,
        { quantity }
      );

      if (response?.data) {
        // Update the cart state with the response data
        setCart(response?.data?.cart);
        console.log("Item quantity updated:", response.data);
        return response?.data?.cart;
      } else {
        console.error("Failed to update item quantity on the server");
        throw new Error("Failed to update item quantity");
      }
    } catch (err) {
      console.error("Error updating item quantity:", err);
      throw err; // Throw error if something goes wrong
    } finally {
      setIsProcessing(false); // Stop the loading state
    }
  };

  // Apply coupon to cart
  const applyCoupon = async (code) => {
    setIsProcessing(true);
    try {
      const response = await fetcher.post("/restorex/carts/apply-coupon", {
        code,
      });

      if (response?.data) {
        setCart(response.data.cart);
        console.log("Coupon applied:", response.data.cart);
        return response.data.cart; // Return updated cart with applied coupon
      } else {
        console.error("Failed to apply coupon");
        throw new Error("Failed to apply coupon");
      }
    } catch (err) {
      console.error("Error applying coupon:", err);
      throw new Error("No applying coupon"); // Throw error if something goes wrong
    } finally {
      setIsProcessing(false);
    }
  };

  // Fetch cart from backend and update local state
  const getCart = async () => {
    setIsProcessing(true);
    try {
      const response = await fetcher.get("/restorex/carts/getLoggedUserCart");
      if (response?.data?.cart) {
        console.log({ cart: response?.data?.cart });

        // Set the full cart including cartItem and top-level properties
        setCart(response.data.cart);
        return response.data.cart; // Return the full cart data
      } else {
        console.error("Failed to fetch cart data from the server");
        throw new Error("Failed to fetch cart data");
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      throw err; // Throw error if something goes wrong
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addCart,
        removeCart,
        getCart,
        applyCoupon,
        isProcessing,
        updateCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
