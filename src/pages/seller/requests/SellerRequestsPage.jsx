import SellerRequestForm from "@/components/SellerRequestForm";

const handleSellerRequest = async ({ requestType, requestDetails }) => {
  // API call or logic to handle the seller's request
  console.log("Request Submitted:", { requestType, requestDetails });
};

export default function SellerRequestsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Seller Requests</h1>
      <SellerRequestForm onSubmit={handleSellerRequest} />
    </div>
  );
}
