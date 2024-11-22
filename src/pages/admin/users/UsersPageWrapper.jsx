import React, { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserTable from "./UsersTable";
import Pagination from "./Pagination";
import { fetchAllUsers, deleteUser } from "@/utils/users";
import { useNavigate } from "react-router-dom";

const UsersPageWrapper = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch all users
  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoadingUsers(false);
    }
  };
  useEffect(() => {
    loadUsers();
  }, []);

  // Filter users based on search query
  useEffect(() => {
    let filtered = users;

    if (searchQuery) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  // Paginate users
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  // Delete user
  const handleDeleteUser = async (userId) => {
    setDeletingUserId(userId);
    try {
      await deleteUser(userId);
      loadUsers();
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeletingUserId(null);
    }
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-4xl my-10">Manage Users</h1>
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          className="w-full max-w-md"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          onClick={() => {
            navigate("/admin/users/new");
          }}
        >
          Add New User
        </Button>
      </div>

      <div className="overflow-x-auto">
        <UserTable
          users={paginatedUsers}
          deleteUser={handleDeleteUser}
          deletingUserId={deletingUserId}
          loading={loadingUsers}
        />
      </div>

      <p className="my-4 bg-secondary text-center py-2">
        Total Users:
        <span className="font-bold mx-1">{users?.length}</span>
      </p>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredUsers.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UsersPageWrapper;
