import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router hooks
import { Button } from "@/components/ui/button"; // Your Button component
import Spinner from "@/components/ui/spinner"; // Optional: Spinner for loading
import useAuth from "../../hooks/AuthProvider"; // Import useAuth hook
import { XCircleIcon } from "lucide-react";

const CancelPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(
    "An unknown error occurred. Please try again later."
  );

  const queryParams = new URLSearchParams(location.search);
  const check_cancel = queryParams.get("check_cancel");
  const orderId = queryParams.get("orderId");

  // Use useAuth hook to check the current user's role
  const { role, isAuthenticated } = useAuth();

  useEffect(() => {
    // Simulate loading for 1 second
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    // If the user is not authenticated or does not have the role 'user', redirect to '/'
    if (
      !isAuthenticated ||
      role !== "user" ||
      (check_cancel !== "payment" && !orderId)
    ) {
      navigate("/"); // Redirect if not authenticated or role is not 'user'
    }
  }, [isAuthenticated, role, history]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100 p-6">
      <div className="bg-white shadow-md rounded-lg max-w-lg w-full p-8">
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner /> {/* Show spinner while loading */}
            <span className="ml-4">Processing...</span>
          </div>
        ) : (
          <div className="text-center">
            <XCircleIcon className="w-16 h-16 text-red-500 mx-auto" />
            <h1 className="text-2xl font-semibold text-red-600 mt-4">
              Payment Failed!
            </h1>
            <p className="text-lg text-gray-700 mt-2">{errorMessage}</p>
            <Button className="mt-6" onClick={() => history.push("/products")}>
              Shop Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelPage;
