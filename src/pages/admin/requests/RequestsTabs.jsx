import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const RequestsTabs = () => {
  const location = useLocation();

  return (
    <Tabs
      defaultValue={location.pathname.includes("/all") ? "all" : "pending"}
      className="w-full max-w-2xl mx-auto"
    >
      <TabsList>
        {/* Highlight tab based on path */}
        <TabsTrigger
          value="all"
          className={location.pathname === "/admin/requests/all" ? "active" : ""}
        >
          <Link to="/admin/requests/all">All Requests</Link>
        </TabsTrigger>
        <TabsTrigger
          value="pending"
          className={
            location.pathname === "/admin/requests" ? "active" : ""
          }
        >
          <Link to="/admin/requests">Pending Requests</Link>
        </TabsTrigger>
      </TabsList>

    </Tabs>
  );
};

export default RequestsTabs;
