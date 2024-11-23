import SellerRequestForm from "./SellerRequestForm";
import { createRequest } from "@/utils/requests"; // Import the function
import { useToast } from "@/hooks/use-toast"; // Import the toast hook

export default function SellerRequestsPage() {
  const { toast } = useToast(); // Initialize the toast

  // Function to handle seller request submission
  const handleSellerRequest = async ({ requestType, requestDetails }) => {
    try {
      const newRequest = await createRequest({ requestType, requestDetails }); // API call
      toast({
        title: "Request Submitted",
        description: `Your request for ${requestType} has been successfully submitted.`,
        variant: "success",
      }); // Success toast
    } catch (error) {
      toast({
        title: "Request Failed",
        description:
          error?.response?.data?.message ||
          "An error occurred while submitting the request.",
        variant: "destructive",
      }); // Error toast
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Seller Requests</h1>
      <SellerRequestForm onSubmit={handleSellerRequest} />
    </div>
  );
}
