export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import admin from "@/lib/admin/firebaseAdmin";

// POST /api/admin/setAdmin
export async function POST(req) {
  try {
    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json({ error: "UID required" }, { status: 400 });
    }

    // 🔑 Assign the admin claim
    await admin.auth().setCustomUserClaims(uid, { admin: true });

    return NextResponse.json({ success: true, uid });
  } catch (err) {
    console.error("Error setting admin:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
