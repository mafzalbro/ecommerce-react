import React from "react";
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

const AllRequestsTable = ({
  requests,
  // respondToRequest,
  deleteRequest,
  loading,
}) => (
  <div className="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Seller Info</TableHead>
          <TableHead>Request Type</TableHead>
          <TableHead>Request Details</TableHead>
          <TableHead>Response</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          {/* <TableHead>Actions</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="w-32 h-4" />
                  <Skeleton className="w-40 h-4 mt-1" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-48 h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-24 h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-16 h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-32 h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-32 h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-24 h-4" />
                </TableCell>
              </TableRow>
            ))
          : requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <div className="w-80 overflow-auto">
                    <p className="font-medium">{request?.sellerId?.name}</p>
                    <p className="text-gray-500 text-sm">
                      {request?.sellerId?.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{request.requestType}</TableCell>
                <TableCell>{request.requestDetails}</TableCell>
                <TableCell>{request.response || "N/A"}</TableCell>
                <TableCell>{request.status || "Pending"}</TableCell>
                <TableCell>
                  {new Date(request.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(request.updatedAt).toLocaleDateString()}
                </TableCell>
                {/* <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() =>
                        respondToRequest(request.id, { status: "approved" })
                      }
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        respondToRequest(request.id, { status: "rejected" })
                      }
                    >
                      Reject
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => deleteRequest(request._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell> */}
              </TableRow>
            ))}
      </TableBody>
    </Table>

    {!loading && requests.length === 0 && (
      <p className="text-center text-gray-500 mt-4">No requests found.</p>
    )}
  </div>
);

export default AllRequestsTable;
