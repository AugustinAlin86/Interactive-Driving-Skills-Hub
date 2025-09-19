"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useUserStatus } from "@/hooks/useUserStatus";
import LogoutButton from "./LogoutButton";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, isAdmin, loading } = useUserStatus();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Don't render if loading or no user
  if (loading || !user) {
    return null;
  }

  // Get display name - prefer displayName, then firstName, then email
  const displayName = user.displayName || 
                     (user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '') ||
                     user.email?.split('@')[0] ||
                     'User';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:text-yellow-200 transition-colors focus:outline-none focus:text-yellow-200"
      >
        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="hidden sm:block font-medium">{displayName}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{displayName}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
            {isAdmin && (
              <span className="inline-block mt-1 px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-full">
                Admin
              </span>
            )}
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              href={isAdmin ? "/adminDashboard" : "/userDashboard"}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
              </svg>
              Dashboard
            </Link>
            
            <div className="px-4 py-2">
              <LogoutButton 
                style={{
                  width: "100%",
                  marginTop: 0,
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px"
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
