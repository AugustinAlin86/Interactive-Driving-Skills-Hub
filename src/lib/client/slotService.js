"use client";

import { db, auth } from "@/lib/client/firebaseClient";
import {collection,addDoc,serverTimestamp,query,where,getDocs,doc,deleteDoc,updateDoc,} from "firebase/firestore";

{/* Create Booking */}
export async function createBooking(slot, date, carType, specialRequest = "") {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const bookingData = {
    uid: user.uid,
    date: date.toDateString(),
    time: slot,
    carType,
    specialRequest,
    status: "pending",
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "bookings"), bookingData);
  return docRef;
}

{/*  Fetch Bookings by Date  */}
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

{/*Fetch Bookings for Current User */}
export async function getBookingsForUser() {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const q = query(
    collection(db, "bookings"),
    where("uid", "==", user.uid)
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

{/*  Cancel (Delete) Booking */}
export async function cancelBooking(bookingId) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  await deleteDoc(doc(db, "bookings", bookingId));
  return { success: true };
}

{/* Update Booking */}
export async function updateBooking(bookingId, updates) {
  const bookingRef = doc(db, "bookings", bookingId);
  await updateDoc(bookingRef, updates);
  return { success: true };
}

{/*Generate Time Slots  */}
export function generateTimeSlots(date) {
  const slots = [];
  let start = new Date(date);
  start.setHours(9, 0, 0, 0);

  for (let i = 0; i < 6; i++) {
    slots.push(
      `${start.getHours().toString().padStart(2, "0")}:${start
        .getMinutes()
        .toString()
        .padStart(2, "0")}`
    );
    start = new Date(start.getTime() + 90 * 60000);
  }
  return slots;
}
