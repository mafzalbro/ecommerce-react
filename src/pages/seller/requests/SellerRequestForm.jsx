"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const SellerRequestForm = ({ onSubmit }) => {
  const { toast } = useToast();
  const [requestType, setRequestType] = useState("");
  const [requestDetails, setRequestDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!requestType || !requestDetails.trim()) {
      toast({
        title: "Validation Error",
        description: "Both request type and details are required.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Mock API call or onSubmit callback
      await onSubmit({ requestType, requestDetails });
      toast({
        title: "Success",
        description: "Request submitted successfully.",
      });
      setRequestType("");
      setRequestDetails("");
    } catch (error) {
      console.error("Error submitting request:", error);
      toast({
        title: "Error",
        description: "Failed to submit the request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="max-w-md p-4 space-y-4 border rounded shadow" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold">Submit a Seller Request</h2>

      <div>
        <label htmlFor="requestType" className="block text-sm font-medium">
          Request Type
        </label>
        <Select
          onValueChange={(value) => setRequestType(value)}
          value={requestType}
        >
          <SelectTrigger id="requestType" className="w-full mt-1">
            <SelectValue placeholder="Select Request Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="update">Update</SelectItem>
            <SelectItem value="delete">Delete</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="requestDetails" className="block text-sm font-medium">
          Request Details
        </label>
        <Input
          id="requestDetails"
          type="text"
          placeholder="Provide details about your request"
          value={requestDetails}
          onChange={(e) => setRequestDetails(e.target.value)}
          className="w-full mt-1"
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Submitting..." : "Submit Request"}
      </Button>
    </form>
  );
};

export default SellerRequestForm;
