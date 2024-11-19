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
export default function CheckoutPage() {
  const { user } = useAuth();
  const { getCart } = useCartContext();
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
        const { cartItem } = await getCart(); // Get the cart items from CartContext
        setCartItems(cartItem); // Set cart items to the state

        console.log(cartItem);

        // Calculate the total price dynamically based on cart items
        const total = cartItem?.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );

        const totalDiscount = cartItem?.reduce(
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

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="mr-2" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <Skeleton className="h-6 w-full" />
              ) : (
                cartItems.map((item) => (
                  <div key={item._id} className="flex justify-between">
                    <span>{item.title}</span>
                    <span>
                      PKR{" "}
                      {(item.totalProductDiscount * item.quantity).toFixed(2)}
                    </span>
                    <span>PKR {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))
              )}
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>PKR {totalProductDiscount.toFixed(2)}</span>
                <span>PKR {totalPrice.toFixed(2)}</span>
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
