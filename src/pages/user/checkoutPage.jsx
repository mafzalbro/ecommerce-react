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
import PaymentForm from "./payment-form";
import StripeProvider from "@/hooks/StripeProvider";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cart } = useCartContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProductDiscount, setTotalProductDiscount] = useState(0);
  const [formData, setFormData] = useState({
    firstName: user.name?.split(" ")[0],
    lastName: user.name?.split(" ")[1],
    address: "",
    city: "",
    zipCode: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  // Get cart items and calculate total price
  useEffect(() => {
    const get = async () => {
      try {
        setCartItems(cart.cartItem);

        const totalDiscount = cart.cartItem?.reduce(
          (total, item) =>
            total +
            item.quantity * (item.price * (item.totalProductDiscount / 100)),
          0
        );

        const total = cart.cartItem?.reduce(
          (total, item) =>
            total +
            item.quantity *
              (item.price - item.price * (item.totalProductDiscount / 100)),
          0
        );

        setTotalProductDiscount(totalDiscount || 0);
        setTotalPrice(total || 0);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setIsLoading(false);
      }
    };
    get();
  }, [cart]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsProcessing(true);
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

  if (cartItems.length === 0) {
    return (
      <div className="my-60 flex flex-col items-center">
        <p>First Add something to checkout...</p>
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
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-semibold text-gray-800 dark:text-gray-100">
              <ShoppingCart className="mr-2 text-indigo-600 dark:text-indigo-400" />
              Order Summary
            </CardTitle>
          </CardHeader>

          <CardContent className="mt-4">
            <div className="space-y-6">
              {isLoading ? (
                <Skeleton className="h-6 w-full rounded-lg" />
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col space-y-2 p-4 bg-gray-50 rounded-lg shadow-sm dark:bg-gray-900 md:flex-row md:space-y-0 md:justify-between md:items-center"
                  >
                    <div className="space-y-2">
                      <span className="font-medium">{item.title}</span>
                      <div className="space-y-2 flex flex-col">
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
                        {item.quantity && (
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-600 dark:text-gray-400">
                              Quantity:
                            </span>
                            <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded text-sm dark:bg-gray-600 dark:text-gray-200">
                              {item.quantity}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span className="text-gray-600 text-sm dark:text-gray-400">
                        {item.totalProductDiscount
                          ? (
                              item.price * item.quantity -
                              (item.price -
                                (item.price * item.totalProductDiscount) /
                                  100) *
                                item.quantity
                            )?.toFixed(2) + " PKR Discount"
                          : ""}
                        <span className="mx-1"></span>
                      </span>

                      {item.totalProductDiscount !== 0 && (
                        <p
                          className={`text-xs text-gray-500 dark:text-gray-300 ${
                            item.totalProductDiscount !== 0 && "line-through"
                          }`}
                        >
                          PKR {(item.price * item.quantity)?.toFixed(2)}
                        </p>
                      )}
                      <span className="font-bold text-gray-800 dark:text-gray-100">
                        PKR{" "}
                        {(item.totalProductDiscount !== 0
                          ? (item.price -
                              (item.price * item.totalProductDiscount) / 100) *
                            item.quantity
                          : item?.price * item?.quantity
                        )?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}

              <Separator className="border-gray-300 dark:border-gray-600" />
              <div className="flex justify-between font-bold text-lg text-gray-800 dark:text-gray-100">
                <span>Total Discount:</span>
                <span>PKR {totalProductDiscount.toFixed(2)}</span>
                <span>Total Price: PKR {totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit}>
          {/* Shipping Information */}
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
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
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
                  <Label htmlFor="zipCode">Zip Code</Label>
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

          {/* Payment Method Selection */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
              >
                <div className="space-y-2 flex items-center gap-2">
                  <RadioGroupItem value="card" id="creditCard" />
                  <Label htmlFor="creditCard">Credit Card</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Stripe Payment Form */}
          {paymentMethod === "card" && (
            <StripeProvider>
              <PaymentForm
                totalPrice={totalPrice}
                cartItems={cartItems}
                setIsProcessing={setIsProcessing}
              />
            </StripeProvider>
          )}

          <CardFooter>
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Complete Order"}
            </Button>
          </CardFooter>
        </form>
      </div>
    </div>
  );
}
