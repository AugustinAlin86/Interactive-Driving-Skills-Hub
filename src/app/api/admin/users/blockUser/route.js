export const dynamic = "force-dynamic";

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
    const { userId, isBlocked } = await request.json();

    if (!userId || typeof isBlocked !== 'boolean') {
      return NextResponse.json(
        { error: "User ID and block status are required" },
        { status: 400 }
      );
    }

    // Update the user's blocked status
    await firestore.collection("users").doc(userId).update({
      isBlocked: isBlocked,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      message: `User ${isBlocked ? 'blocked' : 'unblocked'} successfully`,
    });
  } catch (err) {
    console.error("❌ Error updating user block status:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
