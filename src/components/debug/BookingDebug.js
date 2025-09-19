"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/client/firebaseClient";
import { collection, getDocs } from "firebase/firestore";

export default function BookingDebug() {
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bookings"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllBookings(data);
        console.log("🔍 All bookings in database:", data);
      } catch (err) {
        console.error("❌ Error fetching all bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBookings();
  }, []);

  if (loading) return <div>Loading debug info...</div>;

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <h3 className="font-semibold text-yellow-800 mb-2">Debug: All Bookings in Database</h3>
      <p className="text-sm text-yellow-700 mb-2">Total bookings: {allBookings.length}</p>
      {allBookings.length > 0 && (
        <div className="text-xs text-yellow-600">
          <p>Current user: {auth.currentUser?.uid || "Not logged in"}</p>
          <div className="mt-2">
            {allBookings.map((booking, index) => (
              <div key={booking.id} className="mb-1 p-2 bg-white rounded border">
                <strong>Booking {index + 1}:</strong> {booking.date} at {booking.time} 
                (User: {booking.uid}) - Status: {booking.status}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
