import { NextResponse } from "next/server";
import { authenticateAdmin } from "@/lib/admin/authenticateAdmin";
import admin from "@/lib/admin/firebaseAdmin";

const firestore = admin.firestore();

export async function POST(request) {
  const requester = await authenticateAdmin(request);
  if (!requester) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  try {
    const { bookingId, status } = await request.json();

    if (!bookingId || !status) {
      return NextResponse.json(
        { error: "Booking ID and status are required" },
        { status: 400 }
      );
    }

    // Update the booking status
    await firestore.collection("bookings").doc(bookingId).update({
      status: status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      message: `Booking status updated to ${status}`,
    });
  } catch (err) {
    console.error("❌ Error updating booking status:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
