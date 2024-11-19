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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Shopping Cart</DialogTitle>
            </DialogHeader>
            {user && user.role ? (
              <div>
                {cartItems.length > 0 ? (
                  <ScrollArea className="h-72 w-full px-6">
                    <ul className="space-y-2">
                      {cartItems.map((item) => (
                        <li
                          key={item.productId}
                          className="flex justify-between items-center gap-2"
                        >
                          <span>{item.title}</span>
                          <span>{item.price}</span>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRemoveItem(item.productId)}
                            disabled={deleting === item.productId} // Disable if this item is being deleted
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
                  <>
                    <p>Your cart is empty.</p>
                    <Link to="/products">
                      <Button variant="ghost">Explore</Button>
                    </Link>
                  </>
                )}

                <div className="mt-4 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <span className="font-semibold">
                      Items: {cartItemCount}
                    </span>
                    <span className="font-semibold">
                      Subtotal: PKR {subtotal}
                    </span>
                  </div>
                  <div>
                    <Link to={"/user/cart"}>
                      <Button
                        variant={"default"}
                        onClick={() => setOpen(false)}
                      >
                        See Cart
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="mb-4">Please log in to view your cart.</p>
                <Link to="/login">
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
