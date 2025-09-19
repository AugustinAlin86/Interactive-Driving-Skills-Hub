"use client";

import { useEffect, useState } from "react";
import { useUserStatus } from "@/hooks/useUserStatus";
import { useRouter } from "next/navigation";
import { getIdToken } from "@/lib/client/clientAuthService";
import Link from "next/link";

export default function ContactMessages() {
  const { user, isAdmin, loading } = useUserStatus();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Redirect if not admin
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.replace("/login");
    }
  }, [loading, user, isAdmin, router]);

  // ✅ Fetch messages when admin confirmed
  useEffect(() => {
    if (isAdmin) fetchMessages();
  }, [isAdmin]);

  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      const token = await getIdToken();
      if (!token) return console.error("No auth token available");

      const res = await fetch("/api/admin/contact", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch contact messages");
      setMessages(data.messages || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!confirm("Delete this message? This action cannot be undone.")) return;

    try {
      const token = await getIdToken();
      if (!token) return console.error("No auth token available");

      const res = await fetch("/api/admin/contact", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        fetchMessages(); // Refresh after delete
      } else {
        const data = await res.json();
        console.error("Error deleting message:", data.error);
      }
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  const filteredMessages = messages.filter((m) => {
    const s = searchTerm.toLowerCase();
    return (
      m.name?.toLowerCase().includes(s) ||
      m.email?.toLowerCase().includes(s) ||
      m.message?.toLowerCase().includes(s)
    );
  });

  const formatDate = (timestamp) => {
    let date;
    if (timestamp?.seconds) date = new Date(timestamp.seconds * 1000);
    else if (timestamp?.toDate) date = timestamp.toDate();
    else if (typeof timestamp === "string") date = new Date(timestamp);
    else if (typeof timestamp === "number") date = new Date(timestamp);
    else return "N/A";

    return isNaN(date.getTime()) ? "N/A" : date.toLocaleString();
  };

  if (loading || loadingMessages) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading contact messages...</span>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) return null; // Will redirect

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
            <p className="text-gray-600 mt-1">Manage customer inquiries</p>
          </div>
          <Link
            href="/adminDashboard"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="bg-white p-6 mb-6 border rounded-lg shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">Search Messages</label>
          <input
            type="text"
            placeholder="Search by name, email, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Messages Table */}
        <div className="bg-white border rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Contact Messages ({filteredMessages.length})</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMessages.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium">{m.name}</div>
                      <div className="text-sm text-gray-500">{m.email}</div>
                      {m.phone && <div className="text-sm text-gray-500">{m.phone}</div>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{m.message}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(m.createdAt)}</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() => handleDeleteMessage(m.id)}
                        className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800 hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMessages.length === 0 && (
            <div className="text-center py-12 text-gray-600">No messages found</div>
          )}
        </div>
      </div>
    </div>
  );
}
