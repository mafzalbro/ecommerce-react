import SellerRequestForm from "./SellerRequestForm";
import { createRequest } from "@/utils/requests"; // Import the function
import { useToast } from "@/hooks/use-toast"; // Import the toast hook
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <div className="p-6 max-w-screen-md mx-auto">
      {/* Header */}
      <h1 className="text-3xl mb-4">Send Requests to Admin</h1>

      {/* Request Form */}
      <SellerRequestForm onSubmit={handleSellerRequest} />

      {/* FAQ Section */}
      <div className="mt-10">
        <h2 className="text-2xl mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {/* FAQ Item 1 */}
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What types of requests can I make?
            </AccordionTrigger>
            <AccordionContent>
              You can request to update your seller profile, delete an outdated
              product listing, or request changes in the forum settings. These
              requests will be reviewed by the admin.
            </AccordionContent>
          </AccordionItem>

          {/* FAQ Item 2 */}
          <AccordionItem value="item-2">
            <AccordionTrigger>
              How does the request process work?
            </AccordionTrigger>
            <AccordionContent>
              Once you submit a request, the admin will review it. If the
              request is approved, the changes will be applied, and you will
              receive a confirmation notification.
            </AccordionContent>
          </AccordionItem>

          {/* FAQ Item 3 */}
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How long does it take to process requests?
            </AccordionTrigger>
            <AccordionContent>
              The request processing time depends on the type of request and the
              admin's availability. Typically, you can expect a response within
              1-3 business days.
            </AccordionContent>
          </AccordionItem>

          {/* FAQ Item 4 */}
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Can I cancel or modify my request?
            </AccordionTrigger>
            <AccordionContent>
              If your request has not yet been processed, you can contact the
              admin to cancel or modify your request. Once processed, changes
              cannot be reversed.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
