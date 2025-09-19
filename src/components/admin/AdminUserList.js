"use client";

import { useEffect, useState } from "react";
import { getIdToken } from "@/lib/client/clientAuthService";
import { useUserStatus } from "@/hooks/useUserStatus";
import { useRouter } from "next/navigation";
import AddUserForm from "@/components/admin/AddUserForm";
import Link from "next/link";

export default function AdminUserList() {
  const { user, isAdmin, loading } = useUserStatus();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  // ✅ Redirect if not admin
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.replace("/login");
    }
  }, [user, isAdmin, loading, router]);

  // ✅ Fetch users on load
  useEffect(() => {
    if (isAdmin) fetchUsers();
  }, [isAdmin]);

  useEffect(() => {
  if (isAdmin) fetchUsers();
}, [isAdmin]);

const fetchUsers = async () => {
  try {
    setLoadingUsers(true);
    const token = await getIdToken();
    const res = await fetch("/api/admin/users/listUsers", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to load users");
    setUsers(data.users || []);
  } catch (err) {
    console.error("Error fetching users:", err);
  } finally {
    setLoadingUsers(false);
  }
};

  const handleBlockUser = async (uid, isBlocked) => {
    try {
      const token = await getIdToken();
      await fetch("/api/admin/users/blockUser", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId: uid, isBlocked }),
      });
      fetchUsers();
    } catch (err) {
      console.error("Error blocking user:", err);
    }
  };

  const handleDeleteUser = async (uid) => {
    if (!confirm("Delete this user? This action cannot be undone.")) return;
    try {
      const token = await getIdToken();
      await fetch("/api/admin/users/deleteUser", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ uid }),
      });
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleUserCreated = () => {
    setShowAddUserModal(false);
    fetchUsers();
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    return isNaN(date) ? "N/A" : date.toLocaleDateString();
  };

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && !u.isBlocked) ||
      (filterStatus === "blocked" && u.isBlocked);
    return matchSearch && matchStatus;
  });

  if (loading || loadingUsers) return <p>Loading users...</p>;
  if (!user || !isAdmin) return null;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowAddUserModal(true)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Add User
          </button>
          <Link href="/adminDashboard" className="px-4 py-2 border rounded">
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border rounded"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Table */}
      <table className="min-w-full border divide-y">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">User</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Joined</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.uid} className="border-t">
              <td className="px-4 py-2">{u.firstName} {u.lastName}</td>
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2">{u.phone || "N/A"}</td>
              <td className="px-4 py-2">{formatDate(u.createdAt)}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => handleBlockUser(u.uid, !u.isBlocked)}
                  className={`px-3 py-1 rounded ${u.isBlocked ? "bg-green-200" : "bg-red-200"}`}
                >
                  {u.isBlocked ? "Unblock" : "Block"}
                </button>
                <button
                  onClick={() => handleDeleteUser(u.uid)}
                  className="px-3 py-1 bg-red-300 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-lg font-bold mb-4">Add New User</h2>
            <AddUserForm onUserCreated={handleUserCreated} />
            <button
              onClick={() => setShowAddUserModal(false)}
              className="mt-4 px-4 py-2 border rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
