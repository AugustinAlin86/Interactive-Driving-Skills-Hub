export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import admin from "@/lib/admin/firebaseAdmin";

function pickHeaders(req) {
  const h = req.headers;
  return {
    host: h.get("host") || "",
    origin: h.get("origin") || "",
    referer: h.get("referer") || "",
    userAgent: h.get("user-agent") || "",
  };
}

export async function POST(request) {
  const hdrs = pickHeaders(request);
  console.groupCollapsed("[API createIfNotExist] POST");
  console.log("Request headers (safe subset):", hdrs);

  try {
    const authHeader = request.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      console.warn("[API createIfNotNotExist] Missing Authorization Bearer token");
      console.groupEnd();
      return NextResponse.json({ error: "No token" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = await admin.auth().verifyIdToken(token);
      console.log("Decoded token:", {
        uid: decoded.uid,
        email: decoded.email,
        admin: decoded.admin ?? false,
      });
    } catch (e) {
      console.error("[API createIfNotExist] Token verification failed:", e);
      console.groupEnd();
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    console.log("Request payload:", body);

    const { uid, email } = decoded;
    const db = admin.firestore();
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      console.log("User doc does not exist. Creating…");
      await userRef.set({
        uid,
        email,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        ...body,
      });
      console.log("User created in Firestore.");
    } else {
      console.log("User doc already exists. Skipping create.");
    }

    console.log("Returning success.");
    console.groupEnd();
    return NextResponse.json({ success: true, uid, email });
  } catch (err) {
    console.error("❌ [API createIfNotExist] Unhandled error:", err);
    console.groupEnd();
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

// Friendly messages for wrong methods → shows up in Vercel Function logs
export async function GET(request) {
  const hdrs = pickHeaders(request);
  console.warn("[API createIfNotExist] GET called (not allowed). Headers:", hdrs);
  return NextResponse.json({ error: "GET not allowed. Use POST." }, { status: 405 });
}

export async function PUT(request) {
  const hdrs = pickHeaders(request);
  console.warn("[API createIfNotExist] PUT called (not allowed). Headers:", hdrs);
  return NextResponse.json({ error: "PUT not allowed. Use POST." }, { status: 405 });
}

export async function DELETE(request) {
  const hdrs = pickHeaders(request);
  console.warn("[API createIfNotExist] DELETE called (not allowed). Headers:", hdrs);
  return NextResponse.json({ error: "DELETE not allowed. Use POST." }, { status: 405 });
}
