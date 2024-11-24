/* eslint-disable react/prop-types */
import { useState } from "react";
import { useCartContext } from "@/hooks/CartContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import useAuth from "@/hooks/AuthProvider";

const AddToCartButton = ({
  product,
  selectedColor,
  price,
  selectedSize,
  disabled,
}) => {
  const { cart, addCart } = useCartContext();
  const { isAuthenticated, role, logout } = useAuth();
  const [isAdding, setIsAdding] = useState(false);

  // console.log(product, selectedColor, price, selectedSize, disabled);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      // Show a toast prompting user to log in
      toast({
        variant: "destructive",
        title: "You must be logged in to add items to the cart!",
        description: (
          <div className="flex items-center space-x-4">
            <Button>
              <Link to="/signin" className="text-sm font-medium">
                Go to Sign In
              </Link>
            </Button>
          </div>
        ),
      });
      return;
    }

    if (role !== "user") {
      // Show a toast prompting user to log in
      toast({
        variant: "destructive",
        title: `Your are ${role?.slice(0, 1).toUpperCase()}${role?.slice(
          1
        )}! Please Sign In as User...`,
        description: (
          <div className="flex items-center space-x-4">
            <p className="text-sm">Please log in as a user.</p>
            <Button onClick={() => logout()}>Logout</Button>
          </div>
        ),
      });
      return;
    }

    setIsAdding(true);

    // Update cart check to use the new structure
    const existingItem = cart.cartItem.find(
      (item) => item.productId === product._id
    );

    if (existingItem) {
      toast({
        variant: "default",
        title: `${product.title} Already in Cart!`,
        description: (
          <div className="flex items-center space-x-4">
            <p className="text-sm">View your cart for more details.</p>
            <Link
              to={`/user/cart#${product._id}`}
              className="text-sm font-medium"
            >
              View in Cart
            </Link>
          </div>
        ),
      });
    } else {
      try {
        console.log(product);

        const success = await addCart(
          { ...product, quantity: 1 },
          selectedSize,
          selectedColor,
          price
        );

        // Only update the cart if the item was successfully added
        if (success) {
          toast({
            variant: "default",
            title: `${product.title} Added to Cart!`,
            description: (
              <div className="flex items-center space-x-4">
                <p className="text-sm">Check your cart for more items.</p>
                <Link
                  to={`/user/cart#${product._id}`}
                  className="text-sm font-medium"
                >
                  View in Cart
                </Link>
              </div>
            ),
          });
        }
      } catch (err) {
        console.error("Error adding item to cart:", err);
        toast({
          variant: "destructive", // Change to destructive on error
          title: "Error adding item to cart",
          description: (
            <div className="flex items-center space-x-4">
              <p className="text-sm">
                Something went wrong while adding the item.
              </p>
              <ToastAction altText="Try again" onClick={handleAddToCart}>
                Try again
              </ToastAction>
            </div>
          ),
        });
      }
    }

    setIsAdding(false);
  };

  // Access the item in cart using the new structure
  const existingItem = cart.cartItem.find(
    (item) => item.productId === product._id
  );

  return (
    <Button
      className="w-full py-2 rounded-md flex items-center justify-center"
      onClick={handleAddToCart}
      disabled={disabled || isAdding}
    >
      {existingItem ? (
        <>
          <Link
            to={`/user/cart#${product._id}`}
            className="ml-2 text-sm font-medium"
          >
            View in Cart
          </Link>
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          <span className="text-sm font-medium">
            {isAdding ? "Adding..." : "Add to Cart"}
          </span>
        </>
      )}
    </Button>
  );
};

export default AddToCartButton;
