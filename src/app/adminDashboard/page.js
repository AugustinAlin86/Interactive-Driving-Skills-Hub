"use client";

import { useEffect, useState } from "react";
import { useUserStatus } from "@/hooks/useUserStatus";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getIdToken } from "@/lib/client/clientAuthService";

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useUserStatus();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    pendingBookings: 0,
    totalQuizAttempts: 0,
    recentBookings: [],
    recentQuizAttempts: []
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.replace("/login");
    }
  }, [user, isAdmin, loading, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin]);

  const fetchStats = async () => {
    try {
      setLoadingStats(true);
      
      const token = await getIdToken();
      if (!token) {
        console.error('No auth token available');
        return;
      }
      
      // Initialize with default values
      let totalUsers = 0;
      let totalBookings = 0;
      let pendingBookings = 0;
      let totalQuizAttempts = 0;
      let recentBookings = [];
      let recentQuizAttempts = [];

      // Fetch users
      try {
        const usersRes = await fetch('/api/admin/users/listUsers', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const usersData = await usersRes.json();
        if (usersRes.ok) {
          totalUsers = usersData.users?.length || 0;
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }

      // Fetch bookings
      try {
        const bookingsRes = await fetch('/api/admin/bookings', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const bookingsData = await bookingsRes.json();
        if (bookingsRes.ok) {
          totalBookings = bookingsData.bookings?.length || 0;
          pendingBookings = bookingsData.bookings?.filter(b => b.status === 'pending').length || 0;
          recentBookings = bookingsData.bookings?.slice(0, 5) || [];
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }

      // Fetch quiz results
      try {
        const quizRes = await fetch('/api/admin/quizResults', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const quizData = await quizRes.json();
        if (quizRes.ok) {
          totalQuizAttempts = quizData.results?.length || 0;
          recentQuizAttempts = quizData.results?.slice(0, 5) || [];
        }
      } catch (error) {
        console.error('Error fetching quiz results:', error);
      }

      setStats({
        totalUsers,
        totalBookings,
        pendingBookings,
        totalQuizAttempts,
        recentBookings,
        recentQuizAttempts
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  if (loading || loadingStats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading admin dashboard...</span>
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
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your driving school operations</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Welcome, {user.displayName || user.email}</span>
              <Link
                href="/"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Site
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
                <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Bookings</h3>
                <p className="text-3xl font-bold text-green-600">{stats.totalBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Pending Bookings</h3>
                <p className="text-3xl font-bold text-yellow-600">{stats.pendingBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Quiz Attempts</h3>
                <p className="text-3xl font-bold text-purple-600">{stats.totalQuizAttempts}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/adminDashboard/users"
                className="w-full flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                Manage Users
              </Link>
              <Link
                href="/adminDashboard/bookings"
                className="w-full flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Manage Bookings
              </Link>
              <Link
                href="/adminDashboard/quiz-attempts"
                className="w-full flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Quiz Attempts
              </Link>
              <Link
                href="/adminDashboard/contact-messages"
                className="w-full flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Messages
              </Link>
              <Link
                href="/adminDashboard/calendar"
                className="w-full flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Calendar View
              </Link>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
            <div className="space-y-3">
              {stats.recentBookings.length > 0 ? (
                stats.recentBookings.map((booking, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{booking.user?.firstName} {booking.user?.lastName}</p>
                      <p className="text-sm text-gray-600">{booking.date} at {booking.time}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No recent bookings</p>
              )}
            </div>
          </div>

          {/* Recent Quiz Attempts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Quiz Attempts</h3>
            <div className="space-y-3">
              {stats.recentQuizAttempts.length > 0 ? (
                stats.recentQuizAttempts.map((attempt, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{attempt.quizId}</p>
                      <p className="text-sm text-gray-600">{attempt.score}/{attempt.total} correct</p>
                    </div>
                    <span className="text-sm font-medium text-purple-600">
                      {Math.round((attempt.score / attempt.total) * 100)}%
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No recent quiz attempts</p>
              )}
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Status Distribution</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${stats.totalBookings > 0 ? (stats.pendingBookings / stats.totalBookings) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{stats.pendingBookings}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Accepted</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${stats.totalBookings > 0 ? ((stats.totalBookings - stats.pendingBookings) / stats.totalBookings) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{stats.totalBookings - stats.pendingBookings}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Users</span>
                <span className="text-lg font-semibold text-blue-600">{stats.totalUsers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Bookings</span>
                <span className="text-lg font-semibold text-green-600">{stats.totalBookings}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Quiz Attempts</span>
                <span className="text-lg font-semibold text-purple-600">{stats.totalQuizAttempts}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
