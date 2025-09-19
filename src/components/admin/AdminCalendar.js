"use client";

import { useEffect, useState } from "react";
import { getIdToken, onAuthChange } from "@/lib/client/clientAuthService";

export default function AdminCalendar() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch bookings only once user is ready
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

        if (!res.ok) throw new Error(data.error || "Failed to load bookings");

        setBookings(data.bookings);
      } catch (err) {
        console.error("❌ Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Confirm/reject booking
  const updateStatus = async (id, status) => {
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

      if (!res.ok) throw new Error("Failed to update booking");

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch (err) {
      console.error("❌ Error updating status:", err);
    }
  };

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>📅 Admin Calendar</h2>

      {/* scrollable table wrapper */}
      <div style={{ maxHeight: "300px", overflowY: "auto", marginTop: "15px" }}>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            minWidth: "600px",
          }}
        >
          <thead style={{ position: "sticky", top: 0, background: "#f0f0f0" }}>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Car Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.user?.firstName} {b.user?.lastName}</td>
                <td>{b.user?.email}</td>
                <td>{b.date}</td>
                <td>{b.time}</td>
                <td>{b.carType}</td>
                <td>{b.status}</td>
                <td>
                  {b.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(b.id, "accepted")}
                        style={{
                          background: "green",
                          color: "white",
                          padding: "4px 8px",
                          marginRight: "5px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        ✅ Confirm
                      </button>
                      <button
                        onClick={() => updateStatus(b.id, "refused")}
                        style={{
                          background: "red",
                          color: "white",
                          padding: "4px 8px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        ❌ Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
