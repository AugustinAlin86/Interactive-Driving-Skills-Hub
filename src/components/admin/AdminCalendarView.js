// src/components/admin/AdminCalendarView.js
"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// ✅ Auth helpers (safe across refresh)
import { onAuthChange, getIdToken } from "@/lib/client/clientAuthService";

export default function AdminCalendarView() {
  const [date, setDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);

  /* ------------------------------------------------------------------------ */
  /* 🔹 Slot generation                                                       */
  /* ------------------------------------------------------------------------ */
  const generateSlots = () => {
    const slots = [];
    let start = new Date(date);
    start.setHours(9, 0, 0, 0);
    for (let i = 0; i < 6; i++) {
      const end = new Date(start.getTime() + 90 * 60000);
      slots.push(
        `${start.getHours().toString().padStart(2, "0")}:${start
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      );
      start = end;
    }
    return slots;
  };

  /* ------------------------------------------------------------------------ */
  /* 🔹 Fetch bookings (safe with onAuthChange)                               */
  /* ------------------------------------------------------------------------ */
  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (!user) {
        console.warn("⚠️ No user logged in");
        setLoading(false);
        return;
      }

      try {
        const token = await getIdToken();
        const res = await fetch("/api/admin/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch bookings");

        setBookings(data.bookings);
      } catch (err) {
        console.error("❌ Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  /* ------------------------------------------------------------------------ */
  /* 🔹 API helpers for slot management                                       */
  /* ------------------------------------------------------------------------ */

  // Close empty slot
  const closeSlot = async (slot, date) => {
    try {
      const token = await getIdToken();
      const res = await fetch("/api/admin/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date: date.toDateString(), time: slot }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to close slot");

      alert(`✅ ${data.message}`);
      window.location.reload();
    } catch (err) {
      console.error("❌ Error closing slot:", err);
    }
  };

  // Update existing booking (close, reopen, accept, refuse, etc.)
  const updateSlotStatus = async (id, status) => {
    try {
      const token = await getIdToken();
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update slot");

      alert(`✅ ${data.message}`);
      window.location.reload();
    } catch (err) {
      console.error("❌ Error updating slot:", err);
    }
  };

  /* ------------------------------------------------------------------------ */
  /* 🔹 Booking helpers                                                       */
  /* ------------------------------------------------------------------------ */
  const bookingsForDate = bookings.filter(
    (b) =>
      new Date(b.date).toDateString() === date.toDateString() &&
      b.status !== "refused"
  );

  const getBookingForSlot = (slot) =>
    bookingsForDate.find((b) => b.time === slot) || null;

  /* ------------------------------------------------------------------------ */
  /* 🔹 Render                                                               */
  /* ------------------------------------------------------------------------ */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading calendar...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <svg className="w-6 h-6 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900">Admin Calendar View</h2>
      </div>

      {/* Calendar */}
      <div className="mb-8">
        <Calendar 
          onChange={setDate} 
          value={date}
          className="mx-auto"
          tileClassName={({ date: tileDate, view }) => {
            if (view === 'month') {
              const isSelected = tileDate.toDateString() === date.toDateString();
              const isWeekend = tileDate.getDay() === 0 || tileDate.getDay() === 6;
              const isToday = tileDate.toDateString() === new Date().toDateString();
              
              let classes = 'hover:bg-gray-100';
              if (isSelected) classes += ' bg-yellow-200 text-yellow-900';
              if (isWeekend) classes += ' text-red-500';
              if (isToday) classes += ' bg-blue-100 text-blue-900';
              
              return classes;
            }
          }}
        />
      </div>

      {/* Slots row */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Slots for {date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          })}
        </h3>
        <div className="flex flex-wrap gap-3">
          {generateSlots().map((slot) => {
            const booking = getBookingForSlot(slot);
            const status = booking ? booking.status : "available";
            const isSelected = selectedSlot === slot;

            let buttonClasses = "px-4 py-2 rounded-lg border text-sm font-medium transition-colors cursor-pointer";
            
            if (isSelected) {
              buttonClasses += " bg-gray-600 text-white border-gray-600";
            } else {
              switch (status) {
                case "pending":
                  buttonClasses += " bg-gray-300 text-gray-700 border-gray-400 hover:bg-gray-400";
                  break;
                case "accepted":
                  buttonClasses += " bg-green-500 text-white border-green-500 hover:bg-green-600";
                  break;
                case "refused":
                  buttonClasses += " bg-red-500 text-white border-red-500 hover:bg-red-600";
                  break;
                case "closed":
                  buttonClasses += " bg-black text-white border-black hover:bg-gray-800";
                  break;
                default:
                  buttonClasses += " bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300";
              }
            }

            return (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={buttonClasses}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      {/* Slot details */}
      {selectedSlot && (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Details for {selectedSlot}
          </h3>
          {(() => {
            const booking = getBookingForSlot(selectedSlot);
            if (!booking) {
              return (
                <div>
                  <p className="text-gray-600 mb-4">No booking for this slot.</p>
                  <button
                    onClick={() => closeSlot(selectedSlot, date)}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Close this Slot
                  </button>
                </div>
              );
            }

            return (
              <div>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                          Car Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                          {booking.user?.firstName} {booking.user?.lastName}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                          {booking.user?.email}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                          {booking.carType}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            booking.status === 'accepted' ? 'bg-green-100 text-green-800' :
                            booking.status === 'refused' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() =>
                      booking.status === "closed"
                        ? updateSlotStatus(booking.id, "available")
                        : updateSlotStatus(booking.id, "closed")
                    }
                    className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                      booking.status === "closed" 
                        ? "bg-orange-600 hover:bg-orange-700" 
                        : "bg-black hover:bg-gray-800"
                    }`}
                  >
                    {booking.status === "closed" ? "Reopen Slot" : "Close this Slot"}
                  </button>
                  
                  {booking.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateSlotStatus(booking.id, "accepted")}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        Accept Booking
                      </button>
                      <button
                        onClick={() => updateSlotStatus(booking.id, "refused")}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                      >
                        Refuse Booking
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
