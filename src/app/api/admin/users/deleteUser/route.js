export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import admin from "@/lib/admin/firebaseAdmin";
import { authenticateAdmin } from "@/lib/admin/authenticateAdmin";

export async function DELETE(request) {
  const requester = await authenticateAdmin(request);
  if (!requester) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  try {
    const { uid } = await request.json();

    if (!uid) {
      return NextResponse.json(
        { error: "User UID required" },
        { status: 400 }
      );
    }

    // Delete from Firebase Auth
    await admin.auth().deleteUser(uid);

    // Delete from Firestore
    await admin.firestore().collection("users").doc(uid).delete();

    return NextResponse.json({
      success: true,
      message: `User ${uid} deleted successfully`,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
