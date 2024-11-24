import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router hooks
import useAuth from "@/hooks/AuthProvider"; // Assuming useAuth hook is available
import { useOrder } from "@/hooks/useOrder"; // Assuming useOrder is correctly set up
import { Button } from "@/components/ui/button"; // Your Button component
import Spinner from "@/components/ui/spinner"; // Optional: Spinner for loading
import { CheckCircleIcon } from "lucide-react";
import { useCartContext } from "../../hooks/CartContext";

const SuccessPage = () => {
  const navigate = useNavigate(); // To access the current location (URL) and query params
  const [loading, setLoading] = useState(true);
  const { createOrder } = useOrder(); // Assuming useOrder is correctly set up
  const { cart } = useCartContext();
  // Use useAuth hook to check the current user's role
  const { role, isAuthenticated, user } = useAuth();

  
  // Parse query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const sessionId = queryParams.get("session_id");
  const check_success = queryParams.get("check_success");
  const orderId = queryParams.get("orderId");
  
  // console.log(queryParams, role, isAuthenticated);
  
  useEffect(() => {
    // Check if the user is authenticated and their role is 'user'
    // if (!isAuthenticated || role !== "user" || check_success !== "payment") {
      //   // Redirect to home page if not authenticated or role is not 'user'
      //   // navigate("/");
      //   return;
      // }
      console.log(
        sessionId && check_success === "payment" && !!orderId && !!user,
        sessionId,
        check_success,
        !!orderId,
        !!user
      );
      
      // Proceed with order creation if sessionId exists
      if (sessionId && check_success === "payment" && !!orderId && !!user) {
        setLoading(true);
        // Artificial delay of 2 seconds before sending the request
        setTimeout(() => {
          createOrder({ payment: "success", orderId, userId: user._id })
          .then(() => {
            // Additional logic on successful order creation (e.g., redirect or show confirmation)
            setLoading(false);
            setTimeout(() => {
              navigate("/");
            }, 4000);
          })
          .catch((error) => {
            // Handle any errors that may occur
            console.error("Error creating order:", error);
            setTimeout(() => {
              navigate("/");
            }, 4000);
            setLoading(false);
          });
        }, 2000); // 2 seconds delay
      } else {
        // If no session_id, redirect or show an error (optional)
      }
    }, []);
    
    if (window.location.pathname !== "/") {
      return null;
    }
  
  if (!sessionId || check_success !== "payment" || !orderId) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100 p-6">
      <div className="bg-white shadow-md rounded-lg max-w-lg w-full p-8">
        {loading ? (
          <div className="flex justify-center items-center text-black flex-col">
            <Spinner /> {/* Show spinner while loading */}
            <span className="ml-4">Processing your order...</span>
          </div>
        ) : (
          <div className="text-center">
            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
            <h1 className="text-2xl font-semibold text-green-600 mt-4">
              Payment Successful!
            </h1>
            <p className="text-lg text-gray-700 mt-2">
              Your order has been successfully processed. Thank you for your
              purchase!
            </p>
            <Button className="mt-6" onClick={() => navigate("/user/orders")}>
              View Your Orders
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;
