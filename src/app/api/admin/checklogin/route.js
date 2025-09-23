export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { authenticateAdmin } from "@/lib/admin/authenticateAdmin";
import admin from "@/lib/admin/firebaseAdmin";

export async function GET(request) {
  try {
    // 1. Try to authenticate as admin
    const adminUser = await authenticateAdmin(request);

    if (adminUser) {
      return NextResponse.json({
        success: true,
        role: "admin",
        uid: adminUser.uid,
        email: adminUser.email || null,
      });
    }

    // 2. If not admin, check if user is at least logged in
    const authHeader = request.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      return NextResponse.json({
        success: false,
        role: "guest",
        message: "No token provided",
      });
    }

    // 3. Verify token without requiring admin claim
    const decoded = await admin.auth().verifyIdToken(token);

    return NextResponse.json({
      success: true,
      role: "user",
      uid: decoded.uid,
      email: decoded.email || null,
    });
  } catch (err) {
    console.error("Error in /checkLogin:", err);
    return NextResponse.json(
      { success: false, error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
