"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Link from "next/link";
import { onAuthChange, getIdToken } from "@/lib/client/clientAuthService";

// ✅ Status priority: highest number wins if multiple bookings per slot
const STATUS_PRIORITY = { accepted: 4, pending: 3, closed: 2, refused: 1, available: 0 };

export default function AdminCalendarView() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const selectedDate = date.toDateString();

  /* -------------------- Auth + Fetch bookings -------------------- */
  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (!user) {
        router.replace("/login");
        setLoading(false);
        return;
      }

      const token = await getIdToken();
      setUser(user);
      setIsAdmin(true);

      try {
        const res = await fetch("/api/admin/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch bookings");

        setBookings(data.bookings || []);
      } catch (err) {
        console.error("❌ Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  /* -------------------- Generate time slots -------------------- */
  const generateSlots = () => {
    const slots = [];
    let start = new Date(date);
    start.setHours(9, 0, 0, 0);
    for (let i = 0; i < 6; i++) {
      slots.push(`${start.getHours().toString().padStart(2, "0")}:${start.getMinutes().toString().padStart(2, "0")}`);
      start = new Date(start.getTime() + 90 * 60000);
    }
    return slots;
  };

  /* -------------------- Merge bookings by highest status -------------------- */
  const rawForDate = bookings.filter((b) => b.date === selectedDate);
  const mergedByTime = rawForDate.reduce((acc, b) => {
    const t = b.time;
    const current = acc[t];
    if (!current || STATUS_PRIORITY[b.status] > STATUS_PRIORITY[current.status]) {
      acc[t] = b;
    }
    return acc;
  }, {});

  const getBookingForSlot = (slot) => mergedByTime[slot] || null;

  /* -------------------- API calls -------------------- */
  const closeSlot = async (slot) => {
    try {
      const token = await getIdToken();
      const res = await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ date: selectedDate, time: slot }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to close slot");

      alert(`✅ ${data.message}`);
      window.location.reload();
    } catch (err) {
      console.error("❌ Error closing slot:", err);
    }
  };

  const updateSlotStatus = async (id, status) => {
    try {
      const token = await getIdToken();
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
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

  /* -------------------- Render -------------------- */
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

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Calendar View</h1>
            <p className="text-gray-600 mt-1">Manage bookings by date and time slots</p>
          </div>
          <Link href="/adminDashboard" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Calendar + Slots */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white rounded-lg shadow-sm border border-gray-200">
        <Calendar
          onChange={setDate}
          value={date}
          className="mx-auto mb-8"
          tileClassName={({ date: tileDate, view }) => {
            if (view === "month") {
              const isSelected = tileDate.toDateString() === date.toDateString();
              const isToday = tileDate.toDateString() === new Date().toDateString();
              let classes = "hover:bg-gray-100";
              if (isSelected) classes += " bg-yellow-200 text-yellow-900";
              if (isToday) classes += " bg-blue-100 text-blue-900";
              return classes;
            }
          }}
        />

        {/* Slots row */}
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Slots for {date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
        </h3>
        <div className="flex flex-wrap gap-3 mb-6">
          {generateSlots().map((slot) => {
            const booking = getBookingForSlot(slot);
            const status = booking ? booking.status : "available";
            const isSelected = selectedSlot === slot;

            let classes = "px-4 py-2 rounded-lg border text-sm font-medium transition-colors";
            if (isSelected) classes += " bg-gray-600 text-white";
            else {
              if (status === "pending") classes += " bg-yellow-400 text-black";
              else if (status === "accepted") classes += " bg-green-500 text-white";
              else if (status === "refused") classes += " bg-red-500 text-white";
              else if (status === "closed") classes += " bg-black text-white";
              else classes += " bg-gray-200 text-gray-700";
            }

            return (
              <button key={slot} onClick={() => setSelectedSlot(slot)} className={classes}>
                {slot}
              </button>
            );
          })}
        </div>

        {/* Slot details */}
        {selectedSlot && (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Details for {selectedSlot}</h3>
            {(() => {
              const booking = getBookingForSlot(selectedSlot);
              if (!booking) {
                return (
                  <div>
                    <p className="text-gray-600 mb-4">No booking for this slot.</p>
                    <button
                      onClick={() => closeSlot(selectedSlot)}
                      className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                    >
                      Close this Slot
                    </button>
                  </div>
                );
              }

              return (
                <>
                  <div className="bg-white border rounded-lg overflow-hidden mb-4">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Car Type</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-3">{booking.user?.firstName} {booking.user?.lastName}</td>
                          <td className="px-4 py-3">{booking.user?.email}</td>
                          <td className="px-4 py-3">{booking.carType}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              booking.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                              booking.status === "accepted" ? "bg-green-100 text-green-800" :
                              booking.status === "refused" ? "bg-red-100 text-red-800" :
                              "bg-gray-100 text-gray-800"
                            }`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        booking.status === "closed" ? updateSlotStatus(booking.id, "available") : updateSlotStatus(booking.id, "closed")
                      }
                      className={`px-4 py-2 rounded-lg text-white font-medium ${
                        booking.status === "closed" ? "bg-orange-600 hover:bg-orange-700" : "bg-black hover:bg-gray-800"
                      }`}
                    >
                      {booking.status === "closed" ? "Reopen Slot" : "Close this Slot"}
                    </button>

                    {booking.status === "pending" && (
                      <>
                        <button onClick={() => updateSlotStatus(booking.id, "accepted")} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                          Accept Booking
                        </button>
                        <button onClick={() => updateSlotStatus(booking.id, "refused")} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                          Refuse Booking
                        </button>
                      </>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
