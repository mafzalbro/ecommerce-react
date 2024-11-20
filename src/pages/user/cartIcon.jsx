import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AiOutlineShoppingCart } from "react-icons/ai";
import useAuth from "@/hooks/AuthProvider";
import { Link } from "react-router-dom";
import { useCartContext } from "@/hooks/CartContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Toast,
  ToastAction,
  ToastProvider,
  ToastTitle,
} from "@/components/ui/toast"; // Import ShadCN toast

const CartIcon = () => {
  const { user } = useAuth();
  const { cart, removeCart, applyCoupon } = useCartContext();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(null); // Track the item being deleted

  // Access cart items (assuming the structure is cart.cartItem)
  const cartItems = cart?.cartItem || [];

  // Calculate the number of items in the cart and the subtotal
  const cartItemCount = cartItems.length;
  const subtotal = cartItems
    ?.filter((item) => Number.isFinite(item.price) && item.price > 0)
    ?.reduce((total, item) => total + item.price, 0)
    ?.toFixed(2);

  const handleRemoveItem = async (itemId) => {
    setDeleting(itemId); // Set the deleting state to the item being removed
    const success = await removeCart(itemId); // Remove the item
    if (success) {
      setDeleting(null); // Reset the deleting state if successful
    } else {
      setDeleting(null); // Reset the deleting state even if it fails
    }
  };

  return (
    <ToastProvider>
      <div className="relative">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center">
              <div className="relative">
                <AiOutlineShoppingCart className="mr-2" size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="p-6">
            {/* Dialog Header */}
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Shopping Cart
              </DialogTitle>
            </DialogHeader>

            {/* Content for Logged-In Users */}
            {user && user.role ? (
              <div>
                {/* Cart Items List */}
                {cartItems.length > 0 ? (
                  <ScrollArea className="h-72 w-full px-4 overflow-y-auto">
                    <ul className="space-y-4">
                      {cartItems.map((item) => (
                        <li
                          key={item.productId}
                          className="flex items-center justify-between gap-4 p-4 rounded-lg shadow-sm"
                        >
                          <div className="flex flex-col">
                            <span className="text-lg font-medium text-gray-800 dark:text-gray-100">
                              {item.title}
                            </span>
                            <span className="text-gray-600 dark:text-gray-300">
                              PKR {item.price}
                            </span>

                            {/* Item Details (Color & Size) */}
                            <div className="mt-2 space-y-1">
                              {item.color && (
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-gray-500 dark:text-gray-200">
                                    Color:
                                  </span>
                                  <span className="bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 py-1 px-2 rounded text-sm">
                                    {item.color}
                                  </span>
                                </div>
                              )}
                              {item.size && (
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-gray-500 dark:text-gray-200">
                                    Size:
                                  </span>
                                  <span className="bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 py-1 px-2 rounded text-sm">
                                    {item.size}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRemoveItem(item.productId)}
                            disabled={deleting === item.productId}
                            className="text-sm"
                          >
                            {deleting === item.productId
                              ? "Deleting..."
                              : "Remove"}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                ) : (
                  // Empty Cart Message
                  <div className="flex flex-col items-center space-y-4">
                    <p className="text-gray-600 dark:text-gray-200">Your cart is empty.</p>
                    <Link to="/products">
                      <Button variant="ghost">Explore</Button>
                    </Link>
                  </div>
                )}

                {/* Cart Summary */}
                <div className="mt-6 flex items-center justify-between border-t pt-4">
                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">
                      Items: {cartItemCount}
                    </span>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">
                      Subtotal: PKR {subtotal}
                    </span>
                  </div>
                  <Link to="/user/cart">
                    <Button variant="default" onClick={() => setOpen(false)}>
                      See Cart
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              // Login Prompt
              <div className="text-center space-y-4">
                <p className="text-gray-600 dark:text-gray-200">
                  Please log in to view your cart.
                </p>
                <Link to="/signin">
                  <Button variant="primary">Log In</Button>
                </Link>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ToastProvider>
  );
};

export default CartIcon;
