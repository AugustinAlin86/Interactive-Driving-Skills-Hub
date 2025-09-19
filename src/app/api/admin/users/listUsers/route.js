import { NextResponse } from "next/server";
import { authenticateAdmin } from "@/lib/admin/authenticateAdmin";
import { getFirestore } from "firebase-admin/firestore";

const firestore = getFirestore();

export async function GET(request) {
  // ✅ Step 1: check if requester is admin
  const requester = await authenticateAdmin(request);
  if (!requester) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  try {
    // ✅ Step 2: get all users from Firestore
    const snapshot = await firestore.collection("users").get();
    const users = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        uid: doc.id,
        ...data,
        createdAt: data.createdAt ? {
          seconds: data.createdAt.seconds || data.createdAt._seconds,
          nanoseconds: data.createdAt.nanoseconds || data.createdAt._nanoseconds
        } : null
      };
    });

    // ✅ Step 3: return users
    return NextResponse.json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
