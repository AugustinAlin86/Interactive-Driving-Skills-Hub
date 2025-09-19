// src/app/api/admin/bookings/route.js
import { NextResponse } from "next/server";
import { authenticateAdmin } from "@/lib/admin/authenticateAdmin";
import admin from "@/lib/admin/firebaseAdmin";

const firestore = admin.firestore();

/* -------------------------------------------------------------------------- */
/* 🔹 GET all bookings with user details                                      */
/* -------------------------------------------------------------------------- */
export async function GET(request) {
  const requester = await authenticateAdmin(request);
  if (!requester) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  try {
    const snapshot = await firestore.collection("bookings").get();

    const bookings = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = doc.data();
        const userSnap = await firestore.collection("users").doc(data.uid).get();
        const userData = userSnap.exists
          ? {
              firstName: userSnap.data().firstName || "",
              lastName: userSnap.data().lastName || "",
              email: userSnap.data().email || "",
            }
          : null;

        return {
          id: doc.id,
          ...data,
          user: userData, // attach minimal user info
        };
      })
    );

    return NextResponse.json({ bookings });
  } catch (err) {
    console.error("❌ Error fetching bookings:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/* -------------------------------------------------------------------------- */
/* 🔹 POST → create a closed slot (when no booking exists)                    */
/* -------------------------------------------------------------------------- */
export async function POST(request) {
  const requester = await authenticateAdmin(request);
  if (!requester) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  try {
    const { date, time } = await request.json();

    if (!date || !time) {
      return NextResponse.json(
        { error: "Date and time required" },
        { status: 400 }
      );
    }

    const ref = await firestore.collection("bookings").add({
      uid: "admin",
      date,
      time,
      carType: "N/A",
      specialRequest: "Closed by admin",
      status: "closed",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      message: `Slot ${time} on ${date} closed by admin`,
      id: ref.id,
    });
  } catch (err) {
    console.error("❌ Error closing slot:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/* -------------------------------------------------------------------------- */
/* 🔹 PATCH → update existing booking status                                  */
/* -------------------------------------------------------------------------- */
export async function PATCH(request) {
  const requester = await authenticateAdmin(request);
  if (!requester) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "Booking ID and status required" },
        { status: 400 }
      );
    }

    await firestore.collection("bookings").doc(id).update({ status });

    return NextResponse.json({
      success: true,
      message: `Booking ${id} updated to ${status}`,
    });
  } catch (err) {
    console.error("❌ Error updating booking:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
