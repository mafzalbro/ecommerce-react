import { createContext, useState, useContext, useEffect } from "react";
import fetcher from "@/utils/fetcher";

const CartContext = createContext();

export const useCartContext = () => {
  return useContext(CartContext);
};

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Initialize cart state from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    return savedCart;
  });

  const [isProcessing, setIsProcessing] = useState(false); // Add processing state

  // Sync cart with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  // Add item to cart
  const addCart = async (item) => {
    setIsProcessing(true); // Start processing
    try {
      // Create a new data structure for the backend
      const cartData = {
        cartItem: [
          {
            productId: item._id, // Use _id as productId
            quantity: item.quantity || 1, // Default quantity to 1 if not provided
            price: item.price, // Include the price of the item
            totalProductDiscount: item.totalProductDiscount || 0, // Default discount to 0
          },
        ],
      };

      // Update local state
      const newCart = [...cart];

      // Check if the item already exists in the cart
      const existingItemIndex = newCart.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItemIndex >= 0) {
        // If the item exists, update the quantity
        newCart[existingItemIndex].quantity += item.quantity || 1;
      } else {
        // If the item does not exist, add it to the cart
        newCart.push(item);
      }

      setCart(newCart); // Update the local cart state

      // Sync with the backend
      const response = await fetcher.post(
        "/restorex/carts/addProductToCart",
        cartData // Send the updated cartData structure
      );
      const data = response.data;
      console.log("Item added:", data);
    } catch (err) {
      console.error("Error adding item to cart:", err);
    } finally {
      setIsProcessing(false); // End processing
    }
  };

  // Remove item from cart
  const removeCart = async (id) => {
    setIsProcessing(true); // Start processing
    try {
      const updatedCart = cart.filter((item) => item._id !== id);
      setCart(updatedCart);

      // Sync with backend
      await fetcher.delete(`/restorex/carts/removeProductFromCart/${id}`);
      console.log("Item removed");
    } catch (err) {
      console.error("Error removing item from cart:", err);
    } finally {
      setIsProcessing(false); // End processing
    }
  };

  // Fetch cart from backend and update local state
  const getCart = async () => {
    setIsProcessing(true); // Start processing
    try {
      const response = await fetcher.get("/restorex/carts/getLoggedUserCart");
      const data = response.data.addtocart; // Assuming addtocart contains the cart items

      setCart(data); // Update cart state with backend data
      localStorage.setItem("cart", JSON.stringify(data)); // Save fetched data to localStorage
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setIsProcessing(false); // End processing
    }
  };

  // Update product quantity in the cart
const updateProductQuantity = async (item) => {
  setIsProcessing(true); // Start processing
  try {
    const updatedCartItem = {
      cartItem: [
        {
          productId: item._id, // Use _id as productId
          quantity: item.quantity, // Updated quantity
          price: item.price, // The updated price (if needed)
          totalProductDiscount: item.totalProductDiscount || 0, // Discount
        },
      ],
    };

    // Update local state (assuming you have logic to update quantity locally)
    const updatedCart = cart.map((cartItem) =>
      cartItem._id === item._id
        ? { ...cartItem, quantity: item.quantity }
        : cartItem
    );
    setCart(updatedCart);

    // Sync with backend
    const response = await fetcher.put(
      `/restorex/carts/updateProductQuantity/${item._id}`,
      updatedCartItem // Send updated cart item
    );
    const data = response.data;
    console.log("Item quantity updated:", data);
  } catch (err) {
    console.error("Error updating item quantity:", err);
  } finally {
    setIsProcessing(false); // End processing
  }
};


  return (
    <CartContext.Provider
      value={{ cart, addCart, removeCart, getCart, isProcessing,  }}
    >
      {children}
    </CartContext.Provider>
  );
};
