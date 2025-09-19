"use client";

import { useUserStatus } from "@/hooks/useUserStatus";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import UserBookings from "@/components/userdashboard/ShowUserBookings";
import QuizResultsUser from "@/components/mockTest/ShowQuizResaults";
import Link from "next/link";

export default function UserDashboard() {
  const { user, loading } = useUserStatus();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  const displayName = user.displayName || 
                     (user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '') ||
                     user.email?.split('@')[0] ||
                     'User';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {displayName}!
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your driving lessons and track your progress
              </p>
            </div>
            <div className="flex space-x-3">
              <Link 
                href="/book-slot"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Lesson
              </Link>
              <Link 
                href="/quizzes"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Take Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-lg">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Lessons Booked</h3>
                  <p className="text-2xl font-bold text-red-600">View Bookings</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Quiz Progress</h3>
                  <p className="text-2xl font-bold text-blue-600">View Results</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Learning Path</h3>
                  <p className="text-2xl font-bold text-green-600">Track Progress</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bookings Section */}
            <div className="lg:col-span-1">
              <UserBookings />
            </div>

            {/* Quiz Results Section */}
            <div className="lg:col-span-1">
              <QuizResultsUser />
            </div>
          </div>

          {/* Additional Resources */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Learning Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                href="/usefulLinks"
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-gray-900 mb-2">Useful Links</h3>
                <p className="text-sm text-gray-600">Helpful resources for your driving journey</p>
              </Link>
              <Link 
                href="/contact"
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-gray-900 mb-2">Contact Us</h3>
                <p className="text-sm text-gray-600">Get in touch with any questions</p>
              </Link>
              <Link 
                href="/about"
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-gray-900 mb-2">About Bogdan's</h3>
                <p className="text-sm text-gray-600">Learn more about our driving school</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}