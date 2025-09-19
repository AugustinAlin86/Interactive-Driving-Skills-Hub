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
      if (!token) {
        console.error('No auth token available');
        return;
      }
      
      const response = await fetch('/api/admin/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch bookings');
      }
      
      setBookings(data.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      const token = await getIdToken();
      if (!token) {
        console.error('No auth token available');
        return;
      }
      
      const response = await fetch('/api/admin/updateBookingStatus', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bookingId, status: newStatus })
      });
      
      if (response.ok) {
        await fetchBookings(); // Refresh the list
      } else {
        const data = await response.json();
        console.error('Error updating booking status:', data.error);
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;
    const matchesDate = !filterDate || booking.date === filterDate;
    return matchesStatus && matchesDate;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'refused': return 'bg-red-100 text-red-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading || loadingBookings) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading bookings...</span>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
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
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">All Bookings</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="refused">Refused</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Date</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilterStatus("all");
                  setFilterDate("");
                }}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Bookings ({filteredBookings.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Car Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Special Request
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {booking.user?.firstName?.[0]}{booking.user?.lastName?.[0]}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.user?.firstName} {booking.user?.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.user?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.date}</div>
                      <div className="text-sm text-gray-500">{booking.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.carType || 'Manual'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {booking.specialRequest || 'None'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {booking.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(booking.id, 'accepted')}
                              className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 hover:bg-green-200"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(booking.id, 'refused')}
                              className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 hover:bg-red-200"
                            >
                              Refuse
                            </button>
                          </>
                        )}
                        {booking.status === 'accepted' && (
                          <button
                            onClick={() => handleUpdateStatus(booking.id, 'closed')}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200"
                          >
                            Close
                          </button>
                        )}
                        {booking.status === 'refused' && (
                          <button
                            onClick={() => handleUpdateStatus(booking.id, 'pending')}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          >
                            Reopen
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600">Try adjusting your filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
