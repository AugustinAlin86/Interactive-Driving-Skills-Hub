"use client";

import { db, auth } from "@/lib/client/firebaseClient";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

/**
 * ✅ Create a new booking for the logged-in user
 */
export async function createBooking(slot, date, carType, specialRequest = "") {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const bookingData = {
    uid: user.uid,
    date: date.toDateString(),
    time: slot,
    carType,
    specialRequest,
    status: "pending", // always pending first
    createdAt: serverTimestamp(),
  };

  console.log("📝 Creating booking with data:", bookingData);

  try {
    const docRef = await addDoc(collection(db, "bookings"), bookingData);
    console.log("✅ Booking created successfully with ID:", docRef.id);
    return docRef;
  } catch (error) {
    console.error("❌ Error creating booking:", error);
    throw error;
  }
}

/**
 * ✅ Fetch all bookings for a specific date
 * Used to check availability (both user and admin can use this)
 */
export async function showTakenSlots(date) {
  const q = query(
    collection(db, "bookings"),
    where("date", "==", date.toDateString())
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}
