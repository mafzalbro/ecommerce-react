import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../../../hooks/useOrder";
import { useProducts } from "../../../hooks/useProducts";
import GoBack from "@/components/layout/admin/GoBack";

const CreateOrderPage = () => {
  const navigate = useNavigate();
  const { createOrder } = useOrder();
  const { products } = useProducts();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderNotes, setOrderNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newOrder = {
        customerName,
        customerEmail,
        productId: selectedProduct,
        quantity,
        orderNotes,
      };

      await createOrder(newOrder); // API call to create the order
      navigate("/seller/orders");
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-4 max-w-screen-lg mx-auto">
      <GoBack to="/seller/orders" />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create Order</CardTitle>
          <CardDescription>Create a new order for a customer.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Customer Name */}
              <div>
                <Label>Customer Name</Label>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                  required
                />
              </div>

              {/* Customer Email */}
              <div>
                <Label>Customer Email</Label>
                <Input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="Enter customer email"
                  required
                />
              </div>

              {/* Product Selection */}
              <div>
                <Label>Product</Label>
                <Select
                  value={selectedProduct}
                  onValueChange={setSelectedProduct}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Available Products</SelectLabel>
                      {products.map((product) => (
                        <SelectItem key={product._id} value={product._id}>
                          {product.title} - PKR {product.price}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div>
                <Label>Quantity</Label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  required
                  min="1"
                />
              </div>

              {/* Order Notes */}
              <div>
                <Label>Order Notes</Label>
                <Textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Additional notes about the order (optional)"
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={isSubmitting} className="mt-4">
                {isSubmitting ? "Creating..." : "Create Order"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateOrderPage;
