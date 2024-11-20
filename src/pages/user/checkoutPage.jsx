import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, CreditCard, Truck } from "lucide-react";
import useAuth from "../../hooks/AuthProvider";
import { useCartContext } from "@/hooks/CartContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
export default function CheckoutPage() {
  const { user } = useAuth();
  const { cart } = useCartContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cartItems, setCartItems] = useState([]); // State to store cart items
  const [totalPrice, setTotalPrice] = useState(0); // State to store total price
  const [totalProductDiscount, setTotalProductDiscount] = useState(0); // State to store total price
  const [formData, setFormData] = useState({
    firstName: user.name?.split(" ")[0],
    lastName: user.name?.split(" ")[1],
    address: "",
    city: "",
    zipCode: "",
  });
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Get cart items and calculate total price using useEffect
  useEffect(() => {
    const get = async () => {
      try {
        console.log(cart);

        setCartItems(cart.cartItem); // Set cart items to the state

        // Calculate the total price dynamically based on cart items
        const total = cart.cartItem?.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );

        const totalDiscount = cart.cartItem?.reduce(
          (total, item) => total + item.totalProductDiscount * item.quantity,
          0
        );
        setTotalPrice(total);
        setTotalProductDiscount(totalDiscount);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setIsLoading(false);
      }
    };
    get();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsProcessing(true);

    // Simulate a delay to mock a payment process
    setTimeout(() => {
      alert("Payment successful!");
      setIsProcessing(false);
    }, 2000);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  console.log(cartItems);

  if (cartItems.length === 0) {
    return (
      <div className="my-60 flex flex-col items-center">
        <p>First Add semething to checkout...</p>
        <Link to={"/products"}>
          <Button>See Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {/* Order Summary */}
        <Card className="p-6 shadow-md rounded-lg bg-white dark:bg-gray-950">
          {/* Order Summary Header */}
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-semibold text-gray-800 dark:text-gray-100">
              <ShoppingCart className="mr-2 text-indigo-600 dark:text-indigo-400" />
              Order Summary
            </CardTitle>
          </CardHeader>

          <CardContent className="mt-4">
            <div className="space-y-6">
              {/* Loading Skeleton */}
              {isLoading ? (
                <Skeleton className="h-6 w-full rounded-lg" />
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col space-y-2 p-4 bg-gray-50 rounded-lg shadow-sm dark:bg-gray-700 md:flex-row md:space-y-0 md:justify-between md:items-center"
                  >
                    {/* Item Title */}
                    <span className="font-medium">
                      {item.title}
                    </span>

                    {/* Item Details (Color & Size) */}
                    <div className="space-y-2">
                      {item.color && (
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-600 dark:text-gray-400">
                            Color:
                          </span>
                          <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded text-sm dark:bg-gray-600 dark:text-gray-200">
                            {item.color}
                          </span>
                        </div>
                      )}

                      {item.size && (
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-600 dark:text-gray-400">
                            Size:
                          </span>
                          <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded text-sm dark:bg-gray-600 dark:text-gray-200">
                            {item.size}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Pricing Details */}
                    <div className="flex flex-col items-end space-y-1">
                      <span className="text-gray-600 text-sm dark:text-gray-400">
                        PKR{" "}
                        {item.totalProductDiscount
                          ? (item.totalProductDiscount * item.quantity).toFixed(
                              2
                            )
                          : "0.00"}
                        <span className="mx-1">Discount</span>
                      </span>
                      <span className="font-bold text-gray-800 dark:text-gray-100">
                        PKR {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}

              {/* Separator Line */}
              <Separator className="border-gray-300 dark:border-gray-600" />

              {/* Total Section */}
              <div className="flex justify-between font-bold text-lg text-gray-800 dark:text-gray-100">
                <span>Total Discount:</span>
                <span>PKR {totalProductDiscount.toFixed(2)}</span>
                <span>Total Price: PKR {totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Information */}
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="mr-2" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2" />
                Payment
              </CardTitle>
              <CardDescription>
                All transactions are secure and encrypted.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                defaultValue="card"
                className="mb-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Credit Card</Label>
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isProcessing}>
                {isProcessing
                  ? "Processing..."
                  : `Pay PKR ${totalProductDiscount.toFixed(2)}`}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
