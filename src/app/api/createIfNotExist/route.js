import { NextResponse } from "next/server";
import admin from "@/lib/admin/firebaseAdmin";

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });

    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;
    const email = decoded.email;

    const body = await request.json();
    const overrides = body || {};

    const db = admin.firestore();
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      await userRef.set({
        uid,
        email,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        ...overrides,
      });
    }

    return NextResponse.json({ success: true, uid, email });
  } catch (err) {
    console.error("❌ Error in createIfNotExist:", err);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
