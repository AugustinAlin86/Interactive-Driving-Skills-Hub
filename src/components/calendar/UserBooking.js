"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {showTakenSlots,createBooking,generateTimeSlots,} from "@/lib/client/slotService";
import { useUserStatus } from "@/hooks/useUserStatus";

export default function UserBooking() {
  const router = useRouter();
  const { user, loading } = useUserStatus();
  const [date, setDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [carType, setCarType] = useState("manual");
  const [specialRequest, setSpecialRequest] = useState("");
  const [bookingsForDate, setBookingsForDate] = useState([]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  
  useEffect(() => {
    if (!loading && !user) {
      setMessage("⚠️ Please log in to use this service. Redirecting…");
      setTimeout(() => router.replace("/login"), 2000);
    }
  }, [user, loading, router]);

  {/* Fetch Booked Slots*/}
  useEffect(() => {
    if (!user) return;
    const fetchSlots = async () => {
      try {
        const results = await showTakenSlots(date);
        setBookingsForDate(results);
      } catch (err) {
        console.error("❌ Error fetching bookings:", err);
      }
    };
    fetchSlots();
  }, [date, user]);

  {/*Handle Booking */}
  const handleBooking = async () => {
    if (!selectedSlot) return setMessage("⚠️ Please select a slot");
    if (!user) return setMessage("⚠️ You must be logged in to book");

    setSaving(true);
    try {
      await createBooking(selectedSlot, date, carType, specialRequest);
      setMessage("✅ Booking request sent! Pending confirmation.");
      setSelectedSlot(null);
      setSpecialRequest("");
    } catch (err) {
      console.error("❌ Error booking slot:", err);
      setMessage("❌ Failed to book. Try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  {/* Render */}
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {message && (
        <div
          style={{
            padding: "10px",
            marginBottom: "15px",
            backgroundColor: message.startsWith("⚠️") ? "#fce4e4" : "#e6ffed",
            color: message.startsWith("⚠️") ? "#b71c1c" : "#1b5e20",
            border: "1px solid",
            borderColor: message.startsWith("⚠️") ? "#f44336" : "#4caf50",
            borderRadius: "6px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {message}
        </div>
      )}

      <h2>📅 Book Your Lesson</h2>
      <Calendar onChange={setDate} value={date} />

      <h3 style={{ marginTop: "15px" }}>Available Slots</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
        {generateTimeSlots(date).map((slot) => {
          const isBooked = bookingsForDate.some(
            (b) =>
              b.time === slot &&
              (b.status === "pending" || b.status === "accepted" || b.status === "closed")
          );

          return (
            <button
              key={slot}
              onClick={() => !isBooked && setSelectedSlot(slot)}
              disabled={isBooked}
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                cursor: isBooked ? "not-allowed" : "pointer",
                backgroundColor: isBooked
                  ? "red"
                  : selectedSlot === slot
                  ? "blue"
                  : "#e5e7eb",
                color: isBooked ? "white" : selectedSlot === slot ? "white" : "black",
              }}
            >
              {slot} {isBooked ? "❌ Busy" : ""}
            </button>
          );
        })}
      </div>

      {/* Car Type */}
      <div style={{ marginTop: "15px" }}>
        <label>Car type: </label>
        <select
          value={carType}
          onChange={(e) => setCarType(e.target.value)}
          style={{
            marginLeft: "5px",
            padding: "5px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="manual">Manual</option>
          <option value="automatic">Automatic</option>
        </select>
      </div>

      {/* Special Request */}
      <div style={{ marginTop: "15px" }}>
        <label>Any special request for your lesson?</label>
        <textarea
          value={specialRequest}
          onChange={(e) => setSpecialRequest(e.target.value)}
          placeholder="How can we help you?"
          rows="3"
          style={{
            display: "block",
            width: "100%",
            marginTop: "5px",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <button
        onClick={handleBooking}
        disabled={saving}
        style={{
          marginTop: "15px",
          backgroundColor: saving ? "#aaa" : "green",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "6px",
          cursor: saving ? "not-allowed" : "pointer",
        }}
      >
        {saving ? "Booking..." : "Confirm Booking"}
      </button>
    </div>
  );
}
