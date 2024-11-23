import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react"; // Example loader icon, replace as necessary

const RequestsTable = ({
  requests,
  respondToRequest,
  deleteRequest,
  loading,
  fetchRequests,
}) => {
  const [actionLoading, setActionLoading] = useState({}); // Track loading states for each request

  const handleAction = async (requestId, action, payload) => {
    setActionLoading((prev) => ({ ...prev, [requestId]: action }));
    try {
      if (action === "delete") {
        await deleteRequest(requestId);
      } else {
        await respondToRequest(requestId, payload);
      }
    } catch (error) {
      console.error(`Failed to ${action} request ${requestId}:`, error);
    } finally {
      setActionLoading((prev) => ({ ...prev, [requestId]: null }));
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Seller ID</TableHead>
          <TableHead>Request Details</TableHead>
          <TableHead>Response</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="w-24 h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-48 h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-16 h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-24 h-4" />
                </TableCell>
              </TableRow>
            ))
          : requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.sellerId}</TableCell>
                <TableCell>{request.requestDetails}</TableCell>
                <TableCell>{request.response}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  {new Date(request.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(request.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      disabled={actionLoading[request._id] === "approve"}
                      onClick={() => {
                        fetchRequests();
                        handleAction(request._id, "approve", {
                          status: "approved",
                          response: "Request approved successfully.",
                        });
                      }}
                    >
                      {actionLoading[request._id] === "approve" ? (
                        <Loader className="animate-spin" size={16} />
                      ) : (
                        "Approve"
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      disabled={actionLoading[request._id] === "reject"}
                      onClick={() => {
                        fetchRequests();
                        handleAction(request._id, "reject", {
                          status: "rejected",
                          response: "Request rejected due to policy violation.",
                        });
                      }}
                    >
                      {actionLoading[request._id] === "reject" ? (
                        <Loader className="animate-spin" size={16} />
                      ) : (
                        "Reject"
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
};

export default RequestsTable;
