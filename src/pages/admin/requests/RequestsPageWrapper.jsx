import { memo, useMemo, useState, useEffect } from "react";
import Pagination from "./Pagination";
import ExportButton from "./ExportButton";
import { Input } from "@/components/ui/input";
import RequestsTable from "./RequestsTable";
import RequestsTabs from "./RequestsTabs";

import {
  fetchPendingRequests,
  respondToRequest,
  deleteRequest,
} from "@/utils/requests";

const RequestsPageWrapper = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await fetchPendingRequests();
      setRequests(data);
      setFilteredRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    let filtered = requests;
    if (searchQuery) {
      filtered = requests.filter(
        (req) =>
          req?.response?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          req?.requestDetails?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
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
      <h1 className="text-4xl my-10">Manage Pending Requests</h1>
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
        <RequestsTable
          requests={paginatedRequests}
          respondToRequest={respondToRequest}
          deleteRequest={deleteRequest}
          loading={loading}
          fetchRequests={fetchRequests}
        />
      </div>

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

export default memo(RequestsPageWrapper);
