"use client";

import { useEffect, useState } from "react";
import { useUserStatus } from "@/hooks/useUserStatus";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminCalendarView from "@/components/admin/AdminCalendarView";

export default function AdminCalendarPage() {
  const { user, isAdmin, loading } = useUserStatus();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.replace("/login");
    }
  }, [user, isAdmin, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading calendar...</span>
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
              <h1 className="text-3xl font-bold text-gray-900">Admin Calendar View</h1>
              <p className="text-gray-600 mt-1">Manage bookings by date and time slots</p>
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

      {/* Calendar Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminCalendarView />
      </div>
    </div>
  );
}
