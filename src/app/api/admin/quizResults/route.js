

export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { authenticateAdmin } from "@/lib/admin/authenticateAdmin";
import { getFirestore } from "firebase-admin/firestore";

export async function GET(request) {
  const decoded = await authenticateAdmin(request);
  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const adminDb = getFirestore();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase().trim(); // ✅ Lowercase + trim

    const snapshot = await adminDb
      .collection("quizResults")
      .orderBy("createdAt", "desc")
      .get();

    // Convert docs to array
    let results = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // ✅ Filter by name or email if search exists
    if (search) {
      results = results.filter((r) => {
        const name = r.userName?.toLowerCase() || "";
        const email = r.userEmail?.toLowerCase() || "";
        return name.includes(search) || email.includes(search);
      });
    }

    return NextResponse.json({ results });
  } catch (err) {
    console.error("❌ Error fetching quiz results:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
