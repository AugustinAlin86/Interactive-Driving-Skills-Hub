"use client";
import Link from "next/link";
import { useState } from "react";
import { useUserStatus } from "@/hooks/useUserStatus";
import UserDropdown from "@/components/authentication/UserDropdown";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useUserStatus();

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-red-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              07747531404
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              bogdancirsan23@gmail.com
            </span>
          </div>
          <div className="flex items-center space-x-3">
            {loading ? (
              // Show loading state
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Loading...</span>
              </div>
            ) : user ? (
              // Show user dropdown when logged in
              <UserDropdown />
            ) : (
              // Show login/register buttons when not logged in
              <>
                <Link href="/login" className="flex items-center hover:text-yellow-200 transition-colors">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Sign in
                </Link>
                <Link href="/signup" className="bg-red-800 hover:bg-red-900 px-3 py-1 rounded transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex-shrink-0">
                <img src="/logo.png" alt="Bogdan's Driving School" className="h-16 w-auto hover:opacity-80 transition-opacity duration-200" />
              </Link>
              {/* <div className="hidden md:block">
                <h1 className="text-2xl font-bold text-gray-900">BOGDAN'S</h1>
                <p className="text-lg text-gray-700 font-serif">Driving School</p>
                <div className="flex items-center mt-1">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600">07747 531404</span>
                </div>
              </div> */}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                About
              </Link>
              <Link href="/quizzes" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Quiz
              </Link>
              <Link href="/book-slot" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Book a slot
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Contact
              </Link>
              <Link href="/usefulLinks" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Useful Links
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-red-600 focus:outline-none focus:text-red-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mb-4">
                <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-red-600 font-medium">
                  About
                </Link>
                <Link href="/quizzes" className="block px-3 py-2 text-gray-700 hover:text-red-600 font-medium">
                  Quiz
                </Link>
                <Link href="/book-slot" className="block px-3 py-2 text-gray-700 hover:text-red-600 font-medium">
                  Book a slot
                </Link>
                <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-red-600 font-medium">
                  Contact
                </Link>
                <Link href="/usefulLinks" className="block px-3 py-2 text-gray-700 hover:text-red-600 font-medium">
                  Useful Links
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );

}
