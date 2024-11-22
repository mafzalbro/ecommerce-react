import { useEffect, useRef, useState } from "react";
import useAuth from "@/hooks/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "@/hooks/CartContext";
import { Button } from "@/components/ui/button";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Input } from "../../components/ui/input";
import { toast } from "../../hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import "./cart.css";

const CartPage = () => {
  const { isAuthenticated } = useAuth(); // Use authentication hook
  const {
    cart,
    removeCart,
    applyCoupon,
    isProcessing,
    updateCartItemQuantity,
  } = useCartContext(); // Use cart context
  const highlightedRef = useRef(null); // Ref for highlighted item
  const navigate = useNavigate(); // Hook for navigation
  const [couponCode, setCouponCode] = useState(""); // State for coupon code input
  const [isCouponApplied, setIsCouponApplied] = useState(false); // State to track if coupon is applied

  useEffect(() => {}, [cart]);

  // Calculate subtotal using the updated cart structure
  const subtotal = cart.cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Redirect after 5 seconds (useful for redirecting after an action like removing an item or applying a coupon)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/user/cart");
    }, 5000);

    return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount
  }, [navigate]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const matchedItem = cart.cartItem.find((item) => item.productId === hash);

      if (matchedItem) {
        highlightedRef.current = document.getElementById(
          `${matchedItem.productId}`
        );

        if (highlightedRef.current) {
          highlightedRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          highlightedRef.current.classList.add("vibrate");
          setTimeout(() => {
            highlightedRef.current.classList.remove("vibrate");
          }, 5000);
        }
      }
    }
  }, [cart.cartItem]);

  // Update product quantity handler
  const handleUpdateQuantity = (item, quantity) => {
    if (quantity <= 0) return; // Prevent negative or zero quantities
    updateCartItemQuantity(item, quantity);
  };

  // Remove item from cart after confirming deletion
  const handleRemoveItem = async (item) => {
    const success = await removeCart(item.productId);
    if (success) {
      toast({
        title: "Item Removed",
        description: `Item ${item.productId} was successfully removed from your cart.`,
        variant: "success",
      });
    } else {
      toast({
        title: "Error",
        description: `Failed to remove ${item.productId} from your cart.`,
        variant: "destructive",
      });
    }
  };

  // Handle apply coupon logic
  const handleApplyCoupon = async () => {
    if (couponCode.trim()) {
      try {
        await applyCoupon(couponCode);
        setIsCouponApplied(true);
        toast({
          title: "Coupon Applied",
          description: "Your coupon has been successfully applied.",
          variant: "success",
        });
      } catch (error) {
        console.error("Error applying coupon:", error);
        setIsCouponApplied(false);
        toast({
          title: "Error",
          description: "There was an issue applying the coupon.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="container max-w-screen-sm mx-auto p-6 sm:p-4">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-2xl">
        Shopping Cart
      </h1>
      {isAuthenticated ? (
        <div className="cart-content">
          {isProcessing && cart.cartItem.length === 0 ? (
            // Show Skeleton loader if loading
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : cart.cartItem.length > 0 ? (
            <>
              <ul className="space-y-4">
                {cart.cartItem.map((item) => (
                  <li
                    key={item.productId}
                    id={`${item.productId}`}
                    className="flex flex-col sm:flex-row items-center justify-between p-4 shadow-md rounded-lg border"
                  >
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                      <div>
                        <h2 className="text-xl font-semibold">{item.title}</h2>
                        <div className="flex gap-2 items-center flex-wrap">
                          <p className="text-sm text-gray-600 dark:text-gray-200">
                            PKR{" "}
                            {item.totalProductDiscount !== 0
                              ? item.price -
                                (item.price * item.totalProductDiscount) / 100
                              : item.price}
                          </p>

                          {item.totalProductDiscount !== 0 && (
                            <p
                              className={`text-xs text-gray-500 dark:text-gray-300 ${
                                item.totalProductDiscount !== 0 &&
                                "line-through"
                              }`}
                            >
                              PKR {item.price?.toFixed(2)}
                            </p>
                          )}
                        </div>
                        {item.totalProductDiscount !== 0 && (
                          <p className="text-sm text-gray-600 dark:text-gray-200">
                            {item.totalProductDiscount}% OFF
                          </p>
                        )}
                        {/* Item Details (Color & Size) */}
                        <div className="my-4 flex flex-wrap gap-2">
                          {item.color && (
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                Color:
                              </span>
                              <span className="bg-gray-100 dark:bg-gray-800 py-1 px-2 rounded text-sm">
                                {item.color}
                              </span>
                            </div>
                          )}

                          {item.size && (
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                Size:
                              </span>
                              <span className="bg-gray-100 dark:bg-gray-800 py-1 px-2 rounded text-sm">
                                {item.size}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        variant={"outline"}
                        onClick={() =>
                          handleUpdateQuantity(item, item.quantity - 1)
                        }
                        disabled={isProcessing}
                        className="p-2"
                      >
                        <AiOutlineMinus />
                      </Button>
                      <span className="text-lg font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant={"outline"}
                        onClick={() =>
                          handleUpdateQuantity(item, item.quantity + 1)
                        }
                        disabled={isProcessing}
                        className="p-2"
                      >
                        <AiOutlinePlus />
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleRemoveItem(item)}
                        disabled={isProcessing}
                        className="px-2"
                      >
                        Remove
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
              {/* Coupon Section */}
              {/* <div className="mt-6 flex flex-col sm:flex-row items-center sm:space-x-4">
                <Input
                  type="text"
                  value={couponCode}
                  disabled={isProcessing}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="input"
                />
                <Button
                  disabled={isProcessing}
                  onClick={handleApplyCoupon}
                  className="w-full sm:w-auto"
                >
                  Apply Coupon
                </Button>
                {isCouponApplied && (
                  <p className="text-green-600 mt-2">
                    Coupon applied successfully!
                  </p>
                )}
              </div> */}
              <div className="mt-6 flex flex-col sm:flex-row justify-between items-center sm:space-x-4">
                <h2 className="text-2xl font-bold mb-4 sm:mb-0">
                  Subtotal: PKR {subtotal?.toFixed(2)}
                </h2>
                <Link to="/user/checkout" className="w-full sm:w-auto">
                  <Button variant="default" className="w-full sm:w-auto">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="my-40 flex flex-col items-center">
              <p className="text-lg text-center">Your cart is empty.</p>
              <Link to="/products">
                <Button>Explore Products...</Button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-4">Please log in to view your cart.</p>
          <Link to="/signin">
            <Button variant="primary">Log In</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
