"use client";

import { memo, useMemo, useState, useEffect } from "react";
import Pagination from "./Pagination";
import ExportButton from "./ExportButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AllRequestsTable from "./AllRequestsTable";
import RequestsTabs from "./RequestsTabs";
import { useToast } from "@/hooks/use-toast";
import {
  fetchPendingRequests,
  getAllRequests,
  respondToRequest,
  deleteRequest,
} from "@/utils/requests";

const RequestsAllPageWrapper = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const data = await getAllRequests();
        setRequests(data);
        setFilteredRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
        toast({
          title: "Error",
          description: "Failed to fetch requests. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [toast]);

  useEffect(() => {
    const filtered = searchQuery
      ? requests.filter(
          (req) =>
            req?.response?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            req?.requestDetails
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      : requests;

    setFilteredRequests(filtered);
  }, [searchQuery, requests]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredRequests.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredRequests, currentPage, itemsPerPage]);

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-4xl my-10">Manage All Requests</h1>
      <RequestsTabs />
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          className="w-full max-w-md"
          placeholder="Search requests..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ExportButton data={filteredRequests} />
      </div>

      <div className="overflow-x-auto">
        <AllRequestsTable
          requests={paginatedRequests}
          respondToRequest={respondToRequest}
          deleteRequest={deleteRequest}
          loading={loading}
        />
      </div>

      {filteredRequests.length === 0 && !loading && (
        <p className="text-center text-gray-500">No matching requests found.</p>
      )}

      <p className="my-4 bg-secondary text-center py-2">
        Total Requests:{" "}
        <span className="font-bold mx-1">{requests.length}</span>
      </p>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredRequests.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default memo(RequestsAllPageWrapper);
