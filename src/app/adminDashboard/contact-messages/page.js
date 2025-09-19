"use client";

import { useEffect, useState } from "react";
import { useUserStatus } from "@/hooks/useUserStatus";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getIdToken } from "@/lib/client/clientAuthService";

export default function ContactMessagesManagement() {
  const { user, isAdmin, loading } = useUserStatus();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.replace("/login");
    }
  }, [user, isAdmin, loading, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchMessages();
    }
  }, [isAdmin]);

  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      const token = await getIdToken();
      if (!token) {
        console.error('No auth token available');
        return;
      }
      
      const response = await fetch('/api/admin/contact', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch contact messages');
      }
      
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!confirm('Are you sure you want to delete this contact message? This action cannot be undone.')) {
      return;
    }

    try {
      const token = await getIdToken();
      if (!token) {
        console.error('No auth token available');
        return;
      }
      
      const response = await fetch('/api/admin/contact', {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: messageId })
      });
      
      if (response.ok) {
        await fetchMessages(); // Refresh the list
      } else {
        const data = await response.json();
        console.error('Error deleting message:', data.error);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };


  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });


  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    let date;
    if (timestamp.seconds) {
      // Firestore timestamp
      date = new Date(timestamp.seconds * 1000);
    } else if (timestamp.toDate && typeof timestamp.toDate === 'function') {
      // Firestore timestamp object
      date = timestamp.toDate();
    } else if (typeof timestamp === 'string') {
      // String timestamp
      date = new Date(timestamp);
    } else if (typeof timestamp === 'number') {
      // Unix timestamp
      date = new Date(timestamp);
    } else {
      return 'N/A';
    }
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'N/A';
    }
    
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading || loadingMessages) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading contact messages...</span>
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
              <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
              <p className="text-gray-600 mt-1">Manage customer inquiries and contact form submissions</p>
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
        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Messages</label>
            <input
              type="text"
              placeholder="Search by name, email, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Messages Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Contact Messages ({filteredMessages.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMessages.map((message) => (
                  <tr key={message.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {message.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {message.email}
                        </div>
                        {message.phone && (
                          <div className="text-sm text-gray-500">
                            {message.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">
                        <p className="truncate" title={message.message}>
                          {message.message}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(message.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDeleteMessage(message.id)}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMessages.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
