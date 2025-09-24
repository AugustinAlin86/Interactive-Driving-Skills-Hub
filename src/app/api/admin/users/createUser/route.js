export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import admin from "@/lib/admin/firebaseAdmin";
import { authenticateAdmin } from "@/lib/admin/authenticateAdmin";

export async function POST(request) {
  // ✅ Ensure only admins can call this
  const requester = await authenticateAdmin(request);
  if (!requester) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  try {
    const { email, password, firstName, lastName, dob, licenceNo } = await request.json();

    // ✅ Validate email
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    // ✅ Validate password
    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // 1️⃣ Create Firebase Auth account
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // 2️⃣ Add Firestore profile with all fields
    const firestore = admin.firestore();
    await firestore.collection("users").doc(userRecord.uid).set({
      uid: userRecord.uid,
      email,
      firstName: firstName || "",
      lastName: lastName || "",
      dob: dob || "",
      licenceNo: licenceNo || "",
      isAdmin: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      message: `User ${email} created successfully`,
      uid: userRecord.uid,
    });
  } catch (err) {
    console.error("❌ Error creating user:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
