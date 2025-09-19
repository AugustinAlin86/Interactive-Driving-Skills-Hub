"use client";

import { useEffect, useState } from "react";
import { useUserStatus } from "@/hooks/useUserStatus";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getIdToken } from "@/lib/client/clientAuthService";

export default function BookingsManagement() {
  const { user, isAdmin, loading } = useUserStatus();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.replace("/login");
    }
  }, [user, isAdmin, loading, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchBookings();
    }
  }, [isAdmin]);

  const fetchBookings = async () => {
    try {
      setLoadingBookings(true);
      const token = await getIdToken();
      if (!token) return console.error("No auth token available");

      const response = await fetch("/api/admin/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to fetch bookings");
      setBookings(data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      const token = await getIdToken();
      if (!token) return console.error("No auth token available");

      const response = await fetch("/api/admin/updateBookingStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookingId, status: newStatus }),
      });

      if (response.ok) fetchBookings();
      else {
        const data = await response.json();
        console.error("Error updating booking status:", data.error);
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;
    const matchesDate = !filterDate || booking.date === filterDate;
    return matchesStatus && matchesDate;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "accepted": return "bg-green-100 text-green-800";
      case "refused": return "bg-red-100 text-red-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading || loadingBookings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading bookings...</span>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bookings Management</h1>
            <p className="text-gray-600 mt-1">Manage lesson bookings and their status</p>
          </div>
          <Link
            href="/adminDashboard"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="all">All Bookings</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="refused">Refused</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Filter by Date</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilterStatus("all");
                  setFilterDate("");
                }}
                className="w-full px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Bookings ({filteredBookings.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Car Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Special Request</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{b.user?.firstName} {b.user?.lastName}</td>
                    <td className="px-6 py-4">
                      <div>{b.date}</div>
                      <div className="text-gray-500">{b.time}</div>
                    </td>
                    <td className="px-6 py-4">{b.carType || "Manual"}</td>
                    <td className="px-6 py-4 max-w-xs truncate">{b.specialRequest || "None"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs ${getStatusColor(b.status)}`}>
                        {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      {b.status === "pending" && (
                        <>
                          <button onClick={() => handleUpdateStatus(b.id, "accepted")} className="bg-green-100 px-3 py-1 rounded-full text-xs">Accept</button>
                          <button onClick={() => handleUpdateStatus(b.id, "refused")} className="bg-red-100 px-3 py-1 rounded-full text-xs">Refuse</button>
                        </>
                      )}
                      {b.status === "accepted" && (
                        <button onClick={() => handleUpdateStatus(b.id, "closed")} className="bg-gray-100 px-3 py-1 rounded-full text-xs">Close</button>
                      )}
                      {b.status === "refused" && (
                        <button onClick={() => handleUpdateStatus(b.id, "pending")} className="bg-yellow-100 px-3 py-1 rounded-full text-xs">Reopen</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredBookings.length === 0 && (
            <div className="text-center py-6 text-gray-600">No bookings found</div>
          )}
        </div>
      </div>
    </div>
  );
}
